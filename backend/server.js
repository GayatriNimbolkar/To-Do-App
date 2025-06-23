const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Todo = require('./models/Todo');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(
    'mongodb+srv://ishagayatrinimbolkar2952:Gayatri%4029@cluster0.mhr0iuk.mongodb.net/',
    console.log('MongoDB connected')
);

// Start Server
app.listen(5003, () => {
    console.log('Server is running on port 5003');
});

// Route to add a new task
app.post('/add', (req, res) => {
    const { task } = req.body;
    Todo.create({ task })
        .then(newTask => res.json(newTask))
        .catch(err => console.error('Error adding task:', err));
});

// Route to get all tasks
app.get('/get', (req, res) => {
    Todo.find()
        .then(tasks => res.json(tasks))
        .catch(err => console.error('Error fetching tasks:', err));
});

// Route to mark task as done
app.put('/edit/:id', (req, res) => {
    const { id } = req.params;
    Todo.findByIdAndUpdate(id, { done: true }, { new: true })
        .then(updatedTask => res.json(updatedTask))
        .catch(err => res.json(err));
});

// Route to update task text
app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { task } = req.body;
    Todo.findByIdAndUpdate(id, { task: task })
        .then(updatedTask => res.json(updatedTask))
        .catch(err => res.json(err));
});

// Route to delete a task
app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    Todo.findByIdAndDelete({ _id: id })
        .then(deletedTask => res.json(deletedTask))
        .catch(err => res.json(err));
});

module.exports = app;
