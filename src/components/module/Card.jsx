import Link from "next/link";
import Location from "../icons/Location";

import styles from "../module/Card.module.css";
import Image from "next/image";

function Card(props) {
  const { id, name, model, year, distance, location, image, price } = props;
  return (
    <Link href={`/cars/${id}`}>
      <div className={styles.container}>
        <Image
          src={image}
          alt={`${name} ${model}`}
          width={400}
          height={250}
          className={styles.image}
        />
        <h4 className={styles.title}>{`${name} ${model}`}</h4>
        <p className={styles.detail}>{`${year} . ${distance}km`}</p>
        <div className={styles.footer}>
          <p>$ {price}</p>
          <div className={styles.location}>
            <p>{location}</p>
            <Location />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;
