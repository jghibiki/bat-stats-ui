import { createTheme, ThemeProvider } from "@suid/material/styles";
import { Router } from "@solidjs/router"
import { routes } from './routes/route_manifest';

export default function App() {

  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#ffc107"
      }

    }
  })

  return <ThemeProvider theme={theme}>
    <Router>
      {routes}
    </Router>
  </ThemeProvider>


}
