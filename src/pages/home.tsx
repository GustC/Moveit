import axios from "axios";
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

interface GitUser {
  id : Number,
  name : String,
  avatar_url: String,
}

interface HomeProps {
  level : number,
  currentExperience : number,
  challengesCompleted : number,
  gitUser : GitUser,
}

export default function Home(props : HomeProps) {
  console.log("gitUser",props)
  return (
    <ChallengesProvider 
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
      gitUser={props.gitUser}
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
  const { user_code } = ctx.query;
  if(user_code){
    var response = await axios.post("http://localhost:3000/api/login",{ code : user_code});        
    if(response.status == 200){
      const gitUser : GitUser = response.data;
      console.log("getServerSideProps",gitUser);
      return {
        props: {
          level : Number(level),
          currentExperience : Number(currentExperience),
          challengesCompleted : Number(challengesCompleted),
          gitUser : gitUser,
        }
      }

    } else {
      return {
        redirect : '/login',
        props:{}
      }
    }
  }
  return {
    props : {
      level : Number(level),
      currentExperience : Number(currentExperience),
      challengesCompleted : Number(challengesCompleted),
    }
  };
}