import { Layout } from '@/components/Layout';
import Image from 'next/image';
import axios from 'axios';
import styles from '@/styles/Orders.module.css';

export default function Orders({ order }: { order : ProductOrder }) {
const status = order.status;

function StatusClass(index: number) {
    if(index - status < 1) return styles.done;// check mark
    if(index - status === 1) return styles.inProgress;//blinking
    if(index - status > 1) return styles.undone;// opacity 0.5
}

  return (
   <Layout>
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
                            <span className={styles.id}>{order._id}</span>
                        </td>
                        <td>
                            <span className={styles.name}>{order.customer}</span>
                        </td>
                        <td>
                            <span className={styles.address}>{order.address}</span>
                        </td>
                        <td>
                            <span className={styles.total}>€{order.total}</span>
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
                    <span>Preparing</span>
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
                    <b className={styles.totalTextTitle}>Subtotal:</b>€{' '}{order.total}
                </div>
                <div className={styles.totalText}>
                    <b className={styles.totalTextTitle}>Discount:</b>€0.00
                </div>
                <div className={styles.totalText}>
                    <b className={styles.totalTextTitle}>Total:</b>€{order.total}
                </div>
                <button disabled className={styles.button}>PAID</button>
            </div>
        </div>
    </div>
   </Layout>
  );
}

export async function getServerSideProps({ params }: { params : Partial<ProductOrder> }) {
    const resp = await axios.get(`http://localhost:3000/api/orders/${params.id}`);
    
    // console.log(resp, 'server');
   
    return {
      props: {
        order: resp.data,
      }
    };
  }