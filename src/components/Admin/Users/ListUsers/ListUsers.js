import React, {useState,useEffect} from 'react';
import {Switch, List, Avatar, Button,notification,Modal as ModalAntd} from 'antd';
import {EditOutlined,StopOutlined,DeleteOutlined,CheckOutlined} from '@ant-design/icons';
import noAvatar from '../../../../assets/img/png/no-avatar.png';
import Modal from '../../../../components/Admin/Modal/modal';
import EditUserForm from '../EditUserForm';
import './ListUsers.scss';
import {getAvatarApi,activateUserApi,deleteUserApi} from '../../../../api/user';
import {getAccessTokenApi} from '../../../../api/auth';
import AddUserForm from '../AddUserForm';


const {confirm}=ModalAntd;


export default function ListUsers(props){
    const {usersActive, usersInactive,setReloadUsers}=props;
    const [viewUserActive,setViewUserActive]=useState(true)
    const [isVisibleModal,setIsVisibleModal]=useState(false)
    const [modalTitle,setModalTitle]=useState("")
    const [modalContent,setModalContent]=useState(null)

    const addModalUser= () =>{

        setIsVisibleModal(true);
        setModalTitle("Creando nuevo usuario");
        setModalContent(
            <AddUserForm 
            setIsVisibleModal={setIsVisibleModal} 
            setReloadUsers={setReloadUsers}/>
        );
    }
    
    const deleteUser= (token,user) =>{

        confirm({
            title:"Eliminando usuario",
            content:`¿Estás seguro que quiere eliminar a ${user.email}?`,
            okText:"Eliminar",
            okType:"danger",
            cancelText:"Cancelar",
            onOk(){
                deleteUserApi(token,user._id).then(result =>{
                    notification["success"]({
                        message:result
                    }) ;
                    setReloadUsers(true);  
                   }).catch(err =>{
                       notification["error"]({
                           message: err
                       });
                   });
            }
        })

        
    }

    const activateUser= (token,user,status) =>{ 
        activateUserApi(token,user._id,status).then(response => {
            notification["success"]({
                message:response
            });
            setReloadUsers(true);
        }).catch(err => {
            notification["error"]({
            message:err
            });
        });
        }

    
    return(
        <div className="list-users">

            <div className="list-users__header">

            <div className="list-users__header-switch">
            <Switch 
            defaultChecked
            onChange={() => setViewUserActive(!viewUserActive)}
            />
            <span>
                {viewUserActive ? "Usuarios Activos":"Usuarios Inactivos"}
            </span>
            </div>
            <Button type="primary" 
            onClick={addModalUser}
            >
                Nuevo Usuario
            </Button>
            </div>
            
            {viewUserActive ? 
            <UserActive 
            usersActive={usersActive} 
            setIsVisibleModal={setIsVisibleModal}
            setModalTitle={setModalTitle}
            setModalContent={setModalContent}
            setReloadUsers={setReloadUsers}
            deleteUser={deleteUser}
            activateUser={activateUser}
            />:
            <UserInactive 
            usersInactive={usersInactive}
            deleteUser={deleteUser}
            activateUser={activateUser}
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
    const {usersActive,
        setIsVisibleModal,
        setModalTitle,
        setModalContent,
        setReloadUsers,
        deleteUser,
        activateUser}=props;

    const editUser= user =>{
        setIsVisibleModal(true)
        setModalTitle(`Editar ${user.name ? user.name:'...'} ${user.lastName ? user.lastName:'...'}`);
        setModalContent(<EditUserForm 
            user={user} 
            setIsVisibleModal={setIsVisibleModal} 
            setReloadUsers={setReloadUsers}
            activateUser={activateUser}
            />)
    }

    return (
        <List
        className="users-active"
        itemLayout="horizontal"
        dataSource={usersActive}
        renderItem={user => (<ActiveUser 
            user={user} 
            editUser={editUser} 
            activateUser={activateUser}
            deleteUser={deleteUser}
            />)}
        />
    )
}

function ActiveUser(props){
const {user,editUser,activateUser,deleteUser}=props;
const [avatar,setAvatar]=useState(null);
const token=getAccessTokenApi()

useEffect(() => {
   if(user.avatar){
       getAvatarApi(token,user.avatar).then(response=>{
       setAvatar(response);
       })
   }else{
       setAvatar(null);
   }
}, [user,token])


return(
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
            onClick={() => activateUser(token,user,false)}
            >
            <StopOutlined />
            </Button>,
            <Button
            type="danger"
            onClick={() => deleteUser(token,user)}
            >
            <DeleteOutlined />
            </Button>
        ]}
        >
        <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar: noAvatar}/>}
        title={`${user.name ? `${user.name} ${user.lastName}`:'...'}` }
        description={`${user.email ? user.email:'...'}`}
        /> 
        </List.Item>
)
}

function UserInactive(props){
    const {usersInactive,activateUser,deleteUser}=props;
    return (
        <List
        className="users-active"
        itemLayout="horizontal"
        dataSource={usersInactive}
        renderItem={user => (<InactiveUser 
            user={user} 
            activateUser={activateUser}
            deleteUser={deleteUser}
            />)}
        />
    )
}

function InactiveUser(props){
    const {user,activateUser,deleteUser}=props;
    const [avatar,setAvatar]=useState(null);
    const token=getAccessTokenApi()
    
    useEffect(() => {
       if(user.avatar){
           getAvatarApi(token,user.avatar).then(response=>{
           setAvatar(response);
           })
       }else{
           setAvatar(null);
       }
    }, [user,token]) 

    return(
    <List.Item
        actions={[
            <Button
            type="check"
            onClick={() => activateUser(token,user,true)}
            >
            <CheckOutlined />
            </Button>,
            <Button
            type="danger"
            onClick={() => deleteUser(token,user)}
            >
            <DeleteOutlined />
            </Button>
        ]}
        >
        <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar: noAvatar}/>}
        title={`${user.name ? user.name:'...'}` }
        description={`${user.lastName ? user.lastName:'...'}`}
        /> 
        </List.Item>
    )
}



        
    

