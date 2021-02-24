import { useState, useEffect } from 'react';
import styles from '../styles/components/Countdown.module.css';

let timeoutCountdown : NodeJS.Timeout;

export function Countdown(){
    const [time, setTime] = useState(0.1 * 60);
    const [active, setActive] = useState(false);
    const [hasFineshed, setHasFineshed] = useState(false);

    const minutes = Math.floor( time/60 );
    const seconds = time % 60;

    const [minuteLeft,minuteRight] = String(minutes).padStart(2,'0').split('');
    const [secondLeft,secondRight] = String(seconds).padStart(2,'0').split('');

    function startCountdown(){
        setActive(true);
    }

    function resetCountdown(){
        clearTimeout(timeoutCountdown);
        setActive(false);
        setTime(0.1*60);
    }

    useEffect(()=>{
        if (active && time > 0){
            timeoutCountdown = setTimeout(()=>{
                setTime(time - 1);
            },1000)
        } else if(time == 0){
            console.log("Finalizou")
            setHasFineshed(true);
            setActive(false);
        }
    }, [active, time])

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>
            {
                hasFineshed ? (
                    <button 
                        disabled 
                        className={styles.countdownButton} >
                        <div>
                            <p>Ciclo encerrado</p>
                        </div>
                    </button>
                ) : (
                    <button onClick={active ? resetCountdown : startCountdown} type="button" className={active ? styles.countdownPauseButton : styles.countdownButton} >
                        {
                            active ? 
                            <div>                        
                                <p>Abandonar ciclo</p> 
                                <img src="icons/close.svg" alt="Close"/>
                            </div>
                            : 
                            <div>
                                <p>Iniciar timer</p>
                                <img src="icons/play_arrow.svg" alt="Play"/>
                            </div>
                        }
                    </button>
                )
            }
            
        </div>
    );
}