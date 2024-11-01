//set up the express dependency
const express = require('express');

//create an instance of express
const app = express();

const port = process.env.PORT || 3000;

app.use('/api')

app.get('/', (req, res) => {
    res.send('Hello World!');
});
  
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
  