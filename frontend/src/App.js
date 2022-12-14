import logo from './logo.svg';
import './App.css';
import axios from "axios";

function App(){

  const makeRequestApi = () => {
      axios('/api/currentuser').then(response => {
          console.log(response.data);
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
            Hello Developer
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
      <button onClick={makeRequestApi}>Make api request</button>
    </div>
  );
}

export default App;
