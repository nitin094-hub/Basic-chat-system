import './App.css';
import ChatBox from './components/ChatBox';

function App() {
  return (
    <div className="App">
      <div className="chat-system-container">
          <div className="chat-head">
            <h4>Nitin Rajesh</h4>
          </div>
          <div className="chat-content">
            <ChatBox alignment={true}/>
            <ChatBox alignment={false}/>
          </div>
      </div>
    </div>
  );
}

export default App;
