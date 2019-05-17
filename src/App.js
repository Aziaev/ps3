import React, { useState } from 'react';
import './App.css';
import { Table } from './Table';

function App() {
  const [opened, setOpened] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        {opened ?
          <Table
            onClick={() => setOpened(!opened)}
            opened={opened}
          /> :
          <button
            className="App-button"
            onClick={() => setOpened(!opened)}
          >
            Start
          </button>
          }
      </header>
    </div>
  );
}

export default App;
