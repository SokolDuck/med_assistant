import React from 'react';
import { Form, Input, Button, Layout } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';

import { Link } from 'react-router-dom';
import axios from 'axios';


const { Content } = Layout;


const LoginForm = () => {
  const [form] = Form.useForm();

  const handleFinish = async (values) => {
    const { email, password } = values;

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/login`, { email, password });
      console.log(response.data);  // handle response data as needed
    } catch (err) {
      console.error(err);
    }
  };

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
};

export default LoginForm;
