import { useQuery } from "react-query";
import axios from "axios";

import type { SuperHeroesType } from "../types";

export default function RQSuperHeroesPage() {
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    "super-heroes",
    fetchSuperHeroes,
    {
      // cacheTime: 5000 // Cuanto tiempo estará en cache la data
      // staleTime: 30000, // Por cuanto tiempo no hace falta refetch (fresh time)
      // refetchOnMount: true, // Si se monta el componente, se refetcha
      // refetchOnWindowFocus: true // Si se pone el foco en la ventana, se refetcha
      // refetchInterval: 2000 // Cada cuanto se refetcha
      // refetchIntervalInBackground: true // refetch incluso si no esta en focus
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
      <h2>RQ Super Heroes Page</h2>
      <button onClick={() => refetch()}>fetch HEROS</button>
      {data?.data.map(hero => {
        return <div key={hero.id}>{hero.name}</div>;
      })}
    </>
  );
}

function fetchSuperHeroes() {
  return axios.get<SuperHeroesType[]>("http://localhost:4000/superheroes");
}
