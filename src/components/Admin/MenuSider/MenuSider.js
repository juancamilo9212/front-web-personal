import React from 'react';
import {Link,withRouter} from 'react-router-dom';
import {Layout, Menu} from 'antd';
import {HomeOutlined,UserOutlined,MenuOutlined,BookOutlined,MessageOutlined} from '@ant-design/icons';
import './MenuSider.scss';

 function MenuSider(props){
    
    const {menuCollapsed,location}=props;
    const {Sider}=Layout;
    const {Item}=Menu;

    return(
        <Sider className="admin-sider" collapsed={menuCollapsed}>
            <Menu theme="dark" mode="inline" 
            defaultSelectedKeys={[location.pathname]}>
                <Item key="/admin">
                <Link to={"/admin"}>
                <HomeOutlined/>
                <span className="nav-text">Home</span>
                </Link>
                </Item>

                <Item key="/admin/users">
                <Link to={"/admin/users"}>
                <UserOutlined />
                <span>Usuarios</span>
                </Link>
                </Item>

                <Item key="/admin/menu">
                <Link to={"/admin/menu"}>
                <MenuOutlined />
                <span>Menu</span>
                </Link>
                </Item>

                <Item key="/admin/courses">
                <Link to={"/admin/courses"}>
                <BookOutlined/>
                <span>Cursos</span>
                </Link>
                </Item>

                <Item key="/admin/blog">
                <Link to={"/admin/blog"}>
                <MessageOutlined/>
                <span>Blogs</span>
                </Link>
                </Item>
            </Menu>
        </Sider>
    )
}

export default  withRouter(MenuSider);