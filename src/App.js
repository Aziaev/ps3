import React, { useState } from 'react';
import './App.css';
import { Table } from './Table';

function App() {
  const [opened, setOpened] = useState(false);

  return (
    <div className="App">
      <div className="App-body">
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
      </div>
    </div>
  );
}

export default App;
