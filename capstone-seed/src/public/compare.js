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
        };
        oReq.send();
    }
};

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
        build += "</tr></table>";
        document.getElementById("resultTable").innerHTML = build;
    }
}