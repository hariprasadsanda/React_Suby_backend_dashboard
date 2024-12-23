import React, { useEffect } from 'react'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import Vendorregister from '../Forms/Vendorregister'
import Vendorlogin from '../Forms/Vendorlogin'
import Addfirm from '../Forms/Addfirm'
import AddProducts from '../Forms/AddProducts'
import { useState } from 'react'
import { use } from 'react'
import Welcome from '../Welcome'
import Allproducts from '../../Allproducts'


const LandingPage = () => {

  const [loginPage,setLoginpage]=useState(false);
  const [registerPage,setRegisterPage]=useState(false);
  const [addFirm, setAddFirm]= useState(false);
  const [addProduct,setAddProduct]=useState(false)
  const[welcome,setWelcome]=useState(false)
  const[getAllProducts,setGetallProducts]=useState(false)
  const[logOut,setLogOut]=useState(false)
  const[showFirmTitle,setShowFirmTile]=useState(true)


  useEffect(()=>{
    const loginToken = localStorage.getItem('loginToken')
    if(loginToken){
     setLogOut(true)
    }
  }
 )

 useEffect(()=>{
  const firmName= localStorage.getItem('firmName')
  if(firmName){
    setShowFirmTile(false)
  }
 })

 const logOutHandler=()=>{
  confirm("Do You Wanted To Log Out...?")
  localStorage.removeItem('loginToken')
  localStorage.removeItem('firmId')
  localStorage.removeItem('firmName')
  setLogOut(false)
  setShowFirmTile(true)
 }
  const loginpageHandler=()=>{
    setLoginpage(true)
    setRegisterPage(false)
    setAddFirm(false)
    setAddProduct(false)
    setWelcome(false)
    setGetallProducts(false)
  }
  
  const registerPageHandler=()=>{
    setRegisterPage(true)
    setLoginpage(false)
    setAddFirm(false)
    setAddProduct(false)
    setWelcome(false)
    setGetallProducts(false)
  }
  
  const addFirmHandler=()=>{
    if(logOut){
    setAddFirm(true)
    setLoginpage(false)
    setRegisterPage(false)
    setAddProduct(false)
    setWelcome(false)
    setGetallProducts(false)
    }else{
      alert("Please Login Or Register If you are new user")
      setLoginpage(true)
    }
  }
  
  const addProductHandler=()=>{
    if(logOut){
    setAddProduct(true)
    setAddFirm(false)
    setLoginpage(false)
    setRegisterPage(false)
    setWelcome(false)
    setGetallProducts(false)
    }else{
      alert("Please Login Or Register If you are new user")
      setLoginpage(true)
    }
  }
  const welcomePageHandler=()=>{
    setWelcome(true)
    setAddProduct(false)
    setAddFirm(false)
    setLoginpage(false)
    setRegisterPage(false)
    setGetallProducts(false)
  }
  const getAllProductsHandler=()=>{
    if(logOut){
    setWelcome(false)
    setAddProduct(false)
    setAddFirm(false)
    setLoginpage(false)
    setRegisterPage(false)
    setGetallProducts(true)
    }else{
      alert("Please Login Or Register If you are new user")
      setLoginpage(true)
    }
  }
  return (
    <>
      <section className='landingSection'>
      <Navbar loginpageHandler={loginpageHandler} registerPageHandler={registerPageHandler} logOut={logOut} logOutHandler={logOutHandler}/>
       <div className="collection">
        <Sidebar addFirmHandler={addFirmHandler} 
        addProductHandler={addProductHandler} 
        getAllProductsHandler={getAllProductsHandler}
        showFirmTitle={showFirmTitle}
        />
        {registerPage && <Vendorregister loginpageHandler={loginpageHandler}/>}
        {loginPage && <Vendorlogin welcomePageHandler={welcomePageHandler}/>}
        {welcome && <Welcome/>}
        {addFirm && logOut && <Addfirm/>}
        {addProduct && logOut &&  <AddProducts/>}
        {getAllProducts && logOut &&  <Allproducts/>}
        {/* <Allproducts/> */}
       </div>

    </section>
    </>
  )
}

export default LandingPage
