import { useParams, useLocation } from "react-router";

export default function FilmPage() {
  const param = useParams();
  const location = useLocation();

  console.log(param);
  console.log(location);

  return (
    <div>
      <h1>Страница фильма {param.id}</h1>
    </div>
  );
}