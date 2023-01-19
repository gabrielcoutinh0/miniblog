import styles from "./BackToTop.module.css";
import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 50 ? setVisible(true) : setVisible(false);
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      aria-label="Voltar para o top"
      onClick={scrollToTop}
      className={`${styles.backToTop} ${
        visible ? styles.opacityFull : styles.opacityNone
      }`}
    >
      ▲
    </button>
  );
}
