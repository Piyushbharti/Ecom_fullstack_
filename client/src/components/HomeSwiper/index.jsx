import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";
import style from "./style.module.scss";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SwiperButton from "../SwiperButton";

const HomeSwiper = () => {
  const images = [
    "/image1.jpg",
    "/image2.jpg",
  ];
  return (
    <div className={style.container}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay, A11y]}
        // navigation={true}
        loop={true}
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        className="mySwiper"
      >
        {images.map((item)=>{
        return <SwiperSlide>
            <img className={style.images} src={item} />
        </SwiperSlide>
        })}
        <SwiperButton/>
      </Swiper>
    </div>
  );
};

export default HomeSwiper;
