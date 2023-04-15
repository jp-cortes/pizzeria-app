import React from 'react';
import styles from '@/styles/Navbar.module.css';
import Image from 'next/image';

export default function Navbar() {
  return (
    <header className={styles.container}>
        <div className={styles.item}>
          <div className={styles.callButton}>
             <Image src='/img/telephone.png' alt='telephone_logo' width={32} height={32}/>
           </div>
          <div className={styles.texts}>
             <p className={styles.text}>ORDER NOW!</p>
             <p className={styles.text}>0123 456 789</p>
           </div>
        </div>
        <div className={styles.item}>
          <ul className={styles.list}>
            <li className={styles.listItem}>Homepage</li>
            <li className={styles.listItem}>Products</li>
            <li className={styles.listItem}>Menu</li>
            <Image src='' alt='logo' width={160} height={69}/>
            <li className={styles.listItem}>Events</li>
            <li className={styles.listItem}>Blog</li>
            <li className={styles.listItem}>Contact</li>
          </ul>
        </div>
        <div className={styles.item}>
          <div className={styles.cart}>
            <Image src='/img/cart.png' alt='shopping_cart' width={30} height={30}/>
            <div className={styles.counter}>2</div>
          </div>
        </div>
    </header>
  );
}
