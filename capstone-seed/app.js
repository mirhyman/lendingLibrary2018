const express = require('express');
const app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true}));

// set up an arbitrary port to access on localhost
const port = process.env.PORT || 8081;

// make a call to handle any possible direction
const route = require('./src/routers/router.js');

app.use(express.static('src/public'));
app.use('/loadProduct', express.static('capstone-seed/src/public/product.html'));
app.use('/productPage', express.static('capstone-seed/src/public/productPage.html'));
app.use('/saveProducts', express.static('capstone-seed/src/public/saveProducts.html'));
app.use('/guidedSearch', express.static('capstone-seed/src/public/guidedSearch.html'));
app.use('/compareProducts', express.static('capstone-seed/src/public/compare.html'));
app.use('/glossary', express.static('capstone-seed/src/public/glossary.html'));
app.use('/', route);

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

module.exports = app;