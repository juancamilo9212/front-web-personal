import React,{useState,useEffect} from 'react';
import './PostList.scss';
import {getPostsApi} from '../../../../api/post';
import queryString from 'query-string';
import {Spin, notification, List} from 'antd';
import {Link} from 'react-router-dom';
import Pagination from '../../../Pagination';
import bookAvatar from '../../../../assets/img/jpg/book.jpeg';
import moment from 'moment';

export default function PostList(props) {
    const {history, location}=props;
    const [posts, setPosts] = useState(null);
    const {page = 1} = queryString.parse(location.search);

    console.log(posts);
    
    useEffect(() => {
        getPostsApi(10,page).then(response => {
            if(response?.code !== 200){
                notification["warning"]({
                    message: response.message
                })
            }else{
                setPosts(response.post)
            } 
        }).catch(err => {
            notification("error")({
                message: "Error del servidor"
            })
        })
    }, [page])

    if(!posts){
        return(
            <Spin tip="Cargando" style={{width:"100%", padding:"200px 0"}}/>
        )
    }
    
    return (
        <div className="post-list-web">
            <h1>Blog</h1>
            <List 
            dataSource={posts.docs} 
            renderItem={posts => <WebPost posts={posts}/>}
            />
            <Pagination
             posts={posts}
             location={location}
             history={history}
             />
        </div>
    )
}

function WebPost(props){
const {posts}= props;
const {Item}=List;
const {Meta}=Item;
const day= moment(posts.date).format("DD");
const month= moment(posts.date).format("MMMM");


return(
    <Item key={posts._id}   className="post">
        <Meta 
        title={<Link 
        to={`blogs/${posts.url}`}
        >
            {posts.title}
        </Link>}
        avatar={<img src={bookAvatar} alt="avatar"/>}
        />
        <div className="post__date">
                <span>{day}</span>
                <span>{month}</span>
        </div>
        </Item>
)
}
