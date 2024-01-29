import { lazy } from "solid-js";

export const routes = [
    {
        path: "/card",
        component: lazy(() => import("./card_viewer_test.tsx"))
    },
    {
        path: "/card/print",
        component: lazy(() => import("./print_view.tsx"))
    }
]