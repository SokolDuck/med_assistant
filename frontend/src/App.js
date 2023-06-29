import React from 'react';
import { Layout, Menu } from 'antd';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';

import AppHeader from './components/AppHeader';

import Router from './components/Router'

import { isSignedIn } from "./resources/User"


const { Footer, Content, Sider } = Layout;

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,

      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  },
);

function App() {
  const isUserSignedIn = isSignedIn();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppHeader />
      { isUserSignedIn ? <Sider style={{ 
          marginTop: 64,
          position: "fixed",
          height: "calc(100vh - 64px)"
        }}>
          <div className="demo-logo-vertical" />

          <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
              items={items2}
            />
        </Sider> : <></>}
        <Layout style={{
          marginLeft: 200
        }}>
          <Content style={{ marginTop: 64, minHeight: 'calc(100vh - 64px - 64px - 1px)'}}>
            <Router />
          </Content>
          <Footer
              style={{
                textAlign: 'center',
              }}
            >
              Medical Assistant ©2023 Created by Aliaksandr Sakalouski
            </Footer>
          </Layout>
        
    </Layout>
  );
}

export default App;
