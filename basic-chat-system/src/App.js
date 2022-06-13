import './App.css';
import {Routes,Route} from "react-router-dom";
import ChatRoom from './pages/ChatRoom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import PrivateRoute from './pages/PrivateRoute';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route exact path='/login' element={<Login/>}/>  
          <Route exact path='/sign-up' element={<SignUp/>}/>  
          <Route exact path='/' element={<PrivateRoute/>}>
              <Route path='chat-room' element={<ChatRoom/>}/>
          </Route>
        </Routes>      
    </div>
  );
}

export default App;
