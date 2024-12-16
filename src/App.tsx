import { Navbar } from "./components";
import "./app.css";
import { Outlet } from "react-router";

const App = (): JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Navbar />
      <div className="h-[60px]"></div>
      <div className="text-center min-h-[90vh]">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
