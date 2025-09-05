import { useSelector } from "react-redux";
// Store
import { TBSelector } from "./Store/Reducers/TBSlice";
// Custom hooks
import useGeolocation from "./hooks/useGeolocation";
import useNotifications from "./hooks/useNotifications";
import useDocumentTitle from "./hooks/useDocumentTitle";

function App() {
  const tbState = useSelector(TBSelector);
  // Use custom hooks
  useGeolocation({ enableHighAccuracy: true });
  useNotifications(tbState);
  useDocumentTitle();

  return (
    <div className="container mx-auto px-4 bg-amber-950">
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
