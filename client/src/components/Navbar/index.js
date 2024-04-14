import React, { useEffect, useState } from "react";
import Link from "next/link";
import style from "./style.module.scss";
import { useRouter } from "next/router";
import { useAppContext } from "@/context/AppContext";
import SearchBar from "../searchBar/search";

const menuItems = {
  names: ["Login", "Trending", 'cart'],
  icon: ['user.png','trending-topic.png','shopping-cart.png'],
  redirection: ["/singin", "/Trending",''],
  textColor: ["black", "black", "black", "black", "black", "white"],
  hoverBg: [
    "indigo-500",
    "indigo-500",
    "indigo-500",
  ],
  bg: ["white", "white", "white"],
  hoverTextColor: ["white", "white", "white"],
};

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const {state, dispatch} = useAppContext()
  const {srpReducer} = state
  const router = useRouter();
  const handleNavbar = () => {
    setNavbarOpen((prevData) => !prevData);
  };
  const navbarMenuOpen = () => {
    return (
      <svg
        className="h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    );
  };

  const navbarMenuClosed = () => {
    return (
      <svg
        className="h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16m-7 6h7"
        />
      </svg>
    );
  };
  const [searchValue, setSearchValue] = useState('')
  const handleChange = (e) => {
    setSearchValue(e.target.value)
  }
  const handleRoute = () => {
    router.push(searchValue)
  }
  const handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      handleRoute()
    }
  }
  return (
    <>
      <nav className={`bg-white shadow-lg sticky top-0 ${style.main}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href="/" className="text-blue">
                  <img className={style.logo} src='/EcomLogo.jpg' />
                </Link>
              </div>
              <SearchBar handleChange = {handleChange} handleKeyPress = {handleKeyPress} handleRoute = {handleRoute}/>
            </div>
            <div className="hidden md:block">
              <NavItemsDesktop handleNavbar={handleNavbar} />
            </div>
            <div className="md:hidden flex items-center">
              <button
                className="inline-flex items-center justify-center p-2 rounded-md text-blue-800 md:text-blue-800 hover:text-blue-800 focus:ring-inset "
                onClick={handleNavbar}
              >
                {navbarOpen ? navbarMenuOpen() : navbarMenuClosed()}
              </button>
            </div>
          </div>
        </div>
        {navbarOpen && <NavItemsMobile handleNavbar={handleNavbar} />}
      </nav>
    </>
  );
};

export default Navbar;

const NavItemsDesktop = ({handleNavbar}) => {
  const router = useRouter();
  const {state, dispatch} = useAppContext()
  const {srpReducer} = state
  const handleNavigation = (index) => {
    if(menuItems.names[index] === 'cart'){
           dispatch({type: 'PopHandle', payload: true})
           console.log(state)
    }
    else{
      router.push(menuItems?.redirection[index])
    }
  } 
  // useEffect(()=>{
  //   console.log(srpReducer.cartCount,'cartCount',state)
  // },[state])
  const commonData = menuItems?.names?.map((item, index) => (
    <a
      key={index}
      onClick={()=>handleNavigation(index)}
      className={`px-3 text-${menuItems?.textColor[index]} bg-${menuItems?.bg[index]}-500 hover:text-${menuItems?.hoverTextColor[index]} rounded-lg p-2`}
    > 
      <div className={style.iconContainer}>
      <img className={style.icons} src={menuItems?.icon[index]} />
      {item === 'cart' &&  srpReducer.cartCount!==0 ? `${item} ${srpReducer?.cartCount}`: item}
      </div>
    </a>
  ));
  return (
    <>
      
  <div onClick={handleNavbar} className="ml-4 flex items-center space-x-2">{commonData}</div>
    </>
  )
};

const NavItemsMobile = ({handleNavbar}) => {
  const router = useRouter();

  const handleNavigation = (index) => {
    router.push(menuItems?.redirection[index])
  }
  const commonData = menuItems?.names?.map((item, index) => (
    <a
      key={index}
      onClick={()=>handleNavigation(index)}
      className={`px-5 block text-${menuItems?.textColor[index]} bg-${menuItems?.bg[index]}-500 hover:bg-${menuItems?.hoverBg[index]} hover:text-${menuItems?.hoverTextColor[index]} rounded-lg p-2`}
    >
      {item}
    </a>
  ));
  return (
    <div onClick={handleNavbar} className="md:hidden">
      <div className="px-2 pt-3 pb-3 space-y-2 sm:px-3">{commonData}</div>
    </div>
  );
};
