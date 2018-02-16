let id = 0;
let name = '';

window.onload = function() {
    addReview();
    let str = window.location.href;
    let idx = str.indexOf("?");
    str = str.substring(idx + 1);
    name = str;
    let idx_space = name.indexOf("%20");
    if (idx_space !== -1) {
        name = name.substring(0, idx_space) + "+" + name.substring(idx_space + 3);
    }
    console.log(name);

    let oReq = new XMLHttpRequest();
    oReq.open("GET", "/product/" + str, true);
    oReq.responseType = 'json';
    oReq.onload = function(oEvent) {
        id = oReq.response.id;

        let build = "<img src=/images/";
            build += oReq.response.img;
            build += "></img>";
            build += "<div id='name'>" +
                oReq.response.name.charAt(0).toUpperCase()
                + oReq.response.name.substring(1) + "</div>";
            build += "<div id='price'>$" + oReq.response.price + "</div>";
            build += "<div id='info'>Hardware: " +
                oReq.response.hardware;
            build += "Access: ";
            build += oReq.response.access.toString().replace("[", "").replace("]", "");
            build += "Languages: ";
            build += oReq.response.languages.toString().replace("[", "").replace("]", "");
            build += "Extra Feature: ";
            build +=
                oReq.response.features.toString().replace("[", "").replace("]", "")
            + "</div>";


        let oReq2 = new XMLHttpRequest();
        oReq2.open("GET", "/product/review/" + id, true);
        oReq2.responseType = 'json';
        let build2 = "";
        oReq2.onload = function (oEvent) {
            if (oReq2.status === 200) {
                for (let j = 0; j < oReq2.response.reviews.length; j++) {

                    build2 += "<li><div id='titleRev'>"
                        + oReq2.response.reviews[j].rev.title + "</div><br>";
                    build2 += "<div id='authorRev'>" + oReq2.response.reviews[j].rev.author +
                        "</div><br>";
                    build2 += "<div id='revContent'>" +
                        oReq2.response.reviews[j].rev.body + "</div>";
                    build2 += "<br></li>";
                }
            }
            build += "</li><br>";

            document.getElementById("resultList").innerHTML = build;
            document.getElementById("reviews").innerHTML = build2;

         };

        oReq2.send();

    };

    oReq.send();
    //ev.preventDefault();
};

function addReview() {
    document.getElementById("toAdd").innerHTML =
        "Submit a Review <br><br>" +
        "<form method=\"post\" name = \"review\">" +
        "        <label for=\"title\">Title</label><br>" +
        "    <input id=\"title\" type=\"text\" name=\"title\"><br>" +
        "<label for='author'>Name </label><br>" +
        "<input id=\"author\" type=\"text\" name=\"author\" required><br>" +
        "<label for='context'>Context of use </label><br>" +
        "<input id=context' type='text' name='context' " +
        " class='ctx'><br>" +
        "<label for='body'>Your review</label><br>" +
        "<input id='body' type='text' name='body' ><br>" +
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
    let send = true;
    for (var pair of oData.entries()) {
        if (i !== 0) {
            obj += "&";
        }
        if (pair[1] === '') {
            send = false;
        }
        obj += pair[0] + "=" + pair[1];
        i++;
    }
    if (i !== 4) {
        send = false;
        alert("Please fill out all fields!");
    }

    obj += "&id=" + id;
    if (send) {
        var oReq = new XMLHttpRequest();
        //let pair1;
        //console.log(oData);
        oReq.open("post", '/product/review', true);
        oReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        oReq.onload = function (oEvent) {
            console.log(oReq.responseText);
        };
        oReq.send(obj);
        window.location = '/productPage?' + name;
    }
}

function update() {
    window.location = "/saveProducts"
}

function goHome() {
    window.location = "/";
}

function glossary() {
    window.location = "/glossary";
};
