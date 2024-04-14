import React, { useEffect, useState } from 'react'
import styles  from './style.module.scss'

const Scroller = () => {
    const [scollPosition , setScrollPosition] = useState(0)
    useEffect(() => {
      const handleScroll = () => {
        if(window.scrollY > 0){
          setScrollPosition(window.scrollY)
        }
      };
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };
  return (
    <>
    {scollPosition > 270 && 
          <button className={styles.scrollToTopButton} onClick={scrollToTop}>
            scroll to top
          </button>
        }
    </>
  )
}

export default Scroller
