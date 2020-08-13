import React from 'react';
import {Link} from 'react-router-dom';
import {Layout, Menu} from 'antd';
import {HomeOutlined,MenuUnfoldOutlined} from '@ant-design/icons';
import './MenuSider.scss';

export default function MenuSider(props){
    
    const {menuCollapsed}=props;
    const {Sider}=Layout;
    const {Item}=Menu;

    return(
        <Sider className="admin-sider" collapsed={menuCollapsed}>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
                <Item key="1">
                <Link to={"/admin"}>
                <HomeOutlined/>
                <span className="nav-text">Home</span>
                </Link>
                </Item>
                <Item key="2">
                <Link to={"/admin/menu-web"}>
                <MenuUnfoldOutlined />
                <span>Menu Web</span>
                </Link>
                </Item>
            </Menu>
        </Sider>
    )
}