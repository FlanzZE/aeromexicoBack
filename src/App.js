import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import HarryPotter from './assets/HarryPotter.svg'
import background from './assets/Background.png'
import { Filters, Characters, Favorites } from './components';

function App() {
  return (
    <div
      className="App">
      <header className="App-header">
        <Favorites />
      </header>
      <main className="main">
        <img src={HarryPotter} className="App-logo" alt="logo" />
        <h1>Selecciona tu filtro</h1>
        <Filters />
        <div className="charactersContainer">
          <Characters />
        </div>
      </main>
    </div>
  );
}

export default App;
