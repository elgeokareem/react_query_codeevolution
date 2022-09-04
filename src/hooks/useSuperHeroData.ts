import { useQuery, useQueryClient } from "react-query";
import axios from "axios";

import type { SuperHeroesType } from "../types";

export function useSuperHeroData(heroId: string) {
  const queryClient = useQueryClient();
  return useQuery(["super-hero", heroId], fetchSuperHero, {
    initialData: () => {
      const hero = queryClient
        ?.getQueryData<SuperHeroesType[]>("super-heroes")
        ?.find(hero => hero.id === parseInt(heroId));

      if (hero) {
        return hero;
      }

      return undefined;
    }
  });
}

async function fetchSuperHero({ queryKey }: { queryKey: string[] }) {
  const heroId = queryKey[1];

  const res = await axios.get<SuperHeroesType>(
    `http://localhost:4000/superheroes/${heroId}`
  );

  return res.data;
}
