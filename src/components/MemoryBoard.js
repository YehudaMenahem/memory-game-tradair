import React,{ useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setFlippedCard } from './../actions';

//import css
import './../styles/memory-board.css'

const MemoryBoard = props =>{

    const [gameName,setGameName] = useState(props.gameName);
    // const [selectedCard, setSelectedCard] = useState(props.flippedCard);
    const [imgs] = useState([
        {key:'amelie', path:require('./../assets/images/amelie.jpg').default},
        {key:'back-to-the-future', path:require('./../assets/images/back_to_the_future.jpg').default},
        {key:'paris_is_burning', path:require('./../assets/images/parris_is_burning.jpg').default},
        {key:'pulp_fiction', path:require('./../assets/images/pulp_fiction.jpg').default},
        {key:'reservior_dogs', path:require('./../assets/images/reservior_dogs.jpg').default},
        {key:'terminator', path:require('./../assets/images/terminator.jpg').default},
        {key:'aladdin', path:require('./../assets/images/aladdin.jpg').default},
        {key:'dirty_dancing', path:require('./../assets/images/dirty_dancing.jpg').default},
        {key:'nightmare_elem_street', path:require('./../assets/images/nightmare_elem_street.jpg').default},
        {key:'big', path:require('./../assets/images/big.jpg').default},
        {key:'mission_impossible', path:require('./../assets/images/mission_impossible.jpg').default},
        {key:'indiana_jones', path:require('./../assets/images/indiana_jones.jpeg').default},
        {key:'fight_club', path:require('./../assets/images/fight_club.jpg').default},
        {key:'the_shining', path:require('./../assets/images/the_shining.jpg').default},
        {key:'scream', path:require('./../assets/images/scream.jpg').default},
        {key:'home_alone', path:require('./../assets/images/home_alone.jpg').default},
        {key:'matrix', path:require('./../assets/images/matrix.jpg').default},
        {key:'lambs_silience', path:require('./../assets/images/lambs_silience.jpg').default}
    ]);

    //fn. click on card (an image) 
    const clickCard = (e,currentFlippedCard,reduxFlippedAction) =>{

        let card  = e.currentTarget;
        //if card disabled - return

        let imgHiderDiv = e.currentTarget.children[0];
        let img  = e.currentTarget.children[1];

        //first card flip (selectedCard is null)
        if(!currentFlippedCard){
            //set the flippedCard in redux to it's name
            reduxFlippedAction(img.name);
            card.classList.add('choose');
        }

        //second card flip 
        //check if the movies cards identical --> names are equal
        //if identical -> which means the name equal to the selectedCard from redux 
            //keep cards reveal 
            //make cards disabled and cursor should be not-allow
            //make the selectedCard null

            //if game completed - all cards revealed
                //show a message for user
                
        //if not - cover them
            //make the selectedCard null   
    }

    //double the images countity and "mixed" randomly the array order for the board
    const renderBoard = (flippedCard) =>{
        //original arr
        let imgsArray = imgs;

        //duplicate arr
        let imgsDup = [...imgs];

        //concat both arrays so we'll have two of rach card
        let concatImgsArrs = imgsArray.concat(imgsDup);

        //shuffle array
        concatImgsArrs = shuffle(concatImgsArrs);

        //the game board to render
        let view = 
            <div className={"board"}>
                {concatImgsArrs.map((img,index) => { 
                    return(
                        // iterating the imgsArr from reducer to present in squares 
                        <div className={"card"} key={`${img.key}-${index}`} onClick={(e)=>{clickCard(e,props.flippedCard,props.setFlippedCard)}}>
                            <div className={"img-hider"}>
                                <i className={"icon question circle outline"}></i>
                            </div>
                            <img src={`${img.path}`} alt={`memory-game-${img.key}`} className={'img'} name={`${img.key}`}/>
                        </div> 
                    );
                })}
            </div>

        return view;
    }

    //mix randomly the order of the cards
    const shuffle = (array) => {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle
        while (0 !== currentIndex) {
      
          // Pick a remaining element
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      }



    return (
        <div className={'memory-board'}>
            <p className={"pre-title"}>- Take a little break for some memory game -</p>
            <h1 className={"title"}>{gameName}</h1>
                {renderBoard(props.flippedCard)}
        </div>
    )
};

const mapStateToProps = (state) =>{
    return { flippedCard: state.flippedCard }
}

export default connect(mapStateToProps,{setFlippedCard})(MemoryBoard);