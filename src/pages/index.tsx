import { GetServerSideProps } from "next";
import { firebaseInit } from "../utils/firebase";
import Home from "./home";
import Login from "./login";



export default function Index(){

    return (
        <Login/>
    )
}

export const getServerSideProps : GetServerSideProps = async (ctx) => {
    const {isLogged} = ctx.req.cookies;
    firebaseInit();
    return {
        props : {}
    };
  }