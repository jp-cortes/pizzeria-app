import React, { useState } from 'react';
import { useRouter } from 'next/router';
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
        await axios.post("http://localhost:3000/api/login", {
            username, 
            password,
        });
        router.push('/dashboard');
    } catch (error) {
        setError(true);
      
    }
   
}

function resetInputs() {
    setUsername('');
    setPassword('');
}

  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Admin Dashboard</h1>
            <form className={styles.form}
            onSubmit={handleCLick}>
            <input
            placeholder='Username'
            className={error ? styles.inputError :styles.login}
            onChange={(e) => {
                setError(false);
                setUsername(e.target.value);
            }}
            />
            <input
            placeholder='Password'
            type='password'
            className={error ? styles.inputError :styles.input}
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
  )
}