import { createContext, ReactNode, useState } from 'react';
import challenges from '../../challenges.json';

export const ChallengesContext = createContext({} as ChallengesProviderData);

interface ChallengesProviderProps{
    children: ReactNode;
}

interface ChallengesProviderData{
    level: number;
    currentExperience : number;
    challengesCompleted : number;
    levelUp : ()=>void;
    startNewChallenge : ()=>void;
    resetChallenge : ()=>void;    
    activeChallenge : ChallengeData
    experienceToNextLevel : number;
}

interface ChallengeData {
    type: 'body' | 'eye';
    description : string;
    amount: number;
}

export function ChallengesProvider({ children } : ChallengesProviderProps){
    const [ level, setLevel ] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);

    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4 , 2)

    function levelUp(){
        setLevel(level + 1);
    }

    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];
        setActiveChallenge(challenge);
    }

    function resetChallenge(){
        setActiveChallenge(null);
    }

    return <ChallengesContext.Provider value={{ 
            level, 
            levelUp, 
            currentExperience,
            challengesCompleted,
            startNewChallenge,
            activeChallenge,
            resetChallenge,
            experienceToNextLevel,
        }}>
        {children}
    </ChallengesContext.Provider>
}