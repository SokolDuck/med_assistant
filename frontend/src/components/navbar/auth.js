import { Menu, Button } from "antd";
import  { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../resources/auth";

import { CalendarOutlined, ProfileOutlined, FileOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons';


function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const defaultItems = [
    getItem('Calendar', '/calendar', <CalendarOutlined />),
    getItem('Profile', '/me', <ProfileOutlined />),
    getItem('Files', '/files', <FileOutlined />),
    
];


function AuthNavbar() {
    let auth = useAuth();
    let navigate = useNavigate();
    
    let loc = useLocation();
    console.log(loc)

    const onClick = (e) => {
        console.log('click ', e);
        navigate(e.key)
    };


    return (
        <div style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            height: "100%",
            padding: "35px 0"
        }}>
            <Menu 
                defaultSelectedKeys={[loc.pathname]}
                onClick={onClick}
                mode="inline"
                items={defaultItems}
            />
            <div style={{
                paddingLeft: 13,
                display: "flex",
                flexDirection: "column",
            }}>
                {auth.user? 
                <>
                    <Button style={{
                        textAlign: "left"
                    }} type="link" onClick={() => {auth.signout(() => navigate("/"));}}>Sign Out</Button>
                </>:
                <>
                    <Button style={{
                        textAlign: "left"
                    }} type="link" onClick={() => {auth.signout(() => navigate("/sign-in"));}}>Sign In</Button>
                    <Button style={{
                        textAlign: "left"
                    }} type="link" onClick={() => {auth.signout(() => navigate("/sign-up"));}}>Sign Up</Button>
                </>} 
            </div>
        </div>
    )
}

export default AuthNavbar;
