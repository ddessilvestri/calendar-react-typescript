import { createSlice } from "@reduxjs/toolkit";
import { addHours } from 'date-fns';

const tempEvent = {
    _id:new Date().getTime(),
    title: 'Evento 1',
    notes: 'Nota 1',
    start: new Date(),
    end: addHours(new Date(),1),
    bgColor: '#fafafa',
    user:{
      _id:123,
      name: 'David'
    }
}


export const calendarSlice= createSlice({
    name:'calendar',
    initialState:{
        events:[
            tempEvent
        ],
        activeEvent: { _id: null }
    },
    reducers:{
       onSetActiveEvent: (state, {payload}) =>{
            state.activeEvent = payload;
       },
       onAddNewEvent: (state, { payload }) =>{
            state.events.push( payload );
            state.activeEvent =  { _id: null };
       },
       onUpdateEvent(state, {payload}){
            state.events = state.events.map( event => {
                if (event._id === payload._id){
                    return payload;
                }
                return event;
            });
       },
       onDeleteEvent: (state) =>{
            if (state.activeEvent){
                state.events = state.events.filter( event => event._id !== state.activeEvent?._id );
                state.activeEvent =  { _id: null }
            }
       },
    }
});

export const { 
    onSetActiveEvent,
    onAddNewEvent,
    onUpdateEvent,
    onDeleteEvent
 } = calendarSlice.actions;