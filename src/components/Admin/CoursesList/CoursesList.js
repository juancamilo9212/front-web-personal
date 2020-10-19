import React, {useState, useEffect}from 'react';
import {getUdemyCoursesApi,deleteCourseApi} from '../../../api/courses';
import {List, Button, Modal as ModalAntd, notification} from 'antd';
import Modal from '../Modal';
import DragSortableList from 'react-drag-sortable';
import './CoursesList.scss';
import {EditOutlined,DeleteOutlined} from '@ant-design/icons';
import {getAccessTokenApi} from '../../../api/auth' ;
import AddCourseForm from '../AddCourseForm';
import {updateCourseApi} from '../../../api/courses'



const {confirm}=ModalAntd;


export default function CoursesList(props) {
    const {courses,setReloadCourses}=props;
    const [listCourses, setListCourses] = useState([]);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle]=useState("");
    const [modalContent, setModalContent]=useState(null);

    const onSort = (sortedList,dropEvent) =>{
        const token = getAccessTokenApi();
        sortedList.forEach(item => {
            const {_id}=item.content.props.course;
            const order=item.rank;
            const body={order:order}
            updateCourseApi(token,_id,body);
        })
        
    }

    const addCourseModal = () => {
        setIsVisibleModal(true);
        setModalTitle("Creando un nuevo curso")
        setModalContent(
            <div>
                 <AddCourseForm 
                 setIsVisibleModal={setIsVisibleModal}
                 setReloadCourses={setReloadCourses}
                 />
            </div>
        )
    }

    const editCourseModal = course => {
        setIsVisibleModal(true);
        setModalTitle("Actualizando el curso");
        setModalContent(
            <div>
                <AddCourseForm
                setIsVisibleModal={setIsVisibleModal}
                setReloadCourses={setReloadCourses}
                course={course}
                />
            </div>
        )
    }

    const deleteCourse = (courses) => {
        
        const token = getAccessTokenApi()
        confirm({
            title: "Eliminando curso",
            content: `¿Estás seguro que quieres eliminar el curso ${courses.idCourse}?`,
            okText: "Eliminar",
            okType:"danger",
            cancelText: "Cancelar",
            onOk(){
                deleteCourseApi(token,courses._id).then(response => {
                    notification["success"]({
                        message:response.message
                    })
                    setReloadCourses(true);
                }).catch(() => {
                    notification["error"]({
                        message:"Error del servidor. Intente mas tarde"
                    });
                })
            }
        })
        
    }

    useEffect(() => {
        const listCoursesArray=[];
        courses.forEach(course => {
            listCoursesArray.push({
                content:(
                    <Course
                    course={course}
                    deleteCourse={deleteCourse}
                    editCourseModal={editCourseModal}
                    />
                )
            })
        })
        setListCourses(listCoursesArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [courses])

    return (
        <div className="courses-list">
            <div className="courses-list__header">
                <Button type="primary" onClick={addCourseModal}>
                    Nuevo Curso
                </Button>
            </div>

            <div className="courses-list__items">
                {listCourses.length ===0 && (
                    <h2 style={{textAlign:"center",margin:0}}>
                        No tienes cursos creados
                    </h2>
                )}
                <DragSortableList items={listCourses} onSort={onSort} type="vertical"/>
            </div>  
            <Modal
            title={modalTitle}
            isVisible={isVisibleModal}
            setIsVisible={setIsVisibleModal}
            >
            {modalContent}
            </Modal>
        </div>
    )
}

function Course(props){
    const {course,deleteCourse,editCourseModal}=props;
    const [courseData, setCourseData] = useState(null)
    const {Item}=List;
    const {Meta}=Item;

    useEffect(() => {
        getUdemyCoursesApi(course.idCourse).then(response => {
            if(response.code !== 200){
                notification["warning"]({
                    message: `El curso con el id ${course.idCourse} no se ha encontrado`
                })
            }
            setCourseData(response.data);
        })
    }, [course])

    if(!courseData){
        return null;
    }
    return (
        <Item 
        actions={[
            <Button type="primary" 
            onClick={() => editCourseModal(course)}
            >
            <EditOutlined />
            </Button>,
            <Button type="danger" 
            onClick={() => deleteCourse(course)}
            >
            <DeleteOutlined/>
            </Button>
        ]}
        >
        <img src={courseData.image_480x270} 
        alt={courseData.title}
        style={{width:"100px",marginRight:"20px"}}
        />
        <Meta 
        title={`${courseData.title} | ID: ${course.idCourse}`}
        description={courseData.headline}
        />
        </Item>
    )

}

