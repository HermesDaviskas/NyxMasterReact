import React, { useState } from "react";
import axios from "axios";
import Module from "../../Modules/Module_Structure/Module";
import ModuleIcon from "@mui/icons-material/GpsFixed";
import styles from "./GPS.module.css";

interface GpsData {
  systemTime: string;
  utcTime: string;
  longitude: string;
  latitude: string;
  altitude: string;
}

const GPSModule: React.FC = () => {
  const [systemTime, setSystemTime] = useState<string | undefined>(undefined);
  const [utcTime, setUtcTime] = useState<string | undefined>(undefined);
  const [longitude, setLongitude] = useState<string | undefined>(undefined);
  const [latitude, setLatitude] = useState<string | undefined>(undefined);
  const [altitude, setAltitude] = useState<string | undefined>(undefined);

  const receiveData = async () => {
    try {
      const { data }: { data: GpsData } = await axios.get(
        "http://localhost:3001/getGpsData"
      );
      updateData(data);
    } catch (err: any) {
      console.error(
        "Failed to fetch GPS data:",
        err?.response?.data?.error ?? err.message
      );
    }
  };

  const syncTime = async () => {
    try {
      const { data }: { data: GpsData } = await axios.get(
        "http://localhost:3001/syncTime"
      );
      updateData(data);
    } catch (err: any) {
      console.error(
        "Failed to sync system time with GPS time:",
        err?.response?.data?.error ?? err.message
      );
    }
  };

  const updateData = (data: GpsData) => {
    console.log(data);
    setSystemTime(data.systemTime);
    setUtcTime(data.utcTime);
    setLongitude(data.longitude);
    setLatitude(data.latitude);
    setAltitude(data.altitude);
  };

  const PositionalTable = () => {
    const display = (value?: string) => value || "No data received";

    return (
      <table className={styles.table}>
        <tbody>
          <tr>
            <td className={styles.label}>Loc:</td>
            <td className={styles.value}>{display(systemTime)}</td>
          </tr>
          <tr>
            <td className={styles.label}>UTC:</td>
            <td className={styles.value}>{display(utcTime)}</td>
          </tr>
          <tr>
            <td className={styles.label}>Lon:</td>
            <td className={styles.value}>{display(longitude)}</td>
          </tr>
          <tr>
            <td className={styles.label}>Lat:</td>
            <td className={styles.value}>{display(latitude)}</td>
          </tr>
          <tr>
            <td className={styles.label}>Alt:</td>
            <td className={styles.value}>{display(altitude)}</td>
          </tr>
        </tbody>
      </table>
    );
  };

  return (
    <Module
      icon={<ModuleIcon />}
      title="Positional data"
      contents={<PositionalTable />}
      footerContents={
        <>
          <button className={styles.button} onClick={receiveData}>
            Receive Data
          </button>
          <button className={styles.button} onClick={syncTime}>
            Sync Time
          </button>
        </>
      }
    />
  );
};

export default GPSModule;
