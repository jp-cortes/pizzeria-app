import { useState } from 'react';
import axios from 'axios';
import styles from '@/styles/AddProduct.module.css';

type Props = {
    setClose: Function;
};
type Options = {
  text: string;
};

export function AddProduct({ setClose }: Props) {
  const [file, setFile] = useState<Blob | string>('');//image
  const [title, setTitle] = useState<string | null>(null);//title
  const [desc, setDesc] = useState<string | null>(null);//description
  const [prices, setPrices] = useState<Array<Options> | any[]>([]);// prices
  const [extraOptions, setExtraOptions] = useState<Array<Options> | any[]>([]);
  const [extra, setExtra] = useState<null | any >(null);//extra options

  function changePrice(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  }

function handleExtraInput(e:React.ChangeEvent<HTMLInputElement>) {
  //handle all the inputs
  setExtra({ ...extra, [e.target.name]: e.target.value})
}

function handleExtra() {
  //handle all extra ingredient in the form
  setExtraOptions((prev) => [...prev, extra]);
}

async function handleCreate(e: { preventDefault: () => void; }) {
  e.preventDefault();
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "uploads");


  try {
    const uploadRes = await axios.post(`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}`,
    data
    );
   //response from the cloud
    const { url } = uploadRes.data;
    const newProduct = {
      title,
      desc,
      prices,
      extraOptions,
      img: url,
    };
    
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products`, newProduct);
    setClose(true);//close the modal
    location.reload();//reload the page if the product is added
  } catch (error) {
    console.log(error);
  };
}

  return (
    <div className={styles.container}>
      <form onSubmit={handleCreate} className={styles.wrapper}>
        <span onClick={() => setClose(true)} className={styles.close}>
          X
        </span>

        <h2>Add New Pizza</h2>
        <div className={styles.item}>

          <label className={styles.label}>Choose an image</label>
          <input type="file"
          required
           onChange={(e: any) => setFile(e.target.files[0])} />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Title</label>
          <input
            className={styles.input}
            type="text"
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.item}>

          <label className={styles.label}>Description</label>
          <textarea rows={4}
          required 
          onChange={(e) => setDesc(e.target.value)} />
        </div>
        <div className={styles.item}>
          
          <label className={styles.label}>Prices</label>
          <div className={styles.priceContainer}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              required
              min={1}
              placeholder="Small"
              onChange={(e) => changePrice(e, 0)}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              required
              min={1}
              placeholder="Medium"
              onChange={(e) => changePrice(e, 1)}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              required
              min={1}
              placeholder="Large"
              onChange={(e) => changePrice(e, 2)}
            />
          </div>
        </div>
        <div className={styles.extra}>
          <label className={styles.label}>Extra</label>
          <input
            className={`${styles.input} ${styles.inputSm}`}
            type="text"
            required
            placeholder="Item"
            name="text"
            onChange={handleExtraInput}
          />
          <input
            className={`${styles.input} ${styles.inputSm}`}
            type="number"
            required
            min={1}
            placeholder="Item"
            name="price"
            onChange={handleExtraInput}
          />
          <button
            type="button"
            className={styles.extraButton}
            onClick={handleExtra}
          >
            Add
          </button>
        </div>
        <div className={styles.extraItems}>
          {extraOptions.map((option) => (
            <span className={styles.extraItem} key={option.text}>
              {option.text}
            </span>
          ))}
        </div>
        <button className={styles.addButton}>Create</button>
      </form>
    </div>
  );
}