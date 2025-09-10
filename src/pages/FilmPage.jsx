import { useParams } from "react-router";

export default function FilmPage() {
  const param = useParams();
  return (
    <div>
      <h1>Страница фильма {param.id}</h1>
    </div>
  );
}