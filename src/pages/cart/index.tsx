import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useRouter } from 'next/router';
import { reset } from '../../redux/cartSlice';
import { OrderDetail } from '../../components/OrderDetail';
import { Layout } from '../../components/Layout';
import { HeadDocument } from '@/components/HeadDocument';
import Image from 'next/image';
import axios from 'axios';
import styles from '@/styles/Cart.module.css';




export default function Cart() {
  const cart = useSelector((state: RootState) => state.cart);
  // console.log('cart', cart);
  const dispatch = useDispatch();//redux
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);

  //paypal
  // This values are the props in the UI
const amount = `${cart.total}`;
const currency = "EUR";
const style = {"layout":"vertical"};

async function createOrder(data: unknown) {
  try {
    const res = await axios.post('http://localhost:3000/api/orders', data);
    if(res.status === 201) {
      dispatch(reset());//redux
      router.push(`/orders/${res.data._id}`);
    }
  } catch (error) {
    console.log(error);
  }

}


// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({ currency, showSpinner }: PaypalButton) => {
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
              style={{ layout: "vertical" }}
              disabled={false}
              forceReRender={[amount, currency, style]}
              fundingSource={undefined}
              createOrder={async (data, actions) => {
                  const orderId = await actions.order
                  .create({
                    purchase_units: [
                      {
                        amount: {
                          currency_code: currency,
                          value: amount,
                        },
                      },
                    ],
                  });
                return orderId;
              }}//remove async await
              onApprove={async function (data, actions) {
                  const details = await actions.order.capture();
                const shipping = details.purchase_units[0].shipping;
                createOrder({
                  customer: shipping.name.full_name,
                  address: shipping.address.address_line_1,
                  total: cart.total,
                  method: 1, //
                });
              }}
          />
      </>
  );
}

// console.log(open)

  return (
    <>
    <HeadDocument title={`Cart`}/>
    <Layout>
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
          <tr className={styles.tr} key={`productID-${product.createdAt}`}>
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
                <span key={extra._id}>{extra.text}, </span>
              ))}
            </span>
          </td>
          <td>
            <span className={styles.price}>€{product.price}</span>
          </td>
          <td>
            <span className={styles.quantity}>{product.quantity}</span>
          </td>
          <td>
            <span className={styles.total}>€{product.price * product.quantity}</span>
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
          <b className={styles.totalTextTitle}>Subtotal: </b>€{' '}{cart.total}
        </div>
        <div className={styles.totalText}>
          <b className={styles.totalTextTitle}>Discount: </b>€ 0.00
        </div>
        <div className={styles.totalText}>
          <b className={styles.totalTextTitle}>Total: </b>€{' '}{cart.total}
        </div>
        {open ? (
          <div className={styles.paymentMethods}>
            <button 
            onClick={() => setCash(true)}
            className={styles.payButton}
            > CASH ON DELIVERY</button>

        <PayPalScriptProvider
                options={{
                    "client-id": `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}`,
                    components: "buttons",
                    currency: "EUR",
                    
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
    {cash && <OrderDetail total={cart.total} createOrder={createOrder}  setCash={setCash}/>}
  </div>
    </Layout>
    </>
  );
}
