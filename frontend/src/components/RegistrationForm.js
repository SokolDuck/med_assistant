import React from 'react';
import axios from 'axios';
import { Form, Input, Button } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';


const RegistrationForm = () => {
  const [form] = Form.useForm();

  const handleFinish = async (values) => {
    const { email, password } = values;

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/registration`, { email, password });
      console.log(response.data);  // handle response data as needed
    } catch (err) {
      console.error(err);
    }
  };

  const handleGoogleSignup = () => {
    // Redirect to Google authentication route in your backend
    // window.location.href = `${process.env.REACT_APP_BACKEND_URL}/login/google`;
  };

  return (
    <div style={{
          width: '400px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
      }}>
      <h2>Registration</h2>
      <Form
        form={form}
        onFinish={handleFinish}
        requiredMark={true}
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
            {
              min: 6,
              message: 'Password should be at least 6 characters',
            },
          ]}
          hasFeedback
        >
          <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
        </Form.Item>
        <Form.Item
          name="confirm"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Confirm Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="main-form-button">Sign up</Button>
        </Form.Item>
      </Form>
      <Button className="secondary-form-button" onClick={handleGoogleSignup} icon={<svg viewBox="0 0 24 24" width="1em" height="1em" class="icon__1Md2 icon__3F7K">
            <path fill-rule="evenodd" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm.044-5.213c2.445 0 4.267-1.551 4.556-3.781v-1.891h-4.519v1.89h2.602a2.893 2.893 0 0 1-2.724 1.93c-1.194 0-2.677-1.1-2.677-2.843 0-1.621 1.161-2.876 2.677-2.876.739 0 1.413.279 1.922.736l1.399-1.376a4.744 4.744 0 1 0-3.236 8.212z"></path>
        </svg>}>
      Sign up with Google 
      </Button>
    </div>
  );
};

export default RegistrationForm;
