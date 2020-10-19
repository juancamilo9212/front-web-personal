import React from 'react';
import MainBanner from '../../components/Web/MainBanner';
import HomeCourses from '../../components/Web/HomeCourses';
import HowMyCoursesWork from '../../components/Web/HowMyCoursesWork';
import ReviewCourses from '../../components/Web/ReviewCourses';
import {Helmet} from 'react-helmet';


export default function Home(){
    return(
        <>
            <Helmet>
            <title>Home | Juan Camilo Camargo</title>
            <meta 
            name="description" 
            content="Home | Web de programación"
            data-react-helmet="true"
            />
            </Helmet>
            <MainBanner/>
            <HomeCourses/>
            <HowMyCoursesWork/>
            <ReviewCourses/>
        </>
    )
}