import React from 'react';
import "./tile.css"

const Tile = ({index, slideable, size,handleSlide}) => {

    return (
        <div style={slideable.includes(index) ? {cursor: "pointer"} : null} className={size == 3 ? index !== 0 ?  "tile3" : "none3" : index !== 0 ?  "tile4" : "none4" } onClick={() => {
            if(slideable.includes(index)){
                handleSlide(index)
            }
        }}>
            {
                index !== 0
                ?
                <>  
                    <img src={size == 3 ? `/ai3/${index}.jpg` : `/ai4/${index}.jpg`} alt="" />
                    <span>{index}</span>
                </>
                :
                <span></span>
            }
        </div>
    );
}

export default Tile;
