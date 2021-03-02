import axios from 'axios';
import { GetServerSideProps } from 'next';
import { LoginSingup } from '../components/LoginSingup';
import styles from '../styles/pages/Login.module.css';

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
        return {
            redirect: {
              destination: `/home?user_code=${code}`,
              permanent: false,
            },
        };        
    }
        
    return {
        props : {
            
        }
    };
}