import {BASE_PATH,API_VERSION} from './config';  

export function getMenuApi(token){
const url = `${BASE_PATH}/${API_VERSION}/get-menu`;
const params={
    method:'GET',
    headers:{
        "Content-Type":"application/json",
        Authorization: token
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