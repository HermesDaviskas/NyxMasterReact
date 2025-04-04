import { ReactNode } from "react";
import styles from "./ModuleFooter.module.css";

interface ModuleFooterProps {
  contents?: ReactNode;
}

const ModuleFooter: React.FC<ModuleFooterProps> = ({ contents }) => {
  return (
    <footer className={styles.moduleFooter}>
      <hr className={styles.separatorLine} />
      <section className={styles.contents}>{contents}</section>
    </footer>
  );
};

export default ModuleFooter;
