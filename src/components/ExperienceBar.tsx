import { useContext } from "react";
import { ChallengesContext } from "../contexts/challengesContext";
import styles from "../styles/components/ExperienceBar.module.css";

export function ExperienceBar() {
    const {currentExperience ,experienceToNextLevel} = useContext(ChallengesContext);

    const percentXp = Math.round(currentExperience * 100) / experienceToNextLevel;
    
    return (
        <header className={styles.experienceBar}>
            <span>0 xp</span>
            <div>
                <div style={{width : `${percentXp}%`}}/>
                <span className={styles.currentExperience} style={{left : `${percentXp}%`}}>
                    {currentExperience} xp
                </span>
            </div>
            <span>{experienceToNextLevel} xp</span>
        </header>
    );
}