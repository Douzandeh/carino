import BackButton from "../module/BackButton";
import Card from "../module/Card";
import styles from "./CarsList.module.css";

function CarsList({ data }) {
  return (
    <div className={styles.container}>
      <BackButton href="/cars" />
      <div className={styles.cards}>
        {data.map((item) => (
          <Card key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}

export default CarsList;