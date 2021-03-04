import axios from 'axios';
import Cookies from 'js-cookie';
import { GetServerSideProps } from 'next';
import { LoginSingup } from '../components/LoginSingup';
import styles from '../styles/pages/Login.module.css';
import { firebaseInit } from '../utils/firebase';

interface GitUser {
    id : Number,
    name : String,
    avatar_url: String,
}

export default function Login(){
    return (
        <div className={styles.container}>
            
            <section>
                <div>
                    <img src="./background-logo.svg"/>                
                </div>
                <LoginSingup/>
            </section>
        </div>
    )
}

export const getServerSideProps : GetServerSideProps = async (ctx) => {
    const { code } = ctx.query;
    if(code){
        var response = await axios.post(`${process.env.API_ROUTE}/login`,{ code : code});
        
        if(response.status == 200){
            Cookies.set("user_id",String(response.data.id));
            return {
                redirect: {
                  destination: `/home?user=${response.data.id}`,
                  permanent: false,
                },
                props : {
                    user : response.data,
                }
            }
        }
    }
        
    return {
        props : {
            
        }
    };
}