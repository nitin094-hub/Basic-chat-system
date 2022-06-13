import React,{useState} from 'react'
import api from "../api/unPortectedApi";

function SignUp() {

  const [userName,setUserName] = useState("");
  const [password,setPassword] = useState("");

  const handleSubmit = async(e)=>{
    e.preventDefault()
    const signUpData = {
      username:userName,
      password:password
    }
    try{
      const response = await api.post("auth/register/",signUpData);
      console.log(response)
    }
    catch(err){
      console.log(err.message)
    }
  }

  return (
    <div className='login-page'>
    <h1>Sign Up</h1>
    <form className='login-form' onSubmit={handleSubmit}>
      <input type="text" placeholder='UserName' value={userName} onChange={(e)=>{
        setUserName(e.target.value)
      }}/>
      <input type="password" placeholder='Password' value={password} onChange={(e)=>{
        setPassword(e.target.value)
      }}/>
      <button type='submit'>submit</button>
    </form>
  </div>
  )
}

export default SignUp