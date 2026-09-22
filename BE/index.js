import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './src/router/UserRouter.js';
import { doctorRouter } from './src/router/DoctorRouter.js';
import { articleRouter } from './src/router/ArticleRouter.js';
import { quizRouter } from './src/router/QuizRouter.js';
import { patientRouter } from './src/router/PatientRouter.js';
import { centerRouter } from './src/router/CenterRouter.js';
import calendarRouter from './src/router/calendarRouter.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = [
  'http://localhost:5173',          
  'https://mindcareaz.netlify.app' 
];

const corsOptions = {
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy: Origin ${origin} is not allowed.`));
    }
  },
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());

app.use('/user', userRouter);
app.use('/doctor', doctorRouter);
app.use('/article', articleRouter);
app.use('/quiz', quizRouter);
app.use('/patient', patientRouter);
app.use('/center', centerRouter);

app.use('/api/calendar', calendarRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

mongoose
    .connect(process.env.DB) 
    .then(() => console.log('MongoDB-yə qoşuldu!'))
    .catch((err) => console.error('MongoDB-yə qoşularkən xəta!', err));


