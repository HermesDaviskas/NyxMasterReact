import React from "react";
import DrawLine from "../../utilities/drawLine";
import styles from "./Bullseyelevel.module.css";

interface InclinometerProps {
  elevation?: number;
  roll?: number;
}

const BullseyeLevel: React.FC<InclinometerProps> = ({ elevation = 0, roll = 0 }) => {
  const GAUGE_SIZE = 120;
  const CENTER_X = GAUGE_SIZE / 2;
  const CENTER_Y = GAUGE_SIZE / 2;
  const MAX_TILT = 45;
  const MAX_OFFSET = 45;
  const GRID_OUTER_CIRCLE_RADIUS = GAUGE_SIZE / 2;
  const INDICATOR_RADIUS = 5;

  const drawAxis = () => (
    <>
      <circle
        className={styles.gridOuterCircle}
        cx={CENTER_X}
        cy={CENTER_Y}
        r={GRID_OUTER_CIRCLE_RADIUS}
      />
      <DrawLine
        x_start={CENTER_X}
        y_start={CENTER_Y}
        angle={0}
        length={GAUGE_SIZE / 2}
        className={styles.gaugeGridLines}
      />
      <DrawLine
        x_start={CENTER_X}
        y_start={CENTER_Y}
        angle={120}
        length={GAUGE_SIZE / 2}
        className={styles.gaugeGridLines}
      />
      <DrawLine
        x_start={CENTER_X}
        y_start={CENTER_Y}
        angle={240}
        length={GAUGE_SIZE / 2}
        className={styles.gaugeGridLines}
      />
      <circle className={styles.gaugeGridLines} cx={CENTER_X} cy={CENTER_Y} r={15} />
      <circle className={styles.gaugeGridLines} cx={CENTER_X} cy={CENTER_Y} r={30} />
      <circle className={styles.gaugeGridLines} cx={CENTER_X} cy={CENTER_Y} r={45} />
    </>
  );

  const RenderIndicator: React.FC<{ rollAngle: number; elevationAngle: number }> = ({
    rollAngle,
    elevationAngle,
  }) => {
    const xOffset = -Math.min((rollAngle / MAX_TILT) * MAX_OFFSET, MAX_OFFSET);
    const yOffset = -Math.min((elevationAngle / MAX_TILT) * MAX_OFFSET, MAX_OFFSET);

    return (
      <circle
        cx={CENTER_X + xOffset}
        cy={CENTER_Y + yOffset}
        r={INDICATOR_RADIUS}
        className={styles.indicatorCircle}
      />
    );
  };

  return (
    <svg className={styles.gauge} viewBox={`0 0 ${GAUGE_SIZE} ${GAUGE_SIZE}`}>
      {drawAxis()}
      <RenderIndicator rollAngle={roll} elevationAngle={elevation} />
    </svg>
  );
};

export default BullseyeLevel;
