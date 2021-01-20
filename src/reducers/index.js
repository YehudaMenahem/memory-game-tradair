import { combineReducers } from 'redux';

//reducer for remain the current filpped card
const flippedCardReducer = (flippedCard=null,action) =>{
    //condition doesn't neccery right now - for future actions extentions
    if(action.type === 'FLIPPED_CARD'){ 
        return action.payload;
    }
    return flippedCard;
}

export default combineReducers({
    flippedCard: flippedCardReducer
});
