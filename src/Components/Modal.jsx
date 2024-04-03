import React from 'react';
import ReactModal from 'react-modal';

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
ReactModal.setAppElement('#root');


export function CustomModal({ isOpen, onRequestClose }) {
  return (
    <ReactModal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <h2>Custom Modal Title</h2>
      <p>This is some basic text inside the custom modal.</p>
      <button onClick={onRequestClose} style={{ marginTop: '20px' }}>Close Modal</button>
    </ReactModal>
  );
}

