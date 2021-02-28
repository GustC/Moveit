import axios from 'axios';
import bodyParser from 'body-parser';
import { NextApiRequest, NextApiResponse } from 'next'

interface GitResponseAuth {
    access_token : String,
    scope : String,
    token_type : String
}

interface GitUser {
    id : Number,
    name : String,
    avatar_url: String,
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    
    if(req.method == "POST"){
        const {code} = req.body;
        var response = await axios.post('https://github.com/login/oauth/access_token',{
            client_id : "77f6f5bb614d2e61b443",
            client_secret : "0fda6d68c26d33813e752b157ccc15c73cf3828b",
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

                res.send(gitUser);
                return;
            }

        } else {
            console.log("Ocorreu um error")
        }
    } else if (req.method == "GET" ){
        const {code} = req.query;
        res.redirect(`http://localhost:3000/login?code=${code}`)
        return;
    }
}
export default handler;