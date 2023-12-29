import { createTheme, ThemeProvider, createPalette } from "@suid/material/styles";
import { Switch, FormControlLabel, Box, Container, AppBar, Toolbar, Typography } from "@suid/material";
import { Router } from "@solidjs/router"
import { routes } from './routes/route_manifest';
import { createSignal, createMemo, onMount } from "solid-js";

export default function App() {

  const [themeMode, setThemeMode] = createSignal<'light' | 'dark'>('dark');

  const palette = createMemo(() => {
    return createPalette({
      mode: themeMode(),
      ...(
        themeMode() === 'light' ?
          {
            primary: {
              main: '#ffc107',
              dark: "#B28704"
            },
            secondary: {
              main: '#2962ff',
            },
            background: {
              paper: "#606060"
            },
            text: {
              primary: "#fff"
            }

          } : {
            primary: {
              main: '#ffc107',
            },
            secondary: {
              main: '#2962ff',
            },
            background: {
              default: "#303030",
              paper: "#424242"
            },
            divider: "#fff"
          }
      )
    });
  });

  const theme = createTheme({
    palette: palette,
    typography: {
      fontFamily: "Roboto"
    }
  });

  // Set background color on first load
  onMount(() => {
    document.body.style.backgroundColor = themeMode() === 'light' ? '#f2f2f2' : '#303030'
  })

  function onClick() {

    setThemeMode((prev) => {
      // update background color when the theme mode changes.
      document.body.style.backgroundColor = prev === 'light' ? '#303030' : '#f2f2f2'
      return (prev === 'light' ? 'dark' : 'light')
    });
  }


  return <Box>
    <ThemeProvider theme={theme}>
      <AppBar position="absolute" color="primary" enableColorOnDark>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>Bat Stats</Typography>
          <FormControlLabel
            control={<Switch color="secondary" checked={themeMode() === "dark"} onMouseDown={onClick} />}
            label="Dark Mode?"
          />
        </Toolbar>
      </AppBar>
      <Box sx={{ marginTop: 10 }}>
        <Router>
          {routes}
        </Router>
      </Box>
    </ThemeProvider>
  </Box>


}
