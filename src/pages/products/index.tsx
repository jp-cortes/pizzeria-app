import React, { useState } from 'react';
import { PizzaCard } from '@/components/PizzaCard';
import { AddButton } from '@/components/AddButton';
import { AddProduct } from '@/components/AddProduct';
import { Layout } from '@/components/Layout';
import Link from 'next/link';
import axios from 'axios';
import styles from '@/styles/AllProducts.module.css';



  export  default function Products({ pizzaList, admin }: { pizzaList: ProductBase[], admin: boolean}) {
    const [close, setClose] = useState(true);

    return (
   <Layout>
     {admin && 
      <>
      <AddButton setClose={setClose}/>
      <Link
      className={styles.dashboardButton}
      href='/dashboard'>
        Dashboard
      </Link>
      </>
      }
       {!close && <AddProduct setClose={setClose}/>}
       <div className={styles.container}>
          <h1 className={styles.title}>Our Specialties</h1>
          <p className={styles.desc}>
              There is a  different Promotion everyday!
          </p>
          <div className={styles.wrapper}>
            {pizzaList?.map((pizza) => (
       <PizzaCard pizza={pizza} key={pizza._id} />
     ))}
          </div>
      </div>
   </Layout>
    );
  }

  export async function getServerSideProps(ctx: Ctx) {
    const myCookie = ctx.req?.cookies || "";
    let admin = false;
  
  //if the token is active
    if(myCookie.token === process.env.TOKEN) {
      //admin already log in
      admin = true; 
    }
  
    const resp = await axios.get("http://localhost:3000/api/products");
  
    return {
      props: {
        pizzaList: resp.data,
        admin,
      },
    }
   
  }