import { useState, useEffect, useContext } from 'react';
import { CountdownContext } from '../contexts/countdownContext';
import styles from '../styles/components/Countdown.module.css';



export function Countdown(){
    const {
        minutes,
        seconds,
        hasFinished,
        isActive,
        startCountdown,
        resetCountdown,
    } = useContext(CountdownContext)
    

    const [minuteLeft,minuteRight] = String(minutes).padStart(2,'0').split('');
    const [secondLeft,secondRight] = String(seconds).padStart(2,'0').split('');

   

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
                hasFinished ? (
                    <button 
                        disabled 
                        className={styles.countdownButton} >
                        <div>
                            <p>Ciclo encerrado</p>
                        </div>
                    </button>
                ) : (
                    <button onClick={isActive ? resetCountdown : startCountdown} type="button" className={isActive ? styles.countdownPauseButton : styles.countdownButton} >
                        {
                            isActive ? 
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