import React from 'react';
import './App.css';
import Body from './Components/Body/Body';
import { Test } from './Test';

function App() {
  return (
    <div className="App">
      <div className='bg-red-400 w-full mt-10 p-2'>
        <h1>NBA Top 5</h1>
      </div>
      <Test />
      {/* <Body /> */}
    </div>
  );
}

export default App;
