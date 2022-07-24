import React,{ useEffect, useState, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import { setFlippedCard, setModal } from '../actions';

//import components
import Card from './Card';

//import css
import './../styles/memory-board.css'

const MemoryBoard = ({ gameName, movies, setModal, flippedCard }) =>{
    const [val, setVal] = useState(0)
    const dispatch = useDispatch()
    let guessedPairsCounter = useRef(0)
    let numOfPairs = movies.length / 2

    //set success modal 
    const openModal = () =>{
        setModal({
            showModal:true,
            headerTitle:'Congratulations',
            contentTitle:'Wow!',
            contentRunningText:`You completed the board. Epic!!`
        });
    }

    //click on card (an image) 
    const clickCard = (cardStatus, cardImgName, cardId) =>{

        let lastCardChosen = movies.filter(card => card.status === 'choose')
        let flipped = flippedCard

        //pair cards are in the revealing time 
        let isFunctionInProcess = lastCardChosen.length > 1 ? true : false

        //if card already guessed or chosen or revealing time still happens - go out of the function
        if(cardStatus === 'choose' || cardStatus === 'guessed' || isFunctionInProcess){
            return 
        }

        //first card flip 
        if(!flipped){
            movies.map((card) => {
                if(card.id === cardId){
                    card.status = 'choose' 
                }
            })
            //set the flippedCard in redux to it's name
            dispatch(setFlippedCard(cardImgName));
            
        //second card flip 
        //check if the movies cards identical
        } else if(cardImgName === flipped){
            movies.map((card) => { 
                if(card.name === cardImgName)
                    card.status = 'guessed' 
            })
            dispatch(setFlippedCard(null));

            //check if all pairs guessed 
            guessedPairsCounter.current++

            if(guessedPairsCounter.current === numOfPairs){ 
                setTimeout(() => {
                    //show success modal
                    openModal()
                    guessedPairsCounter.current = 0
                    movies.map(card => card.status='unrevealed')
                }, 500);
            }

        //cards didn't match
        } else {
            //show the next card for 1 second
            //and then flip it again
            movies.map(card=>{ card.id === cardId && (card.status = 'choose')})
            setTimeout(()=>{
                movies.map(card=>{ 
                    if(card.id === cardId){
                        card.status = 'unrevealed'
                    } 
                    
                    if(card.name === flipped && card.status === 'choose'){
                        card.status = 'unrevealed'
                    }
                })
                setVal(val+1) 
            },1000);
            dispatch(setFlippedCard(null));
        } 
    }

    const renderBoard = () =>{
        let view = 
            <div className={"board"}>
                {movies.map((img) => { 
                    return(
                        <Card 
                            key={`${img.id}`} 
                            img={img} 
                            click={()=>{clickCard(img.status, img.name, img.id)}}
                            status={img.status}
                        />
                    );
                })}
            </div>
        return view;
    }

    return (
        <div className={"memory-board"}>
            <p className={"pre-title"}>- Take a little break for a memory game -</p>
            <h1 className={"title"}>{gameName}</h1>
            {renderBoard()}
        </div>
    )
};

const mapStateToProps = (state) =>{
    return { flippedCard: state.flippedCard }
}

export default connect(mapStateToProps,{setFlippedCard,setModal})(MemoryBoard);