import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faPlay, faPause, faSync } from '@fortawesome/free-solid-svg-icons';

function App() {
  const iconStyle = {
    margin: "0 0.5rem"
  }
  return (
    <div className="App">
      <header>
        <h1>Pomodoro Clock</h1>
      </header>
      <main>
        <div className="length-wrap">
          <div className="length">
            <p id="break-label">Break Length</p>
            <FontAwesomeIcon id="break-decrement" icon={faArrowDown} style={iconStyle}/>
            <span id="break-length">number</span>
            <FontAwesomeIcon id="break-increment" icon={faArrowUp} style={iconStyle}/> 
          </div>
          <div className="length">
            <p id="session-label">Session Length</p>
            <FontAwesomeIcon id="session-decrement" icon={faArrowDown} style={iconStyle}/>
            <span id="session-length">number</span>
            <FontAwesomeIcon id="session-increment" icon={faArrowUp} style={iconStyle}/> 
          </div>
        </div>
        <div className="timer-wrap">
          <p id="timer-label">Session</p>
          <span id="time-left">25:00</span>
        </div>
        <div className="buttons">
          <FontAwesomeIcon id="start_stop" icon={faPlay} style={iconStyle}/>
          <FontAwesomeIcon id="reset" icon={faSync} style={iconStyle}/>
        </div>
      </main>
    </div>
  );
}

export default App;
