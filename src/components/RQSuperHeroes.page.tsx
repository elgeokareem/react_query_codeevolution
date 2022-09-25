import { AxiosError } from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  useSuperHeroesData,
  useAddSuperHeroData
} from "../hooks/useSuperHeroesData";

import type { SuperHeroesType } from "../types";

export default function RQSuperHeroesPage() {
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");

  function onSuccess(data: SuperHeroesType[]) {
    console.log("side effect after data fetching success", data);
  }

  function onError(error: AxiosError) {
    console.log("side effect after error", error);
  }

  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroesData(onSuccess, onError);

  const {
    mutate: addHero,
    isLoading: loadingPost,
    isError: isErrorPost,
    error: errorPost
  } = useAddSuperHeroData();

  const handleAddHeroClick = () => {
    console.log("add hero", name, alterEgo);
    const hero = { name, alterEgo };
    addHero(hero);
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError && error instanceof Error) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      <div>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="alter ego"
          value={alterEgo}
          onChange={e => setAlterEgo(e.target.value)}
        />
        <button onClick={handleAddHeroClick}>Add Hero</button>
      </div>
      <button onClick={() => refetch()}>fetch HEROS</button>
      data without select{" "}
      {data?.map(hero => {
        return (
          <div key={hero.id}>
            <Link to={`/rqsuperheroes/${hero.id}`}>{hero.name}</Link>
          </div>
        );
      })}
      {/* {data?.map((heroName, index) => {
        return <div key={index}>{heroName}</div>;
      })} */}
    </>
  );
}
