import { useState } from "react";
import TodoSkeleton from "../components/TodoSkeleton";
import Paginator from "../components/ui/Paginator";
import useCustomQuery from "../hooks/useCustomQuery";
// import { Notyf } from "notyf";
import "notyf/notyf.min.css";

export default function Todos() {
  // hooks
  const [page, setPage] = useState<number>(1);
  // const notyf = new Notyf({
  //   types: [
  //     {
  //       type: "success",
  //       background: "#0d9488",
  //     },
  //   ],
  // });

  const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser") as string
  );
  const userData = loggedInUser?.jwt;

  const { data, isLoading, isFetching } = useCustomQuery({
    queryKey: [`todos-page-${page}`],
    url: `/todos?pagination[pageSize]=10&pagination[page]=${page}`,
    config: {
      headers: {
        Authorization: `Bearer ${userData}`,
      },
    },
  });

  if (isLoading)
    return (
      <div className="space-y-3 p-9">
        {Array.from({ length: 3 }, (_, idx) => (
          <TodoSkeleton key={idx} />
        ))}
      </div>
    );

  // Handlers
  const onClickPrev = () => {
    setPage((prev) => prev - 1);
  };
  const onClickNext = () => {
    setPage((prev) => prev + 1);
  };
  return (
    <>
      {data?.data?.length > 0 ? (
        data?.data.map(
          (
            {
              id,
              attributes: { title },
            }: { id: number; attributes: { id: number; title: string } },
            idx: number
          ) => (
            <div
              className="bg-[#f6f7f8] p-3 rounded-md mb-2 border-l-8 border-teal-600"
              key={id}
            >
              <h3 className="text-lg sm:text-xl">
                {idx + 1} - {title}
              </h3>
            </div>
          )
        )
      ) : (
        <h3 className="text-3xl p-4 text-center animate-pulse">No Todos Yet</h3>
      )}
      <div className="my-7">
        <Paginator
          page={page}
          pageCount={data?.meta?.pagination?.pageCount}
          onClickPrev={onClickPrev}
          onClickNext={onClickNext}
          total={data?.meta?.pagination?.total}
          isLoading={isFetching||isLoading}
        />
      </div>
    </>
  );
}
