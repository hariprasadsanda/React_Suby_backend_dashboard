import React, { useState } from 'react'
import { API_URL } from '../Helpers/api'

const Vendorregister = ({loginpageHandler}) => {
  const[username,setUsername]=useState("")
  const[password,setPassword]=useState("")
  const[email,setEmail]=useState("")
  const[error,setError]=useState("")
  const[loading,setLoading]=useState("")


  const submitHandler= async(e)=>{
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/vendor/register`,{
        method:"POST",
        headers:{
          'Content-Type':"application/json"
        },
        body:JSON.stringify({username,email,password})
      }) 

      const data = await response.json()
      if(response.ok){
        console.log(data)
        alert("Registaration Success")
      }
      setEmail("")
      setPassword("")
      setUsername("")
      loginpageHandler()
      
    } catch (error) {
      console.log("registration unsuccessful")
      alert("registration failed")
    }
  }


  return (
    <div className='registerForm'>
        <form onSubmit={submitHandler}>
        <h2>Vendor Register</h2>
        <div class="input-group">
            <label for="email">Email:</label><br/>
            <input type="email" id="email" value={email} onChange={(e)=>{
              setEmail(e.target.value)
            }} name="email" required className="inputField"/>
        </div>
        <div class="input-group">
            <label for="username" className="labelField">Username:</label><br/>
            <input type="text" id="username" value={username} name="username" onChange={(e)=>{
              setUsername(e.target.value)
            }} required className="inputField"/>
        </div>
        <div class="input-group">
            <label for="password">Password:</label><br/>
            <input type="password" id="password" value={password} onChange={(e)=>{
              setPassword(e.target.value)
            }} name="password" required className="inputField"/>
        </div>
        <button type="submit" className='buttonSection'>Register</button>
    </form>
      
    </div>
  )
}

export default Vendorregister
