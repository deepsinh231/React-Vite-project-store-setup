import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { TBSelector } from "./Store/Reducers/TBSlice";
import useGeolocation from "./hooks/useGeolocation";
import useNotifications from "./hooks/useNotifications";
import useDocumentTitle from "./hooks/useDocumentTitle";
import routes from "./routes";

function App() {
  const tbState = useSelector(TBSelector);
  useGeolocation({ enableHighAccuracy: true });
  useNotifications(tbState);
  useDocumentTitle();

  const userRole = tbState?.role || "admin";

  const renderRoutes = (routesArr, isNested = false) =>
    routesArr.map((route, index) => {
      if (
        route.show &&
        !route.show.includes("all") &&
        !route.show.includes(userRole)
      ) {
        return null;
      }

      // Relative paths for children, absolute for top-level
      const routePath = isNested ? route.path?.replace(/^\//, "") : route.path;

      if (route.index) {
        return <Route key={index} index element={route.element} />;
      }

      return (
        <Route key={index} path={routePath} element={route.element}>
          {route.children && renderRoutes(route.children, true)}
        </Route>
      );
    });

  return (
    <div className="">
      <Routes>{renderRoutes(routes)}</Routes>
    </div>
  );
}

export default App;
