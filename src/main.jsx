import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Root from "./routes/root";
import Map from "./routes/map"
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "map",
                element: <Map />,
            },
        ],
    },
    {
        path: "/map",
        element: <Map />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);