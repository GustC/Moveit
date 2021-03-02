import { useContext } from 'react';
import { ChallengesContext } from '../contexts/challengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile(){
    const {level, gitUser } = useContext(ChallengesContext);
    return (
        <div className={styles.profileContainer}>
            <img src={gitUser.avatar_url.toString()} alt={gitUser.avatar_url.toString()}/>
            <div>
                <strong>{gitUser.name}</strong>                
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level {level}
                </p>
            </div>
        </div>
    );
}