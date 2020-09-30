import React from 'react';
import './MyInfo.scss';
import logo from '../../../../assets/img/png/logo.png';
import SocialMedia from '../../SocialMedia';

export default function MyInfo() {
    return (
        <div className="my-info">
            <img src={logo} alt="Juan Camilo"/>
            <h4>Entra en el mundo del desarrollo web, difruta creando proyectos de 
                todo tipo, deja que tu imaginación fluya y crea verdaderas maravillas
            </h4>
            <SocialMedia/>
        </div>
    )
}
