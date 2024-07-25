import Button from "./ui/Button";
import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import Modal from "./ui/Modal";
import Input from "./ui/Input";
import { ChangeEvent, FormEvent, useState } from "react";
import Textarea from "./ui/Textarea";
import { ITodo } from "../interfaces";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";

const TodoList = () => {
  // hooks
  const [todoEdit, setTodoEdit] = useState<ITodo>({
    id: 0,
    title: "",
    description: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenConfirmM,setIsOpenConfirmM] = useState(false)
  const [isUpdating,setIsUpdating] =useState<boolean>(false)

  const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser") as string
  );
  const userData = loggedInUser?.jwt;

  const { isLoading, data } = useAuthenticatedQuery({
    queryKey: ["todoList",todoEdit.id.toString()],
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
  const onOpenConfirmM = ()=>{
    setIsOpenConfirmM(true)
  }
  const onCloseConfirmM = ()=>{
    setIsOpenConfirmM(false)
  }
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
    setIsUpdating(true)
    const { title, description } = todoEdit;
    try {
      const {status} = await axiosInstance.put(
        `/todos/${todoEdit.id}`,
        { data: { title, description } },
        {
          headers: {
            Authorization: `Bearer ${userData}`,
          },
        }
      );
      console.log(status);
      if(status === 200){
        onCloseEditModal()
        toast.success('todo updated')
      }
    } catch (error) {
      console.log(error);
    }finally{
      setIsUpdating(false)
    }
  };

  if (isLoading) return 'loading..'
  return (
    <div className="todo-colors space-y-3 ">
      {data?.todos?.length &&
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
              <Button
                className="w-[100px] DlB"
                onClick={() => onOpenConfirmM()}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}

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
            <Button
              fullWidth
              className="bg-teal-600 hover:bg-teal-700"
              isLoading={isUpdating}
            >
              Update
            </Button>
            <Button fullWidth variant={"cancel"} onClick={onCloseEditModal}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
      <Modal
        isOpen={isOpenConfirmM}
        closeModal={onCloseConfirmM}
        title="confirm remove todo"
        description=""
      >
        <p className="mb-3 text-lg">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed
          recusandae sit cupiditate ad, in a libero suscipit non voluptatibus
          molestias!
        </p>
        <div className="flex space-x-2">
          <Button className="bg-red-600" fullWidth>remove</Button>
          <Button variant={"cancel"} fullWidth onClick={()=>onCloseConfirmM()}>Cancel</Button>
        </div>
      </Modal>
    </div>
  );
};

export default TodoList;
