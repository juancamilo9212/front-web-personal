import './ReviewCourses.scss';
import {Row, Col, Card, Avatar} from 'antd';
import avatarMale from '../../../assets/img/jpg/avatarHombre.jpg';
import avatarFemale from '../../../assets/img/jpg/avatarMujer.jpg';
import React from 'react'

export default function ReviewCourses() {
    return (
       <Row className="review-courses">
           <Row>
               <Col lg={4}/>
                <Col lg={16} className="review-courses__title">
                    <h2>Forma parte de los + de 35 mil estudiantes 
                        que están aprendiendo en mis cursos
                    </h2>
                </Col>
               <Col lg={4}/>
           </Row>

           <Row>
           <Col lg={4}/>
           <Col lg={16}>
               <Row className="row-cards">
                    <Col md={8}>
                        <CardReview
                        name="Alonso Campos"
                        subtitle="Alumno de Udemy"
                        avatar={avatarMale}
                        review="Un curso excelente, el profesor explica detalladamente como funciona react "
                        />
                    </Col>

                    <Col md={8}>
                        <CardReview
                        name="Maria Paz"
                        subtitle="Alumna de Udemy"
                        avatar={avatarFemale}
                        review="Si te gustan los cursos que profundizan en los temas, este te va a encantar "
                        />
                    </Col>

                    <Col md={8}>
                        <CardReview
                        name="Valentina Rubio"
                        subtitle="Alumna de Udemy"
                        avatar={avatarFemale}
                        review="Es un curso muy completo, las explicaciones son muy claras y gracias al apoyo de la comunidad he resuelto las inquietudes que me han surgido"
                        />
                    </Col>

               </Row>

               <Row className="row-cards">
                    <Col md={8}>
                        <CardReview
                        name="Alberto Contreras"
                        subtitle="Alumno de Udemy"
                        avatar={avatarMale}
                        review="Me gusto mucho el curso, el resultado final fue una pagina web muy bonita y que me sirve de base para futuros proyectos "
                        />
                    </Col>

                    <Col md={8}>
                        <CardReview
                        name="Luisa Charry"
                        subtitle="Alumna de Udemy"
                        avatar={avatarFemale}
                        review="Fue un curso supremamente entretenido, me encantó el contenido y creo que voy a empezar el curso de React Native para aprender desarrollo móvil también"
                        />
                    </Col>

                    <Col md={8}>
                        <CardReview
                        name="Silvana Camargo"
                        subtitle="Alumna de Udemy"
                        avatar={avatarFemale}
                        review="Nunca había aprendido tanto en mi vida, ahora tengo las bases suficientes para conseguir mi primer trabajo como programador web, este curso ha sido muy importante para mi futuro"
                        />
                    </Col>

               </Row>

           </Col>
           <Col lg={4}/>
           </Row>
       </Row>
    )
}

function CardReview(props){
    const {name, subtitle, avatar, review}=props;
    const {Meta}= Card;
    return(
        <Card className="review-courses__card">
            <p>{review}</p>
            <Meta 
            avatar={<Avatar src={avatar}/>}
            title={name}
            description={subtitle}
            />
        </Card>
    )
}
