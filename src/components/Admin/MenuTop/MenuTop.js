import React from 'react';
import { Button} from 'antd';
import {MenuUnfoldOutlined, MenuFoldOutlined,PoweroffOutlined} from '@ant-design/icons';
import './MenuTop.scss';
import logo from '../../../assets/img/png/logo.png';
import {logOut} from '../../../api/auth';


export default function MenuTop(props){

    const {menuCollapsed,setMenuCollapsed}=props;

    const logOutUser= () =>{
        logOut();
        window.location.reload();
    }

    return (
        <div className="menu-top">
            <div className="menu-top__left">
                <img 
                className="menu-top__left-logo"
                src={logo}
                alt="Juan Camilo Camargo"
                />
                <Button type="link" onClick={() => setMenuCollapsed(!menuCollapsed)}>
                {menuCollapsed ? <MenuUnfoldOutlined/>:<MenuFoldOutlined/>}
                </Button>
            </div>
            <div className="menu-top__right">
                <Button type="link" onClick={logOutUser}>
                <PoweroffOutlined/>
                </Button>
            </div>
        </div>
    )
}