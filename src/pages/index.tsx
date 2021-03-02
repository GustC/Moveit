import { GetServerSideProps } from "next";
import Home from "./home";
import Login from "./login";

interface AppProps {
    isLooged : boolean
}


export default function Index(props : AppProps){
    const {isLooged} = props; 

    if(isLooged){
        return (
            <Home currentExperience={null} level={null} challengesCompleted={null} gitUser={null}/>
        )
    } else {
        return (
            <Login/>
        )
    }
}

export const getServerSideProps : GetServerSideProps = async (ctx) => {
    const {isLogged} = ctx.req.cookies;
    return {
        props : {
            isLogged : Boolean(isLogged)
        }
    };
  }