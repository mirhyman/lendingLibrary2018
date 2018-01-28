const express = require('express');
const app = express();
const video = require('./router.js');

// set up an arbitrary port to access on localhost
const port = 8081;

// make a call to handle any possible direction
app.use('/', video);


app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});