function guide() {
    window.location = '/guidedSearch';
}


function updateDatabase() {
    window.location = "/saveProducts";
}

function searchQuery() {
    let queryString = document.getElementById('search').value;
    window.location = "/loadProduct?Q" + queryString;
}

function glossary() {
    window.location = "/glossary";
}