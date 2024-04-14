import React from 'react'
import { useSwiper } from 'swiper/react'
import style from './style.module.scss'
const SwiperButton = () => {
  const swiper = useSwiper()
  return (
    <div className={style.navButtons} >
    <button className={style.prevButton} onClick={()=>swiper.slidePrev()}> <img src='/left.png'/> </button>
    <button className={style.nextButton} onClick={()=>swiper.slideNext()}> <img src='/right.png' /> </button>
    </div>
  )
}

export default SwiperButton
