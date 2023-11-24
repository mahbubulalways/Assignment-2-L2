import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import { userRoute } from './app/modules/users/users.routes';
//parsers
app.use(express.json());
app.use(cors());

// users routes
app.use('/api/users', userRoute);

app.get('/', (req: Request, res: Response) => {
  res.send("Assignment 2's server is ready to work !");
});

export default app;
