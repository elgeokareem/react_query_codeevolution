import { useInfiniteQuery } from "react-query";
import axios, { AxiosResponse } from "axios";
import { Colors } from "../types";
import { Fragment } from "react";

function fetchColors({ pageParam = 1 }) {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
}

export default function InfiniteQueriesPage() {
  // hasNextPage is a boolean that tells us if there are more pages to fetch
  // according to getNextPageParam option.
  const {
    isLoading,
    isError,
    error,
    data,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage
  } = useInfiniteQuery(["colors"], fetchColors, {
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < 4) {
        return pages.length + 1;
      }

      return undefined;
    }
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError && error instanceof Error) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      {data?.pages.map((group, index) => {
        return (
          <Fragment key={index}>
            {group.data.map((color: Colors) => {
              return (
                <h2 key={color.id}>
                  {color.id}. {color.label}
                </h2>
              );
            })}
          </Fragment>
        );
      })}

      <div>
        <button disabled={!hasNextPage} onClick={() => fetchNextPage()}>
          Load More
        </button>
        <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
      </div>
    </>
  );
}
