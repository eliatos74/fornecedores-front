import React from "react";
import { UserAddOutlined, CodeSandboxOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import "./App.css"; // Importando o arquivo CSS
import Formulario from "./components/formulario/Formulario";
import Tabela from "./components/tabela/Tabela";

const { Content, Footer, Sider } = Layout;

const items = [UserAddOutlined, CodeSandboxOutlined].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: index === 0 ? "Usuarios" : "Franqueados",
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
          defaultSelectedKeys={["4"]}
          items={items}
        />
      </Sider>
      <Layout>
        <header className="app-header">
          <h1>Elias</h1>
        </header>
        <Content className="app-content">
          <div className="content-div">
            <Formulario/>
            <Tabela/>
          </div>
        </Content>
        <Footer className="app-footer">
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}

export default App;
