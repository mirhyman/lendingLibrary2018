let imgSrc;
let id =0;

let badgesTitle = ["MacOS Compatible", "ECU Compatible",
"iOS Compatible", "Windows Compatible", "Android Compatible",
"Multilingual", "Email", "Texting", "Social Media", "Free Draw/Write",
"Built-in Camera", "Mountable", "Wearable", "Digitized Speech",
"Naturalistic Speech", "Record Your Own Voice", "Symbol-based Vocabulary",
"Photo-based Vocabulary", "Word-based Vocabulary", "Phrase-based Vocabulary",
"Text-based Communication", "Word Prediction", "Phrase Prediction",
"Sentence Prediction", "Programmable Shortcuts"];

let badgesCheckbox = ["macOSPlatform", "platformECU",
"iOSPlatform", "windowsPlatform", "androidPlatform", "multilingualLang",
"emailFeat", "textFeat", "socialFeat", "drawFeat", "cameraFeat",
"mountableFeat", "wearableFeat", "digitizedSpeech",
"naturalisticSpeech", "recordSpeech", "symbolVocab",
"photoVocab", "wordVocab", "phraseVocab", "textVocab",
"wordPrediction", "phrasePrediction", "sentencePrediction", "programShortcut"];

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
        } else if (pair[0] === 'professionalTrue') {
            obj += 'professional=true';
        } else if (pair[0] === 'professionalFalse') {
            obj += 'professional=false';
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
    if (document.getElementById('accessTouch').checked === true) {
        obj += "access[" + accessIdx + "]=touch&";
        accessIdx++;
    }
    if (document.getElementById('accessKeyboard').checked === true) {
        obj += "access[" + accessIdx + "]=keyboard&";
        accessIdx++;
    }
    if (document.getElementById('accessVoice').checked === true) {
        obj += "access[" + accessIdx + "]=voice&";
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


    console.log(obj);
    var oReq = new XMLHttpRequest();

    oReq.open("post", '/product/', true);
    oReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    oReq.onload = function (oEvent) {
        console.log(oReq.responseText);
    };
    oReq.send(obj);
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