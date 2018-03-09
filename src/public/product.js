let allResults = [];
let currResults = [];
let pastResults = [];
let compareList = [];

// this maps the filters checkBox name to a true/false
// value meaning if it is checked or not checked
let checkedOrNot = new Map();

// Map to store the categories to a list of the current filters
// for that given category, this is represented as a list
// where the list just contains the filters name at any given time
// i realize i have SO much repetitive info stored in all of these
// fields buuut... idk
let categoricalFilters = new Map();


let filterGroups = new Map();
// yes this is terrible but i'm rolling with it.
// list of the current items filtered on everything but the professional field
let noProfessional = [];
// current items filtered on everything but the hardware field
let noHardware = [];
// current items filtered on everything but the access field
let noAccess = [];
// current items filtered on everything but the software field
let noSoftware = [];
// not filtered on languages
let noLang = [];
// not filtered on price
let noPrice = [];
// not filtered on features = []
let noFeats = [];

let noNotHardware = [];

// maps the category names to a list of items
// which are filtered on all the current filters
// except those filters which are from the
// current category
let groupsList = new Map();

let checkBox= [['keyboard', 'keyboard'],
    ['accessTouch', 'touch'], ['accessSwitch', 'switch'],
    ['accessMouse', 'mouse'], ['accessEyes', 'eyes'],
    ['softwareMacOS', 'mac'], ['softwareIOS', 'ios'],
    ['softwareWindows', 'windows'], ['softwareAndroid', 'android'],
    ['english', 'english'], ['spanish', 'spanish'],
    ['mandarin', 'mandarin'], ['french', 'french'],
    ['emailExtra', 'email'], ['textingExtra', 'texting'],
    ['socialMedia', 'social'], ['drawingWriting', 'draw'],
    ['camera', 'camera'], ['mount', 'mountable'],
    ['wearable', 'wearable'], ['warranty', 'warranty']];

let checkBoxToField =  new Map(checkBox);

window.onload = function() {
    let str = window.location.href;
    let idx = str.indexOf("?");
    str = str.substring(idx);
    let sub = str.indexOf("Q");
    let sub1 = str.indexOf("$ACC");
    let oReq = new XMLHttpRequest();
    //console.log(sub);
    if (sub1 != -1) {
        str = str.substring(5);
        oReq.open("GET", "/productAccess?query=" + str, true);
    } else if (sub !== -1) {
        str = str.substring(2);
        oReq.open("GET", "/textSearch?query=" + str, true);
    } else if (str === "?") {
        //console.log("here 2");
        oReq.open("GET", "/products", true);
    } else {
        //console.log("here 3");
        oReq.open("GET", "/product" + str, true);
    }
    oReq.responseType = 'json';
    oReq.onload = function(oEvent) {
        // all Results is all the results returned originally
        allResults = oReq.response;
        // to begin, curr results is all results
        // as there is no filters
        currResults = allResults;
        // the past results starts off with the state of
        // all results (this is also just no filter)
        pastResults.push(allResults);

        // to begin all the lists are set to allResults
        noProfessional = allResults;
        noHardware = allResults;
        noAccess = allResults;
        noFeats = allResults;
        noLang = allResults;
        noPrice = allResults;
        noSoftware = allResults;
        noNotHardware = allResults;
        groupsList.set("pro", noProfessional);
        groupsList.set("hardware", noHardware);
        groupsList.set("notHardware", noNotHardware);
        groupsList.set("access", noAccess);
        groupsList.set("features", noFeats);
        groupsList.set("language", noLang);
        groupsList.set("price", noPrice);
        groupsList.set("software", noSoftware);

        // set the categorical filters map up, at the begining
        // this should just have a bunch of empty lists
        for (let [key, value] of groupsList) {
            categoricalFilters.set(key, []);
        }

        // this gets all the id's for the filter list items
        let lst1 = Array.from(document.getElementById("filterList").getElementsByTagName("ul"));
        let lst = [];
        for (let i = 0; i < lst1.length; i++) {
            //console.log(lst1[i]);
            let entryList = Array.from(lst1[i].getElementsByTagName("li"));
            for (let j = 0; j < entryList.length; j++) {
                let entries = Array.from(entryList[j].getElementsByTagName("input"));
                for (let k = 0; k < entries.length; k++) {
                    let id = entries[k].id;
                    lst.push(id);
                }
            }
        }

        //getElementsByTagName("ul").getElementsByTagName("li"));
        for (let i = 0; i < lst.length; i++) {

            checkedOrNot.set(lst[i], 0);
            //console.log(checkedOrNot);
        }


        displayResults();
    };
    oReq.send();
    //ev.preventDefault();
};


function onCheckUpdate(filter) {
    if (filter.checked) {
        filterCurrResults(filter);
    } else {
        unfilterResults(filter);
    }
}

function unfilterResults(filter) {
    let category = filter.title;

    let filterBy = filter.id;

    checkedOrNot.set(filterBy, 0);
    let str = '';
    for (let [key, value] of checkedOrNot) {
        str += checkedOrNot.get(key);
    }
    if (filterGroups.has(str)) {
        // we found a previous version of this where the list
        // was already filtered on all these filters
        currResults = filterGroups.get(str);
        let oldIdx = categoricalFilters.get(category).indexOf(filterBy);
        if (oldIdx !== -1) {
            categoricalFilters.get(category).splice(oldIdx, 1);
        }
        displayResults();
    } else {
        let filteredOnCategory = allResults;

        // remove this new filter
        let oldIdx = categoricalFilters.get(category).indexOf(filterBy);
        if (oldIdx !== -1) {
            categoricalFilters.get(category).splice(oldIdx, 1);
        }

        let currCategoryFilters = categoricalFilters.get(category);
        let str2 = '';
        for (let [key, value] of checkedOrNot) {
            if (document.getElementById(key).title === category) {
                str2 += checkedOrNot.get(key);
            } else {
                str2 += 0;
            }
        }
        if (filterGroups.has(str2)) {
            filteredOnCategory = filterGroups.get(str2);
        } else {
            let newLst = [];
            for (let i = 0; i < currCategoryFilters.length; i++) {
                let res = filterOnList(allResults, currCategoryFilters[i], category);

                // now loop through res and add in any items to newLst that were not there
                // before
                for (let j = 0; j < res.length; j++) {
                    if (!newLst.includes(res[j])) {
                        newLst.push(res[j]);
                    }
                }
            }
            // at this point, all of the results in all results should be filtered on *this*
            // category with the use of "or" logic

            // if currCategoryFilters is empty then set newLst just to allResults
            if (currCategoryFilters.length === 0) {
                newLst = allResults;
            }

            filteredOnCategory = newLst;
            filterGroups.set(str2, filteredOnCategory);
        }

        // now, loop through filteredOnCategory and apply *and* logic to all the
        // remaining categories filters, checking and updating the map on the way as we go.

        // so loop through the categoricalFilters map

        for (let [key, value] of categoricalFilters) {

            // make sure this is not the current category we are on!
            if (key !== category) {
                let categoriesFilters = categoricalFilters.get(key);

                // now loop through each filter and filter the currently
                // pared down list
                for (let j = 0; j < categoriesFilters.length; j++) {
                    len++;
                    filteredOnCategory = filterOnList(filteredOnCategory,
                        categoriesFilters[j], key);
                }
            }
        }

        currResults = filteredOnCategory;
        filterGroups.set(str, currResults);
        displayResults();
    }
}




function filterCurrResults(filter) {
    // grab onto the "type" of filter this is (ie what group)
    let category = filter.title;

    // now grab onto the actual new filter criteria
    let filterBy = filter.id;


    // check the filterGroups map to see if we have already created
    // a collection which has been filtered on all the current
    // filters we have selected
    checkedOrNot.set(filterBy, 1);
    let str = '';
    for (let [key, value] of checkedOrNot) {
        str += checkedOrNot.get(key);
    }

    if (filterGroups.has(str)) {
        // we found a previous version of this where the list
        // was already filtered on all these filters
        currResults = filterGroups.get(str);
        categoricalFilters.get(category).push(filterBy);

        displayResults();
    } else {
        //we didnt already filter on these filters so we have to
        // build it up.

        let newList = [];

        // go through each categorical filters, so ie for hardware = "hardware",
        // and "price" = free, 0-100, 1000+, access=eyes
        // *first* go grab all the items in allResults which have this combination
        // of this categories filters. (check the map first and then add to the map
        // if it is not there already.

        let filteredOnCategory = allResults;

        // add this new filter
        categoricalFilters.get(category).push(filterBy);
        let currCategoryFilters = categoricalFilters.get(category);
        let str2 = '';
        for (let [key, value] of checkedOrNot) {
            if (document.getElementById(key).title === category) {
                str2 += checkedOrNot.get(key);
            } else {
                str2 += 0;
            }
        }
        if (filterGroups.has(str2)) {
            filteredOnCategory = filterGroups.get(str2);
        } else {
            let newLst = [];
            for (let i = 0; i < currCategoryFilters.length; i++) {
                let res = filterOnList(allResults, currCategoryFilters[i], category);

                // now loop through res and add in any items to newLst that were not there
                // before
                for (let j = 0; j < res.length; j++) {
                    if (!newLst.includes(res[j])) {
                        newLst.push(res[j]);
                    }
                }
            }
            // at this point, all of the results in all results should be filtered on *this*
            // category with the use of "or" logic
            filteredOnCategory = newLst;
            filterGroups.set(str2, filteredOnCategory);
        }

        // now, loop through filteredOnCategory and apply *and* logic to all the
        // remaining categories filters, checking and updating the map on the way as we go.

        // so loop through the categoricalFilters map
        for (let [key, value] of categoricalFilters) {

            // make sure this is not the current category we are on!
            if (key !== category) {
                let categoriesFilters = categoricalFilters.get(key);

                // now loop through each filter and filter the currently
                // pared down list
                for (let j = 0; j < categoriesFilters.length; j++) {
                    filteredOnCategory = filterOnList(filteredOnCategory,
                        categoriesFilters[j], key);
                }
            }
        }

        currResults = filteredOnCategory;
        filterGroups.set(str, currResults);
        displayResults();
    }
}

function filterOnList(listToFilter, filterBy, category) {
    let newItems = [];
    //console.log(listToFilter);
    for (let i = 0; i < listToFilter.length; i++) {
        let item = listToFilter[i];
        if (category === 'pro' && item.professional === 'true') {
            newItems.push(item);
        } else if (category === 'hardware' && item.hardware) {
            newItems.push(item);
        } else if (category === 'notHardware' && !item.hardware) {
            newItems.push(item);
        } else if (category === 'access') {
            let prodAccess = item.access;
            if (prodAccess.includes(checkBoxToField.get(filterBy))) {
                newItems.push(item);
            }
        } else if (category === 'software') {
            let prodPlatform = item.platform;
            if (prodPlatform.includes(checkBoxToField.get(filterBy))) {
                newItems.push(item);
            }
        } else if (category === 'features') {
            let prodFeat = item.features;
            if (prodFeat.includes(checkBoxToField.get(filterBy))) {
                newItems.push(item);
            }
        } else if (category === 'language') {
            let prodLanguages = item.languages;
            if (prodLanguages.includes(checkBoxToField.get(filterBy))) {
                newItems.push(item);
            }
        } else if (filterBy === 'freeTo50'
            && item.price === 0) {
            newItems.push(item);
        } else if (filterBy === '0to99'
            && item.price <= 99.99) {
            newItems.push(item);
        } else if (filterBy === '100to599'
            && item.price >= 100 &&
            item.price <= 599.99) {
            newItems.push(item);
        } else if (filterBy === '600to999'
            && item.price >= 600 &&
            item.price <= 999.99) {
            newItems.push(item);
        } else if (filterBy === '1000up'
            && item.price >= 1000) {
            newItems.push(item);
        }
    }
    return newItems;
}

function displayResults() {
    let build = "";
    let i;
    for (i = 0; i < currResults.length; i++) {

        build += "<li><div id='info'>";
        build += "<div id='name'>" +
            currResults[i].name.charAt(0).toUpperCase() +
            currResults[i].name.substring(1) + "</div>";
        if (currResults[i].professional === true) {
            build += "<div id='professional'>" +
                "<i class=\"fas fa-user-md\"></i></div>";
        }
        build += "<div id='price'>$" + currResults[i].price + "</div></div>";

        build += "<img src=/images/";
        build += currResults[i].img;
        build += " >";
        build += "<div id='description'>" + currResults[i].description;
        build += "</div>";
        build += "<div id='btns'>";
        build += "<button id='view' name='" +
                    currResults[i].name + "'onclick='goTo(this)'>View</button>";
        build += "<button id='compare' name='" + currResults[i].id +"' onclick='storeCompare(this)'>" +
            "Compare</button></div></li>";
    }
    document.getElementById("resultPanel").innerHTML = currResults.length
        + " result(s) found <br><br>";
    document.getElementById("resultList").innerHTML = build;
}

function storeCompare(btn) {
    if (compareList.length < 3) {
        if (compareList.includes(btn.name)) {
            let idx = compareList.indexOf(btn.name);
            compareList.splice(idx, 1);
            document.getElementById('compare_all_your_items').textContent = "Compare(" +
                compareList.length + ")";
        } else {
            compareList.push(btn.name);
            document.getElementById('compare_all_your_items').textContent = "Compare(" +
                compareList.length + ")";
        }
    } else {
        alert("You can only compare up to 3 items!");
    }
}

function compare() {
    let s = "/compareProducts?";
    if (compareList.length < 2) {
        alert("Add more items!");
    } else {
        for (let i = 0; i < compareList.length; i++) {
            for (let j = 0; j < currResults.length; j++) {
                //console.log(parseInt(compareList[i]));
                if (currResults[j].id === parseInt(compareList[i])) {
                    if (i !== 0) {
                        s += "&";
                    }
                    s += currResults[j].name;
                }
            }
        }
        //console.log(s);
        window.location = s;
    }
}

function goHome() {
    window.location = "/";
}

function goTo(name) {
    window.location = "/productPage?" + name.name;
}

function glossary() {
    window.location = "/glossary";
}

