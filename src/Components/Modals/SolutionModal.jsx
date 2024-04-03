import React from 'react'
import ReactModal from 'react-modal';
import { Button } from '@nextui-org/react';
import { modalStyle } from './modalStyles';
import { PlayerCard } from '../PlayerCard';

ReactModal.setAppElement('#root');

export const SolutionModal = ({isOpen, onRequestClose, result}) => {
  return (
<ReactModal isOpen={isOpen} onRequestClose={onRequestClose} style={modalStyle}>
  <div className="flex flex-col h-full justify-between">
    <div className="flex text-center justify-center py-1 border-b-4 border-black">
        <h2 className="text-2xl font-bold">Result</h2>
      <Button onClick={onRequestClose} className="bg-transparent text-lg rounded-full hover:text-red-500 hover:scale-125 absolute top-4 right-4">
        X
      </Button>
    </div>
    <div className='mt-4'>
      <h1 className='text-center text-2xl font-bold text-green-400'>Correct: {result[1]}/5</h1>
      <h1 className='text-yellow-500 text-center text-2xl font-bold'>Off by 1 position: {result[2]}/5</h1>

    </div>
    <div className="px-4 mt-4 flex-1 flex flex-col items-center justify-center w-full space-y-2 ">
      <h1 className='text-center text-2xl font-bold text-black mb-2'>Solution</h1>
      {
        result[0].map((item, idx) => (
          <div key={idx} className={`p-2 border-2 border-black w-full ${item.correctness === 0? 'bg-green-400' : (item.correctness === 1? 'bg-yellow-500' : 'bg-red-500') } `} >
            <PlayerCard name={item.name} id={item.id} />
          </div>
        ))
      }
    </div>
  </div>
</ReactModal>

  )
}

