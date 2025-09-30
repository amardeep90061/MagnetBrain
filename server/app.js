import express from 'express';
import taskRoutes from './routes/task.js'; 
import authRoutes from './routes/auth.js';
import mongoose from 'mongoose';
import cors from 'cors'; 
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('Connected!'))
  .catch(err => console.error('MongoDB connection error:', err));

  const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
    credentials: true,                       
    optionsSuccessStatus: 204
};

app.use(express.json());
app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send('Hello World!');
})
app.use('/api', taskRoutes);
app.use('/auth',authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
