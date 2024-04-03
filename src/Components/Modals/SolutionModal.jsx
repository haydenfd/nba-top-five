import React from 'react'
import ReactModal from 'react-modal';
import { Button } from '@nextui-org/react';

ReactModal.setAppElement('#root');

const customStyles = {
    content: {
      top: '35%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      border: '3px solid black',
      borderRadius: '16px',
      maxWidth: '40vw',
      width: '90%',
      boxSizing: 'border-box',
      position:'relative',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)'      
    },
  };

  
export const SolutionModal = ({isOpen, onRequestClose}) => {
  return (
<ReactModal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
  <div className="flex flex-col h-full justify-between">
    <div className="flex text-center justify-center py-1 border-b-4 border-black">
      {/* <div className='w-1/2 bg-yellow-400 text-center'> */}
        <h2 className="text-xl font-bold">Result</h2>
      {/* </div> */}
      <Button onClick={onRequestClose} className="bg-transparent text-lg rounded-full hover:text-red-500 hover:scale-125 absolute top-4 right-4">
        X
      </Button>
    </div>
    <div className="px-4 mb-4 flex-1 flex items-center justify-center">

    </div>
  </div>
</ReactModal>

  )
}

