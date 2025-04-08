import { ReactNode } from "react";
import styles from "./PageContents.module.css";

interface PageContentsProps {
  contents?: ReactNode;
}

const PageContents: React.FC<PageContentsProps> = ({ contents }) => {
  return <section className={styles.pageContents}>{contents}</section>;
};

export default PageContents;
