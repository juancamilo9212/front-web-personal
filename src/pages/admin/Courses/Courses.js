import React,{useState,useEffect} from 'react';
import {getCoursesApi} from '../../../api/courses';
import CoursesList from '../../../components/Admin/CoursesList';

export default function Courses() {
    const [courses, setCourses] = useState([]);
    const [reloadCourses, setReloadCourses] = useState(false);

    useEffect(() => {
        getCoursesApi().then(response => {
        console.log(response)
        setCourses(response.courses)
        })
        setReloadCourses(false);
    }, [reloadCourses])

    return (
        <div className="courses">
            <CoursesList 
            courses={courses} 
            setReloadCourses={setReloadCourses}
            />
        </div>
    )
}
