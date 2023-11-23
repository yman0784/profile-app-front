import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div id={styles.main}>
      <div className={styles.fof}>
        <h1>Error 404</h1>
      </div>
    </div>
  );
}
