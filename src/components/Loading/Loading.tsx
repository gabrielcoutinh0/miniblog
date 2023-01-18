import styles from "./Loading.module.css";

export default function Loading() {
  return (
    <div className={styles.flex}>
      <div className={styles.loading}>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
