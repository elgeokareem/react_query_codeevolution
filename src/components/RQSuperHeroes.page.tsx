import { useQuery } from "react-query";
import axios, { AxiosError } from "axios";

import type { SuperHeroesType } from "../types";

export default function RQSuperHeroesPage() {
  function onSuccess(data: SuperHeroesType[]) {
    console.log("side effect after data fetching success", data);
  }

  function onError(error: AxiosError) {
    console.log("side effect after error", error);
  }

  const { isLoading, data, isError, error, isFetching, refetch } = useQuery<
    SuperHeroesType[],
    AxiosError
  >("super-heroes", fetchSuperHeroes, {
    // cacheTime: 5000 // Cuanto tiempo estará en cache la data
    // staleTime: 30000, // Por cuanto tiempo no hace falta refetch (fresh time)
    // refetchOnMount: true, // Si se monta el componente, se refetcha
    // refetchOnWindowFocus: true // Si se pone el foco en la ventana, se refetcha
    // refetchInterval: 2000 // Cada cuanto se refetcha
    // refetchIntervalInBackground: true // refetch incluso si no esta en focus
    onSuccess,
    onError
  });

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
      {data?.map(hero => {
        return <div key={hero.id}>{hero.name}</div>;
      })}
    </>
  );
}

async function fetchSuperHeroes() {
  const res = await axios.get("http://localhost:4000/superheroes");
  return res.data;
}
