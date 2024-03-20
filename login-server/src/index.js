import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { authRouter } from './routes/auth.route.js';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.use(cors({
  origin: process.env.CLIENT_HOST,
  credentials: true,
}));

app.use(authRouter);

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});