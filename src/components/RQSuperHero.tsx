import { useSuperHeroData } from "../hooks/useSuperHeroData";
import { useParams } from "react-router-dom";

export default function RQSuperHeroPage() {
  const { heroId } = useParams();

  if (!heroId) {
    return <h2>No hero id provided</h2>;
  }

  const { data, error, isError, isLoading } = useSuperHeroData(heroId);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError && error instanceof Error) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div>
      {data?.name} - {data?.alterEgo}
    </div>
  );
}
