import { createBrowserRouter } from "react-router";
import App from "./App";
import MainPage from "./pages/MainPage";
import SavedPage from "./pages/SavedPage";
import NotFound from "./pages/NotFound";
import FilmPage from "./pages/FilmPage";
import AddFilmPage from "./pages/AddFilmPage"
import EditFilmPage from "./pages/EditFilmPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <MainPage /> },
      { path: "/saved", element: <SavedPage /> },
      { path: "/film/:id", element: <FilmPage /> },
      { path: "/add", element: <AddFilmPage /> },
      { path: "/edit_film/:id", element: <EditFilmPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;