import React from 'react';
import './App.css';
import { Test } from './Test';
import { Trial } from './Components/Trial';
function App() {
  return (
    <div className="App">
      <div className='bg-red-400 w-full p-2'>
        <h1 className='font-bold text-3xl'>NBA Top 5</h1>
      </div>
      <p className='w-full font-normal text-xl mt-10 text-center bg-red-400'>Guess the correct ordering of the following player's PPG stats from most to least. You get 2 chances to submit the correct ordering!</p>
      <Trial></Trial>
      {/* <Body /> */}
    </div>
  );
}

export default App;
