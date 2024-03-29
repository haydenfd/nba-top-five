import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Button } from "@nextui-org/react";
import axios from 'axios';
import { PlayerCard } from './Components/PlayerCard';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const nums = [1,2,3,4,5];

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};



const getItemStyle = (isDragging, draggableStyle) => ({
    // userSelect: 'none',
    // padding: 10,
    // margin: `0 0`,
    // fontSize: '20px',
    // borderBottom: "2px solid black",
    background: isDragging ? 'lightgreen' : 'grey',
    ...draggableStyle
});

const getRankStyle = () => ({
    background:'lightgrey',
    width: 100,
    height: 300,
    display: "flex",
    flexDirection: "column",
});

const getListStyle = isDraggingOver => ({
    background: 'lightgrey',
    width: 240,
    height: 300,
    display: "flex",
    flexDirection: "column",
});

export const Test = () => {

const names = [
    'LeBron James',
    'Stephen Curry',
    'Anthony Davis',
    'Kyrie Irving',
    'Giannis Antetokounmpo'
];

const [n, setN] = useState(null)

const handleSubmitClick = () => {
    let result = []
    const generateResponse = () => {
        for (let i = 0; i < items.length; ++i) {
            result.push(items[i].content)
        }
    }
    generateResponse()
    alert(`${result}`)
};

useEffect(() => {

    const fetchData = async () => {
        
        const response = await axios('http://localhost:8000/')
        const x = response.data.data
        let res = []
        // for (let p in x ) {
        //     console.log(p['PLAYER_NAME'])
        // }
        for (let y = 0; y < x.length; y++) {
            res.push(x[y].PLAYER_NAME)
        }

        setN(res)
    }

    // fetchData()
}, [])

const img_url = 'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203507.png';

// fake data generator
const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        content: `${names[k + offset]}`
    }));
    
    const [items, setItems] = useState(getItems(5));
    const [selected, setSelected] = useState(getItems(0));

    

    const id2List = {
        droppable: 'items',
        droppable2: 'selected'
    };

    const getList = id => id === 'droppable' ? items : selected;

    const onDragEnd = result => {
        const { source, destination } = result;

        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                getList(source.droppableId),
                source.index,
                destination.index
            );

            if (source.droppableId === 'droppable2') {
                setSelected(items);
            } else {
                setItems(items);
            }
        } else {
            const result = move(
                getList(source.droppableId),
                getList(destination.droppableId),
                source,
                destination
            );

            setItems(result.droppable);
            setSelected(result.droppable2);
        }
    };

    return (
        <div className="w-[90%] flex flex-col items-center mt-12">
            <DragDropContext onDragEnd={onDragEnd}>
                <div className='flex flex-row'>
                    <div style={getRankStyle()}>
                        {nums.map((item, index) => (
                            <h2 key={index} style={getItemStyle(false)}>{item}</h2>
                        ))}
                    </div>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}>
                                {names && items.map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}>
                                                <PlayerCard />
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
            
            <div className='py-12 px-48 w-full flex justify-end items-center'>
                <Button 
                className='p-6 text-lg rounded-none border-4 border-black hover:bg-gray-600 hover:text-white'
                onClick={handleSubmitClick}
                >
                    Submit
                </Button>  
            </div>
        </div>
    );
}

