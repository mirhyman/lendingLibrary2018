let allResults = [];
let currResults = [];
let pastResults = [];

window.onload = function() {
    let str = window.location.href;
    let idx = str.indexOf("?");
    str = str.substring(idx);
    let oReq = new XMLHttpRequest();
    if (str === "?") {
        oReq.open("GET", "/products", true);
    } else {
        oReq.open("GET", "/product" + str, true);
    }
    oReq.responseType = 'json';
    oReq.onload = function(oEvent) {
        //let results = oReq.response.length;
        allResults = oReq.response;
        currResults = allResults;
        pastResults.push(allResults);
        displayResults();
    };
    oReq.send();
    //ev.preventDefault();
};

function onCheckUpdate(filter) {
    if (filter.checked) {
        let newCurr = [];
        //console.log(filter.id);
        for (let i = 0; i < currResults.length; i++) {
            //console.log(currResults[i].access.includes("keys"));
            if (filter.id === 'hardware' && currResults[i].hardware) {
                newCurr.push(currResults[i]);
            } else if (filter.id === 'software' && !currResults[i].hardware) {
                newcurr.push(currResults[i]);
            } else if (filter.id === 'keyboard'
                && currResults[i].access.includes("keys")) {
                newCurr.push(currResults[i]);
            }
        }
        pastResults.push(newCurr);
        currResults = newCurr;
        displayResults();
    } else {

        pastResults.pop();
        console.log(pastResults);
        currResults = pastResults[pastResults.length - 1];
        displayResults();
    }
}

function displayResults() {
    let build = "";
    let i;
    for (i = 0; i < currResults.length; i++) {
        build += "<a href='/productPage?" + currResults[i].name + "'<li>";
        build += "<img src=/images/";
        build += currResults[i].img;
        build += " height=42 width=42><br>";
        build += "Name: " + currResults[i].name;
        build += "<br>Hardware: " +
            currResults[i].hardware;
        build += "<br> Access: ";
        build += currResults[i].access.toString().replace("[", "").replace("]", "");
        build += "<br>Languages: ";
        build += currResults[i].languages.toString().replace("[", "").replace("]", "");
        build += "<br>Price: ";
        build += currResults[i].price;
        build += "<br>Extra Feature: ";
        build +=
            currResults[i].features.toString().replace("[", "").replace("]", "");
        build += "</li></a><br>";
    }
    document.getElementById("resultList").innerHTML = currResults.length
        + " result(s) found <br><br>" + build;
}

