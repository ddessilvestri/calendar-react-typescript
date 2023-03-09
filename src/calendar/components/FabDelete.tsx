
import { useCalendarStore,useUIStore } from '../../hooks';

export const FabDelete = () => {

  const {  startDeleteingEvent, hasEventSelected } = useCalendarStore()
  const { isDateModalOpen  } = useUIStore();

  const handleDelete = () =>{
    startDeleteingEvent();
  }
  return (
    <button
        className='btn btn-danger fab-danger'
        onClick={handleDelete}
        style={{
          display: hasEventSelected && !isDateModalOpen ? '' : 'none'
        }}
    >
        <i className='fas fa-trash-alt'></i>
    </button>
  )
}
