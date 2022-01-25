import './App.css';
import { useState, useEffect } from 'react';
import Home from './components/Home';
import AppContext from './context/appStates';

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


  return (
    <div className="App">
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
      <Home />
    </div>
  );
}

export default App;
