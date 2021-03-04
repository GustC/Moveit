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
import { User } from "../interfaces/userInterfaces";

import styles from '../styles/pages/Home.module.css';

interface HomeProps {
  user : User
}

export default function Home(props : HomeProps) {
  const {user} = props;
  return (
    <ChallengesProvider 
      level={user.level}
      currentExperience={user.current_experience}
      challengesCompleted={user.challenges_completed}
    >
    <div className={styles.container}>      
      <Head>
        <title>Início | move.it</title>
      </Head>
      <ExperienceBar/>
      <CountdownProvider>
        <section>
          <div >
            <Profile 
              level={user.level}
              name={user.name}
              avatar_url={user.avatar_url}
            />
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
  const {level,currentExperience,challengesCompleted,user_id} = ctx.req.cookies;
  const {user} = ctx.query;
  console.log("Usuario", user);
  var response = await axios.get(`${process.env.API_ROUTE}/user/${user}`);
  if(response.status == 200){
    var userData : User;
    userData = response.data;
  } else {
    return {
      redirect : {
        destination: `/login`,
        permanent: false,
      }
    }
  }
  return {
    props : {
      user : userData
    }
  };
}