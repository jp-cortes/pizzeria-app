import { useState } from 'react';
import { useRouter } from 'next/router';
import { Layout } from '../../components/Layout';
import { HeadDocument } from '@/components/HeadDocument';
import axios from 'axios';
import styles from  '@/styles/Login.module.css';

export default function Login() {
    
const [username, setUsername] = useState<string | null>(null);
const [password, setPassword] = useState<string | null>(null);
const [error, setError] = useState(false);
const router = useRouter();

async function handleCLick(e: { preventDefault: () => void; }) {
    e.preventDefault();
    try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
            username, 
            password,
        });
        router.push('/dashboard');
    } catch (error) {
        setError(true);
      
    }
  
}


  return (
    <>
    <HeadDocument title={`Dashboard Login`}/>
   <Layout>
     <div className={styles.container}>
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Admin Dashboard</h1>
            <form className={styles.form}
            onSubmit={handleCLick}>
                <label>Username</label>
            <input
            placeholder='admin404'
            className={error ? styles.inputError : styles.login}
            onChange={(e) => {
                setError(false);
                setUsername(e.target.value);
            }}
            
            />
            <label>Password</label>
            <input
            placeholder='Admin@123'
            type='password'
            className={error ? styles.inputError : styles.input}
            onChange={(e) => {
                setError(false);
                setPassword(e.target.value);
            }}
            />
            <button 
            
            className={error ? styles.buttonError :styles.button}
            >
                Sign In
            </button>
            </form>
            {error && <span className={styles.error}>Wrong Credentials!</span>}
        </div>
    </div>
   </Layout>
    </>
  );
}