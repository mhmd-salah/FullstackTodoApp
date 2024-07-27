import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";


const RootLayout = () => {

  return (
    <div className="root-layout ">
      <Navbar />
      <div
        className={` container min-h-[100vh] overflow-hidden`}
      >
        {/* <TransitionOverlay /> */}
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
