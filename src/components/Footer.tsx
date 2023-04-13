import React from 'react';
import styles from '@/styles/Footer.module.css';
import Image from 'next/image';

export default function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image src='/img/bg.png' fill style={{ objectFit: 'cover' }} alt='background_image'/>
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.motto}>
          OH YES, WE DID.THE LAMA PIZZA, WELL BAKED SLICE OF PIZZA.
          </h2>
        </div>
        <div className={styles.card}>
          <h2 className={styles.title}> FIND OUR RESTAURANTS</h2>
          <p className={styles.text}>
            1654 R. Don Road #304.
            <br /> NewYork, 85022
            <br /> (602) 867-1010
          </p>
          <p className={styles.text}>
            2356 K. Laquie Rd #235.
            <br /> NewYork, 85022
            <br /> (602) 867-1010
          </p>
          <p className={styles.text}>
            1614 E. Erwin St #104.
            <br /> NewYork, 85022
            <br /> (602) 867-1010
          </p>
          <p className={styles.text}>
            1614 W. Caroll St #125.
            <br /> NewYork, 85022
            <br /> (602) 867-1010
          </p>
        </div>
        <div className={styles.card}>
          <h2 className={styles.title}>WORKING HOURS</h2>
          <p className={styles.text}>
            MONDAY UNTIL FRIDAY 
            <br/> 9:00 - 22:00
          </p>
          <p className={styles.text}>
            SATURDAY - SUNDAY 
            <br/> 12:00 - 00:00
          </p>
        </div>
      </div>
    </div>
  )
}
