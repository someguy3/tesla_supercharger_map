//======================================================================================================================
// MapView
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

    this.superData = new redshiftsoft.SuperchargerData();

    this.initMap();

    // handle clicks to toggle supercharger circle
    jQuery(document).on('click', '.circle-toggle-trigger', jQuery.proxy(this.handleCircleToggle, this));

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

    for (var i = 0; i < this.superData.size(); i++) {
        var supercharger = this.superData.get(i);

        var marker = new google.maps.Marker({
            position: supercharger.location,
            map: this.googleMap,
            title: supercharger.displayName,
            animation: google.maps.Animation.DROP
        });
        marker['supercharger'] = supercharger;


        google.maps.event.addListener(marker, 'click', function () {
            var myMarker = this;
            var popupContent = "" +
                "<div class='info-window-content'>" +
                "<div class='title'>" + myMarker.supercharger.displayName + "</div>" + "" +
                myMarker.supercharger.address.street + "<br/>" +
                "<a target='_blank' href='" + myMarker.supercharger.url + "'>web page</a>" + "&nbsp;&nbsp;&nbsp;" +
                "<a class='circle-toggle-trigger' href='" + myMarker.supercharger.id + "'>circle off</a>" + "<br/>" +
                "</div>"

            var windowOptions = { content: popupContent  };
            var infoWindow = new google.maps.InfoWindow(windowOptions);
            infoWindow.open(myMarker.map, myMarker);
        });
    }

};

/**
 * CIRCLES
 */
redshiftsoft.MapView.prototype.drawCircles = function () {

    for (var i = 0; i < this.superData.size(); i++) {
        var supercharger = this.superData.get(i);
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

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Event handlers
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

redshiftsoft.MapView.prototype.handleCircleToggle = function (event) {
    event.preventDefault();
    var link = $(event.target);
    var id = link.attr('href');
    var supercharger = this.superData.get(id);
    if (supercharger.circle.getVisible()) {
        link.text("circle on");
        supercharger.circle.setVisible(false);
    } else {
        link.text("circle off");
        supercharger.circle.setVisible(true);
    }
};