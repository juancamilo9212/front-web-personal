import {BASE_PATH,API_VERSION} from './config';  

export function getMenuApi(){
const url = `${BASE_PATH}/${API_VERSION}/get-menu`;
const params={
    method:'GET',
    headers:{
        "Content-Type":"application/json",
    }
}

return fetch(url,params).then(response => {
    return response.json();
}).then(result =>{
    return result
}).catch(err => {
    return err.message
})
}

export function updateMenuApi(token,menuId,menuData){
    const url=`${BASE_PATH}/${API_VERSION}/update-menu/${menuId}`;
    const params={
        method: 'PUT',
        headers:{
            Authorization: token,
            "Content-Type":"application/json"
        },
        body:JSON.stringify(menuData)
    }

    return fetch(url,params).then(response => {
        return response.json();
    }).then(result =>{
        return result;
    }).catch(err =>{
        return err.message;
    })
}

export function activateMenuApi(token,menuId,status){
    const url= `${BASE_PATH}/${API_VERSION}/activate-menu/${menuId}/?active=${status}`;
    const params = {
        method: 'PUT',
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

export function createMenuApi(token,menuData){
    const url=`${BASE_PATH}/${API_VERSION}/add-menu`
    const params={
        method: 'POST',
        body: JSON.stringify(menuData),
        headers:{
            "Content-Type":"application/json",
            Authorization: token
        }
    }

    return fetch(url,params).then(response => {
        return response.json()
    }).then(result => {
        console.log(result);
        
        return result.message
    }).catch(err => {
        return err.message
    })
}

export function deleteMenuApi(token,menuId){
    const url=`${BASE_PATH}/${API_VERSION}/delete-menu/${menuId}`;
    const params={
        method: 'DELETE',
        headers:{
            Authorization:token,
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