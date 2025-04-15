import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";

interface GpsData {
  systemTime: string;
  utcTime: string;
  longitude: string;
  latitude: string;
  altitude: string;
}

const read = (): GpsData => {
  const systemTime = new Date().toISOString();
  const utcTime = new Date().toISOString();
  const longitude = `${(Math.random() * 180).toFixed(1)}° W`;
  const latitude = `${(Math.random() * 180).toFixed(1)}° N`;
  const altitude = `${(Math.random() * 1000).toFixed(0)} m`;

  return {
    systemTime,
    utcTime,
    longitude,
    latitude,
    altitude,
  };
};

const readRandomData = (): GpsData => {
  const systemTime = new Date().toISOString();
  const utcTime = new Date().toISOString();
  const longitude = `${(Math.random() * 180).toFixed(1)}° W`;
  const latitude = `${(Math.random() * 180).toFixed(1)}° N`;
  const altitude = `${(Math.random() * 1000).toFixed(0)} m`;

  return {
    systemTime,
    utcTime,
    longitude,
    latitude,
    altitude,
  };
};

export { read, readRandomData };
