import React,{ useState } from 'react';
import { connect } from 'react-redux';
import { setFlippedCard } from './../actions';

//import components
import Card from './Card';

//import css
import './../styles/memory-board.css'

const MemoryBoard = React.memo((props) =>{

    const [gameName] = useState(props.gameName);
    const [succesMsg] =useState(false);


    //click on card (an image) 
    const clickCard = (e,currentFlippedCard,reduxFlippedAction) =>{

        let card  = e.currentTarget;
        let lastCardChosen = document.querySelector('.card.choose');

        //if the timeout of showing the cards for the user for a bit didn't happen yet
        let isFunctionInProcess = document.querySelectorAll('.card.choose').length > 1;

        //if card already guessed or chosen - go out of the function
        if (card.classList.contains('guessed') || card.classList.contains('choose') || isFunctionInProcess)
            return 
        let img  = e.currentTarget.children[1];

        //first card flip (selectedCard is null)
        if(!currentFlippedCard){
            card.classList.add('choose');

            //set the flippedCard in redux to it's name
            reduxFlippedAction(img.name);
            
        //second card flip 
        //check if the movies cards identical --> names are equal
        } else if(img.name === currentFlippedCard){
            card.classList.add('guessed');
            lastCardChosen.classList.add('guessed');    
            lastCardChosen.classList.remove('choose');
            reduxFlippedAction(null);

            // board state - completed or not completed
            let boardCompleted;
            let allCards = document.querySelectorAll('.card');
            for(let i=0; i<allCards.length; i++){
                if(!allCards[i].classList.contains('guessed')){
                    boardCompleted = false;
                    return;
                }
                boardCompleted = true;
            }

            //when board completed
            if(boardCompleted){
                //show a msg to user
                alert(`Wow! You made it. Epic!!`);
            }

        // cards didn't match
        } else {
            //show the next card for 1 second
            card.classList.add('choose');

            //then flip it again
            setTimeout(()=>{
                card.classList.remove('choose');

                //flip the other revealed card
                lastCardChosen.classList.remove('choose');
            },1000);
            reduxFlippedAction(null);
        } 
    }

    //double the images countity and "mixed" randomly the array order for the board
    const renderBoard = () =>{

        //shuffle array
        // concatImgsArrs = shuffle(concatImgsArrs);

        //the game board to render
        let view = 
            <div className={"board"}>
                {props.imgs.map((img,index) => { 
                    return(
                        // iterating the imgsArr from reducer to present in squares  
                        <Card key={`${img.key}-${index}`} img={img} selectedCard={props.flippedCard} click={(e)=>{clickCard(e,props.flippedCard,props.setFlippedCard)}}/>
                    );
                })}
            </div>

        return view;
    }

    return (
        <div className={'memory-board'}>
            <p className={"pre-title"}>- Take a little break for some memory game -</p>
            <h1 className={"title"}>{gameName}</h1>
            {renderBoard()}
            <p>{succesMsg ? "Wow, you made it!!" : ""}</p>
        </div>
    )
});

const mapStateToProps = (state) =>{
    return { flippedCard: state.flippedCard }
}

export default connect(mapStateToProps,{setFlippedCard})(MemoryBoard);