import { useAppContext } from '@/context/AppContext';
import style from './style.module.scss';
import React, { useEffect, useState } from 'react';
import { getCartItems } from '../../pages/api/serviceAPI';

const CartItem = () => {
  const { state, dispatch } = useAppContext();
  const { srpReducer } = state;
  const [allData, setAllData] = useState({});
  console.log(srpReducer.cartValue, 'children123');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCartItems(localStorage.getItem('UserID'));
        setAllData(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className={style.cartContainer}>
      <div className={style.cartItems}>
      {console.log(allData,'allData123')}
        {allData?.userCartData?.cart?.map((item, index) => (
          <div key={index} className={style.cartItem}>
            <div>{item.product}</div>
            <img src={item.images} alt={item.title} />
            <div>PRICE - {item.price}</div>
          </div>
        ))}
      </div>
      {/* <div className={style.cartSummary}>
        <div>Total - Price = {allData.total}</div>
        <div>Total Quantity = {allData.totalQuantity}</div>
        <div>Total Product = {allData.totalProducts}</div>
      </div> */}
    </div>
  );
};

export default CartItem;
