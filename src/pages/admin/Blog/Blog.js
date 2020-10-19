import React, {useState, useEffect} from 'react';
import './Blog.scss';
import {Button, notification} from 'antd';
import Modal from '../../../components/Admin/Modal';
import queryString from 'query-string';
import {getPostsApi} from '../../../api/post';
import {withRouter} from 'react-router-dom';
import PostList from '../../../components/Admin/Blog/PostList';
import Pagination from '../../../components/Pagination';
import AddPostList from '../../../components/Admin/Blog/AddPostList';

 function Blog(props) {
    
    const {location, history}=props;
    const [reloadPost, setReloadPost] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [posts, setPosts] = useState(null);
    const {page = 1} = queryString.parse(location.search);
    
    
    useEffect(() => {
        
        getPostsApi(12,page).then(response => {
            console.log(response);
                if(response?.code !== 200){
                    notification["warning"]({
                        message: response.message
                    })
                }else{
                    setPosts(response.post)
                }
        }).catch(err => {
            notification["error"]({
                message: err
            })
        })
        setReloadPost(false);
    }, [page,reloadPost])

    const addPostModal = () => {
        
        setIsVisibleModal(true);
        setModalTitle("Creando nuevo post");
        setModalContent(
            <div>
                <AddPostList
                setIsVisibleModal={setIsVisibleModal}
                setReloadPost={setReloadPost}
                post={null}
                />
            </div>
        )
    }

    const editPostModal = (posts) => {
        
        setIsVisibleModal(true);
        setModalTitle(`Actualizando el post ${posts.title}`);
        setModalContent(
            <div>
                <AddPostList
                setIsVisibleModal={setIsVisibleModal}
                setReloadPost={setReloadPost}
                post={posts}
                />
            </div>
        )
    }


    if(!posts){
        return null
    }


    return (
        <div className="blog">
           <div className="blog__add-post">
               <Button type="primary" onClick={addPostModal}>
                Nuevo post
               </Button>
           </div> 
           <PostList posts={posts} 
           setReloadPost={setReloadPost}
           location={location}
           history={history}
           editPostModal={editPostModal}
           />
           <Pagination
           location={location}
           history={history}
           posts={posts}
           setReloadPost={setReloadPost}
           />
           <Modal
            title={modalTitle}
            isVisible={isVisibleModal}
            setIsVisible={setIsVisibleModal}
            width="50%"
            >
            {modalContent}
            </Modal>
        </div>
        
    )
}

export default withRouter(Blog);
