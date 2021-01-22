import { combineReducers } from 'redux';

//reducer for remain the current filpped card
const flippedCardReducer = (flippedCard=null,action) =>{
    //condition doesn't neccery right now - for future actions extentions
    if(action.type === 'FLIPPED_CARD'){ 
        return action.payload;
    }
    return flippedCard;
}

const modalSettingsRedcuder = (modalSet={showModal:false},action) =>{    
    if(action.type === 'MODAL_SETTINGS'){
        return action.payload;
    }
    return modalSet;
}

export default combineReducers({
    flippedCard: flippedCardReducer,
    modalSettings: modalSettingsRedcuder
});
