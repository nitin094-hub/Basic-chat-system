import React from 'react'
import "../styles/ChatBox.css";

function ChatBox({alignment}) {
  return (
    <div className='chat-box-container' style={alignment ? {} : {marginLeft:"auto",marginRight:"0"}}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt saepe quibusdam temporibus unde at distinctio quas minus ipsam suscipit quaerat totam id sunt aliquam accusantium officia qui consectetur, mollitia laudantium.
    </div>
  )
}

export default ChatBox