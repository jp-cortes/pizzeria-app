import React from "react";
import styles from "@/styles/PizzaCard.module.css";
import Image from "next/image";

export default function PizzaCard() {
  return (
    <div className={styles.container}>
      <Image src="/img/pizza.png" alt="pizza_image" width={250} height={250} />
      <h2 className={styles.title}>FIORI DI ZUCCA</h2>
      <span>$19.99</span>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
        quisquam repellendus mollitia unde obcaecati doloremque repellat, sequi
        quam eius voluptatem, modi quasi dicta optio voluptas ipsum, fugit
        minus? Exercitationem, fugiat!
      </p>
    </div>
  );
}
