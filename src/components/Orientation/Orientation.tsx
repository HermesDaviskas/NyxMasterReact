import React, { useState } from "react";
import Compass from "../Compass/Compass";
import Altimeter from "../Altimeter/Altimeter";
import Module from "../../Modules/Module_Structure/Module";
import ModuleIcon from "@mui/icons-material/GpsFixed";
import styles from "./Orientation.module.css";

const Orientation: React.FC = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  const simulateReceivingTiltData = () => setIsSimulating((prev) => !prev);

  const RenderAzimuthGauge: React.FC<{ azimuth?: number }> = ({ azimuth }) => {
    const displayTiltValue = (value?: number) =>
      value !== undefined ? `${value} °` : "No data received";
    return (
      <>
        <Compass azimuth={azimuth} />

        <table className={styles.table}>
          <tbody>
            <tr>
              <td className={styles.label}>Azimuth:</td>
              <td className={styles.value}>{displayTiltValue(azimuth)}</td>
            </tr>
          </tbody>
        </table>
      </>
    );
  };

  const RenderAltitudeGauge: React.FC<{ altitude?: number }> = ({ altitude }) => {
    const displayTiltValue = (value?: number) =>
      value !== undefined ? `${value} °` : "No data received";
    return (
      <>
        <Altimeter altitude={altitude} />

        <table className={styles.table}>
          <tbody>
            <tr>
              <td className={styles.label}>Altitude:</td>
              <td className={styles.value}>{displayTiltValue(altitude)}</td>
            </tr>
          </tbody>
        </table>
      </>
    );
  };

  return (
    <Module
      icon={<ModuleIcon />}
      title="Base Leveller"
      contents={
        <>
          <RenderAzimuthGauge azimuth={35} />
          <RenderAltitudeGauge altitude={33} />
        </>
      }
      footerContents={
        <button className={styles.button} onClick={simulateReceivingTiltData}>
          {isSimulating ? "Close Connection" : "Open Connection"}
        </button>
      }
    />
  );
};

export default Orientation;
