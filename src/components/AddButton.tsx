import React from 'react';
import styles from '@/styles/Add.module.css';

type Props = {
    setClose: Function;
}

export function AddButton({ setClose }: Props) {
  return (
    <button onClick={() => setClose(false)} className={styles.mainAddButton}>
        Add New Pizza
        </button>
  )
}