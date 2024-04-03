import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Button, Spinner } from '@nextui-org/react';
import axios from 'axios';
import { server_url } from '../utils/api';
import { PlayerCard } from './PlayerCard';
import {countCorrectGuesses} from '../utils/scoring'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { toastStyles } from './styleUtils';
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";
import './Trial.css'
import { SolutionModal } from './Modals/SolutionModal';

  
const grid = 8;
const itemHeight = 100; // Adjust this based on your PlayerCard height
const maxItems = 5;
// const containerPadding = 4;
const calculatedHeight = (itemHeight) * maxItems;

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    padding: grid,
    // margin: `0 0 ${grid}px 0`,
    margin: `0 0 4px 0`,
    background: isDragging ? 'lightgreen' : 'white',
    border: "2px solid black",
    ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: '100%',
    height: `${calculatedHeight - 120}px`, // Static height based on calculation
    overflowY: 'auto', // Allows scrolling within the container
});


export const Trial = () => 
{
    
    const [items, setItems] = useState(null);
    const [selected, setSelected] = useState([]);
    const [originalSnapshot, setOriginalSnapshot] = useState([]);
    const [correctOrder, setCorrectOrder] = useState([]);
    const [attempts, setAttempts] = useState(0);
    const [solutionModalIsOpen, setSolutionModalIsOpen] = useState(false);

    const openSolutionModal = () => setSolutionModalIsOpen(true);
    const closeSolutionModal = () => setSolutionModalIsOpen(false);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {

        if (attempts === 0) {
            return;
        }

        let correctGuesses = countCorrectGuesses(selected, correctOrder, false)

        if (correctGuesses === 5) {
            openSolutionModal() // show that user has finished game
            return;
        }

        if (attempts === 1) {
            SendCorrectGuessNotification(correctGuesses)
            return;
        }
        
        if (attempts === 2) {
            openSolutionModal() // signal end of game
            console.log('Done')
        }
      }, [attempts]); // This effect depends on `attempts`
      
      const handleSubmitClick = () => {
        if (selected.length !== 5) {
          SendInvalidSubmissionNotification();
          return;
        }
      
        setAttempts(attempts => attempts + 1);
      };
      
    const handleResetClick = () => {
        setSelected([]);
        setItems(originalSnapshot);
    };

    const fetchData = async () => {
        let response = await axios(server_url);
        let correct_data = response.data.correct_order
        response = response.data.data;
        let result = response.map(player => ({
            id: player.PLAYER_ID.toString(),
            name: player.PLAYER_NAME,
        }));

        setItems(result);
        setOriginalSnapshot(result);

        let correct = correct_data.map(player => ({
            id: player.PLAYER_ID.toString(),
            name: player.PLAYER_NAME,
            ppg: player.PPG
        }))

        setCorrectOrder(correct);

    };

    const SendCorrectGuessNotification = (correctGuesses) => {
        toast(`You have made ${correctGuesses} correct ${correctGuesses === 1? 'guess' : 'guesses'}`, 
        toastStyles
        )}

    const SendInvalidSubmissionNotification = () => {
        toast(`Rank each player before submitting!`, toastStyles
        )}

    const ResetGameState = () => {

    }

    const onDragEnd = result => {
        const { source, destination } = result;
    
        // Exit if dropped outside any droppable area
        if (!destination) return;
    
        // Destructuring for clarity
        const srcIndex = source.index;
        const destIndex = destination.index;
        const srcDroppableId = source.droppableId;
        const destDroppableId = destination.droppableId;
    
        // Moving within the same list
        if (srcDroppableId === destDroppableId) {
            const list = srcDroppableId === 'droppable' ? [...items] : [...selected];
            const [removed] = list.splice(srcIndex, 1);
            list.splice(destIndex, 0, removed);
    
            srcDroppableId === 'droppable' ? setItems(list) : setSelected(list);
        } else {
            // Moving between lists
            const sourceList = srcDroppableId === 'droppable' ? [...items] : [...selected];
            const destList = destDroppableId === 'droppable' ? [...items] : [...selected];
            const [removed] = sourceList.splice(srcIndex, 1);
            destList.splice(destIndex, 0, removed);
    
            if (srcDroppableId === 'droppable') {
                setItems(sourceList);
                setSelected(destList);
            } else {
                setItems(destList);
                setSelected(sourceList);
            }
        }
    };
    
    if (items === null) {
        return <Spinner size='lg' label='Loading...' color='primary' className='mt-[20vh]' 
        classNames={{
            base: 'scale-[200%]',
            label: 'text-white',
        }}/>;
    }

    return (
        <>
        <h3 className='text-blue-600 font-bold mt-4'>Attempts: {attempts} / 2</h3>
        <div className='w-full flex flex-col items-center space-y-10 mt-10'>
 {/* might need to fix here*/}
            <div className='w-2/3 flex flex-row justify-around px-4 py-2'>
                <DragDropContext onDragEnd={onDragEnd}>
                   
                   <div className='w-1/3 flex-nowrap'>
                        <div className='font-lg font-bold text-white w-full'>Player List</div>
                        <Droppable droppableId="droppable">
                            {(provided, snapshot) => (
                                <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                                    {items.map((item, index) => (
                                        <Draggable key={item.id} draggableId={item.id} index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                                                    <PlayerCard name={item.name} id={item.id} />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
        
                    <div className='w-1/3 flex-nowrap'>
                    <div className='font-lg font-bold text-white'>Guess List</div>
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
                                                <PlayerCard name={item.name} id={item.id} />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
                </DragDropContext>
            </div>
            <div className='w-4/5'>
            <div className="flex items-center gap-4 flex-wrap text-center justify-center"> {/* Ensure both elements are inline and centered */}
                <h1 className="text-white text-2xl">Your ranking:</h1>

                { selected.length === 0? (<p className='text-normal text-white text-2xl'> &lt; No players ranked yet &gt; </p>) : (<div className="flex flex-col flex-wrap gap-4">
                    <Breadcrumbs isDisabled size="lg" separator="->">
                        {selected.map((item, index) => (
                            <BreadcrumbItem key={index} size='lg' isCurrent={false} classNames={{
                                item: "text-white text-2xl",
                                separator: "text-white"
                            }}>
                                {item.name}
                            </BreadcrumbItem>
                        ))}
                    </Breadcrumbs>
                </div>)
                }
            </div>
</div>

            <div className='w-3/4 mt-20 flex justify-center items-center'>
                { attempts === 2? (
                    <>
                <Button
                    className='p-6 text-lg rounded-none border-4 border-black hover:bg-gray-600 hover:text-white mr-8'
                    onClick={() => setSolutionModalIsOpen(true)}>
                    Show Solution
                </Button>
                <Button
                    className='p-6 text-lg rounded-none border-4 border-black hover:bg-gray-600 hover:text-white'
                    onClick={ResetGameState}>
                    Next Game
                </Button>
                </>
                ) : (
                    <>
                <Button
                    className='p-6 text-lg rounded-none border-4 border-black hover:bg-gray-600 hover:text-white mr-8'
                    onClick={handleResetClick}>
                    Reset
                </Button>
                <Button
                    className='p-6 text-lg rounded-none border-4 border-black hover:bg-gray-600 hover:text-white'
                    onClick={handleSubmitClick}>
                    Submit
                </Button>
                </>
                )
            }
                
            </div>
            <ToastContainer  className="toastClass" progressClassName="toastProgress" bodyClassName="toastBody"/>
            <SolutionModal isOpen={solutionModalIsOpen} onRequestClose={closeSolutionModal} />
        </div>
        </>
    );
};
