import { useContext } from 'react';
import { ChallengesContext } from '../contexts/challengesContext';
import styles from '../styles/components/ModalLevelUp.module.css';

export function LevelUpModal(){
    const { level, closeLevelUpModal } = useContext(ChallengesContext);
    return (
        <div className={styles.modalLevelUpOverlay}>
            <div className={styles.modalLevelUpContainer}>
                <header>{level}</header>
                <strong>Parabéns</strong>
                <p>Você alcançou um novo level</p>
                <button type="button" onClick={closeLevelUpModal}>
                    <img src="/icons/close.svg" alt="Close"/>
                </button>
            </div>
        </div>
    );
}