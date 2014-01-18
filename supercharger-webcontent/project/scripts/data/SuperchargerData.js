define(
    ['model/Address', 'util/Asserts', 'util/Objects', 'util/Dates'],
    function (Address, Asserts, Objects, Dates) {

    /**
     * Constructor
     */
    var SuperchargerData = function () {
        if (Objects.isNullOrUndefined(SuperchargerData.ID_INIT)) {
            this.initializeIds();
        }
    };

    SuperchargerData.prototype.initializeIds = function () {
        var count = 0;
        for (var i = 0; i < SuperchargerData.LIST.length; i++) {
            var supercharger = SuperchargerData.LIST[i];
            supercharger.id = count++;
        }
        SuperchargerData.ID_INIT = true;
    };

    SuperchargerData.prototype.size = function () {
        return SuperchargerData.LIST.length;
    };

    SuperchargerData.prototype.get = function (index) {
        return SuperchargerData.LIST[index];
    };

    SuperchargerData.prototype.getById = function (id) {
        Asserts.isInteger(id, "id must be an integer");
        for (var i = 0; i < SuperchargerData.LIST.length; i++) {
            var supercharger = SuperchargerData.LIST[i];
            if (supercharger.id === id) {
                return supercharger;
            }
        }
        return null;
    };

    SuperchargerData.prototype.removeById = function (id) {
        Asserts.isInteger(id, "id must be an integer");
        for (var index = 0; index < SuperchargerData.LIST.length; index++) {
            var supercharger = SuperchargerData.LIST[index];
            if (supercharger.id === id) {
                SuperchargerData.LIST.splice(index, 1);
                break;
            }
        }
    };

    SuperchargerData.prototype.addSupercharger = function (displayName, location) {
        var charger = {
            "id": this.size() + 10000,
            "displayName": displayName,
            "address": new Address("", "", "", "", ""),
            "location": location,
            "url": null,
            "count": false,
            "custom": true
        };
        SuperchargerData.LIST.push(charger);
        return charger;
    };


    /**
     * Properties:
     *
     * displayName  -- [String]
     * address      -- [Address]
     * location     -- [google.maps.LatLng]
     * url          -- [String] url for tesla web site
     * urlDiscuss   -- [String] url for discussion forum
     * dateOpened   -- [String] date opened
     * construction -- [Boolean] true indicates that this location is under construction
     * count        -- [Boolean]
     *
     * Other properties that are later added to the supercharger data structure:
     *
     * id           -- [Integer] uniquely identifies each record.
     * circle       -- [google.maps.Circle] a reference to the google-maps Circle object indicating range for this supercharger.
     * marker       -- [google.maps.Marker] a reference to the google-maps Marker object associated with this supercharger.
     * custom       -- [Boolean] true indicates that this is a custom marker added by the customer.
     *
     */
    SuperchargerData.LIST = [

        //-----------------------------------------------------------------------------------------------------------------| Arizona
        {
            "displayName": "Buckeye, AZ",
            "address": new Address("444 S Watson RD", "Buckeye", "AZ", "85326", "USA"),
            "location": new google.maps.LatLng(33.443242, -112.557378),
            "url": "http://www.teslamotorsclub.com/showthread.php/25317-Supercharger-Buckeye-AZ",
            "dateOpened": Dates.fromString(""),
            "construction": true,
            "count": true
        },
        {
            "displayName": "Flagstaff, AZ",
            "address": new Address("2650 S Beulah Blvd", "Flagstaff", "AZ", "86001", "USA"),
            "location": new google.maps.LatLng(35.174272, -111.66328),
            "url": "http://www.teslamotors.com/supercharger/flagstaff",
            "urlDiscuss": "http://www.teslamotorsclub.com/showthread.php/24922-Supercharger-Flagstaff-AZ",
            "dateOpened": Dates.fromString("2014-01-10"),
            "count": true
        },
//    {
//        "displayName": "Gila Bend,  AZ",
//        "address": new Address("820 W Pima St", "Gila Bend", "AZ", "85337", "USA"),
//        "location": new google.maps.LatLng(32.943852, -112.733536),
//        "url": "http://www.teslamotors.com/supercharger/gila",
//        "construction": true,
//        "count": true
//    },
        {
            "displayName": "Holbrook, AZ",
            "address": new Address("2096 Navajo Blvd", "Holbrook", "AZ", "86025", "USA"),
            "location": new google.maps.LatLng(34.922962, -110.145558),
            "url": "http://www.teslamotors.com/supercharger/holbrook",
            "urlDiscuss": "http://www.teslamotorsclub.com/showthread.php/25375-Supercharger-Holbrook-AZ",
            "dateOpened": Dates.fromString("2014-01-15"),
            "count": true
        },
        {
            "displayName": "Kingman, AZ",
            "address": new Address("789 West Beale Street", "Kingman", "AZ", "86401", "USA"),
            "location": new google.maps.LatLng(35.191706, -114.066081),
            "url": "http://www.teslamotorsclub.com/showthread.php/25072-Supercharger-Kingman-AZ",
            "construction": true,
            "dateOpened": Dates.fromString(""),
            "count": true
        },
        {
            "displayName": "Quartzsite, AZ",
            "address": new Address("1451 W Main St", "Quartzsite", "AZ", "85346", "USA"),
            "location": new google.maps.LatLng(33.661314, -114.242174),
            "url": "http://www.teslamotors.com/supercharger/quartzsite",
            "dateOpened": Dates.fromString("2013-11-14"),
            "count": true
        },
        //-----------------------------------------------------------------------------------------------------------------| California
        {
            "displayName": "Atascadero, CA",
            "address": new Address("6950 El Camino Real", "Atascadero", "CA", "93422", "USA"),
            "location": new google.maps.LatLng(35.48656, -120.66633),
            "url": "http://www.teslamotors.com/supercharger/atascadero",
            "dateOpened": Dates.fromString("2013-07-03"),
            "count": true
        },
        {
            "displayName": "Barstow, CA",
            "address": new Address("2812 Lenwood Rd", "Barstow", "CA", "92311", "USA"),
            "location": new google.maps.LatLng(34.849129, -117.085446),
            "url": "http://www.teslamotors.com/supercharger/barstow",
            "dateOpened": Dates.fromString("2012-11-19"),
            "count": true
        },
        {
            "displayName": "Buellton, CA",
            "address": new Address("555 McMurray RD", "Buellton", "CA", "93427", "USA"),
            "location": new google.maps.LatLng(34.614560, -120.188387),
            "url": "http://www.teslamotors.com/supercharger/buellton",
            "dateOpened": Dates.fromString("2012-07-03"),
            "count": true
        },
        {
            "displayName": "Corning, CA",
            "address": new Address("950 Hwy 99", "W Corning", "CA", "96021", "USA"),
            "location": new google.maps.LatLng(39.926454, -122.198393),
            "url": "http://www.teslamotors.com/supercharger/corning",
            "dateOpened": Dates.fromString("2013-10-18"),
            "count": true
        },
        {
            "displayName": "Folsom, CA",
            "address": new Address("13000 Folsom Blvd", "Folsom", "CA", "95630", "USA"),
            "location": new google.maps.LatLng(38.64258, -121.18806),
            "url": "http://www.teslamotors.com/supercharger/folsom",
            "dateOpened": Dates.fromString("2013-11-19"),
            "count": true
        },
        {
            "displayName": "Fremont, CA",
            "address": new Address("45500 Fremont Blvd", "Fremont", "CA", "94538", "USA"),
            "location": new google.maps.LatLng(37.493447, -121.945654),
            "url": "http://www.teslamotors.com/supercharger/fremont",
            "dateOpened": Dates.fromString("2013-08-16"),
            "count": true
        },
        {
            "displayName": "Gilroy, CA",
            "address": new Address("681 Leavesley Road", "Gilroy", "CA", "95020", "USA"),
            "location": new google.maps.LatLng(37.02493, -121.56542),
            "url": "http://www.teslamotors.com/supercharger/gilroy",
            "dateOpened": Dates.fromString("2012-11-19"),
            "count": true
        },
        {
            "displayName": "Harris Ranch, CA",
            "address": new Address("24505 W. Dorris Ave", "Coalinga", "CA", "93210", "USA"),
            "location": new google.maps.LatLng(36.254150, -120.237896),
            "url": "http://www.teslamotors.com/supercharger/harrisranch",
            "dateOpened": Dates.fromString("2012-11-19"),
            "count": true
        },
        {
            "displayName": "Hawthorne, CA",
            "address": new Address("1 Rocket Rd", "Hawthorne", "CA", "90250", "USA"),
            "location": new google.maps.LatLng(33.921068, -118.330054),
            "url": "http://www.teslamotors.com/supercharger/losangeles",
            "dateOpened": Dates.fromString("2012-11-19"),
            "count": true
        },
        {
            "displayName": "Mt Shasta, CA",
            "address": new Address("111 Morgan Way", "Mt. Shasta", "CA", "96067", "USA"),
            "location": new google.maps.LatLng(41.310233, -122.317278),
            "url": "http://www.teslamotors.com/supercharger/mtshasta",
            "dateOpened": Dates.fromString("2013-10-23"),
            "count": true
        },
        {
            "displayName": "Tejon Ranch, CA",
            "address": new Address("5602 Dennis McCarthy Dr", "Lebec", "CA", "93243", "USA"),
            "location": new google.maps.LatLng(34.98734, -118.94623),
            "url": "http://www.teslamotors.com/supercharger/tejonranch",
            "dateOpened": Dates.fromString("2012-11-19"),
            "count": true
        },
        {
            "displayName": "San Juan Capistrano, CA",
            "address": new Address("31971 Camino Capistrano", "San Juan Capistrano", "CA", "92675", "USA"),
            "location": new google.maps.LatLng(33.498458, -117.6632),
            "url": "http://www.teslamotors.com/forum/forums/san-juan-capistrano-supercharger?page=1",
            "construction": true,
            "dateOpened": Dates.fromString(""),
            "count": true
        },
        {
            "displayName": "Vacaville, CA",
            "address": new Address("321 Nut Tree RD", "Vacaville", "CA", "95687", "USA"),
            "location": new google.maps.LatLng(38.366645, -121.958136),
            "url": "http://www.teslamotors.com/supercharger/vacaville",
            "dateOpened": Dates.fromString("2013-12-19"),
            "count": true
        },

        //-----------------------------------------------------------------------------------------------------------------| Colorado
        {
            "displayName": "Glenwood Springs, CO",
            "address": new Address("125 Wulfsohn Rd", "Glenwood Springs", "CO", "81601", "USA"),
            "location": new google.maps.LatLng(39.552680, -107.340168),
            "url": "http://www.teslamotors.com/supercharger/glenwoodsprings",
            "dateOpened": Dates.fromString("2012-09-17"),
            "count": true
        },
        {
            "displayName": "Grand Junction, CO",
            "address": new Address("2420 U.S. 6", "Grand Junction", "CO", "81505", "USA"),
            "location": new google.maps.LatLng(39.090758, -108.604325),
            "url": "http://www.teslamotors.com/supercharger/grandjunction",
            "urlDiscuss": "http://www.teslamotorsclub.com/showthread.php/24867-Grand-Junction-CO-Supercharger",
            "dateOpened": Dates.fromString("2014-01-10"),
            "count": true
        },
        {
            "displayName": "Silverthorne, CO",
            "address": new Address("309 Rainbow Dr", "Silverthorne", "CO", "80498", "USA"),
            "location": new google.maps.LatLng(39.631457, -106.070816),
            "url": "http://www.teslamotors.com/supercharger/silverthorne",
            "dateOpened": Dates.fromString("2013-10-03"),
            "count": true
        },
        //-----------------------------------------------------------------------------------------------------------------| Connecticut
        {
            "displayName": "Milford, CT (north)",
            "address": new Address("1 CT Turnpike N", "Milford", "CT", "06460", "USA"),
            "location": new google.maps.LatLng(41.245814, -73.008988),
            "url": "http://www.teslamotors.com/supercharger/milfordnorth",
            "dateOpened": Dates.fromString("2012-12-16"),
            "count": true
        },
        {
            "displayName": "Milford, CT (south)",
            "address": new Address("1 CT Turnpike N", "Milford", "CT", "06460", "USA"),
            "location": new google.maps.LatLng(41.246232, -73.010529),
            "url": "http://www.teslamotors.com/supercharger/milfordsouth",
            "dateOpened": Dates.fromString("2012-12-16"),
            "count": false
        },
        {
            "displayName": "Darien, CT (north)",
            "address": new Address("Connecticut Welcome Center", "North Darien", "CT", "06820", "USA"),
            "location": new google.maps.LatLng(41.080599, -73.461905),
            "url": "http://www.teslamotors.com/supercharger/dariennorth",
            "dateOpened": Dates.fromString("2013-06-19"),
            "count": true
        },
        {
            "displayName": "Darien, CT (south)",
            "address": new Address("I-95 South after exit 10", "Darien", "CT", "06820", "USA"),
            "location": new google.maps.LatLng(41.068167, -73.504659),
            "url": "http://www.teslamotors.com/supercharger/dariensouth",
            "dateOpened": Dates.fromString("2013-06-19"),
            "count": false
        },
        {
            "displayName": "Greenwich, CT (north)",
            "address": new Address("Merritt Pkwy (near NY border)", "Greenwich", "CT", "06831", "USA"),
            "location": new google.maps.LatLng(41.0414, -73.6718333),
            "url": "http://www.teslamotors.com/supercharger/greenwich",
            "construction": true,
            "dateOpened": Dates.fromString(""),
            "count": true
        },
        {
            "displayName": "Greenwich, CT (south)",
            "address": new Address("Merritt Pkwy (near NY border)", "Greenwich", "CT", "06831", "USA"),
            "location": new google.maps.LatLng(41.0405333333, -73.6734166667),
            "url": "http://www.teslamotors.com/supercharger/greenwich",
            "construction": true,
            "dateOpened": Dates.fromString(""),
            "count": false
        },
        //-----------------------------------------------------------------------------------------------------------------| Delaware
        {
            "displayName": "Newark, DE",
            "address": new Address("530 JFK Memorial Highway", "Newark", "DE", "19725", "USA"),
            "location": new google.maps.LatLng(39.662313, -75.691980),
            "url": "http://www.teslamotors.com/supercharger/newark",
            "dateOpened": Dates.fromString("2012-12-21"),
            "count": true
        },
        //-----------------------------------------------------------------------------------------------------------------| Florida
        {
            "displayName": "Fort Myers, FL",
            "address": new Address("9903 Gulf Coast Main Street", "Fort Myers", "FL", "33913", "USA"),
            "location": new google.maps.LatLng(26.485640, -81.787136),
            "url": "http://www.teslamotors.com/supercharger/fortmyers",
            "dateOpened": Dates.fromString("2013-07-25"),
            "count": true
        },
        {
            "displayName": "Port Orange, FL",
            "address": new Address("5302 S. Williamson Blvd", "Port Orange", "FL", "32128", "USA"),
            "location": new google.maps.LatLng(29.108566, -81.034569),
            "url": "http://www.teslamotors.com/supercharger/portorange",
            "dateOpened": Dates.fromString("2013-09-13"),
            "count": true
        },
        {
            "displayName": "Port St. Lucie, FL",
            "address": new Address("1773 N.W. St. Lucie W. Boulevard", "Port St. Lucie", "FL", "34986", "USA"),
            "location": new google.maps.LatLng(27.313023, -80.406688),
            "url": "http://www.teslamotors.com/supercharger/portstlucie",
            "dateOpened": Dates.fromString("2013-07-24"),
            "count": true
        },
        {
            "displayName": "St Augustine, FL",
            "address": new Address("2700 State Road 16, Suite 200", "St. Augustine", "FL", "32092", "USA"),
            "location": new google.maps.LatLng(29.9207352, -81.416337),
            "url": "http://www.teslamotorsclub.com/showthread.php/25177-St-Augustine-Supercharger",
            "dateOpened": Dates.fromString("2014-01-03"),
            "count": true
        },

        //-----------------------------------------------------------------------------------------------------------------| Georgia
        {
            "displayName": "Savannah, GA",
            "address": new Address("400 Airways Avenue", "Savannah", "GA", "31408", "USA"),
            "location": new google.maps.LatLng(32.135507, -81.212767),
            "url": "http://www.teslamotors.com/supercharger/savannah",
            "urlDiscuss": "http://www.teslamotorsclub.com/showthread.php/22256-Savannah-GA-SuperCharger",
            "dateOpened": Dates.fromString("2014-01-15"),
            "count": true
        },
        //-----------------------------------------------------------------------------------------------------------------| Illinois
        {
            "displayName": "Highland Park, IL Service Center",
            "address": new Address("1200 Old Skokie Road", "Highland Park", "IL", "60035", "USA"),
            "location": new google.maps.LatLng(42.17434, -87.816626),
            "url": "http://www.teslamotors.com/supercharger/highlandpark",
            "dateOpened": Dates.fromString("2013-12-20"),
            "count": true
        },
        {
            "displayName": "Rockford, IL",
            "address": new Address("7200 Harrison Ave", "Rockford", "IL", "61112", "USA"),
            "location": new google.maps.LatLng(42.243896, -88.978877),
            "url": "http://www.teslamotors.com/supercharger/rockford",
            "dateOpened": Dates.fromString("2013-09-12"),
            "count": true
        },
        {
            "displayName": "Normal, IL",
            "address": new Address("Uptown Station Parking Deck 11 Uptown Circle", "Normal", "IL", "61761", "USA"),
            "location": new google.maps.LatLng(40.508497, -88.985575),
            "url": "http://www.teslamotors.com/supercharger/normal",
            "dateOpened": Dates.fromString("2013-06-26"),
            "count": true
        },
        //-----------------------------------------------------------------------------------------------------------------| Indiana
        {
            "displayName": "Angola, IN",
            "address": new Address("3855 Indiana Rte 127", "Angola", "IN", "46703", "USA"),
            "location": new google.maps.LatLng(41.699048, -85.000326),
            "url": "http://www.teslamotors.com/supercharger/angola",
            "dateOpened": Dates.fromString("2013-12-09"),
            "count": true
        },
        {
            "displayName": "Mishawaka, IN",
            "address": new Address("6501 Grape Rd", "Mishawaka", "IN", "46545", "USA"),
            "location": new google.maps.LatLng(41.7174, -86.1887),
            "url": "http://www.teslamotors.com/supercharger/mishawaka",
            "dateOpened": Dates.fromString("2013-12-11"),
            "count": true
        },
        //-----------------------------------------------------------------------------------------------------------------| Maryland
        {
            "displayName": "Hagerstown, MD",
            "address": new Address("495 Premium Outlets Blvd", "Hagerstown", "MD", "21740", "USA"),
            "location": new google.maps.LatLng(39.609247, -77.732129),
            "url": "http://www.teslamotorsclub.com/showthread.php/25085-Maryland-Superchargers?p=523453#post523453",
            "dateOpened": Dates.fromString(""),
            "construction": true,
            "count": true
        },
        //-----------------------------------------------------------------------------------------------------------------| Minnesota
        {
            "displayName": "Albert Lea, MN",
            "address": new Address("811 East Plaza St", "Albert Lea", "MN", "56007", "USA"),
            "location": new google.maps.LatLng(43.68606, -93.357721),
            "url": "http://www.teslamotors.com/supercharger/albertlea",
            "urlDiscuss": "http://www.teslamotorsclub.com/showthread.php/25097-Minnesota-Supercharging-Discussion-amp-Tracking",
            "dateOpened": Dates.fromString("2014-01-15"),
            "count": true
        },
        {
            "displayName": "Worthington, MN",
            "address": new Address("1290 Ryan's Rd", "Worthington", "MN", "56187", "USA"),
            "location": new google.maps.LatLng(43.63385, -95.595647),
            "url": "http://www.teslamotors.com/supercharger/worthington",
            "dateOpened": Dates.fromString("2013-12-11"),
            "count": true
        },
        //-----------------------------------------------------------------------------------------------------------------| Michigan
        {
            "displayName": "St. Joseph, MI",
            "address": new Address("3260 Niles Rd", "St. Joseph", "MI", "49085", "USA"),
            "location": new google.maps.LatLng(42.056357, -86.456352),
            "url": "http://www.teslamotors.com/supercharger/stjoseph",
            "dateOpened": Dates.fromString("2013-11-26"),
            "count": true
        },
        //-----------------------------------------------------------------------------------------------------------------| New Mexico
        {
            "displayName": "Farmington, NM",
            "address": new Address("4200 Sierra Vista Dr", "Farmington", "NM", "87402", "USA"),
            "location": new google.maps.LatLng(36.766371, -108.144047),
            "url": "http://www.teslamotors.com/supercharger/farmington",
            "dateOpened": Dates.fromString("2014-01-10"),
            "count": true
        },
        {
            "displayName": "Gallup, NM",
            "address": new Address("111 Twin Buttes Rd", "Gallup", "NM", "87301", "USA"),
            "location": new google.maps.LatLng(35.505278, -108.828094),
            "url": "http://www.teslamotors.com/supercharger/gallup",
            "dateOpened": Dates.fromString("2014-01-07"),
            "count": true
        },
        //-----------------------------------------------------------------------------------------------------------------| Nevada
        {
            "displayName": "Las Vegas, NV",
            "address": new Address("701 Bridger Ave", "Las Vegas", "NV", "89101", "USA"),
            "location": new google.maps.LatLng(36.1657833333, -115.1393166667),
            "url": "http://www.teslamotorsclub.com/showthread.php/24924-Supercharger-Las-Vegas-NV",
            "dateOpened": Dates.fromString(""),
            "construction": true,
            "count": true
        },
        //-----------------------------------------------------------------------------------------------------------------| New York
        {
            "displayName": "JFK Airport, NY",
            "address": new Address("150th Ave and 147th St", "Queens", "NY", "11430", "USA"),
            "location": new google.maps.LatLng(40.66319, -73.793192),
            "url": "http://www.teslamotors.com/supercharger/jfk",
            "dateOpened": Dates.fromString("2013-12-23"),
            "count": true
        },
        {
            "displayName": "Syosset, NY",
            "address": new Address("7 Aeriel Way", "Syosset", "NY", "11791", "USA"),
            "location": new google.maps.LatLng(40.797762, -73.515435),
            "url": "http://www.teslamotorsclub.com/showthread.php/26175-Supercharger-Syosset-NY",
            "dateOpened": Dates.fromString(""),
            "construction": true,
            "count": true
        },
        //-----------------------------------------------------------------------------------------------------------------| North Carolina
        {
            "displayName": "Burlington, NC",
            "address": new Address("1080 Piper Ln", "Burlington", "NC", "27215", "USA"),
            "location": new google.maps.LatLng(36.070790, -79.511211),
            "url": "http://www.teslamotors.com/supercharger/burlingtonnc",
            "dateOpened": Dates.fromString("2013-10-16"),
            "count": true
        },
        {
            "displayName": "Lumberton, NC",
            "address": new Address("5093 Fayetteville Road", "Lumberton", "NC", "28358", "USA"),
            "location": new google.maps.LatLng(34.667629, -79.002343),
            "url": "http://www.teslamotors.com/supercharger/lumberton",
            "urlDiscuss": "http://www.teslamotorsclub.com/showthread.php/24770-Supercharger-Lumberton-NC",
            "dateOpened": Dates.fromString("2014-01-17"),
            "count": true
        },
        {
            "displayName": "Rocky Mount, NC",
            "address": new Address("651 N. Winstead Avenue", "Rocky Mount", "NC", "27804", "USA"),
            "location": new google.maps.LatLng(35.972874, -77.846870),
            "url": "http://www.teslamotors.com/supercharger/rockymount",
            "dateOpened": Dates.fromString("2013-11-08"),
            "count": true
        },
        //-----------------------------------------------------------------------------------------------------------------| Ohio
        {
            "displayName": "Macedonia, OH",
            "address": new Address("8210 Macedonia Commons Blvd", "Macedonia", "OH", "44056", "USA"),
            "location": new google.maps.LatLng(41.313663, -81.517018),
            "url": "http://www.teslamotors.com/supercharger/macedonia",
            "dateOpened": Dates.fromString("2014-01-15"),
            "count": true
        },
        {
            "displayName": "Maumee, OH",
            "address": new Address("1391 Conant Street", "Maumee", "OH", "43537", "USA"),
            "location": new google.maps.LatLng(41.57835, -83.66465),
            "url": "http://www.teslamotors.com/supercharger/maumee",
            "urlDiscuss": "http://www.teslamotorsclub.com/showthread.php/25482-Supercharger-Maumee-OH",
            "dateOpened": Dates.fromString("2014-01-13"),
            "count": true
        },
        //-----------------------------------------------------------------------------------------------------------------| Oregon
        {
            "displayName": "Detroit Lake, OR",
            "address": new Address("210 D Street", "Detroit", "OR", "97342", "USA"),
            "location": new google.maps.LatLng(44.737025, -122.152108),
            "url": "http://www.teslamotors.com/supercharger/detroitlake",
            "dateOpened": Dates.fromString("2013-12-23"),
            "count": true
        },
        {
            "displayName": "Grants Pass, OR",
            "address": new Address("1900 NW 6th St.", "Grants Pass", "OR", "97526", "USA"),
            "location": new google.maps.LatLng(42.460883, -123.324124),
            "url": "http://www.teslamotors.com/supercharger/grantspass",
            "dateOpened": Dates.fromString("2013-10-22"),
            "count": true
        },
        {
            "displayName": "Springfield, OR",
            "address": new Address("919 Kruse Way", "Springfield", "OR", "97477", "USA"),
            "location": new google.maps.LatLng(44.082605, -123.037471),
            "url": "http://www.teslamotors.com/supercharger/springfield",
            "dateOpened": Dates.fromString("2013-11-02"),
            "count": true
        },
        {
            "displayName": "Woodburn, OR",
            "address": new Address("255 N Arney Rd", "Woodburn", "OR", "97071", "USA"),
            "location": new google.maps.LatLng(45.15313, -122.881254),
            "url": "http://www.teslamotors.com/supercharger/woodburn",
            "dateOpened": Dates.fromString("2013-08-28"),
            "count": true
        },
        //-----------------------------------------------------------------------------------------------------------------| Pennsylvania
        {
            "displayName": "Cranberry, PA",
            "address": new Address("1308 Freedom Rd", "Cranberry", "PA", "16066", "USA"),
            "location": new google.maps.LatLng(40.683982, -80.10839),
            "url": "http://www.teslamotorsclub.com/showthread.php/25840-Cranberry-PA-Supercharger-Location-(NW-of-Pittsburgh)",
            "construction": true,
            "count": true
        },
        {
            "displayName": "Somerset, PA",
            "address": new Address("1030 North Center Avenue", "Somerset", "PA", "15501", "USA"),
            "location": new google.maps.LatLng(40.0173833333, -79.0771166667),
            "url": "http://www.teslamotors.com/supercharger/somerset",
            "urlDiscuss": "http://www.teslamotorsclub.com/showthread.php/25319-Somerset-PA-Supercharger-(confirmed!)",
            "dateOpened": Dates.fromString("2014-01-10"),
            "count": true
        },
        //-----------------------------------------------------------------------------------------------------------------| Rhode Island
        {
            "displayName": "East Greenwich, RI",
            "address": new Address("1000 Division St", "East Greenwich", "RI", "02818", "USA"),
            "location": new google.maps.LatLng(41.660517, -71.497242),
            "url": "http://www.teslamotors.com/supercharger/eastgreenwich",
            "dateOpened": Dates.fromString("2014-01-06"),
            "count": true
        },
        //-----------------------------------------------------------------------------------------------------------------| South Carolina
        {
            "displayName": "Santee, SC",
            "address": new Address("114 Bradford Blvd.", "Santee", "SC", "29142", "USA"),
            "location": new google.maps.LatLng(33.485858, -80.475763),
            "url": "http://www.teslamotors.com/supercharger/santee",
            "dateOpened": Dates.fromString("2013-12-27"),
            "count": true
        },
        //-----------------------------------------------------------------------------------------------------------------| South Dakota
        {
            "displayName": "Mitchell, SD",
            "address": new Address("1305 W. Havens Street", "Mitchell", "SD", "57301", "USA"),
            "location": new google.maps.LatLng(43.701129, -98.04449999999997),
            "url": "http://www.teslamotors.com/supercharger/mitchell",
            "dateOpened": Dates.fromString("2013-12-18"),
            "count": true
        },
        {
            "displayName": "Murdo, SD",
            "address": new Address("302 W 5th St", "Murdo", "SD", "57559", "USA"),
            "location": new google.maps.LatLng(43.886915, -100.716887),
            "url": "http://www.teslamotors.com/supercharger/murdo",
            "dateOpened": Dates.fromString("2013-12-31"),
            "count": true
        },
        {
            "displayName": "Rapid City, SD",
            "address": new Address("2200 N. Maple Ave", "Rapid City", "SD", "57701", "USA"),
            "location": new google.maps.LatLng(44.105601, -103.212569),
            "url": "http://www.teslamotors.com/supercharger/rapidcity",
            "dateOpened": Dates.fromString("2013-11-25"),
            "count": true
        },
        //-----------------------------------------------------------------------------------------------------------------| Texas
        {
            "displayName": "Columbus, TX",
            "address": new Address("2535 Texas 71", "Columbus", "TX", "78934", "USA"),
            "location": new google.maps.LatLng(29.690062, -96.537725),
            "url": "http://www.teslamotors.com/supercharger/columbus",
            "dateOpened": Dates.fromString("2013-10-07"),
            "count": true
        },
        {
            "displayName": "Corsicana, TX",
            "address": new Address("2035 Interstate 45 Frontage Rd", "Corsicana", "TX", "75109", "USA"),
            "location": new google.maps.LatLng(32.068577, -96.448229),
            "url": "http://www.teslamotors.com/supercharger/corsicana",
            "dateOpened": Dates.fromString("2013-11-15"),
            "count": true
        },
        {
            "displayName": "Huntsville, TX",
            "address": new Address("148 Interstate 45", "Huntsville", "TX", "77340", "USA"),
            "location": new google.maps.LatLng(30.716158, -95.565944),
            "url": "http://www.teslamotors.com/supercharger/huntsville",
            "dateOpened": Dates.fromString("2013-11-20"),
            "count": true
        },
        {
            "displayName": "San Marcos, TX",
            "address": new Address("3939 Interstate 35", "San Marcos", "TX", "78666", "USA"),
            "location": new google.maps.LatLng(29.827692, -97.979677),
            "url": "http://www.teslamotors.com/supercharger/sanmarcos",
            "dateOpened": Dates.fromString("2013-08-20"),
            "count": true
        },
        {
            "displayName": "Waco, TX",
            "address": new Address("701 Interstate 35", "Bellmead", "TX", "76705", "USA"),
            "location": new google.maps.LatLng(31.58224, -97.10915),
            "url": "http://www.teslamotors.com/supercharger/waco",
            "dateOpened": Dates.fromString("2013-09-07"),
            "count": true
        },
        //-----------------------------------------------------------------------------------------------------------------| Utah
        {
            "displayName": "Blanding, UT",
            "address": new Address("12 N Grayson Pkwy", "Blanding", "UT", "84511", "USA"),
            "location": new google.maps.LatLng(37.6255534, -109.47384199999999),
            "url": "http://www.teslamotors.com/supercharger/blanding",
            "urlDiscuss": "http://www.teslamotorsclub.com/showthread.php/21121-Utah-Super-Charger-Locations",
            "dateOpened": Dates.fromString("2014-01-13"),
            "count": true
        },
        {
            "displayName": "Moab, UT",
            "address": new Address("16 South Main St.", "Moab", "UT", "84511", "USA"),
            "location": new google.maps.LatLng(38.5731167, -109.55245),
            "url": "http://www.teslamotorsclub.com/showthread.php/8590-Tesla-Supercharger-network/page287?p=532503&viewfull=1#post532503",
            "construction": true,
            "dateOpened": Dates.fromString(""),
            "count": true
        },
        //-----------------------------------------------------------------------------------------------------------------| Virginia
        {
            "displayName": "Glen Allen, VA",
            "address": new Address("9860 Brook Rd", "Glen Allen", "VA", "23059", "USA"),
            "location": new google.maps.LatLng(37.669832, -77.461419),
            "url": "http://www.teslamotors.com/supercharger/glenallen",
            "dateOpened": Dates.fromString("2013-10-24"),
            "count": true
        },
        //-----------------------------------------------------------------------------------------------------------------| Washington
        {
            "displayName": "Burlington, WA",
            "address": new Address("9384 Old Highway 99", "North Burlington", "WA", "98233", "USA"),
            "location": new google.maps.LatLng(48.509772, -122.338625),
            "url": "http://www.teslamotors.com/supercharger/burlington",
            "dateOpened": Dates.fromString("2013-07-13"),
            "count": true
        },
        {
            "displayName": "Centralia, WA",
            "address": new Address("1200 Lum Rd", "Centralia", "WA", "98531", "USA"),
            "location": new google.maps.LatLng(46.729732, -122.977454),
            "url": "http://www.teslamotors.com/supercharger/centralia",
            "dateOpened": Dates.fromString("2013-07-17"),
            "count": true
        },
        {
            "displayName": "Ellensburg, WA",
            "address": new Address("1620 Canyon Rd", "Ellensburg", "WA", "98926", "USA"),
            "location": new google.maps.LatLng(46.976918, -120.54162),
            "url": "http://www.teslamotors.com/supercharger/ellensburg",
            "dateOpened": Dates.fromString("2013-12-23"),
            "count": true
        },
        //-----------------------------------------------------------------------------------------------------------------| Wisconsin
        {
            "displayName": "Eau Claire, WI",
            "address": new Address("4639 Keystone Crossing", "Eau Claire", "WI", "54701", "USA"),
            "location": new google.maps.LatLng(44.7709, -91.4370833333),
            "url": "http://www.teslamotorsclub.com/showthread.php/24337-Wisconsin-Supercharger-Discussion-amp-Tracking/page31",
            "construction": true,
            "dateOpened": Dates.fromString(""),
            "count": true
        },
        {
            "displayName": "La Crosse, WI",
            "address": new Address("2845 Midwest Dr", "Onalaska", "WI", "54650", "USA"),
            "location": new google.maps.LatLng(43.879042, -91.188428),
            "url": "http://www.teslamotors.com/supercharger/lacrosse",
            "dateOpened": Dates.fromString("2014-01-05"),
            "count": true
        },
        {
            "displayName": "Madison, WI",
            "address": new Address("89 E Towne Mall", "Madison", "WI", "53704", "USA"),
            "location": new google.maps.LatLng(43.12669, -89.306896),
            "url": "http://www.teslamotors.com/supercharger/madison",
            "urlDiscuss": "http://www.teslamotorsclub.com/showthread.php/21123-Madison-WI-Supercharger",
            "dateOpened": Dates.fromString("2014-01-13"),
            "count": true
        },
        {
            "displayName": "Mauston, WI",
            "address": new Address("640 Mc Evoy St", "Mauston", "WI", "53948", "USA"),
            "location": new google.maps.LatLng(43.795551, -90.059358),
            "url": "http://www.teslamotors.com/supercharger/mauston",
            "dateOpened": Dates.fromString("2013-12-09"),
            "count": true
        },
        {
            "displayName": "Pleasant Prairie, WI",
            "address": new Address("11211 120th Avenue", "Pleasant Prairie", "WI", "53158", "USA"),
            "location": new google.maps.LatLng(42.5187, -87.9504666667),
            "url": "http://www.teslamotors.com/forum/forums/supercharger-locations-existingplanned-confirmed-not-rumored-or-speculated%E2%80%A6?page=50",
            "construction": true,
            "dateOpened": Dates.fromString(""),
            "count": true
        },
        //-----------------------------------------------------------------------------------------------------------------| Wyoming
        {
            "displayName": "Cheyenne, WY",
            "address": new Address("1400 Dell Range Blvd", "Cheyenne", "WY", "82009", "USA"),
            "location": new google.maps.LatLng(41.1610333333, -104.8050833333),
            "url": "http://www.teslamotors.com/supercharger/cheyenne",
            "construction": true,
            "dateOpened": Dates.fromString(""),
            "count": true
        },
        {
            "displayName": "Lusk, WY",
            "address": new Address("730 S. Main St", "Lusk", "WY", "82225", "USA"),
            "location": new google.maps.LatLng(42.75625, -104.45267),
            "url": "http://www.teslamotors.com/supercharger/lusk",
            "dateOpened": Dates.fromString("2013-12-19"),
            "count": true
        },

        //##################################################################################################################
        //##################################################################################################################
        //###
        //### Europe
        //###
        //##################################################################################################################
        //##################################################################################################################

        //-----------------------------------------------------------------------------------------------------------------| GERMANY
        {
            "displayName": "St. Anton, Austria",
            "address": new Address("73 Arlbergstrasse", "St. Anton am Arlberg", "", "6580", "Austria"),
            "location": new google.maps.LatLng(47.130137, 10.269231),
            "url": "http://www.teslamotors.com/supercharger/stanton",
            "dateOpened": Dates.fromString("2013-12-19"),
            "count": true
        },
        //-----------------------------------------------------------------------------------------------------------------| GERMANY
        {
            "displayName": "Aichstetten, Germany",
            "address": new Address("Am Waizenhof 12 (Autohof)", "Aichstetten", "", "88317", "Germany"),
            "location": new google.maps.LatLng(47.8804833333, 10.0397833333),
            "url": "http://www.teslamotors.com/supercharger/aichstetten",
            "dateOpened": Dates.fromString("2013-12-14"),
            "count": true
        },
        {
            "displayName": "Bad Rappenau, Germany",
            "address": new Address("Buchäckerring 40 (Autohof)", "Bad Rappenau", "", "74906", "Germany"),
            "location": new google.maps.LatLng(49.211936, 9.077322),
            "url": "http://www.teslamotors.com/supercharger/badrappenau",
            "dateOpened": Dates.fromString("2013-12-14"),
            "count": true
        },
        {
            "displayName": "Jettingen-Scheppach, Germany",
            "address": new Address("Robert-Bosch-Str. 10 (Autohof)", "Jettingen-Scheppach", "", "89343", "Germany"),
            "location": new google.maps.LatLng(48.411685, 10.439755),
            "url": "http://www.teslamotors.com/supercharger/jettingen",
            "dateOpened": Dates.fromString("2013-12-13"),
            "count": true
        },
        {
            "displayName": "Wilnsdorf, Germany",
            "address": new Address("Elkersberg 2 (Autohof)", "Wilnsdorf", "", "57234", "Germany"),
            "location": new google.maps.LatLng(50.817046, 8.087663),
            "url": "http://www.teslamotors.com/supercharger/wilnsdorf",
            "dateOpened": Dates.fromString("2013-12-13"),
            "count": true
        },

        //-----------------------------------------------------------------------------------------------------------------| NETHERLANDS
        {
            "displayName": "Oosterhout, Netherlands",
            "address": new Address("Beneluxweg 1", "Oosterhout", "", "4904 SJ", "Netherlands"),
            "location": new google.maps.LatLng(51.626423, 4.869517),
            "url": "http://www.teslamotors.com/supercharger/oosterhout",
            "dateOpened": Dates.fromString("2013-12-06"),
            "count": true
        },
        {
            "displayName": "Zevenaar, Netherlands",
            "address": new Address("Doesburgseweg 39", "Zevenaar", "", "6902 PL", "Netherlands"),
            "location": new google.maps.LatLng(51.94066, 6.08180),
            "url": "http://www.teslamotors.com/supercharger/zevenaar",
            "dateOpened": Dates.fromString("2013-12-06"),
            "count": true
        },
        //-----------------------------------------------------------------------------------------------------------------| NORWAY

        {
            "displayName": "Dombås, Norway",
            "address": new Address("P plass bak KIWI Mini Pris", "Dombås", "", "2660", "Norway"),
            "location": new google.maps.LatLng(62.074926, 9.128281),
            "url": "http://www.teslamotors.com/supercharger/dombas",
            "dateOpened": Dates.fromString("2013-09-28"),
            "count": true
        },
        {
            "displayName": "Lillehammer, Norway",
            "address": new Address("Korgvegen 37", "Lillehammer", "", "2619", "Norway"),
            "location": new google.maps.LatLng(61.13045, 10.43491),
            "url": "http://www.teslamotors.com/supercharger/lillehammer",
            "dateOpened": Dates.fromString("2013-09-28"),
            "count": true
        },
        {
            "displayName": "Gol, Norway",
            "address": new Address("Heradvegen 5", "Gol", "", "3550", "Norway"),
            "location": new google.maps.LatLng(60.70232, 8.98620),
            "url": "http://www.teslamotors.com/supercharger/gol",
            "dateOpened": Dates.fromString("2013-09-28"),
            "count": true
        },
        {
            "displayName": "Aurland, Norway",
            "address": new Address("Nyheim Aurland", "Aurland", "", "5745", "Norway"),
            "location": new google.maps.LatLng(60.89863, 7.21082),
            "url": "http://www.teslamotors.com/supercharger/aurland",
            "dateOpened": Dates.fromString("2013-09-28"),
            "count": true
        },
        {
            "displayName": "Cinderella, Norway",
            "address": new Address("Gnr 3 Bnr 318 Brokelandsheia", "Sundebru", "", "4993", "Norway"),
            "location": new google.maps.LatLng(58.820783, 9.073746),
            "url": "http://www.teslamotors.com/supercharger/cinderella",
            "dateOpened": Dates.fromString("2013-09-28"),
            "count": true
        },
        {
            "displayName": "Lyngdal, Norway",
            "address": new Address("1 Fiboveien", "Lyngdal", "", "4580", "Norway"),
            "location": new google.maps.LatLng(58.15653, 7.10298),
            "url": "http://www.teslamotors.com/supercharger/lyngdal",
            "dateOpened": Dates.fromString("2013-09-28"),
            "count": true
        },
        //-----------------------------------------------------------------------------------------------------------------| SWITZERLAND
        {
            "displayName": "Lully, Switzerland",
            "address": new Address("Restoroute 1470 Lully FR (Autogrill)", "Lully", "", "1470", "Switzerland"),
            "location": new google.maps.LatLng(46.832233, 6.859269),
            "url": "http://www.teslamotors.com/supercharger/lully",
            "dateOpened": Dates.fromString("2013-12-13"),
            "count": true
        }

    ];

    return SuperchargerData;
});