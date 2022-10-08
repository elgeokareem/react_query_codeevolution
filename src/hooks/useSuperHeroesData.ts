import {
  useQuery,
  UseQueryOptions,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
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
    // This property is not needed for optimistic updates
    // onSuccess: (hero: AxiosResponse<SuperHeroesType[]>) => {
    //   // the key is the same as the one used in useSuperHeroesData
    //   // queryClient.invalidateQueries("super-heroes");

    //   // This is another way for doing the same thing above
    //   // but with this method we save an extra http get request
    //   queryClient.setQueryData("super-heroes", (oldQueryData: any) => {
    //     return [...oldQueryData, hero.data];
    //   });
    // }

    // This is called before the mutation is called and is passed the same variables the mutation function would receive
    onMutate: async newHero => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(["super-heroes"]);

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData(["super-heroes"]);

      // Optimistically update to the new value
      queryClient.setQueryData(["todos"], (previousHeroData: any) => [
        ...previousHeroData,
        newHero
      ]);

      // Return a context object with the snapshotted value
      return { previousTodos };
    },
    onError: (_error, _hero, context: any) => {
      console.log("pasa por el error");
      queryClient.setQueryData(["super-heroes"], context.previousHeroData);
    },
    // when is successful, or if it encounter an error
    onSettled: () => {
      console.log("pasa por aqui");
      return queryClient.invalidateQueries(["super-heroes"]);
    }
  });
};

export const useSuperHeroesData = (onSuccess: any, onError: any) => {
  return useQuery<SuperHeroesType[], AxiosError>(
    ["super-heroes"],
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
