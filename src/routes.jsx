import AdminLayout from "./layouts/AdminLayout";
import { DemoForm } from "./page/admin";

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
        icon: "",
        element: "Dashboard",
        show: ["all"],
      },
      {
        name: "Reports",
        path: "reports",
        icon: "",
        element: <DemoForm />,
        show: ["all"],
      },
      {
        name: "Not Found",
        path: "*",
        element: "Not Found",
        show: ["all"],
      },
    ],
  },
];

export default routes;
