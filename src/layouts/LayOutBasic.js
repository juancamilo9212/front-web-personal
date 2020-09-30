import React from 'react';
import {Route,Switch} from 'react-router-dom';
import {Row, Col} from 'antd';
import "./LayOutBasic.scss";
import MenuTop from '../components/Web/MenuTop' ;
import Footer from '../components/Web/Footer';


export default function LayOutBasic(props){

    const {routes}=props;
    console.log(routes);

    return(
    <>
        <Row>
            <Col md={4}/>
            <Col md={16}>
            <MenuTop/>
            </Col>
            <Col md={4}/>
        </Row>
        <LoadRoutes routes={routes}/>
        <Footer/>
    </>
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
