import React,{useState,useCallback,useEffect} from 'react';
import {Avatar, Form, Input, Select, Button, Row, Col,notification, Result} from 'antd';
import {useDropzone} from 'react-dropzone';   
import "./EditUserForm.scss";
import NoAvatar from '../../../../assets/img/png/no-avatar.png';
import {UserOutlined, MailOutlined, LockOutlined} from '@ant-design/icons';
import {getAvatarApi,uploadAvatarApi,updateUserApi}from '../../../../api/user';
import {getAccessTokenApi} from '../../../../api/auth';

export default function EditUserForm(props){
   
const {user,setIsVisibleModal,setReloadUsers}=props;
const [avatar,setAvatar] = useState(null)
const [userData,setUserData]=useState({});


const updateUser = e=>{

e.preventDefault();
const token=getAccessTokenApi();
let userUpdate=userData;


if(userUpdate.password || userUpdate.repeatPassword){
    if(userUpdate.password !== userUpdate.repeatPassword){
        notification["error"]({
            message: "Las contraseñas deben ser iguales"
        });
        return;
    }else{
        delete userUpdate.repeatPassword;
    }
}

if(!userUpdate.name || !userUpdate.lastName || !userUpdate.email){
    notification["error"]({
        message: "El nombre, apellido y email son obligatorios"
    }); 
    return;
}

if(typeof userUpdate.avatar == "object"){
    uploadAvatarApi(token,userUpdate.avatar,user._id).then(response=>{
        userUpdate.avatar=response.avatarName;
        updateUserApi(token,userUpdate,user._id).then(result=>{
            notification["success"]({
            message: result.message
            });
            setIsVisibleModal(false);
            setReloadUsers(true);
            setUserData({
                password:null,
                repeatPassword:null,
            })
    });
});
}else{
    updateUserApi(token,userUpdate,user._id).then(result=>{
        notification["success"]({
        message: result.message
        });
    setIsVisibleModal(false);
    setReloadUsers(true);
    setUserData({
        password:null,
        repeatPassword:null,
    })
    });
}   
}

useEffect(() => {
    setUserData({
    name:user.name,
    lastName:user.lastName,
    email:user.email,
    role:user.role,
    avatar:user.avatar
    })
}, [user])


useEffect(() => {
    const token=getAccessTokenApi();
    if(user.avatar){
        getAvatarApi(token,user.avatar).then(response=>{
        setAvatar(response);
        });
    }else{
        setAvatar(null);
    }
}, [user])


useEffect(() => {
    if(avatar){
        setUserData({...userData,avatar:avatar.file})
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [avatar])



   return(
   <div className="edit-user-form">
    <UploadAvatar avatar={avatar} setAvatar={setAvatar}/>
    <EditForm  
    userData={userData} 
    setUserData={setUserData}
    updateUser={updateUser}
    />
    </div>
    )
}

function UploadAvatar(props){
    const {avatar,setAvatar} = props;
    const [avatarUrl,setAvatarUrl]=useState(null);

    useEffect(() => {
       if(avatar){
           if(avatar.preview){
               setAvatarUrl(avatar.preview);
           }else{
               setAvatarUrl(avatar);
           }
       }else{
        setAvatarUrl(null);
       }
    }, [avatar])


    const onDrop= useCallback(
        (acceptedFiles) => {
            const file =  acceptedFiles[0];
            setAvatar({file, preview: URL.createObjectURL(file)})
        },
        [setAvatar]
    );

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard:true,
        onDrop
    });

    return(
        <div className="upload-avatar" {...getRootProps()}>
            <input {...getInputProps()}/>
            {isDragActive ? (
            <Avatar size={150} src={NoAvatar}/>
            ): 
            <Avatar size={150} src={avatarUrl ? avatarUrl:NoAvatar}/>
            }
        </div>
    )
}

function EditForm(props){
    const {userData, setUserData, updateUser}=props;
    const {Option}=Select;
    const {Item}=Form;

    return(
        <Form className="form-edit" onSubmitCapture={updateUser}>
            <Row gutter={24}>
                <Col span={12}>
                    <Item>
                    <Input 
                    prefix={<UserOutlined/>}
                    placeholder="Nombre"
                    value={userData.name}
                    onChange={e=>setUserData({...userData, name:e.target.value})}
                    >
                    </Input>
                    </Item>
                </Col>
                <Col span={12}>
                <Item>
                    <Input 
                    prefix={<UserOutlined/>}
                    placeholder="Apellidos"
                    value={userData.lastName}
                    onChange={e=>setUserData({...userData, lastName:e.target.value})}
                    >
                    </Input>
                </Item>
                </Col>

            </Row>
            <Row gutter={24}>
                <Col span={12}>
                <Item>
                    <Input 
                    prefix={<MailOutlined />}
                    placeholder="Correo Electrónico"
                    value={userData.email}
                    onChange={e=>setUserData({...userData, email:e.target.value})}
                    >
                    </Input>
                    </Item>
                </Col>
                <Col span={12}>
                    <Item>
                    <Select
                    placeholder="Selecciona un rol"
                    onChange={e => setUserData({...userData, role: e})}
                    value={userData.role}
                    >
                        <Option value="admin">Administrador</Option>
                        <Option value="editor">Editor</Option>
                        <Option value="reviewer">Revisor</Option>
                    </Select>
                    </Item>
                </Col>
                
            </Row>

            <Row gutter={24}>
                <Col span={12}>
                <Item>
                    <Input
                    prefix={<LockOutlined />}
                    type="password"
                    placeholder="Contraseña"
                    value={userData.password}
                    onChange={e=>setUserData({...userData, password:e.target.value})}
                    />
                </Item>
                </Col>
                <Col span={12}>
                <Item>
                    <Input
                    prefix={<LockOutlined />}
                    type="password"
                    placeholder="Repetir Contraseña"
                    value={userData.repeatPassword}
                    onChange={e=>setUserData({...userData, repeatPassword:e.target.value})}
                    />
                </Item>
                </Col>
                
            </Row>

            <Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                    Actualizar Usuario
                </Button>
            </Item>
        </Form>
    )
}