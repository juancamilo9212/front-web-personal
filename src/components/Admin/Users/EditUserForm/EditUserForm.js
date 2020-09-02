import React,{useState,useCallback,useEffect} from 'react';
import {Avatar, Form, Input, Select, Button, Row, Col} from 'antd';
import {useDropzone} from 'react-dropzone';   
import "./EditUserForm.scss";
import NoAvatar from '../../../../assets/img/png/no-avatar.png';
import {UserOutlined, MailOutlined, LockOutlined} from '@ant-design/icons';

export default function EditUserForm(props){
   
const {user}=props;
const [avatar,setAvatar] = useState(null)
const [userData,setUserData]=useState({
    name:user.name,
    lastname:user.lastname,
    email:user.email,
    role:user.role,
    avatar:user.avatar
});

const updateUser = e=>{
e.preventDefault();
console.log(userData);
}

useEffect(() => {
    if(avatar){
        setUserData({...userData,avatar})
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [avatar])
//console.log(avatar);


   return(<div className="edit-user-form">
    <UploadAvatar avatar={avatar} setAvatar={setAvatar}/>
    <EditForm user={user} 
    userData={userData} 
    setUserData={setUserData}
    updateUser={updateUser}
    />
    </div>
    )
}

function UploadAvatar(props){
    const {avatar,setAvatar} = props;

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
            <Avatar size={150} src={avatar ? avatar.preview: NoAvatar}/>
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
                    defaultValue={userData.name}
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
                    defaultValue={userData.lastname}
                    onChange={e=>setUserData({...userData, lastname:e.target.value})}
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
                    defaultValue={userData.email}
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
                    defaultValue={userData.role}
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