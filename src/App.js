import React, { useMemo } from 'react';
import Router from './Routes'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
// import { IconButton } from '@mui/material';
// import { DarkMode, LightMode } from '@mui/icons-material';

const App = () => {
  // const [darkMode, setDarkMode] = useState(false);

  // const lightTheme = useMemo(() => createTheme({
  //   palette: {
  //     mode: 'light',
  //   },
  // }), []);

  const darkTheme = useMemo(() => createTheme({
    palette: {
      mode: 'dark',
    },
      typography: {
    fontFamily: [
      "Roboto",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
  }), []);

  // const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
          {/* <IconButton
            style={{textAlign:'left'}}
            color="inherit"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <LightMode /> : <DarkMode />}
          </IconButton> */}
      <Router/>
    </ThemeProvider>
  );
};

export default App;