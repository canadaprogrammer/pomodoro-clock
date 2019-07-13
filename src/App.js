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
      time: 25 * 60 * 1000,
      interval: '',
      on: 'session',
      isPlay: false,
    }
    this.startTimer = this.startTimer.bind(this);
    this.breakDec = this.breakDec.bind(this);
    this.breakInc = this.breakInc.bind(this);
    this.sessionDec = this.sessionDec.bind(this);
    this.sessionInc = this.sessionInc.bind(this);
    this.reset = this.reset.bind(this);
  }
  breakDec() {
    if (this.state.isPlay) return;
    if (this.state.break > 1) {
      this.setState({
        break: this.state.break - 1
      });
    } else {
      console.log('Break is allowed greater than 0 minute');
    }
  }
  breakInc() {
    if (this.state.isPlay) return;
    if (this.state.break < 60) {
      this.setState({
        break: this.state.break + 1
      });
    } else {
      console.log('Break is allowed less than an hour');
    }
  }
  sessionDec() {
    if (this.state.isPlay) return;
    if (this.state.session > 1) {
      this.setState({
        session: this.state.session - 1,
        time: (this.state.session - 1) * 60 * 1000,
      });
    } else {
      console.log('Session is allowed greater than 0 minute');
    }
  }
  sessionInc() {
    if (this.state.isPlay) return;
    if (this.state.session < 60) {
      this.setState({
        session: this.state.session + 1,
        time: (this.state.session + 1) * 60 * 1000,
      });
    } else {
      console.log('Session is allowed less than an hour');
    }
  }
  changeStatus() {
    let status = this.state.on === 'session' ? 'break' : 'session';
    console.log('status: ' + status);
    this.setState({
      on: status,
      time: this.state[status] * 60 * 1000
    });
  }
  startTimer() {
    console.log('on: ' + this.state.on);
    // need to move it to btn control
    this.setState({
      isPlay: !this.state.isPlay
    });
    console.log(this.state.isPlay);

    let interval = Date.now() - Date.now() + 1000;

    if (!this.state.isPlay) {
      // set interval
      this.setState({
        interval: setInterval( () => {
          // check time is greater than 0
          // // if greater, keep going
          // // if less, change status
          if (this.state.time === 0) {
            document.querySelector('audio').play();
            this.changeStatus();
          } else {
            this.setState({
              time: Math.ceil( (this.state.time - interval ) / 1000 ) * 1000
            });
          }
          
          console.log(this.state.time);
        }, 1000)
      })
    } else {
      // clear interval
      // save startTime
      this.setState({
        interval: clearInterval(this.state.interval)
      });
    }
  }
  reset() {
    this.setState({
      break: 5,
      session: 25,
      time: 25 * 60 * 1000,
      interval: clearInterval(this.state.interval),
      on: 'session',
      isPlay: false,
    });
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
              <FontAwesomeIcon id="break-decrement" icon={faArrowDown} style={iconStyle} onClick={this.breakDec}/>
              <span id="break-length">{this.state.break}</span>
              <FontAwesomeIcon id="break-increment" icon={faArrowUp} style={iconStyle} onClick={this.breakInc}/> 
            </div>
            <div className="length">
              <p id="session-label">Session Length</p>
              <FontAwesomeIcon id="session-decrement" icon={faArrowDown} style={iconStyle} onClick={this.sessionDec}/>
              <span id="session-length">{this.state.session}</span>
              <FontAwesomeIcon id="session-increment" icon={faArrowUp} style={iconStyle} onClick={this.sessionInc}/> 
            </div>
          </div>
          <div className="timer-wrap">
            <p id="timer-label">{this.state.on.charAt(0).toUpperCase() + this.state.on.slice(1)}</p>
            <span id="time-left"><Moment format="mm:ss">{this.state.time}</Moment></span>
          </div>
          <div className="buttons">
            <button id="start_stop" onClick={this.startTimer}><img src={iconPP} alt="play and pause button"/></button>
            <FontAwesomeIcon id="reset" icon={faSync} style={iconStyle} onClick={this.reset}/>
          </div>
        </main>
        <audio id="beep" ref="beep" src="https://goo.gl/65cBl1" />
      </div>
    );
  }
}

export default App;
