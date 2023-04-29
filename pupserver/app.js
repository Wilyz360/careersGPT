import * as http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const hostname = '127.0.0.1';
const port = 3000;

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(
  cors({
    origin: '*',
  })
);

app.get('/', (req, res) => {
  res.send('Hello from the GET route!');
});

// POST route
app.post('/post', (req, res) => {
  const requestBody = req.body;
  res.json(requestBody);
});

// Start the server on port 8080
app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
