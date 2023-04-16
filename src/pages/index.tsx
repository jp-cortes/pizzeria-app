import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import Featured from '@/components/Featured';
import PizzaList from '@/components/PizzaList';
import axios from 'axios';


export default function Home({ pizzaList }: { pizzaList: ProductBase[]}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
     
      <Featured/>
      <PizzaList pizzaList={pizzaList}/>
    </div>
  )
}


export async function getServerSideProps() {
  const resp = await axios.get("http://localhost:3000/api/products");
  
  console.log(resp, 'server')
 
  return {
    props: {
      pizzaList: resp.data,
    }
  }
}