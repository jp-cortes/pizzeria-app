import React from 'react';
import Image from 'next/image';
import axios from 'axios';
import styles from '@/styles/Dashboard.module.css';

type Props = {
    productId: string;
    setPizzaList: Function;
    pizzaList: ProductBase[];
    setWarning: Function;

}

export default function DeleteProduct({ productId, setPizzaList, pizzaList, setWarning }: Props) {

    async function handleDelete(id:string | number) {
        // console.log(id);
        try {
          await axios.delete(`http://localhost:3000/api/products/${id}`);
          setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
        } catch (error) {
          console.log(error);
        }
       }

  return (
    <div className={styles.containerDelete}>
        <div className={styles.wrapperDelete}>
            <Image src='' alt='' width={50} height={50}/>
            <button 
            onClick={() => handleDelete(productId)}
            className={styles.confirm}>Sure</button>
            <button 
            onClick={() => setWarning(prev => !prev) }
            className={styles.cancel}>Cancel</button>
        </div>
    </div>
  )
}