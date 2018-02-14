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

function getAll() {
    let oReq = new XMLHttpRequest();

    oReq.open("GET", "/products", true);
    oReq.onload = function(oEvent) {
        window.location = "/loadProduct?";
        console.log(oReq.responseText);
    };
    oReq.send();
}