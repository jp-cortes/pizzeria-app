import React from 'react';
import styles from '@/styles/Navbar.module.css';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import Link from 'next/link';

const links = [
  {
    id: 'homepage',
    name: 'Homepage'
  },
  {
    id: 'menu',
    name: 'Menu'
  },
  {
    id: 'products',
    name: 'Products'
  },
  {
    id: 'events',
    name: 'Events'
  },
  {
    id: 'blog',
    name: 'Blog'
  },
  {
    id: 'contact',
    name: 'Contact'
  },
]

type RootState = {
  cart: {
    quantity: number;
  };
};

export default function Navbar() {
  const quantity = useSelector((state: RootState) => state.cart.quantity);
  
  
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
            <Link href='/'>
            <li className={styles.listItem}>Homepage</li>
            </Link>
            <li className={styles.listItem}>Menu</li>
            <Link href='/products'>
            <li className={styles.listItem}>Products</li>
            </Link>
            <Image src='' alt='logo' width={160} height={69}/>
            <li className={styles.listItem}>Events</li>
            <li className={styles.listItem}>Blog</li>
            <Link href='#footer'>
            <li className={styles.listItem}>Contact</li>
            </Link>
          </ul>
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
