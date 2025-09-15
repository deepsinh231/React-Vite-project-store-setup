import { Outlet } from "react-router-dom";
import Footer from "./Footer.jsx";
const AdminLayout = () => {
  return (
    <div>
      <header>header</header>
      <Outlet />
      <Footer />
    </div>
  );
};

export default AdminLayout;
// ????

// import { AppSidebar } from "@/components/app-sidebar"
// import routes from "../routes"
// import {
//   SidebarInset,
//   SidebarProvider,
//   SidebarTrigger,
// } from "@/components/ui/sidebar"
// import React, { useState } from "react"
// import { Outlet, useLocation, useNavigate } from "react-router-dom"

// // ---- Convert routes to NavMain format ----
// const convertToNavItems = (menuItems) => {
//   return menuItems.map((item) => ({
//     title: item.label,
//     url: item.key,
//     icon: item.icon?.type || undefined, // keep raw icon
//     items: item.children ? convertToNavItems(item.children) : undefined,
//   }))
// }

// export default function AdminLayout() {
//   const [collapsed, setCollapsed] = useState(true)
//   const [openKeys, setOpenKeys] = useState([])
//   const navigate = useNavigate()
//   const location = useLocation()

//   // Generate menu items from routes
//   const generateMenuItems = (routesArray, parentPath = "") => {
//     let menuItems = []

//     routesArray.forEach((route) => {
//       if (route.name === "Admin" && route.children) {
//         const adminChildren = generateSubMenuItems(route.children, "")
//         menuItems.push(...adminChildren)
//       } else if (
//         route.show &&
//         route.show.includes("all") &&
//         route.path !== "*" &&
//         route.name !== "Admin"
//       ) {
//         let fullPath
//         if (route.index) {
//           fullPath = parentPath || "/"
//         } else if (route.path.startsWith("/")) {
//           fullPath = route.path
//         } else {
//           fullPath = parentPath
//             ? `${parentPath}/${route.path}`
//             : `/${route.path}`
//         }

//         if (route.children && route.children.length > 0) {
//           const childItems = generateSubMenuItems(route.children, fullPath)

//           menuItems.push({
//             key: fullPath,
//             label: route.name,
//             icon: route.icon ? React.createElement(route.icon) : null,
//             children: childItems.length > 0 ? childItems : undefined,
//           })
//         } else {
//           menuItems.push({
//             key: fullPath,
//             label: route.name,
//             icon: route.icon ? React.createElement(route.icon) : null,
//           })
//         }
//       }
//     })

//     return menuItems
//   }

//   const generateSubMenuItems = (children, parentPath) => {
//     return children
//       .filter((child) => child.show && child.show.includes("all"))
//       .map((child) => {
//         let childPath
//         if (child.index) {
//           childPath = parentPath
//         } else {
//           childPath = `${parentPath}/${child.path}`
//         }

//         if (child.children && child.children.length > 0) {
//           const nestedItems = generateSubMenuItems(child.children, childPath)
//           return {
//             key: childPath,
//             label: child.name,
//             icon: child.icon ? React.createElement(child.icon) : null,
//             children: nestedItems.length > 0 ? nestedItems : undefined,
//           }
//         }

//         return {
//           key: childPath,
//           label: child.name,
//           icon: child.icon ? React.createElement(child.icon) : null,
//         }
//       })
//   }

//   const menuItems = generateMenuItems(
//     routes.filter((route) => route.path !== "/auth")
//   )

//   const navItems = convertToNavItems(menuItems)

//   // ---- Optional helpers for submenu open/close ----
//   const handleMenuClick = ({ key }) => {
//     navigate(key)
//   }

//   const handleOpenChange = (keys) => {
//     setOpenKeys(keys)
//   }

//   React.useEffect(() => {
//     const currentOpenKeys = getOpenKeys()
//     setOpenKeys(currentOpenKeys)
//   }, [location.pathname])

//   const getSelectedKeys = () => {
//     const path = location.pathname
//     return [path]
//   }

//   const getOpenKeys = () => {
//     const path = location.pathname
//     const openKeys = []

//     const checkNestedItems = (items) => {
//       items.forEach((item) => {
//         if (item.children) {
//           const hasActiveChild = hasActiveChildRecursive(item.children, path)
//           if (hasActiveChild) {
//             openKeys.push(item.key)
//           }
//           checkNestedItems(item.children)
//         }
//       })
//     }

//     const hasActiveChildRecursive = (children, currentPath) => {
//       return children.some((child) => {
//         if (
//           currentPath === child.key ||
//           currentPath.startsWith(child.key + "/")
//         ) {
//           return true
//         }
//         if (child.children) {
//           return hasActiveChildRecursive(child.children, currentPath)
//         }
//         return false
//       })
//     }

//     checkNestedItems(menuItems)
//     return openKeys
//   }

//   return (
//     <SidebarProvider>
//       <AppSidebar
//         items={navItems}
//         user={{
//           name: "Admin User",
//           email: "admin@example.com",
//           avatar: "/avatars/admin.jpg",
//         }}
//         teams={[
//           { name: "Team A", logo: null, plan: "Pro" },
//           { name: "Team B", logo: null, plan: "Free" },
//         ]}
//         projects={[
//           { name: "Project X", url: "/projects/x" },
//           { name: "Project Y", url: "/projects/y" },
//         ]}
//       />
//       <SidebarInset>
//         <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
//           <div className="flex items-center gap-2 px-4">
//             <SidebarTrigger className="-ml-1" />
//           </div>
//         </header>
//         <Outlet />
//       </SidebarInset>
//     </SidebarProvider>
//   )
// }
