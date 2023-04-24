import React from 'react';
import "./tile.css"

const Tile = ({index, slideable, size,handleSlide}) => {

    return (
        <div style={slideable.includes(index) ? {cursor: "pointer"} : null} className={index !== 0 ? "tile" : "none"} onClick={() => {
            if(slideable.includes(index)){
                handleSlide(index)
            }
        }}>
            {
                index !== 0
                ?
                <>
                    <img src={`/br/${index}.jpg`} alt="" />
                    <span>{index}</span>
                </>
                :
                <span></span>
            }
        </div>
    );
}

export default Tile;
