import React from 'react'
import {TiArrowBackOutline} from "react-icons/ti";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import ErrorMessage from "../components/ErrorMessage";

const CreateNewQuestion = ({
                               error,
                               handleBody,
                               handleSubject,
                               submitAll
                           }) => {

    const {user: currentUser} = useSelector((state) => state.auth);

    function titleCase(str) {
        str = str.toLowerCase().split(' ');
        for (var i = 0; i < str.length; i++) {
            str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
        }
        return str.join(' ');
    }

    return (
        <div style={{margin: "0 0 3vh 0"}}>
            <div className={"m-2"}>
                <NavLink to="/questions"
                         style={{color: 'black', textDecoration: 'none'}}><TiArrowBackOutline/> Назад к
                    обсуждениям</NavLink>
            </div>
            <div className="commenterImage">
                <img src={require("../images/svin.jpg")}/>
            </div>
            <div className="comment-author">{currentUser.username}<span
                style={{color: "black"}}> хочет спросить:</span></div>
            <div className={"empty"}/>
            <div className="commentText">
                <label>Тема</label>
                <input
                    type='text'
                    className="form-control"
                    autoFocus
                    onChange={(e) => handleSubject(e.target.value)}>
                </input>
                <label>Описание</label>
                <textarea style={{minHeight: "100px"}}
                          className="form-control"
                          onChange={(e) => handleBody(e.target.value)}>
                </textarea>
                <div className={"empty"}/>
                <button
                    className="comment-upload-btn"
                    type="submit"
                    onClick={() => submitAll()}>
                    Отправить
                </button>
                {error ?
                    <ErrorMessage>{error}</ErrorMessage>
                    : null
                }
            </div>
        </div>

    )
}

export default CreateNewQuestion