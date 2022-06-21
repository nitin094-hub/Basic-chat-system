import React from 'react'
import "../styles/ChatHeader.css";
import profileImg from "../images/blank-profile.png"
import { BsThreeDotsVertical } from 'react-icons/bs';


function ChatHeader() {
  return (
    <div className='chatHeader-container'>
        <div className="profile-pic">
            <img src={profileImg} alt="" />
        </div>
        <BsThreeDotsVertical size={23}/>
    </div>
  )
}

export default ChatHeader