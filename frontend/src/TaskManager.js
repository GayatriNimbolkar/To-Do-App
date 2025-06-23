import React, { useState, useEffect } from 'react';
import './App.css';
import { 
    BsCircleFill as CircleIcon, 
    BsFillCheckCircleFill as CheckIcon, 
    BsFillTrashFill as TrashIcon, 
    BsPencilFill as EditIcon
} from 'react-icons/bs';
import { getTasks, addTask as addTaskAPI, toggleTask, updateTask, deleteTask as deleteTaskAPI } from './api';

const TaskManager = () => {
    const [taskInput, setTaskInput] = useState('');
    const [taskList, setTaskList] = useState([]);
    const [editInput, setEditInput] = useState('');
    const [editTaskId, setEditTaskId] = useState('');

    useEffect(() => {
        getTasks()
            .then(data => setTaskList(data))
            .catch(error => console.log(error));
    }, []);

    const addTask = () => {
        const trimmedTask = taskInput.trim();
        if (!trimmedTask) return;
        addTaskAPI(trimmedTask)
            .then(() => {
                setTaskInput('');
                return getTasks();
            })
            .then(data => setTaskList(data))
            .catch(error => console.log(error));
    };

    const toggleCompletion = (id, status) => {
        const confirmation = status
            ? "Mark this task as incomplete?"
            : "Mark this task as complete?";

        if (window.confirm(confirmation)) {
            toggleTask(id)
                .then(() => {
                    const updatedList = taskList.map(item =>
                        item._id === id ? { ...item, done: !item.done } : item
                    );
                    setTaskList(updatedList);
                })
                .catch(error => console.log(error));
        }
    };

    const saveEdit = (id, newTask) => {
        updateTask(id, newTask)
            .then(() => {
                const updatedList = taskList.map(item =>
                    item._id === id ? { ...item, task: newTask } : item
                );
                setTaskList(updatedList);
                setEditTaskId('');
                setEditInput('');
            })
            .catch(error => console.log(error));
    };

    const deleteTask = (id) => {
        deleteTaskAPI(id)
            .then(() => {
                const updatedList = taskList.filter(item => item._id !== id);
                setTaskList(updatedList);
            })
            .catch(error => console.log(error));
    };

    return (
        <main>
            <h1 style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img 
                    src="/image.png" 
                    alt="Task Icon" 
                    style={{ width: '82px', height: '82px' }} 
                />
                Task Manager
            </h1>

            <div className='create-form'>
                <input
                    type='text'
                    placeholder='Enter new task'
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                    required
                />
                <button onClick={addTask}>ADD</button>
            </div>

            {taskList.length === 0 ? (
                <div className='task'>No tasks found</div>
            ) : (
                taskList.map((item) => (
                    <div className='task' key={item._id}>
                        <div className='checkbox'>
                            {item.done ? (
                                <CheckIcon
                                    className='icon'
                                    onClick={() => toggleCompletion(item._id, item.done)}
                                />
                            ) : (
                                <CircleIcon
                                    className='icon'
                                    onClick={() => toggleCompletion(item._id, item.done)}
                                />
                            )}
                            {editTaskId === item._id ? (
                                <input
                                    type='text'
                                    value={editInput}
                                    onChange={(e) => setEditInput(e.target.value)}
                                />
                            ) : (
                                <p className={item.done ? 'through' : 'normal'}>{item.task}</p>
                            )}
                        </div>
                        <div className="icon-container">
                            <EditIcon
                                className='icon'
                                onClick={() => {
                                    if (editTaskId === item._id) {
                                        saveEdit(item._id, editInput);
                                    } else {
                                        setEditTaskId(item._id);
                                        setEditInput(item.task);
                                    }
                                }}
                            />
                            <TrashIcon
                                className='icon'
                                onClick={() => deleteTask(item._id)}
                            />
                        </div>
                    </div>
                ))
            )}
        </main>
    );
};

export default TaskManager;
