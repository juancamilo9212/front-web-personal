import React , {useState,useEffect} from 'react';
import {getAccessTokenApi} from '../../../api/auth';
import {addCourseApi,updateCourseApi} from '../../../api/courses';
import {Row, Col, Form, Input, Button, notification} from 'antd';
import {KeyOutlined,GiftOutlined,DollarOutlined, LinkOutlined} from '@ant-design/icons';
import './AddCourseForm.scss';

export default function AddCourseForm(props) {
    const {setIsVisibleModal, setReloadCourses, course} = props;
    const [courseData, setCourseData]=useState({});
    
    useEffect(() => {
        course ? setCourseData(course):setCourseData({});
    }, [course])

    const updateCourse = () => {
        
        const token= getAccessTokenApi();
        updateCourseApi(token,course._id,courseData).then(response =>{
                notification["success"]({
                    message:response.message
                })
                setIsVisibleModal(false);
                setReloadCourses(true);
            }).catch(err => {
                notification["error"]({
                    message:err
                })
        })

    }

    const addCourse = () =>{
        
        const token = getAccessTokenApi();
        if(!courseData.idCourse){
            notification["error"]({
                message:"El ID del curso es un campo obligatorio"
            })
        }else{
            addCourseApi(token,courseData).then(response => {
                const typeNotification=response.code === 200 ? "success":"warning";
                notification[typeNotification]({
                    message:response.message
                })
                setIsVisibleModal(false);
                setReloadCourses(true);
                setCourseData({});
            }).catch(err => {
                notification["error"]({
                    message:err
                })
            })
        }
    }

    return (
        <div className="add-edit-course-form">
            <AddEditForm 
            course={course}
            courseData={courseData}
            setCourseData={setCourseData}
            addCourse={addCourse}
            updateCourse={updateCourse}
            />
        </div>
    )
}

function AddEditForm(props){

    const {course,courseData,setCourseData, addCourse, updateCourse}= props;
    const {Item}=Form;
    return (
    <Form className="form-add-edit" onSubmitCapture={course ? updateCourse:addCourse}>
        <Item>
            <Input prefix={<KeyOutlined/>} 
            placeholder="Id del curso"
            value={courseData.idCourse}
            onChange={e => setCourseData({...courseData,idCourse:e.target.value})}
            disabled={course ? true:false}
            />
        </Item>

        <Item>
            <Input prefix={<GiftOutlined />} 
            placeholder="Cupon de descuento"
            value={courseData.coupon}
            onChange={e => setCourseData({...courseData,coupon:e.target.value})}
            />
        </Item>

        <Item>
            <Input prefix={<DollarOutlined />} 
            placeholder="Precio de curso"
            value={courseData.price}
            onChange={e => setCourseData({...courseData,price:e.target.value})}
            />
        </Item>

        <Item>
            <Input prefix={<LinkOutlined />} 
            placeholder="URL"
            value={courseData.link}
            onChange={e => setCourseData({...courseData,link:e.target.value})}
            />
        </Item>

        <Item>
            <Button type="primary" htmlType="submit" className="btn-submit">
                {course ? "Actualizar curso":"Crear curso"}
            </Button>
        </Item>
    </Form>
    )

}
