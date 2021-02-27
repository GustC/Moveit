import { LoginSingup } from '../components/LoginSingup';
import styles from '../styles/pages/Login.module.css';

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