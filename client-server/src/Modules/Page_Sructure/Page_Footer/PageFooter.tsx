import { ReactNode } from "react";
import { Mail, Phone, Language } from "@mui/icons-material";
import styles from "./PageFooter.module.css";

interface PageFooterProps {
  contents?: ReactNode;
  title?: string;
  creator?: string;
  mail?: string;
  weburl?: string;
  phone?: string;
}

const PageFooter: React.FC<PageFooterProps> = ({
  contents,
  title,
  creator,
  mail,
  weburl,
  phone,
}) => {
  return (
    <footer className={styles.pageFooter}>
      <hr className={styles.separatorLine} />

      <div className={styles.contents}>{contents}</div>
      <div className={styles.contactInfo}>
        {mail && (
          <div>
            <Mail className={styles.contactIcon} />
            <a href={`mailto:${mail}`}>{mail}</a>
          </div>
        )}
        {weburl && (
          <div>
            <Language className={styles.contactIcon} />
            <a href={`http://${weburl}`}>{weburl}</a>
          </div>
        )}
        {phone && (
          <div>
            <Phone className={styles.contactIcon} />
            <a href={`tel:${phone}`}>{phone}</a>
          </div>
        )}
      </div>
      <div className={styles.appInfo}>
        <div>{title}</div>
        <div>{creator}</div>
      </div>
    </footer>
  );
};

export default PageFooter;
