import {React, useEffect} from "react"
import {Link, Navigate, NavLink} from 'react-router-dom'
import {useState} from 'react'
import {
    AiOutlineCloseCircle
} from 'react-icons/ai'
import {
    MdDeleteForever,
    MdOutlineCreate
} from 'react-icons/md'
import {Col, Row} from "react-bootstrap";
import Moment from "react-moment";

const Questions = ({
                       user,
                       questions
                   }) => {
    function titleCase(str) {
        str = str.toLowerCase().split(' ');
        for (var i = 0; i < str.length; i++) {
            str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
        }
        return str.join(' ');
    }

    const handleDelete = (e) => {
        fetch(`https://api.ancient-egyptian-helper.ru/api/questions/delete/${e}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            },
        })
            .then(console.log('deleted'))
        handleRemoveComment(e)
    }

    function handleRemoveComment(id) {
        const removeIndex = questions.findIndex(item => item.id === parseInt(id));
        questions.splice(removeIndex, 1);
/*        refresh();*/
    }
    return (
        <div className='task-grid'>
            <h2 align={"center"} className={"black"}>Древнеегипетские обсуждения</h2>
            <Row className="py-3">
                <Col>
                    <Row>
                        <NavLink to="/profile"
                                 style={{color: 'black', textDecoration: 'none'}}><AiOutlineCloseCircle/> Выйти в
                            профиль</NavLink>
                    </Row>
                    <Row>
                        <NavLink to="create-new"
                                 style={{color: 'black', textDecoration: 'none'}}><MdOutlineCreate/> Создать обсуждение</NavLink>
                    </Row>
                </Col>
            </Row>
            {questions ? <div className='task-container'>
                <div className='actionBox'>
                        {questions.length > 0 ?
                            questions.map((t) =>
                                <div key={t.id} className='comment'>
                                    <div className='comment-right-part'>
                                            <Link to={`/questions/${t.id}`} style={{color: 'black', textDecoration: 'none'}}>
                                                <div className="commenterImage">
                                                    <img src="http://placekitten.com/45/45"/>
                                                </div>
                                                <div className="comment-author">{t.username}</div>
                                                <div className="commentText">
                                                    <div style={{fontSize: '30px'}}>{titleCase(t.subject)}</div>
                                                    <p style={{fontSize: '15px'}}>{t.description}</p> <span
                                                    className="date sub-text"><Moment format="HH:mm DD.MM.YYYY">{t.dtCreated}</Moment></span>

                                                </div>
                                            </Link>
                                    </div>
                                </div>
                            )
                            :
                            <div className='no-card'>
                                <div className='content'>
                                    Nothing to see here...
                                </div>
                            </div>
                        }
                    </div>
            </div> : null}
        </div>
    )
}

export default Questions