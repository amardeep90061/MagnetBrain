import express from 'express';
import taskRoutes from './routes/task.js'; 
import authRoutes from './routes/auth.js';
import mongoose from 'mongoose';
import cors from 'cors'; 
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('Connected!'));

  const corsOptions = {
    origin: ['http://localhost:5173','https://magnet-brain-backend.vercel.app/'] // 2. ONLY allow your frontend's origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 3. Allow these methods
    credentials: true, // If you plan to use cookies/sessions
    optionsSuccessStatus: 204
};

app.use(express.json());
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send('Hello World!');
})
app.use('/api', taskRoutes);
app.use('/auth',authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
