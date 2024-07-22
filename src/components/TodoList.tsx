import { useEffect, useState } from "react";
import Button from "./ui/Button";
import axiosInstance from "../config/axios.config";

interface ITodo{
  id:number,
  title:string
}

const TodoList = () => {
  const [isLoading, setisLoading] = useState(false)
  const [todos, setTodots] = useState<ITodo[]>([]);
  const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser") as string
  );
  const userData = loggedInUser?.jwt;
  useEffect(() => {
    try {
      axiosInstance
        .get("/users/me?populate=todos", {
          headers: {
            Authorization: `Bearer ${userData}`,
          },
        })
        .then((res) => setTodots(res.data.todos))
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, [userData]);
  console.log(todos)
  return (
    <div className="todo-colors space-y-3 ">
      {todos.map((todo,idx) => (
        <div className="flex justify-between bg-[#f6f7f8] items-center p-3 rounded-md"key={todo.id}>
          <h3>{idx+1}- {todo.title}</h3>
          <div className="flex space-x-2 ">
            <Button className="w-[100px]">Edit</Button>
            <Button className="w-[100px] DlB">Remove</Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
