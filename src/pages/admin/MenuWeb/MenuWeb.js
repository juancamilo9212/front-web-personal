import React, {useState,useEffect} from 'react';
import {getMenuApi} from '../../../api/menu' ;
import {getAccessTokenApi} from '../../../api/auth';
import MenuWebList from '../../../components/Admin/MenuWeb/MenuWebList';

export default function MenuWeb(){

const [menu,setMenu]=useState([]);
const [reloadMenuWeb, setReloadMenuWeb]=useState(false);


useEffect(() => {
    const token=getAccessTokenApi();
    getMenuApi(token).then(response => {
        setMenu(response.menu);
    })
    setReloadMenuWeb(false)
}, [reloadMenuWeb])

    return (
    <div className="menu-web">
        <MenuWebList menu={menu} setReloadMenuWeb={setReloadMenuWeb}/>
    </div>
)
}