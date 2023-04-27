import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/Navbar.module.css';

type Props = {
  setMenuVisibility: Function;
}

export function MenuMobile({ setMenuVisibility }: Props) {

function handleClick() {
  setMenuVisibility(prev => !prev);
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
            <Link href='/'>
            <li className={styles.listItemMobile}>Homepage</li>
            </Link>
            <li className={styles.listItemMobile}>Menu</li>
            <Link href='/products'>
            <li className={styles.listItemMobile}>Products</li>
            </Link>
            
            <Link href='#footer'>
            <li className={styles.listItemMobile}>Contact</li>
            </Link>
          </ul>
    </div>
  )
}