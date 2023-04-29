import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { MenuMobile } from './MenuMobile';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/Navbar.module.css';



type RootState = {
  cart: {
    quantity: number;
  };
};

export default function Navbar() {
  const [menuVisibility, setMenuVisibility] = useState(false);
  const quantity = useSelector((state: RootState) => state.cart.quantity);
  
 function handleVisivility() {
  setMenuVisibility(prev => !prev);
 }
  
  return (
    <header className={styles.container}>
        <div className={styles.item}>
          <button className={styles.menuMobileButton}
          onClick={handleVisivility}
          >
            <Image src='/img/menu.png' alt='menu_mobile' width={40} height={40}/> 
            </button>
          {menuVisibility && <MenuMobile setMenuVisibility={setMenuVisibility}/>}
            <Image
            className={styles.logo}
            src='/img/logo.png' alt='logo' width={100} height={90}/>
        </div>
       
        <div className={styles.item}>
          <ul className={styles.list}>
            <Link href='/'>
            <li className={styles.listItem}>Home</li>
            </Link>
            <Link href='/promotions'>
            <li className={styles.listItem}>Promotions</li>
            </Link>
            <Link href='/products'>
            <li className={styles.listItem}>Products</li>
            </Link>
            
            <a href='#footer'>
            <li className={styles.listItem}>Contact</li>
            </a>
          </ul>
        </div>
        <div className={styles.contact}>
        <div className={styles.callButton}>
             <Image src='/img/telephone.png' alt='telephone_logo' width={32} height={32}/>
           </div>
          <div className={styles.texts}>
             <p className={styles.text}>ORDER NOW!</p>
             <p className={styles.text}>0123 456 789</p>
           </div>
        </div>
        <div className={styles.item}>
          <div className={styles.cart}>
            <Link href='/cart'>
            <Image src='/img/cart.png' alt='shopping_cart' width={30} height={30}/>
            </Link>
            <div className={styles.counter}>{quantity}</div>
          </div>
        </div>
    </header>
  );
}
