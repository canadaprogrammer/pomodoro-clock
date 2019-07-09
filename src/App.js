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
      // break: 5,
      // session: 25,
      // startTime: 25,
      // time: 25 * 60 * 1000,
      break: 1,
      session: 2,
      startTime: 2,
      time: 2 * 60 * 1000,
      current: Date.now(),
      interval: '',
      on: 'Session',
      isPlay: false,
      played: false
    }
    this.start = this.start.bind(this);
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
        startTime: this.state.session - 1,
        time: (this.state.session - 1) * 60 * 1000,
        played: false
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
        startTime: this.state.session + 1,
        time: (this.state.session + 1) * 60 * 1000,
        played: false
      });
    } else {
      console.log('Session is allowed less than an hour');
    }
  }
  start(_status) {
    console.log(this.state[_status.toLowerCase()]);
    console.log(this.state.isPlay);

    this.setState({
      current: Date.now()
    });

    if (this.state.on !== _status) {
      this.setState({
        on: _status,
        interval: clearInterval(this.state.interval)
      });
    }

    if (this.state.startTime <= 0 || this.state.startTime === this.state[_status.toLowerCase()]) {
      this.setState({
        startTime: this.state[_status.toLowerCase()] * 60 * 1000
      });
    }
    if (!this.state.interval) {
      console.log('interval: '+ this.state.interval);
      this.setState({
        interval: setInterval( () => {
          this.setState({
            time: Math.ceil( (this.state.startTime - (Date.now() - this.state.current) ) / 1000) * 1000
          });
          console.log(this.state.startTime * 60 * 1000 - (Date.now() - this.state.current));
          console.log(Math.ceil( (this.state.startTime - (Date.now() - this.state.current) ) / 1000) * 1000);
        }, 1000)
      });
    } else {
      this.setState({
        startTime: this.state.time,
        interval: clearInterval(this.state.interval)
      });
    }
  }
  startTimer() {
    console.log('on: ' + this.state.on);
    // need to move it to btn control
    this.setState({
      isPlay: !this.state.isPlay
    });
    this.start(this.state.on);
  }
  reset() {
    this.setState({
      // break: 5,
      // session: 25,
      // startTime: 25,
      // time: 25 * 60 * 1000,
      break: 1,
      session: 1,
      startTime: 1,
      time: 1 * 60 * 1000,
      current: Date.now(),
      interval: clearInterval(this.state.interval),
      on: 'Session',
      isPlay: false,
      played: false
    });
  }
  componentDidUpdate() {
    if (this.state.time <= 0 && this.state.isPlay) {
      console.log('times up ' + this.state.on);

      // error: Maximum update depth exceeded.
      if (this.state.on === 'Session') {
        // this.setState({
        //   on: 'Break'
        // });
        this.start('Break');
      } else {
        // this.setState({
        //   on: 'session'
        // });
        this.start('Session');
      }
      // this.setState({
      //   interval: clearInterval(this.state.interval)
      // });
      console.log(this.state.on);
      // this.start(this.state.on);
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
            <p id="timer-label">Session</p>
            <span id="time-left"><Moment format="mm:ss">{this.state.time}</Moment></span>
          </div>
          <div className="buttons">
            <button id="start_stop" onClick={this.startTimer}><img src={iconPP} alt="play and pause button"/></button>
            <FontAwesomeIcon id="reset" icon={faSync} style={iconStyle} onClick={this.reset}/>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
