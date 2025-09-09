import { createBrowserRouter } from "react-router";
import App from "./App";
import MainPage from "./pages/MainPage";
import SavedPage from "./pages/SavedPage";
import NotFound from "./pages/NotFound";
import FilmPage from "./pages/FilmPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <MainPage /> },
      { path: "/saved", element: <SavedPage /> },
      { path: "/film/:id", element: <FilmPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;