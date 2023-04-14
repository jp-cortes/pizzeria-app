import React from 'react';
import PizzaCard from './PizzaCard';
import styles from '@/styles/PizzaList.module.css';


export default function PizzaList({ pizzaList }) {
  return (
    <div className={styles.container}>
        <h1 className={styles.title}>THE BEST PIZZA IN TOWN</h1>
        <p className={styles.desc}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam corporis dolor, eligendi harum sint corrupti cupiditate natus incidunt, fugiat assumenda excepturi consequatur illo vitae, inventore quod. Aliquid magnam vitae nam.
        </p>
        <div className={styles.wrapper}>
          {pizzaList.map((pizza, index: number) => (
            <PizzaCard pizza={pizza} key={index+ 1}/>
          ))}
         
        </div>
    </div>
  )
}
