//======================================================================================================================
//
//
//
//======================================================================================================================


/**
 * Constructor.
 */
redshiftsoft.MapView = function () {
    this.radiusMeters = redshiftsoft.MapView.milesToMeters(265);
};

/**
 * Constants
 */
redshiftsoft.MapView.METERS_PER_MILE = 1609.34;


/**
 * Status function to convert miles to meters.
 */
redshiftsoft.MapView.milesToMeters = function (miles) {
    return redshiftsoft.MapView.METERS_PER_MILE * miles;
};

/**
 * Initialize map
 */
redshiftsoft.MapView.prototype.initMap = function () {

    var mapOptions = {
        center: new google.maps.LatLng(38.0, -90.644),
        zoom: 5,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.googleMap = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    this.drawMarkers();
    this.drawCircles();
};

/**
 * Initialize map
 */
redshiftsoft.MapView.prototype.drawMarkers = function () {

    for (var i in superchargers) {

        var marker = new google.maps.Marker({
            position: superchargers[i].location,
            map: this.googleMap,
            title: superchargers[i].displayName
        });
        var infoWindow = new google.maps.InfoWindow({
            content: "<div id='content'>" + superchargers[i].streetAddress + "</div>"
        });
        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.open(this.googleMap, marker);
        });
    }

};

/**
 *
 */
redshiftsoft.MapView.prototype.drawCircles = function () {

    for (var i = 0; i < superchargers.length; i++) {
        var supercharger = superchargers[i];
        var rangeCircle = {
            strokeColor: '#F7F7F7',
            strokeOpacity: 1.0,
            strokeWeight: 2,
            fillColor: '#F7F7F7',
            fillOpacity: 0.15,
            map: this.googleMap,
            center: supercharger.location,
            radius: this.radiusMeters
        };
        if (supercharger.circle != null) {
            supercharger.circle.unbindAll();
            supercharger.circle.setMap(null);
        }
        supercharger.circle = new google.maps.Circle(rangeCircle);

    }
};


/**
 *
 */
redshiftsoft.MapView.prototype.setRadiusMiles = function (radiusMilesIn) {
    this.radiusMeters = redshiftsoft.MapView.milesToMeters(radiusMilesIn);
    this.drawCircles();
};