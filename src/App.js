import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faSync } from '@fortawesome/free-solid-svg-icons';
import Moment from 'react-moment';
import iconPP from './images/iconPlayPause.png';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      break: 5,
      session: 25,
      startTime: 25,
      time: 25 * 60 * 1000,
      current: Date.now(),
      isOn: false,
      isPlay: false
    }
    this.startTimer = this.startTimer.bind(this);
  }

  startTimer() {
    this.setState({
      current: Date.now(),
      isPlay: !this.state.isPlay
    })
    
    if (this.state.startTime === this.state.session) {
      this.setState({
        isOn: !this.state.isOn,
        startTime: this.state.session * 60 * 1000
      });
    }

    if (!this.state.isPlay) {
      console.log('true: '+ this.state.isPlay);
      this.timer = setInterval( () => {
        this.setState({
          time: Math.ceil( (this.state.startTime - (Date.now() - this.state.current) ) / 1000) * 1000
        });
        console.log(this.state.startTime * 60 * 1000 - (Date.now() - this.state.current));
        console.log(Math.ceil( (this.state.startTime - (Date.now() - this.state.current) ) / 1000) * 1000);
      }, 1000);
    } else {
      this.setState({
        startTime: this.state.time
      });
      clearInterval(this.timer);
    }
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
            <span id="time-left"><Moment format="mm:ss">{this.state.time}</Moment></span>
          </div>
          <div className="buttons">
            <button id="start_stop" onClick={this.startTimer}><img src={iconPP} alt="play and pause button"/></button>
            <FontAwesomeIcon id="reset" icon={faSync} style={iconStyle}/>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
