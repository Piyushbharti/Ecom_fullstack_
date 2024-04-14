import React from 'react';
import style from "./style.module.scss";
import { useAppContext } from '@/context/AppContext';
import CartItem from '../cartItem';
const Popup = ({ onClose, popUpVisible ,children}) => {
    const {state, dispatch} = useAppContext()
    const {srpReducer} = state
    console.log(srpReducer.cartValue,'children')
    const handleClose = () =>{
        dispatch({type: 'PopHandle', payload: false})
    }
  return (
    <>
    {(srpReducer.isPopUpOpen)  && <div className={style.popup}>
      <div className={style.popupCcontent}>
        <button className={style.closeBtn} onClick={handleClose}>X</button>
        <CartItem />
      </div>
    </div>}
    </>
  );
};

export default Popup;
