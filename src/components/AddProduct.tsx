import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from ' @/styles/AddProduct.module.css';

type Props = {
    setClose: Function;
}

export function AddProduct({ setClose }: Props) {
  const [file, setFile] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [desc, setDesc] = useState<string | null>(null);
  const [prices, setPrices] = useState<number[]| string[]>([]);
  const [extraOptions, setExtraOptions] = useState([]);
  const [extra, setExtra] = useState<string | null>(null);

  function changePrice(e: unknown | null, index: number) {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  }

function handleExtraInput(e) {
  //handle all the inputs
  setExtra({ ...extra, [e.target.name]: e.target.value})
}

function handleExtra() {
  setExtraOptions((prev) => [...prev, extra]);
}

async function handleCreate() {

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "uploads");


  try {
    const uploadRes = await axios.post("",
    data
    );
    const { url } = uploadRes.data;
    const newProduct = {
      title,
      desc,
      prices,
      extraOptions,
      img: url,
    };

    await axios.post("http://localhost:3000/api/products", newProduct);
    setClose(true);
  } catch (error) {
    console.log(error);
  }
}
  return (
    <div className={styles.container}>

      <div className={styles.wrapper}>
        <span onClick={() => setClose(true)} className={styles.close}>
          X
          </span>
          <h2>Add New Pizza</h2>
          <div className={styles.item}>
            <label className={styles.label}>Choose an image</label>
            <input type='file' onChange={(e) => setFile(e.target.files[0])}/>
          </div>
          <div className={styles.item}>
            <label className={styles.label}>Title</label>
            <input
            className={styles.input}
            type='text'
            onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={styles.item}>
            <label className={styles.label}>Description</label>
            <textarea
            rows={4}
            // type='text'
            onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className={styles.item}>

            <label className={styles.label}>Prices</label>
            <div className={styles.priceContainer}>
            <input
            className={`${styles.input} ${styles.inputSm}`}
            type='number'
            placeholder='Small'
            onChange={(e) => changePrice(e, 0)}
            />
            <input
            className={`${styles.input} ${styles.inputSm}`}
            type='number'
            placeholder='Medium'
            onChange={(e) => changePrice(e, 1)}
            />
            <input
            className={`${styles.input} ${styles.inputSm}`}
            type='number'
            placeholder='Large'
            onChange={(e) => changePrice(e, 2)}
            />
            </div>
          </div>
          <div className={styles.item}>
            <label className={styles.label}>Extra</label>
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
            placeholder='Item'
            name='price'
            onChange={handleExtraInput}
            />
            <button className={styles.extraButton} onClick={handleExtra}>
              Add
            </button>
          </div>
          <div className={styles.extraItems}>
            {extraOptions.map((option:{ text: string }) => (
              <span
              className={styles.extraItem}
               key={option.text}>
                {option.text}</span>
            ))}
          </div>
          <button 
          onClick={handleCreate}
          className={styles.addButton}>
            Create
          </button>
      </div>

    </div>
  )
}