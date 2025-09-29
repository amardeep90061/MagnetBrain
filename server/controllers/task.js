import Task from '../models/task.js';

export const createTask = async (req, res) => {
    try {
        const { title, description, dueDate, status } = req.body; 
        const newTask = new Task({ title, description, dueDate, status });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create task' });
    } 
};
export const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;  
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(task);
    }
    catch (error) { 
        res.status(500).json({ error: 'Failed to fetch task' });
    }
};
export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();        
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }   
};
export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;  
        const { title, description, dueDate, status } = req.body;   
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { title, description, dueDate, status },        
            { new: true }
        );
        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update task' });
    }
};
export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;      
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) { 
            return res.status(404).json({ error: 'Task not found' });   
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    }   
    catch (error) {
        res.status(500).json({ error: 'Failed to delete task' });
    }
};  

