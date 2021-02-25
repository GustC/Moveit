import Head from "next/head";
import { Challenge } from "../components/Challenge";
import { CompleteChallenges } from "../components/CompleteChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { CountdownProvider } from "../contexts/countdownContext";

import styles from '../styles/pages/Home.module.css';



export default function Home() {
  return (
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
  )
}