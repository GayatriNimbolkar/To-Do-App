import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

const Create = () => {
    const [task, setTask] = useState('');

    const createTask = () => {
        axios.post('http://localhost:5003/add', { task: task.trim() })
            .then(result => {
                console.log(result.data);
                window.location.reload();
                setTask('');
            })
            .catch(err => console.log(err));
    };

    return (
        <main>
            <div className='create-form'>
                <input
                    type='text'
                    placeholder='Enter a task'
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    required
                />
                <button onClick={createTask}>ADD</button>
            </div>
        </main>
    );
};

export default Create;
