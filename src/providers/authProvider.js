import React,{useState, useEffect, createContext} from 'react';
import {getAccessTokenApi,getRefreshTokenApi,logOut,refreshAccessToken} from '../api/auth'
import jwtDecode from "jwt-decode";

export const AuthContext=createContext();

export default function AuthProvider(props){
    const {children}=props;
    
    const [user, setUser] = useState({
        user:null,
        isLoading:true
    });
 
    useEffect(() => {
            checkIfUserIsLogged(setUser)
    }, [])

return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

function checkIfUserIsLogged(setUser){

const accessToken=getAccessTokenApi();
    
if(!accessToken){
    const refreshToken=getRefreshTokenApi();
    if(!refreshToken){
        logOut();
        setUser({
            user:null,
            isLoading:false
        });
    }else{
        refreshAccessToken(refreshToken);
    }
}else{
    setUser({
        user:jwtDecode(accessToken),
        isLoading:false
    });
}
}