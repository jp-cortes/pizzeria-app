import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/Navbar.module.css';

type Props = {
  setMenuVisibility: Function;
}

export function MenuMobile({ setMenuVisibility }: Props) {

function handleClick() {
  setMenuVisibility((prev: boolean) => !prev);
}

  return (
    <div className={styles.containerMobile}>
      <button
      className={styles.menuMobileClose}
      onClick={handleClick}
      >
      <Image src='/img/cross.png' alt='menu_mobile' width={40} height={40}/>
      </button>
         <ul className={styles.listMobile}>
            <Link 
            onClick={handleClick}
            href='/'>
            <li className={styles.listItemMobile}>Homepage</li>
            </Link>
            <Link 
            onClick={handleClick}
            href='/promotions'>
            <li 
            className={styles.listItemMobile}>Promotions</li>
            </Link>
            <Link 
            onClick={handleClick}
            href='/products'>
            <li className={styles.listItemMobile}>Products</li>
            </Link>
            
            <Link 
            onClick={handleClick}
            href='#footer'>
            <li className={styles.listItemMobile}>Contact</li>
            </Link>
          </ul>
    </div>
  )
}