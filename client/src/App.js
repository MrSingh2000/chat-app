import './App.css';
import { useState, useEffect, useContext } from 'react';
import Home from './components/Home';
import { Routes, Route} from "react-router-dom";
import Login from './components/register/Login';
import Signup from './components/register/Signup';
import appContext from './context/appContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  // INITIAL CODE FOR PRACTICE
  // const [message, setMessage] = useState("");
  // const [chat, setChat] = useState([]);

  // const sendMessage = (e) => {
  //   e.preventDefault();
  //   socket.emit("sendMes", { message });
  //   setMessage("");
  // };

  // useEffect(() => {
  //   socket.on("sendMes", (payload) => {
  //     setChat([...chat, payload]);
  //   })
  // });

  // DRIVER CODE
  const {
    authToken,
    setAuthToken
  } = useContext(appContext);


  return (
    <div>
      {/* INITIAL CODE FOR PRACTICE */}
      {/* <header className="App-header">
        <h1>This is Chat</h1>
        {chat.map((payload, index) => {
          return (
            <p key={index}>
              {payload.message}: <span>id: {payload.id}</span>
            </p>
          );
        })}

        <form onSubmit={sendMessage}>
          <input
            type="text"
            name="chat"
            placeholder="send text"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button type="submit">Send</button>
        </form>
      </header> */}

      {/* DRIVER CODE */}
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/Signup" element={<Signup />} />
        <Route element={<ProtectedRoute />}>
          <Route exact path="" element={<Home />} />
        </Route>
        <Route path="*" element={(<div>Page doesn't exists</div>)} />
      </Routes>
    </div >
  );
}

export default App;
