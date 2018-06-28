import React from 'react';
import './PopupElement.css';

function PopupElement(props) {
    return(
        <div className={"popup-" + props.name}>
            <input type="text" value={'here sould be previous ' + props.name}/>
            <button className="change-popup">
              Change popup {props.name}
            </button>
            <button className="cancel-changing-popup">
              Cancel
            </button>
          </div>
    )
}

export default PopupElement;