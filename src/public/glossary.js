function goHome() {
    window.location = "/";
}

function allProducts() {
    let oReq = new XMLHttpRequest();

    oReq.open("GET", "/products", true);
    oReq.onload = function(oEvent) {
        window.location = "/loadProduct?";
        console.log(oReq.responseText);
    };
    oReq.send();
}