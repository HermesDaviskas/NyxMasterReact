import React from "react";
import Module from "../../Modules/Module_Structure/Module";
import ModuleIcon from "@mui/icons-material/AlignHorizontalCenter";
import styles from "./LevelerTool.module.css";

import Inclinometer from "../Inclinometer/Inclinometer";
import BullseyeLevel from "../Bullseye Level/Bullseyelevel";

const LevelerTool: React.FC = () => {
  const RenderInclinometerGauge: React.FC<{ elevation?: number; roll?: number }> = ({
    elevation,
    roll,
  }) => {
    const displayTiltValue = (value?: number) =>
      value !== undefined ? `${value} °` : "No data received";
    return (
      <>
        <Inclinometer elevation={elevation} roll={roll} />
        <BullseyeLevel elevation={elevation} roll={roll} />
        <table className={styles.table}>
          <tbody>
            <tr>
              <td className={styles.label}>Roll:</td>
              <td className={styles.value}>{displayTiltValue(roll)}</td>
            </tr>
            <tr>
              <td className={styles.label}>elevation:</td>
              <td className={styles.value}>{displayTiltValue(elevation)}</td>
            </tr>
          </tbody>
        </table>
      </>
    );
  };

  return (
    <Module
      icon={<ModuleIcon />}
      title="Mount Levelling"
      contents={<RenderInclinometerGauge elevation={10} roll={0} />}
      footerContents={<button className={styles.button}>Open Connection</button>}
    />
  );
};

export default LevelerTool;
