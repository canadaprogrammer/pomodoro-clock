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
    this.startClock = this.startClock.bind(this);
    this.decreaseCount = this.decreaseCount.bind(this);
    this.status = this.status.bind(this);
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
      this.startClock();
      // set interval
      // this.setState({
      //   interval: setInterval( () => {
      //     // check time is greater than 0
      //     // // if greater, keep going
      //     // // if less, change status
      //     if (this.state.time === 0) {
      //       this.changeStatus();
      //     } else {
      //       this.setState({
      //         time: this.state.time - 1
      //       });
      //     }
      //     console.log(this.state.time);
      //   }, 1000)
      // })
    } else {
      // clear interval
      this.setState({
        interval: clearInterval(this.state.interval)
      });
    }
  }
  startClock() {
    this.setState({
      interval: setInterval( () => {
        // check time is greater than 0
        // // if greater, keep going
        // // if less, change status
        // if (this.state.time === 0) {
        //   this.changeStatus();
        // } else {
        //   this.setState({
        //     time: this.state.time - 1
        //   });
        // }
        this.decreaseCount();
        this.status();
        console.log(this.state.time);
      }, 1000)
    })
  }
  decreaseCount() {
    this.setState({
      time: this.state.time - 1
    });
  }
  status() {
    if (this.state.time < 0) {
      this.setState({
        interval: clearInterval(this.state.interval)
      });
      this.changeStatus();
      this.startClock();
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
      margin: "0 0.5rem"
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
                <button id="break-decrement" onClick={this.breakDec}> <FontAwesomeIcon icon={faArrowDown} style={iconStyle}/></button>
                <div id="break-length">{this.state.break}</div>
                <button id="break-increment" onClick={this.breakInc}><FontAwesomeIcon icon={faArrowUp} style={iconStyle} /></button> 
              </div>
              <div className="length">
                <div id="session-label">Session Length</div>
                <button  id="session-decrement" onClick={this.sessionDec}><FontAwesomeIcon icon={faArrowDown} style={iconStyle}/></button>
                <div id="session-length">{this.state.session}</div>
                <button id="session-increment" onClick={this.sessionInc}><FontAwesomeIcon icon={faArrowUp} style={iconStyle}/> </button>
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
          <audio id="beep" preload="auto" ref={(audio) => {this.audioBeep = audio;}} src="https://goo.gl/65cBl1" />
        </div>
      </div>
    );
  }
}

  
// class TimerLengthControl extends React.Component {
//   render() {
//     return (
//       <div className="length-control">
//         <div id={this.props.titleID}>
//           {this.props.title}
//         </div>
//         <button id={this.props.minID}
//           className="btn-level" value="-" 
//           onClick={this.props.onClick}>
//           <i className="fa fa-arrow-down fa-2x"/>
//         </button>
//         <div id={this.props.lengthID} className="btn-level">
//           {this.props.length}
//         </div>
//         <button id={this.props.addID}
//           className="btn-level" value="+" 
//           onClick={this.props.onClick}>
//           <i className="fa fa-arrow-up fa-2x"/>
//         </button>
//       </div>
//     )
//   }
// };

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       brkLength: 5,
//       seshLength: 25,
//       timerState: 'stopped',
//       timerType: 'Session',
//       timer: 1500,
//       intervalID: '',
//       alarmColor: {color: 'white'}
//     }
//     this.setBrkLength = this.setBrkLength.bind(this);
//     this.setSeshLength = this.setSeshLength.bind(this);
//     this.lengthControl = this.lengthControl.bind(this);
//     this.timerControl = this.timerControl.bind(this);
//     this.beginCountDown = this.beginCountDown.bind(this);
//     this.decrementTimer = this.decrementTimer.bind(this);
//     this.phaseControl = this.phaseControl.bind(this);
//     this.warning = this.warning.bind(this);
//     this.buzzer = this.buzzer.bind(this);
//     this.switchTimer = this.switchTimer.bind(this);
//     this.clockify = this.clockify.bind(this);
//     this.reset = this.reset.bind(this);
//   }
//   setBrkLength(e) {
//     this.lengthControl('brkLength', e.currentTarget.value, 
//     this.state.brkLength, 'Session');
//   }
//   setSeshLength(e) {
//     this.lengthControl('seshLength', e.currentTarget.value, 
//     this.state.seshLength, 'Break');
//   }
//   lengthControl(stateToChange, sign, currentLength, timerType) {
//     if (this.state.timerState == 'running') return;
//     if (this.state.timerType == timerType) {
//       if (sign == "-" && currentLength != 1 ) {
//         this.setState({[stateToChange]: currentLength - 1});
//       } else if (sign == "+" && currentLength != 60) {
//         this.setState({[stateToChange]: currentLength + 1});
//       } 
//     } else {
//       if (sign == "-" && currentLength != 1 ) {
//         this.setState({[stateToChange]: currentLength - 1,
//         timer: currentLength * 60 - 60});
//       } else if (sign == "+" && currentLength != 60) {
//         this.setState({[stateToChange]: currentLength + 1,
//         timer: currentLength * 60 + 60});
//       } 
//     }
//   }
//   timerControl() {
//     let control = this.state.timerState === 'stopped' ? (
//       this.beginCountDown(),
//       this.setState({timerState: 'running'})
//     ) : (
//       this.setState({timerState: 'stopped', intervalID: clearInterval(this.state.intervalID)})
//     );
//   }
//   beginCountDown() {
//     this.setState({
//       intervalID: setInterval(() => {
//         this.decrementTimer(); 
//         this.phaseControl();
//       }, 1000)
//     })
//   }
//   decrementTimer() {
//     this.setState({timer: this.state.timer - 1});
//   }
//   phaseControl() {
//     let timer = this.state.timer;
//     this.warning(timer);
//     this.buzzer(timer);
//     if (timer < 0) { 
//       this.setState({
//         intervalID: clearInterval(this.state.intervalID)
//       });
//       this.beginCountDown();
//       if (this.state.timerType === 'Session') {
//         this.switchTimer(this.state.brkLength * 60, 'Break');
//       } else {
//         this.switchTimer(this.state.seshLength * 60, 'Session');
//       }
//     }  
//   }
//   warning(_timer) {
//     let warn = _timer < 61 ? 
//     this.setState({alarmColor: {color: '#a50d0d'}}) : 
//     this.setState({alarmColor: {color: 'white'}});
//   }
//   buzzer(_timer) {
//     if (_timer === 0) {
//       this.audioBeep.play();
//     }
//   }
//   switchTimer(num, str) {
//     this.setState({
//       timer: num,
//       timerType: str,
//       alarmColor: {color: 'white'}
//     })
//   }
//   clockify() {
//     let minutes = Math.floor(this.state.timer / 60);
//     let seconds = this.state.timer - minutes * 60;
//     seconds = seconds < 10 ? '0' + seconds : seconds;
//     minutes = minutes < 10 ? '0' + minutes : minutes;
//     return minutes + ':' + seconds;
//   }
//   reset() {
//     this.setState({
//       brkLength: 5,
//       seshLength: 25,
//       timerState: 'stopped',
//       timerType: 'Session',
//       timer: 1500,
//       intervalID: clearInterval(this.state.intervalID),
//       alarmColor: {color: 'white'}
//     });
//     this.audioBeep.pause();
//     this.audioBeep.currentTime = 0;
//   }
//   render() {
//     return (
//       <div>
//         <div className="main-title">
//           Pomodoro Clock
//         </div>
//         <TimerLengthControl 
//           titleID="break-label"   minID="break-decrement"
//           addID="break-increment" lengthID="break-length"
//           title="Break Length"    onClick={this.setBrkLength}
//           length={this.state.brkLength}/>
//         <TimerLengthControl 
//           titleID="session-label"   minID="session-decrement"
//           addID="session-increment" lengthID="session-length"
//           title="Session Length"    onClick={this.setSeshLength} 
//           length={this.state.seshLength}/>
//         <div className="timer" style={this.state.alarmColor}>
//           <div className="timer-wrapper">
//             <div id='timer-label'>
//               {this.state.timerType}
//             </div>
//             <div id='time-left'>
//               {this.clockify()}
//             </div>
//           </div>
//         </div>
//         <div className="timer-control">
//           <button id="start_stop" onClick={this.timerControl}>
//             <i className="fa fa-play fa-2x"/>
//             <i className="fa fa-pause fa-2x"/>
//           </button>
//           <button id="reset" onClick={this.reset}>
//             <i className="fa fa-refresh fa-2x"/>
//           </button>
//         </div>
//         <div className="author"> Designed and Coded by <br />
//           <a target="_blank" href="https://goo.gl/6NNLMG"> 
//             Peter Weinberg
//           </a>
//         </div>
//         <audio id="beep" preload="auto" 
//           src="https://goo.gl/65cBl1"
//           ref={(audio) => { this.audioBeep = audio; }} />
//       </div>
//     )
//   }
// };

export default App;
