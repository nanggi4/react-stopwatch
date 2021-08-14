import React, { useState, useEffect } from 'react';
import './App.css';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Button, Box, Chip } from '@material-ui/core';

const App = (props) => {
  const classes = props.classes;
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [isStop, setIsStop] = useState(false);
  const [lapArr, setLapArr] = useState([]);

  const stopTimer = () => {
    setTimerOn(false);
    setIsStop(true);
  }

  const resetTimer = () => {
    setTimerOn(false);
    setIsStop(false);
    setTime(0);
    setLapArr([]);
  }

  const lapTimer = () => {
    const lapHour = ("0" + Math.floor((time / 60000) % 60)).slice(-2);
    const lapMinute = ("0" + Math.floor((time / 1000) % 60)).slice(-2);
    const lapSecond = ("0" + ((time / 10) % 100)).slice(-2);
    setLapArr(lapArr => [...lapArr, `${lapHour}:${lapMinute}:${lapSecond}`]);
  }

  useEffect(() => {
    let timer = null;
    if (timerOn) {
      timer = setInterval(() => {
        setTime(time => time + 10);
      }, 10);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [timerOn]);  

  return (
    <div className="App">
      <Typography variant="h4" gutterBottom className={clsx(classes.title)} align="center">
        React Stopwatch
      </Typography>    
      <Typography variant="h1" className={clsx(classes.clock)} align="center">
        {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
        {("0" + Math.floor((time / 1000) % 60)).slice(-2)}:
        {("0" + ((time / 10) % 100)).slice(-2)}
      </Typography>
      <Box component="div" className={clsx(classes.btnWrap)}>
        {timerOn ? (
          <>              
            <Button variant="contained" className={clsx(classes.btn, classes.stopBtn)} onClick={stopTimer}>
              Stop
            </Button>
            <Button variant="contained" className={clsx(classes.btn, classes.lapBtn)} onClick={lapTimer}>
              Lap
            </Button>                     
          </>
        ) : ( !isStop && (
          <Button variant="contained" className={clsx(classes.btn, classes.startBtn)} onClick={() => setTimerOn(true)}>
            Start
          </Button>           
        ))}
        {(isStop && !timerOn) && (
          <Button variant="contained" className={clsx(classes.btn, classes.resumeBtn)} onClick={() => setTimerOn(true)}>
            Resume
          </Button>        
        )}
        <Button variant="contained" className={clsx(classes.btn, classes.resetBtn)} onClick={resetTimer}>
          Reset
        </Button>            
      </Box>
      <Box component="div" className={clsx(classes.lapWrap)}>
        {lapArr.map(lap => (
          <Chip color="primary" size="small" label={lap} className={clsx(classes.lapChip)} />
        ))}
      </Box>
    </div>
  );
}
const styles = {
  title: {
    color: 'white',
    fontFamily: 'Inconsolata'
  },
  clock: {
    color: 'white',
    fontFamily: 'Inconsolata'
  },
  btnWrap: {
    margin: '1rem 0 0',
    textAlign: 'center'
  },
  btn: {
    margin: '0 0.5rem'
  },
  startBtn: {
    color: '#fff',
    backgroundColor: '#1976d2',
    '&:hover': {
      backgroundColor: 'rgb(17, 82, 147)'
    }
  },
  stopBtn: {
    color: '#fff',
    backgroundColor: 'rgb(220, 0, 78)',
    '&:hover': {
      backgroundColor: 'rgb(154, 0, 54)'
    }    
  },
  resumeBtn: {
    color: '#fff',
    backgroundColor: '#1976d2',
    '&:hover': {
      backgroundColor: 'rgb(17, 82, 147)'
    }
  },
  resetBtn: {
    color: '#fff',
    backgroundColor: '#4caf50',
    '&:hover': {
      backgroundColor: '#388e3c'
    }    
  },
  lapBtn: {
    color: '#fff',
    backgroundColor: '#9c27b0',
    '&:hover': {
      backgroundColor: '#7b1fa2'
    }    
  },
  lapWrap: { 
    margin: '2rem auto 0',
    maxWidth: 300
  },
  lapChip: {
    margin: 3
  }    
};

export default withStyles(styles)(App);
