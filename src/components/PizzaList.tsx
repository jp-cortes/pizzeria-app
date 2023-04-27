import React, { ReactNode } from 'react';
import { PizzaCard } from './PizzaCard';
import styles from '@/styles/PizzaList.module.css';



 function mapProduct(pizzaList: ProductBase[]): ReactNode {
  return pizzaList?.map((pizza) => (
     <PizzaCard pizza={pizza} key={pizza._id} />
   ));
 }

export  function PizzaList({ pizzaList }: PizzaList) {
  return (
    <div className={styles.container} id='menu'>
        <h1 className={styles.title}>THE BEST PIZZA IN TOWN</h1>
        <p className={styles.desc}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam corporis dolor, eligendi harum sint corrupti cupiditate natus incidunt, fugiat assumenda excepturi consequatur illo vitae, inventore quod. Aliquid magnam vitae nam.
        </p>
        <div className={styles.wrapper}>
          {mapProduct(pizzaList)}
        </div>
    </div>
  )
}
