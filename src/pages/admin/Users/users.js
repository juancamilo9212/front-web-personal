
import React,{useState,useEffect} from 'react';
import './users.scss';
import {getAccessTokenApi} from '../../../api/auth';
import {getActiveUsersApi} from '../../../api/user';
import ListUsers from '../../../components/Admin/Users/ListUsers';


export default function Users(){

    
    const [usersActive, setUsersActive] = useState([]);
    const [usersInactive, setUsersInactive] = useState([]);
    const token = getAccessTokenApi();
    
    useEffect(() => {
        getActiveUsersApi(token,true).then(response=>{
            setUsersActive(response.users);
        });
        getActiveUsersApi(token,false).then(response=>{
            setUsersInactive(response.users);
        });
    }, [token]);

    return (
        <div className="users">
            <ListUsers usersActive={usersActive} usersInactive={usersInactive}/>
        </div>
    );
}