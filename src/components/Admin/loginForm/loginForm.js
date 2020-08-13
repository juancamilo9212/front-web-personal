import React from 'react';
import {Form, Input, Button, notification} from 'antd';
import { UserOutlined,LockOutlined } from '@ant-design/icons';
import "./loginForm.scss";

export default function loginForm(){

    const {Item}=Form;
    return (
        <Form className="login-form">
        <Item>
            <Input
            prefix={<UserOutlined type="user" style={{color:"rgba(0,0,0,.25)"}}/>}
            type="email"
            name="email"
            placeholder="Correo electrónico"
            className="login-form__input"
            /> 
        </Item>
        <Item>
            <Input
            prefix={<LockOutlined type="lock" style={{color:"rgba(0,0,0,.25)"}}/>}
            type="password"
            name="password"
            placeholder="Contraseña"
            className="login-form__input"
            />
        </Item>
        <Item>
            <Button htmlType="submit" className="login-form__button">
                Entrar
            </Button>
        </Item>
        </Form>
    )
}