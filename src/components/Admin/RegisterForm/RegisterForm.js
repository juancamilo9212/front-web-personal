import React , {useState}from 'react';
import './RegisterForm.scss';
import {Form,Input,Button,Checkbox,notification} from 'antd';
import {UserOutlined,LockOutlined} from '@ant-design/icons';
import {emailValidation,minLengthValidation} from '../../../utils/formValidaton';
import {signUpApi} from '../../../api/user';

export default function RegisterForm(){

  const {Item} = Form;

 const [input,setInput]=useState({
   email:"",
   password:"",
   repeatPassword:"",
   privacyPolicy:false
 });

 const [formValid,setFormValid]=useState({
   email:false,
   password:false,
   repeatPassword:false,
   privacyPolicy:false
 });

 const changeForm = e =>{
   if(e.target.name === "privacyPolicy"){
     setInput({
       ...input,
       [e.target.name]: e.target.checked
     })
     
   }else{
     setInput({
       ...input,
       [e.target.name]: e.target.value
     })
     
   }
 }

const inputValidation = e =>{
  const {type, name} = e.target;
  if(type==="email"){
    setFormValid({...formValid,[name]: emailValidation(e.target)})
  }

  if(type==="password"){
    setFormValid({...formValid,[name]: minLengthValidation(e.target,6)})
  }

  if(type==="checkbox"){
    setFormValid({...formValid,[name]: e.target.checked})
  }
}

 const register = async e =>{

    e.preventDefault()
    const passwordVal=input.password
    const repeatPasswordVal=input.repeatPassword
  if(!input.email || !passwordVal || !repeatPasswordVal || !input.privacyPolicy){
      notification["error"]({
        message: "Todos los campos son requeridos"
      });
    }else{
      if(passwordVal!==repeatPasswordVal){
        notification["error"]({
          message: "Las contraseñas deben que ser iguales"
        });
      }else{
        await signUpApi(input).then(result =>{
        if(!result){
          notification["error"]({
          message: "La creación del usuario ha fallado"
          });
        }else{
          notification["success"]({
          message: "El usuario ha sido creado correctamente"
          });
          resetForm();
        }
        })  
      }
    }
  }

const resetForm = () =>{
  const input = document.getElementsByTagName('input');
  for(let i=0;i<input.length;i++){
    input[i].classList.remove("success");
    input[i].classList.remove("error");
  }

  setInput({
   email:"",
   password:"",
   repeatPassword:"",
   privacyPolicy:false
  });

  setFormValid({
    email:false,
    password:false,
    repeatPassword:false,
    privacyPolicy:false
  });

}
  
 


    return (
        <Form className="register-form" onSubmitCapture={register} onChange={changeForm}>
        <Item>
          <Input
          prefix={<UserOutlined style={{color:"rgba(0,0,0,0.25)"}}/> }
          type="email"
          name="email"
          placeholder="Correo electrónico"
          className="register-form__input"
          value={input.email}
          onChange={inputValidation}
          />
        </Item>
        <Item>
          <Input
          prefix={<LockOutlined style={{color:"rgba(0,0,0,0.25)"}}/> }
          type="password"
          name="password"
          placeholder="Contraseña"
          className="register-form__input"
          value={input.password}
          onChange={inputValidation}
          />
        </Item>
        <Item>
          <Input
          prefix={<LockOutlined style={{color:"rgba(0,0,0,0.25)"}}/> }
          type="password"
          name="repeatPassword"
          placeholder="Repetir contraseña"
          className="register-form__input"
          value={input.repeatPassword}
          onChange={inputValidation}
          />
        </Item>
        <Item>
          <Checkbox name="privacyPolicy" 
          checked={input.privacyPolicy}
          onChange={inputValidation}>
          He leído y acepto la política de privacidad
          </Checkbox>
          
        </Item>
        <Item>
            <Button htmlType="submit" className="register-form__button">
            Crear cuenta
            </Button>
        </Item>
        </Form>
    );
}