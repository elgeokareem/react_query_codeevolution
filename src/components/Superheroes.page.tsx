import { useState, useEffect } from "react";
import axios from "axios";

interface SuperHeroesType {
  id: number;
  name: string;
  alterEgo: string;
}

export default function SuperHeroesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<SuperHeroesType[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/superheroes")
      .then(res => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        1;
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
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
