import { useQuery } from "@tanstack/react-query";
import Button from "./ui/Button";
import axiosInstance from "../config/axios.config";

const TodoList = () => {
  const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser") as string
  );
  const userData = loggedInUser?.jwt;
  const { isLoading, data, error } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const {
        data: { todos },
      } = await axiosInstance.get("/users/me?populate=todos", {
        headers: {
          Authorization: `Bearer ${userData}`,
        },
      });
      return todos;
    },
  });
  if (isLoading) return <h1 className="p-8 animate-pulse bg-slate-200">
    <span className="w-5 h-6 bg-slate-600"></span>
  </h1>;
  if (error) return "error: " + error.message;
  return (
    <div className="todo-colors space-y-3 ">
      {data.map(({ id, title }: { id: number; title: string }) => (
        <div
          className="flex justify-between bg-[#f6f7f8] items-center p-3 rounded-md"
          key={id}
        >
          <h3>{title}</h3>
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
