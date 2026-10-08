import Link from "next/link";
import Back from "../icons/Back";
import styles from "./BackButton.module.css";

function BackButton({ href = "/cars", children = "Back" }) {
  return (
    <Link href={href} className={styles.button}>
      <Back />
      <span>{children}</span>
    </Link>
  );
}

export default BackButton;