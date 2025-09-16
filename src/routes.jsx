import { MdOutlineDashboard } from "react-icons/md";
import {
  FaChartBar,
  FaCogs,
  FaUser,
  FaLock,
  FaUserShield,
  FaKey,
  FaUserPlus,
  FaMobileAlt,
  FaUsers,
} from "react-icons/fa";
import NotFound from "./components/NotFound";
import AdminLayout from "./layouts/AdminLayout";
import { Outlet } from "react-router-dom";
import AuthLayout from "./layouts/auth";
import DefaultPage from "./page/admin/default";
import Page from "./layouts/auth/login/page";
import DataTableDemo from "./page/admin/Page/adminFile";
import {
  FaGlobe,
  FaListAlt,
  FaMoneyBillWave,
  FaCalendarCheck,
  FaIdBadge,
  FaExchangeAlt,
} from "react-icons/fa";
import { MdMenuBook } from "react-icons/md";
import { AiOutlineTable } from "react-icons/ai";
import AdminLayoutPage from "./layouts/AdminLayoutPage.jsx";


const SettingsPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Settings</h1>
    <div className="bg-white p-4 rounded-lg shadow">
      <p className="text-gray-600">Manage your application settings.</p>
    </div>
    <Outlet />
  </div>
);

const ProfilePage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Profile Settings</h1>
    <div className="bg-white p-4 rounded-lg shadow">
      <p className="text-gray-600">Update your profile information.</p>
    </div>
  </div>
);

const routes = [
  {
    name: "Admin",
    path: "/",
    element: <AdminLayout />,
    show: ["all"],
    children: [
      {
        index: true,
        name: "Dashboard",
        icon: MdOutlineDashboard,
        element: <DefaultPage />,
        show: ["all"],
      },
      // {
      //   name: "Reports",
      //   path: "reports",
      //   icon: FaChartBar,
      //   element: <DemoForm />,
      //   show: ["all"],
      // },
      // {
      //   name: "Analytics",
      //   path: "analytics",
      //   icon: FaChartBar,
      //   element: <AnalyticsPage />,
      //   show: ["all"],
      // },
      {
        name: "Settings",
        path: "settings",
        icon: FaCogs,
        element: <SettingsPage />,
        show: ["all"],
        children: [
          {
            name: "Profile",
            path: "profile",
            icon: FaUser,
            element: <ProfilePage />,
            show: ["all", "user"],
          },
        ],
      },

      {
        name: "Admin",
        path: "admin",
        icon: FaCogs,
        element: <AdminLayoutPage />,
        show: ["all"],
        children: [
          {
            name: "Website Menu",
            path: "website-menu",
            icon: FaGlobe,
            element: <DataTableDemo />,
            show: ["all", "user"],
          },
          {
            name: "MenuGroup List",
            path: "menu-group-list",
            icon: FaListAlt,
            element: <DataTableDemo />,
            show: ["all", "user"],
          },
          {
            name: "MenuGroup",
            path: "menu-group",
            icon: MdMenuBook,
            element: <DataTableDemo />,
            show: ["all", "user"],
          },
          {
            name: "User Menu Mapping",
            path: "user-menu-mapping",
            icon: FaUsers,
            element: <DataTableDemo />,
            show: ["all", "user"],
          },
          {
            name: "Add User",
            path: "add-user",
            icon: FaUserPlus,
            element: <DataTableDemo />,
            show: ["all", "user"],
          },
          {
            name: "User List",
            path: "user-list",
            icon: AiOutlineTable,
            element: <DataTableDemo />,
            show: ["all", "user"],
          },
          {
            name: "Add Auto Salary Day",
            path: "add-auto-salary-day",
            icon: FaMoneyBillWave,
            element: <DataTableDemo />,
            show: ["all", "user"],
          },
          {
            name: "Auto Salary Day List",
            path: "auto-salary-day-list",
            icon: FaCalendarCheck,
            element: <DataTableDemo />,
            show: ["all", "user"],
          },
          {
            name: "Active deactive EmpCode",
            path: "active-deactive-empcode",
            icon: FaIdBadge,
            element: <DataTableDemo />,
            show: ["all", "user"],
          },
          {
            name: "Update IMEI EAS",
            path: "update-imei-eas",
            icon: FaMobileAlt,
            element: <DataTableDemo />,
            show: ["all", "user"],
          },
          {
            name: "Change Emp Attendence",
            path: "change-emp-attendence",
            icon: FaExchangeAlt,
            element: <DataTableDemo />,
            show: ["all", "user"],
          },
        ],
      },
    ],
  },
  {
    name: "Authentication",
    path: "/auth",
    icon: FaUserShield,
    show: ["all"],
    element: <AuthLayout />,
    children: [
      {
        name: "Login",
        path: "login",
        icon: FaKey,
        element: <Page />,
        show: ["all"],
      }
    ],
  },
  {
    name: "Not Found",
    path: "*",
    element: <NotFound />,
    show: ["all"],
  },
];

export default routes;
