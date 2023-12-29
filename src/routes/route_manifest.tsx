import { lazy } from "solid-js";

export const routes = [
    {
        path: "/card",
        component: lazy(() => import("./card_viewer_test.tsx"))
    }
]