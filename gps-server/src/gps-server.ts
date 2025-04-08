import express, { Request, Response } from "express";
import cors from "cors";
import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";
import * as child_process from "child_process"; // For setting system time (root privileges required)

const app = express();
const port = 3001; // Backend port

// Use an environment variable to decide whether to use real GPS data or dummy data
const useDummyData = process.env.USE_DUMMY_DATA === "true"; // default to false if not set

// Function to generate random dummy GPS data
const generateRandomDummyData = () => {
  const latitude = (Math.random() * (90 - -90) + -90).toFixed(5); // Random latitude between -90 and 90
  const longitude = (Math.random() * (180 - -180) + -180).toFixed(5); // Random longitude between -180 and 180
  const altitude = (Math.random() * 5000).toFixed(0); // Random altitude between 0 and 5000 meters
  const utc = new Date().toISOString().slice(11, 19).replace("T", "");

  return {
    systemTime: new Date().toISOString(),
    gpsTime: utc,
    longitude: `${longitude}° E`,
    latitude: `${latitude}° N`,
    altitude: `${altitude} m`,
  };
};

let latestData: any = useDummyData
  ? generateRandomDummyData()
  : {
      systemTime: new Date().toISOString(),
      gpsTime: undefined,
      longitude: undefined,
      latitude: undefined,
      altitude: undefined,
    };

// If we're using real GPS data, set up the serial connection
if (!useDummyData) {
  // Change this to your GPS serial path (e.g., /dev/ttyUSB0 or /dev/serial0)
  const gpsPort = new SerialPort({
    path: "/dev/ttyUSB0",
    baudRate: 9600,
  });

  const parser = gpsPort.pipe(new ReadlineParser({ delimiter: "\r\n" }));

  parser.on("data", (line: string) => {
    if (line.startsWith("$GPGGA")) {
      const parts = line.split(",");
      const utc = parts[1];
      const lat = parts[2];
      const latDir = parts[3];
      const lon = parts[4];
      const lonDir = parts[5];
      const alt = parts[9];

      const formatTime = (t: string) =>
        `${t.slice(0, 2)}:${t.slice(2, 4)}:${t.slice(4, 6)}`;
      const formatCoord = (coord: string, dir: string) => {
        const degrees = parseInt(coord.slice(0, dir === "N" || dir === "S" ? 2 : 3));
        const minutes = parseFloat(coord.slice(dir === "N" || dir === "S" ? 2 : 3)) / 60;
        return (degrees + minutes).toFixed(5) + "° " + dir;
      };

      latestData = {
        systemTime: new Date().toISOString(),
        gpsTime: utc ? formatTime(utc) : undefined,
        latitude: lat && latDir ? formatCoord(lat, latDir) : undefined,
        longitude: lon && lonDir ? formatCoord(lon, lonDir) : undefined,
        altitude: alt ? alt + " m" : undefined,
      };
    }
  });
}

// Function to sync system time with GPS time
const syncSystemTime = (gpsTime: string) => {
  const formattedTime = new Date(`1970-01-01T${gpsTime}Z`); // Use the GPS time as UTC and format it

  // Set the system time using the formatted GPS time (requires admin/root privileges)
  const timeCommand = `sudo date -s "${formattedTime.toISOString()}"`;

  try {
    child_process.execSync(timeCommand); // Execute the command to set the system time
    console.log(`System time synchronized with GPS time: ${gpsTime}`);
  } catch (error) {
    console.error("Failed to set system time:", error);
  }
};

app.use(cors());

// Endpoint to get GPS data
app.get("/gps", (req: Request, res: Response) => {
  // If using dummy data, generate a new random value each time it's requested
  if (useDummyData) {
    latestData = generateRandomDummyData();
  }

  res.json(latestData);
});

// New endpoint to manually trigger system time synchronization
app.get("/syncTime", (req: Request, res: Response) => {
  if (!latestData.gpsTime) {
    return res.status(400).json({ error: "GPS time is not available" });
  }

  // Sync the system time with GPS time
  syncSystemTime(latestData.gpsTime);

  res.json({ message: `System time synced with GPS time: ${latestData.gpsTime}` });
});

app.listen(port, () => {
  console.log(`GPS server running at http://localhost:${port}`);
});
