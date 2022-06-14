import React from 'react'


const CreateNewQuestion = ({
                       error,
                       handleBody,
                       handleSubject,
                       submitAll}) => {


    function titleCase(str) {
        str = str.toLowerCase().split(' ');
        for (var i = 0; i < str.length; i++) {
            str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
        }
        return str.join(' ');
    }

    return(
        <div className='create-new'>
            <h2 align={"center"} className={"black"}>Создание обсуждения</h2>
            <div className='new-card'>
                <div className='new-content'>
                    <div className='content-body'>
                        <ul className='new-task-details'>
                            <li className='new-subject'>Subject:
                                <input
                                    type='text'
                                    className='new-task-subject'
                                    autoFocus
                                    onChange={(e) =>  handleSubject(e.target.value)}>
                                </input>
                            </li>
                            <li className='body-input'>
                                <textarea
                                    className='new-task-input'
                                    onChange={(e) =>  handleBody(e.target.value)}>
                                </textarea>
                                <input
                                    type="submit"
                                    value='Send'
                                    onClick={() => submitAll()}>
                                </input>
                            </li>
                            <li className='error-new-task'>{error}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateNewQuestion