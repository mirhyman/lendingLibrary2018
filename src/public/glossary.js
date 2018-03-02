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

const badgesTitle = ["MacOS Compatible", "ECU Compatible",
    "iOS Compatible", "Windows Compatible", "Android Compatible",
    "Multilingual", "Email", "Texting", "Social Media", "Free Draw/Write",
    "Built-in Camera", "Mountable", "Wearable", "Digitized Speech",
    "Naturalistic Speech", "Record Your Own Voice", "Symbol-based Vocabulary",
    "Photo-based Vocabulary", "Word-based Vocabulary", "Phrase-based Vocabulary",
    "Text-based Communication", "Word Prediction", "Phrase Prediction",
    "Sentence Prediction", "Programmable Shortcuts"];

window.onload = function() {
    let s = '';
    for (let i = 0; i < badgesTitle.length; i++) {
        s += "<li><div class='badge'>" + badgesIcon[i] + "</div>";
            s += badgesTitle[i] + "</li>";

    }
    document.getElementById('termsList').innerHTML = s;

}