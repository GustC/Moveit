import Router from 'next/router';
import { useState } from 'react';
import styles from '../styles/components/LoginSingup.module.css';

export function LoginSingup() {
    const [username,setUsername] = useState("");

    function changeUsername(event){
        setUsername(event.target.value);
    }

    function submit(event){
        event.preventDefault()
        if(username.length > 0){
            // solicitar auth com o github
            // caso sucesso -> redirect home
            // caso fail -> nao entra
            Router.push("/home")
        }
    }

    async function tapGit(){
        // await axios.get("https://github.com/login/oauth/authorize",{
        //     headers : { "Access-Control-Allow-Origin" : "*"},
        //     data : {
        //         client_id : "77f6f5bb614d2e61b443",
                
        //         // login : username,
        //     }
        // }).then((v)=>console.log(v)).catch((e)=>console.log(e));
    }

    return (
        <form onSubmit={ submit } >
            <div className={styles.container}>
                <img src="./logo-full-white.svg"/>
                <div>
                    <strong>Bem vindo</strong>
                    <div className={styles.gitContainer} onClick={tapGit}>
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
