import styles from '../styles/components/Challenge.module.css';

export function Challenge(){
    const hasActiveChallenge = true;

    return (
        <div className={styles.challengeContainer}>
            {
                hasActiveChallenge ? (
                    <div className={styles.challengeActive}>
                        <header>Ganhe 400 xp</header>
                        <main>
                            <img src="icons/body.svg" alt="Level up"/>                            
                            <strong>Novo desafio</strong>
                            <p>Levente e faça uma caminhada</p>
                        </main>
                        <footer>
                            <button 
                                type="button"
                                className={styles.challengeFailedButton}
                            >Falhei</button>
                            <button
                                type="button"
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