import React,{useState} from 'react'
import "../styles/Login.css"
import api from "../api/unPortectedApi";
import { useNavigate } from "react-router-dom";


function Login() {

  const [userName,setUserName] = useState("");
  const [password,setPassword] = useState("");
  
  let navigate = useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault()
    const loginData = {
      username:userName,
      password:password
    }
    try{
      const response = await api.post("api-token-auth/",loginData);
      localStorage.setItem("token",response.data.token);
      navigate("/chat-room")
    }
    catch(err){
      console.log(err.message)
    }
  }

  return (
    <div className='login-page'>
      <h1>Login</h1>
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

export default Login