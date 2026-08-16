import { Link, Outlet } from "react-router";

import './App.css'

export default function App() {
  return (
    <div className='App'>
      <div className="Header">
        <button>X</button>
        <h3>Awesome App</h3>
      </div>
      <div className="App-content-container">
        <div className="Menu"></div>
        <div className="App-content"></div>
      </div>
    </div>
  );
}