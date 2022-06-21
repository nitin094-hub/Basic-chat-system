import React from 'react'
import "../styles/ChatBox.css";

function ChatBox({side,msg}) {
  return (
    <div className='chat-box-container' style={side ? {marginLeft:'0.2rem'} : {marginLeft:"auto",marginRight:"0.2rem"}}>{msg}</div>
  )
}

export default ChatBox