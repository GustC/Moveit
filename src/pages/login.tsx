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
        var response = await axios.post("http://localhost:3000/api/login",{ code : code});
        
        if(response.status == 200){
            return {
                redirect: {
                  destination: '/home',
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