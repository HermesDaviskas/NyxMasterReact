import { ReactNode } from "react";
import styles from "./PageHeader.module.css";

interface PageHeaderProps {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ icon, title, subtitle }) => {
  return (
    <header className={styles.pageHeader}>
      <section className={styles.iconTitleRow}>
        <section className={styles.icon}>{icon}</section>
        <div>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
      </section>
      <hr className={styles.separatorLine} />
    </header>
  );
};

export default PageHeader;
