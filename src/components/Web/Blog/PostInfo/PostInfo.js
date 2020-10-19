import React,{useEffect,useState} from 'react';
import './PostInfo.scss';
import {getApostApi} from '../../../../api/post';
import { notification, Spin } from 'antd';
import moment from 'moment';
import {Helmet} from 'react-helmet';

export default function PostInfo(props) {
    const {url} = props;

    const [post, setPost] = useState({});

    useEffect(() => {
        getApostApi(url).then(response => {
            if(response?.code !==200){
                notification["warning"]({
                    message:response.message
                })
            }else{
                setPost(response.post)
            }
        }).catch(err => {
            notification["error"]({
                message:err
            })
        })
    }, [url])

    if(!post){
        return (
            <Spin tip="Cargando"  style={{width:"100%", padding:"200px 0"}}/>
        )
    }


    return (
        <>
        <Helmet>
         <title>{`${post.title} | Juan Camilo Camargo`}</title>
        </Helmet>
        <div className="post-info">
            <h1 className="post-info__title">{post.title}</h1>
            <div className="post-info__date">
            {moment(post.date).locale("ES").format("LL")}
            </div>
            <div 
            className="post-info__description"
            dangerouslySetInnerHTML={{__html: post.description}}    
            />
        </div>
        </>
    )
}
