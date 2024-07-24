import Button from "./ui/Button";
import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import Modal from "./ui/Modal";
import Input from "./ui/Input";
import { useState } from "react";

const TodoList = () => {
  const [isOpen,setIsOpen] = useState(false)
  const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser") as string
  );
  const userData = loggedInUser?.jwt;
  
  const { isLoading, data } = useAuthenticatedQuery({
    queryKey: ["todos"],
    url: "/users/me?populate=todos",
    config:{
      headers:{
        Authorization:`Bearer ${userData}`
      }
    }
  });
  // handlers
  const onToggleEditModal =()=>{
    setIsOpen(perv=>!perv)
  }
  if (isLoading) return <h1 className="p-8 animate-pulse bg-slate-200">
    <span className="w-5 h-6 bg-slate-600"></span>
  </h1>;
  return (
    <div className="todo-colors space-y-3 ">
      {data?.todos?.length ? (
        data.todos.map(({ id, title }: { id: number; title: string }) => (
          <div
            className="flex justify-between bg-[#f6f7f8] items-center p-3 rounded-md"
            key={id}
          >
            <h3>{title}</h3>
            <div className="flex space-x-2 ">
              <Button className="w-[100px] bg-teal-600" onClick={onToggleEditModal}>
                Edit
              </Button>
              <Button className="w-[100px] DlB">Remove</Button>
            </div>
          </div>
        ))
      ) : (
        <h3 className="text-[50px] text-slate-300 font-extrabold animate-pulse">
          No Todos Yet
        </h3>
      )}
      {/* edit todo modal */}
      <Modal
        isOpen={isOpen}
        closeModal={onToggleEditModal}
        title="Edit Todo"
        description=""
      >
        <Input type="text" value={"edit Todo"} />
        <div className="flex space-x-2 mt-4">
          <Button fullWidth className="bg-teal-600 hover:bg-teal-700">Update</Button>
          <Button fullWidth variant={"cancel"} onClick={onToggleEditModal}>Cancel</Button>
        </div>
      </Modal>
    </div>
  );
};

export default TodoList;
