import { ReactNode } from "react";

import PageHeader from "./Page_Header/PageHeader";
import PageContents from "./Page_Contents/PageContents";
import PageFooter from "./Page_Footer/PageFooter";

import styles from "./Page.module.css";

interface ModuleProps {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  contents?: ReactNode;
  footerContents?: ReactNode;
}

const Module: React.FC<ModuleProps> = ({
  icon,
  title,
  subtitle,
  contents,
  footerContents,
}) => {
  return (
    <div className={styles.moduleContainer}>
      <PageHeader icon={icon} title={title} subtitle={subtitle} />
      <PageContents contents={contents} />
      <PageFooter contents={footerContents} />
    </div>
  );
};

export default Module;
