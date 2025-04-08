import { ReactNode } from "react";
import styles from "./ModuleContents.module.css";

interface ModuleFooterProps {
  contents?: ReactNode;
}

const ModuleContents: React.FC<ModuleFooterProps> = ({ contents }) => {
  return <section className={styles.moduleContents}>{contents}</section>;
};

export default ModuleContents;
