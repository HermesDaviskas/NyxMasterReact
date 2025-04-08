import React from "react";
import DrawLine from "../../utilities/drawLine";
import styles from "./Altimeter.module.css";

interface AltimeterProps {
  altitude?: number;
}

const Altimeter: React.FC<AltimeterProps> = ({ altitude }) => {
  const GAUGE_SIZE = 100;
  const MARGIN_X = 10;
  const MARGIN_Y = 10;
  const ARC_GAP = 15;

  const CENTER_X = 0 + MARGIN_X;
  const CENTER_Y = GAUGE_SIZE - MARGIN_Y;
  const START_X = GAUGE_SIZE - MARGIN_X;
  const START_Y = CENTER_Y;
  const END_X = 0 + MARGIN_X;
  const END_Y = 0 + MARGIN_Y;
  const OUTER_ARC_RADIUS = START_X - CENTER_X;
  const INNER_ARC_RADIUS = OUTER_ARC_RADIUS - ARC_GAP;

  const NEEDLE_SIZE = 10;
  const NEEDLE_GAP = 7;
  const NEEDLE_CIRCLE_RADIUS = 40 / ARC_GAP;

  const drawAxis = () => {
    const centerPoint = `M${CENTER_X},${CENTER_Y}`;
    const rotationAngle = 0;
    const largeArcFlag = 0;
    const sweepFlag = 0;

    const outerStartingPoint = `L${START_X},${START_Y}`;
    const outerEndPoint = `${END_X},${END_Y}`;
    const outerArcRadiusPath = `A${OUTER_ARC_RADIUS},${OUTER_ARC_RADIUS}`;

    const innerStartingPoint = `L${START_X - ARC_GAP},${START_Y}`;
    const innerEndPoint = `${END_X},${END_Y + ARC_GAP}`;
    const innerArcRadiusPath = `A${INNER_ARC_RADIUS},${INNER_ARC_RADIUS}`;

    return (
      <>
        {/* draw y axis */}
        <DrawLine
          x_start={CENTER_X}
          y_start={CENTER_Y}
          angle={0}
          length={OUTER_ARC_RADIUS}
          className={styles.gaugeGridLines}
        />
        {/* draw outer arc and x axis */}
        <path
          d={`${centerPoint} ${outerStartingPoint} ${outerArcRadiusPath} ${rotationAngle} ${largeArcFlag}, ${sweepFlag} ${outerEndPoint}`}
          className={styles.gaugeGridLines}
        />
        {/* draw inner arc */}
        <path
          d={`${centerPoint} ${innerStartingPoint} ${innerArcRadiusPath} ${rotationAngle} ${largeArcFlag}, ${sweepFlag} ${innerEndPoint}`}
          className={styles.gaugeGridLines}
        />{" "}
        <circle
          cx={CENTER_X}
          cy={CENTER_Y}
          r={NEEDLE_CIRCLE_RADIUS}
          className={styles.needle}
        />
      </>
    );
  };

  const drawMarks = () => {
    const marks = [];
    for (let angle_deg = 90; angle_deg >= 0; angle_deg -= 15) {
      const angle_rad = angle_deg * (Math.PI / 180);
      const x_start = CENTER_X + INNER_ARC_RADIUS * Math.sin(angle_rad);
      const y_start = CENTER_Y - INNER_ARC_RADIUS * Math.cos(angle_rad);

      marks.push(
        <DrawLine
          key={`minor-mark-${angle_deg}`}
          x_start={x_start}
          y_start={y_start}
          length={ARC_GAP}
          angle={angle_deg}
          label={`${90 - angle_deg}°`}
          className={styles.gaugeGridLines}
        />
      );
    }
    return marks;
  };

  const drawMinorMarks = () => {
    const minorMarks = [];
    for (let angle_deg = 0; angle_deg < 90; angle_deg += 3) {
      const angle_rad = angle_deg * (Math.PI / 180);
      const x_start = CENTER_X + INNER_ARC_RADIUS * Math.sin(angle_rad);
      const y_start = CENTER_Y - INNER_ARC_RADIUS * Math.cos(angle_rad);

      minorMarks.push(
        <DrawLine
          key={`minor-mark-${angle_deg}`}
          x_start={x_start}
          y_start={y_start}
          length={ARC_GAP / 3}
          angle={angle_deg}
          className={styles.gaugeGridLines}
        />
      );
    }
    return minorMarks;
  };

  const drawNeedle = (angle_deg: number) => {
    // Calculate the angle for the needle head
    const angle_rad = (90 - angle_deg) * (Math.PI / 180);

    // The coordinates for the needle's head (triangle)
    const needleLength = INNER_ARC_RADIUS - NEEDLE_GAP;
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
      {altitude !== undefined && drawNeedle(altitude)}
    </svg>
  );
};

export default Altimeter;
