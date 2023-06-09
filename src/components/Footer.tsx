import Image from 'next/image';
import styles from '@/styles/Footer.module.css';
import Link from 'next/link';


export default function Footer() {
  return (
    <footer className={styles.container} id='footer'>
      <div className={styles.item}>
        <Image src='/img/bg.png' fill style={{ objectFit: 'cover' }} alt='background_image'/>
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.motto}>
          OH YES, WE ARE THE BEST PIZZA IN TOWN!
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
        <Link href='https://github.com/jp-cortes/pizzeria-app'
        className={styles.text}>
        <Image src="/img/github-icon.png" width={40} height={40} alt="github-logo"/>
        </Link>
          </div>
      </div>
    </footer>
  );
}
