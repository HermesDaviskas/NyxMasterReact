import React, { useState, useEffect } from "react";
import DrawLine from "../../utilities/drawLine";
import Module from "../../Modules/Module_Structure/Module";
import ModuleIcon from "@mui/icons-material/GpsFixed";
import styles from "./LevelerTool.module.css";

const LevelerTool: React.FC = () => {
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

  const [xTiltAngle, setXTiltAngle] = useState<number | undefined>(undefined);
  const [yTiltAngle, setYTiltAngle] = useState<number | undefined>(undefined);
  const [isSimulating, setIsSimulating] = useState(false);
  const simulateReceivingTiltData = () => setIsSimulating((prev) => !prev);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isSimulating) {
      interval = setInterval(() => {
        const randomTilt = () => {
          const raw = Math.random() * 90 - 45; // -90 to +90
          return Math.round(raw * 10) / 10; // one decimal
        };
        setXTiltAngle(randomTilt());
        setYTiltAngle(randomTilt());
      }, 1000);
    }

    return () => clearInterval(interval); // cleanup
  }, [isSimulating]);

  // Render the base grid lines for the leveling gauge (horizontal and vertical)
  const RenderGridLines: React.FC = () => {
    return (
      <>
        <line
          className={styles.gaugeGridLines}
          y1={CENTER_Y}
          x2={GAUGE_SIZE}
          y2={CENTER_Y}
        />
        <line
          className={styles.gaugeGridLines}
          x1={CENTER_X}
          y1={GAUGE_SIZE}
          x2={CENTER_X}
          y2="0"
        />
        <circle
          className={styles.gaugeGridLines}
          cx={CENTER_X}
          cy={CENTER_Y}
          r={GRID_CIRCLE_RADIUS}
        />
      </>
    );
  };

  // Render the X-axis tilt indicator (lines moving based on X tilt angle)
  const RenderXTiltIndicator: React.FC<{ tiltAngle: number }> = ({ tiltAngle }) => {
    const calculateRadians = (angle: number) => (angle * Math.PI) / 180;
    const xOffset = OFFSET_RADIUS * Math.cos(calculateRadians(tiltAngle));
    const yOffset = OFFSET_RADIUS * Math.sin(calculateRadians(tiltAngle));

    return (
      <>
        <DrawLine
          x_start={CENTER_X + xOffset}
          y_start={CENTER_Y + yOffset}
          length={INDICATOR_LENGTH}
          angle={tiltAngle + 90}
          className={styles.indicatorLine}
        />
        <DrawLine
          x_start={CENTER_X - xOffset}
          y_start={CENTER_Y - yOffset}
          length={INDICATOR_LENGTH}
          angle={tiltAngle - 90}
          className={styles.indicatorLine}
        />
      </>
    );
  };

  // Render the Y-axis tilt indicator (circles moving based on Y tilt angle)
  const RenderYTiltIndicator: React.FC<{ tiltAngle: number }> = ({ tiltAngle }) => {
    const yOffset = Math.min((tiltAngle / MAX_TILT_ANGLE) * MAX_OFFSET, MAX_OFFSET);

    return (
      <>
        <circle
          cx={CENTER_X}
          cy={CENTER_Y + yOffset}
          r={BIG_CIRCLE_RADIUS + 1.5}
          className={styles.strokeCircle}
        />
        <circle
          cx={CENTER_X}
          cy={CENTER_Y + yOffset}
          r={BIG_CIRCLE_RADIUS}
          className={styles.indicatorCircle}
        />

        <circle
          cx={CENTER_X}
          cy={CENTER_Y - yOffset}
          r={SMALL_CIRCLE_RADIUS + 1.6}
          className={styles.strokeCircle}
        />
        <circle
          cx={CENTER_X}
          cy={CENTER_Y - yOffset}
          r={SMALL_CIRCLE_RADIUS}
          className={styles.indicatorCircle}
        />
      </>
    );
  };

  // Render the table showing the X and Y tilt values
  const RenderTiltValuesTable: React.FC<{ xTilt?: number; yTilt?: number }> = ({
    xTilt,
    yTilt,
  }) => {
    const displayTiltValue = (value?: number) =>
      value !== undefined ? `${value} °` : "No data received";
    return (
      <table className={styles.table}>
        <tbody>
          <tr>
            <td className={styles.label}>X-Tilt:</td>
            <td className={styles.value}>{displayTiltValue(xTilt)}</td>
          </tr>
          <tr>
            <td className={styles.label}>Y-Tilt:</td>
            <td className={styles.value}>{displayTiltValue(yTilt)}</td>
          </tr>
        </tbody>
      </table>
    );
  };

  // The main leveling gauge component rendering the grid, tilt indicators, and values
  const RenderGauge: React.FC<{ xTilt?: number; yTilt?: number }> = ({
    xTilt,
    yTilt,
  }) => {
    return (
      <>
        <svg className={styles.gauge} viewBox="0 0 100 100">
          <RenderGridLines />
          {xTilt !== undefined && <RenderXTiltIndicator tiltAngle={xTilt} />}
          {yTilt !== undefined && <RenderYTiltIndicator tiltAngle={yTilt} />}
        </svg>
        <RenderTiltValuesTable xTilt={xTilt} yTilt={yTilt} />
      </>
    );
  };

  return (
    <Module
      icon={<ModuleIcon />}
      title="Base Leveller"
      contents={<RenderGauge xTilt={xTiltAngle} yTilt={yTiltAngle} />}
      footerContents={
        <button className={styles.button} onClick={simulateReceivingTiltData}>
          {isSimulating ? "Close Connection" : "Open Connection"}
        </button>
      }
    />
  );
};

export default LevelerTool;
