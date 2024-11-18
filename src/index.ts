import express from 'express';
import router from './routes';
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

dotenv.config(); 
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

const port = process.env.PORT?? 3000;

app.use(router);

app.get("/", (req, res) => {
  res.send("Blog API is running!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
