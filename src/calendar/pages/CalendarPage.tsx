
import { Calendar, View } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from 'date-fns';

import { Navbar, CalendarEvent, CalendarModal } from '../';

import { localizer, getMessagesES } from '../../helpers';
import { useState } from 'react';


const event = [{
  title: 'Cumpleaños del Jefe',
  notes: 'Comprar torta',
  start: new Date(),
  end: addHours(new Date(),1),
  bgColor: '#fafafa',
  user:{
    _id:123,
    name: 'Dave'
  }
}];

export const CalendarPage = () => {

  const [lastView, setLastView] = useState<String>(localStorage.getItem('lastView') || 'week' );

  const eventStyleGetter:any = (event:any, start:Date, end:Date, isSelected:Boolean ) => { 

    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
    }

    return {
      style
    }
  };

  const onDoubleClick = (event:any) =>{
    console.log({doubleClick : event});
  };

  
  const onSelect = (event:any) =>{
    console.log({click : event});
  };

  const onViewChanged = ( event:any ) =>{
    localStorage.setItem('lastView',event);
    setLastView(event);
  };

  return (    
    <>
      <Navbar/>

      <Calendar
        culture='es'
        localizer={localizer}
        events={event}
        defaultView={lastView as any}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 130px)' }} 
        messages = {getMessagesES()}
        eventPropGetter = { eventStyleGetter }
        components = {{
          event: CalendarEvent
        }}
        onDoubleClickEvent = {onDoubleClick}
        onSelectEvent = {onSelect}
        onView = {onViewChanged}
        />
        <CalendarModal/>
      
    </>
  )
}
