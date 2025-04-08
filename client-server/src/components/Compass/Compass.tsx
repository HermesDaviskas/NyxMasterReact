import React from "react";
import DrawLine from "../../utilities/drawLine";
import styles from "./Compass.module.css";

interface CompassProps {
  azimuth?: number;
}

const Compass: React.FC<CompassProps> = ({ azimuth }) => {
  const GAUGE_SIZE = 100;
  const CENTER_X = GAUGE_SIZE / 2;
  const CENTER_Y = GAUGE_SIZE / 2;
  const OUTER_CIRCLE_RADIUS = GAUGE_SIZE / 2 - 10;
  const INNER_CIRCLE_GAP = 15;
  const INNER_CIRCLE_RADIUS = OUTER_CIRCLE_RADIUS - INNER_CIRCLE_GAP;
  const NEEDLE_SIZE = 10;
  const NEEDLE_GAP = 7;
  const NEEDLE_CIRCLE_RADIUS = 40 / INNER_CIRCLE_GAP;

  const DIRECTIONS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

  const drawAxis = () => {
    return (
      <>
        {/* outer compass circle */}
        <circle
          cx={CENTER_X}
          cy={CENTER_Y}
          r={OUTER_CIRCLE_RADIUS}
          className={styles.gaugeGridLines}
        />
        ;{/* inner compass circle */}
        <circle
          cx={CENTER_X}
          cy={CENTER_Y}
          r={INNER_CIRCLE_RADIUS}
          className={styles.gaugeGridLines}
        />
        ;{/* needle circle */}
        <circle
          cx={CENTER_X}
          cy={CENTER_Y}
          r={NEEDLE_CIRCLE_RADIUS}
          className={styles.needle}
        />
      </>
    );
  };

  const drawMarks = () =>
    DIRECTIONS.map((label, index) => {
      const angle_deg = index * 45;
      const angle_rad = angle_deg * (Math.PI / 180);
      const x_start = CENTER_X + INNER_CIRCLE_RADIUS * Math.sin(angle_rad);
      const y_start = CENTER_Y - INNER_CIRCLE_RADIUS * Math.cos(angle_rad);

      return (
        <React.Fragment key={`mark-${label}`}>
          <DrawLine
            x_start={x_start}
            y_start={y_start}
            length={INNER_CIRCLE_GAP}
            angle={angle_deg}
            label={label}
            className={styles.gaugeGridLines}
          />
        </React.Fragment>
      );
    });

  const drawMinorMarks = () => {
    const minorMarks = [];
    for (let angle_deg = 5; angle_deg < 360; angle_deg += 5) {
      const angle_rad = angle_deg * (Math.PI / 180);
      const x_start = CENTER_X + INNER_CIRCLE_RADIUS * Math.sin(angle_rad);
      const y_start = CENTER_Y - INNER_CIRCLE_RADIUS * Math.cos(angle_rad);

      minorMarks.push(
        <DrawLine
          key={`minor-mark-${angle_deg}`}
          x_start={x_start}
          y_start={y_start}
          length={INNER_CIRCLE_GAP / 3}
          angle={angle_deg}
          className={styles.gaugeGridLines}
        />
      );
    }
    return minorMarks;
  };

  const drawNeedle = (angle_deg: number) => {
    // Calculate the angle for the needle head
    const angle_rad = angle_deg * (Math.PI / 180);

    // The coordinates for the needle's head (triangle)
    const needleLength = INNER_CIRCLE_RADIUS - NEEDLE_GAP;
    const x_end = CENTER_X + needleLength * Math.sin(angle_rad);
    const y_end = CENTER_Y - needleLength * Math.cos(angle_rad);

    // The triangle's coordinates (based on the needle's end)
    const x1 = x_end - NEEDLE_SIZE * Math.sin(angle_rad - Math.PI / 6);
    const y1 = y_end + NEEDLE_SIZE * Math.cos(angle_rad - Math.PI / 6);
    const x2 = x_end - NEEDLE_SIZE * Math.sin(angle_rad + Math.PI / 6);
    const y2 = y_end + NEEDLE_SIZE * Math.cos(angle_rad + Math.PI / 6);

    return (
      <>
        <polygon
          points={`${x_end},${y_end} ${x1},${y1} ${x2},${y2}`}
          className={styles.needle}
        />
      </>
    );
  };

  return (
    <svg className={styles.gauge} viewBox={`0 0 ${GAUGE_SIZE} ${GAUGE_SIZE}`}>
      {drawAxis()}
      {drawMarks()}
      {drawMinorMarks()}
      {azimuth !== undefined && drawNeedle(azimuth)}
    </svg>
  );
};

export default Compass;
