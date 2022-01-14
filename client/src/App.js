import logo from './logo.svg';
import './App.css';
import React, {useEffect} from 'react';

function App() {

  useEffect(() => {
    fetch('api/me')
    .then(res => res.json())
    .then(data =>{
        console.log(data)
    })
}, [])

const handleTestClick2 = () => {

  const configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
  },
    body: JSON.stringify({game_id: '1942'})
  }

  fetch("api/test_games", configObj)
  .then(res => res.json())
  .then(data => console.log(data))
}

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <button onClick={handleTestClick2}>Test the other thing</button>
    </div>
  );
}

export default App;
