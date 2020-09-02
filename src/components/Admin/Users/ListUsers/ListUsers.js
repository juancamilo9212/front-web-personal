import React, {useState} from 'react';
import {Switch, List, Avatar, Button} from 'antd';
import {EditOutlined,StopOutlined,DeleteOutlined,CheckOutlined} from '@ant-design/icons';
import noAvatar from '../../../../assets/img/png/no-avatar.png';
import Modal from '../../../../components/Admin/Modal/modal';
import EditUserForm from '../EditUserForm';
import './ListUsers.scss';

export default function ListUsers(props){
    const {usersActive, usersInactive}=props;
    const [viewUserActive,setViewUserActive]=useState(true)
    const [isVisibleModal,setIsVisibleModal]=useState(false)
    const [modalTitle,setModalTitle]=useState("")
    const [modalContent,setModalContent]=useState(null)
    
    return(
        <div className="list-users">
            <div className="list-users__switch">
            <Switch 
            defaultChecked
            onChange={() => setViewUserActive(!viewUserActive)}
            />
            <span>
                {viewUserActive ? "Usuarios Activos":"Usuarios Inactivos"}
            </span>
            </div>
            {viewUserActive ? 
            <UserActive 
            usersActive={usersActive} 
            setIsVisibleModal={setIsVisibleModal}
            setModalTitle={setModalTitle}
            setModalContent={setModalContent}
            />:
            <UserInactive 
            usersInactive={usersInactive}
            />}

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


function UserActive(props){
    const {usersActive,setIsVisibleModal,setModalTitle,setModalContent}=props;

    const editUser= user =>{
        setIsVisibleModal(true)
        setModalTitle(`Editar ${user.name ? user.name:'...'} ${user.lastname ? user.lastname:'...'}`);
        setModalContent(<EditUserForm user={user}/>)
    }

    return (
        <List
        className="users-active"
        itemLayout="horizontal"
        dataSource={usersActive}
        renderItem={user => (
        <List.Item
        actions={[
            <Button
            type="primary"
            onClick={() => editUser(user)}
            >
            <EditOutlined />
            </Button>,
            <Button
            type="danger"
            onClick={() => console.log("Desactivar usuario")}
            >
            <StopOutlined />
            </Button>,
            <Button
            type="danger"
            onClick={() => console.log("Eliminar usuario")}
            >
            <DeleteOutlined />
            </Button>
        ]}
        >
        <List.Item.Meta
        avatar={<Avatar src={user.avatar ? user.avatar: noAvatar}/>}
        title={`${user.name ? user.name:'...'}` }
        description={`${user.lastname ? user.lastname:'...'}`}
        /> 
        </List.Item>
        )}
        />
    )
}

function UserInactive(props){
    const {usersInactive}=props;
    return (
        <List
        className="users-active"
        itemLayout="horizontal"
        dataSource={usersInactive}
        renderItem={user => (
        <List.Item
        actions={[
            <Button
            type="check"
            onClick={() => console.log("Activar usuario")}
            >
            <CheckOutlined />
            </Button>,
            <Button
            type="danger"
            onClick={() => console.log("Eliminar usuario")}
            >
            <DeleteOutlined />
            </Button>
        ]}
        >
        <List.Item.Meta
        avatar={<Avatar src={user.avatar ? user.avatar: noAvatar}/>}
        title={`${user.name ? user.name:'...'}` }
        description={`${user.lastname ? user.lastname:'...'}`}
        /> 
        </List.Item>
        )}
        />
    )
}



        
    

