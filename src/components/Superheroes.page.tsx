import { useState, useEffect } from "react";
import axios from "axios";

export default function SuperHeroesPage() {
  const [isLoadiing, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

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

  if (isLoadiing) {
    return <div>Loading...</div>;
  }

  return <div></div>;
}
