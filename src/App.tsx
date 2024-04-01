import React from 'react';
import './App.css';
import { Trial } from './Components/Trial';
function App() {
  return (
    <div className="App">
      <div className='bg-yellow-600 w-full p-2 text-white'>
        <h1 className='font-semibold text-5xl'>NBA Top 5</h1>
      </div>
      <p className='w-full font-normal text-xl mt-10 text-center text-white'>Guess the correct ordering of the following player's PPG stats from most to least. You get 2 chances to get all 5 right!</p>
      <Trial></Trial>
    </div>
  );
}

export default App;
