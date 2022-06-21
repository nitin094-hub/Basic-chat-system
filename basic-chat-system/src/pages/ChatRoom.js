import React from "react";
import "../styles/ChatRoom.css";
import api from "../api/ProtectedApi";
import { client, w3cwebsocket as W3CWebSocket } from "websocket";
import { useEffect, useState } from "react";
import ChatBox from "../components/ChatBox";
import "antd/dist/antd.css";
import { Select } from "antd";
import ChatHeader from "../components/ChatHeader";
import profileImg from "../images/blank-profile.png";
import { IoMdSend } from "react-icons/io";
const { Option } = Select;
// "get-thread/username"

client = new W3CWebSocket(
  `ws://127.0.0.1:8000/ws/?token=${localStorage.getItem("token")}`
);

function ChatRoom() {
  const [threadId, setThreadId] = useState("");
  const [message, setMessage] = useState("");
  const [prevChat, setPrevChat] = useState([]);
  const [searchOptions, setSearchOptions] = useState([]);
  const [msgthread, setMsgThreads] = useState([]);
  const [currSelectedUser,setCurrSelectedUser] = useState(null);

  const sendMessage = () => {
    client.send(
      JSON.stringify({
        message: message,
        thread_id: threadId,
      })
    );
  };

  client.onmessage = (msg) => {
    const data = JSON.parse(msg.data);
    if (Array.isArray(data)) {
      setMsgThreads(data);
    } else {
      const newMsgThreadArr = msgthread.map((item) => {
        if (item.id == data.thread) {
          return { ...item, messages: [...item.messages, data] };
        } else {
          return item;
        }
      });
      setMsgThreads(newMsgThreadArr);
      setPrevChat([...prevChat,data]);
      setMessage("");
    }
  };

  const onSearch = async (val) => {
    const response = await api.get(`search/${val}`);
    setSearchOptions(response.data);
    console.log(searchOptions);
  };

  const showMessages = (item) => {
    setPrevChat(item.messages);
    setCurrSelectedUser(item.first_user === localStorage.getItem("user") ? item.second_user : item.first_user);
  };

  const onSelect = async(val) => {
    const response = await api.get(`get-thread/${val}`)
    setMsgThreads([...msgthread,response.data])
    console.log(response);
  };

  return (
    <>
      <div className="chat-room-container">
        <div className="left-container">
          <ChatHeader />
          <div className="hello">
            <Select
              showSearch
              placeholder="Select a person"
              optionFilterProp="children"
              onSearch={onSearch}
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
              onSelect={onSelect}
            >
              {searchOptions.map((item, idx) => {
                return (
                  <Option value={item.username} key={`search${idx}`}>
                    {item.username}
                  </Option>
                );
              })}
            </Select>
          </div>
          <div className="name-container">
            {msgthread.map((item) => {
              return (
                <h4
                  key={item.id}
                  onClick={() => {
                    showMessages(item);
                    setThreadId(item.id);
                  }}
                >
                  {item.first_user == localStorage.getItem("user")
                    ? item.second_user
                    : item.first_user}
                </h4>
              );
            })}
          </div>
        </div>
        <div className="right-container">
          <div className="header">
            {currSelectedUser && 
            <div className="headerImg">
              <img src={profileImg} alt="" />
            </div>
            }
            <h3 style={{ margin: "0" }}>{currSelectedUser ? currSelectedUser : ""}</h3>
          </div>
          <div className="chat-container" style={currSelectedUser ? {height:"33.6rem"} : {height:"36.5rem"}}>
            {prevChat.map((item, idx) => {
              return (
                <ChatBox
                side={item.sent_by != localStorage.getItem("user")}
                msg={item.message}
                key={`chatBox${idx}`}
                />
                );
              })}
          </div>
              {
                currSelectedUser && 
    
          <div className="chat-write">
            <textarea
              name="chat"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              placeholder="Type message.."
            ></textarea>
            <button onClick={sendMessage}>
              <IoMdSend size={23} />
            </button>
          </div>
              }
        </div>
      </div>
    </>
  );
}

export default ChatRoom;
