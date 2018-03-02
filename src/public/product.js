let allResults = [];
let currResults = [];
let pastResults = [];
let compareList = [];
let checkboxToIdx = new Map();

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
        for (let i = 0; i < allResults.length; i++) {
            //console.log(currResults[i].access.includes("keys"));
            // note this is so redundant I really need to fix it. omg. ew. ick.
            console.log(allResults[i].professional === 'true');
            if (filter.id === 'professional' &&
                allResults[i].professional) {
                console.log('got into professional');
                newCurr.push(allResults[i]);
            } else if (filter.id === 'hardware' && allResults[i].hardware) {
                console.log('got into hardware');
                newCurr.push(allResults[i]);
            } else if (filter.id === 'software' && !allResults[i].hardware) {
                newcurr.push(allResults[i]);
                console.log('got into software');
            } else if (filter.id === 'keyboard'
                && (allResults[i].access.includes("keys") ||
            allResults[i].access.includes("keyboard"))) {
                newCurr.push(allResults[i]);
                console.log('got into keys');
            } else if (filter.id === 'accessTouch'
                && allResults[i].access.includes("touch")) {
                newCurr.push(allResults[i]);
                console.log('got into');
            } else if (filter.id === 'accessVoice'
                && allResults[i].access.includes("voice")) {
                newCurr.push(allResults[i]);
                console.log('got into ');
            } else if (filter.id === 'accessEyes'
                && allResults[i].access.includes("eyes")) {
                newCurr.push(allResults[i]);
                console.log('got into ');
            } else if (filter.id === 'accessECU'
                && allResults[i].access.includes("ecu")) {
                newCurr.push(allResults[i]);
                console.log('got into ');
            } else if (filter.id === 'softwareIOS'
                && allResults[i].platform.includes("ios")) {
                newCurr.push(allResults[i]);
            } else if (filter.id === 'softwareMacOs'
                && allResults[i].platform.includes("macOS")) {
                newCurr.push(allResults[i]);
            } else if (filter.id === 'softwareWindows'
                && allResults[i].platform.includes("windows")) {
                newCurr.push(allResults[i]);
            } else if (filter.id === 'softwareAndroid'
                && allResults[i].platform.includes("android")) {
                newCurr.push(allResults[i]);
            } else if (filter.id === 'french'
                && allResults[i].languages.includes("french")) {
                newCurr.push(allResults[i]);
            } else if (filter.id === 'english'
                && allResults[i].languages.includes("english")) {
                newCurr.push(allResults[i]);
            } else if (filter.id === 'chinese'
                && allResults[i].languages.includes("chinese")) {
                newCurr.push(allResults[i]);
            } else if (filter.id === 'spanish'
                && allResults[i].languages.includes("spanish")) {
                newCurr.push(allResults[i]);
            } else if (filter.id === 'german'
                && allResults[i].languages.includes("german")) {
                newCurr.push(allResults[i]);
            } else if (filter.id === 'japanese'
                && allResults[i].languages.includes("japanese")) {
                newCurr.push(allResults[i]);
            } else if (filter.id === 'freeTo50'
                && allResults[i].price === 0) {
                newCurr.push(allResults[i]);
            } else if (filter.id === '0to99'
                && allResults[i].price <= 99.99) {
                newCurr.push(allResults[i]);
            } else if (filter.id === '100to599'
                && allResults[i].price >= 100 &&
                allResults[i].price <= 599.99) {
                newCurr.push(allResults[i]);
            } else if (filter.id === '600to999'
                && allResults[i].price >= 600 &&
                allResults[i].price <= 999.99) {
                newCurr.push(allResults[i]);
            } else if (filter.id === '1000up'
                && allResults[i].price >= 1000) {
                newCurr.push(allResults[i]);
            } else if (filter.id === 'emailExtra'
                && allResults[i].features.includes("email")) {
                newCurr.push(allResults[i]);
            } else if (filter.id === 'textingExtra'
                && allResults[i].features.includes("texting")) {
                newCurr.push(allResults[i]);
            } else if (filter.id === 'socialMedia'
                && allResults[i].features.includes("social media")) {
                newCurr.push(allResults[i]);
            } else if (filter.id === 'notetaking'
                && allResults[i].features.includes("notetaking")) {
                newCurr.push(allResults[i]);
            } else if (filter.id === 'drawingWriting'
                && allResults[i].features.includes("drawing and writing")) {
                newCurr.push(allResults[i]);
            } else if (filter.id === 'personalVoice'
                && allResults[i].features.includes("personal voice")) {
                newCurr.push(allResults[i]);
            } else if (filter.id === 'personalPhrase'
                && allResults[i].features.includes("personal phrase")) {
                newCurr.push(allResults[i]);
            } else if (filter.id === 'symbols'
                && allResults[i].features.includes("symbols")) {
                newCurr.push(allResults[i]);
            } else if (filter.id === 'camera'
                && allResults[i].features.includes("camera")) {
                newCurr.push(allResults[i]);
            } else if (filter.id === 'wearable'
                && allResults[i].features.includes("wearable ")) {
                newCurr.push(allResults[i]);
            }
        }

        pastResults.push(newCurr);
        checkboxToIdx.set(filter.id, pastResults.length - 1);
        currResults = newCurr;
        displayResults();
    } else {
        if (checkboxToIdx.get(filter.id) === pastResults.length - 1) {
            pastResults.pop();
            console.log(pastResults);
            currResults = pastResults[pastResults.length - 1];
            checkboxToIdx.delete(filter.id);
            console.log(checkboxToIdx);
        } else {
            alert('for now, please unclick the last filter you selected first!');
            document.getElementById(filter.id).checked = true;

        }
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

