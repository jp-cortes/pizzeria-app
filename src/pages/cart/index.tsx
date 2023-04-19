import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import {  PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";


import styles from '@/styles/Cart.module.css';

 interface ProductCart {
  _id: string; 
  img: string; 
  title: string; 
  price: number; 
  quantity: number;
   extras: [
     {
      text: string; 
      _id: string
    }
  ]

};

type RootState = {
  cart: {
    quantity: number;
    total: number;
    products: ProductCart[];
  };
};

export default function Cart() {
  //states
  const [open, setOpen] = useState(false)
  //paypal
  // This values are the props in the UI
const amount = "2";
const currency = "USD";
const style = {"layout":"vertical"};

const cart = useSelector((state: RootState) => state.cart);
const dispatch = useDispatch();
 console.log('cart', cart)


// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({ currency, showSpinner }) => {
  // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
  // This is the main reason to wrap the PayPalButtons in a new component
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
      dispatch({
          type: "resetOptions",
          value: {
              ...options,
              currency: currency,
          },
      });
  }, [currency, showSpinner]);


  return (<>
          { (showSpinner && isPending) && <div className="spinner" /> }
          <PayPalButtons
              style={style}
              disabled={false}
              forceReRender={[amount, currency, style]}
              fundingSource={undefined}
              createOrder={(data, actions) => {
                  return actions.order
                      .create({
                          purchase_units: [
                              {
                                  amount: {
                                      currency_code: currency,
                                      value: amount,
                                  },
                              },
                          ],
                      })
                      .then((orderId) => {
                          // Your code here after create the order
                          return orderId;
                      });
              }}
              onApprove={function (data, actions) {
                  return actions.order?.capture().then(function (details) {
                    console.log(details)
                      // Your code here after capture the order
                  });
              }}
          />
      </>
  );
}



  return (
    <div className={styles.container}>
    <div className={styles.left}>
      <table className={styles.table}>
        <thead>
        <tr className={styles.trTitle}>
          <th>Product</th>
          <th>Name</th>
          <th>Extras</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
        </tr> 
        </thead>
        <tbody>

        {cart.products.map((product: ProductCart) => (
          <tr className={styles.tr} key={product._id}>
          <td>
            <div className={styles.imgContainer}>
              <Image
                src={product.img}
                fill
                style={{ objectFit: "cover" }}
                alt=""
              />
            </div>
          </td>
          <td>
            <span className={styles.name}>{product.title}</span>
          </td>
          <td>
            <span className={styles.extras}>
              {product.extras.map((extra) => (
                <span key={product._id}>{extra.text}, </span>
              ))}
            </span>
          </td>
          <td>
            <span className={styles.price}>${product.price}</span>
          </td>
          <td>
            <span className={styles.quantity}>{product.quantity}</span>
          </td>
          <td>
            <span className={styles.total}>${product.price * product.quantity}</span>
          </td>
        </tr>
        ))}

      
        </tbody>
      </table>
    </div>
    <div className={styles.right}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>CART TOTAL</h2>
        <div className={styles.totalText}>
          <b className={styles.totalTextTitle}>Subtotal:</b>${cart.total}
        </div>
        <div className={styles.totalText}>
          <b className={styles.totalTextTitle}>Discount:</b>$0.00
        </div>
        <div className={styles.totalText}>
          <b className={styles.totalTextTitle}>Total:</b>${cart.total}
        </div>
        {open ? (
          <div className={styles.paymentMethods}>
            <button className={styles.payButton}> CASH ON DELIVERY</button>

        <PayPalScriptProvider
                options={{
                    "client-id": "AYdHi4ACCvLOoon0eLJie42FGPobcWemKvL6flr8HG-4goeWvQYZK6s-icQ50lfA16jeBRK6qsigNiLA",
                    components: "buttons",
                    currency: "USD",
                    "disable-funding": "credit,card,p24"
                  }}
                  >
				<ButtonWrapper
                    currency={currency}
                    showSpinner={false}
                />
			</PayPalScriptProvider>
              </div>
        ) : (
          <button onClick={() => setOpen(true)} className={styles.button}>CHECKOUT NOW!</button>

        )}

      </div>
    </div>
  </div>
  )
}
