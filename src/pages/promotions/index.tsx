import { Layout } from '@/components/Layout';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/Promotions.module.css';

type Props = {}

export default function Promotions({}: Props) {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h1>Today's Promotion</h1>
          <h3>Quattro Formaggi</h3>
            <Image src='/img/3.png' width={300} height={400} alt=''/>
              <p className={styles.promotionText}>Pay <b>2</b> and you will get <b>3</b> Pizzas Quattro Formaggi</p>
              <Link 
              className={styles.promotionButton}
              href='/product/644ae5f88c54b1188bffdc08'>I want the promotion!</Link>
        </div>
        </div>

    </Layout>
  );
}