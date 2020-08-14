import React, {useState} from 'react';
import {Route,Switch, Redirect} from 'react-router-dom';
import {Layout} from 'antd';
import "./LayOutAdmin.scss";
import MenuTop from '../components/Admin/MenuTop';
import MenuSider from '../components/Admin/MenuSider';
import AdminSignIn from '../pages/admin/SignIn/SignIn';


export default function LayOutAdmin(props){
    
    const {routes}=props;
    const {Header ,Content ,Footer }= Layout;
    const [menuCollapsed,setMenuCollapsed] = useState(true);
    const user=null;

    if(!user){
        return(
        <>
        <Route path="/admin/login" component={AdminSignIn}/>
        <Redirect to="/admin/login"/>
        </>
            )
    }
    
    return (
        <Layout>
            <MenuSider menuCollapsed={menuCollapsed}/>
            <Layout className="layout-admin">
                <Header className="layout-admin__header">
                    <MenuTop menuCollapsed={menuCollapsed}
                    setMenuCollapsed={setMenuCollapsed}/>
                </Header>
                <Content className="layout-admin__content" style={{marginLeft: menuCollapsed ? "80px" : "200px"}}>
                    <LoadRoutes routes={routes}/>
                </Content>
                <Footer className="layout-admin__footer">Juan Camilo Camargo</Footer>
            </Layout>
        </Layout>
    );
}

function LoadRoutes({routes}){
    
    return (
    <Switch>
        {routes.map((route,index)=>(
        <Route 
        key={index}
        path={route.path}
        exact={route.exact}
        component={route.component}
        />
        ))}
        </Switch>
        );
}