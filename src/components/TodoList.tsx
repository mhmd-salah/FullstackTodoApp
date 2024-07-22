import Button from "./ui/Button";


const TodoList = () => {
  
  return (
    <div className="todo-colors space-y-3 ">
      <div className="flex justify-between bg-[#f6f7f8] items-center p-3 rounded-md ">
        <h3>Learn HTML</h3>
        <div className="flex space-x-2 ">
          <Button className="w-[100px]">Edit</Button>
          <Button className="w-[100px] DlB">Remove</Button>
        </div>
      </div>
      <div className="flex justify-between bg-[#f6f7f8] items-center p-3 rounded-md ">
        <h3>Learn HTML</h3>
        <div className="flex space-x-2 ">
          <Button className="w-[100px]">Edit</Button>
          <Button className="w-[100px] DlB">Remove</Button>
        </div>
      </div>
      <div className="flex justify-between bg-[#f6f7f8] items-center p-3 rounded-md ">
        <h3>Learn HTML</h3>
        <div className="flex space-x-2 ">
          <Button className="w-[100px]">Edit</Button>
          <Button className="w-[100px] DlB">Remove</Button>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
