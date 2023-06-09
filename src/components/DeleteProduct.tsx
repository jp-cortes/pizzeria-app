import Image from 'next/image';
import axios from 'axios';
import styles from '@/styles/Dashboard.module.css';

type Props = {
    productId: string;
    setPizzaList: Function;
    pizzaList: ProductBase[];
    setWarning: Function;

};

export function DeleteProduct({ productId, setPizzaList, pizzaList, setWarning }: Props) {

    async function handleDelete(id:string | number) {
        // console.log(id);
        try {
          await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
          setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
        } catch (error) {
          console.log(error);
        };
       }

  return (
    <div className={styles.containerDelete}>
        <div className={styles.wrapperDelete}>
            <Image src='/img/warning.png' alt='warning_icon' width={50} height={50}/>
            <h3>Do you want to delete this product?</h3>
            <div className={styles.wrapperButtons}>
            <button 
            onClick={() => {
              handleDelete(productId);
              setWarning((prev: boolean) => !prev);
            }}
            className={`${styles.deleteButton} ${styles.confirm}`}>Sure</button>
            <button 
            onClick={() => setWarning((prev: boolean) => !prev) }
            className={`${styles.deleteButton} ${styles.cancel}`}>Cancel</button>
            </div>
        </div>
    </div>
  );
}