import React, { useState } from "react";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import routes from "../routes";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import SettingsDrawer from "@/components/SettingsDrawer";
const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [openKeys, setOpenKeys] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Generate menu items from routes configuration with proper submenu handling
  const generateMenuItems = (routesArray, parentPath = "") => {
    let menuItems = [];

    routesArray.forEach((route) => {
      // Handle the Admin wrapper route - process its children directly
      if (route.name === "Admin" && route.children) {
        // Process Admin's children as top-level menu items
        const adminChildren = generateSubMenuItems(route.children, "");
        menuItems.push(...adminChildren);
      } else if (
        route.show &&
        route.show.includes("all") &&
        route.path !== "*" && // Exclude 404 route
        route.name !== "Admin" // Skip wrapper routes (but we handle them above)
      ) {
        // Handle other top-level routes
        let fullPath;
        if (route.index) {
          fullPath = parentPath || "/";
        } else if (route.path.startsWith("/")) {
          fullPath = route.path;
        } else {
          fullPath = parentPath
            ? `${parentPath}/${route.path}`
            : `/${route.path}`;
        }

        // Handle routes with children (submenus)
        if (route.children && route.children.length > 0) {
          const childItems = generateSubMenuItems(route.children, fullPath);

          menuItems.push({
            key: fullPath,
            label: route.name,
            icon: route.icon ? React.createElement(route.icon) : null,
            children: childItems.length > 0 ? childItems : undefined,
          });
        } else {
          // Handle direct routes
          menuItems.push({
            key: fullPath,
            label: route.name,
            icon: route.icon ? React.createElement(route.icon) : null,
          });
        }
      }
    });

    return menuItems;
  };

  // Generate submenu items - now handles deeper nesting
  const generateSubMenuItems = (children, parentPath) => {
    return children
      .filter((child) => child.show && child.show.includes("all"))
      .map((child) => {
        let childPath;
        if (child.index) {
          childPath = parentPath;
        } else {
          childPath = `${parentPath}/${child.path}`;
        }

        // Handle deeper nested children
        if (child.children && child.children.length > 0) {
          const nestedItems = generateSubMenuItems(child.children, childPath);
          return {
            key: childPath,
            label: child.name,
            icon: child.icon ? React.createElement(child.icon) : null,
            children: nestedItems.length > 0 ? nestedItems : undefined,
          };
        }

        return {
          key: childPath,
          label: child.name,
          icon: child.icon ? React.createElement(child.icon) : null,
        };
      });
  };

  const menuItems = generateMenuItems(
    routes.filter((route) => route.path !== "/auth")
  );
  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  const handleOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  // Initialize open keys based on current route
  React.useEffect(() => {
    const currentOpenKeys = getOpenKeys();
    setOpenKeys(currentOpenKeys);
  }, [location.pathname]);

  // Get current selected keys based on current path
  const getSelectedKeys = () => {
    const path = location.pathname;
    return [path];
  };

  // Get open keys for submenus - handles deeper nesting recursively
  const getOpenKeys = () => {
    const path = location.pathname;
    const openKeys = [];

    // Recursive function to check nested items
    const checkNestedItems = (items) => {
      items.forEach((item) => {
        if (item.children) {
          // Check if any child (at any level) matches the current path
          const hasActiveChild = hasActiveChildRecursive(item.children, path);
          if (hasActiveChild) {
            openKeys.push(item.key);
          }
          // Recursively check nested children
          checkNestedItems(item.children);
        }
      });
    };

    // Helper function to recursively check for active children
    const hasActiveChildRecursive = (children, currentPath) => {
      return children.some((child) => {
        if (
          currentPath === child.key ||
          currentPath.startsWith(child.key + "/")
        ) {
          return true;
        }
        if (child.children) {
          return hasActiveChildRecursive(child.children, currentPath);
        }
        return false;
      });
    };

    checkNestedItems(menuItems);
    return openKeys;
  };

  return (
    <>
      <Layout theme="light" style={{ minHeight: "100vh" }}>
        <Sider theme="light" trigger={null} collapsed={collapsed}>
          <div className="demo-logo-vertical border p-4 text-center font-bold">
            {collapsed ? "A" : "Admin Panel"}
          </div>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={getSelectedKeys()}
            selectedKeys={getSelectedKeys()}
            openKeys={openKeys}
            onOpenChange={handleOpenChange}
            items={menuItems}
            onClick={handleMenuClick}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: "10px",
              padding: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
      <SettingsDrawer />{" "}
    </>
  );
};

export default AdminLayout;
