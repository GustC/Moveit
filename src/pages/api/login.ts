import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next'
import { GitResponseAuth, GitUser } from '../../interfaces/gitInterfaces';
import { User } from '../../interfaces/userInterfaces';
import { getDatabase } from '../../utils/firebase';

const db = getDatabase();


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    
    if(req.method == "POST"){
        const {code} = req.body;
        var response = await axios.post('https://github.com/login/oauth/access_token',{
            client_id : process.env.GIT_CLIENT_KEY,
            client_secret : process.env.GIT_CLIENT_SECRET,
            code : code,
        },{
            headers : {
                "Accept" : "application/json"
            },
            responseType : 'json'
        });
        if(response.status == 200){
            var gitData : GitResponseAuth = response.data;            

            response = await axios.get('https://api.github.com/user',{
                headers : {
                    Authorization: `token ${gitData.access_token}`
                }
            });

            if(response.status == 200){
                var gitUser : GitUser;
                gitUser = {
                    name : response.data.name,
                    avatar_url : response.data.avatar_url,
                    id : response.data.id,
                };

                var user = await getUser(gitUser);
                var userData : User;
                console.log(user)                
                if(user){
                    userData = {
                        id : user.data().id,
                        name : user.data().name,
                        level : user.data().level,
                        avatar_url : user.data().avatar_url,
                        challenges_completed : user.data().challenges_completed,
                        current_experience : user.data().current_experience,
                    };
                } else {
                    userData = {
                        ...gitUser,
                        level : 1,
                        challenges_completed : 0,
                        current_experience : 0,
                    };
                    await saveUser(userData);
                }
                res.send(userData);
                return;
            }

        } else {
            console.log("Ocorreu um error")
        }
    } else if (req.method == "GET" ){
        const {code} = req.query;
        res.redirect(`${process.env.HOSTNAME}/login?code=${code}`)
        return;
    }
}

const saveUser = async (user:User) => {
    return db.collection('users').add({...user});
}

const getUser = async (user:GitUser) => {    
    return (await db.collection('users').where('id','==',user.id).get()).docs[0];
}

export default handler;