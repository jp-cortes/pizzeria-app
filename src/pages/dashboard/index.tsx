import { useState } from 'react';
import { Layout } from '../../components/Layout';
import { DeleteProduct }from '../../components/DeleteProduct';
import { UpdateProduct } from '../../components/UpdateProduct';
import { HeadDocument } from '@/components/HeadDocument';
import Image from 'next/image';
import axios from 'axios';
import styles from '@/styles/Dashboard.module.css';

type DasboardProps = {
  orders: ProductOrder[];
  products: ProductBase[];
};

export default function Dashboard({ orders, products }: DasboardProps) {
  const [pizzaList, setPizzaList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const [warning, setWarning] = useState(false);
  const [update, setUpdate] = useState(false);
  const [productId, setProductId] = useState('');
  const status = ["preparing", "on the way", "delivered"];
  
//will update the status of the order
   async function handleStatus(id: string | number) {
    const item = orderList.filter((order) => order._id === id)[0];
    const currentStatus = item.status;
    if(currentStatus === 2) return;//status delivered
    try {
      const resp = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`, { status: currentStatus + 1,
    });

    setOrderList([
      resp.data,
      ...orderList.filter((order) => order._id !== id),
    ])
    } catch (error) {
      console.log(error);
      
    }
   }


   function handlelogout() {
      //delete the token stored in cookies
      // Set to "Thu, 01 Jan 1970 00:00:00 GMT"
      document.cookie='token=deleted;' + "path=/; expires=" + new Date(0).toUTCString();
      // then will retun the user to the login page
      location.reload();   
   }

  
  return (
    <>
    <HeadDocument title={`Pizzeria Dasboard`}/>
   <Layout>
     <div className={styles.container}>
      <button 
      className={styles.logout}
      onClick={() => handlelogout()}>Log out</button>
      <div className={styles.item}>
        <h2 className={styles.title}>Products</h2>
        <table className={styles.table}>
          <thead>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
          {pizzaList?.map((product) => (
              <tr className={styles.trTitle} key={product._id}>
                <td>
                  <Image 
                  src={product.img}
                  width={50}
                  height={50}
                  style={{ objectFit: 'cover'}}
                  alt={product.title}
                  />
                </td>
                <td>{product._id.slice(0, 5)}...</td>
                <td>{product.title}</td>
                <td>€ {product.prices[0]}</td>
                <td>
                  <button 
                  onClick={() => {
                    setUpdate(true);
                    setProductId(product._id);
                  }}
                  className={styles.button}>Edit</button>
                  
                  <button 
                    onClick={() => {
                      setProductId(product._id);
                      setWarning(true);
                    }}
                    className={styles.button}
                    >
                    Delete
                    </button>
                </td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
      <div className={styles.item}>
            <h2 className={styles.title}>Orders</h2>
            <table className={styles.table}>
              <thead>
                <tr className={styles.trTitle}>
                  <th>Id</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              {orderList?.map((order) => (
                <tbody 
                className={styles.tbody}
                key={order._id}>
                  <tr className={styles.trTitle}>
                    <td>{order._id.slice(0, 5)}...</td>
                    <td>{order.customer}</td>
                    <td>€ {order.total}</td>
                    <td>
                      {order.method === 0 ? <span>cash</span> : <span>paid</span>}
                    </td>
                    <td>{status[order.status]}</td>
                    <td>
                      <button 
                      className={styles.nextStage}
                      onClick={() => handleStatus(order._id)}
                      >
                        Next Stage
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
      </div>
      {warning && <DeleteProduct productId={productId} setPizzaList={setPizzaList} pizzaList={pizzaList} setWarning={setWarning}/>}
      {update && <UpdateProduct setUpdate={setUpdate} productId={productId}/>}
    </div>
   </Layout>
    </>
  );
}


export async function getServerSideProps(ctx: Ctx) {
const myCookie = ctx.req?.cookies || "";

if(myCookie.token !== process.env.TOKEN) {
  return {
    redirect: {
      destination: "/dashboard/login",
      permanent: false,
    }
  };
}


  const productResp = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
  const orderResp = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders`);

  return {
    props: {
      orders: orderResp.data,
      products: productResp.data,
    }
  };
}