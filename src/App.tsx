import React from 'react';
import './App.css';
import ProductView from './components/ProductView/ProductView';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';

// import FormControl from '@material-ui/core/FormControl';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: blue[400],
    },
    secondary: {
      main: green[500],
    },
  },
});

const brands = [
  {title: "My LooC", term: "loocfun", subfolder: "loocfun/fs"},
  {title: "Reframd", term: "reframd", subfolder: "reframd"},
  {title: "DOM VETRO", term: "domvetro", subfolder: "domvetro"},
]

function App() {
  const classes = useStyles();

  // const [brand, setBrand] = React.useState<string | undefined>(undefined);
  const brand = brands[1].subfolder
  // const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
  //   setBrand(event.target.value as string);
  // };

  return (
    <div className="App">
      <header className="App-header">
        <ThemeProvider theme={theme}>
          <div className="container">
            <ProductView brand={brand} subfolder={ brands.find( b => b.term === brand)?.subfolder || 'loocfun'} />
            {/*brand
              ?
              <ProductView brand={brand} subfolder={ brands.find( b => b.term === brand)?.subfolder || 'loocfun'} />
              :
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Brand</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={brand}
                  onChange={handleSelectChange}
                >
                  <MenuItem value={undefined}>None</MenuItem>
                  {brands.map( brand =>
                    <MenuItem key={brand.term} value={brand.term}>{ brand.title }</MenuItem>
                  )}
                </Select>
              </FormControl>
                  */}
            
          </div>
        </ThemeProvider>
      </header>
    </div>
  );
}

export default App;
