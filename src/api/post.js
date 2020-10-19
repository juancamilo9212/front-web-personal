import {BASE_PATH, API_VERSION} from './config';

export function getPostsApi(limit, page){
    const url =`${BASE_PATH}/${API_VERSION}/get-posts?page=${page}&limit=${limit}`;

    return fetch(url).then(response => {
        return response.json();
    }).then(result => {
        return result;
    }).catch(err => {
        return err;
    })
}

export function deletePostApi(token,postId){
    const url =`${BASE_PATH}/${API_VERSION}/delete-post/${postId}`;
    const params = {
        method:'DELETE',
        headers:{
            Authorization:token,
            "Content-Type":"application/json"
        }
    }

    return fetch(url,params).then(response => {
        return response.json();
    }).then(result => {
        return result;
    }).catch(err => {
        return err;
    })
}

export function addPostApi(token,data){
    const url =`${BASE_PATH}/${API_VERSION}/add-post`;
    const params = {
        method:'POST',
        body:JSON.stringify(data),
        headers:{
            Authorization:token,
            "Content-Type":"application/json"
        }
    }

    return fetch(url,params).then(response => {
        return response.json();
    }).then(result => {
        return result;
    }).catch(err => {
        return err;
    })
}

export function updatePostApi(token,data,id){
    const url =`${BASE_PATH}/${API_VERSION}/update-post/${id}`;
    const params = {
        method:'PUT',
        body:JSON.stringify(data),
        headers:{
            Authorization:token,
            "Content-Type":"application/json"
        }
    }

    return fetch(url,params).then(response => {
        return response.json();
    }).then(result => {
        return result;
    }).catch(err => {
        return err;
    })
}

export function getApostApi(postUrl){
    const url =`${BASE_PATH}/${API_VERSION}/get-post/${postUrl}`;
    
    return fetch(url).then(response => {
        return response.json();
    }).then(result => {
        return result;
    }).catch(err => {
        return err;
    })
}