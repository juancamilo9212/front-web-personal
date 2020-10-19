import React from 'react';
import './PostList.scss';
import {notification, List, Button, Modal as ModalAntd} from 'antd';
import {EyeOutlined,EditOutlined,DeleteOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';
import {deletePostApi} from '../../../../api/post';
import {getAccessTokenApi} from '../../../../api/auth';
const {confirm}= ModalAntd;


export default function PostList(props) {
    const {posts,setReloadPost,location,history,editPostModal}=props;
    const {docs}=posts;
    const {page}=posts;

    const deletePost = () => {
        const token = getAccessTokenApi();
        
        confirm({
            title:"Eliminando un post",
            content: `¿Estás seguro que quieres eliminar el post ${posts.title}?`,
            okText: "Eliminar",
            okType:"danger",
            cancelText: "Cancelar",
            onOk(){
                deletePostApi(token,posts._id).then(response => {
                    notification["success"]({
                        message:response.message
                    })

                    const previuosPage=page-1;
                    docs.length ===1 && page > 1 ? 
                    history.push(`${location.pathname}?page=${previuosPage}`):
                    setReloadPost(true);

                }).catch(err => {
                    notification["error"]({
                        message:err
                    })
                });
            }
        })
        
    }

    return (
        <div className="post-list">
            <List
            dataSource={posts.docs}
            renderItem={posts =>
                 <Post 
                 posts={posts} 
                 deletePost={deletePost}
                 editPostModal={editPostModal}
                 />}
            />
        </div>
    )
}

function Post(props){
    const {posts,deletePost,editPostModal}= props;
    const {Item}=List;

    return(
        <Item
        actions={
            [
                <Link to={`/blogs/${posts.url}`} target="_blank">
                <Button 
                type="primary" 
                >
                <EyeOutlined />
                </Button>
                </Link>,
                <Button 
                type="primary" 
                onClick={() => editPostModal(posts)}
                target="_blank"
                >
                <EditOutlined />
                </Button>,

                <Button     
                type="danger" 
                onClick={() => deletePost(posts)}
                target="_blank"
                >
                <DeleteOutlined />
                </Button>
            ]
        }
        >
        <List.Item.Meta title={posts.title}/>
        </Item>
    )
}
