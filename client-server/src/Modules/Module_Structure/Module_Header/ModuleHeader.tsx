import { ReactNode } from "react";
import styles from "./ModuleHeader.module.css";

interface ModuleHeaderProps {
  icon?: ReactNode;
  title: string;
}

const ModuleHeader: React.FC<ModuleHeaderProps> = ({ icon, title }) => {
  return (
    <header className={styles.moduleHeader}>
      <section className={styles.iconTitleRow}>
        <section className={styles.icon}>{icon}</section>
        <a className={styles.title}>{title}</a>
      </section>
      <hr className={styles.separatorLine} />
    </header>
  );
};

export default ModuleHeader;
