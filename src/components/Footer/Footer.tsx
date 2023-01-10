import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footer_inner}>
        <div className={`${styles.footer_colums} ${styles.section}`}>
          <div className={`${styles.widget} ${styles.Image}`}>
            <span className={styles.logo}>
              <Link to="/">
                Mini<strong>BLOG</strong>
              </Link>
            </span>
          </div>
          <div className={styles.widget}>
            <div className={styles.widget_heading}>
              <h3 className={styles.title}>Popular</h3>
            </div>
            <div className={styles.widget_content}></div>
          </div>
          <div className={styles.widget}>
            <div className={styles.widget_heading}>
              <h3 className={styles.title}>Pages</h3>
            </div>
            <div className={styles.widget_content}>
              <ul>
                <li>
                  <Link to="/">Inicio</Link>
                </li>
                <li>
                  <Link to="/about">Sobre</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={` ${styles.section} ${styles.center}`}>
          <div>
            <h3>Escreva sobre o que você tem interesse!</h3>
            <p>MiniBlog &copy; {currentYear}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
