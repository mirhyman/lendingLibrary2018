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
        let results = oReq.response.length;
        let build = "";
        let i;
        for (i = 0; i < results; i++) {
            build += "<a href='/productPage?" + oReq.response[i].name + "'<li>";
            build += "<img src=/images/";
            build += oReq.response[i].img;
            build += " height=42 width=42><br>";
            build += "Name: " + oReq.response[i].name;
            build += "<br>Hardware: " +
                oReq.response[i].hardware;
            build += "<br> Access: ";
            build += oReq.response[i].access.toString().replace("[", "").replace("]", "");
            build += "<br>Languages: ";
            build += oReq.response[i].languages.toString().replace("[", "").replace("]", "");
            build += "<br>Price: ";
            build += oReq.response[i].price;
            build += "<br>Extra Feature: ";
            build +=
                oReq.response[i].features.toString().replace("[", "").replace("]", "");
            build += "</li></a><br>";
        }
        document.getElementById("resultList").innerHTML = build;
    };
    oReq.send();
    //ev.preventDefault();
};

