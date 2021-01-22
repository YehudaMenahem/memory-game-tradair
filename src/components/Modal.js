import React,{ useState, useEffect, createRef} from 'react';


const Modal = (props) => {

    const [modalTitle,setModalTitle] = useState(props.modalTitle);
    const [heroImage,setHeroImage] = useState(props.heroImage);
    const [classes,setClasses] = useState(props.classes);
    const [show,setShow] = useState(props.show);
    
    const modalRef = createRef();

    useEffect(() => {
        let modalTitle = props.modalTitle;
        setModalTitle(modalTitle,modalTitle);
    },[props.modalTitle])

    useEffect(() => {
        let heroImage = props.heroImage;
        setHeroImage(heroImage,heroImage);
    },[props.heroImage])

    useEffect(() => {
        let classes = props.classes;
        setClasses(classes,classes);
    },[props.classes])

    useEffect(() => {
        let show = props.show ? props.show : false;
        setShow(show,show);
    },[props.show])

    const closeModal = (e) => {
        let modal = modalRef;
        modal.current.classList.add('close');
        setTimeout(() =>{
            props.closeModal && props.closeModal(e);
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
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default Modal;