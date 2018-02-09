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
    for (var pair of oData.entries()) {
        //console.log(pair[0]);
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
        }
        i++;
    }
    if (document.getElementById('frenchLang')) {
        obj += "languages[" + languagesIdx + "]=french";
        languagesIdx++;
    }
    if (document.getElementById('chineseLang')) {
        obj += "languages[" + languagesIdx + "]=chinese";
        languagesIdx++;
    }
    if (document.getElementById('spanishLang')) {
        obj += "languages[" + languagesIdx + "]=spanish";
        languagesIdx++;
    }
    if (document.getElementById('japaneseLang')) {
        obj += "languages[" + languagesIdx + "]=japanese";
        languagesIdx++;
    }
    if (document.getElementById('germanLang')) {
        obj += "languages[" + languagesIdx + "]=german";
    }
    if (document.getElementById('accessTouch')) {
        obj += "access[" + accessIdx + "]=touch";
    }

    console.log(obj);
    var oReq = new XMLHttpRequest();
    //let pair1;
    //console.log(oData);
    /*
    oReq.open("post", '/product/', true);
    oReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    oReq.onload = function (oEvent) {
        console.log(oReq.responseText);
    };
    oReq.send(obj);
    */
}