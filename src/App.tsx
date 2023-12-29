import { createTheme, ThemeProvider, createPalette } from "@suid/material/styles";
import { Button, Box, Container } from "@suid/material";
import { Router } from "@solidjs/router"
import { grey } from "@suid/material/colors";
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
              default: "#000",
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

  const theme = createTheme({ palette: palette });

  // Set background color on first load
  onMount(() => {
    document.body.style.backgroundColor = themeMode() === 'light' ? '#fff' : '#303030'
  })

  function onClick() {

    setThemeMode((prev) => {
      // update background color when the theme mode changes.
      document.body.style.backgroundColor = prev === 'light' ? '#303030' : '#fff'
      return (prev === 'light' ? 'dark' : 'light')
    });
  }


  return <Box>
    <ThemeProvider theme={theme}>
      <Button onClick={onClick} color="primary" variant="contained">Toggle</Button>
      <Container>
        <Router>
          {routes}
        </Router>
      </Container>
    </ThemeProvider>
  </Box>


}
