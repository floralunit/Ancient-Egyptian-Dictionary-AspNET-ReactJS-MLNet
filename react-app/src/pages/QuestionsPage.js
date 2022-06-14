import React from "react"
import '../styles/QuestionsGrid.css'
import {Route, Routes, useNavigate} from "react-router-dom";
import {useState, useEffect} from 'react'
import Question from "../components/Question";
import {useSelector} from "react-redux";
import Questions from "../components/Questions";
import CreateNewQuestion from "./CreateNewQuestion";


const QuestionsPage = () => {

    const [questions, setQuestions] = useState([])
    const navigate = useNavigate()
    const {user: currentUser} = useSelector((state) => state.auth);
    const headers = {Authorization: `Bearer ${currentUser.token}`};
    useEffect(() => {
        fetch(`https://api.ancient-egyptian-helper.ru/api/questions/all`, {headers})
            .then((res) => res.json())
            .then((data) => setQuestions(data))
            .catch(console.error);
    }, []);


    const [sub, setSub] = useState('')
    const [body, setBody] = useState('')
    const [error, setError] = useState('')

    const handleSubject = (x) => {
        setSub(x)
    }

    const handleBody = (x) => {
        setBody(x)
    }

    const submitAll = () => {
        if (sub && body) {
            if (sub.length > 30) {
                setError('Subject character limit = 30')
            } else if (body.length > 2000) {
                setError('Description character limit = 2000')
            } else {
                fetch(`https://localhost:7059/api/questions/add`, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${currentUser.token}`
                    },

                    body: JSON.stringify({
                        description: body,
                        subject: sub,
                        userId: currentUser.userId,
                        username: currentUser.username
                    })
                }).then(resp => resp.json())
                    .then(newTask => {
                        setQuestions([...questions, newTask])
                    })
                setBody('')
                setSub('')
                navigate('/questions')
            }
        } else if (!sub) {
            setError('Subject field required')
        } else if (!body) {
            setError('Description field required')
        }
    }
    return (
        <div className="loginpage">
            <div className={"empty"}/>
            <div style={{background: '#FBEEC1', borderRadius: '10px', padding: '2vh', margin: 'auto 50vh'}}>
                <Routes>
                    <Route exact path='/'
                           element={
                               <Questions
                                   user={currentUser}
                                   questions={questions}
                               />
                           }
                    />
                    <Route path='/:id'
                           element={
                               <Question
                                   user={currentUser}
                                   questions={questions}
                               />
                           }
                    />
                    <Route path="/create-new"
                           element={
                               <CreateNewQuestion
                                   error={error}
                                   handleBody={handleBody}
                                   handleSubject={handleSubject}
                                   submitAll={submitAll}
                               />
                           }
                    />
                </Routes>
            </div>
            <div className={"empty"}/>
        </div>
    )
}

export default QuestionsPage