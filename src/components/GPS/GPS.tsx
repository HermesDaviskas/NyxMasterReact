import React, { useState } from "react";
import Module from "../../Modules/Module_Structure/Module";
import ModuleIcon from "@mui/icons-material/GpsFixed";
import styles from "./GPS.module.css";

const GPSModule: React.FC = () => {
  // State for positional data; initially undefined.
  const [systemTime, setSystemTime] = useState<string | undefined>(undefined);
  const [gpsTime, setGpsTime] = useState<string | undefined>(undefined);
  const [longitude, setLongitude] = useState<string | undefined>(undefined);
  const [latitude, setLatitude] = useState<string | undefined>(undefined);
  const [altitude, setAltitude] = useState<string | undefined>(undefined);

  // Function to simulate acquiring GPS data (demo values)
  const acquireGPSData = () => {
    setSystemTime("2025-04-04 12:34:56");
    setGpsTime("2025-04-04 12:34:50");
    setLongitude("23.7275° E");
    setLatitude("37.9838° N");
    setAltitude("127 m");
  };

  const PositionalTable = ({
    systemTime,
    gpsTime,
    longitude,
    latitude,
    altitude,
  }: {
    systemTime?: string;
    gpsTime?: string;
    longitude?: string;
    latitude?: string;
    altitude?: string;
  }) => {
    // Function to display either the provided value or a default message.
    const display = (value?: string) => value ?? "No data received";

    return (
      <table className={styles.table}>
        <tbody>
          <tr>
            <td className={styles.label}>SYS:</td>
            <td className={styles.value}>{display(systemTime)}</td>
          </tr>
          <tr>
            <td className={styles.label}>UTC:</td>
            <td className={styles.value}>{display(gpsTime)}</td>
          </tr>
          <tr>
            <td className={styles.label}>LON:</td>
            <td className={styles.value}>{display(longitude)}</td>
          </tr>
          <tr>
            <td className={styles.label}>LAT:</td>
            <td className={styles.value}>{display(latitude)}</td>
          </tr>
          <tr>
            <td className={styles.label}>ALT:</td>
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
      contents={
        <PositionalTable
          systemTime={systemTime}
          gpsTime={gpsTime}
          longitude={longitude}
          latitude={latitude}
          altitude={altitude}
        />
      }
      footerContents={
        <button className={styles.button} onClick={acquireGPSData}>
          Receive Data
        </button>
      }
    />
  );
};

export default GPSModule;
