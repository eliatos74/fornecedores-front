import React from "react";
import { UserAddOutlined, CodeSandboxOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import "./App.css";
import Tabela from "./components/tabela/Tabela";

const { Content, Footer, Sider } = Layout;

const items = [UserAddOutlined, CodeSandboxOutlined].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: index === 0 ? "Usuarios" : "Fornecedores",
}));

function App() {
  return (
    <Layout className="content">
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["2"]}
          items={items}
        />
      </Sider>
      <Layout>
        <header className="app-header"></header>
        <Content className="app-content">
          <div className="content-div">
            <Tabela />
          </div>
        </Content>
        <Footer className="app-footer"></Footer>
      </Layout>
    </Layout>
  );
}

export default App;
