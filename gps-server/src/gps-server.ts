import express from "express";
import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";

const app = express();
const port = 3001; // Backend port

// Use an environment variable to decide whether to use real GPS data or dummy data
const useDummyData = process.env.USE_DUMMY_DATA === "true"; // default to false if not set

// Dummy GPS data for debugging purposes
const dummyData = {
  systemTime: new Date().toISOString(),
  gpsTime: "2025-04-04 12:34:50",
  longitude: "23.7275° E",
  latitude: "37.9838° N",
  altitude: "127 m",
};

let latestData: any = useDummyData
  ? dummyData
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

app.get("/gps", (req, res) => {
  res.json(latestData);
});

app.listen(port, () => {
  console.log(`GPS server running at http://localhost:${port}`);
});
