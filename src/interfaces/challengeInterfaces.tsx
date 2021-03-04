import { ReactNode } from "react";

export interface ChallengesProviderProps{
    children: ReactNode;
    level : number,
    currentExperience : number,
    challengesCompleted : number,
}

export interface ChallengesProviderData{
    level: number;
    currentExperience : number;
    challengesCompleted : number;
    levelUp : ()=>void;
    startNewChallenge : ()=>void;
    resetChallenge : ()=>void;    
    activeChallenge : ChallengeData
    experienceToNextLevel : number;
    completeChallenge : ()=>void;   
    isLevelUpModalOpen : boolean; 
    closeLevelUpModal : ()=>void;   
}

export interface ChallengeData {
    type: 'body' | 'eye';
    description : string;
    amount: number;
}