import { MdOutlineDashboard } from "react-icons/md";
import MainDashboard from "../pages/Dashboard";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdOutlineDashboard className="h-6 w-6" />,
    component: <MainDashboard />,
  },
];

export default routes;

//{
//  name: "Dashboard",
//  layout: "/admin",
//  path: "default",
//  icon: <MdOutlineDashboard className="h-6 w-6" />,
//  component: <MainDashboard />,
//},

// {
//   name: "NFT Marketplace",
//   layout: "/admin",
//   path: "nft-marketplace",
//   icon: <MdOutlineShoppingCart className="h-6 w-6" />,
//   component: <NFTMarketplace />,
//   secondary: true,
// },
// {
//   name: "Data Tables",
//   layout: "/admin",
//   icon: <MdBarChart className="h-6 w-6" />,
//   path: "data-tables",
//   component: <DataTables />,
// },
// {
//   name: "Profile",
//   layout: "/admin",
//   path: "profile",
//   icon: <MdPerson className="h-6 w-6" />,
//   component: <Profile />,
// },
