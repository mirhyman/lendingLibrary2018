let compare_list = [];
let names_lst = [];

window.onload = function() {
    let str = window.location.href;
    let idx = str.indexOf("?");
    let nxtIdx = str.indexOf("&");
    let first_name = str.substring(idx + 1, nxtIdx);
    let rest = str.substring(nxtIdx);
    //let names_lst = [];
    names_lst.push(first_name);
    while (rest.indexOf("&") !== -1) {
        idx = rest.indexOf("&");
        let nxt_name = rest.substring(idx + 1);
        nxtIdx = nxt_name.indexOf("&");
        if (nxtIdx === -1) {
            nxtIdx = nxt_name.length;
        }
        nxt_name = nxt_name.substring(0, nxtIdx);
        rest = rest.substring(nxtIdx);
        names_lst.push(nxt_name);
        //console.log(names_lst.length);
    }
    for (let i = 0; i < names_lst.length; i++) {
        let oReq = new XMLHttpRequest();
        oReq.open("GET", "/product/" + names_lst[i], true);
        oReq.responseType = 'json';
        oReq.onload = function (oEvent) {
            compare_list.push(oReq.response);
            checkList();
            pictures();
        };
        oReq.send();
    }
};

function pictures() {
    let s = '';
    for (let i = 0; i < compare_list.length; i++) {
        s += "<img src='/images/" + compare_list[i].img + "' width='200px' height='200px' id='a"
            + i + "'>";
        console.log(s);
    }
    document.getElementById('images').innerHTML = s;
    if (compare_list.length > 2) {
        document.getElementById('a1').style = "margin-left: 50px";
        document.getElementById('a2').style = "margin-left: 80px";
        document.getElementById('images').style = " position: absolute;\n" +
            "    top: 140px;\n" +
            "    left: 345px;";
    }
}

function checkList() {
    //console.log(compare_list.length);
    if (compare_list.length === names_lst.length) {
        //ev.preventDefault();
        let build = "<tr><th>Product</th>";
        // name loop
        for (let i = 0; i < compare_list.length; i++) {
            build += "<th>" + compare_list[i].name + "</th>";
        }
        build += "</tr>";

        // just to get price -- need to add in all the other parts too still
        build += "<tr><td>Price</td>";
        for (let i = 0; i < compare_list.length; i++) {
            build += "<td>" + compare_list[i].price + "</td>";
        }

        build += "</tr>";
        build += "<tr><td>Type of Device</td>";
        for (let i = 0; i < compare_list.length; i++) {
            if (compare_list[i].hardware) {
                build += "<td>Hardware</td>";
            } else {
                build += "<td>Software</td>";
            }
        }
        build += "</tr>";
        // figure out what access to display

                let accessList = [];
                for(let i = 0; i < compare_list.length; i++) {
                    let curProd = compare_list[i];
                    for (let j = 0; j < curProd.access.length; j++) {
                        if (!accessList.includes(curProd.access[j])) {
                            accessList.push(curProd.access[j]);
                        }
                    }
                }
                console.log(accessList);
                for (let i = 0; i < accessList.length; i++) {
                    if (accessList[i] !== '') {
                        build += "<tr><td>" + accessList[i].charAt(0).toUpperCase() + accessList[i].substring(1) + "</td>";
                        for (let j = 0; j < compare_list.length; j++) {
                            build += "<td>";
                            if (compare_list[j].access.includes(accessList[i])) {
                                build += "Yes</td>";
                            } else {
                                build += "No</td>";
                            }
                        }
                    }
                }

        build += "</tr>";
        // figure out what access to display

        let languageList = [];
        for(let i = 0; i < compare_list.length; i++) {
            let curProd = compare_list[i];
            for (let j = 0; j < curProd.languages.length; j++) {
                if (!languageList.includes(curProd.languages[j])) {
                    languageList.push(curProd.languages[j]);
                }
            }
        }
        console.log(languageList);
        for (let i = 0; i < languageList.length; i++) {
            build += "<tr><td>" + languageList[i].charAt(0).toUpperCase() + languageList[i].substring(1) + "</td>";
            for (let j = 0; j < compare_list.length; j++) {
                build += "<td>";
                if (compare_list[j].languages.includes(languageList[i])) {
                    build += "Yes</td>";
                } else {
                    build += "No</td>";
                }
            }
        }
        build += "</tr>";

        let platformList = [];
        for(let i = 0; i < compare_list.length; i++) {
            let curProd = compare_list[i];
            for (let j = 0; j < curProd.platform.length; j++) {
                if (!platformList.includes(curProd.platform[j])) {
                    platformList.push(curProd.platform[j]);
                }
            }
        }
        console.log(platformList);
        for (let i = 0; i < platformList.length; i++) {
            build += "<tr><td>" + platformList[i].charAt(0).toUpperCase() + platformList[i].substring(1) + "</td>";
            for (let j = 0; j < compare_list.length; j++) {
                build += "<td>";
                if (compare_list[j].platform.includes(platformList[i])) {
                    build += "Yes</td>";
                } else {
                    build += "No</td>";
                }
            }
        }
        build += "</tr>";

        let featuresList = [];
        for(let i = 0; i < compare_list.length; i++) {
            let curProd = compare_list[i];
            for (let j = 0; j < curProd.features.length; j++) {
                if (!featuresList.includes(curProd.features[j])) {
                    featuresList.push(curProd.features[j]);
                }
            }
        }
        console.log(featuresList);
        for (let i = 0; i < featuresList.length; i++) {
            build += "<tr><td>" + featuresList[i].charAt(0).toUpperCase() + featuresList[i].substring(1) + "</td>";
            for (let j = 0; j < compare_list.length; j++) {
                build += "<td>";
                if (compare_list[j].features.includes(featuresList[i])) {
                    build += "Yes</td>";
                } else {
                    build += "No</td>";
                }
            }
        }

        build += "</tr></table>";
        document.getElementById("resultTable").innerHTML = build;

    }
}

function goHome() {
    window.location = "/";
}

function glossary() {
    window.location = "/glossary";
}

