

export const CalendarEvent = ({event} : any) => {
 
    const { title, user } = event;
  
    return (
        <>
            <strong>{title}</strong>
            <span>&nbsp; {user.name}</span>
        </>
    )
}
