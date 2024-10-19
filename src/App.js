import React, { useEffect, useState } from 'react';
import './App.scss';

function App() {
  const [displayTime, setDisplayTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [sessionTime, setSessionTime] = useState(25 * 60);
  const [timerOn, setTimerOn] = useState(false);
  const [onBreak, setOnBreak] = useState(false);

  const playBreakSound = () => {
    const audio = document.getElementById("beep");
    audio.currentTime = 0;
    audio.play();
  };

  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return (
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    );
  };

  const changeTime = (amount, type) => {
    if (type === "break") {
      if ((breakTime <= 60 && amount < 0) || (breakTime >= 3600 && amount > 0)) {
        return;
      }
      setBreakTime((prev) => prev + amount);
    } else {
      if ((sessionTime <= 60 && amount < 0) || (sessionTime >= 3600 && amount > 0)) {
        return;
      }
      setSessionTime((prev) => prev + amount);
      if (!timerOn) {
        setDisplayTime(sessionTime + amount);
      }
    }
  };

  const controlTime = () => {
    if (!timerOn) {
      const interval = setInterval(() => {
        setDisplayTime((prev) => prev - 1);
      }, 1000);
      localStorage.setItem("interval-id", interval);
    } else {
      clearInterval(localStorage.getItem("interval-id"));
    }
    setTimerOn(!timerOn);
  };

  const resetTime = () => {
    setDisplayTime(25 * 60);
    setBreakTime(5 * 60);
    setSessionTime(25 * 60);
    setTimerOn(false);
    setOnBreak(false);
    clearInterval(localStorage.getItem("interval-id"));
    const audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime = 0;
  };

  useEffect(() => {
    if (displayTime < 0) {
      if (!onBreak) {
        setDisplayTime(breakTime);
        setOnBreak(true);
        playBreakSound();
      } else {
        setDisplayTime(sessionTime);
        setOnBreak(false);
        playBreakSound();
      }
    }
  }, [displayTime, onBreak, breakTime, sessionTime]);

  useEffect(() => {
    setDisplayTime(sessionTime);
  }, [sessionTime]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>25 + 5 Clock</h1>

        <div className="length-container">
          <Length
            title={"Break Length"}
            changeTime={changeTime}
            type={"break"}
            time={breakTime}
            formatTime={formatTime}
          />
          <Length
            title={"Session Length"}
            changeTime={changeTime}
            type={"session"}
            time={sessionTime}
            formatTime={formatTime}
          />
        </div>

        <audio
          id="beep"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
        <h3 id="timer-label">{onBreak ? "Break" : "Session"}</h3>
        <h3 id="time-left">{formatTime(displayTime)}</h3>
        <div className="timer">
          <button id="start_stop" onClick={controlTime}>
            {timerOn ? "Stop" : "Start"}
          </button>
        </div>
        <button id="reset" onClick={resetTime}>Reset</button>
      </header>
    </div>
  );
}

function Length({ title, changeTime, type, time, formatTime }) {
  return (
    <div>
      <h3 id={`${type}-label`}>{title}</h3>
      <div className="time-sets">
        <button
          id={`${type}-decrement`}
          className="btn"
          onClick={() => changeTime(-60, type)}
        >
          -
        </button>
        <h3 id={`${type}-length`}>{time / 60}</h3>
        <button
          id={`${type}-increment`}
          className="btn"
          onClick={() => changeTime(+60, type)}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default App;
