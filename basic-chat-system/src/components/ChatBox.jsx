import React from 'react'
import "../styles/ChatBox.css";

function ChatBox({side}) {
  return (
    <div className='chat-box-container' style={side ? {marginLeft:'0.2rem'} : {marginLeft:"auto",marginRight:"0.2rem"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore illum itaque excepturi iusto earum repudiandae maxime nulla, recusandae inventore optio consectetur, maiores impedit molestias nam voluptates. Autem optio corporis dolorem.</div>
  )
}

export default ChatBox