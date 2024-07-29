import toast from "react-hot-toast";
import { NavLink, useLocation } from "react-router-dom";
import Button from "./ui/Button";

const Navbar = () => {
  const {pathname} = useLocation()
  const userData = JSON.parse(localStorage.getItem("loggedInUser")as string);
  const onLogout = ()=>{
    localStorage.removeItem("loggedInUser")
    toast.success("logout success")
    setTimeout(()=>{
      location.pathname= pathname
    },1500)
  }
  return (
    <nav className="bg-teal-600 px-9 py-5 w-full ">
      <ul className="flex items-center justify-center sm:justify-between container">
        <li className="text-white duration-200 font-semibold text-lg">
          <NavLink to="/">Home</NavLink>
        </li>
        {userData?.jwt ? (
          <>
            <li className="text-white duration-200 font-semibold text-sm hidden sm:block">
              Name : {userData.user.username}
            </li>
            <p className="flex items-center ">
              <li className="text-white duration-200 font-semibold text-lg">
                <NavLink to="/profile">Profile</NavLink>
              </li>
              <li className="text-white duration-200 font-semibold text-lg">
                <NavLink to="/todos">Todos</NavLink>
              </li>
              <li className="text-white duration-200 font-semibold text-lg">
                <Button onClick={onLogout} className="text-red-600 font-semibold bg-transparent ">Logout</Button>
              </li>
            </p>
          </>
        ) : (
          <p className="flex items-center space-x-3">
            <li className="text-white duration-200 font-semibold text-lg">
              <NavLink to="/register">Register</NavLink>
            </li>
            <li className="text-white duration-200 font-semibold text-lg">
              <NavLink to="/login">Login</NavLink>
            </li>
          </p>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
