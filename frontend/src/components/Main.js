// Main.js
import React from 'react';
import { Tabs, Layout } from 'antd';
import { Navigate } from 'react-router-dom';
import CalendarTab from './CalendarTab';
import FileListTab from './FileListTab';

// import MedCalendar from './components/MedCalendar';

const { TabPane } = Tabs;
const { Content } = Layout;

export default function Main(key) {

  const isUserSignedIn = false;// Determine if the user is signed in 


  if (!isUserSignedIn) {
    return <Navigate replace to="/login" />;
  } else {
    return (
      <Content>
        {/* <div style={{ background: '#fff', padding: 24, minHeight: 380 }}> */}
          <Tabs defaultActiveKey={{key}}>
            <TabPane tab="Calendar" key="calendar">
              <CalendarTab />
            </TabPane>
            <TabPane tab="Medical Files" key="files">
              <FileListTab />
            </TabPane>
          </Tabs>
        {/* </div> */}
      </Content>
    );
  }
}
