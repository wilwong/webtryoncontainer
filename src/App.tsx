import React from 'react';
import './App.css';
import ProductView from './components/ProductView/ProductView';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});

function App() {

  const [brand, setBrand] = React.useState("reframd");

  return (
    <div className="App">
      <header className="App-header">
        <ThemeProvider theme={theme}>
          <div className="container">
            <ProductView brand={brand} />
          </div>
        </ThemeProvider>
      </header>
    </div>
  );
}

export default App;
