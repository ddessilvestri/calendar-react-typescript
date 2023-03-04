import { useMemo, useState, useRef } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';
import  Modal  from 'react-modal';
import DatePicker, { registerLocale } from "react-datepicker";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

import es from 'date-fns/locale/es';
registerLocale('es', es)


import "react-datepicker/dist/react-datepicker.css";


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


interface IForm {
    title: string;
    notes: string;
    start: Date;
    end: Date
}

interface ITarget {
    name: string;
    value: string;
}

export const CalendarModal = () => {

    const [isOpen, setIsOpen] = useState<boolean>(true);

    const [formValues, setFormValues] = useState<IForm>({
        title: 'David',
        notes: 'Silvestri',
        start: new Date(),
        end: addHours( new Date(), 2 )
    })  

    const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

    const titleClass = useMemo(() => {
        if (!formSubmitted) return '';

        return (formValues.title.length > 0) 
             ? ''
             : 'is-invalid'

        //TODO: add useRef to get focus on input when it is invalid

    },[formValues.title, formSubmitted])


    const inputRef = useRef<null | HTMLElement>(null);

    const onCloseModal = () =>{
        console.log('cerrar modal');
        setIsOpen(false);
    };

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

    const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
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
    }

  return (
    <Modal
        isOpen={ isOpen }
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
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange = {onInputChange}
                        ref= {inputRef as any}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
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
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
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
