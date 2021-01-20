//Action creator - set flipped card
export const setFlippedCard = (flippedCard) =>{
    return {
        type: 'FLIPPED_CARD',
        payload: flippedCard
    };
};