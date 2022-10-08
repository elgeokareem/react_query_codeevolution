import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function fetchSuperHeroes() {
  return axios.get("http://localhost:4000/superheroes");
}
function fetchFriends() {
  return axios.get("http://localhost:4000/friends");
}

export default function ParallelQueriesPage() {
  useQuery(["super-heroes"], fetchSuperHeroes);
  useQuery(["friends"], fetchFriends);

  return <div>Parallel queries</div>;
}
