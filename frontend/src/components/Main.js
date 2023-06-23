// Main.js
import React from 'react';
import { Layout, Tabs } from 'antd';
import AppHeader from './AppHeader';
import CalendarTab from './CalendarTab';
import FileListTab from './FileListTab';

const { Content } = Layout;
const { TabPane } = Tabs;

export default function Main() {
  return (
    <Layout>
      <AppHeader />
      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Calendar" key="1">
              <CalendarTab />
            </TabPane>
            <TabPane tab="Medical Files" key="2">
              <FileListTab />
            </TabPane>
          </Tabs>
        </div>
      </Content>
    </Layout>
  );
}
