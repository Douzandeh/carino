import Link from "next/link";
import styles from "./Layout.module.css";

function Layout({ children }) {
  return (
    <>
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          <h2>Carino</h2>
        </Link>
        <p className={styles.tagline}>Choose and buy your car</p>
      </header>
      <div className={styles.container}>{children}</div>
      <footer className={styles.footer}>
        © 2026 Carino. Developed by{" "}
        <a
          href="https://www.linkedin.com/in/hossein-douzandeh/"
          target="_blank"
        >
          <span className={styles.span}>Hossein Dozendeh</span>
        </a>
      </footer>
    </>
  );
}

export default Layout;
