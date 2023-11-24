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

app.all('*', (req: Request, res: Response) => {
  res.status(400).json({
    status:false,
    message:"Route not found"
  })
});

app.use((error: any, req: Request, res: Response) => {
  res.status(500).json({
    message: 'Something went wrong',
    error: error,
  });
});



export default app;
