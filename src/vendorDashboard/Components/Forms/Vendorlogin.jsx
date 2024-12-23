import React, { useState } from 'react'
import { API_URL } from '../Helpers/api'

const Vendorlogin = ({welcomePageHandler}) => {

  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")

  const logInHandler=async(e)=>{
    e.preventDefault();

    try {

      const response = await fetch(`${API_URL}/vendor/login`,{
        method:"POST",
        headers:{
          "Content-Type":'application/json'
        },
        body:JSON.stringify({email,password})
      })

      const data =  await response.json()

      if(response.ok){
        console.log("Login Success")
        alert("Login Success")
        setEmail("")
        setPassword("")
        localStorage.setItem('loginToken',data.token)
        welcomePageHandler()
      }
      const vendorId =data.vendorId
      console.log("this is the vendor id:" ,vendorId)
      const vendorResponce = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`)
      const vendorData = await vendorResponce.json();
      if(vendorResponce.ok){
        const vendorFirmId = vendorData.vendorFirmId
        const firmName=vendorData.vendor.firm[0].firmName;
        console.log(vendorFirmId);
        localStorage.setItem('firmId',vendorFirmId);
        localStorage.setItem('firmName',firmName);
        window.location.reload();
      }
      
    } catch (error) {
      console.log("Login Failed")
      alert("Login Failed")
      
    }
  }

  return (
    <div>
         <form onSubmit={logInHandler} className='formSection' >
                <h2>Vendor Login</h2>
                <div>
                    <label for="email">Email:</label>
                    <input type="text" id="email" name="email" value={email} onChange={(e)=>{
                      setEmail(e.target.value)
                    }} class="input-username" required className="inputField"/>
                </div>
                <div>
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" value={password} onChange={(e)=>{
                      setPassword(e.target.value)
                    }} class="input-password" required className="inputField"/>
                </div>
                <button type="submit" class="btn-submit" className='buttonSection'>Login</button>
         </form>
      
    </div>
  )
}

export default Vendorlogin
