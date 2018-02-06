function check() {
    let queryString = "";
    // will fix this
    let addAnd = false;

    if (document.getElementById("hardware").checked) {
        queryString += "hardware=true";
        addAnd = true;
    }
    if (document.getElementById("software").checked) {
        if (addAnd) {
            queryString += "&";
        }
        queryString += "software=true";
        addAnd = true;
    }
    let idx = '0';
    if (document.getElementById("keyboard").checked) {
        if (addAnd) {
            queryString += "&";
        }
        queryString += "access[" + idx + "]=keyboard";
        idx = '1';
        addAnd = true;
    }
    if (document.getElementById("accessTouch").checked) {
        if (addAnd) {
            queryString += "&";
        }
        queryString += "access[" + idx + "]=touch";
        idx = '2';
        addAnd = true;
    }
    if (document.getElementById("accessVoice").checked) {
        if (addAnd) {
            queryString += "&";
        }
        queryString += "access[" + idx + "]=voice";
        idx = '3';
        addAnd = true;
    }
    if (document.getElementById("accessEyes").checked) {
        if (addAnd) {
            queryString += "&";
        }
        queryString += "access[" + idx + "]=eyes";
        idx = '4';
        addAnd = true;
    }
    if (document.getElementById("accessECU").checked) {
        if (addAnd) {
            queryString += "&";
        }
        queryString += "access[" + idx + "]=ecu";
        idx = '5';
        addAnd = true;
    }
    idx = '0';
    if (document.getElementById("softwareIOS").checked) {
        if (addAnd) {
            queryString += "&";
        }
        queryString += "software[" + idx + "]=ios";
        idx = '1';
        addAnd = true;
    }
    if (document.getElementById("softwareMacOS").checked) {
        if (addAnd) {
            queryString += "&";
        }
        queryString += "software[" + idx + "]=macOS";
        idx = '2';
        addAnd = true;
    }
    if (document.getElementById("softwareWindows").checked) {
        if (addAnd) {
            queryString += "&";
        }
        queryString += "software[" + idx + "]=windows";
        idx = '3';
        addAnd = true;
    }
    if (document.getElementById("softwareAndroid").checked) {
        if (addAnd) {
            queryString += "&";
        }
        queryString += "software[" + idx + "]=android";
        idx = '4';
        addAnd = true;
    }
    idx = '0';
    if (document.getElementById("french").checked) {
        if (addAnd) {
            queryString += "&";
        }
        queryString += "languages[" + idx + "]=french";
        idx = '1';
        addAnd = true;
    }
    if (document.getElementById("english").checked) {
        if (addAnd) {
            queryString += "&";
        }
        queryString += "languages[" + idx + "]=english";
        idx = '2';
        addAnd = true;
    }
    if (document.getElementById("chinese").checked) {
        if (addAnd) {
            queryString += "&";
        }
        queryString += "languages[" + idx + "]=chinese";
        idx = '3';
        addAnd = true;
    }
    if (document.getElementById("spanish").checked) {
        if (addAnd) {
            queryString += "&";
        }
        queryString += "languages[" + idx + "]=spanish";
        idx = '4';
        addAnd = true;
    }
    if (document.getElementById("german").checked) {
        if (addAnd) {
            queryString += "&";
        }
        queryString += "languages[" + idx + "]=german";
        idx = '5';
        addAnd = true;
    }
    if (document.getElementById("japanese").checked) {
        if (addAnd) {
            queryString += "&";
        }
        queryString += "languages[" + idx + "]=japanese";
        addAnd = true;
    }
    if (document.getElementById("freeTo50").checked) {
        if (addAnd) {
            queryString += "&";
        }
        queryString += "minPrice=0&maxPrice=50";
        addAnd = true;
    }
    if (document.getElementById("0to99").checked) {
        if (addAnd) {
            queryString += "&";
        }
        queryString += "minPrice=0&maxPrice=99";
        addAnd = true;
    }
    if (document.getElementById("100to599").checked) {
        if (addAnd) {
            queryString += "&";
        }
        queryString += "minPrice=100&maxPrice=599";
        addAnd = true;
    }
    if (document.getElementById("600to999").checked) {
        if (addAnd) {
            queryString += "&";
        }
        queryString += "minPrice=600&maxPrice=999";
        addAnd = true;
    }
    if (document.getElementById("1000up").checked) {
        if (addAnd) {
            queryString += "&";
        }
        // should change this!
        queryString += "minPrice=1000&maxPrice=500000";
        addAnd = true;
    }

    idx = '0';
    if (document.getElementById("emailExtra").checked) {
        if (addAnd) {
            queryString += "&";
        }
        queryString += "features[" + idx + "]=email";
        idx ='1';
        addAnd = true;
    }
    if (document.getElementById("textingExtra").checked) {
        if (addAnd) {
            queryString += "&";
        }
        queryString += "features[" + idx + "]=texting";
        idx ='2';
        addAnd = true;
    }
    if (document.getElementById("socialMedia").checked) {
        if (addAnd) {
            queryString += "&";
        }
        queryString += "features[" + idx + "]=social";
        idx ='3';
        addAnd = true;
    }
    if (document.getElementById("notetaking").checked) {
        if (addAnd) {
            queryString += "&";
        }
        queryString += "features[" + idx + "]=notetaking";
        idx ='4';
        addAnd = true;
    }
    if (document.getElementById("drawingWriting").checked) {
        if (addAnd) {
            queryString += "&";
        }
        queryString += "features[" + idx + "]=drawing";
        idx ='5';
        addAnd = true;
    }
    if (document.getElementById("personalVoice").checked) {
        if (addAnd) {
            queryString += "&";
        }
        queryString += "features[" + idx + "]=voice";
        idx ='6';
        addAnd = true;
    }
    if (document.getElementById("personalPhrase").checked) {
        if (addAnd) {
            queryString += "&";
        }
        queryString += "features[" + idx + "]=phrase";
        idx ='7';
        addAnd = true;
    }
    if (document.getElementById("symbols").checked) {
        if (addAnd) {
            queryString += "&";
        }
        queryString += "features[" + idx + "]=symbols";
        idx ='8';
        addAnd = true;
    }
    if (document.getElementById("camera").checked) {
        if (addAnd) {
            queryString += "&";
        }
        queryString += "features[" + idx + "]=camera";
        idx ='9';
        addAnd = true;
    }
    if (document.getElementById("wearable").checked) {
        if (addAnd) {
            queryString += "&";
        }
        queryString += "features[" + idx + "]=wearable";
    }
    console.log(queryString);

    let oReq = new XMLHttpRequest();

    oReq.open("GET", "/product?" + queryString, true);
    oReq.onload = function(oEvent) {
        console.log(oReq.responseText);
    };
    oReq.send();
    //ev.preventDefault();
}

function getAll() {
    let oReq = new XMLHttpRequest();

    oReq.open("GET", "/products", true);
    oReq.onload = function(oEvent) {
        window.location = "/loadProduct";
        console.log(oReq.responseText);
    };
    oReq.send();
}