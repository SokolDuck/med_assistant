// AppHeader.js
import { Layout, Typography } from 'antd';

const { Header } = Layout;
const { Title } = Typography;

export default function AppHeader() {
  return (
    <Header style={{ 
      position: 'fixed', 
      zIndex: 10000, 
      width: '100%',
      textAlign: "start"}}>
      <Title level={2} style={{ color: 'white' , marginTop: '0.4em'}}>Med Reminder</Title>
    </Header>
  );
}
