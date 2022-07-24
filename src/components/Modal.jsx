import React,{ useRef } from 'react';


const Modal = ({ children, modalTitle, heroImage, classes, show}) => {    
    const modalRef = useRef();

    const closeModal = (e) => {
        let modal = modalRef;
        modal.current.classList.add('close');
        setTimeout(() =>{
            closeModal && closeModal(e);
        },300) //time for the closing animation to happen
    };

    if(!show){
        return null;
    }   
    return (
        <div ref={modalRef} className={`modal ${classes} ${heroImage ? "hero-image" : ""}`} onClick={e => {closeModal(e)}}>
            <div className="box" onClick={e => {e.stopPropagation()}}>
                {heroImage
                    ?
                    <div className="header">
                        <i className="close-sign close icon" onClick={e => {closeModal(e)}}></i>
                    </div>
                    :
                    <div className="header">
                        <h3>{modalTitle}</h3>
                        <i className="close-sign close icon" onClick={e => {closeModal(e)}}></i>
                    </div>
                }
                <div className="body grid">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;