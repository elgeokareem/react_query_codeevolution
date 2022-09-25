import {
  useQuery,
  UseQueryOptions,
  useMutation,
  useQueryClient
} from "react-query";
import axios, { AxiosError } from "axios";

import type { SuperHeroesType, AddSuperHero } from "../types";

async function fetchSuperHeroes() {
  const res = await axios.get("http://localhost:4000/superheroes");
  return res.data;
}

// mutation function
const addSuperHero = (hero: AddSuperHero) => {
  return axios.post("http://localhost:4000/superheroes", hero);
};

// mutation hook
export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    onSuccess: () => {
      // the key is the same as the one used in useSuperHeroesData
      queryClient.invalidateQueries("super-heroes");
    }
  });
};

export const useSuperHeroesData = (onSuccess: any, onError: any) => {
  return useQuery<SuperHeroesType[], AxiosError>(
    "super-heroes",
    fetchSuperHeroes,
    {
      staleTime: 5000,
      onSuccess,
      onError
      // select: data => data.map(hero => hero.name)
    }
  );
};

// cacheTime: 5000 // Cuanto tiempo estará en cache la data
// staleTime: 30000, // Por cuanto tiempo no hace falta refetch (fresh time)
// refetchOnMount: true, // Si se monta el componente, se refetcha
// refetchOnWindowFocus: true // Si se pone el foco en la ventana, se refetcha
// refetchInterval: 2000 // Cada cuanto se refetcha
// refetchIntervalInBackground: true // refetch incluso si no esta en focus
