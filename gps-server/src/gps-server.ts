import express, { Request, Response } from "express";
import cors from "cors";
import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";
import * as child_process from "child_process";

const DEV_MODE = process.env.DEV_MODE === "true";
const app = express();

const generateRandomGPSData = () => {
  const utc = new Date().toISOString().slice(11, 19);
  const longitude = (Math.random() * 360 - 180).toFixed(5);
  const latitude = (Math.random() * 180 - 90).toFixed(5);
  const altitude = (Math.random() * 5000).toFixed(0);
  return {
    systemTime: new Date().toISOString(),
    gpsTime: utc,
    longitude: `${longitude}° E`,
    latitude: `${latitude}° N`,
    altitude: `${altitude} m`,
  };
};

const acquireGPSData = async () => {
  let gps_data = DEV_MODE ? generateRandomGPSData() : generateRandomGPSData();
  return gps_data;
};

const syncSystemTime = async () => {
  if (DEV_MODE) throw new Error("Time sync not possible while in DEV_MODE");

  let gps_data = await acquireGPSData();
  if (!gps_data || !gps_data.gpsTime) throw new Error("Invalid GPS data");

  const formattedTime = new Date(`1970-01-01T${gps_data.gpsTime}Z`);
  const timeCommand = `sudo date -s "${formattedTime.toISOString()}"`;

  try {
    child_process.execSync(timeCommand);
  } catch (err) {
    throw new Error("Failed to set system time: " + (err as Error).message);
  }
};

// Route: get GPS data
app.get("/gps", async (req: Request, res: Response) => {
  try {
    await acquireGPSData();
    res.json(GPS_DATA);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// Route: sync system time with GPS
app.get("/syncTime", async (req: Request, res: Response) => {
  try {
    await syncSystemTime();
    res.json(GPS_DATA);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

const port = 3001;
app.use(cors());
app.listen(port, () => {
  console.log(`GPS server running at http://localhost:${port}`);
});
