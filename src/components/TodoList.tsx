import { useQuery } from "@tanstack/react-query";
import Button from "./ui/Button";
import axios from "axios";
import axiosInstance from "../config/axios.config";


const TodoList = () => {
  const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser") as string
  );
  const userData = loggedInUser?.jwt;

  const {isLoading,data,error}=useQuery({
    queryKey:["repoData"],
    queryFn:async()=>{
      await axiosInstance.get("/users/me?populate=todos",{
        headers:{
          Authorization:`Bearer ${userData}`
        }
      });
    }
  })
  if(isLoading) return "loading..."
  if(error) return "error as "+error?.message
  return (
    <div className="todo-colors space-y-3 ">
      <div
        className="flex justify-between bg-[#f6f7f8] items-center p-3 rounded-md"
      >
        <h3>
          {data?.title}
        </h3>
        <div className="flex space-x-2 ">
          <Button className="w-[100px]">Edit</Button>
          <Button className="w-[100px] DlB">Remove</Button>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
