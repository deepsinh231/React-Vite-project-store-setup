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
import { DemoForm, AnalyticsPage } from "./page/admin";

// Simple placeholder components for nested pages
const Demo1Page = () => <div className="p-6">Demo1 Page</div>;
const Users1Page = () => <div className="p-6">Users1 Page</div>;
const Users2Page = () => <div className="p-6">Users2 Page</div>;

const ReportsPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Reports</h1>
    <div className="bg-white p-4 rounded-lg shadow">
      <p className="text-gray-600">
        View and analyze your business reports here.
      </p>
    </div>
  </div>
);

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

const SecurityPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Security Settings</h1>
    <div className="bg-white p-4 rounded-lg shadow">
      <p className="text-gray-600">Manage your security preferences.</p>
    </div>
    <Outlet />
  </div>
);

const LoginPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="max-w-md w-full space-y-8">
      <h2 className="text-center text-3xl font-bold text-gray-900">Login</h2>
      <div className="bg-white p-8 rounded-lg shadow">
        <p className="text-gray-600">Login form would go here.</p>
      </div>
    </div>
  </div>
);

const OtpPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="max-w-md w-full space-y-8">
      <h2 className="text-center text-3xl font-bold text-gray-900">
        Enter OTP
      </h2>
      <div className="bg-white p-8 rounded-lg shadow">
        <p className="text-gray-600">OTP verification form would go here.</p>
      </div>
    </div>
  </div>
);

const SignupPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="max-w-md w-full space-y-8">
      <h2 className="text-center text-3xl font-bold text-gray-900">Sign Up</h2>
      <div className="bg-white p-8 rounded-lg shadow">
        <p className="text-gray-600">Registration form would go here.</p>
      </div>
    </div>
  </div>
);

const UsersPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">User Management</h1>
    <div className="bg-white p-4 rounded-lg shadow">
      <p className="text-gray-600">Manage database users here.</p>
    </div>
    <Outlet />
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
      {
        name: "Reports",
        path: "reports",
        icon: FaChartBar,
        element: <DemoForm />,
        show: ["all"],
      },
      {
        name: "Analytics",
        path: "analytics",
        icon: FaChartBar,
        element: <AnalyticsPage />,
        show: ["all"],
      },
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
          {
            name: "Security",
            path: "security",
            icon: FaLock,
            element: <SecurityPage />,
            show: ["all"],
            children: [
              {
                name: "Database",
                path: "database",
                icon: FaLock,
                element: <SecurityPage />,
                show: ["all"],
                children: [
                  {
                    name: "Users",
                    path: "users",
                    icon: FaUsers,
                    element: <UsersPage />,
                    show: ["all"],
                    children: [
                      {
                        name: "Demo1",
                        path: "demo-1",
                        icon: FaLock,
                        element: <Demo1Page />,
                        show: ["all"],
                      },
                    ],
                  },
                  {
                    name: "Users1",
                    path: "users1",
                    icon: FaLock,
                    element: <Users1Page />,
                    show: ["all"],
                  },
                  {
                    name: "Users2",
                    path: "users2",
                    icon: FaLock,
                    element: <Users2Page />,
                    show: ["all"],
                  },
                ],
              },
            ],
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
        element: <LoginPage />,
        show: ["all"],
      },
      {
        name: "OTP",
        path: "otp",
        icon: FaMobileAlt,
        element: <OtpPage />,
        show: ["all"],
      },
      {
        name: "Signup",
        path: "signup",
        icon: FaUserPlus,
        element: <SignupPage />,
        show: ["all"],
      },
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
