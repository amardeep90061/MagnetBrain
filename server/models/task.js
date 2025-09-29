import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, default: () => new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)  },       // Default due date is 10 days from now
    status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
})

const Task = mongoose.model('Task', taskSchema);
export default Task;