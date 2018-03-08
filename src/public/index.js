function guide() {
    window.location = '/guidedSearchIntro';
}


function slideMove() {
    document.getElementById('firstBox').style.visibility="hidden";
    document.getElementById('adding').style.visibility="visible";
    document.getElementById('slideUp').style.visibility = "visible";
}

function slideUp() {

    document.getElementById('firstBox').style.visibility="visible";
    document.getElementById('adding').style.visibility="hidden";
    document.getElementById('slideUp').style.visibility = "hidden";
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

function about() {
    window.location = "/about";
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

function getBy(access) {
    /*
    let oReq = new XMLHttpRequest();

    oReq.open("GET", "/productAccess/" + access, true);
    oReq.onload = function(oEvent) {
        window.location = "/loadProduct?";
        console.log(oReq.responseText);
    };
    oReq.send();
    */
    window.location = "/loadProduct?$ACC" + access;
}

document.getElementById("search")
    .addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("submitSearch").click();
        }
    });


