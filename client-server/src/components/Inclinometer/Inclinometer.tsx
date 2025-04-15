import React from "react";
import DrawLine from "../../utilities/drawLine";
import styles from "./Inclinometer.module.css";

interface InclinometerProps {
  elevation?: number;
  roll?: number;
}

const Inclinometer: React.FC<InclinometerProps> = ({ elevation = 0, roll = 0 }) => {
  const GAUGE_SIZE = 100;
  const CENTER_X = GAUGE_SIZE / 2;
  const CENTER_Y = GAUGE_SIZE / 2;
  const INDICATOR_LENGTH = 35;
  const MAX_TILT_ANGLE = 45;
  const MAX_OFFSET = 40;
  const GRID_CIRCLE_RADIUS = 8;
  const BIG_INDICATOR_RADIUS = 5;
  const SMALL_INDICATOR_RADIUS = 2.5;

  const drawAxis = () => (
    <>
      <DrawLine
        x_start={CENTER_X}
        y_start={CENTER_Y - GRID_CIRCLE_RADIUS}
        angle={0}
        length={GAUGE_SIZE / 2}
        className={styles.gaugeGridLines}
      />
      <DrawLine
        x_start={CENTER_X + GRID_CIRCLE_RADIUS}
        y_start={CENTER_Y}
        angle={90}
        length={GAUGE_SIZE / 2}
        className={styles.gaugeGridLines}
      />
      <DrawLine
        x_start={CENTER_X}
        y_start={CENTER_Y + GRID_CIRCLE_RADIUS}
        angle={180}
        length={GAUGE_SIZE / 2}
        className={styles.gaugeGridLines}
      />
      <DrawLine
        x_start={CENTER_X - GRID_CIRCLE_RADIUS}
        y_start={CENTER_Y}
        angle={270}
        length={GAUGE_SIZE / 2}
        className={styles.gaugeGridLines}
      />
      <circle
        cx={CENTER_X}
        cy={CENTER_Y}
        r={GRID_CIRCLE_RADIUS}
        className={styles.indicatorCircle}
      />

      <DrawLine
        x_start={CENTER_X}
        y_start={CENTER_Y}
        angle={0}
        length={2}
        className={styles.gaugeGridLines}
      />
      <DrawLine
        x_start={CENTER_X}
        y_start={CENTER_Y}
        angle={90}
        length={2}
        className={styles.gaugeGridLines}
      />
      <DrawLine
        x_start={CENTER_X}
        y_start={CENTER_Y}
        angle={180}
        length={2}
        className={styles.gaugeGridLines}
      />
      <DrawLine
        x_start={CENTER_X}
        y_start={CENTER_Y}
        angle={270}
        length={2}
        className={styles.gaugeGridLines}
      />
    </>
  );

  const RenderRollIndicator: React.FC<{ rollAngle: number }> = ({ rollAngle }) => {
    const toRad = (angle: number) => (angle * Math.PI) / 180;
    const xOffset = GRID_CIRCLE_RADIUS * Math.cos(toRad(rollAngle));
    const yOffset = GRID_CIRCLE_RADIUS * Math.sin(toRad(rollAngle));

    return (
      <>
        <DrawLine
          x_start={CENTER_X + xOffset}
          y_start={CENTER_Y + yOffset}
          length={INDICATOR_LENGTH}
          angle={rollAngle + 90}
          className={styles.indicatorLine}
        />
        <DrawLine
          x_start={CENTER_X - xOffset}
          y_start={CENTER_Y - yOffset}
          length={INDICATOR_LENGTH}
          angle={rollAngle - 90}
          className={styles.indicatorLine}
        />
      </>
    );
  };

  const RenderElevationIndicator: React.FC<{ elevationAngle: number }> = ({
    elevationAngle,
  }) => {
    const yOffset = Math.min((elevationAngle / MAX_TILT_ANGLE) * MAX_OFFSET, MAX_OFFSET);

    return (
      <>
        <circle
          cx={CENTER_X}
          cy={CENTER_Y + yOffset}
          r={BIG_INDICATOR_RADIUS}
          className={styles.indicatorCircle}
        />

        <circle
          cx={CENTER_X}
          cy={CENTER_Y - yOffset}
          r={SMALL_INDICATOR_RADIUS}
          className={styles.indicatorCircle}
        />
      </>
    );
  };

  return (
    <svg className={styles.gauge} viewBox={`0 0 ${GAUGE_SIZE} ${GAUGE_SIZE}`}>
      {drawAxis()}
      <RenderRollIndicator rollAngle={roll} />
      <RenderElevationIndicator elevationAngle={elevation} />
    </svg>
  );
};

export default Inclinometer;
