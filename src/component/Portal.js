import React from 'react'
import ReactDOM from 'react-dom'
import classes from '../component/Portal.module.css'
function Portal({ idModal, CarIt, setCarIt, CloseModal, getPosts }) {
    const onhandlerdelete = async () => {
        const filtered = CarIt.filter((item) => item.id !== idModal)
        setCarIt(filtered)
        const response = await fetch(
            `https://fetchmyproject-default-rtdb.europe-west1.firebasedatabase.app/car/${idModal}.json`,
            {
                method: 'DELETE',
            }
        ).then(() => {
            getPosts()
            CloseModal()
        })
    }
    return ReactDOM.createPortal(
        <div className={classes.portal}>
            <span>Вы точно хотите удалить</span>
            <div className={classes.ModalStore} >
                <button onClick={onhandlerdelete}>удалить</button>
                <button onClick={CloseModal}>отмена</button>

            </div>
        </div>,
        document.getElementById('portal'),
    )

}

export default Portal