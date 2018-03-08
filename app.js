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
app.use('/loadProduct', express.static('src/public/product.html'));
app.use('/productPage', express.static('src/public/productPage.html'));
app.use('/saveProducts', express.static('src/public/saveProducts.html'));
app.use('/guidedSearch', express.static('src/public/guidedSearch.html'));
app.use('/compareProducts', express.static('src/public/compare.html'));
app.use('/glossary', express.static('src/public/glossary.html'));
app.use('/about', express.static('src/public/about.html'));
app.use('/guidedSearchIntro', express.static('src/public/guidedSearchIntro.html'));
app.use('/', route);

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

module.exports = app;