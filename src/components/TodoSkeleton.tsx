const TodoSkeleton = () => {
  return (
    <div className="flex items-center justify-between animate-pulse bg-[#f6f7f8] p-7 ">
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
};

export default TodoSkeleton;
