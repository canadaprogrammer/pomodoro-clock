import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faPlay, faPause, faSync } from '@fortawesome/free-solid-svg-icons';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      break: 5,
      session: 25,
      time: 25,
      isOn: false
    }
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  }

  startTimer() {
    this.setState({
      isOn: true,
      time: this.state.time,
      session: Date.now() - this.state.time
    });
    this.timer = setInterval( () => this.setState({
      time: Date.now() - this.state.session
    }), 1000);
  }
  stopTimer() {
    this.setState({isOn: false});
    clearInterval(this.timer);
  }
  render() {
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
              <span id="break-length">{this.state.break}</span>
              <FontAwesomeIcon id="break-increment" icon={faArrowUp} style={iconStyle}/> 
            </div>
            <div className="length">
              <p id="session-label">Session Length</p>
              <FontAwesomeIcon id="session-decrement" icon={faArrowDown} style={iconStyle}/>
              <span id="session-length">{this.state.session}</span>
              <FontAwesomeIcon id="session-increment" icon={faArrowUp} style={iconStyle}/> 
            </div>
          </div>
          <div className="timer-wrap">
            <p id="timer-label">Session</p>
            <span id="time-left">{this.state.time}</span>
          </div>
          <div className="buttons">
            <FontAwesomeIcon id="start_stop" icon={faPlay} style={iconStyle} onClick={this.startTimer}/>
            <FontAwesomeIcon id="start_stop" icon={faPause} style={iconStyle} onClick={this.stopTimer}/>
            <FontAwesomeIcon id="reset" icon={faSync} style={iconStyle}/>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
