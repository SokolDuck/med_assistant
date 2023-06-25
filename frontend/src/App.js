import React from 'react';
import { Layout } from 'antd';

import AppHeader from './components/AppHeader';

import Router from './components/Router'


const { Footer, Content } = Layout;

function App() {

  return (
    <Layout>
      <AppHeader />
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
  );
}

export default App;
