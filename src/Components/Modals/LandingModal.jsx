import React from 'react'
import ReactModal from 'react-modal'
import { Button } from '@nextui-org/react'
import { modalStyle } from './modalStyles';

ReactModal.setAppElement('#root');
  
export const LandingModal = ({isOpen, onRequestClose}) => {
  return (
<ReactModal isOpen={isOpen} onRequestClose={onRequestClose} style={modalStyle}>
  <div className="flex flex-col h-full justify-between">
    <div className="flex text-center justify-center py-1 border-b-4 border-black">
        <h2 className="text-xl font-bold">Result</h2>
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
