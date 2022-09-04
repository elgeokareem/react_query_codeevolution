import { useQuery } from "react-query";
import { useState } from "react";
import axios from "axios";

function fetchColors(page: number) {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${page}`);
}

export default function PaginatedQueriesPage() {
  const [page, setPage] = useState(1);
  const { isLoading, isError, error, data, isFetching } = useQuery(
    ["colors", page],
    () => fetchColors(page),
    {
      keepPreviousData: true
    }
  );

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError && error instanceof Error) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <div>
        {data?.data.map((color: any) => (
          <div key={color.id}>
            {color.id}. {color.label}
          </div>
        ))}
      </div>

      <div>
        <button onClick={() => setPage(page => page - 1)} disabled={page === 1}>
          Prev Page
        </button>
        <button onClick={() => setPage(page => page + 1)} disabled={page === 4}>
          Next Page
        </button>
      </div>

      {isFetching && <h2>Fetching...</h2>}
    </>
  );
}
