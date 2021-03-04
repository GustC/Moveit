import { GetServerSideProps } from "next";
import Head from "next/head";
import { Challenge } from "../components/Challenge";
import { CompleteChallenges } from "../components/CompleteChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { ChallengesProvider } from "../contexts/challengesContext";
import { CountdownProvider } from "../contexts/countdownContext";

import styles from '../styles/pages/Home.module.css';

interface HomeProps {
  level : number,
  currentExperience : number,
  challengesCompleted : number,
}

export default function Home(props : HomeProps) {
  return (
    <ChallengesProvider 
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
    <div className={styles.container}>      
      <Head>
        <title>Início | move.it</title>
      </Head>
      <ExperienceBar/>
      <CountdownProvider>
        <section>
          <div >
            <Profile/>
            <CompleteChallenges/>
            <Countdown/>
          </div>
          <div>
            <Challenge/>          
          </div>
        </section>
      </CountdownProvider>
    </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps : GetServerSideProps = async (ctx) => {
  const {level,currentExperience,challengesCompleted} = ctx.req.cookies;
  return {
    props : {
      level : Number(level),
      currentExperience : Number(currentExperience),
      challengesCompleted : Number(challengesCompleted),
    }
  };
}