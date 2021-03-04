import { useContext } from 'react';
import { ChallengesContext } from '../contexts/challengesContext';
import { ProfileProps } from '../interfaces/profileInterfaces';
import styles from '../styles/components/Profile.module.css';

export function Profile(props : ProfileProps){
    const {level,name,avatar_url} = props;
    return (
        <div className={styles.profileContainer}>
            <img src={avatar_url.toString()} alt={name.toString()}/>
            <div>
                <strong>{name}</strong>                
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level {level}
                </p>
            </div>
        </div>
    );
}