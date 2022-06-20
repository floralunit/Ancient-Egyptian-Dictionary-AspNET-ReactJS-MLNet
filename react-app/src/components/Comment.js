import React from 'react'
import {
    MdDeleteForever
} from 'react-icons/md'
import {useState} from 'react'
import CommentsStyle from "../styles/CommentsStyle.css"
import Moment from "react-moment";

const Comment = ({
                     c,
                     user,
                     handleDelete
                 }) => {

    return (
        <div className='comment'>
            <div className='comment-right-part'>
                <div className="comment-content">
                    <div className="commenterImage">
                        <img src={require("../images/ava.png")}/>
                    </div>
                    <div className="comment-author">{c.username}</div>
                    <div className='comment-actions'>{user.userId === c.userId || user.role === "Admin"?
                        <>
                            <MdDeleteForever onClick={() => handleDelete(c.id)}/>
                        </>
                        : null}
                    </div>
                </div>
                <div className="commentText">
                    <p className="">{c.description}</p><span
                    className="date sub-text"><Moment
                    format="HH:mm DD.MM.YYYY">{c.createdDt}</Moment></span>
                </div>
            </div>
        </div>
    )
}

export default Comment