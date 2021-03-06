let imgSrc;
let id =0;
let bulletList = [];
let otherList = [];
let currImage = '';
let objName = '';
let purchaseList = [];
let supportList = [];
let contactList = [];
let contactEmails = [];
let contactLinks = [];
let trainingList = [];
let setup = 0;
let pages = [];

let badgesTitle = ["MacOS Compatible", "ECU Compatible",
"iOS Compatible", "Windows Compatible", "Android Compatible",
"Multilingual", "Email", "Texting", "Social Media", "Free Draw/Write",
"Built-in Camera", "Mountable", "Wearable", "Warranty", "Digitized Speech",
"Naturalistic Speech", "Record Your Own Voice", "Symbol-based Vocabulary",
"Photo-based Vocabulary", "Word-based Vocabulary", "Phrase-based Vocabulary",
"Text-based Communication", "Word Prediction", "Phrase Prediction",
"Sentence Prediction", "Programmable Shortcuts"];

let badgesCheckbox = ["accessTouch", "accessKeyboard", "accessSwitch",
    "accessMouse", "accessEyes","macOSPlatform", "platformECU",
"iOSPlatform", "windowsPlatform", "androidPlatform", "multilingualLang",
"emailFeat", "textFeat", "socialFeat", "drawFeat", "cameraFeat",
"mountableFeat", "wearableFeat", "warrantyFeat", "digitizedSpeech",
"naturalisticSpeech", "recordSpeech", "symbolVocab",
"photoVocab", "wordVocab", "phraseVocab", "textVocab",
"wordPrediction", "phrasePrediction", "sentencePrediction", "programShortcut"];

function nextPages() {
    if (pages.length === 0) {
        pages.push("basicInfo");
        document.getElementById('basicInfo').style.visibility = "hidden";
        document.getElementById('image_select').style.visibility = "hidden";
        document.getElementById('accessInfo').style.visibility = "visible";
        document.getElementById('nextPage').style.marginTop = "450px";
        document.getElementById("page_intro").innerHTML =
            "Please check all the bubbles that apply to your product. These " +
            "criteria will be displayed as visual badges under the desription " +
            "of your product. If you're not sure what something means, click the" +
            " question mark next to its category."
    } else {
        pages.push("accessInfo");
        document.getElementById('accessInfo').style.visibility = "hidden";
        document.getElementById('purchaseDeets').style.visibility = "visible";
        document.getElementById('extraProductInfo').style.visibility = "visible";
        document.getElementById('nextPage').style.visibility = "hidden";
        document.getElementById("page_intro").innerHTML = "Please enter any " +
            "additional information about your product. Also, provide some resources " +
            "for your product so that other users can purchase or get support for it." +
            " If you're not sure what something means, click the" +
        " question mark next to its category.";
    }
}

function addImg(btn) {

    if (currImage === btn.id) {
        currImage = '';
        document.getElementById('displayImg').innerHTML = "<p>You have not selected an image.</p>";
        document.getElementById('displayImg').style = "position: relative;" +
        "left: 500px;" +
        "bottom: 35px;";
        document.getElementById('content').style = "margin-top: 60px;";
        document.getElementById('image_select').style.marginBottom = "0px";
    } else {
        currImage = btn.id;
        document.getElementById('displayImg').innerHTML = "Current Image:           " +
            `<img src=/images/${currImage} width='210px' height='210px'>`;
        document.getElementById('displayImg').style = "position: relative;\n" +
            "    left: 515px;\n" +
            "    bottom: 210px;";
        document.getElementById('content').style = "margin-top: -150px;";
        document.getElementById('image_select').style.marginBottom = "220px";
    }

}

window.onload = function() {
    let str = window.location.href;
    let idx = str.indexOf("?");
    if (idx !== -1) {
        str = str.substring(idx + 1);
        console.log(str);
        let oReq = new XMLHttpRequest();
        oReq.open("GET", "/product/" + str, true);
        oReq.responseType = 'json';
        oReq.onload = function (oEvent) {
            let img = oReq.response.img;

            if (!img || img === '') {
                document.getElementById('displayImg').innerHTML = "<p>No product Image yet</p>";
            } else {
                console.log(img);
                document.getElementById('displayImg').innerHTML = "Current Image:           " +
                    `<img src=/images/${img} width='210px' height='210px'>`;
                document.getElementById('displayImg').style = "position: relative;\n" +
                    "    left: 515px;\n" +
                    "    bottom: 220px;";
                document.getElementById('content').style = "margin-top: -150px;";
                document.getElementById('image_select').style.marginBottom = "220px";

            }
            let name2 = oReq.response.name;
            objName = name2;
            document.getElementById('name').value = name2;
            document.getElementById('name').readOnly = true;
            document.getElementById('name').style = "background: lightgrey;" +
                "border: lightgrey 1px solid;";

            let id2 = oReq.response.id;
            document.getElementById('id').value = id2;
            document.getElementById('id').readOnly = true;
            document.getElementById('id').style = "background: lightgrey;" +
                "border: lightgrey 1px solid;";

            let brand = oReq.response.brand;
            document.getElementById('brand').value = brand;

            let price = oReq.response.price;
            document.getElementById('price').value = price;

            let professional = oReq.response.professional;
            if (professional === 'true') {
                document.getElementById('professionalTrue').checked = true;
            } else {
                document.getElementById('professionalFalse').checked = true;
            }

            let hardware = oReq.response.professional;
            if (hardware === 'true') {
                document.getElementById('hardware').checked = true;
                if (document.getElementById('hardware').checked === true) {
                    document.getElementById('specs').innerHTML =
                        "<label for='weight'>Enter weight:</label>\n" +
                        "        <input id='weight' type='text' name='weight' " +
                        "value='0.0lbs'\n" +
                        '           required>' +
                        '<label for="dimensions">Enter dimensions:</label>' +
                        '<input id=\"dimensions\" type=\"text\"' +
                        'name="dimensions" value="0 x 0" required>' +
                        "<label for='battery'>Enter Battery life:</label>" +
                        '<input id="battery" type="text" name="battery"' +
                        "value ='0' required>(in hours)" +
                        "<label for='screenSize'>Enter Screen Size:</label>" +
                        '<input id="screenSize" type="text" name="screenSize"' +
                        "value ='0' required>";
                }
                let weight = oReq.response.specs[0];
                document.getElementById('weight').value = weight;
                let dimensions = oReq.response.specs[1];
                document.getElementById('dimensions').value = dimensions;
                let battery = oReq.response.specs[2];
                document.getElementById('battery').value = battery;
                if (oReq.response.specs.length > 3) {
                    let screenSize = oReq.response.specs[3];
                    document.getElementById('screenSize').value = screenSize;
                }

            } else {
                document.getElementById('software').checked = true;
            }

            let accessArr = oReq.response.access;
            if (accessArr) {
                for (let i = 0; i < accessArr.length; i++) {
                    if (accessArr[i] === "touch") {
                        document.getElementById('accessTouch').checked = true;
                    }
                    if (accessArr[i] === "keys" || accessArr[i] === "keyboard") {
                        document.getElementById('accessKeyboard').checked = true;
                    }
                    if (accessArr[i] === "switch") {
                        document.getElementById('accessSwitch').checked = true;
                    }
                    if (accessArr[i] === "mouse") {
                        document.getElementById('accessMouse').checked = true;
                    }
                    if (accessArr[i] === "eyes") {
                        document.getElementById('accessEyes').checked = true;
                    }
                    if (accessArr[i] === "other") {
                        document.getElementById('access').checked = true;
                    }

                }
            }

            let languagesArr = oReq.response.languages;
            if (languagesArr) {
                for (let i = 0; i < languagesArr.length; i++) {
                    if (languagesArr[i] === "english") {
                        document.getElementById('englishLang').checked = true;
                    }
                    if (languagesArr[i] === "spanish") {
                        document.getElementById('spanishLang').checked = true;
                    }
                    if (languagesArr[i] === "mandarin") {
                        document.getElementById('mandarinLang').checked = true;
                    }
                    if (languagesArr[i] === "french") {
                        document.getElementById('frenchLang').checked = true;
                    }

                }
            }
            let platformArr = oReq.response.badges;
            if (platformArr) {
                for (let i = 0; i < platformArr.length; i++) {
                    if (platformArr[i] === 'true') {
                        document.getElementById(badgesCheckbox[i]).checked = true;
                    }
                }
            }

            let short = oReq.response.description;
            console.log(short);
            document.getElementById('description').value = short;

            let longer = oReq.response.longDescription;
            if (longer) {
                let s = '';
                for (let i = 0; i < longer.length; i++) {
                    bulletList.push(longer[i]);
                    s += "<li>" + longer[i] + "</li>";
                }
                if (longer.length > 0) {
                    document.getElementById('longTitle').style.visibility = "visible";
                }
                console.log(s);
                document.getElementById("bullets").innerHTML = s;
            }

            let purchase = oReq.response.purchase;
            if (purchase) {
                document.getElementById('purchaseDeets').style.visibility = 'visible';
                let s = '';
                for (let i = 0; i < purchase.length; i++) {
                    purchaseList.push(purchase[i]);
                    s += "<li>" + purchase[i] + "</li>";
                }
                if (purchase.length > 0) {
                    document.getElementById('purchaseTitle').style.visibility = "visible";
                }
                console.log(s);
                document.getElementById("bulletsPurchase").innerHTML = s;
            }

            let contact = oReq.response.contact;
            if (contact) {
                document.getElementById('purchaseDeets').style.visibility = 'visible';
                let s = '';
                for (let i = 0; i < contact.length; i++) {
                    contactList.push(contact[i]);
                    s += "<li>" + contact[i] + "</li>";
                }
                if (contact.length > 0) {
                    document.getElementById('contactTitle').style.visibility = "visible";
                }
                console.log(s);
                document.getElementById("contactPurchase").innerHTML = s;
            }

            let support = oReq.response.support;
            console.log(support);
            if (support) {
                document.getElementById('purchaseDeets').style.visibility = 'visible';
                let s = '';
                for (let i = 0; i < support.length; i++) {
                    supportList.push(support[i]);
                    s += "<li>" + support[i] + "</li>";
                }
                if (support.length > 0) {
                    document.getElementById('supportTitle').style.visibility = "visible";
                }
                console.log(s);
                document.getElementById("supportPurchase").innerHTML = s;
            }

            let training = oReq.response.training;
            console.log(training);
            if (training) {
                document.getElementById('purchaseDeets').style.visibility = 'visible';
                let s = '';
                for (let i = 0; i < training.length; i++) {
                    trainingList.push(training[i]);
                    s += "<li>" + training[i] + "</li>";
                }
                if (training.length > 0) {
                    document.getElementById('trainingTitle').style.visibility = "visible";
                }
                console.log(s);
                document.getElementById("trainingPurchase").innerHTML = s;
            }

            let otherIn = oReq.response.other;
            if (otherIn) {
                let s = '';
                for (let i = 0; i < otherIn.length; i++) {
                    otherList.push(otherIn[i]);
                    s += "<li>" + otherIn[i] + "</li>";
                }
                if (otherIn.length > 0) {
                    document.getElementById('title').style.visibility = "visible";
                }
                document.getElementById("infoList").innerHTML = s;
            }
            /*

            let setupLst = oReq.response.setup;
            if (setupLst) {
                for (let i = 0; i < setupLst.length; i++) {
                    let str = 'setup' + (i + 1);
                    if (setupLst[i] === 'true') {
                        document.getElementById(str).checked = true;
                    }
                }
            }
            let useLst = oReq.response.use;
            if (useLst) {
                for (let i = 0; i < useLst.length; i++) {
                    let str = 'use' + (i + 1);
                    if (useLst[i] === 'true') {
                        document.getElementById(str).checked = true;
                    }
                }
            }
            */


        };
        oReq.send();
    } else {
        document.getElementById('displayImg').innerHTML = "You have not selected an image.";
        document.getElementById('name').readOnly = false;
    }
};

function hashCode(name) {
    let hash = 7;
    for (let i = 0; i < name.length; i++) {
        hash = hash * 31 + name.charCodeAt(i);
    }
    return hash;
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
        } else if (pair[0] === 'name') {
            let nm = pair[1].toLowerCase();

            obj += 'name=' + nm;
            objName = nm;
        } else if (pair[0] === 'description') {
            obj += 'description=' + pair[1] + "&";
        } else if (pair[0] === 'weight') {
            obj += 'spec[0]=' + pair[1];
        } else if (pair[0] === 'dimensions') {
            obj += 'spec[1]=' + pair[1];
        }else if (pair[0] === 'battery') {
            obj += 'spec[2]=' + pair[1];
        } else if (pair[0] === 'screenSize') {
            obj += 'spec[3]=' + pair[1];
        } else {
            obj = obj.substring(0, obj.length - 1);
        }
        i++;
    }
    id = hashCode(objName);
    obj += "&id=" + id + "&";
    if (document.getElementById('professionalTrue').checked === true) {
        obj += 'professional=true&';
    } else {
        obj += 'professional=false&';
    }
    if (document.getElementById('accessTouch').checked === true) {
        obj += "access[" + accessIdx + "]=touch&";
        accessIdx++;
        obj += "badges[" + badgesIdx + "]=true&";
    } else {
        obj += "badges[" + badgesIdx + "]=false&";
    }
    badgesIdx++;
    if (document.getElementById('accessKeyboard').checked === true) {
        obj += "access[" + accessIdx + "]=keyboard&";
        accessIdx++;
        obj += "badges[" + badgesIdx + "]=true&";
    } else {
        obj += "badges[" + badgesIdx + "]=false&";
    }
    badgesIdx++;
    if (document.getElementById('accessSwitch').checked === true) {
        obj += "access[" + accessIdx + "]=switch&";
        accessIdx++;
        obj += "badges[" + badgesIdx + "]=true&";
    } else {
        obj += "badges[" + badgesIdx + "]=false&";
    }
    badgesIdx++;
    if (document.getElementById('accessMouse').checked === true) {
        obj += "access[" + accessIdx + "]=mouse&";
        accessIdx++;
        obj += "badges[" + badgesIdx + "]=true&";
    } else {
        obj += "badges[" + badgesIdx + "]=false&";
    }
    badgesIdx++;
    if (document.getElementById('accessEyes').checked === true) {
        obj += "access[" + accessIdx + "]=eye&";
        accessIdx++;
        obj += "badges[" + badgesIdx + "]=true&";
    } else {
        obj += "badges[" + badgesIdx + "]=false&";
    }
    badgesIdx++;
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

    for (let i = 0; i < purchaseList.length; i++) {
        obj += "&purchase[" + i + "]=" + purchaseList[i];
    }

    for (let i = 0; i < contactList.length; i++) {
        obj += "&contactPhone[" + i + "]=" + contactList[i];
    }

    for (let i = 0; i < contactEmails.length; i++) {
        obj += "&contactEmail[" + i + "]=" + contactList[i];
    }

    for (let i = 0; i < contactLinks.length; i++) {
        obj += "&contactLink[" + i + "]=" + contactList[i];
    }

    for (let i = 0; i < supportList.length; i++) {
        obj += "&support[" + i + "]=" + supportList[i];
    }

    for (let i = 0; i < trainingList.length; i++) {
        obj += "&training[" + i + "]=" + trainingList[i];
    }

    let context = document.getElementById('trainingContext');
    if (context && context !== '') {
        obj += "&trainContext=" + context;
    }

    console.log(currImage);
    if (currImage !== '') {
        obj += "&img=" + currImage;
    }


    console.log(obj);
    var oReq = new XMLHttpRequest();
    console.log(objName);

    oReq.open("post", '/product/', true);
    oReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    oReq.onload = function (oEvent) {
        console.log(oReq.responseText);

        window.location.href = "/productPage?" + objName;
    };
    oReq.send(obj);
}

function addBullet() {
    let bullet = document.getElementById("point1").value;
    bulletList.push(bullet);
    let curList = Array.from(document.getElementById("bullets").getElementsByTagName("li"));
    document.getElementById('longTitle').style.visibility = "visible";
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
    document.getElementById('title').style.visibility = "visible";

    let s = "";
    for (let i = 0; i < curList.length; i++) {
        s += "<li>" + curList[i].textContent + "</li>";
    }
    console.log(curList);
    s += "<li>" + bullet + "</li>";
    document.getElementById("infoList").innerHTML = s;
    document.getElementById("info1").value = "";
}

function addPurchase() {
    let bullet = document.getElementById("purchase1").value;
    purchaseList.push(bullet);
    let curList = Array.from(document.getElementById("bulletsPurchase").getElementsByTagName("li"));
    document.getElementById('purchaseTitle').style.visibility = "visible";

    let s = "";
    for (let i = 0; i < curList.length; i++) {
        s += "<li>" + curList[i].textContent + "</li>";
    }
    console.log(curList);
    s += "<li>" + bullet + "</li>";
    document.getElementById("bulletsPurchase").innerHTML = s;
    document.getElementById("purchase1").value = "";
}

function addSupport() {
    let bullet = document.getElementById("support1").value;
    supportList.push(bullet);
    let curList = Array.from(document.getElementById("supportPurchase").getElementsByTagName("li"));
    document.getElementById('supportTitle').style.visibility = "visible";

    let s = "";
    for (let i = 0; i < curList.length; i++) {
        s += "<li>" + curList[i].textContent + "</li>";
    }
    console.log(curList);
    s += "<li>" + bullet + "</li>";
    document.getElementById("supportPurchase").innerHTML = s;
    document.getElementById("support1").value = "";
}

function addTraining() {
    let bullet = document.getElementById("training1").value;
    trainingList.push(bullet);
    let curList = Array.from(document.getElementById("trainingPurchase").getElementsByTagName("li"));
    document.getElementById('trainingTitle').style.visibility = "visible";

    let s = "";
    for (let i = 0; i < curList.length; i++) {
        s += "<li>" + curList[i].textContent + "</li>";
    }
    console.log(curList);
    s += "<li>" + bullet + "</li>";
    document.getElementById("trainingPurchase").innerHTML = s;
    document.getElementById("training1").value = "";
}

function addContactPhone() {
    let bullet = document.getElementById("contactPhone").value;
    contactList.push(bullet);
    let curList = Array.from(document.getElementById("contactPhoneList").getElementsByTagName("li"));
    document.getElementById('contactTitle').style.visibility = "visible";

    let s = "";
    for (let i = 0; i < curList.length; i++) {
        s += "<li>" + curList[i].textContent + "</li>";
    }
    console.log(curList);
    s += "<li>" + bullet + "</li>";
    document.getElementById("contactPhoneList").innerHTML = s;
    document.getElementById("contactPhone").value = "";
}

function addContactEmail() {
    let bullet = document.getElementById("contactEmail").value;
    contactEmails.push(bullet);
    let curList = Array.from(document.getElementById("contactEmailList").getElementsByTagName("li"));
    document.getElementById('contactTitle').style.visibility = "visible";

    let s = "";
    for (let i = 0; i < curList.length; i++) {
        s += "<li>" + curList[i].textContent + "</li>";
    }
    console.log(curList);
    s += "<li>" + bullet + "</li>";
    document.getElementById("contactEmailList").innerHTML = s;
    document.getElementById("contactEmail").value = "";
}

function addContactLink() {
    let bullet = document.getElementById("contactLink").value;
    contactLinks.push(bullet);
    let curList = Array.from(document.getElementById("contactLinkList").getElementsByTagName("li"));
    document.getElementById('contactTitle').style.visibility = "visible";

    let s = "";
    for (let i = 0; i < curList.length; i++) {
        s += "<li>" + curList[i].textContent + "</li>";
    }
    console.log(curList);
    s += "<li>" + bullet + "</li>";
    document.getElementById("contactLinkList").innerHTML = s;
    document.getElementById("contactLink").value = "";
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
        if (bulletList.length === 0) {
            document.getElementById('longTitle').style.visibility = "hidden";
        }
    }
}

function removePurchase(){
    if (purchaseList.length === 0) {
        alert("No bullets to remove!");
    } else {
        purchaseList.pop();
        let curList = Array.from(document.getElementById("bulletsPurchase").getElementsByTagName("li"));
        let s = "";
        for (let i = 0; i < curList.length - 1; i++) {
            s += "<li>" + curList[i].textContent + "</li>";
        }
        console.log(curList);
        document.getElementById("bulletsPurchase").innerHTML = s;
        if (bulletList.length === 0) {
            document.getElementById('purchaseTitle').style.visibility = "hidden";
        }
    }
}


function removeSupport(){
    if (supportList.length === 0) {
        alert("No bullets to remove!");
    } else {
        supportList.pop();
        let curList = Array.from(document.getElementById("supportPurchase").getElementsByTagName("li"));
        let s = "";
        for (let i = 0; i < curList.length - 1; i++) {
            s += "<li>" + curList[i].textContent + "</li>";
        }
        console.log(curList);
        document.getElementById("supportPurchase").innerHTML = s;
        if (bulletList.length === 0) {
            document.getElementById('supportTitle').style.visibility = "hidden";
        }
    }
}

function removeTraining(){
    if (trainingList.length === 0) {
        alert("No bullets to remove!");
    } else {
        trainingList.pop();
        let curList = Array.from(document.getElementById("trainingPurchase").getElementsByTagName("li"));
        let s = "";
        for (let i = 0; i < curList.length - 1; i++) {
            s += "<li>" + curList[i].textContent + "</li>";
        }
        console.log(curList);
        document.getElementById("trainingPurchase").innerHTML = s;
        if (bulletList.length === 0) {
            document.getElementById('trainingTitle').style.visibility = "hidden";
        }
    }
}

function removeContactPhone(){
    if (contactList.length === 0) {
        alert("No bullets to remove!");
    } else {
        contactList.pop();
        let curList = Array.from(document.getElementById("contactPhoneList").getElementsByTagName("li"));
        let s = "";
        for (let i = 0; i < curList.length - 1; i++) {
            s += "<li>" + curList[i].textContent + "</li>";
        }
        console.log(curList);
        document.getElementById("contactPhoneList").innerHTML = s;
        if (contactList.length === 0) {
            document.getElementById('contactTitle').style.visibility = "hidden";
        }
    }
}

function removeContactLinks(){
    if (contactLinks.length === 0) {
        alert("No bullets to remove!");
    } else {
        contactLinks.pop();
        let curList = Array.from(document.getElementById("contactLinkList").getElementsByTagName("li"));
        let s = "";
        for (let i = 0; i < curList.length - 1; i++) {
            s += "<li>" + curList[i].textContent + "</li>";
        }
        console.log(curList);
        document.getElementById("contactLinkList").innerHTML = s;
        if (contactLinks.length === 0) {
            document.getElementById('contactTitle').style.visibility = "hidden";
        }
    }
}

function removeContactEmail(){
    if (contactEmails.length === 0) {
        alert("No bullets to remove!");
    } else {
        contactEmails.pop();
        let curList = Array.from(document.getElementById("contactEmailList").getElementsByTagName("li"));
        let s = "";
        for (let i = 0; i < curList.length - 1; i++) {
            s += "<li>" + curList[i].textContent + "</li>";
        }
        console.log(curList);
        document.getElementById("contactEmailList").innerHTML = s;
        if (contactEmails.length === 0) {
            document.getElementById('contactTitle').style.visibility = "hidden";
        }
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
        if (otherList.length === 0) {
        document.getElementById('title').style.visibility = "hidden";
            }
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