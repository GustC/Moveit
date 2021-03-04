import Router,{useRouter} from 'next/router';
import { useState } from 'react';
import styles from '../styles/components/LoginSingup.module.css';
import { getDatabase } from '../utils/firebase';


export function LoginSingup() {
    const [username,setUsername] = useState("");

    

    function changeUsername(event){
        setUsername(event.target.value);
    }

    function submit(event){
        event.preventDefault()
        if(username.length > 0){
            // solicitar auth com o github
            Router.replace(`https://github.com/login/oauth/authorize?client_id=${process.env.GIT_CLIENT_KEY}&login=${username}`, "Autenticação GitHub");
            // caso sucesso -> redirect home
            // caso fail -> nao entra
            // Router.push("/home")
        }
    }
    var router = useRouter();
    const { code } = router.query;

    function verifyUser(){
        console.log(getDatabase());
    }

    return (
        <form onSubmit={ submit } >
            <div className={styles.container}>
                <img src="./logo-full-white.svg"/>
                <div>
                    <strong>Bem vindo</strong>
                    <div className={styles.gitContainer} onClick={verifyUser}>
                        <img src="./icons/github.svg"/>
                        <p>Faça login com seu Github para começar</p>
                    </div>
                        <div className={styles.inputContainer}>
                            <input value={username} onChange={changeUsername} placeholder="Digite seu username" className={styles.inputLogin}/>
                            { 
                                username.length == 0 ?
                                (<button disabled className={styles.buttonLoginSubmit}>
                                    <img src="./icons/arrow_right.svg"/>
                                </button>)
                                : 
                                (<button onClick={submit} className={styles.buttonLoginSubmitGreen}>
                                    <img src="./icons/arrow_right.svg"/>
                                </button>)
                            }
                            
                        </div>
                </div>
            </div>
        </form>
    );
}
