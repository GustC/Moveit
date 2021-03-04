import { ReactNode } from "react";

export interface CountdownContextData{
    minutes : number;
    seconds : number;
    hasFinished : boolean;
    isActive : boolean;
    startCountdown : ()=>void;
    resetCountdown : ()=>void;
}

export interface CountdownProviderProps{
    children: ReactNode;
}