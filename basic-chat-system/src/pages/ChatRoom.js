import React from "react";
import "../styles/ChatRoom.css";
import api from "../api/unPortectedApi";
import { client, w3cwebsocket as W3CWebSocket } from "websocket";
import { useEffect, useState } from "react";
import ChatBox from "../components/ChatBox";
import "antd/dist/antd.css";
import { Select } from 'antd';
const { Option } = Select;
// "search/"

client = new W3CWebSocket(
  `ws://127.0.0.1:8000/ws/?token=${localStorage.getItem("token")}`
);

function ChatRoom() {
  const [username, setUsername] = useState("nitin094");
  const [message, setMessage] = useState("");
  const [prevChat, setPrevChat] = useState([]);
  const [searchOptions,setSearchOptions] = useState([]);

  const sendMessage = () => {
    client.send(
      JSON.stringify({
        message: message,
        send_to: "nitin094",
      })
    );
  };

  useEffect(() => {
    client.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      console.log(data);
    };
  }, []);

  const onSearch = async(val)=>{
    const response = await api.get(`search/${val}`);
    setSearchOptions(response.data);
    console.log(searchOptions)
  }

  return (
    <div className="chat-room-container">
      <div className="left-container">
        <Select
          showSearch
          placeholder="Select a person"
          optionFilterProp="children"
          // onChange={onChange}
          onSearch={onSearch}
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
        >
          {
            searchOptions.map((item,idx)=>{
              console.log(item)
              return <Option value={item.username} key={`search${idx}`}>{item.username}</Option>
            })
          }
        </Select>
        <div className="name-container">
          <h4>Nitin</h4>
        </div>
      </div>
      <div className="right-container">
        <div className="header">
          <h4 style={{ margin: "0" }}>Nitin</h4>
        </div>
        <div className="chat-container">
          <ChatBox side={false} />
          <ChatBox side={true} />
          <ChatBox side={true} />
          <ChatBox side={true} />
          <ChatBox side={true} />
        </div>
        <div className="chat-write">
          <textarea
            name="chat"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          ></textarea>
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;
