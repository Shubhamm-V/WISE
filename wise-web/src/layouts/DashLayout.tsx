import React, { ReactNode, useEffect, useState } from "react";
import {
  PlusSquareOutlined,
  VideoCameraOutlined,
  MenuFoldOutlined,
  BookOutlined,
  ExclamationCircleOutlined,
  AppstoreOutlined,
  LogoutOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Card, Layout, Menu, theme, Modal } from "antd";
import { useAuth } from "../context/authContext";
import { useNavigate, useLocation } from "react-router-dom";
const { confirm } = Modal;
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

const DashLayout: React.FC<LayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { logout, user } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      setShowSideBar(window.innerWidth <= 575);
    };

    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure you want to Logout?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      centered: true,
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleLogout();
      },
    });
  };

  const isAdmin = process.env.REACT_APP_ADMIN_ID === user.userId;

  const items: MenuItem[] = isAdmin
    ? [
        getItem("Dashboard", "dashboard", <AppstoreOutlined />),
        getItem("All Users", "users", <TeamOutlined />),
        getItem("Hospitals", "hospitals", <PlusSquareOutlined />, [
          getItem("Add Hospital", "add-hospital"),
          getItem("Your Hospitals", "view-hospitals"),
          getItem("All Hospitals", "all-hospitals"),
        ]),
        getItem("Video", "videos", <VideoCameraOutlined />, [
          getItem("Add Video", "add-video"),
          getItem("View Videos", "view-videos"),
        ]),
        getItem("Booklets", "booklets", <BookOutlined />, [
          getItem("Add Booklets", "add-booklet"),
          getItem("View Booklets", "view-booklets"),
        ]),
      ]
    : [
        getItem("Hospitals", "hospitals", <PlusSquareOutlined />, [
          getItem("Add Hospital", "add-hospital"),
          getItem("Your Hospitals", "view-hospitals"),
        ]),
      ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible={!showSideBar}
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          display: showSideBar ? "none" : "block",
        }}
      >
        <h1 style={{ color: "#fff", padding: 10, textAlign: "center" }}>
          WISE - {isAdmin ? "Admin" : "Hospital"}
        </h1>
        <Menu
          theme="dark"
          defaultSelectedKeys={[location.pathname.substring(1)]}
          selectedKeys={[location.pathname.substring(1)]}
          onSelect={(menuItem) => {
            navigate(`/${menuItem.key}`);
            if (window.innerWidth <= 575) setShowSideBar(true);
          }}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            justifyContent:
              window.innerWidth <= 540 ? "space-between" : "flex-end",
            paddingInline: "2%",
          }}
        >
          {window.innerWidth <= 540 && (
            <div onClick={() => setShowSideBar((prev) => !prev)}>
              <MenuFoldOutlined style={{ fontSize: 20, cursor: "pointer" }} />
            </div>
          )}
          <div>
            <label>{user.name}</label>
            <LogoutOutlined
              onClick={showDeleteConfirm}
              style={{
                marginLeft: 10,
                color: "#9966CC",
                cursor: "pointer",
              }}
            />
          </div>
        </Header>
        <Content style={{ margin: "0 7px" }}>
          <Card style={{ marginTop: 16 }}>{children}</Card>
        </Content>
        <Footer style={{ padding: "7px" }}>
          <Card style={{ textAlign: "center" }}>
            WISE Copyright ©{new Date().getFullYear()}
          </Card>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashLayout;
