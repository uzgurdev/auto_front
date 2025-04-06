import { Outlet } from "react-router";
import { Footer, Navbar } from "./components";

const App = (): JSX.Element => {
  return (
    <div className="relative min-h-screen overflow-hidden font-Poppins">
      <Navbar.Navbar />
      <main className="pt-[120px] min-h-[calc(100vh-120px)] container">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
