// AppHeader.js
import { Layout, Typography, Button, theme } from 'antd';

import { getUserData, signOut } from "../resources/User"

const { Header } = Layout;
const { Title } = Typography;

export default function AppHeader() {

  const userData = getUserData();

  const signOutClick = () => {
      console.log("Sign out")
      signOut();
      window.location = "/login";
  }

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Header style={{ 
      position: 'fixed', 
      zIndex: 10000, 
      width: '100%',
      textAlign: "start",
      display: 'flex',
      justifyContent: "space-between",
      background: colorBgContainer,
      boxShadow: "#00000017 0px 5px 5px"
    }}>

      <Title level={2} style={{ marginTop: '0.4em'}}>Med Reminder</Title>
      <div className={"buttonBox"}>
        {
          userData ?
          <Button type="text" onClick={ signOutClick }>Sign Out</Button> :
          <>
            <Button type="text">Sign In</Button>
            <Button type="text">Sign Up</Button>
          </>
        }
      </div>

    </Header>
  );
}
