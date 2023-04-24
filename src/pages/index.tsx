import Head from 'next/head';
import Featured from '@/components/Featured';
import PizzaList from '@/components/PizzaList';
import axios from 'axios';
import { NextApiRequest } from 'next';
import { useState } from 'react';
import AddButton from '@/components/AddButton';
import { AddProduct } from '@/components/AddProduct';
import styles from '@/styles/Home.module.css';


export default function Home({ pizzaList }: { pizzaList: ProductBase[], admin: boolean}) {
const [close, setClose] = useState(true);

  return (
    <div className={styles.container}>
      <Head>
        <title>Pizzeria</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
     
      <Featured/>
      {<AddButton setClose={setClose}/>}
      <PizzaList pizzaList={pizzaList}/>
      {!close && <AddProduct setClose={setClose}/>}
    </div>
  )
}



type Ctx = {
req: NextApiRequest;
}

export async function getServerSideProps(ctx: Ctx) {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;


  if(myCookie.token === process.env.TOKEN) {

    admin = true
  }

  const resp = await axios.get("http://localhost:3000/api/products");
  
  // console.log(ctx, 'server')
 
  return {
    props: {
      pizzaList: resp.data,
    }
  }
}