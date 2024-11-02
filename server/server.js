import express from "express"
import {dataRouter}  from './routes/dataRouter.js';
import  {queryRouter} from './routes/queryRouter.js';
import { postQuery } from "./controllers/dataController.js";
//set up the express dependency

//create an instance of express
const app = express();

const port = 3001;

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
  });
app.use(express.json());
app.use('/api/data', dataRouter)
app.use('/api/data/query', queryRouter);

app.get('/', (req, res) => {
    res.send('Data works!');
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
  