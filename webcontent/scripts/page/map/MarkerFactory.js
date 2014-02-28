define(['page/map/InfoWindowRender', 'lib/jquery.browser'], function (InfoWindowRender, browser) {

    var MarkerFactory = {};

    /**
     * Creates a new marker for the given supercharger. Sets up click listener to display info-window when clicked.
     */
    MarkerFactory.createMarker = function (googleMap, supercharger) {
        var markerOptions = {
            position: supercharger.location,
            map: googleMap,
            title: supercharger.displayName,
            icon: {
                url: supercharger.status.iconUrl,
                anchor: supercharger.isConstruction() ? null : { x: 8, y: 8 }
            }
        };

        /**
         * The animation seems to crash Safari on iOS 7
         */
        if (!($.browser.iphone || $.browser.ipad)) {
            markerOptions.animation = google.maps.Animation.DROP;
        }

        var marker = new google.maps.Marker(markerOptions);

        google.maps.event.addListener(marker, 'click', function () {
            InfoWindowRender.showInfoWindowForMarker(marker, supercharger);
        });

        return marker;
    };

    return MarkerFactory;

});