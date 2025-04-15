import express, { Request, Response } from "express";
import cors from "cors";
import * as child_process from "child_process";
import { read, readRandomData } from "./gps-sensor";

const DEV_MODE = process.env.DEV_MODE === "true";
const app = express();
app.use(cors());

interface GpsData {
  systemTime: string;
  utcTime: string;
  longitude: string;
  latitude: string;
  altitude: string;
}

const acquireGPSData = (): GpsData => {
  if (!DEV_MODE) return read();
  else return readRandomData();
};

const syncSystemTime = (gps_data: GpsData) => {
  if (DEV_MODE) throw new Error("Time sync not possible while in DEV_MODE");

  if (!gps_data || !gps_data.utcTime) throw new Error("Invalid GPS data");

  const formattedTime = new Date(`1970-01-01T${gps_data.utcTime}Z`);
  const timeCommand = `sudo date -s "${formattedTime.toISOString()}"`;

  try {
    child_process.execSync(timeCommand);
  } catch (err) {
    throw new Error("Failed to set system time: " + (err as Error).message);
  }

  return;
};

// Route: get GPS data
app.get("/getGpsData", (req: Request, res: Response) => {
  try {
    res.json(acquireGPSData());
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// Route: sync system time with GPS
app.get("/syncTime", (req: Request, res: Response) => {
  try {
    let gps_data: GpsData = acquireGPSData();
    syncSystemTime(gps_data);
    res.json(gps_data);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

const port = 3001;
app.listen(port, () => {
  console.log(`GPS server running at http://localhost:${port}`);
});
