import { useState } from "react";
import TodoSkeleton from "../components/TodoSkeleton";
import Paginator from "../components/ui/Paginator";
import useCustomQuery from "../hooks/useCustomQuery";
// import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import Button from "../components/ui/Button";

export default function Todos() {
  // hooks
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [sortBy, setSortBy] = useState<"DESC"|"ASC">("DESC");
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
    queryKey: [`todos-page-${page}-pageSize-${pageSize}-sortBy-${sortBy}`],
    url: `/todos?pagination[pageSize]=${pageSize}&pagination[page]=${page}&sort[0]=createdAt:${sortBy}`,
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

  const onChangePageSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(+e.target.value);
  };
  const onChangeSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as "DESC" | "ASC");
  };
  return (
    <>
      <div className="flex justify-between items-center mb-7">
        <Button>Add Todo</Button>
        <div className="space-x-3">
          <select
            name="sortBy"
            id="sortBy"
            className="border-2 border-teal-600 rounded-md p-2"
            value={sortBy}
            onChange={onChangeSortBy}
          >
            <option value="ASC">Oldest</option>
            <option value="DESC">Latest</option>
          </select>
          <select
            name="pageSize"
            id="pageSize"
            className="border-2 border-teal-600 rounded-md p-2"
            value={pageSize}
            onChange={onChangePageSize}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </div>
      </div>
      {data?.data?.length > 0 ? (
        data?.data.map(
          (
            {
              id,
              attributes: { title },
            }: { id: number; attributes: { id: number; title: string } },
          ) => (
            <div
              className="bg-[#f6f7f8] p-3 rounded-md mb-2 border-l-8 border-teal-600"
              key={id}
            >
              <h3 className="text-lg sm:text-xl">
                {id} - {title}
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
          isLoading={isFetching || isLoading}
        />
      </div>
    </>
  );
}
