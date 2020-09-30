import React, {useState,useEffect} from 'react';
import {Form, Input, Button, notification} from 'antd';
import {updateMenuApi} from '../../../../api/menu';
import {getAccessTokenApi} from '../../../../api/auth';
import {FontSizeOutlined, LinkOutlined} from '@ant-design/icons';
import './EditMenuWeb.scss';

export default function EditMenuWebForm(props){
    const {setIsVisibleModal, setReloadMenuWeb, menu }= props;
    const [menuWebData, setMenuWebData] = useState({});

    const editMenu = (menu) =>{
        
        const finalData={
            title:menuWebData.title,
            url:menuWebData.url
        }

        const token=getAccessTokenApi()
        updateMenuApi(token,menu._id,finalData).then(result => {
            notification["success"]({
                message:result.message
            })
            setReloadMenuWeb(true);
            setIsVisibleModal(false);
            setMenuWebData({
                title:"",
                url:""
            })
        }).catch(err => {
            notification["error"]({
                message: err.message
            })
        })

    }

    return(
        <div className="edit-menu-web-form">
            <EditForm menuWebData={menuWebData} 
            setMenuWebData={setMenuWebData}
            editMenu={editMenu}
            menu={menu}
            />
        </div>
    )
}



function EditForm(props){
const {menuWebData, setMenuWebData, editMenu, menu}=props;
const {Item}= Form;

return (
    <Form className="form-edit" onSubmitCapture={()=> editMenu(menu)}>
        <Item>
            <Input 
            prefix={<FontSizeOutlined/>}
            placeholder="Título"
            value={menuWebData.title}
            onChange={e => setMenuWebData({...menuWebData,title: e.target.value})}
            />
        </Item>
        <Item>
            <Input 
            prefix={<LinkOutlined/>}
            placeholder="URL"
            value={menuWebData.url}
            onChange={e => setMenuWebData({...menuWebData,url: e.target.value})}
            />
        </Item>
        <Item>
            <Button type="primary"
            htmlType="submit"
            className="btn-submit">
                Actualizar Menu
            </Button>
        </Item>
    </Form>
)
}