import React from 'react';
import './PresentationCourses.scss';
import academyLogo from '../../../../assets/img/png/academy-logo.png';

export default function PresentationCourses() {
    return (
        <div className="presentation-courses">
            <img src={academyLogo} alt="Cursos"/>
            <p>
                En este sitio vas a encontrar los mejores cursos online 
                de desarrollo web en español. Únete a nosotros y empieza 
                tu camino como desarrollador web.
            </p>
            <p>Échale un vistazo y aprovecha las ofertas!!!</p>
        </div>
    )
}
