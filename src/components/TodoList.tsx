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

  const { data,isLoading } = useAuthenticatedQuery({
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
  const onOpenConfirmM = (todo:ITodo)=>{
    setIsOpenConfirmM(true)
    setTodoEdit(todo)
  }
  const onCloseConfirmM = ()=>{
    setIsOpenConfirmM(false)
    setTodoEdit({
      id:0,
      title:"",
      description:""
    })
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
  const onRemove= async()=>{
    try{
      const {status}=await axiosInstance.delete(`/todos/${todoEdit.id}`,{
        headers:{
          Authorization:`Bearer ${userData}`
        }
      })
      if(status===200) onCloseConfirmM()
    }catch(error){
      toast.remove("Error :"+error);
    }

  }

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

  if(isLoading) return (
    <div className="flex items-center justify-between animate-pulse bg-[#f6f7f8] p-7">
      <div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
        <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      </div>
      <div className="flex gap-3">
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
      </div>
    </div>
  );
  console.log(isLoading)
  
  return (
    <div className="todo-colors space-y-3 ">
      {data?.todos?.length > 0 ? (
        data.todos.map((todo: ITodo,idx:number) => (
          <div
            className="flex justify-between bg-[#f6f7f8] items-center p-3 rounded-md"
            key={todo.id}
          >
            <h3>{idx+1} - {todo.title}</h3>
            <div className="flex space-x-2 ">
              <Button
                className="w-[100px] bg-teal-600"
                onClick={() => onOpenEditModal(todo)}
              >
                Edit
              </Button>
              <Button
                className="w-[100px] DlB"
                onClick={() => onOpenConfirmM(todo)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))
      ) : (
        <h3 className="text-3xl p-4 text-center animate-pulse">No Todos Yet</h3>
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
      {/* confirm modal */}
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
          <Button className="bg-red-600" fullWidth onClick={() => onRemove()}>
            remove
          </Button>
          <Button
            variant={"cancel"}
            fullWidth
            onClick={() => onCloseConfirmM()}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default TodoList;
