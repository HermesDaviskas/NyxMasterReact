import { ReactNode } from "react";
import ModuleHeader from "./Module_Header/ModuleHeader";
import ModuleContents from "./Module_Contents/ModuleContents";
import ModuleFooter from "./Module_Footer/ModuleFooter";

import styles from "./Module.module.css";

interface ModuleProps {
  icon?: ReactNode;
  title: string;
  contents?: ReactNode;
  footerContents?: ReactNode;
}

const Module: React.FC<ModuleProps> = ({ icon, title, contents, footerContents }) => {
  return (
    <div className={styles.moduleContainer}>
      <ModuleHeader icon={icon} title={title} />
      <ModuleContents contents={contents} />
      <ModuleFooter contents={footerContents} />
    </div>
  );
};

export default Module;
