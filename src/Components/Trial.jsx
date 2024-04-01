import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Button, Spinner } from '@nextui-org/react';
import axios from 'axios';
import { server_url } from '../utils/api';
import { PlayerCard } from './PlayerCard';
import {countCorrectGuesses} from '../utils/scoring'
import { ToastContainer, toast, Slide } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const grid = 8;
const itemHeight = 100; // Adjust this based on your PlayerCard height
const maxItems = 5;
// const containerPadding = 4;
const calculatedHeight = (itemHeight) * maxItems;

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    padding: 2*grid,
    // margin: `0 0 ${grid}px 0`,
    margin: `0 0 2px 0`,
    background: isDragging ? 'lightgreen' : 'white',
    border: "2px solid black",
    ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: 100,
    height: `${calculatedHeight}px`, // Static height based on calculation
    overflowY: 'auto', // Allows scrolling within the container
});

export const Trial = () => {
    const [items, setItems] = useState(null);
    const [selected, setSelected] = useState([]);
    const [originalSnapshot, setOriginalSnapshot] = useState([]);
    const [correctOrder, setCorrectOrder] = useState([]);
    const [attempts, setAttempts] = useState(0);

    const handleSubmitClick = () => {
        if (selected.length !== 5) {
            SendInvalidSubmissionNotification()
        }

        else {
            setAttempts(attempts => attempts + 1)
            let correctGuesses = countCorrectGuesses(selected, correctOrder, false)

            if (correctGuesses !== 5) {
                SendCorrectGuessNotification(correctGuesses);
            }
            // alert(`${countCorrectGuesses(selected, correctOrder, false)} this is the correct list: ${correctOrder[0].name}, ${correctOrder[1].name}, ${correctOrder[2].name}, ${correctOrder[3].name}, ${correctOrder[4].name}`);
        }
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

    useEffect(() => {
        fetchData();
    }, []);

    const SendCorrectGuessNotification = (correctGuesses) => {
        toast(`You have made ${correctGuesses} correct guesses!`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
            transition: Slide,
        })
    }

    const SendInvalidSubmissionNotification = () => {
        toast(`Rank each player before submitting!`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
            transition: Slide,
        })
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
        return <Spinner size='lg' label='Loading...' color='primary' className='scale-[200%] mt-[20vh]' />;
    }

    return (
        <>
        <h3 className='text-white font-bold mt-4'>Attempts: {attempts} / 2</h3>
        <div className='w-full flex flex-col items-center space-y-10 mt-10'>
            <div className='w-[80vw] flex flex-row justify-between px-4 py-2'>
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className='font-lg font-bold'>Player List</div>
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
                                                <PlayerCard name={item.name} id={item.id} />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <div className='font-lg font-bold'>Guess List</div>
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
                </DragDropContext>
            </div>
            <div className='py-12 px-48 w-full flex justify-end items-center'>
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
            </div>
            <ToastContainer />
        </div>
        </>
    );
};
