import {React} from 'react'
import {useParams, useNavigate, NavLink} from 'react-router-dom'
import {useState} from 'react';
import {useSelector} from "react-redux";
import Comments from "./Comments";
import Moment from "react-moment";
import {TiArrowBackOutline} from "react-icons/ti";
import {MdDeleteForever} from "react-icons/md";
import axios from "axios";

const Question = ({
                      user,
                      questions
                  }) => {

    const {id} = useParams()

    const navigate = useNavigate()

    function titleCase(str) {
        str = str.toLowerCase().split(' ');
        for (var i = 0; i < str.length; i++) {
            str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
        }
        return str.join(' ');
    }


    const refresh = () => {

    }
    const [comments, setComments] = useState([])
    const {user: currentUser} = useSelector((state) => state.auth);

    function handleRemoveComment(id) {
        const removeIndex = comments.findIndex(item => item.id === parseInt(id));
        comments.splice(removeIndex, 1);
        navigate("/questions");
    }

    return (
        <div>
            {questions.filter((t) => t.id === parseInt(id))
                .map((t) => (
                    <div key={t.id}>
                        <div style={{margin: "0 0 3vh 0"}}>
                            <div className={"m-2"}>
                                <NavLink to="/questions"
                                         style={{color: 'black', textDecoration: 'none'}}><TiArrowBackOutline/> Назад к
                                    обсуждениям</NavLink>
                            </div>
                            <div className="commenterImage">
                                <img src="http://placekitten.com/45/45"/>
                            </div>
                            <div className="comment-author">{t.username}<span
                                style={{color: "black"}}> спрашивает:</span></div>
                            <span
                                className="date sub-text"><Moment
                                format="HH:mm DD.MM.YYYY">{t.dtCreated}</Moment></span>
                            <div className="commentText">
                                <div style={{fontSize: '40px'}}>{titleCase(t.subject)}</div>
                                <p style={{fontSize: '20px', margin: 'auto 0'}}>{t.description}</p>

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