import React, { useEffect, useState } from 'react';
import Create from './Create';
import './App.css';
import axios from 'axios';
import { 
    BsCircleFill, 
    BsFillCheckCircleFill, 
    BsFillTrashFill, 
    BsPencilFill
} from 'react-icons/bs';

const Home = () => {
    const [todos, setTodos] = useState([]);
    const [updatetask, setUpdatetask] = useState('');
    const [taskid, setTaskid] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5003/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    }, []);

    const toggleTask = (id, done) => {
        const confirmationMessage = done
            ? "Do you want to mark this task as not done?"
            : "Are you sure you're done with this task?";
        
        if (window.confirm(confirmationMessage)) {
            axios.put(`http://localhost:5003/edit/${id}`)
                .then(result => {
                    console.log(result.data);
                    const updatedTodos = todos.map(todo => {
                        if (todo._id === id) {
                            return { ...todo, done: !todo.done };
                        }
                        return todo;
                    });
                    setTodos(updatedTodos);
                })
                .catch(err => console.log(err));
        }
    };

    const Update = (id, updatedTask) => {
        axios.put(`http://localhost:5003/update/${id}`, { task: updatedTask })
            .then(result => {
                console.log(result.data);
                const updatedTodos = todos.map(todo => {
                    if (todo._id === id) {
                        return { ...todo, task: updatedTask };
                    }
                    return todo;
                });
                setTodos(updatedTodos);
                setTaskid('');
                setUpdatetask('');
                window.location.reload(); 
            })
            .catch(err => console.log(err));
    };

    const Hdelete = (id) => {
        axios.delete(`http://localhost:5003/delete/${id}`)
            .then(result => {
                console.log(result.data);
                const updatedTodos = todos.filter(todo => todo._id !== id);
                setTodos(updatedTodos);
            })
            .catch(err => console.log(err));
    };

    return (
        <main>
            <h1 style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img 
                    src="/image.png" 
                    alt="ToDo Icon" 
                    style={{ width: '82px', height: '82px' }} 
                />
                ToDo List
            </h1>

            <Create />

            {
                todos.length === 0 ? <div className='task'>No tasks found</div> :
                    todos.map((todo) => (
                        <div className='task' key={todo._id}>
                            <div className='checkbox'>
                                {todo.done ? 
                                    <BsFillCheckCircleFill 
                                        className='icon' 
                                        onClick={() => toggleTask(todo._id, todo.done)} 
                                    /> :
                                    <BsCircleFill 
                                        className='icon' 
                                        onClick={() => toggleTask(todo._id, todo.done)} 
                                    />
                                }
                                {taskid === todo._id ? (
                                    <input 
                                        type='text' 
                                        value={updatetask} 
                                        onChange={e => setUpdatetask(e.target.value)} 
                                    />
                                ) : (
                                    <p className={todo.done ? 'through' : 'normal'}>
                                        {todo.task}
                                    </p>
                                )}
                            </div>
                            <div className="icon-container">
                                <BsPencilFill 
                                    className='icon' 
                                    onClick={() => {
                                        if (taskid === todo._id) {
                                            Update(todo._id, updatetask);
                                        } else {
                                            setTaskid(todo._id);
                                            setUpdatetask(todo.task);
                                        }
                                    }} 
                                />
                                <BsFillTrashFill 
                                    className='icon' 
                                    onClick={() => Hdelete(todo._id)} 
                                />
                            </div>
                        </div>
                    ))
            }
        </main>
    );
};

export default Home;
