import React, { useState, useEffect } from "react";
import DrawLine from "../../utilities/drawLine";
import Module from "../../Modules/Module_Structure/Module";
import ModuleIcon from "@mui/icons-material/GpsFixed";
import styles from "./Orientation.module.css";

const Orientation: React.FC = () => {
  const GAUGE_SIZE = 100;
  const CENTER_X = GAUGE_SIZE / 2;
  const CENTER_Y = GAUGE_SIZE / 2;
  const INDICATOR_LENGTH = 35;
  const OFFSET_RADIUS = 11.5;
  const MAX_TILT_ANGLE = 45;
  const MAX_OFFSET = 40;
  const GRID_CIRCLE_RADIUS = 11;
  const BIG_CIRCLE_RADIUS = 7;
  const SMALL_CIRCLE_RADIUS = 3;

  const INDICATOR_LINE_WIDTH = 1.7;
  const BORDER_COLOR = "red";
  const FILL_COLOR = "transparent";

  const [xTiltAngle, setXTiltAngle] = useState<number | undefined>(undefined);
  const [yTiltAngle, setYTiltAngle] = useState<number | undefined>(undefined);
  const [isSimulating, setIsSimulating] = useState(false);
  const simulateReceivingTiltData = () => setIsSimulating((prev) => !prev);

  const RenderGridLines: React.FC = () => {
    return <></>;
  };

  const RenderAzimuthIndicator: React.FC<{ azimuth?: number }> = ({ azimuth }) => {
    return <></>;
  };

  const RenderAzimuthValueTable: React.FC<{ azimuth?: number }> = ({ azimuth }) => {
    const displayTiltValue = (value?: number) => value ?? "No data received";
    return (
      <table className={styles.table}>
        <tbody>
          <tr>
            <td className={styles.label}>Azimuth:</td>
            <td className={styles.value}>{displayTiltValue(azimuth)}</td>
          </tr>
        </tbody>
      </table>
    );
  };

  const RenderAzimuthGauge: React.FC<{ xTilt?: number; yTilt?: number }> = () => {
    return (
      <>
        <svg className={styles.gauge} viewBox="0 0 100 100">
          <RenderGridLines />
        </svg>
        <RenderAzimuthValueTable />
      </>
    );
  };

  const RenderAltitudeIndicator: React.FC<{ altitude?: number }> = ({ altitude }) => {
    return <></>;
  };

  const RenderAltitudeValueTable: React.FC<{ azimuth?: number }> = ({ azimuth }) => {
    const displayTiltValue = (value?: number) => value ?? "No data received";
    return (
      <table className={styles.table}>
        <tbody>
          <tr>
            <td className={styles.label}>Altitude:</td>
            <td className={styles.value}>{displayTiltValue(azimuth)}</td>
          </tr>
        </tbody>
      </table>
    );
  };

  const RenderAltitudeGauge: React.FC<{ xTilt?: number; yTilt?: number }> = () => {
    return (
      <>
        <svg className={styles.gauge} viewBox="0 0 100 100">
          <RenderGridLines />
        </svg>
        <RenderAltitudeValueTable />
      </>
    );
  };

  return (
    <Module
      icon={<ModuleIcon />}
      title="Base Leveller"
      contents={
        <>
          <RenderAzimuthGauge />
          <RenderAltitudeGauge />
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
