import {React, useEffect} from 'react'
/*import './Task.css'*/
import {useParams, useNavigate, NavLink} from 'react-router-dom'
import { useState } from 'react';
import CommentsStyle from "../styles/CommentsStyle.css";
import { useDispatch, useSelector } from "react-redux";
import Questions from "./Questions";
import Comments from "./Comments";
import Moment from "react-moment";
import {Col, Row} from "react-bootstrap";
import {AiOutlineCloseCircle} from "react-icons/ai";
import {MdDeleteForever, MdOutlineCreate} from "react-icons/md";
import axios from "axios";

const Question = ({user,
                  questions}) => {

    const { id } = useParams()

    const navigate = useNavigate()

    function titleCase(str) {
        str = str.toLowerCase().split(' ');
        for (var i = 0; i < str.length; i++) {
            str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
        }
        return str.join(' ');
    }


    const refresh = ()=>{
        window.location.reload();
    }
    const [comments, setComments] = useState([])
    const { user: currentUser } = useSelector((state) => state.auth);
    const headers = {Authorization: `Bearer ${user.token}`};
    const handleDelete = (e) => {
        try {
            axios
                .delete(`https://localhost:7059/api/questions/delete/${e}`, {
                    responseType: "json",
                },{headers});
        } catch (ex) {
            console.log(ex);
        }

        handleRemoveComment(e)
    }

    function handleRemoveComment(id) {
        const removeIndex = comments.findIndex(item => item.id === parseInt(id));
        comments.splice(removeIndex, 1);
       navigate("/questions");
    }
    return(
        <div >
            {questions.filter((t) => t.id === parseInt(id) )
                .map((t) => (
                    <div key={t.id} >
                                    <div >
                                        <div className={"p-1 m-2"}>
                                                    <NavLink to="/questions"
                                                             style={{color: 'black', textDecoration: 'none'}}><AiOutlineCloseCircle/>   Назад к обсуждениям</NavLink>
                                                    {user.userId === t.userId ?
                                                        <>
                                                            <div onClick={() => handleDelete(t.id)}><MdDeleteForever/>  Удалить</div>
                                                        </>
                                                        : null}
                                        </div>
                                        <div className="commenterImage">
                                            <img src="http://placekitten.com/45/45"/>
                                        </div>
                                        <div className="comment-author">{t.username} спрашивает:</div>
                                        <span
                                            className="date sub-text"><Moment format="HH:mm DD.MM.YYYY">{t.dtCreated}</Moment></span>
                                        <div className="commentText">
                                            <div style={{fontSize: '40px'}}>{titleCase(t.subject)}</div>
                                            <p style={{fontSize: '25px', margin: 'auto 0'}}>{t.description}</p>

                                        </div>
                                    </div>
                                    <div className='actionBox'>
                                        <Comments
                                            id={id}
                                            refresh={refresh}
                                        />
                                    </div>
                    </div>))}
        </div>
    )
}

export default Question