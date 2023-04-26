import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Image from 'next/image';
import styles from '@/styles/Dashboard.module.css';
import { cookies } from 'next/dist/client/components/headers';
import { Layout } from '@/components/Layout';

type DasboardProps = {
  orders: ProductOrder[];
  products: ProductBase[];
}

export default function Dashboard({ orders, products }: DasboardProps) {
  const [pizzaList, setPizzaList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const [delivered, setDelivered] = useState(false);
  const status = ["preparing", "on the way", "delivered"];
  const router = useRouter();

   async function handleDelete(id:string | number) {
    console.log(id);
    try {
      const resp = await axios.delete(`http://localhost:3000/api/products/${id}`);
      setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
    } catch (error) {
      console.log(error);
    }
   }

   async function handleStatus(id: string | number) {
    const item = orderList.filter((order) => order._id === id)[0];
    const currentStatus = item.status;
    if(currentStatus === 2) {
      setDelivered(true)
      return;
    }
    try {
      const resp = await axios.put(`http://localhost:3000/api/orders/${id}`, { status: currentStatus + 1,
    });

    setOrderList([
      resp.data,
      ...orderList.filter((order) => order._id !== id),
    ])
    } catch (error) {
      console.log(error);
      
    }
   }

   async function updateProduct(id: string) {
    try {
      const resp = await axios.get(`http://localhost:3000/api/products/${id}`)
      console.log(resp.data)
    } catch(error) {
      console.log(error)
    }
   }

   function handlelogout() {
   
      let allCookies = document.cookie.split('%');
      
  
      // The "expire" attribute of every cookie is 
      // Set to "Thu, 01 Jan 1970 00:00:00 GMT"
      // for (let i = 0; i < allCookies.length; i++){
      // }
      // allCookies[0] + "=;expires=" + new Date(0).toUTCString();
      console.log(allCookies)
      

   }
  return (
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
                <td>{product.prices[0]}</td>
                <td>
                  <button 
                  onClick={() => updateProduct(product._id)}
                  className={styles.button}>Edit</button>
                  <button 
                    onClick={() => handleDelete(product._id)}
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
                    <td>{order.total}</td>
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
    </div>
   </Layout>
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
  }
}


  const productResp = await axios.get("http://localhost:3000/api/products");
  const orderResp = await axios.get("http://localhost:3000/api/orders");

  return {
    props: {
      orders: orderResp.data,
      products: productResp.data,
    }
  }
}