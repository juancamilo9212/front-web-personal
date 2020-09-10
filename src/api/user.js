import {BASE_PATH,API_VERSION} from './config';

export function signUpApi(data){
    
    const url= `${BASE_PATH}/${API_VERSION}/sign-up`;
    const params={
        method:"POST",
        body:JSON.stringify(data),
        headers:{
            "Content-Type":"application/json"
        }
    };

    return fetch(url,params).then(response =>{
        return response.json();
    }).then(result=>{
        console.log(result);
        return result;
    }).catch(err=>{
        return err.message;
    })
}

export function signIn(data){
    const url=`${BASE_PATH}/${API_VERSION}/sign-in`;
    const params={
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            "Content-Type":"application/json",
            "Access-Control-Allow-Headers":"*"
        }
    }
    return fetch(url,params).then(response=>{
        return response.json()
    }).then(result=>{
        return result;
    }).catch(err =>{
        return err.message;
    })
}

export function getUsersApi(token){
    const url= `${BASE_PATH}/${API_VERSION}/users`;
    const params={
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            Authorization: token
        }
    };

    return fetch(url,params).then(response => {
        return response.json();
    }).then(result=>{
        return result;
    }).catch(err =>{
        return err.message;
    })
}

export function getActiveUsersApi(token,status){
    const url= `${BASE_PATH}/${API_VERSION}/users-active/?active=${status}`;
    const params={
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            Authorization: token
        }
    };

    return fetch(url,params).then(response => {
        return response.json();
    }).then(result=>{
        return result;
    }).catch(err =>{
        return err.message;
    })
}

export function uploadAvatarApi(token,avatar,userId){
const url=`${BASE_PATH}/${API_VERSION}/load-avatar/${userId}`;
const formData=new FormData();
formData.append("avatar", avatar, avatar.name);
const params={
    method:"PUT",
    body:formData,
    headers:{
        Authorization: token
    }
    
}
return fetch(url,params).then(response=>{
return response.json()
}).then(result=>{
    return result;
}).catch(err=>{
    return err.message;
})
}

export function getAvatarApi(token,avatarName){
    const url=`${BASE_PATH}/${API_VERSION}/avatar/${avatarName}`;
    const params={
        method:'GET',
        headers:{Authorization:token}
    }
    return fetch(url,params).then(response=>{
        return response.url;
    }).catch(err=>{
       return err.message;
    })

}

export function updateUserApi(token,userData,userId){
    const url=`${BASE_PATH}/${API_VERSION}/update-user/${userId}`;
    const params={
        method:"PUT",
        body:JSON.stringify(userData),
        headers:{
            "Content-Type":"application/json",
            Authorization: token}
    }  

    return fetch(url,params).then(response=>{
        return response.json()
    }).then(result=>{
        return result;
    }).catch(err=>{
        return err.message;
    })
}

export function activateUserApi(token,userId,status){
    const url=`${BASE_PATH}/${API_VERSION}/activate-user/${userId}/?active=${status}`;
    const params={
        method:'PUT',
        headers:{
            Authorization: token,
            "Content-Type":"application/json"
        }
    }

    return fetch(url,params).then(response =>{
        return response.json();
    }).then(result =>{
        return result.message;
    }).catch(err =>{
        return err.message;
    })
}

export function deleteUserApi(token,userId){
    const url= `${BASE_PATH}/${API_VERSION}/delete-user/${userId}`;
    const params={
        method:'DELETE',
        headers:{
            Authorization:token,
            "Content-Type":"applicaton/json"
        }
    }

    return fetch(url,params).then(response =>{
        return response.json();
    }).then(result =>{
        return result.message;
    }).catch(err =>{
        return err.message;
    })


}

export function createUserApi(token,userData){
    const url = `${BASE_PATH}/${API_VERSION}/create-user`;
    const params= {
        method: 'POST',
        body: JSON.stringify(userData),
        headers:{
            Authorization: token,
            "Content-Type":"application/json"
        }
    }

    return fetch(url,params).then(response => {
        return response.json();
    }).then(result => {
        return result.message;
    }).catch(err => {
        return err.message;
    })
}