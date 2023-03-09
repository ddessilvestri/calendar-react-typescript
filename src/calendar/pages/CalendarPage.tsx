
import { Calendar, View } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Navbar, CalendarEvent, CalendarModal,FabAddNew, FabDelete } from '../';

import { localizer, getMessagesES } from '../../helpers';
import { useState } from 'react';
import { useUIStore, useCalendarStore } from '../../hooks';

export const CalendarPage = () => {

  const { openDateModal} = useUIStore();
  const { events, setActiveEvent } = useCalendarStore();

  
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
    openDateModal();
  };

  
  const onSelect = (event:any) =>{
    setActiveEvent(event);
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
        events={events}
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
        <FabAddNew />
        <FabDelete/>
    </>
  )
}
