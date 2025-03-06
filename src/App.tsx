import { Navbar } from "./components";
import { Outlet } from "react-router";

const App = (): JSX.Element => {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main className="pt-[120px] min-h-[calc(100vh-120px)] z-10">
        <Outlet />
      </main>
    </div>
  );
};

export default App;
