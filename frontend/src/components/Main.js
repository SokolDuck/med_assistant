// Main.js
import React from 'react';
import { Tabs, Layout } from 'antd';
import { Navigate } from 'react-router-dom';
import CalendarTab from './CalendarTab';
import FileListTab from './FileListTab';
import { isSignedIn } from "../resources/User"

// import MedCalendar from './components/MedCalendar';

const { TabPane } = Tabs;
const { Content } = Layout;

export const  Main = ({tab}) => {
  console.log(tab)
  const isUserSignedIn = isSignedIn();


  if (!isUserSignedIn) {
    return <Navigate replace to="/login" />;
  } else {
    return (
      <Content>
        <div style={{ background: '#fff', padding: "0 50px", margin: "20px 50px 0"}}>
          <Tabs 
            defaultActiveKey={tab}
            items={
              [
                {id: "calendar", label: "Calendar", el: <CalendarTab />}, 
                {id: "files", label: "Files", el: <FileListTab />}
              ].map((tab, i) => {
              
                return {
                  label: (
                    <span>
                      { tab.label }
                    </span>
                  ),
                  key: tab.id,
                  children: tab.el ,
                };
              })
            }
          >
            <TabPane tab="Calendar" key="calendar">
              <CalendarTab />
            </TabPane>
            <TabPane tab="Medical Files" key="files">
              <FileListTab />
            </TabPane>
          </Tabs>
        </div>
      </Content>
    );
  }
}
