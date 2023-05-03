import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '@/styles/AddProduct.module.css';

type Props = {
    setUpdate: Function;
    productId: string;
};

type Options = {
  text: string;
  price: string;
}

export function UpdateProduct({ setUpdate, productId }: Props) {
  //states
  const [file, setFile] = useState<Blob | string >('');//image
  const [title, setTitle] = useState<string | null>(null);//title
  const [desc, setDesc] = useState<string | null>(null);//description
  const [prices, setPrices] = useState<number[]| string[]>([]);//prices
  const [options, setOptions] = useState<Array<Options> | any[]>([]); 
  const [extra, setExtra] = useState<null | any>(null);//extra options>
  const [currentProduct, setCurrentProduct] = useState<ProductBase | null>(null);

  function changePrice(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  }

function handleExtraInput(e: React.ChangeEvent<HTMLInputElement>) {
  //handle all the inputs
  setExtra({ ...extra, [e.target.name]: e.target.value})
}

function handleExtra() {
  //handle all extra ingredient in the form
  setOptions((prev) => [...prev, extra]);
}

useEffect(() => {
    async function getProduct() {
        try {
            const resp = await axios.get(`http://localhost:3000/api/products/${productId}`);
            setCurrentProduct(resp.data);
        } catch (error) {
            console.log(error);
        }
    }
    getProduct();

}, [productId]);

async function handleUpdate(e: { preventDefault: () => void; }) {
  e.preventDefault();

    const updatedProduct = {
        title: title || currentProduct?.title,
        desc: desc || currentProduct?.desc,
        prices: prices,
        extraOptions: options,
        img: currentProduct?.img,
    }
    
    
    try {   
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "uploads");
      if(!data) {
        //if data is not an empty object
        //mean if there is a new image will be updated
      const updateRes = await axios.post(`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}`,
      data
      );
      const { url } = updateRes.data;
      updatedProduct.img  = url;
    } 
    //  if there is no new image will be the same by default
      await axios.put(`http://localhost:3000/api/products/${productId}`, updatedProduct);
      setUpdate(true);//close the modal
      location.reload();//reload the page if the product is updated
    
    
  } catch (error) {
    console.log(error);
  }
  // console.log(data)
}


  return (
    <div className={styles.container}>

      <form 
       onSubmit={handleUpdate}
      className={styles.wrapper}>
        <span onClick={() => setUpdate(false)} className={styles.close}>
          X
          </span>
          <h2>Update Pizza</h2>
          <div className={styles.item}>
            <label className={styles.label}>Image</label>
            <small>Image will be the same by unless you change it</small>
            <br/>
            <input 
            type='file' 
            onChange={(e: any) =>  setFile(e.target.files[0])}
            />

          </div>
          <div className={styles.item}>
            <label className={styles.label}>Title</label>
            <input
            className={styles.input}
            type='text'
            onChange={(e) => setTitle(e.target.value)}
            defaultValue={currentProduct?.title}
            />
          </div>
          <div className={styles.item}>
            <label className={styles.label}>Description</label>
            <textarea
            rows={4}
            onChange={(e) => setDesc(e.target.value)}
            defaultValue={currentProduct?.desc}
            />
          </div>
          <div className={styles.item}>

            <label className={styles.label}>Prices</label>
            <div className={styles.priceContainer}>
            <input
            className={`${styles.input} ${styles.inputSm}`}
            type='number'
            min={1}
            placeholder='Small'
            onChange={(e) => changePrice(e, 0)}
            defaultValue={currentProduct?.prices[0]}
            />
            <input
            className={`${styles.input} ${styles.inputSm}`}
            type='number'
            min={1}
            placeholder='Medium'
            onChange={(e) => changePrice(e, 1)}
            defaultValue={currentProduct?.prices[1]}
            />
            <input
            className={`${styles.input} ${styles.inputSm}`}
            type='number'
            min={1}
            placeholder='Large'
            onChange={(e) => changePrice(e, 2)}
            defaultValue={currentProduct?.prices[2]}
            />
            </div>
          </div>
          <div className={styles.extra}>
            <label className={styles.label}>Extra Options</label>
         
            <input
             className={`${styles.input} ${styles.inputSm}`}
             type='text'
             placeholder='Item'
             name='text'
             onChange={handleExtraInput}
             />
             <input
             className={`${styles.input} ${styles.inputSm}`}
             type='number'
             min={1}
             placeholder='Item'
             name='price'
             onChange={handleExtraInput}
             />
            
           
            <button 
            type='button'
            className={styles.extraButton} onClick={handleExtra}>
              Add
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center', paddingTop: '10px'}}>
            <p>Actual options</p>
            {/* render the actual options */}
            {currentProduct?.extraOptions.map((option) => (
              <span
              className={styles.extraItem}
               key={option._id}>
                {option.text}
              {' '}{' '}<b>€{option.price}</b>
                </span>
            ))}
            {/* this  will add the extra options */}
             {options.map((option) => (
                <>
                <p>New option</p>
              <span
              className={styles.extraItem}
               key={option.text}>
                {option.text}
                {' '}{' '}<b>€{option.price}</b>
                </span>
                </>
            ))}
          </div>
          <button 
      
          className={styles.addButton}>
            Update
          </button>
      </form>

    </div>
  )
}