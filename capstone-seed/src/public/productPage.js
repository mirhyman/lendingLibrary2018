window.onload = function() {
    let str = window.location.href;
    let idx = str.indexOf("?");
    str = str.substring(idx + 1);
    let oReq = new XMLHttpRequest();
    oReq.open("GET", "/product/" + str, true);
    oReq.responseType = 'json';
    oReq.onload = function(oEvent) {
        let build = "";
            build += "<img src=/images/";
            build += oReq.response.img;
            build += " height=42 width=42><br>";
            build += "Name: " + oReq.response.name;
            build += "<br>Hardware: " +
                oReq.response.hardware;
            build += "<br> Access: ";
            build += oReq.response.access.toString().replace("[", "").replace("]", "");
            build += "<br>Languages: ";
            build += oReq.response.languages.toString().replace("[", "").replace("]", "");
            build += "<br>Price: ";
            build += oReq.response.price;
            build += "<br>Extra Feature: ";
            build +=
                oReq.response.features.toString().replace("[", "").replace("]", "");
            build += "</li>";

        document.getElementById("resultList").innerHTML = build;
    };
    oReq.send();
    //ev.preventDefault();
};
