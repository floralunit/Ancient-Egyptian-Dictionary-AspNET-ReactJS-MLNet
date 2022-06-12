import React from 'react'
import CommentBox from "../components/CommentBox";

export function Chat() {
    return (
        <div className="about">
            <div className={"empty"}/>
            <div style={{background: '#FBEEC1', borderRadius: '10px', padding: '2vh', margin: 'auto 30vh'}}>
                <h2 align={"center"} className={"black"}>Древнеегипетский чат</h2>
                <CommentBox />
            </div>
        </div>
    );
}
