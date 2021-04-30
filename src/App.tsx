import React from 'react';
import './App.css';
import ProductView from './components/ProductView';

function App() {

  const [brand, setBrand] = React.useState("reframd");

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <ProductView brand={brand}/>
        </div>
      </header>
    </div>
  );
}

export default App;
