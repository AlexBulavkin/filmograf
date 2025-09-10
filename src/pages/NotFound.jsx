import { useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Не найдено</h1>
      <button onClick={() => navigate("/")}>Вернуться на главную</button>
    </div>
  );
}
