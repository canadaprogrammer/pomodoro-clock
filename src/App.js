import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faSync } from '@fortawesome/free-solid-svg-icons';
// import Moment from 'react-moment';
import iconPP from './images/iconplaypause1.png';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      break: 5,
      session: 25,
      time: 25 * 60,
      interval: '',
      on: 'session',
      isPlay: false
    }
    this.startTimer = this.startTimer.bind(this);
    this.breakDec = this.breakDec.bind(this);
    this.breakInc = this.breakInc.bind(this);
    this.sessionDec = this.sessionDec.bind(this);
    this.sessionInc = this.sessionInc.bind(this);
    this.reset = this.reset.bind(this);
    this.display = this.display.bind(this);
  }
  breakDec() {
    if (this.state.isPlay) return;
    if (this.state.break !== 1) {
      this.setState({
        break: this.state.break - 1
      });
      if (this.state.on === 'break') {
        this.setState({
          time: (this.state.break - 1) * 60
        });
      }
    }
  }
  breakInc() {
    if (this.state.isPlay) return;
    if (this.state.break !== 60) {
      this.setState({
        break: this.state.break + 1
      });
      if (this.state.on === 'break') {
        this.setState({
          time: (this.state.break + 1) * 60
        });
      }
    }
  }
  sessionDec() {
    if (this.state.isPlay) return;
    if (this.state.session !== 1) {
      this.setState({
        session: this.state.session - 1
      });
      if (this.state.on === 'session') {
        this.setState({
          time: (this.state.session - 1) * 60
        });
      }
    }
  }
  sessionInc() {
    if (this.state.isPlay) return;
    if (this.state.session !== 60) {
      this.setState({
        session: this.state.session + 1
      });
      if (this.state.on === 'session') {
        this.setState({
          time: (this.state.session + 1) * 60
        });
      }
    }
  }
  changeStatus() {
    let status = this.state.on === 'session' ? 'break' : 'session';
    console.log('status: ' + status);
    this.setState({
      on: status,
      time: this.state[status] * 60
    });
  }
  startTimer() {
    console.log('on: ' + this.state.on);
    // need to move it to btn control
    this.setState({
      isPlay: !this.state.isPlay
    });

    if (!this.state.isPlay) {
      // set interval
      this.setState({
        interval: setInterval( () => {
          // check time is greater than 0
          // // if greater, keep going
          // // if less, change status
          if (this.state.time === 0) {
            this.changeStatus();
          } else {
            this.setState({
              time: this.state.time - 1
            });
          }
          console.log(this.state.time);
        }, 1000)
      })
    } else {
      // clear interval
      this.setState({
        interval: clearInterval(this.state.interval)
      });
    }
  }
  reset() {
    this.setState({
      break: 5,
      session: 25,
      time: 25 * 60,
      interval: clearInterval(this.state.interval),
      on: 'session',
      isPlay: false
    });
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;

  }
  display() {
    let mm = Math.floor(this.state.time / 60);
    let ss = this.state.time - (mm * 60);
    const format = t => {
      return ('0' + t).slice(-2);
    }
    return format(mm) + ':' + format(ss);
  }
  componentDidUpdate() {
    if (this.state.time === 0 ) {
      this.audioBeep.play();
    }
  }
  render() {
    const iconStyle = {
      margin: "0 0.5rem",
      fontSize: "1rem"
    }
    return (
      <div className="container">
        <div className="App">
          <header>
            <h1>Pomodoro Clock</h1>
          </header>
          <main>
            <div className="length-wrap">
              <div className="length">
                <div id="break-label">Break Length</div>
                <button id="break-decrement" onClick={this.breakDec}><FontAwesomeIcon icon={faArrowDown} style={iconStyle}/></button>
                <div id="break-length">{this.state.break}</div>
                <button id="break-increment" onClick={this.breakInc}><FontAwesomeIcon icon={faArrowUp} style={iconStyle}/></button>
              </div>
              <div className="length">
                <div id="session-label">Session Length</div>
                <button id="session-decrement" onClick={this.sessionDec}><FontAwesomeIcon icon={faArrowDown} style={iconStyle}/></button>
                <div id="session-length">{this.state.session}</div>
                <button id="session-increment" onClick={this.sessionInc}><FontAwesomeIcon icon={faArrowUp} style={iconStyle}/></button>
              </div>
            </div>
            <div className="timer-wrap">
              <div id="timer-label">{this.state.on.charAt(0).toUpperCase() + this.state.on.slice(1)}</div>
              <div id="time-left">{this.display()}</div>
            </div>
            <div className="buttons">
              <button id="start_stop" onClick={this.startTimer}><img src={iconPP} alt="play and pause button"/></button>
              <button id="reset" onClick={this.reset}><FontAwesomeIcon icon={faSync} style={iconStyle}/></button>
            </div>
          </main>
          <footer>
            <p>Designed and Coded by <a rel="noopener noreferrer" href="https://developerjinpark.github.io/" target="_blank">Jin Park</a></p>
          </footer>
          <audio id="beep" ref={(audio) => {this.audioBeep = audio;}} src="https://goo.gl/65cBl1" />
        </div>
      </div>
    );
  }
}

export default App;
