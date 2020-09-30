import React,{useState} from 'react';
import {Form, Input, Button, Select, notification} from 'antd';
import {FontSizeOutlined} from '@ant-design/icons';
import {getAccessTokenApi} from '../../../../api/auth';
import {createMenuApi} from '../../../../api/menu';
import './AddWebMenuForm.scss';

export default function AddWebMenuForm(props){

    const {setIsVisibleModal, setReloadMenuWeb}=props;
    const [menuData,setMenuData]=useState({});
    
    const createMenu = () =>{
        
        let finalData={
            title:menuData.title,
            url: (menuData.http ? menuData.http:"http://")+menuData.url
        }

        if(!finalData.title || !finalData.url){
            notification["error"]({
                message: "Todos los campos son obligatorios"
            })
        }else{
            const token=getAccessTokenApi();
            finalData.active=false;
            finalData.order=1000;

            createMenuApi(token,finalData).then(result => {
                notification["success"]({
                    message: result
                })
                setReloadMenuWeb(true);
                setIsVisibleModal(false);
                setMenuData({})
                finalData={}
            }).catch(err => {
                notification["error"]({
                message: "Error en el servidor"
                })
            })

        }
    }

    return(
        <div className="add-menu-web-form">
            <AddForm 
            setMenuData={setMenuData}
            menuData={menuData}
            createMenu={createMenu}
            />
        </div>
    )
}

function AddForm(props){
    
    const {menuData,setMenuData,createMenu}=props;
    const {Item}=Form;
    const {Option}= Select;
    const selectBefore=(

        <Select defaultValue="http://"
        style={{width:90}}
        onChange={e => setMenuData({...menuData,http:e})}
        >
            <Option value="http://">http://</Option>
            <Option value="https://">https://</Option>
        </Select>
    )
return(
    <Form className="form-add" onSubmitCapture={createMenu}>
        <Item>
            <Input prefix={<FontSizeOutlined/>}
            placeholder="Título"
            value={menuData.title}
            onChangeCapture={e => setMenuData({...menuData,title: e.target.value})}
            />
        </Item>

        <Item>
            <Input addonBefore={selectBefore}
            placeholder="URL"
            value={menuData.url}
            onChange={e => setMenuData({...menuData, url: e.target.value})}
            />
        </Item>

        <Item>
            <Button
            type="primary"
            htmlType="submit"
            className="btn-submit"
            >Crear Menu</Button>
        </Item>
    </Form>
)
}