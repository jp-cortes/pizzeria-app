import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/cartSlice';
import { Layout } from '../../components/Layout';
import { HeadDocument } from '@/components/HeadDocument';
import Image from 'next/image';
import axios from 'axios';
import styles from '@/styles/Product.module.css';


export default function Product({ pizza  }: { pizza: ProductBase}) {
  //states
    const dispatch = useDispatch();
    const [size, setSize] = useState(0);
    const [price, setPrice] = useState(pizza.prices[0]);
    const [extras, setExtras] = useState(Array<ProductOptions>);
    const [quantity, setQuantity] = useState(1);
    // console.log(pizza)

    function ChangePrice(number: number) {
        setPrice(price + number);
    }
    //change the price on  a dynamic way on click
    function handleSize(sizeIndex: number) {
        const difference = pizza.prices[sizeIndex] - pizza.prices[size];
        setSize(sizeIndex);
        ChangePrice(difference);
    }
//change the price adding the extra options
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
function handleInputChange (event: React.ChangeEvent<HTMLInputElement>) {
    //set the quantity to the shoping cart
 setQuantity(parseInt(event.target.value, 10))
}

// send everything to the shopping cart
function handleClick() {
dispatch(addProduct({...pizza, extras, price, quantity }));
}

  return (
    <>
    <HeadDocument title={`${pizza.title} Pizza`}/>
    <Layout>
      <div className={styles.container}>
         <div className={styles.left}>
             <div className={styles.imgContainer}>
                 <Image src={pizza.img} priority fill style={{ objectFit: 'contain' }} alt="product_img"/>
             </div>
         </div>
         <div className={styles.right}>
             <h1 className={styles.title}>{pizza.title}</h1>
 
             <span className={styles.price}>€{price}</span>
             <p className={styles.desc}>{pizza.desc}</p>
             <h3 className={styles.choose}>Choose the size</h3>
             <div className={styles.sizes}>
                 <button type='button' className={styles.size} onClick={() => handleSize(0)}>
                     <Image src='/img/size.png' fill alt='small_pizza'/>
                     <span className={styles.number}>Small</span>
                 </button>
                 <button type='button' className={styles.size} onClick={() => handleSize(1)}>
                     <Image src='/img/size.png' fill alt='medium_pizza'/>
                     <span className={styles.number}>Medium</span>
                 </button>
                 <button type='button' className={styles.size} onClick={() => handleSize(2)}>
                     <Image src='/img/size.png' fill alt='large_pizza'/>
                     <span className={styles.number}>Large</span>
                 </button>
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
                 <input onChange={handleInputChange} 
                 type='number' 
                 defaultValue={1}
                 min={1} 
                 className={styles.quantity}/>
                 <button
                  className={styles.button}
                 onClick={handleClick}
                 >Add to Cart</button>
             </div>
         </div>
     </div>
    </Layout>
    </>
  );
}


export async function getServerSideProps({ params } :{ params : ProductBase }) {
    const resp = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`);

    // console.log(resp, 'server')
   
    return {
      props: {
        pizza: resp.data,
      }
    };
  }