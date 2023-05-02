import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/PizzaCard.module.css";



export function PizzaCard({ pizza }: PizzaCard) {
  return (
    <div className={styles.container}>
      <Link href={`/product/${pizza._id}`}>
      <Image src={pizza.img} alt={pizza.title} width={250} height={250} />
      </Link>
      <h2 className={styles.title}>{pizza.title}</h2>
      <span className={styles.price}>€{pizza.prices[0]}</span>
      <p className={styles.desc}>
        {pizza.desc}
      </p>
    </div>
  );
}
