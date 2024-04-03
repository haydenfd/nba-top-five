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
        <h2 className="text-xl font-bold">Result</h2>
      <Button onClick={onRequestClose} className="bg-transparent text-lg rounded-full hover:text-red-500 hover:scale-125 absolute top-4 right-4">
        X
      </Button>
    </div>
    <div>
      <h1>One off: {result[2]}</h1>
      <h1>Exact: {result[1]}</h1>

    </div>
    <div className="px-4 mt-4 flex-1 flex flex-col items-center justify-center w-full space-y-2 ">
      {
        result[0].map((item, idx) => (
          <div className='p-2 border-2 border-black w-full bg-green-400'>
            <PlayerCard name={item.name} id={item.id} />
          </div>
        ))
      }
    </div>
  </div>
</ReactModal>

  )
}

