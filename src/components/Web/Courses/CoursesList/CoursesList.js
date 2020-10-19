import React,{useState,useEffect} from 'react';
import './CoursesList.scss';
import {Row, Col, Card, Button, Rate, notification} from 'antd';
import {getUdemyCoursesApi} from '../../../../api/courses'

export default function CoursesList(props) {
    const {courses}=props;
    
    
    return (
        <div className="courses-list">
            <Row>
                {courses.map(course => {
                    return(<Col key={courses._id} md={8} className="courses-list__course">
                        <Courses  course={course}/>
                    </Col>)
                })
                }
            </Row>
        </div>
    )
}

function Courses(props){
    const {course}=props;
    const [coursesInfo, setCoursesInfo] = useState({});
    const {Meta}=Card;
    const [courseUrl, setCourseUrl] = useState("");

    const createUrl= url =>{
        if(!course.link){
            const baseUrl=`https://www.udemy.com${url}`;
            const finalUrl=baseUrl + (course.coupon ? `?couponCode=${course.coupon}` : "");
            setCourseUrl(finalUrl);
        }else{
            setCourseUrl(course.link)
        }
    }

    useEffect(() => {
        getUdemyCoursesApi(course.idCourse).then(response => {
            if(response?.code !== 200){
                notification["warning"]({
                    message:response.message
                })
            }else{
                setCoursesInfo(response.data);
                createUrl(response.data.url);
            }
            
        }).catch(() => {
            notification["error"]({
                message:"Error en el servidor. Inténtelo mas tarde"
            })
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [course])

    return(
        <a href={courseUrl} target="_blank" rel="noopener noreferrer"> 
        <Card
        cover={<img src={coursesInfo.image_480x270} 
        alt={coursesInfo.title}/>}
        >
            <Meta
            title={coursesInfo.title}
            description={coursesInfo.headline}
            />
             <button>Entrar en el curso</button>

            <div className="courses-list__course-footer">
                <span>{course.price ? 
                `${course.price} US$`: coursesInfo.price}
                </span>
                <div>
                    <Rate disabled defaultValue={5}/>
                </div>
            </div>
        </Card>
        </a>
    )
}
