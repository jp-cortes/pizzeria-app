import React from 'react';
import styles from '../styles/Navbar.module.css';
import Image from 'next/image';

export default function Navbar() {
  return (
    <div className={styles.container}>
        <div className={styles.item}>
          <div className={styles.callbutton}>
             <Image src='/img/telephone.png' alt='telephone_logo' width={32} height={32}/>
           </div>
          <div className={styles.texts}>
             <p className={styles.text}>ORDER NOW!</p>
             <p className={styles.text}>0123 456 789</p>
           </div>
        </div>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
    </div>
  );
}
