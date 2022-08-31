import { useQueries } from "react-query";
import axios from "axios";

const fetchSuperHero = (heroId: string) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export default function DynamicParallelPage({
  heroIds
}: {
  heroIds: string[];
}) {
  const queryResults = useQueries(
    heroIds.map(id => {
      return {
        queryKey: ["super-hero", id],
        queryFn: () => fetchSuperHero(id)
      };
    })
  );

  console.log({ queryResults });
  return <div>Dynamic Parallel - Check the console</div>;
}
