import React from 'react';
import {Row, Col, Card, Button} from 'antd';
import {Link} from 'react-router-dom';
import reactJShooks from '../../../assets/img/jpg/react-js-hooks.jpg';
import reactNative from '../../../assets/img/jpg/react-native.jpg';
import cssGrid from '../../../assets/img/jpg/css-grid.jpg';
import prestaShop from '../../../assets/img/jpg/prestashop-1-7.jpg';
import wordpress from '../../../assets/img/jpg/wordpress.jpg';
import javascriptES6 from '../../../assets/img/jpg/javascript-es6.jpg';
import './HomeCourses.scss';



export default function HomeCourses() {
    return (
        
        <Row className="home-courses">
            <Col lg={24} className="home-courses__title">
                <h2>Aprende y mejora tus habilidades</h2>
            </Col>
            <Col lg={4}/>
            <Col lg={16}>
            <Row className="row-courses">
                <Col md={6}><CourseCard
                image={reactJShooks}
                title="React JS Hooks"
                subtitle="Intermedio-React/Javascript"
                link="https://courses.agustinnavarrogaldon.com/react"
                />
                </Col>


                <Col md={6}><CourseCard
                image={reactNative}
                title="React Native Expo"
                subtitle="Intermedio-React/Javascript"
                link="https://courses.agustinnavarrogaldon.com/react-native-expo"
                />
                </Col>
                
                <Col md={6}><CourseCard
                image={javascriptES6}
                title="Javascript ES6"
                subtitle="Basico-Javascript"
                link="https://courses.agustinnavarrogaldon.com/javascript"
                />
                </Col>

            
                <Col md={6}><CourseCard
                image={wordpress}
                title="Wordpress"
                subtitle="Basico- Wordpress"
                link="https://courses.agustinnavarrogaldon.com/wordpress"
                />
                </Col>
            </Row>

            <Row className="row-courses">

                <Col md={6}><CourseCard
                image={prestaShop}
                title="Prestashop 1.7"
                subtitle="Basico-PrestaShop"
                link="https://courses.agustinnavarrogaldon.com/prestashop"
                />
                </Col>

                <Col md={6}/>
                <Col md={6}/>

                <Col md={6}><CourseCard
                image={cssGrid}
                title="CSS Grid"
                subtitle="intermedio-CSS"
                link="https://courses.agustinnavarrogaldon.com/css-grid"
                />
                </Col>
            </Row>
            </Col>
            <Col lg={4}/>
            <Col lg={24} className="home-courses__more">
                <Link to="/courses">
                    <Button>Ver más</Button>
                </Link>
            </Col>
        </Row>
    )
}

function CourseCard(props){
    const {image, title, subtitle,link}=props;
    const {Meta}=Card;

    return(
        <a href={link} 
        target="_blank" 
        rel="noopener noreferrer"
        >
        <Card
        className="home-courses__card"
        cover={<img src={image} alt={title}/>}
        actions={[<Button>INGRESAR</Button>]}
        >
        <Meta title={title} description={subtitle}/>
        </Card>    
        </a>
    )
}
