// AppHeader.js
import { Layout } from 'antd';

const { Header } = Layout;

export default function AppHeader() {
  return (
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      {/* <div className="logo" /> */}
      {/* <Title style={{ color: 'white' }}>Med Reminder</Title> */}
      Med Reminder
    </Header>
  );
}
