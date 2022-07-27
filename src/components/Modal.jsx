import React,{ useRef } from 'react'

//redux
import { useDispatch } from 'react-redux'
import { setModal } from '../actions'

//style
import './../styles/modal.css'


const Modal = ({ children, modalTitle, heroImage, classes, show}) => {    
    const modalRef = useRef()
    const dispatch = useDispatch()

    const closeModal = () => {
        let modal = modalRef
        modal.current.classList.add('close')
        setTimeout(() =>{
            dispatch(setModal(false))
        },300) //time for the closing animation to happen
    }

    if(!show){
        return null
    }   
    return (
        <div 
            ref={modalRef} 
            className={`modal ${classes ? classes : ""} ${heroImage ? "hero-image" : ""}`} 
            onClick={closeModal}
            >
            <div className="box" onClick={e => {e.stopPropagation()}}>
                {heroImage
                    ?
                    <div className="header" style={{backgroundImage:`url(${heroImage})`, backgroundSize:"cover"}}>
                        <i className="close-sign close icon" onClick={closeModal}></i>
                    </div>
                    :
                    <div className="header">
                        <h3>{modalTitle}</h3>
                        <i className="close-sign close icon" onClick={closeModal}></i>
                    </div>
                }
                <div className="body grid">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal