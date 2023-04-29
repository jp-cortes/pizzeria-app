import React, { useState } from 'react';
import Image from 'next/image';
import styles from '@/styles/Featured.module.css';


export function Featured() {
    const [imgIndex,setImgIndex] = useState(0);

    const images = [
        '/img/2.png',
        '/img/4.png',
        '/img/3.png',
    ];

    function handleArrow(direction: string) {
        if(direction === 'left') {
            setImgIndex(imgIndex !== 0 ? imgIndex - 1 : 2);
        }
        else if(direction === 'right') {
            setImgIndex(imgIndex !== 2 ? imgIndex + 1 : 2);
        }
    }

  return (
    <div className={styles.container}>
        <div 
        onClick={() => handleArrow('left')}
        className={styles.arrowContainer} style={{ left: 0 }}
        >
        <Image src='/img/arrowl.png' alt='arrow_left' fill style={{ objectFit: 'contain' }}/>
        </div>
        <div className={styles.wrapper} style={{ transform: `translateX(${-100 * imgIndex}vw)`}}>
            {images.map((img, i) => (
                <div className={styles.imgContainer} key={i}>
                    <Image src={img} alt='features' fill style={{ objectFit: 'contain' }}/>
                    <Image
            className={styles.logo}
            src='/img/logo.png' alt='logo' width={300} height={300}/>
                </div>
            ))}
        </div>
        <div 
        onClick={() => handleArrow('right')}
        className={styles.arrowContainer} style={{ right: 0 }}
        >
        <Image src='/img/arrowr.png' alt='arrow_left' fill style={{ objectFit: 'contain' }}/>
        </div>
    </div>
  )
}
