import { useSelector, useDispatch } from 'react-redux';
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent, onDeleteEvent } from '../store';

interface ICalendarEvent {
  _id: number | null;
  title: string,
  notes: string,
  start: Date,
  end: Date,
  bgColor: string,
  user:{
    _id: number | null,
    name: string | null,
  }
}



export const useCalendarStore = () => {
    const dispatch = useDispatch()

    const { events, activeEvent } = useSelector((state:any)=> state.calendar);

    const setActiveEvent = ( calendarEvent:{} ) =>{
      dispatch(onSetActiveEvent(calendarEvent));
    }

    const startSavingEvent = async( calendarEvent:ICalendarEvent ) => {

      if (calendarEvent._id){
        dispatch(onUpdateEvent({...calendarEvent}));

      } else {
        dispatch(onAddNewEvent({...calendarEvent, _id: new Date().getTime()}));
      }
    }

    const startDeleteingEvent = async() =>{
      dispatch(onDeleteEvent())
    }
  
    return {
      // * Properties
      activeEvent,
      events,
      hasEventSelected: !!activeEvent._id,
    
      
      // * Methods
      setActiveEvent,
      startSavingEvent,
      startDeleteingEvent,

    }
}
