import React from 'react'
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import CommentsStyle from "../styles/CommentsStyle.css"
import {
    MdDeleteForever
} from 'react-icons/md'
import api from "../services/api";
import TokenService from "../services/token.service";
import Comment from "./Comment";
import {Col, Row} from "react-bootstrap";
import {NavLink} from "react-router-dom";


const Comments = ({
                      id,
                      refresh
                  }) => {
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')

    const {user: currentUser} = useSelector((state) => state.auth);
    const headers = {Authorization: `Bearer ${currentUser.token}`};

    useEffect(() => {
        fetch(`https://api.ancient-egyptian-helper.ru/api/comments/${id}`, {headers})
            .then((res) => res.json())
            .then((data) => setComments(data))
            .catch(console.error);
    }, []);

    const handleSubmitComment = (e) => {
        e.preventDefault();
        fetch(`https://api.ancient-egyptian-helper.ru/api/comments/add/${id}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${currentUser.token}`
            },
            body: JSON.stringify({
                description: newComment,
                userId: currentUser.userId,
                username: currentUser.username
            })
        }).then(resp => resp.json())
            .then(addcomment => {
                handleAddComment(addcomment)
                console.log(addcomment)
                e.target.reset();
                window.location.reload();
            })
        setNewComment('');
    }

    function handleAddComment(comment) {
        setComments([...comments, comment])
    }

    const handleDelete = (e) => {
        fetch(`https://api.ancient-egyptian-helper.ru/api/comments/delete/${e}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${currentUser.token}`
            },
        })
            .then(() => {
                    console.log('deleted');
                    window.location.reload();
        })
        handleRemoveComment(e)
    }

    function handleRemoveComment(id) {
        const removeIndex = comments.findIndex(item => item.id === parseInt(id));
        comments.splice(removeIndex, 1);
        refresh();
    }

    return (
        <div>
            <form role="form" onSubmit={handleSubmitComment}>
                <Row className="row py-3">
                    <Col className={"col-xl-8"}>
                        <input type="text" name="comment" autoFocus className="form-control"
                               placeholder={"Оставьте комментарий"}
                               onChange={(e) => setNewComment(e.target.value)}/>
                    </Col>
                    <Col className={"col col-lg-3"}>
                        <button type="submit" className="comment-upload-btn">Отправить</button>
                    </Col>
                </Row>
            </form>
            <div className="commentBox">
                {comments ?
                    comments.map((c) =>
                        <Comment className="commentText"
                                 key={c.id}
                                 c={c}
                                 handleDelete={handleDelete}
                                 user={currentUser}
                                 refresh={refresh}/>)
                    : null}
            </div>
        </div>
    )
}

export default Comments