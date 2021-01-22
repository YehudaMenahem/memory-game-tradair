//Action creator - set flipped card
export const setFlippedCard = (flippedCard) =>{
    return {
        type: 'FLIPPED_CARD',
        payload: flippedCard
    };
};

//Action creator 
export const setModal = (modalSettings) =>{
    return {
        type: 'MODAL_SETTINGS',
        payload: modalSettings
    };
};