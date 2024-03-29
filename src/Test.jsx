// import React, { Component } from 'react';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import {Button} from "@nextui-org/react";

// const names = [
//     'LeBron James',
//     'Stephen Curry',
//     'Anthony Davis',
//     'Kyrie Irving',
//     'Giannis Antetokounmpo'
// ]

// const img_url = 'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203507.png'

// // fake data generator
// const getItems = (count, offset = 0) =>
//     Array.from({ length: count }, (v, k) => k).map(k => ({
//         id: `item-${k + offset}`,
//         content: `${names[k + offset]}`
//     }));

// // a little function to help us with reordering the result
// const reorder = (list, startIndex, endIndex) => {
//     const result = Array.from(list);
//     const [removed] = result.splice(startIndex, 1);
//     result.splice(endIndex, 0, removed);

//     return result;
// };

// const nums = [1,2,3,4,5]

// /**
//  * Moves an item from one list to another list.
//  */
// const move = (source, destination, droppableSource, droppableDestination) => {
//     const sourceClone = Array.from(source);
//     const destClone = Array.from(destination);
//     const [removed] = sourceClone.splice(droppableSource.index, 1);

//     destClone.splice(droppableDestination.index, 0, removed);

//     const result = {};
//     result[droppableSource.droppableId] = sourceClone;
//     result[droppableDestination.droppableId] = destClone;

//     return result;
// };

// const handleSubmitClick = () => {
//     alert("Clicked button")
// }


// const getItemStyle = (isDragging, draggableStyle) => ({
//     // some basic styles to make the items look a bit nicer
//     userSelect: 'none',
//     padding: 10,
//     margin: `0 0`,
//     fontSize: '20px',
//     borderBottom: "2px solid black",


//     // change background colour if dragging
//     background: isDragging ? 'lightgreen' : 'grey',

//     // styles we need to apply on draggables
//     ...draggableStyle
// });

// const getNumStyle = () => ({
//     // some basic styles to make the items look a bit nicer
//     userSelect: 'none',
//     padding: 2,
//     margin: `0px 0`,
//     fontSize: '20px',
// });

// const getRankStyle = () => ({
//     background:'lightgrey',
//     width: 100,
//     height: 300,
//     display: "flex",
//     flexDirection: "column",

// });


// const getListStyle = isDraggingOver => ({
//     // background: isDraggingOver ? 'lightblue' : 'lightgrey',
//     background: 'lightgrey',
//     width: 300,
//     height: 300,
//     display: "flex",
//     flexDirection: "column",
//     borderLeft: "2px solid black",
// });

// export class Test extends Component {
//     state = {
//         items: getItems(5),
//         selected: getItems(0),
//     };

//     /**
//      * A semi-generic way to handle multiple lists. Matches
//      * the IDs of the droppable container to the names of the
//      * source arrays stored in the state.
//      */
//     id2List = {
//         droppable: 'items',
//         droppable2: 'selected'
//     };

//     getList = id => this.state[this.id2List[id]];

//     onDragEnd = result => {
//         const { source, destination } = result;

//         // dropped outside the list
//         if (!destination) {
//             return;
//         }

//         if (source.droppableId === destination.droppableId) {
//             const items = reorder(
//                 this.getList(source.droppableId),
//                 source.index,
//                 destination.index
//             );

//             let state = { items };

//             if (source.droppableId === 'droppable2') {
//                 state = { selected: items };
//             }

//             this.setState(state);
//         } else {
//             const result = move(
//                 this.getList(source.droppableId),
//                 this.getList(destination.droppableId),
//                 source,
//                 destination
//             );

//             this.setState({
//                 items: result.droppable,
//                 selected: result.droppable2
//             });
//         }
//     };

//     // Normally you would want to split things out into separate components.
//     // But in this example everything is just done in one place for simplicity
//     render() {
//         return (
//             <div className="w-[90%] flex flex-col items-center mt-12">
//             <DragDropContext onDragEnd={this.onDragEnd}>
//                 <div className='flex flex-row'>
//                 <div style={getRankStyle()}>
//                 {nums.map((item, index) => (
//                     <h2 style={getItemStyle()}>{item}</h2>
//                 ))}
//                 </div>
//                 <Droppable droppableId="droppable">
//                     {(provided, snapshot) => (
//                         <div
//                             ref={provided.innerRef}
//                             style={getListStyle(snapshot.isDraggingOver)}>
//                             {this.state.items.map((item, index) => (
//                                 <Draggable
//                                     key={item.id}
//                                     draggableId={item.id}
//                                     index={index}>
//                                     {(provided, snapshot) => (
//                                         <div
//                                             ref={provided.innerRef}
//                                             {...provided.draggableProps}
//                                             {...provided.dragHandleProps}
//                                             style={getItemStyle(
//                                                 snapshot.isDragging,
//                                                 provided.draggableProps.style
//                                             )}>
//                                             <img src={img_url} width={40} height={50}/>
//                                             <p>{item.content}</p>
//                                         </div>
//                                     )}
//                                 </Draggable>
//                             ))}
//                             {provided.placeholder}
//                         </div>
//                     )}
//                 </Droppable>
//                 {/* <Droppable droppableId="droppable2">
//                     {(provided, snapshot) => (
//                         <div
//                             ref={provided.innerRef}
//                             style={getListStyle(snapshot.isDraggingOver)}>
//                             {this.state.selected.map((item, index) => (
//                                 <Draggable
//                                     key={item.id}
//                                     draggableId={item.id}
//                                     index={index}>
//                                     {(provided, snapshot) => (
//                                         <div
//                                             ref={provided.innerRef}
//                                             {...provided.draggableProps}
//                                             {...provided.dragHandleProps}
//                                             style={getItemStyle(
//                                                 snapshot.isDragging,
//                                                 provided.draggableProps.style
//                                             )}>
//                                             {item.content}
//                                         </div>
//                                     )}
//                                 </Draggable>
//                             ))}
//                             {provided.placeholder}
//                         </div>
//                     )}
//                 </Droppable> */}
//                 </div>
//             </DragDropContext>
//             <div className='py-12 px-48 w-full flex justify-end items-center'>
//                 <Button 
//                 className='p-6 text-lg rounded-none border-4 border-black hover:bg-gray-600 hover:text-white'
//                 onClick={e => handleSubmitClick()}
//                 >
//                     Submit
//                 </Button>  
//             </div>
//             </div>
//         );
//     }
// }

import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Button } from "@nextui-org/react";
import axios from 'axios';


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
    userSelect: 'none',
    padding: 10,
    margin: `0 0`,
    fontSize: '20px',
    borderBottom: "2px solid black",
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
    width: 300,
    height: 300,
    display: "flex",
    flexDirection: "column",
    borderLeft: "2px solid black",
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
    alert(`${n}`)
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

    fetchData()
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
                                                <img src={img_url} width={40} height={50} alt={item.content}/>
                                                <p>{item.content}</p>
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

