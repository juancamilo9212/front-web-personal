import React, {useEffect,useState} from 'react';
import './AddPostList.scss';
import {Row, Col, Form, Input, Button, DatePicker, notification} from 'antd';
import {Editor} from '@tinymce/tinymce-react';
import {getAccessTokenApi} from '../../../../api/auth';
import {addPostApi,updatePostApi} from '../../../../api/post';
import {FontSizeOutlined,LinkOutlined} from '@ant-design/icons';
import moment from 'moment';

export default function AddPostList(props) {
    const {setIsVisibleModal, setReloadPost,post}=props;
    const [postData, setPostData] = useState({});

    useEffect(() => {
        post ? setPostData(post):setPostData({});
    }, [post])

    const processPost = e => {
        e.preventDefault();
        const {title, url, date, description}=postData;
        if(!title || !url || !date || !description){
            notification["warning"]({
                message:"Hay campos obligatorios sin diligenciar"
            })
        }else{
            const token=getAccessTokenApi()
            if(!post){
                addPostApi(token,postData).then(response => {
                    notification["success"]({
                        message:response.message
                    })
                    setIsVisibleModal(false);
                    setReloadPost(true);
                    setPostData({});
                }).catch(err => {
                    notification["error"]({
                        message:err
                    }) 
                })
            }else{
                updatePostApi(token,postData,post._id).then(response => {
                    notification["success"]({
                        message:response.message
                    })
                    setIsVisibleModal(false);
                    setReloadPost(true);
                    setPostData({});
                }).catch(err => {
                    notification["error"]({
                        message:err
                    }) 
                })
            }

        }
        
        
    }

    return (
        <div className="add-edit-post-form">
            <AddEditForm 
            postData={postData} 
            setPostData={setPostData} 
            post={post}
            processPost={processPost}
            />
        </div>
    )
}

function AddEditForm(props){
    const {postData,setPostData,post,processPost}=props;
    const {Item}=Form;
    return(
        <Form 
        className="add-edit-post-form"
        layout="inline"
        onSubmitCapture={processPost}
        >
        <Row gutter={24}>
            
            <Col span={8}>
            <Item>
                <Input
                prefix={<FontSizeOutlined/>}
                placeholder="Título"
                value={postData.title}
                onChange={e => setPostData({...postData,title:e.target.value})}
                />
            </Item>
            </Col>
            
            <Col span={8}>
            <Item>
                <Input
                prefix={<LinkOutlined/>}
                placeholder="url"
                value={postData.url}
                onChange={e => setPostData({...postData,url:transformUrlText(e.target.value)})}
                />
            </Item>
            </Col>

            
            <Col span={8}>
            <Item>
                <DatePicker
                style={{width:"100%"}}
                format="DD/MM/YYYY HH:mm:ss"
                placeholder="Fecha de publicación"
                showTime={{defaultValue: moment("00:00:00, HH:mm:ss")}}
                value={postData.date && moment(postData.date)}
                onChange={(e, value) => 
                    setPostData({...postData, 
                        date: moment(value,"DD/MM/YYYY HH:mm:ss")
                    })}
                />
            </Item>
            </Col>
            
        </Row>

        <Editor
         value={postData.description ? postData.description:""}
         init={{
           height: 400,
           menubar: true,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
           toolbar:
             'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help'
         }}
         onBlur={e => setPostData({...postData,description:e.target.getContent()})}
       />

       <Button type="primary" htmlType="submit" className="btn-submit">
         {post ? "Actualizar post" : "Crear post"}
       </Button>
        </Form>
    )
}

function transformUrlText(text){
    const url=text.replace(" ", "-");
    return url.toLowerCase()
}
