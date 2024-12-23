import React from 'react'

const Navbar = ({loginpageHandler , registerPageHandler,logOut,logOutHandler}) => {

  const firmName = localStorage.getItem('firmName')
  
  return (
  <div className="navSection">
    <div className="company">
        Vendor Dashboard
    </div>
    <div>
      <h4>Hotel Name :{firmName}</h4>
    </div>
      <div className="userAuth">

        {!logOut ? <>
                <span onClick={loginpageHandler}>LogIn</span>/
                <span onClick={registerPageHandler}>Register</span></>:
                <span onClick={logOutHandler}>Log Out </span>
        }

      </div>     
  </div>
  )
}

export default Navbar
