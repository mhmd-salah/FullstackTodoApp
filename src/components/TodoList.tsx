import Button from "./ui/Button";
import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import Modal from "./ui/Modal";
import Input from "./ui/Input";
import { ChangeEvent, FormEvent, useState } from "react";
import Textarea from "./ui/Textarea";
import { ITodo } from "../interfaces";
import axiosInstance from "../config/axios.config";

const TodoList = () => {
  // hooks
  const [todoEdit, setTodoEdit] = useState<ITodo>({
    id: 0,
    title: "",
    description: "",
  });
  const [isOpen, setIsOpen] = useState(false);

  const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser") as string
  );
  const userData = loggedInUser?.jwt;

  const { isLoading, data } = useAuthenticatedQuery({
    queryKey: ["todos"],
    url: "/users/me?populate=todos",
    config: {
      headers: {
        Authorization: `Bearer ${userData}`,
      },
    },
  });
  // handlers
  const onOpenEditModal = (todo: ITodo) => {
    setIsOpen(true);
    setTodoEdit(todo);
  };
  const onCloseEditModal = () => {
    setIsOpen(false);
    setTodoEdit({
      id: 0,
      title: "",
      description: "",
    });
  };
  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    setTodoEdit({
      ...todoEdit,
      [name]: value,
    });
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, description } = todoEdit;
    try {
      const res = await axiosInstance.put(
        `/todos/${todoEdit.id}`,
        { data: { title, description } },
        {
          headers: {
            Authorization: `Bearer ${userData}`,
          },
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    console.log(todoEdit);
  };

  if (isLoading)
    return (
      <h1 className="p-8 animate-pulse bg-slate-200">
        <span className="w-5 h-6 bg-slate-600"></span>
      </h1>
    );
  return (
    <div className="todo-colors space-y-3 ">
      {data?.todos?.length ? (
        data.todos.map((todo: ITodo) => (
          <div
            className="flex justify-between bg-[#f6f7f8] items-center p-3 rounded-md"
            key={todo.id}
          >
            <h3>{todo.title}</h3>
            <div className="flex space-x-2 ">
              <Button
                className="w-[100px] bg-teal-600"
                onClick={() => onOpenEditModal(todo)}
              >
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
        closeModal={onCloseEditModal}
        title="Edit Todo"
        description=""
      >
        <form onSubmit={submitHandler}>
          <Input
            type="text"
            value={todoEdit.title}
            name="title"
            onChange={onChangeHandler}
          />
          <Textarea
            value={todoEdit.description}
            onChange={onChangeHandler}
            name="description"
          />
          <div className="flex space-x-2 mt-4">
            <Button fullWidth className="bg-teal-600 hover:bg-teal-700">
              Update
            </Button>
            <Button fullWidth variant={"cancel"} onClick={onCloseEditModal}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TodoList;
