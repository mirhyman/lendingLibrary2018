let imgSrc;
let id =0;
let bulletList = [];
let otherList = [];
let currImage = '';

let badgesTitle = ["MacOS Compatible", "ECU Compatible",
"iOS Compatible", "Windows Compatible", "Android Compatible",
"Multilingual", "Email", "Texting", "Social Media", "Free Draw/Write",
"Built-in Camera", "Mountable", "Wearable", "Warranty", "Digitized Speech",
"Naturalistic Speech", "Record Your Own Voice", "Symbol-based Vocabulary",
"Photo-based Vocabulary", "Word-based Vocabulary", "Phrase-based Vocabulary",
"Text-based Communication", "Word Prediction", "Phrase Prediction",
"Sentence Prediction", "Programmable Shortcuts"];

let badgesCheckbox = ["macOSPlatform", "platformECU",
"iOSPlatform", "windowsPlatform", "androidPlatform", "multilingualLang",
"emailFeat", "textFeat", "socialFeat", "drawFeat", "cameraFeat",
"mountableFeat", "wearableFeat", "warrantyFeat", "digitizedSpeech",
"naturalisticSpeech", "recordSpeech", "symbolVocab",
"photoVocab", "wordVocab", "phraseVocab", "textVocab",
"wordPrediction", "phrasePrediction", "sentencePrediction", "programShortcut"];

function addImg(btn) {

    if (currImage === btn.id) {
        currImage = '';
    } else {
        currImage = btn.id;
    }
    console.log(currImage);
}

function addProduct() {
    //let btn = document.getElementById("get_name");
    let form = document.querySelector("form");

    //var oOutput = document.getElementById("post_res");
    let oData = new FormData(form);
    //console.log(oData.entries());
    let obj = "";
    let i = 0;
    let accessIdx = 0;
    let languagesIdx = 0;
    let platformIdx = 0;
    let featuresIdx = 0;
    let badgesIdx = 0;
    for (var pair of oData.entries()) {
        console.log(pair[0]);
        if (i !== 0) {
            obj += "&";
        }
        if (pair[0] === 'hardware') {
            obj += 'hardware=true';
        } else if (pair[0] === 'software') {
            obj += 'hardware=false';
        } else if (pair[0] === 'price') {
            obj += 'price=' + pair[1];
        } else if (pair[0] === 'brand') {
            obj += 'brand=' + pair[1];
        } else if (pair[0] === 'id') {
            obj += 'id=' + pair[1];
            id = pair[1];
        } else if (pair[0] === 'name') {
            obj += 'name=' + pair[1];
        } else if (pair[0] === 'description') {
            obj += 'description=' + pair[1] + "&";
        } else if (pair[0] === 'weight') {
            obj += 'spec[0]=' + pair[1];
        } else if (pair[0] === 'dimensions') {
            obj += 'spec[1]=' + pair[1];
        }else if (pair[0] === 'battery') {
            obj += 'spec[2]=' + pair[1];
        } else {
            obj = obj.substring(0, obj.length - 1);
        }
        i++;
    }
    if (document.getElementById('professionalTrue').checked === true) {
        obj += 'professional=true&';
    } else {
        obj += 'professional=false&';
    }
    if (document.getElementById('accessTouch').checked === true) {
        obj += "access[" + accessIdx + "]=touch&";
        accessIdx++;
    }
    if (document.getElementById('accessKeyboard').checked === true) {
        obj += "access[" + accessIdx + "]=keyboard&";
        accessIdx++;
    }
    if (document.getElementById('accessSwitch').checked === true) {
        obj += "access[" + accessIdx + "]=switch&";
        accessIdx++;
    }
    if (document.getElementById('accessMouse').checked === true) {
        obj += "access[" + accessIdx + "]=mouse&";
        accessIdx++;
    }
    if (document.getElementById('accessEyes').checked === true) {
        obj += "access[" + accessIdx + "]=eye&";
        accessIdx++;
    }
    if (document.getElementById('access').checked === true) {
        obj += "access[" + accessIdx + "]=other&";
    }
    if (document.getElementById('macOSPlatform').checked === true) {
        obj += "platform[" + platformIdx + "]=mac&";
        obj += "badges[" + badgesIdx + "]=true&";
        platformIdx++;
    } else {
        obj += "badges[" + badgesIdx + "]=false&";
    }
    badgesIdx++;
    if (document.getElementById('iOSPlatform').checked === true) {
        obj += "platform[" + platformIdx + "]=ios&";
        obj += "badges[" + badgesIdx + "]=true&";
        platformIdx++;
    } else {
        obj += "badges[" + badgesIdx + "]=false&";
    }
    badgesIdx++;
    if (document.getElementById('windowsPlatform').checked === true) {
        obj += "platform[" + platformIdx + "]=windows&";
        obj += "badges[" + badgesIdx + "]=true&";
        platformIdx++;
    } else {
        obj += "badges[" + badgesIdx + "]=false&";
    }
    badgesIdx++;
    if (document.getElementById('androidPlatform').checked === true) {
        obj += "platform[" + platformIdx + "]=android&";
        obj += "badges[" + badgesIdx + "]=true&";
    } else {
        obj += "badges[" + badgesIdx + "]=false&";
    }
    badgesIdx++;
    if (document.getElementById('englishLang').checked === true) {
        obj += "languages[" + languagesIdx + "]=english&";
        languagesIdx++;
    }
    if (document.getElementById('spanishLang').checked === true) {
        obj += "languages[" + languagesIdx + "]=spanish&";
        languagesIdx++;
    }
    if (document.getElementById('mandarinLang').checked === true) {
        obj += "languages[" + languagesIdx + "]=mandarin&";
        languagesIdx++;
    }
    if (document.getElementById('frenchLang').checked === true) {
        obj += "languages[" + languagesIdx + "]=french&";
        languagesIdx++;
    }
    if (document.getElementById('multilingualLang').checked === true) {
        obj += "languages[" + languagesIdx + "]=multilingual&";
        obj += "badges[" + badgesIdx + "]=true&";
    } else {
        obj += "badges[" + badgesIdx + "]=false&";
    }
    badgesIdx++;
    if (document.getElementById('emailFeat').checked === true) {
        obj += "features[" + featuresIdx + "]=email&";
        obj += "badges[" + badgesIdx + "]=true&";
        featuresIdx++;
    } else {
        obj += "badges[" + badgesIdx + "]=false&";
    }
    badgesIdx++;
    if (document.getElementById('textFeat').checked === true) {
        obj += "features[" + featuresIdx + "]=texting&";
        obj += "badges[" + badgesIdx + "]=true&";
        featuresIdx++;
    } else {
        obj += "badges[" + badgesIdx + "]=false&";
    }
    badgesIdx++;
    if (document.getElementById('socialFeat').checked === true) {
        obj += "features[" + featuresIdx + "]=social&";
        obj += "badges[" + badgesIdx + "]=true&";
        featuresIdx++;
    } else {
        obj += "badges[" + badgesIdx + "]=false&";
    }
    badgesIdx++;
    if (document.getElementById('drawFeat').checked === true) {
        obj += "features[" + featuresIdx + "]=draw&";
        obj += "badges[" + badgesIdx + "]=true&";
        featuresIdx++;
    } else {
        obj += "badges[" + badgesIdx + "]=false&";
    }
    badgesIdx++;
    if (document.getElementById('cameraFeat').checked === true) {
        obj += "features[" + featuresIdx + "]=camera&";
        obj += "badges[" + badgesIdx + "]=true&";
        featuresIdx++;
    } else {
        obj += "badges[" + badgesIdx + "]=false&";
    }
    badgesIdx++;
    if (document.getElementById('mountableFeat').checked === true) {
        obj += "features[" + featuresIdx + "]=mountable&";
        obj += "badges[" + badgesIdx + "]=true&";
        featuresIdx++;
    } else {
        obj += "badges[" + badgesIdx + "]=false&";
    }
    badgesIdx++;
    if (document.getElementById('wearableFeat').checked === true) {
        obj += "features[" + featuresIdx + "]=wearable&";
        obj += "badges[" + badgesIdx + "]=true&";
        featuresIdx++;
    } else {
        obj += "badges[" + badgesIdx + "]=false&";
    }
    badgesIdx++;
    if (document.getElementById('warrantyFeat').checked === true) {
        obj += "features[" + featuresIdx + "]=warranty&";
        obj += "badges[" + badgesIdx + "]=true&";
        featuresIdx++;
    } else {
        obj += "badges[" + badgesIdx + "]=false&";
    }
    badgesIdx++;
    if (document.getElementById('digitizedSpeech').checked === true) {
        obj += "badges[" + badgesIdx + "]=true&";
    } else {
        obj += "badges[" + badgesIdx + "]=false&";
    }
    badgesIdx++;
    if (document.getElementById('naturalisticSpeech').checked === true) {
        obj += "badges[" + badgesIdx + "]=true&";
    } else {
        obj += "badges[" + badgesIdx + "]=false&";
    }
    badgesIdx++;
    if (document.getElementById('recordSpeech').checked === true) {
        obj += "badges[" + badgesIdx + "]=true&";
    } else {
        obj += "badges[" + badgesIdx + "]=false&";
    }
    badgesIdx++;
    if (document.getElementById('symbolVocab').checked === true) {
        obj += "badges[" + badgesIdx + "]=true&";
    } else {
        obj += "badges[" + badgesIdx + "]=false&";
    }
    badgesIdx++;
    if (document.getElementById('photoVocab').checked === true) {
        obj += "badges[" + badgesIdx + "]=true&";
    } else {
        obj += "badges[" + badgesIdx + "]=false&";
    }
    badgesIdx++;
    if (document.getElementById('wordVocab').checked === true) {
        obj += "badges[" + badgesIdx + "]=true&";
    } else {
        obj += "badges[" + badgesIdx + "]=false&";
    }
    badgesIdx++;
    if (document.getElementById('phraseVocab').checked === true) {
        obj += "badges[" + badgesIdx + "]=true&";
    } else {
        obj += "badges[" + badgesIdx + "]=false&";
    }
    badgesIdx++;
    if (document.getElementById('textVocab').checked === true) {
        obj += "badges[" + badgesIdx + "]=true&";
    } else {
        obj += "badges[" + badgesIdx + "]=false&";
    }
    badgesIdx++;
    if (document.getElementById('wordPrediction').checked === true) {
        obj += "badges[" + badgesIdx + "]=true&";
    } else {
        obj += "badges[" + badgesIdx + "]=false&";
    }
    badgesIdx++;
    if (document.getElementById('phrasePrediction').checked === true) {
        obj += "badges[" + badgesIdx + "]=true&";
    } else {
        obj += "badges[" + badgesIdx + "]=false&";
    }
    badgesIdx++;
    if (document.getElementById('sentencePrediction').checked === true) {
        obj += "badges[" + badgesIdx + "]=true&";
    } else {
        obj += "badges[" + badgesIdx + "]=false&";
    }
    badgesIdx++;
    if (document.getElementById('programShortcut').checked === true) {
        obj += "badges[" + badgesIdx + "]=true";
    } else {
        obj += "badges[" + badgesIdx + "]=false";
    }
    badgesIdx++;

    for (let i = 0; i < bulletList.length; i++) {
        obj += "&longDescription[" + i + "]=" + bulletList[i];
    }

    for (let i = 0; i < otherList.length; i++) {
        obj += "&other[" + i + "]=" + otherList[i];
    }


    if (currImg !== '') {
        obj += "&img=" + currImg;
    }


    console.log(obj);
    var oReq = new XMLHttpRequest();

    oReq.open("post", '/product/', true);
    oReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    oReq.onload = function (oEvent) {
        console.log(oReq.responseText);
    };
    oReq.send(obj);
}

function addBullet() {
    let bullet = document.getElementById("point1").value;
    bulletList.push(bullet);
    let curList = Array.from(document.getElementById("bullets").getElementsByTagName("li"));
    let s = "";
    for (let i = 0; i < curList.length; i++) {
        s += "<li>" + curList[i].textContent + "</li>";
    }
    console.log(curList);
    s += "<li>" + bullet + "</li>";
    document.getElementById("bullets").innerHTML = s;
    document.getElementById("point1").value = "";
}

function addInfo() {
    let bullet = document.getElementById("info1").value;
    otherList.push(bullet);
    let curList = Array.from(document.getElementById("infoList").getElementsByTagName("li"));
    let s = "";
    for (let i = 0; i < curList.length; i++) {
        s += "<li>" + curList[i].textContent + "</li>";
    }
    console.log(curList);
    s += "<li>" + bullet + "</li>";
    document.getElementById("infoList").innerHTML = s;
    document.getElementById("info1").value = "";
}

function removeBullet(){
    if (bulletList.length === 0) {
        alert("No bullets to remove!");
    } else {
        bulletList.pop();
        let curList = Array.from(document.getElementById("bullets").getElementsByTagName("li"));
        let s = "";
        for (let i = 0; i < curList.length - 1; i++) {
            s += "<li>" + curList[i].textContent + "</li>";
        }
        console.log(curList);
        document.getElementById("bullets").innerHTML = s;
    }
}

function removeInfo(){
    if (otherList.length === 0) {
        alert("No bullets to remove!");
    } else {
        otherList.pop();
        let curList = Array.from(document.getElementById("infoList").getElementsByTagName("li"));
        let s = "";
        for (let i = 0; i < curList.length - 1; i++) {
            s += "<li>" + curList[i].textContent + "</li>";
        }
        console.log(curList);
        document.getElementById("infoList").innerHTML = s;
    }
}

function idHelp() {
    alert("This is a product's Amazon ID. Please find your product on Amazon, scroll down to the Product" +
        " details section, and copy the ASIN");
}

function profHelp() {
    alert("While anyone can add products to Access for All, some of our product descriptions are written by" +
        " medical professionals. Let us know who you are!");
}

function softwareHelp() {
    alert("Hardware is a physical device, and software is something you can download onto a device you already" +
        " have. Microsoft Word is software, while a laptop is hardware.");
}

function accessHelp() {
    alert("Types of Access describe the different ways users can interact with your product.");
}

function platformHelp() {
    alert("Platforms are the different operating systems that your product is compatible with. " +
        "You should be able to find this information in any other description of your product. You " +
        "can also visit the glossary for more information about ECU compatibility.");
}

function languageHelp() {
    alert("Select the languages that your product can communicate in.");
}

function featureHelp() {
    alert("Features are any other additional functionality of your product that is not accounted for in the" +
        " previous categories.");
}

function shortHelp() {
    alert("This description of your product should be a short blurb that will appear in the search results page.");
}

function goHome() {
    window.location = "/";
}

function myFunction() {

    let x = document.getElementById("myFile");
    if ('files' in x) {
        if (x.files.length === 0) {
            alert("Select one or more files.")
        } else {
            for (let i = 0; i < x.files.length; i++) {
                let file = x.files[i];
                imgSrc = file;
                var formData = new FormData();
                formData.append('file', file);
                formData.append('id', id);
                var oReq = new XMLHttpRequest();
                let obj = {
                    file: file,
                    id: id
                };

                oReq.open("post", '/productImage', true);
                oReq.setRequestHeader("Content-type", "multipart/form-data");
                oReq.onload = function (oEvent) {
                    console.log(oReq.responseText);
                };
                for (let str of formData.entries()) {
                    console.log(str[0]);
                    console.log(str[1]);
                }
                oReq.send(formData);
            }
        }
    }
}