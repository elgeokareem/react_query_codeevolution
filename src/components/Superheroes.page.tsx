import { useState, useEffect } from "react";
import axios from "axios";
import { SuperHeroesType } from "../types";

export default function SuperHeroesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<SuperHeroesType[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/superheroes")
      .then(res => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <>
      <h2>Super Heroes Page</h2>
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </>
  );
}
