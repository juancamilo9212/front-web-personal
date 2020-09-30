import React, {useState, useEffect} from 'react';
import {Menu} from 'antd';
import {Link} from 'react-router-dom';
import logo from '../../../assets/img/png/logo.png';
import {getMenuApi} from '../../../api/menu';
import {getAccessTokenApi} from '../../../api/auth'
import './MenuTop.scss';
import SocialMedia from '../SocialMedia';


export default function MenuTop(){

    const {Item}=Menu;
    const [menuData, setmenuData] = useState([]);

    useEffect(() => {
        const token=getAccessTokenApi()
        getMenuApi(token).then(response =>{
            const menuArray=[];
            response.menu.forEach(item => {
                item.active && menuArray.push(item)
            });
            setmenuData(menuArray)
        });
    }, []);
    

    return(
        <Menu className="menu-top-web" mode="horizontal">
        <Item className="menu-top-web__logo">
            <Link to={"/"}><img src={logo} alt="juan camilo camargo"/></Link>
        </Item>
         {menuData.map(item =>{
             const externalUrl=item.url.indexOf("http") > -1 ? true: false;
             if(externalUrl){
                return(
                    <Item key={item._id} className="menu-top-web__item">
                        <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
                    </Item>
                    )
             }
             return(
                 <Item key={item._id} className="menu-top-web__item">
                     <Link to={item.url}>{item.title}</Link>
                 </Item>
             )
         })}
         <div><SocialMedia/></div>
        </Menu>
    )

}