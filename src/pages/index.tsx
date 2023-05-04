import { Featured } from '../components/Featured';
import { PizzaList } from '../components/PizzaList';
import { Layout } from '../components/Layout';
import { HeadDocument } from '../components/HeadDocument';
import axios from 'axios';
import styles from '@/styles/Home.module.css';


export default function Home({ pizzaList }: { pizzaList: ProductBase[]}) {
  return (
    <Layout>
      <HeadDocument title='Pizzeria Home'/>
    <div className={styles.container}>
      <Featured/>      
      <PizzaList pizzaList={pizzaList}/>
     
    </div>
    </Layout>
  );
}





export async function getServerSideProps() {

 const resp = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
  // console.log(resp.status, 'server')

  return {
    props: {
      pizzaList: resp.data,
    
    },
  }
 
}