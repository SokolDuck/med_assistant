import { useState } from "react"

import AuthNavbar from '../components/navbar/auth'
import  { Outlet } from "react-router-dom";

import { Layout, theme } from "antd"
const { Content, Footer, Sider } = Layout;


function Main() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout>
            <Sider 
                width={200} 
                style={{ background: colorBgContainer }}
            >
                <AuthNavbar></AuthNavbar>
            </Sider>
            <Layout style={{
                    minHeight: "100vh"
                }}>
                <Content >
                    <Outlet />
                </Content>
                <Footer style={{
                        textAlign: 'center',
                    }}
                    >
                    Medical Assistant ©2023 Created by Aliaksandr Sakalouski
                </Footer>
            </Layout>
            
        </Layout>
    )
}

export default Main;
