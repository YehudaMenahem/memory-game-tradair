import React from 'react';

const Card = React.memo((props) => {

    return (
        <div className={"card"} onClick={props.click}>
            <div className={"img-hider"}>
                <i className={"icon question circle outline"}></i>
            </div>
            <img src={`${props.img.path}`} alt={`memory-game-${props.img.key}`} className={'img'} name={`${props.img.key}`}/>
        </div>
    )
});

export default Card;