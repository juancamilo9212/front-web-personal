import React from 'react';
import {Row, Col, Card} from 'antd';
import {ClockCircleOutlined,KeyOutlined,MessageOutlined,
    UserOutlined,DollarOutlined,CheckCircleOutlined} from '@ant-design/icons';
import './HowMyCoursesWork.scss';

export default function HowMyCoursesWork() {
    return (
        <Row className="how-my-courses-work">
            <Col lg={24} className="how-my-courses-work__title">
                <h2>¿Como funcionan mis cursos?</h2>
                <h3>Cada curso cuenta con contenido bajo la web de Udemy,
                activa las 24 horas los 365 días del año
                </h3>
            </Col>

            <Col lg={4}/>
            <Col lg={16}>
                <Row className="row-cards">

                    <Col md={8}>
                        <CardInfo 
                        icon={<ClockCircleOutlined style={{color:"#6ec1e4",fontSize:"45px",marginBottom:"20px"}}/>}
                        title="Cursos y Clases"
                        subtitle="Curso de entre 10 y 30 horas y cada clase del curso con duración máxima de 15 minutos."
                        />
                    </Col>

                    <Col md={8}>
                        <CardInfo 
                        icon={<KeyOutlined style={{color:"#6ec1e4",fontSize:"45px",marginBottom:"20px"}}/>}
                        title="Accesos 24/7"
                        subtitle="Accede a los cursos en cualquier momento, desde cualquier lugar sin importar día y hora"
                        />
                    </Col>

                    <Col md={8}>
                        <CardInfo 
                        icon={<MessageOutlined style={{color:"#6ec1e4",fontSize:"45px",marginBottom:"20px"}}/>}
                        title="Aprendizaje Colaborativo"
                        subtitle="Aprende de los demás, dejando tus dudas para que profesores y compañeros te ayuden a resolver"
                        />
                    </Col>

                    <Col md={8}>
                        <CardInfo 
                        icon={<UserOutlined style={{color:"#6ec1e4",fontSize:"45px",marginBottom:"20px"}}/>}
                        title="Mejora tu perfil"
                        subtitle="Aprende y mejora tu perfil aprendiendo las tecnologìas de punta"
                        />
                    </Col>

                    <Col md={8}>
                        <CardInfo 
                        icon={<DollarOutlined style={{color:"#6ec1e4",fontSize:"45px",marginBottom:"20px"}}/>}
                        title="Precios bajos"
                        subtitle="Obtén el curso que quieres por solo 9.99 y ten acceso a el por tiempo ilimitado y soporte ilimitado"
                        />
                    </Col>

                    <Col md={8}>
                        <CardInfo 
                        icon={<CheckCircleOutlined style={{color:"#6ec1e4",fontSize:"45px",marginBottom:"20px"}}/>}
                        title="Certificados de finalización"
                        subtitle="Al completar un curso recibirás un certificado que te expedirá Udemy"
                        />
                    </Col>


                </Row>
            </Col>
            <Col lg={4}/>
        </Row>
    )
}

function CardInfo(props){
const {icon, title, subtitle}=props;
const {Meta}=Card;
return(
    <Card className="how-my-courses-work__card">
        {icon}
        <Meta title={title} description={subtitle}>
        </Meta>
    </Card>
)
}

/*font-size: 45px;
            margin-bottom: 20px;
            color: $primary-color-light;*/


