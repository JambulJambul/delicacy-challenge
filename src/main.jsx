import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Homepage from "./pages/Homepage/index.jsx";
import DetailPage from "./pages/Details/index.jsx";
import FavoritePage from "./pages/Favorite/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/:strCategory",
    element: <Homepage />,
  },
  {
    path: "/details/:idMeal",
    element: <DetailPage/>,
  },
  {
    path: "/favorites",
    element: <FavoritePage/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);