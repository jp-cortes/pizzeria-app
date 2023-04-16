import React, { useState } from 'react';
import styles from '@/styles/Product.module.css';
import Image from 'next/image';
import axios from 'axios';


export default function Product({ pizza  }: { pizza: ProductBase}) {
    const [size, setSize] = useState(0);
    const [price, setPrice] = useState(pizza.prices[0]);
    const [extras, setExtras] = useState(Array<ProductOptions>);
    const [quantity, setQuantity] = useState(1);
    // console.log(extras)

    function ChangePrice(number: number) {
        setPrice(price + number);
    }
    
    function handleSize(sizeIndex: number) {
        const difference = pizza.prices[sizeIndex] - pizza.prices[size];
        setSize(sizeIndex)
        ChangePrice(difference);
    }

function handleChange(event: React.ChangeEvent<HTMLInputElement>, option:ProductOptions) {
    const checked = event.target.checked;

    if(checked) {
ChangePrice(option.price);
setExtras([...extras, option]);
} else {
        ChangePrice(-option.price);
        setExtras(extras.filter((extra) => extra._id !== option._id))

    }
}

  return (
    <div className={styles.container}>
        <div className={styles.left}>
            <div className={styles.imgContainer}>
                <Image src={pizza.img} fill style={{ objectFit: 'contain' }} alt="product_img"/>
            </div>
        </div>
        <div className={styles.right}>
            <h1 className={styles.title}>{pizza.title}</h1>

            <span className={styles.price}>${price}</span>
            <p className={styles.desc}>{pizza.desc}</p>
            <h3 className={styles.choose}>Choose the size</h3>
            <div className={styles.sizes}>
                <div className={styles.size} onClick={() => handleSize(0)}>
                    <Image src='/img/size.png' fill alt=''/>
                    <span className={styles.number}>Small</span>
                </div>
                <div className={styles.size} onClick={() => handleSize(1)}>
                    <Image src='/img/size.png' fill alt=''/>
                    <span className={styles.number}>Medium</span>
                </div>
                <div className={styles.size} onClick={() => handleSize(2)}>
                    <Image src='/img/size.png' fill alt=''/>
                    <span className={styles.number}>Large</span>
                </div>
            </div>
            <h3 className={styles.choose}>Choose aditional Ingredients</h3>

            <div className={styles.ingredients}>
                {pizza.extraOptions.map((options) => (
                <div className={styles.option} key={options._id}>
                    <input
                    type='checkbox'
                    id='double'
                    name='double'
                    className={styles.checkbox}
                    onChange={(event) => handleChange(event,options)}
                    />
                    <label htmlFor='double'>{options.text}</label>
                </div>
                ))}
            </div>
            <div className={styles.add}>
                <input onChange={(event) => setQuantity(event.target.value)} type='number' defaultValue={1} className={styles.quantity}/>
                <button className={styles.button}>Add to Cart</button>
            </div>
        </div>
    </div>
  )
}


export async function getServerSideProps({ params } :{ params : ProductBase }) {
    const resp = await axios.get(`http://localhost:3000/api/products/${params.id}`);

    console.log(resp, 'server')
   
    return {
      props: {
        pizza: resp.data,
      }
    }
  }