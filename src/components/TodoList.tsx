import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../config/axios.config";
import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import { ITodo } from "../interfaces";
import TodoSkeleton from "./TodoSkeleton";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Modal from "./ui/Modal";
import Textarea from "./ui/Textarea";

const TodoList = () => {
  // abort controller
  const abortController = new AbortController();
  const { signal } = abortController;
  // hooks
  useEffect(()=>{
    console.log("re-Render")
  })
  
  const [addTodo,setAddTodo]= useState<Omit<ITodo,"id">>({
    title:"",
    description:""
  })
  const [todoEdit, setTodoEdit] = useState<ITodo>({
    id: 0,
    title: "",
    description: "",
  });
  const [queryVersion,setQueryVersion] = useState<number>(1)
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAddM, setIsOpenAddM] = useState(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isOpenConfirmM, setIsOpenConfirmM] = useState(false);

  const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser") as string
  );
  const userData = loggedInUser?.jwt;

  const { data, isLoading } = useAuthenticatedQuery({
    queryKey: ["todoList", queryVersion.toString()],
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
    abortController.abort()
    setIsOpen(false);
    setTodoEdit({
      id: 0,
      title: "",
      description: "",
    });
  };
  const onOpenConfirmM = (todo: ITodo) => {
    setIsOpenConfirmM(true);
    setTodoEdit(todo);
  };
  const onCloseConfirmM = () => {
    abortController.abort()
    setIsOpenConfirmM(false);
    setTodoEdit({
      id: 0,
      title: "",
      description: "",
    });
  };
  const onOpenAddM = () => {
    setIsOpenAddM(true);
  };
  const onCloseAddM = () => {
    abortController.abort()
    setAddTodo({
      title: "",
      description: "",
    });
    setIsOpenAddM(false);
  };

  const onChangeAddInput= (e:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
    const {name,value} = e.target
    setAddTodo({
      ...addTodo,
      [name]:value
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

  const onRemove = async () => {
    try {
      const { status } = await axiosInstance.delete(`/todos/${todoEdit.id}`, {
        headers: {
          Authorization: `Bearer ${userData}`,
        },
        signal
      });
      if (status === 200) {
        onCloseConfirmM();
        setQueryVersion(prev=>prev+1)
      }
    } catch (error) {
      toast.remove("Error :" + error);
    }
  };

  const submitAddTodoHandler= async(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const {title,description} = addTodo
    try{
      const {status} = await axiosInstance.post("/todos",{
        data:{title,description}
      },{
        headers: {
          Authorization: `Bearer ${userData}`,
        },
        signal
      })
      if(status === 200){
        onCloseAddM()
        toast.success("todo added")
        setQueryVersion(prev=>prev+1)
      }
    }catch(err){
      console.log(err)
    }
  }
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdating(true);
    const { title, description } = todoEdit;
    try {
      const { status } = await axiosInstance.put(
        `/todos/${todoEdit.id}`,
        { data: { title, description } },
        {
          headers: {
            Authorization: `Bearer ${userData}`,
          },
        }
      );
      console.log(status);
      if (status === 200) {
        onCloseEditModal();
        toast.success("todo updated");
        setQueryVersion(prev=>prev+1)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdating(false);
    }
  };
  if (isLoading)
    return (
      <div className="space-y-3 p-9">
        {Array.from({ length: 3 }, (_, idx) => (
          <TodoSkeleton key={idx} />
        ))}
      </div>
    );

  return (
    <div className="todo-colors space-y-3 p-9">
      <div>
        <Button
          fullWidth
          className="bg-teal-500 text-2xl hover:bg-teal-600"
          onClick={() => onOpenAddM()}
        >
          Add Todo
        </Button>
      </div>
      {data?.todos?.length > 0 ? (
        data.todos.map((todo: ITodo, idx: number) => (
          <div
            className="flex justify-between bg-[#f6f7f8] items-center p-3 rounded-md"
            key={todo.id}
          >
            <h3>
              {idx + 1} - {todo.title}
            </h3>
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

      {/* new todo modal */}
      <Modal
        isOpen={isOpenAddM}
        closeModal={onCloseAddM}
        title="Add New Todo"
        description="To add new Todo "
      >
        <form onSubmit={submitAddTodoHandler}>
          <Input
            type="text"
            placeholder="Enter your todo title"
            name="title"
            value={addTodo.title}
            onChange={onChangeAddInput}
          />
          <Textarea
            placeholder="Enter your todo description"
            name="description"
            value={addTodo.description}
            onChange={onChangeAddInput}
          />
          <div className="flex space-x-2 mt-4">
            <Button
              fullWidth
              className="bg-teal-600 hover:bg-teal-700"
              isLoading={isUpdating}
            >
              Add
            </Button>
            <Button fullWidth variant={"cancel"} onClick={onCloseAddM} type="button">
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
      {/* edit modal */}
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
            <Button fullWidth variant={"cancel"} onClick={onCloseEditModal} type="button">
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


