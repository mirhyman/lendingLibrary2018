const express = require('express');
const app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true}));

// set up an arbitrary port to access on localhost
const port = 8081;

// make a call to handle any possible direction
const route = require('./src/routers/router.js');


app.use(express.static('src/public'));
app.us('/loadProduct', express.static('src/public/product.html'));
app.use('/', route);

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

module.exports = app;