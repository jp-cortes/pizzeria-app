import { useState } from 'react';
import styles from '@/styles/OrderDetail.module.css';

type Props = {
    total: number;
    createOrder: Function;
    setCash: Function;
};

export function OrderDetail({ total, createOrder, setCash }: Props) {
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");

  function handleClick() {
    if(total === 0){
        alert('Your Cart is empty!');
        return;
    }

    createOrder({ customer, address, total, method: 0});
  }
  
    return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <button className={styles.closeModal} onClick={()=> setCash((prev: boolean) => !prev)}>X</button>
            <h2 className={styles.title}>You will pay € 6 after the delivery</h2>
            <div className={styles.item}>
                <label className={styles.label}>Name Surname</label>
                <input
                required
                placeholder='Jhon Doe'
                type='text'
                className={styles.input}
                onChange={(e) => setCustomer(e.target.value)}
                />
            </div>
            <div className={styles.item}>
                <label className={styles.label}>Phone Number</label>
                <input
                required
                placeholder='+359 12 345 678'
                type='text'
                className={styles.input}
                />
            </div>
            <div className={styles.item}>
                <label className={styles.label}>Address</label>
                <textarea
                required
                rows={5}
                placeholder='Elton St. 505 Bg'
                className={styles.textarea}
                onChange={(e) => setAddress(e.target.value)}
                />
            </div>
            <button className={styles.button} onClick={handleClick}>
                Order
            </button>
        </div>
    </div>
  );
}