import {BASE_PATH,API_VERSION} from './config';  

export function getCoursesApi(){
    const url=`${BASE_PATH}/${API_VERSION}/get-course`;

    return fetch(url).then(response => {
        return response.json()
    }).then(result =>{
        return result
    }).catch(err => {
        return err.message
    })
}

export function getUdemyCoursesApi(courseId){
const baseUrl=`https://www.udemy.com/api-2.0/courses/${courseId}/`;
const coursesParams=`?fields[course]=title,headline,url,price,image_480x270`;
const url=`${baseUrl}${coursesParams}`;

return fetch(url).then( async response => {
    return {code: response.status, data:await response.json()};
}).then(result => {
    return result;
}).catch(err =>{
    return err;
})

}

export function deleteCourseApi(token,courseId){
const url=`${BASE_PATH}/${API_VERSION}/remove-course/${courseId}`;
const params={
    method:'DELETE',
    headers:{
        "Content-Type":"application/json",
        Authorization: token
    }
}

return fetch(url,params).then(response => {
    return response.json();
}).then(result => {
    return result
}).catch(err => {
    return err
})
}

export function addCourseApi(token,body){
    const url=`${BASE_PATH}/${API_VERSION}/add-course`;
    const params={
        method:'POST',
        body:JSON.stringify(body),
        headers:{
            Authorization: token,
            "Content-type":"application/json"
        }
    }

    return fetch(url,params).then(response => {
        return response.json();
    }).then(result => {
        return result
    }).catch(err => {
        return err
    })

}

export function updateCourseApi(token,courseId,body){
    const url = `${BASE_PATH}/${API_VERSION}/update-course/${courseId}`;
    const params = {
        method: 'PUT',
        body: JSON.stringify(body),
        headers:{
            Authorization:token,
            "Content-Type":"application/json"
        }
    }

    return fetch(url,params).then(response => {
        return response.json();
    }).then(result => {
        return result
    }).catch(err => {
        return err
    })
}