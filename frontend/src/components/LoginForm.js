import React, { useState } from 'react';
import { Form, Input, Button, Layout } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';

import { Link } from 'react-router-dom';
import { useNavigate, Navigate } from "react-router-dom";

import { login } from "../resources/Server"
import { isSignedIn } from "../resources/User"



const { Content } = Layout;


const LoginForm = () => {

  const isUserSignedIn = isSignedIn();

  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [serverError, setServerError] = useState('');


  const handleFinish = async (values) => {
    const { email, password } = values;

    try {
      const response = await login(email, password)
      if (response.data.error) {
        console.log(response.data.error);  // handle response data as needed

        setServerError(response.data.error);
      } else {
        console.log("nav");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (isUserSignedIn) {
    return <Navigate replace to="/" />;
  } else {
    return (
      <Content>
          <div style={{
              width: '400px',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
          }}>
          <h2>Login</h2>
          <Form
              form={form}
              onFinish={handleFinish}
              className="login-form"
          >
              <Form.Item
              name="email"
              rules={[
                  {
                  type: 'email',
                  message: 'The input is not a valid email!',
                  },
                  {
                  required: true,
                  message: 'Please input your email!',
                  },
              ]}
              validateStatus={serverError ? "error" : "success" }
              help={serverError}
              >
              <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
              </Form.Item>
              <Form.Item
              name="password"
              rules={[
                  {
                  required: true,
                  message: 'Please input your password!',
                  },
              ]}
              >
              <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
              </Form.Item>
              <Form.Item>
                  <Button type="primary" htmlType="submit" className="main-form-button">
                  Log in
                  </Button>
                  Or <Link to="/registration">register now!</Link>
              </Form.Item>
          </Form>
          </div>
      </Content>
    );
  }

  
};

export default LoginForm;
