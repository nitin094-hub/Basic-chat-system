import React from 'react'
import ChatBox from "../components/ChatBox";
import "../styles/ChatRoom.css";
import {w3cwebsocket as W3CWebSocket} from "websocket";
import { useEffect } from 'react';
import { useState } from 'react';

const client = new W3CWebSocket(`ws://127.0.0.1:8000/ws/?token=${localStorage.getItem("token")}`);

function ChatRoom() {

  const [message,setMessage] = useState("");

  const sendMessage = ()=>{
    client.send(JSON.stringify({
      message:message,
      send_to:"nitin094"
    }))
  }
  
  useEffect(()=>{
    client.onmessage = (msg)=>{
      const dataFromServer = JSON.parse(msg.data);
      console.log(dataFromServer);
    }
  },[])

  return (
    <div className="chat-system-container">
          <div className="chat-head">
            <h4>Nitin Rajesh</h4>
          </div>
          <div className="chat-content">
            <ChatBox alignment={true}/>
            <ChatBox alignment={false}/>
            <ChatBox alignment={false}/>
            <ChatBox alignment={false}/>
            <ChatBox alignment={false}/>
            
          </div>
          <div className="chat-write">
            <textarea type="text" value={message} onChange={(e)=>{setMessage(e.target.value)}}/>
            <button onClick={sendMessage}>Send</button>
          </div>
      </div>
  )
}

export default ChatRoom