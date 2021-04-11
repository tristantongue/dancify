import React from "react";
import "./Button.css";

function Button(props) {
    return (
        <div>
            <button className="btn-songs" onClick={props.gotClicked}>
            {props.children}
            </button>
        </div>
    )
}

export default Button