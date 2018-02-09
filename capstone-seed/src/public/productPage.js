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


        let oReq2 = new XMLHttpRequest();
        oReq2.open("GET", "/product/review/" + id, true);
        oReq2.responseType = 'json';
        oReq2.onload = function (oEvent) {
            if (oReq2.status === 200) {
                for (let j = 0; j < oReq2.response.reviews.length; j++) {

                    build += "title: " + oReq2.response.reviews[j].rev.title + "<br>";
                    build += "author: " + oReq2.response.reviews[j].rev.author + "<br>";
                    build += "Review: " + oReq2.response.reviews[j].rev.body + "<br>";
                }
            }
            build += "</li>";

            document.getElementById("resultList").innerHTML = build;

         };

        oReq2.send();

    };

    oReq.send();
    //ev.preventDefault();
};

function addReview() {
    document.getElementById("toAdd").innerHTML =
        "<form method=\"post\" name = \"review\">" +
        "        <label for=\"title\">Enter title: </label>" +
        "    <input id=\"title\" type=\"text\" name=\"title\" value=\"Default title.\"><br>" +
        "<label for='author'>Your Name: </label>" +
        "<input id=\"author\" type=\"text\" name=\"author\" value=\"Your name.\"><br>" +
        "<label for='context'>Context of use: </label>" +
        "<input id=context' type='text' name='context' value='used product'><br>" +
        "<label for='body'>Enter your review:</label>" +
        "<input id='body' type='text' name='body' value='Enter review here'><br>" +
        "        </form>" +
    "<button id='submitReview' onclick='submitReview()'>Submit Review!</button>";
}

function submitReview() {
    //let btn = document.getElementById("get_name");
    let form = document.querySelector("form");

    //var oOutput = document.getElementById("post_res");
    let oData = new FormData(form);
    let obj = "";
    let i = 0;
    for (var pair of oData.entries()) {
        if (i !== 0) {
            obj += "&";
        }
        obj += pair[0] + "=" + pair[1];
        i++;
    }

    obj += "&id=" + id;
    console.log(id);
    var oReq = new XMLHttpRequest();
    //let pair1;
    //console.log(oData);
    oReq.open("post", '/product/review', true);
    oReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    oReq.onload = function (oEvent) {
        console.log(oReq.responseText);
    };
    oReq.send(obj);
}

function update() {
    window.location = "/saveProducts"
}
