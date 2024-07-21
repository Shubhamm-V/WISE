import React, { ReactNode, useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Card, Layout, Menu, theme } from "antd";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

type LayoutProps = {
  children?: ReactNode;
  // other props
};

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("All Users", "users", <PieChartOutlined />),
  getItem("Hospitals", "hospitals", <UserOutlined />, [
    getItem("Add Hospital", "add-hospital"),
    getItem("Your Hospitals", "view-hospitals"),
    getItem("All Hospitals", "all-hospitals"),
  ]),
  getItem("Video", "videos", <TeamOutlined />, [
    getItem("Add Video", "add-video"),
    getItem("View Videos", "view-videos"),
  ]),
];

const DashLayout: React.FC<LayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [loading, setLoading] = useState(false);
  const { logout, user } = useAuth();
  const handleLogout = async () => {
    setLoading(true);
    await logout();
    setLoading(false);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <h2 style={{ color: "#fff", padding: 10 }}>WISE</h2>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          onSelect={(menuItem) => navigate(menuItem.key)}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "flex-end",
            gap: 10,
            paddingInline: "2%",
          }}
        >
          <label>{user.name}</label>
        </Header>
        <Content style={{ margin: "0 7px" }}>
          {/* <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
          <Card style={{ marginTop: 16 }}>{children}</Card>
        </Content>
        <Footer style={{ padding: "7px" }}>
          <Card style={{ textAlign: "center" }}>
            WISE ©{new Date().getFullYear()} Created by WISE
          </Card>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashLayout;
