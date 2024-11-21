import express from 'express';
import router from './routes';
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
// import { createClient } from 'redis';
import { PrismaClient } from "@prisma/client";
import errorHandler from './error/errorHandler';
import cors from 'cors';

dotenv.config(); 
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

const port = process.env.PORT?? 3000;

app.use(router);

app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

app.use(errorHandler);

app.listen(port, () => {  
  console.log(`Server running at http://localhost:${port}`);
});

export const prisma = new PrismaClient();

// export const client = createClient({
//   password: process.env.REDIS_PASSWORD,
//   socket: {
//     host: process.env.REDIS_HOST,
//     port: Number(process.env.REDIS_PORT)
//   }
// })
// .on("connect", () => console.log('Connected to Redis'))
// .on("error", err => console.log('Redis Client Error', err))
// .connect();

