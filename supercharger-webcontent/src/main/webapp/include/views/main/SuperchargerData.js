redshiftsoft = createMyNamespace("redshiftsoft");

/**
 *
 * Constructor
 */
redshiftsoft.SuperchargerData = function () {

};

redshiftsoft.SuperchargerData.prototype.size = function () {
    return redshiftsoft.SuperchargerData.LIST.length;
};

redshiftsoft.SuperchargerData.prototype.get = function (index) {
    return redshiftsoft.SuperchargerData.LIST[index];
};

/**
 * Returns the count of superchargers with a country in the passed list of countries.
 *
 * @param region, example value: "|US|Canada|".
 * @returns {number}
 */
redshiftsoft.SuperchargerData.prototype.getRegionCount = function (region) {
    var count = 0;
    for (var i = 0; i < redshiftsoft.SuperchargerData.LIST.length; i++) {
        var supercharger = redshiftsoft.SuperchargerData.LIST[i];
        if (supercharger.count && region.indexOf("|" + supercharger.country + "|") >= 0) {
            count++;
        }
    }
    return count;
};


redshiftsoft.SuperchargerData.LIST = [

    //-----------------------------------------------------------------------------------------------------------------| California
    {
        "displayName": "Folsom, CA",
        "streetAddress": "13000 Folsom Blvd, Folsom, CA 95630",
        "country": "USA",
        "location": new google.maps.LatLng(38.64258, -121.18806),
        "url": "http://www.teslamotors.com/supercharger/folsom",
        "count": true
    },
    {
        "displayName": "Gilroy, CA",
        "streetAddress": "681 Leavesley Road, Gilroy, CA 95020",
        "country": "USA",
        "location": new google.maps.LatLng(37.02493, -121.56542),
        "url": "http://www.teslamotors.com/supercharger/gilroy",
        "count": true
    },
    {
        "displayName": "Atascadero, CA",
        "streetAddress": "6950 El Camino Real, Atascadero, CA 93422",
        "country": "USA",
        "location": new google.maps.LatLng(35.48656, -120.66633),
        "url": "http://www.teslamotors.com/supercharger/atascadero",
        "count": true
    },
    {
        "displayName": "Tejon Ranch, CA",
        "streetAddress": "5602 Dennis McCarthy Dr, Lebec, CA 93243",
        "country": "USA",
        "location": new google.maps.LatLng(34.98734, -118.94623),
        "url": "http://www.teslamotors.com/supercharger/tejonranch",
        "count": true
    },
    {
        "displayName": "Barstow, CA",
        "streetAddress": "2812 Lenwood Rd., Barstow, CA 92311",
        "country": "USA",
        "location": new google.maps.LatLng(34.849129, -117.085446),
        "url": "http://www.teslamotors.com/supercharger/barstow",
        "count": true
    },
    {
        "displayName": "Fremont, CA",
        "streetAddress": "45500 Fremont Blvd, Fremont, CA 94538",
        "country": "USA",
        "location": new google.maps.LatLng(37.493447, -121.945654),
        "url": "http://www.teslamotors.com/supercharger/fremont",
        "count": true
    },
    {
        "displayName": "Harris Ranch, CA",
        "streetAddress": "24505 W. Dorris Ave, Coalinga, CA 93210",
        "country": "USA",
        "location": new google.maps.LatLng(36.254150, -120.237896),
        "url": "http://www.teslamotors.com/supercharger/harrisranch",
        "count": true
    },
    {
        "displayName": "Buellton, CA",
        "streetAddress": "555 McMurray Road, Buellton, CA 93427",
        "country": "USA",
        "location": new google.maps.LatLng(34.614560, -120.188387),
        "url": "http://www.teslamotors.com/supercharger/buellton",
        "count": true
    },
    {
        "displayName": "Hawthorne, CA",
        "streetAddress": "1 Rocket Rd, Hawthorne, CA 90250",
        "country": "USA",
        "location": new google.maps.LatLng(33.921068, -118.330054),
        "url": "http://www.teslamotors.com/supercharger/losangeles",
        "count": true
    },
    //-----------------------------------------------------------------------------------------------------------------| Colorado
    {
        "displayName": "Glenwood Springs, CO",
        "streetAddress": "125 Wulfsohn Rd, Glenwood Springs, CO",
        "country": "USA",
        "location": new google.maps.LatLng(39.552680, -107.340168),
        "url": "http://www.teslamotors.com/supercharger/glenwoodsprings",
        "count": true
    },
    {
        "displayName": "Silverthorne, CO",
        "streetAddress": "309 Rainbow Dr, Silverthorne, CO 80498",
        "country": "USA",
        "location": new google.maps.LatLng(39.631457, -106.070816),
        "url": "http://www.teslamotors.com/supercharger/silverthorne",
        "count": true
    },
    //-----------------------------------------------------------------------------------------------------------------| Connecticut
    {
        "displayName": "Milford, CT (north)",
        "streetAddress": "1 CT Turnpike N, Milford, CT 06460",
        "country": "USA",
        "location": new google.maps.LatLng(41.245814, -73.008988),
        "url": "http://www.teslamotors.com/supercharger/milfordnorth",
        "count": true
    },
    {
        "displayName": "Milford, CT (south)",
        "streetAddress": "1 CT Turnpike N, Milford, CT 06460",
        "country": "USA",
        "location": new google.maps.LatLng(41.246232, -73.010529),
        "url": "http://www.teslamotors.com/supercharger/milfordsouth",
        "count": false
    },
    {
        "displayName": "Darien, CT (north)",
        "streetAddress": "Connecticut Welcome Center North Darien, CT, 06820",
        "country": "USA",
        "location": new google.maps.LatLng(41.080599, -73.461905),
        "url": "http://www.teslamotors.com/supercharger/dariennorth"
    },
    {
        "displayName": "Darien, CT (south)",
        "streetAddress": "I-95 South after exit 10, Darien, CT 06820",
        "country": "USA",
        "location": new google.maps.LatLng(41.068167, -73.504659),
        "url": "http://www.teslamotors.com/supercharger/dariensouth",
        "count": false
    },
    //-----------------------------------------------------------------------------------------------------------------| Delaware
    {
        "displayName": "Newark, DE",
        "streetAddress": "530 JFK Memorial Highway, Newark, DE 19725",
        "country": "USA",
        "location": new google.maps.LatLng(39.662313, -75.691980),
        "url": "http://www.teslamotors.com/supercharger/newark",
        "count": true
    },
    //-----------------------------------------------------------------------------------------------------------------| Florida
    {
        "displayName": "Port Orange, FL",
        "streetAddress": "5302 S. Williamson Blvd, Port Orange, FL",
        "country": "USA",
        "location": new google.maps.LatLng(29.108566, -81.034569),
        "url": "http://www.teslamotors.com/supercharger/portorange",
        "count": true
    },
    {
        "displayName": "Port St. Lucie, FL",
        "streetAddress": "1773 N.W. St. Lucie W. Boulevard, Port St. Lucie, FL 34986",
        "country": "USA",
        "location": new google.maps.LatLng(27.313023, -80.406688),
        "url": "http://www.teslamotors.com/supercharger/portstlucie",
        "count": true
    },
    {
        "displayName": "Fort Myers, FL",
        "streetAddress": "9903 Gulf Coast Main Street Fort Myers, FL 33913",
        "country": "USA",
        "location": new google.maps.LatLng(26.485640, -81.787136),
        "url": "http://www.teslamotors.com/supercharger/fortmyers",
        "count": true
    },

    //-----------------------------------------------------------------------------------------------------------------| Illinois
    {
        "displayName": "Rockford, IL",
        "streetAddress": "7200 Harrison Ave, Rockford, Illinois 61112",
        "country": "USA",
        "location": new google.maps.LatLng(42.243896, -88.978877),
        "url": "http://www.teslamotors.com/supercharger/rockford",
        "count": true
    },
    {
        "displayName": "Normal, IL",
        "streetAddress": "Uptown Station Parking Deck, 11 Uptown Circle, Normal, IL 61761",
        "country": "USA",
        "location": new google.maps.LatLng(40.508497, -88.985575),
        "url": "http://www.teslamotors.com/supercharger/normal",
        "count": true
    },
    //-----------------------------------------------------------------------------------------------------------------| Texas
    {
        "displayName": "Columbus, TX",
        "streetAddress": "2535 Texas 71 Columbus, Texas 78934",
        "country": "USA",
        "location": new google.maps.LatLng(29.690062, -96.537725),
        "url": "http://www.teslamotors.com/supercharger/columbus",
        "count": true
    },
    {
        "displayName": "San Marcos, TX",
        "streetAddress": "3939 Interstate 35 San Marcos, TX 78666",
        "country": "USA",
        "location": new google.maps.LatLng(29.827692, -97.979677),
        "url": "http://www.teslamotors.com/supercharger/sanmarcos",
        "count": true
    },
    {
        "displayName": "Waco, TX",
        "streetAddress": "701 Interstate 35, Bellmead, TX 76705",
        "country": "USA",
        "location": new google.maps.LatLng(31.58224, -97.10915),
        "url": "http://www.teslamotors.com/supercharger/waco",
        "count": true
    },
    //-----------------------------------------------------------------------------------------------------------------| Oregon
    {
        "displayName": "Woodburn, OR",
        "streetAddress": "255 N Arney Rd Woodburn, Oregon 97071",
        "country": "USA",
        "location": new google.maps.LatLng(45.15313, -122.881254),
        "url": "http://www.teslamotors.com/supercharger/woodburn",
        "count": true
    },

    //-----------------------------------------------------------------------------------------------------------------| Washington
    {
        "displayName": "Burlington, WA",
        "streetAddress": "9384 Old Highway 99 North Burlington, WA 98233",
        "country": "USA",
        "location": new google.maps.LatLng(48.509772, -122.338625),
        "url": "http://www.teslamotors.com/supercharger/burlington",
        "count": true
    },
    {
        "displayName": "Centralia, WA",
        "streetAddress": "1200 Lum Rd Centralia, WA 98531",
        "country": "USA",
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
        "streetAddress": "P plass bak KIWI Mini Pris Dombås, Dombås 2660",
        "country": "Norway",
        "location": new google.maps.LatLng(62.074926, 9.128281),
        "url": "http://www.teslamotors.com/supercharger/dombas",
        "count": true
    },
    {
        "displayName": "Lillehammer, Norway",
        "streetAddress": "Korgvegen 37, 2619 Lillehammer, Norway",
        "country": "Norway",
        "location": new google.maps.LatLng(61.13045, 10.43491),
        "url": "http://www.teslamotors.com/supercharger/lillehammer",
        "count": true
    },
    {
        "displayName": "Gol, Norway",
        "streetAddress": "5 Heradvegen Gol, 3550",
        "country": "Norway",
        "location": new google.maps.LatLng(60.70232, 8.98620),
        "url": "http://www.teslamotors.com/supercharger/gol",
        "count": true
    },
    {
        "displayName": "Aurland, Norway",
        "streetAddress": "Nyheim Aurland, Aurland 5745",
        "country": "Norway",
        "location": new google.maps.LatLng(60.89863, 7.21082),
        "url": "http://www.teslamotors.com/supercharger/aurland",
        "count": true
    },
    {
        "displayName": "Cinderella, Norway",
        "streetAddress": "Gnr 3 Bnr 318 Brokelandsheia 4993 Sundebru, Norway",
        "country": "Norway",
        "location": new google.maps.LatLng(58.820783, 9.073746),
        "url": "http://www.teslamotors.com/supercharger/cinderella",
        "count": true
    },
    {
        "displayName": "Lyngdal, Norway",
        "streetAddress": "1 Fiboveien, Lyngdal 4580",
        "country": "Norway",
        "location": new google.maps.LatLng(58.15653, 7.10298),
        "url": "http://www.teslamotors.com/supercharger/lyngdal",
        "count": true
    }


];