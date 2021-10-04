import * as prodConstants from '../constants/productConstants';
import {TOUCH_ACCESS_KEY} from "../constants/productConstants";

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


let checkBox= [[prodConstants.KEYBOARD, prodConstants.KEYBOARD],
    [prodConstants.TOUCH_ACCESS_KEY, prodConstants.TOUCH_VALUE], [prodConstants.SWITCH_ACCESS_KEY, 'switch'],
    ['accessMouse', 'mouse'], ['accessEyes', 'eyes'],
    ['softwareMacOS', 'mac'], ['softwareIOS', 'ios'],
    ['softwareECU', 'ecu'],
    ['softwareWindows', 'windows'], ['softwareAndroid', 'android'],
    ['emailExtra', 'email'], ['textingExtra', 'texting'],
    ['socialMedia', 'social'], ['drawingWriting', 'draw'],
    ['camera', 'camera'], ['mount', 'mountable'],
    ['wearable', 'wearable'], ['warranty', 'warranty']];

let checkBoxToField =  new Map(checkBox);

window.onload = function() {
    let str = window.location.href;
    console.log(str);
    let idx = str.indexOf("?");
    str = str.substring(idx);
    let sub = str.indexOf("Q");
    let sub1 = str.indexOf("$ACC");
    let oReq = new XMLHttpRequest();
    if (sub1 !== -1) {
        str = str.substring(5);
        console.log("product access");
        oReq.open("GET", "/productAccess?query=" + str, true);

    } else if (sub !== -1) {
        str = str.substring(2);
        console.log("textSearch");
        oReq.open("GET", "/textSearch?query=" + str, true);

    } else if (str === "?") {
        //console.log("here 2");
        console.log("get products");
        oReq.open("GET", "/products", true);

    } else {
        //console.log("here 3");
        console.log("get product");
        oReq.open("GET", "/product" + str, true);

    }
    oReq.responseType = 'json';
    oReq.onload = function(oEvent) {
        // all Results is all the results returned originally
        allResults = oReq.response;
        // to begin, curr results is all results
        // as there is no filters
        currResults = allResults;


        /* to begin all the lists are set to allResults
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
        */

        // set the categorical filters map up, at the begining
        // this should just have a bunch of empty lists
        // for hardware it is either true in the list or it is just true
        categoricalFilters.set("hardware", []);
        categoricalFilters.set("software", []);
        // filter for the platforms
        categoricalFilters.set("platform", []);
        categoricalFilters.set("access", []);
        categoricalFilters.set("features", []);
        categoricalFilters.set("language", []);
        categoricalFilters.set("price", []);



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

        // fills up checkedOrNot with a list of whether or not a certain category is checked or
        // not checked
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
        if (filter.title === 'hardware' &&
            document.getElementById('software').checked) {
            document.getElementById('hardware').checked = false;
            document.getElementById('alert').style.display = 'inherit';
        } else if (filter.title === 'software' &&
            document.getElementById('hardware').checked) {
            document.getElementById('software').checked = false;
            document.getElementById('alert').style.display = 'inherit';
        } else {
            filterCurrResults(filter);
        }
    } else {
        unfilterResults(filter);
    }
}


function searchQuery() {
    let queryString = document.getElementById('search').value;
    window.location = "/loadProduct?Q" + queryString;
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
        // add this new filter
        categoricalFilters.get(category).push(filterBy);
        // get all the current filters in this same category
        // note that if this is
        let currCategoryFilters = categoricalFilters.get(category);

        // now loop through all the filters that are within this category and apply
        // "or" logic, so that all items in newLst are for instance ios or windows if
        // in platform both ios and windows are checked
        let newLst = [];
        for (let i = 0; i < currCategoryFilters.length; i++) {
            // res will be the result of allResults filtered on the currentCategoricalFilter,
            // making sure to match the filter to the current category
            let res = filterOnList(allResults, currCategoryFilters[i], category);

            // now loop through res and add in any items to newLst which were not
            // there before
            for (let j = 0; j < res.length; j++) {
                if (!newLst.includes(res[j])) {
                    newLst.push(res[j]);
                }
            }
        }
        // at this point, all of the results in all results should be filtered on *this*
        // category with the use of "or" logic
        filteredOnCategory = newLst;

        // now, loop through filteredOnCategory and apply *and* logic to all the
        // remaining categories filters, checking and updating the map on the way as we go.

        // so loop through the categoricalFilters map
        for (let [key, value] of categoricalFilters) {
            newLst = [];
            // make sure this is not the current category we are on!
            if (key !== category) {
                // grab the categorical filter for this category
                let categoriesFilters = categoricalFilters.get(key);

                // now loop through each filter and filter the currently
                // pared down list, using *or* logic on each category
                for (let j = 0; j < categoriesFilters.length; j++) {
                    let res = filterOnList(filteredOnCategory,
                        categoriesFilters[j], key);
                    for (let k = 0; k < res.length; k++) {
                        if (!newLst.includes(res[k])) {
                            newLst.push(res[k]);
                        }
                    }
                }
                // at this point we now have newLst which is a list of all the items from
                // the currently pared down version of the initial category
                // and also every item which is from the other current category
                // so now we filteredOnCategory to be the newLst we made
                if (newLst.length > 0) {
                    filteredOnCategory = newLst;
                }
            }
        }

        currResults = filteredOnCategory;
        filterGroups.set(str, currResults);
        displayResults();
    }
}

function unfilterResults(filter) {
    // grab onto the "type" of filter this is (ie what group)
    let category = filter.title;

    // now grab onto the actual new filter criteria
    let filterBy = filter.id;


    // check the filterGroups map to see if we have already created
    // a collection which has been filtered on all the current
    // filters we have selected
    checkedOrNot.set(filterBy, 0);
    let str = '';
    for (let [key, value] of checkedOrNot) {
        str += checkedOrNot.get(key);
    }

    if (filterGroups.has(str)) {
        // we found a previous version of this where the list
        // was already filtered on all these filters
        currResults = filterGroups.get(str);
        let idx = categoricalFilters.get(category).indexOf(filterBy);
        categoricalFilters.get(category).splice(idx, 1);

        displayResults();
    } else {
        let idx = categoricalFilters.get(category).indexOf(filterBy);
        categoricalFilters.get(category).splice(idx, 1);

        // get all the current filters in this same category
        // note that if this is
        let currCategoryFilters = categoricalFilters.get(category);

        // now loop through all the filters that are within this category and apply
        // "or" logic, so that all items in newLst are for instance ios or windows if
        // in platform both ios and windows are checked
        let newLst = [];
        for (let i = 0; i < currCategoryFilters.length; i++) {
            // res will be the result of allResults filtered on the currentCategoricalFilter,
            // making sure to match the filter to the current category
            let res = filterOnList(allResults, currCategoryFilters[i], category);

            // now loop through res and add in any items to newLst which were not
            // there before
            for (let j = 0; j < res.length; j++) {
                if (!newLst.includes(res[j])) {
                    newLst.push(res[j]);
                }
            }
        }
        // at this point, all of the results in all results should be filtered on *this*
        // category with the use of "or" logic
        filteredOnCategory = newLst;
        if (newLst.length < 1) {
            filteredOnCategory = allResults;
        }

        // now, loop through filteredOnCategory and apply *and* logic to all the
        // remaining categories filters, checking and updating the map on the way as we go.

        // so loop through the categoricalFilters map
        for (let [key, value] of categoricalFilters) {
            newLst = [];
            // make sure this is not the current category we are on!
            if (key !== category) {
                // grab the categorical filter for this category
                let categoriesFilters = categoricalFilters.get(key);

                // now loop through each filter and filter the currently
                // pared down list, using *or* logic on each category
                for (let j = 0; j < categoriesFilters.length; j++) {
                    let res = filterOnList(filteredOnCategory,
                        categoriesFilters[j], key);
                    for (let k = 0; k < res.length; k++) {
                        if (!newLst.includes(res[k])) {
                            newLst.push(res[k]);
                        }
                    }
                }
                // at this point we now have newLst which is a list of all the items from
                // the currently pared down version of the initial category
                // and also every item which is from the other current category
                // so now we filteredOnCategory to be the newLst we made
                if (newLst.length > 0) {
                    filteredOnCategory = newLst;
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
    // loops through the given listToFilter and
    // filters by filterBy on given cateogry
    for (let i = 0; i < listToFilter.length; i++) {
        // get the filter item which is the product which is up for
        // consideration from the list to filter on
        let item = listToFilter[i];
        // if the category is hardware and the item we are on is hardware
        // and if the filterBy is true then we want to filter all items which are hardware
        if (category === 'hardware' && item.hardware) {
            newItems.push(item);
        } else if (category === 'software' && !item.hardware) {
            newItems.push(item);
        } else if (category === 'access') {
            let prodAccess = item.access;
            if (prodAccess.includes(checkBoxToField.get(filterBy))) {
                newItems.push(item);
            }
        } else if (category === 'platform') {
            let prodPlatform = item.platform;
            if (prodPlatform.includes(checkBoxToField.get(filterBy))) {
                newItems.push(item);
            }
        } else if (category === 'features') {
            let prodFeat = item.features;
            if (prodFeat.includes(checkBoxToField.get(filterBy))) {
                newItems.push(item);
            }
        } else if (category === 'language' && item.languages.length > 1) {
            newItems.push(item);
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
            currResults[i].upperName + "</div>";
        if (currResults[i].professional === true) {
            build += "<div id='professional'>" +
                "<i class=\"fas fa-user-md\"></i></div>";
        }
        build += "<div id='brand'>" + currResults[i].brand + "</div>"
        build += "<div id='price'>$" + currResults[i].price + "</div></div>";

        build += "<img src=/images/";
        build += currResults[i].img;
        build += " >";
        let desc = "";
        if (currResults[i].longDescription) {
            desc = currResults[i].longDescription;
        }
        build += "<div id='description'>" + desc;
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
                btn.style.background = "#0F4880";
                btn.style.border = "4px solid #0F4880";
            } else {
                compareList.push(btn.name);
                document.getElementById('compare_all_your_items').textContent = "Compare(" +
                    compareList.length + ")";
                btn.style.background = "#1478cb";
                btn.style.border = "4px solid #1478cb";
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

