import { Navbar } from "./components";
import "./app.css";
import { Outlet } from "react-router";

const App = (): JSX.Element => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default App;
