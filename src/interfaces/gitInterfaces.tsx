
export interface GitResponseAuth {
    access_token : String,
    scope : String,
    token_type : String
}

export interface GitUser {
    id : number,
    name : String,
    avatar_url: String,
}