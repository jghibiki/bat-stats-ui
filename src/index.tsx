/* @refresh reload */
import { render } from "solid-js/web";
import { Router } from "@solidjs/router"
import App from "./App";
import { routes } from './routes/route_manifest';


render(() =>
    <App />,
    document.getElementById("root")!);
