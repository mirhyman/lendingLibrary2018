var id = 0;

window.onload = function() {
    let str = window.location.href;
    let idx = str.indexOf("?");
    str = str.substring(idx + 1);
    let oReq = new XMLHttpRequest();
    oReq.open("GET", "/product/" + str, true);
    oReq.responseType = 'json';
    oReq.onload = function(oEvent) {
        id = oReq.response.id;
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

function addReview() {
    document.getElementById("toAdd").innerHTML =
        "<form method=\"post\" name = \"review\">\n" +
        "        <label for=\"title\">Enter title: </label>\n" +
        "    <input id=\"title\" type=\"text\" name=\"title\" value=\"Default title.\">\n" +
        "<label for='author'>Your Name: </label>\n" +
        "<label for='context'>Context of use: </label>" +
        "<label for='body'>Enter your review:</label>" +
        "        </form>" +
    "<button id='submitReview' onclick='submitReview()'>Submit Review!</button>";
}

function submitReview() {
    //let btn = document.getElementById("get_name");
    let form = document.forms.namedItem("review");

    //var oOutput = document.getElementById("post_res");
    let oData = new FormData(form);

    var oReq = new XMLHttpRequest();
    let pair1;
    
    oReq.open("get", '/features/' + pair1, true);
    oReq.onload = function (oEvent) {
        oOutput.innerHTML = oReq.responseText;
    };
    oReq.send(null);
}
