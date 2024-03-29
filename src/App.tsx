import React from 'react';
import './App.css';
import { Test } from './Test';
import { Drag } from './Drag';
function App() {
  return (
    <div className="App">
      <div className='bg-red-400 w-full p-2'>
        <h1 className='font-bold text-3xl'>NBA Top 5</h1>
      </div>
      <p className='w-full font-thin text-lg mt-10'>Guess the correct ordering of player's PPG from 1 (most) to 5 (least)</p>
      <Drag></Drag>
      {/* <Body /> */}
    </div>
  );
}

export default App;
