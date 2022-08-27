import { useQuery } from "react-query";
import axios from "axios";

import type { SuperHeroesType } from "../types";

export function useSuperHeroData(heroId: string) {
  return useQuery(["super-hero", heroId], fetchSuperHero);
}

async function fetchSuperHero({ queryKey }: { queryKey: string[] }) {
  const heroId = queryKey[1];

  const res = await axios.get<SuperHeroesType>(
    `http://localhost:4000/superheroes/${heroId}`
  );

  return res.data;
}
