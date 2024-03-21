import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { authRouter } from './routes/auth.route.js';
import { userRouter } from './routes/user.route.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.use(cors({
  origin: process.env.CLIENT_HOST,
  credentials: true,
}));

app.use(authRouter);

app.use('/users', userRouter);

app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});