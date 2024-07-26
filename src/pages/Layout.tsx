import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import TransitionOverlay from "../router/TransitionOverlay";

const RootLayout = () => {
  return (
    <div className="root-layout ">
      <Navbar />
      <div className=" container min-h-[100vh] content overflow-hidden">
        <TransitionOverlay />
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
