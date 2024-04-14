import { getCartItems } from "@/pages/api/serviceAPI";
import Popup from "../CartPopup";
import Navbar from "../Navbar";
import { useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { isUserLoggedIn } from "@/utils/utils";

const Layout = ({ children }) => {
  const { state, dispatch } = useAppContext();
  const { srpReducer } = state;
  useEffect(()=>{
    const fetchData = async() => {
      if(isUserLoggedIn){
        const response = await getCartItems(localStorage.getItem('UserID'))
        dispatch({type: 'COUNT', payload : response.userCartData.cartCount})
        return response
      }
    } 
    fetchData()
  },[])
  return (
    <div>
      <Navbar />
      <Popup />
      {children}
    </div>
  );
};

export default Layout;