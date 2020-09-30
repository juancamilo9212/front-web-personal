import React from 'react';
import './Footer.scss';
import {Layout, Row, Col} from 'antd';
import MyInfo from './MyInfo';
import NavegacionFooter from './NavegacionFooter';
import Newsletter from '../Newsletter';

export default function Footer() {

    const {Footer}=Layout;

    return (
        <Footer className="footer">
            <Row>
                <Col md={4}/>
                <Col md={16}>
                    <Row>
                        <Col md={8}><MyInfo/></Col>
                        <Col md={8}><NavegacionFooter/></Col>
                        <Col md={8}><Newsletter/></Col>
                    </Row>

                    <Row className="footer__copyright">
                        <Col md={12}>2020 All Rights Reserved</Col>
                        <Col md={12}>Juan Camilo Camargo - Desarrollador Web</Col>
                    </Row>
                </Col>
                <Col md={4}/>
            </Row>
        </Footer>
    )
}
