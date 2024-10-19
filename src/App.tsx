import React, {useState} from 'react';
import './App.scss';
import {DisplayState} from './helpers';
import TimeSetter  from './TimeSetter';
import Display from './Display';

const defaultBreakTime= 5 * 60;
const defaultSessionTime = 25 * 60;
const min = 60;
const max = 60*60;
const interval = 60;

function App() {
  const [breakTime, setBreakTime] = useState(defaultBreakTime);
  const [sessionTime, setSessionTime] = useState(defaultSessionTime);
  const [displayState, setDisplayState] = useState<DisplayState>({
    time: sessionTime,
    timeType: 'Session',
    timerRunning: false
  });

  const reset = () => {
    setBreakTime(defaultBreakTime);
    setSessionTime(defaultSessionTime);
    setDisplayState({
      time: defaultSessionTime,
      timeType: 'Session',
      timerRunning: false
    });
    const beep = document.getElementById('beep') as HTMLAudioElement;
    beep.pause();
    beep.currentTime = 0;
  }

  const startStop = () => {
    console.log('startStop');
  }

  return (
    <div className="App">
      <header className="App-header">
      
      <div className="clock">
      <div className="setters">
        <div className="break">
          <h4 id="break-label">Break Length</h4>
          <TimeSetter 
          time={breakTime}
          setTime={setBreakTime}
          min={min}
          max={max}
          interval={interval}
          type="break"
          />
        </div>
        <div className="session">
          <h4 id="session-label">Session Length</h4>
          <TimeSetter 
          time={sessionTime}
          setTime={setSessionTime}
          min={min}
          max={max}
          interval={interval}
          type="session"
          />
        </div>
      </div>

      <Display 
      displayState={displayState}
      reset={reset}
      startStop={startStop}
       />
      <audio id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
      </div>

        
      </header>
    </div>
  );
};

export default App;

