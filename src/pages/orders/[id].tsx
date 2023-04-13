import React from 'react';
import styles from '@/styles/Orders.module.css';
import Image from 'next/image';

export default function Orders() {
const status = 0;

function StatusClass(index: number) {
    if(index - status < 1) return styles.done;
    if(index - status === 1) return styles.inProgress;
    if(index - status > 1) return styles.undone;
}

  return (
    <div className={styles.container}>
        <div className={styles.left}>
            <div className={styles.row}>
                <table className={styles.table}>
                   <thead>
                   <tr className={styles.trTitle}>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Address</th>
                    <th>Total</th>
                    </tr>
                   </thead>
                  <tbody>
                     <tr className={styles.tr}>
                        <td>
                            <span className={styles.id}>132164879465431</span>
                        </td>
                        <td>
                            <span className={styles.name}>Jhonny Cage</span>
                        </td>
                        <td>
                            <span className={styles.address}>Elton st. 121-33 LA</span>
                        </td>
                        <td>
                            <span className={styles.total}>$79.80</span>
                        </td>
                      </tr>
                  </tbody>
                </table>
            </div>
            <div className={styles.row}>
                <div className={StatusClass(0)}>
                    <Image src='/img/paid.png' width={30} height={30} alt=''/>
                    <span>Payment</span>
                    <div className={styles.checkedIcon}>
                        <Image
                        className={styles.checkedIcon}
                        src='/img/checked.png'
                        width={20}
                        height={20}
                        alt=''
                        />
                    </div>
                </div>
                <div className={StatusClass(1)}>
                    <Image src='/img/bake.png' width={30} height={30} alt=''/>
                    <span>Baked</span>
                    <div className={styles.checkedIcon}>
                        <Image
                        className={styles.checkedIcon}
                        src='/img/checked.png'
                        width={20}
                        height={20}
                        alt=''
                        />
                    </div>
                </div>
                <div className={StatusClass(2)}>
                    <Image src='/img/bike.png' width={30} height={30} alt=''/>
                    <span>On the way</span>
                    <div className={styles.checkedIcon}>
                        <Image
                        className={styles.checkedIcon}
                        src='/img/checked.png'
                        width={20}
                        height={20}
                        alt=''
                        />
                    </div>
                </div>
                <div className={StatusClass(3)}>
                    <Image src='/img/delivered.png' width={30} height={30} alt=''/>
                    <span>Delivered</span>
                    <div className={styles.checkedIcon}>
                        <Image
                        className={styles.checkedIcon}
                        src='/img/checked.png'
                        width={20}
                        height={20}
                        alt=''
                        />
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.right}>
            <div className={styles.wrapper}>
                <h2 className={styles.title}>CART TOTAL</h2>
                <div className={styles.totalText}>
                    <b className={styles.totalTextTitle}>Subtotal:</b>$79.60
                </div>
                <div className={styles.totalText}>
                    <b className={styles.totalTextTitle}>Discount:</b>$0.00
                </div>
                <div className={styles.totalText}>
                    <b className={styles.totalTextTitle}>Total:</b>$79.60
                </div>
                <button disabled className={styles.button}>PAID</button>
            </div>
        </div>
    </div>
  );
}
