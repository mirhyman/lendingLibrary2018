let allResults = [];
let currResults = [];
let pastResults = [];
let compareList = [];

window.onload = function() {
    let str = window.location.href;
    let idx = str.indexOf("?");
    str = str.substring(idx);
    let sub = str.indexOf("Q");
    let sub1 = str.indexOf("$ACC");
    let oReq = new XMLHttpRequest();
    //console.log(sub);
    if (sub1 != -1) {
        str = str.substring(5);
        oReq.open("GET", "/productAccess?query=" + str, true);
    } else if (sub !== -1) {
        str = str.substring(2);
        oReq.open("GET", "/textSearch?query=" + str, true);
    } else if (str === "?") {
        //console.log("here 2");
        oReq.open("GET", "/products", true);
    } else {
        //console.log("here 3");
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
        console.log(filter.id);
        for (let i = 0; i < currResults.length; i++) {
            //console.log(currResults[i].access.includes("keys"));
            // note this is so redundant I really need to fix it. omg. ew. ick.
            console.log(currResults[i].professional === 'true');
            if (filter.id === 'professional' &&
                currResults[i].professional) {
                console.log('got into professional');
                newCurr.push(currResults[i]);
            } else if (filter.id === 'hardware' && currResults[i].hardware) {
                console.log('got into hardware');
                newCurr.push(currResults[i]);
            } else if (filter.id === 'software' && !currResults[i].hardware) {
                newcurr.push(currResults[i]);
                console.log('got into software');
            } else if (filter.id === 'keyboard'
                && (currResults[i].access.includes("keys") ||
            currResults[i].access.includes("keyboard"))) {
                newCurr.push(currResults[i]);
                console.log('got into keys');
            } else if (filter.id === 'accessTouch'
                && currResults[i].access.includes("touch")) {
                newCurr.push(currResults[i]);
                console.log('got into');
            } else if (filter.id === 'accessVoice'
                && currResults[i].access.includes("voice")) {
                newCurr.push(currResults[i]);
                console.log('got into ');
            } else if (filter.id === 'accessEyes'
                && currResults[i].access.includes("eyes")) {
                newCurr.push(currResults[i]);
                console.log('got into ');
            } else if (filter.id === 'accessECU'
                && currResults[i].access.includes("ecu")) {
                newCurr.push(currResults[i]);
                console.log('got into ');
            } else if (filter.id === 'softwareIOS'
                && currResults[i].platform.includes("ios")) {
                newCurr.push(currResults[i]);
            } else if (filter.id === 'softwareMacOs'
                && currResults[i].platform.includes("macOS")) {
                newCurr.push(currResults[i]);
            } else if (filter.id === 'softwareWindows'
                && currResults[i].platform.includes("windows")) {
                newCurr.push(currResults[i]);
            } else if (filter.id === 'softwareAndroid'
                && currResults[i].platform.includes("android")) {
                newCurr.push(currResults[i]);
            } else if (filter.id === 'french'
                && currResults[i].languages.includes("french")) {
                newCurr.push(currResults[i]);
            } else if (filter.id === 'english'
                && currResults[i].languages.includes("english")) {
                newCurr.push(currResults[i]);
            } else if (filter.id === 'chinese'
                && currResults[i].languages.includes("chinese")) {
                newCurr.push(currResults[i]);
            } else if (filter.id === 'spanish'
                && currResults[i].languages.includes("spanish")) {
                newCurr.push(currResults[i]);
            } else if (filter.id === 'german'
                && currResults[i].languages.includes("german")) {
                newCurr.push(currResults[i]);
            } else if (filter.id === 'japanese'
                && currResults[i].languages.includes("japanese")) {
                newCurr.push(currResults[i]);
            } else if (filter.id === 'freeTo50'
                && currResults[i].price === 0) {
                newCurr.push(currResults[i]);
            } else if (filter.id === '0to99'
                && currResults[i].price <= 99.99) {
                newCurr.push(currResults[i]);
            } else if (filter.id === '100to599'
                && currResults[i].price >= 100 &&
                currResults[i].price <= 599.99) {
                newCurr.push(currResults[i]);
            } else if (filter.id === '600to999'
                && currResults[i].price >= 600 &&
                currResults[i].price <= 999.99) {
                newCurr.push(currResults[i]);
            } else if (filter.id === '1000up'
                && currResults[i].price >= 1000) {
                newCurr.push(currResults[i]);
            } else if (filter.id === 'emailExtra'
                && currResults[i].features.includes("email")) {
                newCurr.push(currResults[i]);
            } else if (filter.id === 'textingExtra'
                && currResults[i].features.includes("texting")) {
                newCurr.push(currResults[i]);
            } else if (filter.id === 'socialMedia'
                && currResults[i].features.includes("social media")) {
                newCurr.push(currResults[i]);
            } else if (filter.id === 'notetaking'
                && currResults[i].features.includes("notetaking")) {
                newCurr.push(currResults[i]);
            } else if (filter.id === 'drawingWriting'
                && currResults[i].features.includes("drawing and writing")) {
                newCurr.push(currResults[i]);
            } else if (filter.id === 'personalVoice'
                && currResults[i].features.includes("personal voice")) {
                newCurr.push(currResults[i]);
            } else if (filter.id === 'personalPhrase'
                && currResults[i].features.includes("personal phrase")) {
                newCurr.push(currResults[i]);
            } else if (filter.id === 'symbols'
                && currResults[i].features.includes("symbols")) {
                newCurr.push(currResults[i]);
            } else if (filter.id === 'camera'
                && currResults[i].features.includes("camera")) {
                newCurr.push(currResults[i]);
            } else if (filter.id === 'wearable'
                && currResults[i].features.includes("wearable ")) {
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

        build += "<li><div id='info'>";
        build += "<div id='name'>" +
            currResults[i].name.charAt(0).toUpperCase() +
            currResults[i].name.substring(1) + "</div>";
        if (currResults[i].professional === true) {
            build += "<div id='professional'>" +
                "<i class=\"fas fa-user-md\"></i></div>";
        }
        build += "<div id='price'>$" + currResults[i].price + "</div></div>";

        build += "<img src=/images/";
        build += currResults[i].img;
        build += " >";
        build += "<div id='description'>" + currResults[i].description;
        build += "</div>";
        build += "<div id='btns'>";
        build += "<button id='view' name='" +
                    currResults[i].name + "'onclick='goTo(this)'>View</button>";
        build += "<button id='compare' name='" + currResults[i].id +"' onclick='storeCompare(this)'>" +
            "Compare</button></div></li>";
    }
    document.getElementById("resultPanel").innerHTML = currResults.length
        + " result(s) found <br><br>";
    document.getElementById("resultList").innerHTML = build;
}

function storeCompare(btn) {
    if (compareList.length < 3) {
        if (compareList.includes(btn.name)) {
            let idx = compareList.indexOf(btn.name);
            compareList.splice(idx, 1);
            document.getElementById('compare_all_your_items').textContent = "Compare(" +
                compareList.length + ")";
        } else {
            compareList.push(btn.name);
            document.getElementById('compare_all_your_items').textContent = "Compare(" +
                compareList.length + ")";
        }
    } else {
        alert("You can only compare up to 3 items!");
    }
}

function compare() {
    let s = "/compareProducts?";
    if (compareList.length < 2) {
        alert("Add more items!");
    } else {
        for (let i = 0; i < compareList.length; i++) {
            for (let j = 0; j < currResults.length; j++) {
                //console.log(parseInt(compareList[i]));
                if (currResults[j].id === parseInt(compareList[i])) {
                    if (i !== 0) {
                        s += "&";
                    }
                    s += currResults[j].name;
                }
            }
        }
        //console.log(s);
        window.location = s;
    }
}

function goHome() {
    window.location = "/";
}

function goTo(name) {
    window.location = "/productPage?" + name.name;
}

function glossary() {
    window.location = "/glossary";
}
