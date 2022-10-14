import dotenv from 'dotenv';
import express from "express";
import bodyParser from "body-parser";
import users from "./routes/users.js"

//dotenv.config()
const port = 3000
console.log(process.env.AWS_ACCESS_KEY_ID);
console.log(process.env.AWS_SECRET_ACCESS_KEY);
const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({ "hello": "world" })
})

app.use('/api', users );

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})