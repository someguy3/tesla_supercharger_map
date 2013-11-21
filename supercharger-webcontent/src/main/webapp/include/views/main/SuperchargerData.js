redshiftsoft = createMyNamespace("redshiftsoft");

/**
 * Constructor
 */
redshiftsoft.SuperchargerData = function () {
    if ('undefined' == typeof redshiftsoft.SuperchargerData.ID_INIT) {
        this.initializeIds();
    }
};

redshiftsoft.SuperchargerData.prototype.initializeIds = function () {
    var count = 0;
    for (var i = 0; i < redshiftsoft.SuperchargerData.LIST.length; i++) {
        var supercharger = redshiftsoft.SuperchargerData.LIST[i];
        supercharger.id = count++;
    }
    redshiftsoft.SuperchargerData.ID_INIT = true;
};

redshiftsoft.SuperchargerData.prototype.size = function () {
    return redshiftsoft.SuperchargerData.LIST.length;
};

redshiftsoft.SuperchargerData.prototype.get = function (index) {
    return redshiftsoft.SuperchargerData.LIST[index];
};

redshiftsoft.SuperchargerData.prototype.getById = function (id) {
    for (var i = 0; i < redshiftsoft.SuperchargerData.LIST.length; i++) {
        var supercharger = redshiftsoft.SuperchargerData.LIST[i];
        if (supercharger.id == id) {
            return supercharger;
        }
    }
    return null;
};

redshiftsoft.SuperchargerData.prototype.removeById = function (id) {
    for (var index = 0; index < redshiftsoft.SuperchargerData.LIST.length; index++) {
        var supercharger = redshiftsoft.SuperchargerData.LIST[index];
        if (supercharger.id == id) {
            redshiftsoft.SuperchargerData.LIST.splice(index, 1);
            break;
        }
    }
};

redshiftsoft.SuperchargerData.prototype.addSupercharger = function (displayName, location) {
    var charger = {
        "id": this.size() + 10000,
        "displayName": displayName,
        "address": new redshiftsoft.Address("", "", "", "", ""),
        "location": location,
        "url": null,
        "count": false,
        "custom": true
    };
    redshiftsoft.SuperchargerData.LIST.push(charger);
    return charger;
};


/**
 * Returns the count of superchargers with a country in the passed list of countries.
 *
 * @param region example value: "|US|Canada|".
 * @returns {number}
 */
redshiftsoft.SuperchargerData.prototype.getRegionCount = function (region) {
    var count = 0;
    for (var i = 0; i < redshiftsoft.SuperchargerData.LIST.length; i++) {
        var supercharger = redshiftsoft.SuperchargerData.LIST[i];
        if (supercharger.count && region.indexOf("|" + supercharger.address.country + "|") >= 0) {
            count++;
        }
    }
    return count;
};

/**
 * Other properties that are later added to the supercharger data structure:
 *
 * id           -- [Integer] uniquely identifies each record.
 * circle       -- [google.maps.Circle] a reference to the google-maps Circle object indicating range for this supercharger.
 * marker       -- [google.maps.Marker] a reference to the google-maps Marker object associated with this supercharger.
 * custom       -- [Boolean] true indicates that this is a custom marker added by the customer.
 * construction -- [Boolean] true indicates that this location is under construction
 *
 */
redshiftsoft.SuperchargerData.LIST = [

    //-----------------------------------------------------------------------------------------------------------------| Arizona
    {
        "displayName": "Gila Bend,  AZ",
        "address": new redshiftsoft.Address("820 W Pima St", "Gila Bend", "AZ", "85337", "USA"),
        "location": new google.maps.LatLng(32.943852, -112.733536),
        "url": "http://www.teslamotors.com/supercharger/gila",
        "construction": true,
        "count": false
    },
    {
        "displayName": "Quartzsite, AZ",
        "address": new redshiftsoft.Address("1451 W Main St", "Quartzsite", "AZ", "85346", "USA"),
        "location": new google.maps.LatLng(33.661314, -114.242174),
        "url": "http://www.teslamotors.com/supercharger/quartzsite",
        "count": true
    },
    //-----------------------------------------------------------------------------------------------------------------| California
    {
        "displayName": "Atascadero, CA",
        "address": new redshiftsoft.Address("6950 El Camino Real", "Atascadero", "CA", "93422", "USA"),
        "location": new google.maps.LatLng(35.48656, -120.66633),
        "url": "http://www.teslamotors.com/supercharger/atascadero",
        "count": true
    },
    {
        "displayName": "Barstow, CA",
        "address": new redshiftsoft.Address("2812 Lenwood Rd", "Barstow", "CA", "92311", "USA"),
        "location": new google.maps.LatLng(34.849129, -117.085446),
        "url": "http://www.teslamotors.com/supercharger/barstow",
        "count": true
    },
    {
        "displayName": "Buellton, CA",
        "address": new redshiftsoft.Address("555 McMurray RD", "Buellton", "CA", "93427", "USA"),
        "location": new google.maps.LatLng(34.614560, -120.188387),
        "url": "http://www.teslamotors.com/supercharger/buellton",
        "count": true
    },
    {
        "displayName": "Corning, CA",
        "address": new redshiftsoft.Address("950 Hwy 99", "W Corning", "CA", "96021", "USA"),
        "location": new google.maps.LatLng(39.926454, -122.198393),
        "url": "http://www.teslamotors.com/supercharger/corning",
        "count": true
    },
    {
        "displayName": "Folsom, CA",
        "address": new redshiftsoft.Address("13000 Folsom Blvd", "Folsom", "CA", "95630", "USA"),
        "location": new google.maps.LatLng(38.64258, -121.18806),
        "url": "http://www.teslamotors.com/supercharger/folsom",
        "count": true
    },
    {
        "displayName": "Fremont, CA",
        "address": new redshiftsoft.Address("45500 Fremont Blvd", "Fremont", "CA", "94538", "USA"),
        "location": new google.maps.LatLng(37.493447, -121.945654),
        "url": "http://www.teslamotors.com/supercharger/fremont",
        "count": true
    },
    {
        "displayName": "Gilroy, CA",
        "address": new redshiftsoft.Address("681 Leavesley Road", "Gilroy", "CA", "95020", "USA"),
        "location": new google.maps.LatLng(37.02493, -121.56542),
        "url": "http://www.teslamotors.com/supercharger/gilroy",
        "count": true
    },
    {
        "displayName": "Harris Ranch, CA",
        "address": new redshiftsoft.Address("24505 W. Dorris Ave", "Coalinga", "CA", "93210", "USA"),
        "location": new google.maps.LatLng(36.254150, -120.237896),
        "url": "http://www.teslamotors.com/supercharger/harrisranch",
        "count": true
    },
    {
        "displayName": "Hawthorne, CA",
        "address": new redshiftsoft.Address("1 Rocket Rd", "Hawthorne", "CA", "90250", "USA"),
        "location": new google.maps.LatLng(33.921068, -118.330054),
        "url": "http://www.teslamotors.com/supercharger/losangeles",
        "count": true
    },
    {
        "displayName": "Mt Shasta, CA",
        "address": new redshiftsoft.Address("111 Morgan Way", "Mt. Shasta", "CA", "96067", "USA"),
        "location": new google.maps.LatLng(41.310233, -122.317278),
        "url": "http://www.teslamotors.com/supercharger/mtshasta",
        "count": true
    },
    {
        "displayName": "Tejon Ranch, CA",
        "address": new redshiftsoft.Address("5602 Dennis McCarthy Dr", "Lebec", "CA", "93243", "USA"),
        "location": new google.maps.LatLng(34.98734, -118.94623),
        "url": "http://www.teslamotors.com/supercharger/tejonranch",
        "count": true
    },
    // TODO: URL IS PROBABLY NOT CORRECT.
    {
        "displayName": "Vacaville, CA",
        "address": new redshiftsoft.Address("152-160 Nut Tree Pkwy Vacaville Premium Outlets", "Vacaville", "CA", "95687", "USA"),
        "location": new google.maps.LatLng(38.366592, -121.958156),
        "url": "http://www.teslamotors.com/supercharger/vacaville",
        "construction": true,
        "count": false
    },

    //-----------------------------------------------------------------------------------------------------------------| Colorado
    {
        "displayName": "Glenwood Springs, CO",
        "address": new redshiftsoft.Address("125 Wulfsohn Rd", "Glenwood Springs", "CO", "81601", "USA"),
        "location": new google.maps.LatLng(39.552680, -107.340168),
        "url": "http://www.teslamotors.com/supercharger/glenwoodsprings",
        "count": true
    },
    {
        "displayName": "Silverthorne, CO",
        "address": new redshiftsoft.Address("309 Rainbow Dr", "Silverthorne", "CO", "80498", "USA"),
        "location": new google.maps.LatLng(39.631457, -106.070816),
        "url": "http://www.teslamotors.com/supercharger/silverthorne",
        "count": true
    },
    //-----------------------------------------------------------------------------------------------------------------| Connecticut
    {
        "displayName": "Milford, CT (north)",
        "address": new redshiftsoft.Address("1 CT Turnpike N", "Milford", "CT", "06460", "USA"),
        "location": new google.maps.LatLng(41.245814, -73.008988),
        "url": "http://www.teslamotors.com/supercharger/milfordnorth",
        "count": true
    },
    {
        "displayName": "Milford, CT (south)",
        "address": new redshiftsoft.Address("1 CT Turnpike N", "Milford", "CT", "06460", "USA"),
        "location": new google.maps.LatLng(41.246232, -73.010529),
        "url": "http://www.teslamotors.com/supercharger/milfordsouth",
        "count": false
    },
    {
        "displayName": "Darien, CT (north)",
        "address": new redshiftsoft.Address("Connecticut Welcome Center", "North Darien", "CT", "06820", "USA"),
        "location": new google.maps.LatLng(41.080599, -73.461905),
        "url": "http://www.teslamotors.com/supercharger/dariennorth",
        "count": true
    },
    {
        "displayName": "Darien, CT (south)",
        "address": new redshiftsoft.Address("I-95 South after exit 10", "Darien", "CT", "06820", "USA"),
        "location": new google.maps.LatLng(41.068167, -73.504659),
        "url": "http://www.teslamotors.com/supercharger/dariensouth",
        "count": false
    },
    //-----------------------------------------------------------------------------------------------------------------| Delaware
    {
        "displayName": "Newark, DE",
        "address": new redshiftsoft.Address("530 JFK Memorial Highway", "Newark", "DE", "19725", "USA"),
        "location": new google.maps.LatLng(39.662313, -75.691980),
        "url": "http://www.teslamotors.com/supercharger/newark",
        "count": true
    },
    //-----------------------------------------------------------------------------------------------------------------| Florida
    {
        "displayName": "Port Orange, FL",
        "address": new redshiftsoft.Address("5302 S. Williamson Blvd", "Port Orange", "FL", "32128", "USA"),
        "location": new google.maps.LatLng(29.108566, -81.034569),
        "url": "http://www.teslamotors.com/supercharger/portorange",
        "count": true
    },
    {
        "displayName": "Port St. Lucie, FL",
        "address": new redshiftsoft.Address("1773 N.W. St. Lucie W. Boulevard", "Port St. Lucie", "FL", "34986", "USA"),
        "location": new google.maps.LatLng(27.313023, -80.406688),
        "url": "http://www.teslamotors.com/supercharger/portstlucie",
        "count": true
    },
    {
        "displayName": "Fort Myers, FL",
        "address": new redshiftsoft.Address("9903 Gulf Coast Main Street", "Fort Myers", "FL", "33913", "USA"),
        "location": new google.maps.LatLng(26.485640, -81.787136),
        "url": "http://www.teslamotors.com/supercharger/fortmyers",
        "count": true
    },

    //-----------------------------------------------------------------------------------------------------------------| Illinois
    {
        "displayName": "Rockford, IL",
        "address": new redshiftsoft.Address("7200 Harrison Ave", "Rockford", "IL", "61112", "USA"),
        "location": new google.maps.LatLng(42.243896, -88.978877),
        "url": "http://www.teslamotors.com/supercharger/rockford",
        "count": true
    },
    {
        "displayName": "Normal, IL",
        "address": new redshiftsoft.Address("Uptown Station Parking Deck 11 Uptown Circle", "Normal", "IL", "61761", "USA"),
        "location": new google.maps.LatLng(40.508497, -88.985575),
        "url": "http://www.teslamotors.com/supercharger/normal",
        "count": true
    },
    //-----------------------------------------------------------------------------------------------------------------| North Carolina
    {
        "displayName": "Burlington, NC",
        "address": new redshiftsoft.Address("1080 Piper Ln", "Burlington", "NC", "27215", "USA"),
        "location": new google.maps.LatLng(36.070790, -79.511211),
        "url": "http://www.teslamotors.com/supercharger/burlingtonnc",
        "count": true
    },
    {
        "displayName": "Rocky Mount, NC",
        "address": new redshiftsoft.Address("651 N. Winstead Avenue", "Rocky Mount", "NC", "27804", "USA"),
        "location": new google.maps.LatLng(35.972874, -77.846870),
        "url": "http://www.teslamotors.com/supercharger/rockymount",
        "count": true
    },
    //-----------------------------------------------------------------------------------------------------------------| Oregon
    {
        "displayName": "Grants Pass, OR",
        "address": new redshiftsoft.Address("1900 NW 6th St.", "Grants Pass", "OR", "97526", "USA"),
        "location": new google.maps.LatLng(42.460883, -123.324124),
        "url": "http://www.teslamotors.com/supercharger/grantspass",
        "count": true
    },
    {
        "displayName": "Springfield, OR",
        "address": new redshiftsoft.Address("919 Kruse Way", "Springfield", "OR", "97477", "USA"),
        "location": new google.maps.LatLng(44.082605, -123.037471),
        "url": "http://www.teslamotors.com/supercharger/springfield",
        "count": true
    },
    {
        "displayName": "Woodburn, OR",
        "address": new redshiftsoft.Address("255 N Arney Rd", "Woodburn", "OR", "97071", "USA"),
        "location": new google.maps.LatLng(45.15313, -122.881254),
        "url": "http://www.teslamotors.com/supercharger/woodburn",
        "count": true
    },
    //-----------------------------------------------------------------------------------------------------------------| South Dakota
    {
        "displayName": "Mitchell, SD",
        "address": new redshiftsoft.Address("1241-1571 W Havens St", "Mitchell", "SD", "57301", "USA"),
        "location": new google.maps.LatLng(43.701139, -98.044401),
        "url": "http://www.teslamotors.com/supercharger/mitchell",
        "construction": true,
        "count": false
    },
    //-----------------------------------------------------------------------------------------------------------------| Texas
    {
        "displayName": "Columbus, TX",
        "address": new redshiftsoft.Address("2535 Texas 71", "Columbus", "TX", "78934", "USA"),
        "location": new google.maps.LatLng(29.690062, -96.537725),
        "url": "http://www.teslamotors.com/supercharger/columbus",
        "count": true
    },
    {
        "displayName": "Corsicana, TX",
        "address": new redshiftsoft.Address("2035 Interstate 45 Frontage Rd", "Corsicana", "TX", "75109", "USA"),
        "location": new google.maps.LatLng(32.068577, -96.448229),
        "url": "http://www.teslamotors.com/supercharger/corsicana",
        "count": true
    },
    {
        "displayName": "Huntsville, TX",
        "address": new redshiftsoft.Address("148 Interstate 45", "Huntsville", "TX", "77340", "USA"),
        "location": new google.maps.LatLng(30.716158, -95.565944),
        "url": "http://www.teslamotors.com/supercharger/huntsville",
        "count": true
    },
    {
        "displayName": "San Marcos, TX",
        "address": new redshiftsoft.Address("3939 Interstate 35", "San Marcos", "TX", "78666", "USA"),
        "location": new google.maps.LatLng(29.827692, -97.979677),
        "url": "http://www.teslamotors.com/supercharger/sanmarcos",
        "count": true
    },
    {
        "displayName": "Waco, TX",
        "address": new redshiftsoft.Address("701 Interstate 35", "Bellmead", "TX", "76705", "USA"),
        "location": new google.maps.LatLng(31.58224, -97.10915),
        "url": "http://www.teslamotors.com/supercharger/waco",
        "count": true
    },
    //-----------------------------------------------------------------------------------------------------------------| Virginia
    {
        "displayName": "Glen Allen, VA",
        "address": new redshiftsoft.Address("9860 Brook Rd", "Glen Allen", "VA", "23059", "USA"),
        "location": new google.maps.LatLng(37.669832, -77.461419),
        "url": "http://www.teslamotors.com/supercharger/glenallen",
        "count": true
    },
    //-----------------------------------------------------------------------------------------------------------------| Washington
    {
        "displayName": "Burlington, WA",
        "address": new redshiftsoft.Address("9384 Old Highway 99", "North Burlington", "WA", "98233", "USA"),
        "location": new google.maps.LatLng(48.509772, -122.338625),
        "url": "http://www.teslamotors.com/supercharger/burlington",
        "count": true
    },
    {
        "displayName": "Centralia, WA",
        "address": new redshiftsoft.Address("1200 Lum Rd", "Centralia", "WA", "98531", "USA"),
        "location": new google.maps.LatLng(46.729732, -122.977454),
        "url": "http://www.teslamotors.com/supercharger/centralia",
        "count": true
    },

    //-----------------------------------------------------------------------------------------------------------------| NORWAY
    //
    //
    //
    //-----------------------------------------------------------------------------------------------------------------| NORWAY

    {
        "displayName": "Dombås, Norway",
        "address": new redshiftsoft.Address("P plass bak KIWI Mini Pris Dombås, Dombås 2660", "", "", "", "Norway"),
        "location": new google.maps.LatLng(62.074926, 9.128281),
        "url": "http://www.teslamotors.com/supercharger/dombas",
        "count": true
    },
    {
        "displayName": "Lillehammer, Norway",
        "address": new redshiftsoft.Address("Korgvegen 37, 2619 Lillehammer", "", "", "", "Norway"),
        "location": new google.maps.LatLng(61.13045, 10.43491),
        "url": "http://www.teslamotors.com/supercharger/lillehammer",
        "count": true
    },
    {
        "displayName": "Gol, Norway",
        "address": new redshiftsoft.Address("5 Heradvegen Gol, 3550", "", "", "", "Norway"),
        "location": new google.maps.LatLng(60.70232, 8.98620),
        "url": "http://www.teslamotors.com/supercharger/gol",
        "count": true
    },
    {
        "displayName": "Aurland, Norway",
        "address": new redshiftsoft.Address("Nyheim Aurland, Aurland 5745", "", "", "", "Norway"),
        "location": new google.maps.LatLng(60.89863, 7.21082),
        "url": "http://www.teslamotors.com/supercharger/aurland",
        "count": true
    },
    {
        "displayName": "Cinderella, Norway",
        "address": new redshiftsoft.Address("Gnr 3 Bnr 318 Brokelandsheia 4993 Sundebru", "", "", "", "Norway"),
        "location": new google.maps.LatLng(58.820783, 9.073746),
        "url": "http://www.teslamotors.com/supercharger/cinderella",
        "count": true
    },
    {
        "displayName": "Lyngdal, Norway",
        "address": new redshiftsoft.Address("1 Fiboveien, Lyngdal 4580", "", "", "", "Norway"),
        "location": new google.maps.LatLng(58.15653, 7.10298),
        "url": "http://www.teslamotors.com/supercharger/lyngdal",
        "count": true
    }


];