import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import AddNewProduct from "./pages/AddNewProduct";
import UpdateExistingProduct from "./pages/UpdateExistingProduct";
import { Provider } from "react-redux";
import store from "./redux-toolkit/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/get-products",
        element: <Products />,
      },
      {
        path: "/add-product",
        element: <AddNewProduct />,
      },
      {
        path: "/update-product/:id",
        element: <UpdateExistingProduct />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
