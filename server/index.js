import express from "express"
import dataRouter  from './routes/dataRouter.js';
import  queryRouter from './routes/queryRouter.js';

//set up the express dependency

//create an instance of express
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/data', dataRouter)
app.use('/api/data/query', queryRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});
  
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
  