import React,{useState} from 'react';
import './Newsletter.scss';
import {Form, Input, Button, notification} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {suscribeEmail} from '../../../api/newsletter'

export default function Newsletter() {

    const {Item}=Form;
    const [email, setEmail] = useState({email:""});

    const onSubmit = () =>{
        const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        const userEmail=email.email;
        const isEmailValid=emailValid.test(userEmail);

        if(!isEmailValid){
            notification["error"]({
                message:"El correo ingresado no es válido"
            });
        }else{
            suscribeEmail(userEmail).then(response =>{
                if(response.code !== 200){
                    notification["warning"]({
                        message:"El correo ingresado ya existe"
                    });
                }else{
                    notification["success"]({
                        message:response.message
                    });
                }
        })
    }}

    return (
        <div className="newsletter">
          <h3>Newsletter</h3>  
          <Form onSubmitCapture={onSubmit}>
            <Item>
                <Input 
                prefix={<UserOutlined style={{color:"rgba(0,0,0,0.25)",fontSize:"20px"}}/>}
                placeholder="Correo electrónico"
                value={email.email}
                onChange={e=>setEmail({...email, email:e.target.value})}
                />
            </Item>

            <Item>
                <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                >Suscripción</Button>
            </Item>
          </Form>
        </div>
    )
}
