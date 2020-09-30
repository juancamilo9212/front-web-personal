import React from 'react';
import './MainBanner.scss';
import {Row,Col} from 'antd'

export default function MainBanner(){
    return(
        <div className="main-banner">
            <div className="main-banner__dark"></div>
            <Row>
                <Col lg={4}/>
                <Col lg={16}>
                    <h2>Aprender nuevas <br/> tecnologías web y móvil</h2>
                    <h3>Através de cursos pràcticos, concisos y actualizados, creado por <br/> 
                    profesionales con años de experiencia
                    </h3>
                </Col>
                <Col lg={4}/>
                <Col lg={4}/>   
            </Row>
        </div>
    )
}