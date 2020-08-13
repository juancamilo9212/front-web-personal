import React from 'react';
import {Route,Switch} from 'react-router-dom';
import {Layout} from 'antd';
import "./LayOutBasic.scss"

export default function LayOutBasic(props){

    const {routes}=props;
    console.log(routes);
    const {Content, Footer}= Layout;

    return (
        <Layout>
            <h2>Menu Slider Basic User</h2>
            <Layout>
                <Content>
                    <LoadRoutes routes={routes}/>
                </Content>
                <Footer>Juan Camilo Camargo</Footer>
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
