import React, { useState, useEffect } from 'react'
import styles from "./Stopwatch.module.css"

export default function StopWatch() {
    let [time, setTime] = useState("0:00")
    let [isStart, setIsStart] = useState(false)
    let [timer, setTimer] = useState(null)

    const manageStartStop = () => {
        setIsStart(!isStart)
    }

    const handleReset = () => {
        setIsStart(false)
        setTime("0:00")
    }

    useEffect(() => {
        if (isStart) {
            const interval = setInterval(() => {
                setTime(prevTime => {
                    const [minutes, seconds] = prevTime.split(':').map(Number);
                    const totalSeconds = minutes * 60 + seconds + 1;
                    const newMinutes = Math.floor(totalSeconds / 60);
                    const newSeconds = totalSeconds % 60;
                    return `${newMinutes}:${newSeconds < 10 ? '0' : ''}${newSeconds}`;
                });
            }, 1000);
            setTimer(interval);
        } else if (timer) {
            clearInterval(timer);
            setTimer(null);
        }

        return () => timer && clearInterval(timer);
    }, [isStart]);

  return (
    
    <div>
        <h2> Stopwatch</h2>
        <div className={styles.timeBox}>
        <div className={styles.timeHead}> Time: </div>
        <div>{time}</div>
        </div>
        <div>
            <button onClick={manageStartStop}>
                {isStart ? 'Stop' : 'Start'}
            </button>
            <button onClick = {handleReset}>Reset</button>
        </div>
       

    </div>
  )
}
