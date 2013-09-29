//======================================================================================================================
//
//
//
//======================================================================================================================

redshiftsoft = createMyNamespace("redshiftsoft");

/**
 * Constructor.
 */
redshiftsoft.MapView = function (initialRangeMeters, initialFillOpacity, initialFillColor, initialBorderOpacity, initialBorderColor) {

    this.radiusMeters = initialRangeMeters;

    this.fillOpacity = initialFillOpacity;
    this.fillColor = initialFillColor;

    this.borderOpacity = initialBorderOpacity;
    this.borderColor = initialBorderColor;

};

/**
 * Constants
 */
redshiftsoft.MapView.INITIAL_LAT = 38.0;
redshiftsoft.MapView.INITIAL_LNG = -90.644;
redshiftsoft.MapView.INITIAL_ZOOM = 5;



/**
 * Initialize map
 */
redshiftsoft.MapView.prototype.initMap = function () {

    var mapOptions = {
        center: new google.maps.LatLng(redshiftsoft.MapView.INITIAL_LAT, redshiftsoft.MapView.INITIAL_LNG),
        zoom: redshiftsoft.MapView.INITIAL_ZOOM,
        mapTypeControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.googleMap = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    this.drawMarkers();
    this.drawCircles();
};

/**
 * MARKERS
 */
redshiftsoft.MapView.prototype.drawMarkers = function () {

    for (var i = 0; i < redshiftsoft.SUPER_CHARGER_LIST.length; i++) {
        var supercharger = redshiftsoft.SUPER_CHARGER_LIST[i];

        var marker = new google.maps.Marker({
            position: supercharger.location,
            map: this.googleMap,
            title: supercharger.displayName,
            animation: google.maps.Animation.DROP
        });
        marker['supercharger'] = supercharger;
        google.maps.event.addListener(marker, 'click', function () {
            var myMarker = this;
            var infoWindow = new google.maps.InfoWindow({
                content: "<div class='info-window-content'>" +
                    "<div class='title'>" + myMarker.supercharger.displayName + "</div>" + "" +
                    myMarker.supercharger.streetAddress + "<br/>" +
                    "<a target='_blank' href='" + myMarker.supercharger.url + "'>web page</a>" + "<br/>" +
                    "</div>"
            });
            infoWindow.open(myMarker.map, myMarker);
        });
    }

};

/**
 * CIRCLES
 */
redshiftsoft.MapView.prototype.drawCircles = function () {

    for (var i = 0; i < redshiftsoft.SUPER_CHARGER_LIST.length; i++) {
        var supercharger = redshiftsoft.SUPER_CHARGER_LIST[i];
        var rangeCircleOptions = {
            strokeColor: this.borderColor,
            strokeOpacity: this.borderOpacity,
            strokeWeight: 1,
            fillColor: this.fillColor,
            fillOpacity: this.fillOpacity,
            map: this.googleMap,
            center: supercharger.location,
            radius: this.radiusMeters
        };
        if (supercharger.circle == null) {
            supercharger.circle = new google.maps.Circle(rangeCircleOptions);
        }
        else {
            supercharger.circle.setOptions(rangeCircleOptions);
        }
    }
};


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// getters/setters
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
redshiftsoft.MapView.prototype.setFillColor = function (colorVal) {
    this.fillColor = colorVal;
};
redshiftsoft.MapView.prototype.setFillOpacity = function (newValue) {
    this.fillOpacity = newValue;
};


redshiftsoft.MapView.prototype.setBorderColor = function (colorVal) {
    this.borderColor = colorVal;
};
redshiftsoft.MapView.prototype.setBorderOpacity = function (newValue) {
    this.borderOpacity = newValue;
};
redshiftsoft.MapView.prototype.setRadiusMeters = function (radiusMetersIn) {
    this.radiusMeters = radiusMetersIn;
};