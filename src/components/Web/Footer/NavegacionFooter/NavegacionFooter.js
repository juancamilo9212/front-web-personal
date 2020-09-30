import React from 'react';
import {Row, Col} from 'antd';
import './NavegacionFooter.scss';
import {BookOutlined,CodeOutlined,
    DatabaseOutlined,ArrowRightOutlined,
    HddOutlined,AppstoreOutlined,UserOutlined,
} from '@ant-design/icons';


export default function NavegacionFooter() {
    return (
        <Row className="navegacion-footer">
            <Col><h3>Navegación</h3></Col>
            <Row>
            <Col md={12}><RenderLeftList/></Col>
            <Col md={12}><RenderRightList/></Col>
            </Row>
            
        </Row>
    )
}

function RenderLeftList(){
    return(
        <ul>
            <li>
            <a href="#"><BookOutlined style={{padding:"5px"}}/>Cursos Online</a>
            </li>

            <li>
            <a href="#"><CodeOutlined style={{padding:"5px"}}/>Desarrollo Web</a>
            </li>

            <li>
            <a href="#"><DatabaseOutlined style={{padding:"5px"}}/>Base de datos</a>
            </li>

            <li>
            <a href="#"><ArrowRightOutlined style={{padding:"5px"}}/>Política de privacidad</a>
            </li>

        </ul>
    )
}

function RenderRightList(){
    return(
        <ul>
            <li>
            <a href="#"><HddOutlined style={{padding:"5px"}}/>Servidores</a>
            </li>

            <li>
            <a href="#"><AppstoreOutlined style={{padding:"5px"}}/>CMS</a>
            </li>

            <li>
            <a href="#"><UserOutlined style={{padding:"5px"}}/>Portfolio</a>
            </li>

            <li>
            <a href="#"><ArrowRightOutlined style={{padding:"5px"}}/>Política de Cookies</a>
            </li>

        </ul>
    )
}
