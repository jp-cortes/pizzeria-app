import { Layout } from '@/components/Layout';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/Promotions.module.css';



export default function Promotions() {
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
              href='/product/645025a02f0e77129f3ba5ca'>I want the promotion!</Link>
        </div>
        </div>

    </Layout>
  );
}