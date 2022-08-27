import { AxiosError } from "axios";
import { useSuperHeroesData } from "../hooks/useSuperHeroesData";

import type { SuperHeroesType } from "../types";

export default function RQSuperHeroesPage() {
  function onSuccess(data: SuperHeroesType[]) {
    console.log("side effect after data fetching success", data);
  }

  function onError(error: AxiosError) {
    console.log("side effect after error", error);
  }

  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroesData(onSuccess, onError);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError && error instanceof Error) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      <button onClick={() => refetch()}>fetch HEROS</button>
      {/*data without select {data?.map(hero => {
        return <div key={hero.id}>{hero.name}</div>;
      })} */}
      {data?.map((heroName, index) => {
        return <div key={index}>{heroName}</div>;
      })}
    </>
  );
}
