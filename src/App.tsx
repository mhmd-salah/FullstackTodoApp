import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Toaster } from "react-hot-toast";
import "./index.css";
const App = () => {
  return (
    <main>
      <RouterProvider router={router} />
      <Toaster />
    </main>
  );
};



export default App;
