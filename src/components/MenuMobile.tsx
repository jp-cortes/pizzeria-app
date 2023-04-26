import React from 'react';
import Link from 'next/link';
import styles from '@/styles/Navbar.module.css';

type Props = {}

export function MenuMobile({}: Props) {
  return (
    <div className={styles.containerMobile}>
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