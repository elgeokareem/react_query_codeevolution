import { useQuery } from "react-query";
import axios from "axios";

import type { SuperHeroesType } from "../types";

export default function RQSuperHeroesPage() {
  const { isLoading, data } = useQuery("super-heroes", fetchSuperHeroes);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      {data?.data.map(hero => {
        return <div key={hero.id}>{hero.name}</div>;
      })}
    </>
  );
}

function fetchSuperHeroes() {
  return axios.get<SuperHeroesType[]>("http://localhost:4000/superheroes");
}
