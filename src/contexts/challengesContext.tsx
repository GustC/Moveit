import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';
import { ChallengesProviderData, ChallengesProviderProps } from '../interfaces/challengeInterfaces';

export const ChallengesContext = createContext({} as ChallengesProviderData);


export function ChallengesProvider({ 
    children, 
    ...rest 
} : ChallengesProviderProps){
    const [ level, setLevel ] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
    const [isLevelUpModalOpen, setIsLevelModalOpen] = useState(false);
    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4 , 2)

    useEffect(()=>{
        Notification.requestPermission();
    },[])

    useEffect(()=>{
        Cookies.set("level",String(level));
        Cookies.set("currentExperience",String(currentExperience));
        Cookies.set("challengesCompleted",String(challengesCompleted));
    },[ level, currentExperience, challengesCompleted ])

    function levelUp(){
        setLevel(level + 1);
        setIsLevelModalOpen(true);
    }

    function closeLevelUpModal(){
        setIsLevelModalOpen(false);
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
            isLevelUpModalOpen,
            closeLevelUpModal,
        }}>
        {children}
        { isLevelUpModalOpen && <LevelUpModal/>}
    </ChallengesContext.Provider>
}