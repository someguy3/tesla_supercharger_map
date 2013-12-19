var redshiftsoft = redshiftsoft || {};

/**
 * Constructor.
 */
redshiftsoft.MapView = function (controlState) {

    this.controlState = controlState;

    this.superData = new redshiftsoft.SuperchargerData();

    //
    // Routing stuff
    //
    this.directionsService = new google.maps.DirectionsService();
    this.routeList = [];

    this.initMap();


    // handle clicks to toggle supercharger circle
    jQuery(document).on('click', '.circle-toggle-trigger', jQuery.proxy(this.handleCircleToggle, this));
    // handle clicks to remove supercharger marker
    jQuery(document).on('click', '.marker-toggle-trigger', jQuery.proxy(this.handleMarkerRemove, this));
    // handle clicks to remove supercharger marker
    jQuery(document).on('click', '.add-to-route-trigger', jQuery.proxy(this.handleAddToRoute, this));

    //
    // Map context menu
    //
    this.contextMenu = new redshiftsoft.MapViewContextMenu(this.googleMap);
    this.contextMenu.on("context-menu-add-marker", jQuery.proxy(this.handleAddMarker, this));
    this.contextMenu.on("context-menu-add-to-route", jQuery.proxy(this.handleAddRouteEvent, this));

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
    this.redraw(true);
};

/**
 *  DRAW MAKERS/CIRCLES
 */
redshiftsoft.MapView.prototype.redraw = function (drawMarkers) {

    var rangeCircleOptions = this.buildRangeCircleOptions();

    for (var i = 0; i < this.superData.size(); i++) {
        var supercharger = this.superData.get(i);

        if (this.shouldDraw(supercharger)) {
            if (drawMarkers) {
                if (supercharger.marker == null) {
                    redshiftsoft.MapView.addMarkerToSupercharger(this.googleMap, supercharger);
                }
            }

            rangeCircleOptions.center = supercharger.location;
            if (supercharger.circle == null) {
                supercharger.circle = new google.maps.Circle(rangeCircleOptions);
            }
            else {
                supercharger.circle.setOptions(rangeCircleOptions);
            }

        } else {
            if (supercharger.circle != null) {
                supercharger.circle.setMap(null);
                supercharger.circle = null;
            }
            if (supercharger.marker != null) {
                supercharger.marker.setMap(null);
                supercharger.marker = null;
            }
        }

    }
};

redshiftsoft.MapView.prototype.shouldDraw = function (supercharger) {
    return (supercharger.construction && this.controlState.showConstruction) ||
        (!supercharger.construction && this.controlState.showCompleted);
};

redshiftsoft.MapView.prototype.buildRangeCircleOptions = function () {
    return {
        strokeColor: this.controlState.borderColor,
        strokeOpacity: this.controlState.borderOpacity,
        strokeWeight: 1,
        fillColor: this.controlState.fillColor,
        fillOpacity: this.controlState.fillOpacity,
        map: this.googleMap,
        radius: this.controlState.range.getRangeMeters(),
        clickable: false
    };
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// getters/setters
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

redshiftsoft.MapView.prototype.setControlState = function (controlState) {
    this.controlState = controlState;
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// InfoWindow Event handlers
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

redshiftsoft.MapView.prototype.handleCircleToggle = function (event) {
    event.preventDefault();
    var link = $(event.target);
    var id = link.attr('href');
    var supercharger = this.superData.getById(id);
    if (supercharger.circle.getVisible()) {
        link.text("circle on");
        supercharger.circle.setVisible(false);
    } else {
        link.text("circle off");
        supercharger.circle.setVisible(true);
    }
};

redshiftsoft.MapView.prototype.handleMarkerRemove = function (event) {
    event.preventDefault();
    var link = $(event.target);
    var id = link.attr('href');
    var supercharger = this.superData.getById(id);
    supercharger.circle.setMap(null);
    supercharger.marker.setMap(null);
    this.superData.removeById(id);
};

redshiftsoft.MapView.prototype.handleAddToRoute = function (event) {
    event.preventDefault();
    var link = $(event.target);
    var id = link.attr('href');
    var supercharger = this.superData.getById(id);
    this.handleAddRoute(supercharger.location);
};


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Context menu handlers.
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


/**
 * Add a custom marker and range circle to the map.
 */
redshiftsoft.MapView.prototype.handleAddMarker = function (event) {
    var markerInput = $("#new-marker-name-input");
    var markerDialog = $("#new-marker-dialog");
    var mapView = this;


    function handleOK() {
        markerDialog.dialog("close");
        var markerName = markerInput.val();
        markerInput.val("");
        // add marker
        var newCharger = mapView.superData.addSupercharger(markerName, event.latLng);
        redshiftsoft.MapView.addMarkerToSupercharger(mapView.googleMap, newCharger);
        mapView.redraw(false);
        redshiftsoft.MapView.showInfoWindowForMarker.call(newCharger.marker);
    }

    markerDialog.show().dialog(
        {
            width: 400,
            buttons: [
                {
                    text: "OK",
                    click: handleOK
                }
            ]
        }
    );
};

redshiftsoft.MapView.prototype.handleAddRouteEvent = function (event) {
    this.handleAddRoute(event.latLng);
};

redshiftsoft.MapView.prototype.handleAddRoute = function (latLng) {
    this.routeList.push(latLng);
    var routeListLength = this.routeList.length;

    if (routeListLength === 1) {
        alert("Route list contains one location. \n\n Add additional locations to continue.");
    }
    else {
        var request = {
            origin: this.routeList[routeListLength - 2],
            destination: this.routeList[routeListLength - 1],
            travelMode: google.maps.TravelMode.DRIVING
        };
        var directionsRenderer = new google.maps.DirectionsRenderer({
            map: this.googleMap,
            panel: document.getElementById('directions-panel'),
            preserveViewport: true,
            suppressMarkers: true,
            draggable: true
        });

        this.directionsService.route(request, function (response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(response);
            }
        });
    }
};


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// CLASS level methods
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


redshiftsoft.MapView.addMarkerToSupercharger = function (googleMap, supercharger) {
    var markerOptions = {
        position: supercharger.location,
        map: googleMap,
        title: supercharger.displayName,
        icon: {
            url: (supercharger.custom ? 'images/dots/blue_dot_16.png' : 'images/dots/red_dot_16.png'),
            anchor: { x: 8, y: 8 }
        },
        animation: google.maps.Animation.DROP
    };
    if (supercharger.construction) {
        markerOptions.icon = "images/construction-cone-marker.png";
    }
    var marker = new google.maps.Marker(markerOptions);
    supercharger.marker = marker;
    marker.supercharger = supercharger;
    google.maps.event.addListener(supercharger.marker, 'click', redshiftsoft.MapView.showInfoWindowForMarker);
}

redshiftsoft.MapView.showInfoWindowForMarker = function () {
    var myMarker = this;
    var supercharger = myMarker.supercharger;
    var popupContent = "";
    popupContent += "<div class='info-window-content'>";
    popupContent += "<div class='title'>" + supercharger.displayName + "</div>" + "";
    if (supercharger.construction) {
        popupContent += "<div style='color: orange; font-size: smaller; font-weight: bold'>under construction</div>";
    }
    popupContent += supercharger.address.street + "<br/>";
    if (supercharger.url !== null) {
        popupContent += "<a target='_blank' href='" + supercharger.url + "'>web page</a>";
        popupContent += "&nbsp;&nbsp;&nbsp;";
    }
    var circleOnOffLabel = (supercharger.circle != null && supercharger.circle.getVisible()) ? "circle off" : "circle on";
    popupContent += "<a class='circle-toggle-trigger' href='" + supercharger.id + "'>" + circleOnOffLabel + "</a>";
    popupContent += "&nbsp;&nbsp;&nbsp;";
    if (supercharger.custom) {
        popupContent += "<a class='marker-toggle-trigger' href='" + supercharger.id + "'>remove</a>";
        popupContent += "&nbsp;&nbsp;&nbsp;";
    }
    popupContent += "<a class='add-to-route-trigger' href='" + supercharger.id + "'>add to route</a>";
    popupContent += "</div>";

    var windowOptions = { content: popupContent  };
    var infoWindow = new google.maps.InfoWindow(windowOptions);
    infoWindow.open(myMarker.map, myMarker);
};