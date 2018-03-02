let id = 0;
let name = '';
let professional = false;

const badgesTitle = ["MacOS Compatible", "ECU Compatible",
    "iOS Compatible", "Windows Compatible", "Android Compatible",
    "Multilingual", "Email", "Texting", "Social Media", "Free Draw/Write",
    "Built-in Camera", "Mountable", "Wearable", "Digitized Speech",
    "Naturalistic Speech", "Record Your Own Voice", "Symbol-based Vocabulary",
    "Photo-based Vocabulary", "Word-based Vocabulary", "Phrase-based Vocabulary",
    "Text-based Communication", "Word Prediction", "Phrase Prediction",
    "Sentence Prediction", "Programmable Shortcuts"];

let badgesIcon = ["<i class=\"fab fa-apple fa-5x\"></i>",
    "<i class=\"fas fa-save fa-5x\"></i>", "<i class=\"fas fa-mobile fa-5x\"></i>",
"<i class=\"fab fa-windows fa-5x\"></i>",
"<i class=\"fab fa-android fa-5x\"></i>", "<i class=\"fas fa-language fa-5x\"></i>",
    "<i class=\"fas fa-envelope fa-5x\"></i>", "<i class=\"fas fa-comments fa-5x\"></i>",
    "<i class=\"fab fa-facebook-square fa-5x\"></i>",
    "<i class=\"fas fa-pencil-alt fa-5x\"></i>",
    "<i class=\"fas fa-camera fa-5x\"></i>",
    "<i class=\"fas fa-sort-amount-up fa-5x\"></i>",
    "<i class=\"fab fa-shirtsinbulk fa-5x\"></i>",
    "<i class=\"far fa-comment-alt fa-5x\"></i>",
    "<i class=\"fas fa-leaf fa-5x\"></i>",
    "<i class=\"fas fa-microphone fa-5x\"></i>",
    "<i class=\"fas fa-briefcase fa-5x\"></i>",
    "<i class=\"fas fa-images fa-5x\"></i>",
    "<i class=\"fas fa-file-word fa-5x\"></i>",
    "<i class=\"fab fa-stack-exchange fa-5x\"></i>",
    "<i class=\"fas fa-font fa-5x\"></i>",
    "<i class=\"fas fa-quidditch fa-5x\"></i>",
    "<i class=\"fas fa-bars fa-5x\"></i>", "<i class=\"fas fa-code fa-5x\"></i>"


];

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
            build += "<div id='professional'>";
            console.log(oReq.response.professional);
            if (oReq.response.professional === true) {
                professional = true;
                console.log('got here');
                build += "<i class=\"fas fa-user-md fa-2x\"></i>";
            }
            build += "</div>";
            build += "<div id='price'>$" + oReq.response.price + "</div>";
            console.log(oReq.response.description);
            build += "<div id='brand'>" + oReq.response.brand + "</div>";
            if (oReq.response.spec && oReq.response.hardware === "true") {
                build += "<div id='specs'>Specs<br>";
                build += oReq.response.spec[0] + ", " +
                    oReq.response.spec[1] + ", " + oReq.response.spec[2] + " hours";
                build += "</div>";
            }
            build += "<div id='info'> <ul>";
            let long = oReq.response.longDescription;
            for (let i = 0; i < long.length; i++) {
                build += "<li>" + long[i] + "</li>";
            }
            build += "</ul>" + "</div>";
            let badges = oReq.response.badges;
            let build3 = '';
            let badgeNum = 0;
        for (let i = 0; i < badgesTitle.length; i++) {

            if (badges[i] === 'true') {
                build3 += "<li><div id='icon" + i + "'>";
                build3 += badgesIcon[i] + "</div>" + badgesTitle[i] + "</li>";
                badgeNum++;
            }
        }

        console.log(build3);

        let build4 = '';
        let acc = oReq.response.access;
        console.log(acc.length);
        let accNum = 0;
        for (let i = 0; i < acc.length; i++) {
            //console.log(i);
            console.log(acc[i]);
            build4 += "<li>";
            if (acc[i] === 'eyes' || acc[i] === 'eye') {
                build4 += "Eye Gaze";
            } else if (acc[i] === 'keys' || acc[i] === 'keyboard') {
                build4 += "Keyboard"
            } else if (acc[i] === 'touch') {
                build4 += "Touchscreen";
            } else {
                build4 += acc[i];
            }
            accNum++;
            build4 += "</li>";
            console.log(build4);
        }

        let build7 = '';
        let setup = oReq.response.setup;
        console.log(setup);
        if (setup) {
            for (let i = 0; i < setup.length; i++) {
                let str = 'circle' + (i + 1);
                console.log(str);
                if (setup[i] === 'true') {
                    document.getElementById(str).style.backgroundColor = '#0F4880';
                }
            }
        }

        let use = oReq.response.use;
        console.log(use);
        if (use) {
            for (let i = 0; i < use.length; i++) {
                let str = 'use_circle' + (i + 1);
                console.log(str);
                if (use[i] === 'true') {
                    document.getElementById(str).style.backgroundColor = '#0F4880';
                }
            }
        }

        let build5 = '';
        let otherNum = 0;
        let other = oReq.response.other;
        if (other) {
            for (let i = 0; i < other.length; i++) {
                build5 += "<li>";

                build5 += other[i];

                build5 += "</li>";
                otherNum++;
            }
        }
        console.log(otherNum);
        /*
        if (badgeNum <= 3) {
            document.getElementById('more').style.top = "620px";
            let dist = (otherNum * 100) + (accNum * 100) + 630;
            document.getElementById('resources').style.top = dist + "px";
        }
        if (badgeNum > 3 && badgeNum <= 6) {
            document.getElementById('more').style.top = "750px";
            let dist = (otherNum * 80) + (accNum * 80) + 760;
            document.getElementById('resources').style.top = dist + "px";
        }
        if (badgeNum > 6 && badgeNum <= 9) {
            document.getElementById('more').style.top = "830px";
            let dist = (otherNum * 80) + (accNum * 80) + 830;
            document.getElementById('resources').style.top = dist + "px";
        }
        if (badgeNum > 9 && badgeNum <= 12) {
            document.getElementById('more').style.top = "1000px";
        }
        if (badgeNum > 12 && badgeNum <= 16) {
            document.getElementById('more').style.top = "1090px";
            let dist = (otherNum * 100) + (accNum * 100) + 1090;
            document.getElementById('resources').style.top = dist + "px";
        }
        if (badgeNum > 16 && badgeNum <= 20) {
            document.getElementById('more').style.top = "1200px";
            let dist = (otherNum * 100) + (accNum * 100) + 1100;
            document.getElementById('resources').style.top = dist + "px";
            document.getElementById('rev').style.top = "2000px";
            document.getElementById('reviews').style.top = "2100px";
        }
        if (badgeNum > 20 && badgeNum <= 24) {
            document.getElementById('more').style.top = "1300px";
            let dist = (otherNum * 100) + (accNum * 100) + 1200;
            document.getElementById('resources').style.top = dist + "px";
            document.getElementById('rev').style.top = "2300px";
            document.getElementById('reviews').style.top = "2400px";
            document.getElementById('toAdd').style.top = "1800px";

        }
        if (badgeNum > 24 && badgeNum <= 28) {
            document.getElementById('more').style.top = "1450px";
            let dist = (otherNum * 100) + (accNum * 100) + 1400;
            document.getElementById('resources').style.top = dist + "px";
            document.getElementById('rev').style.top = "2800px";
            document.getElementById('reviews').style.top = "2900px";
            document.getElementById('toAdd').style.top = "3000px";
        }
        if (badgeNum > 28 && badgeNum <= 32) {
            document.getElementById('more').style.top = "1600px";
            let dist = (otherNum * 100) + (accNum * 100) + 1400;
            document.getElementById('resources').style.top = dist + "px";
            document.getElementById('rev').style.top = "3100px";
            document.getElementById('reviews').style.top = "3300px";
        }
        */

        let build6 = '';
        let purchase = oReq.response.purchase;
        console.log(purchase);
        if (purchase) {
            build6 += "<tr><td>How to purchase</td><td><ul id='stores'>";
            for (let i = 0; i < purchase.length; i++) {
                build6 += "<li><a href='" + purchase[i] + "'>" + purchase[i] + "</a></li>";
            }
            build6 += "</ul></td></tr>";
        }
        let support = oReq.response.support;
        //console.log(purchase);
        if (support) {
            console.log(support);
            build6 += "<tr><td>Support</td><td><ul id='support'>";
            for (let i = 0; i < support.length; i++) {
                build6 += "<li><a href='" + support[i] + "'>" + support[i] + "</a></li>";
            }
            build6 += "</ul></td></tr>";
        }

        let contact = oReq.response.contact;
        //console.log(purchase);
        if (contact) {
            build6 += "<tr><td>Contact</td><td><ul id='contact'>";
            for (let i = 0; i < contact.length; i++) {
                build6 += "<li>" + contact[i] + "</li>";
            }
            build6 += "</ul></td></tr>";
        }
        document.getElementById('purchaseTable').innerHTML = build6;

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
            } else {
                build2 += "<li>no reviews";
            }
            build += "</li><br>";

            document.getElementById("resultList").innerHTML = build;
            document.getElementById("reviews").innerHTML = build2;

            document.getElementById("features").innerHTML = build3;
            document.getElementById("access").innerHTML = build4;
            document.getElementById("otherFeatures").innerHTML = build5;

         };

        oReq2.send();

    };

    oReq.send();
    //ev.preventDefault();
};

function addReview() {
    document.getElementById("toAdd").innerHTML =
        "<p id='submitTitle'>Submit a Review</p> <br><br>" +
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
    if (professional) {
        if (window.confirm('WARNING! Professional only zone!')) {
                window.location = "/saveProducts?" + name;

        } else {
            alert('You can only update this if you are a professional');
        }
    } else {
        window.location = "/saveProducts?" + name;
    }
}

function goHome() {
    window.location = "/";
}



function glossary() {
    window.location = "/glossary";
};
