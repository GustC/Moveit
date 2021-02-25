import { useContext } from 'react';
import { ChallengesContext } from '../contexts/challengesContext';
import { CountdownContext } from '../contexts/countdownContext';
import styles from '../styles/components/Challenge.module.css';

export function Challenge(){

    const {activeChallenge,completeChallenge,resetChallenge} = useContext(ChallengesContext);
    const {resetCountdown} = useContext(CountdownContext);

    function handleChallengeSuceeded(){
        completeChallenge();
        resetCountdown();
    }

    function handleChallengeFailed(){
        resetChallenge();
        resetCountdown();
    }

    return (
        <div className={styles.challengeContainer}>
            {
                activeChallenge ? (
                    <div className={styles.challengeActive}>
                        <header>Ganhe {activeChallenge.amount} xp</header>
                        <main>
                            <img src={ `icons/${activeChallenge.type}.svg` } alt="Level up"/>                            
                            <strong>Novo desafio</strong>
                            <p>{activeChallenge.description}</p>
                        </main>
                        <footer>
                            <button 
                                type="button"
                                onClick={handleChallengeFailed}
                                className={styles.challengeFailedButton}
                            >Falhei</button>
                            <button
                                type="button"
                                onClick={handleChallengeSuceeded}
                                className={styles.challengeSucceededButton}
                            >Completei</button>
                        </footer>
                    </div>
                ) : (
                    <div className={styles.challengeNotActive}>
                        <strong>
                            Inicie um ciclo para receber desafios
                        </strong>
                        <p>
                            <img src="icons/level-up.svg" alt="Level up"/>
                            Avance de level completando os desafios.
                        </p>
                    </div>
                )
            }
        </div>
    );
}