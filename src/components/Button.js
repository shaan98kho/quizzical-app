import React from "react";

export default function Button (props) {
    return <button className="button" onClick={props.function}>
        {props.text}
    </button>
}