import Popup from "@/components/CartPopup";
import HomeSwiper from "@/components/HomeSwiper";
import { useAppContext } from "@/context/AppContext";
import { useState } from "react";

export default function Home() {
  const {state, dispatch} = useAppContext()
  const {srpReducer} = state
  const [popUpVisible, setPopUpVisible] = useState(false)
  const onClose = () => {
    setPopUpVisible(false)
    dispatch({type: 'PopHandle', payload: false})
  }
  
  return (
    <>
      <Popup popUpVisible={popUpVisible} onClose = {onClose}/>
      <HomeSwiper />
    </>
  );
}
