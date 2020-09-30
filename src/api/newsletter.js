import {BASE_PATH,API_VERSION} from './config';  

export function suscribeEmail(email){
    const url=`${BASE_PATH}/${API_VERSION}/suscribe-newsletter/${email}`;
    const params={
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        }
    }

    return fetch(url,params).then(response => {
        return response.json()
    }).then(result => {
        return result.message
    }).catch(err => {
        return err.message
    })
}