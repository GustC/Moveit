import { createContext, ReactNode, useEffect, useState } from 'react';
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
    completeChallenge : ()=>void;    
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

    useEffect(()=>{
        Notification.requestPermission();
    },[])

    function levelUp(){
        setLevel(level + 1);
    }

    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);

        new Audio("/notification.mp3").play();

        if(Notification.permission === 'granted'){
            new Notification("Novo desafio",{
                body: `Valendo ${challenge.amount} de xp`,
            });
            console.log("teste");
        }
    }

    function resetChallenge(){
        setActiveChallenge(null);
    }

    function completeChallenge(){
        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if(finalExperience >= experienceToNextLevel){
            levelUp();
            finalExperience = finalExperience - experienceToNextLevel;
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted+1);
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
            completeChallenge,
        }}>
        {children}
    </ChallengesContext.Provider>
}