import { useMemo, useState, useRef, useEffect } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';
import  Modal  from 'react-modal';
import DatePicker, { registerLocale } from "react-datepicker";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

import es from 'date-fns/locale/es';
registerLocale('es', es)


import "react-datepicker/dist/react-datepicker.css";
import { useUIStore } from '../../hooks';
import { useCalendarStore } from '../../hooks/useCalendarStore';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');



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

export const CalendarModal = () => {    
    const { isDateModalOpen, closeDateModal } = useUIStore()
    const { activeEvent, startSavingEvent } = useCalendarStore()

    const [formValues, setFormValues] = useState<ICalendarEvent>({
        _id: null,
        title: '',
        notes: '',
        start: new Date(),
        end: addHours( new Date(), 2 ),
        bgColor: '#fafafa',
        user:{
          _id:  null,
          name:  null,
        }
    })  

    const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

    const titleClass = useMemo(() => {
        if (!formSubmitted) return '';

        return (formValues.title.length > 0) 
             ? ''
             : 'is-invalid'

    },[formValues.title, formSubmitted])


    const inputRef = useRef<null | HTMLElement>(null);

    const onCloseModal = () =>{
        closeDateModal();
    };


    useEffect(() => {
        if (activeEvent !== null){
            setFormValues({...activeEvent});
        }
    }, [activeEvent])
    

    const onInputChange = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value,

        })
    };

    const onTextAreaChange = ({target}: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value,

        })
    };

    const onDateChange = (event:Date | null,changing:string) =>{
        setFormValues({
            ...formValues,
            [changing]: event
        })
    }

    const onSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormSubmitted(true);
        const {start, end, title} = formValues;
        const difference = differenceInSeconds(end,start);
        if (isNaN(difference) || difference <= 0 ) {
            Swal.fire('Fechas incorrectas','Revisar las fechas ingresadas','error');
            return;
        }

        if (title.length <= 0) {
            inputRef.current?.focus();
            return;
        }

        await startSavingEvent(formValues);
        closeDateModal();
        setFormSubmitted(false);
    }

  return (
    <Modal
        isOpen={ isDateModalOpen }
        onRequestClose={ onCloseModal}
        style={customStyles}
        className="modal"
        overlayClassName="background-modal"
        closeTimeoutMS={ 200 }
    >
      
      <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={onSubmit}>

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker 
                        selected={formValues.start}
                        onChange = {(event) => onDateChange(event,'start')}
                        className="form-control"
                        dateFormat="Pp"
                        showTimeSelect
                        locale="es"
                        timeCaption='hora'
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker 
                        minDate={formValues.start}
                        selected={formValues.end}
                        onChange = {(event) => onDateChange(event,'end')}
                        className="form-control"
                        dateFormat="Pp"
                        showTimeSelect  
                        locale="es"
                        timeCaption='hora'
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={`form-control ${titleClass}`}
                        placeholder="T??tulo del evento"
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange = {onInputChange}
                        ref= {inputRef as any}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripci??n corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea 
                        className="form-control"
                        placeholder="Notas"
                        rows = {5}
                        name="notes"
                        value={formValues.notes}
                        onChange = {onTextAreaChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Informaci??n adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
    </Modal>
  )
}
