import React, {useState} from 'react';
import {Form, Input, Select, Button, Row, Col, notification} from 'antd';
import {UserOutlined, MailOutlined, LockOutlined} from '@ant-design/icons';
import {createUserApi} from '../../../../api/user';
import {getAccessTokenApi} from '../../../../api/auth';
import './AddUserForm.scss';

export default function AddUserForm(props){

    const {setIsVisibleModal, setReloadUsers} = props;
    const [userData, setUserData]= useState({})
    
    const addUser= e =>{
        e.preventDefault();
        if(!userData.name ||
            !userData.lastName ||
            !userData.email ||
            !userData.role ||
            !userData.password ||
            !userData.repeatPassword
            ){
                notification["error"]({
                    message: "Todos los campos son obligatorios"
                });
            }else if(userData.password !== userData.repeatPassword){
                notification["error"]({
                    message: "Las contraseñas deben ser iguales"
                });
            }else{
                const token=getAccessTokenApi();
                createUserApi(token,userData).then(result => {
                    notification["success"]({
                        message: result
                    })
                    setReloadUsers(true)
                    setIsVisibleModal(false)
                }).catch(err =>{
                    notification["error"]({
                    message: err.message 
                    })
                })
            }
        
    }

    return (
    <div className="add-user-form">
        <AddForm 
        userData={userData}
        setUserData={setUserData}
        addUser={addUser}
        />
    </div>
    )
}

function AddForm(props){
    const {userData,setUserData,addUser}=props;
    const {Option}=Select;
    const {Item}=Form;

    return(
        <Form className="form-add" onSubmitCapture={addUser}>
            <Row gutter={24}>
                <Col span={12}>
                    <Item>
                        <Input 
                        prefix={<UserOutlined/>}
                        placeholder="Nombre"
                        value={userData.name}
                        onChange={e => setUserData({...userData, name: e.target.value})}
                        />
                    </Item>
                </Col>

                <Col span={12}>
                    <Item>
                        <Input 
                        prefix={<UserOutlined/>}
                        placeholder="Apellido"
                        value={userData.lastName}
                        onChange={e => setUserData({...userData, lastName: e.target.value})}
                        />
                    </Item>
                </Col>

                <Col span={12}>
                    <Item>
                        <Input 
                        prefix={<MailOutlined/>}
                        placeholder="Correo electrónico"
                        value={userData.email}
                        onChange={e => setUserData({...userData, email: e.target.value})}
                        />
                    </Item>
                </Col>

                <Col span={12}>
                    <Item>
                        <Select 
                        placeholder="Selecciona un rol"
                        value={userData.role}
                        onChange={e => setUserData({...userData, role: e})}
                        >
                        <Option value="admin">Administrador</Option>
                        <Option value="editor">Editor</Option>
                        <Option value="reviewer">Revisor</Option>
                        </Select> 
                        
                    </Item>
                </Col>

                <Col span={12}>
                    <Item>
                        <Input 
                        prefix={<LockOutlined/>}
                        type="password"
                        placeholder="Contraseña"
                        value={userData.password}
                        onChange={e => setUserData({...userData, password: e.target.value})}
                        />
                    </Item>
                </Col>

                <Col span={12}>
                    <Item>
                        <Input 
                        prefix={<LockOutlined/>}
                        type="password"
                        placeholder="Repetir Contraseña"
                        value={userData.repeatPassword}
                        onChange={e => setUserData({...userData, repeatPassword: e.target.value})}
                        />
                    </Item>
                </Col>

            </Row>

            <Item>
                <Button 
                type="primary"
                htmlType="submit"
                className="btn-submit"
                >Crear usuario</Button>
            </Item>

        </Form>
    )
}