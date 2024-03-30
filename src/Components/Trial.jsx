// import React from 'react'
// import { useState, useEffect } from 'react'
// import { server_url } from '../utils/api'
// import axios from 'axios'
// import { Spinner } from '@nextui-org/react';
// import { PlayerCard } from './PlayerCard';
// import {
//     Draggable, 
//     Droppable,
//     DragDropContext,
// } from 'react-beautiful-dnd';

// const data = [
//     {
//         id: 'gary',
//         name: 'Gary Goodspeed',
//     },
//     {
//         id: 'cato',
//         name: 'Gary Goodspeed',
//     },
//     {
//         id: 'cato',
//         name: 'Little Cato',
//     },
// ]
// // const extractPlayerNames = (list) => {
// //     let result = []
// //     list.forEach(player => {
// //         result.push(player.PLAYER_NAME)
// //     })

// //     return result
// // }
// // export const Trial = () => {

// //  const [original, setOriginal] = useState(null)
// // //  const [guesses, setGuesses] = useState(null)

// //  // ondragend reorders if dropping in same col or makes necessary adjustments when moving between columns

// //  useEffect(() => 
// //  {
// //     let fetchPlayerNames = async () => {
// //         let axios_response = await axios(server_url)
// //         let playerNameList = extractPlayerNames(axios_response.data.data)
// //         setOriginal(playerNameList)
// //     }
// //     fetchPlayerNames()
// //  }, [])
// //   return (
// //     <div>
// //       {original ? (
// //         <div className='mt-10 w-[80vw] bg-blue-200 space-x-[20%] flex flex-row justify-around items-stretch flex-wrap'>
// //             <DragDropContext onDragEnd={result => console.log(result)}>

// //             </DragDropContext>
// //         </div>
           
// //  ) : (
// //         <Spinner size='lg' label='Loading...' color='primary' className='scale-200 mt-10'/>
// //       )}
// //     </div>
// //   );
// // }

// const extractPlayerNames = (list) => {
//   return list.map(player => ({
//     id: player.id.toString(), // Assuming each player has a unique ID
//     name: player.PLAYER_NAME,
//   }));
// };

// export const Trial = () => {
//   const [original, setOriginal] = useState([]);
//   const [guesses, setGuesses] = useState([]);

//   useEffect(() => {
//     const fetchPlayerNames = async () => {
//       const response = await axios.get(server_url);
//       const playerNameList = extractPlayerNames(response.data.data);
//       setOriginal(playerNameList);
//     };
//     fetchPlayerNames();
//   }, []);

//   const onDragEnd = (result) => {
//     const { source, destination } = result;

//     // Do nothing if dropped outside the list or back to the same position
//     if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
//       return;
//     }

//     let add, active = original, complete = guesses;

//     // Removing item from previous list
//     if (source.droppableId === 'original') {
//       [add] = active.splice(source.index, 1);
//     } else {
//       [add] = complete.splice(source.index, 1);
//     }

//     // Adding item to new list
//     if (destination.droppableId === 'original') {
//       active.splice(destination.index, 0, add);
//     } else {
//       complete.splice(destination.index, 0, add);
//     }

//     setOriginal(active);
//     setGuesses(complete);
//   };

//   return (
//     <div>
//       {data ? (
//         <DragDropContext onDragEnd={onDragEnd}>
//           <div className='mt-10 w-[80vw] bg-blue-200 space-x-[20%] flex flex-row justify-around items-stretch flex-wrap'>
//             <Droppable droppableId="original">
//               {(provided) => (
//                 <div className='w-1/2 bg-red-400' ref={provided.innerRef} {...provided.droppableProps}>
//                   {data.map((player, index) => (
//                     <Draggable key={player.id} draggableId={player.id} index={index}>
//                       {(provided) => (
//                         <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
//                           <PlayerCard />
//                         </div>
//                       )}
//                     </Draggable>
//                   ))}
//                   {provided.placeholder}
//                 </div>
//               )}
//             </Droppable>

//             <Droppable droppableId="guesses">
//               {(provided) => (
//                 <div className='w-1/2 bg-green-400' ref={provided.innerRef} {...provided.droppableProps}>
//                   {guesses.map((player, index) => (
//                     <Draggable key={player.id} draggableId={player.id} index={index}>
//                       {(provided) => (
//                         <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
//                           <PlayerCard player={player} />
//                         </div>
//                       )}
//                     </Draggable>
//                   ))}
//                   {provided.placeholder}
//                 </div>
//               )}
//             </Droppable>
//           </div>
//         </DragDropContext>
//       ) : (
        // <Spinner size='lg' label='Loading...' color='primary' className='scale-200 mt-10'/>
//       )}
//     </div>
//   );
// };
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Button, Spinner } from '@nextui-org/react';
import { server_url } from '../utils/api';
import axios from 'axios';
import { PlayerCard } from './PlayerCard';


const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    background: isDragging ? 'lightgreen' : 'grey',
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: 250
});

    // new Promise(resolve => {
    //     setTimeout(() => {
    //         resolve([
    //             { id: 'gary', name: 'Gary Goodspeed' },
    //             { id: 'kvn', name: 'KVN' },
    //             { id: 'cato', name: 'Little Cato' },
    //         ]);
    //     }, 4000); // Simulating network request delay
    // });

export const Trial = () => {
    const [items, setItems] = useState(null);
    const [selected, setSelected] = useState([]);
    const [originalSnapshot, setOriginalSnapshot] = useState([])

    const handleSubmitClick = () => {
        let result = []
        for (let x = 0; x < selected.length; ++x) {
            result.push(selected[x].name)
        }

        alert(`${result.join(',')}`)
    }


    const handleResetClick = () => {
        setSelected([])
        setItems(originalSnapshot)

    }

const fetchData = async () =>{

    let response = await axios(server_url)
    response = response.data.data
    let result = []
    for (let idx = 0; idx < response.length; ++idx) {
        const object = {
            "id": response[idx].PLAYER_ID,
            "name": response[idx].PLAYER_NAME
        }
        result.push(object)
    }

    setItems(result)
    setOriginalSnapshot(result)
}

    // Fetching data asynchronously on component mount
    useEffect(() => {
        fetchData()
    }, []);

    const onDragEnd = result => {
        const { source, destination } = result;
    
        // Nothing happens if dropped outside a droppable area or if the item is returned to its original position
        if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
            return;
        }
    
        // Handling reordering within the same list
        if (source.droppableId === destination.droppableId) {
            const itemsCopy = Array.from(source.droppableId === 'droppable' ? items : selected);
            const [reorderedItem] = itemsCopy.splice(source.index, 1);
            itemsCopy.splice(destination.index, 0, reorderedItem);
    
            // Updating state based on which list was affected
            if (source.droppableId === 'droppable') {
                setItems(itemsCopy);
            } else {
                setSelected(itemsCopy);
            }
        } else {
            // Handling moving between lists
            const sourceClone = Array.from(source.droppableId === 'droppable' ? items : selected);
            const destClone = Array.from(destination.droppableId === 'droppable' ? items : selected);
            const [removed] = sourceClone.splice(source.index, 1);
    
            destClone.splice(destination.index, 0, removed);
    
            // Updating state for both lists
            if (source.droppableId === 'droppable') {
                setItems(sourceClone);
                setSelected(destClone);
            } else {
                setItems(destClone);
                setSelected(sourceClone);
            }
        }
    };
    

    if (items === null) {
        return <Spinner size='lg' label='Loading...' color='primary' className='scale-[150%] mt-[20vh]'/>;
    }


    return (
        <div className='w-full flex flex-col items-center space-y-10 mt-10'>
        <div className='w-[80vw] flex flex-row bg-red-400 justify-between px-4 py-2'>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)} className="flex-1">
                            {items.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                                            <PlayerCard name={item.name} id={item.id}/>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                <div style={{ width: '20px' }}></div> {/* Optional gap */}
                <Droppable droppableId="droppable2">
                    {(provided, snapshot) => (
                        <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)} className="flex-1">
                            {selected.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                                            <PlayerCard name={item.name} id={item.id}/>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
        <div className='py-12 px-48 w-full flex justify-end items-center'>
        <Button 
            className='p-6 text-lg rounded-none border-4 border-black hover:bg-gray-600 hover:text-white mr-8'
            onClick={() => handleResetClick()}
            >
                Reset
            </Button>  
            <Button 
            className='p-6 text-lg rounded-none border-4 border-black hover:bg-gray-600 hover:text-white'
            onClick={() => handleSubmitClick()}
            >
                Submit
            </Button>  
        </div>
        </div>
    );
};
