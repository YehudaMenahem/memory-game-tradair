import React from 'react'

//import css
import './../styles/card.css'

const Card = ({ img, click, status }) => {
    return (
        <div className={`card ${status}`} onClick={click}>    
            <div className={"img-hider"}>
                <i className={"icon question circle outline"}></i>
            </div>
            <img 
                src={`${img.path}`} 
                alt={`memory-game-${img.name}`} 
                className={"img"} 
                name={`${img.name}`}/>
        </div>
    )
}

export default Card