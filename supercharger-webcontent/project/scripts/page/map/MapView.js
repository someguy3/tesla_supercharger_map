define(
    ['page/data/SuperchargerData', 'page/map/MapViewContextMenu', 'util/Events'],
    function (SuperchargerData, MapViewContextMenu, Events) {


        /**
         * Constructor.
         */
        var MapView = function (controlState) {

            this.controlState = controlState;
            this.superData = new SuperchargerData();
            this.viewDiv = $("#map-canvas");

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
            this.contextMenu = new MapViewContextMenu(this.googleMap);
            this.contextMenu.on("context-menu-add-marker", jQuery.proxy(this.handleAddMarker, this));
            this.contextMenu.on("context-menu-add-to-route", jQuery.proxy(this.handleAddToRouteContextMenu, this));

        };

        /**
         * Constants
         */
        MapView.INITIAL_LAT = 38.0;
        MapView.INITIAL_LNG = -96.5;
        MapView.INITIAL_ZOOM = 5;

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Event methods that delegate to jquery object for triggering/observing custom events.
//
// map-event-route-added          [{}]
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

        MapView.prototype.on = function (eventName, callback) {
            this.viewDiv.on(eventName, callback);
        };
        MapView.prototype.trigger = function (eventName, extraData) {
            this.viewDiv.trigger(eventName, extraData);
        };

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Initialization
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

        /**
         * Initialize map
         */
        MapView.prototype.initMap = function () {

            var mapOptions = {
                center: new google.maps.LatLng(MapView.INITIAL_LAT, MapView.INITIAL_LNG),
                zoom: MapView.INITIAL_ZOOM,
                mapTypeControl: true,
                mapTypeControlOptions: {
                    mapTypeIds: [google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.HYBRID, google.maps.MapTypeId.TERRAIN],
                    style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR
                },
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            this.googleMap = new google.maps.Map(this.viewDiv.get(0), mapOptions);
            this.redraw(true);
        };

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Drawing
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

        /**
         *  DRAW MAKERS/CIRCLES
         */
        MapView.prototype.redraw = function (drawMarkers) {

            var rangeCircleOptions = this.buildRangeCircleOptions();

            for (var i = 0; i < this.superData.size(); i++) {
                var supercharger = this.superData.get(i);

                if (this.shouldDraw(supercharger)) {
                    if (drawMarkers) {
                        if (supercharger.marker == null) {
                            MapView.addMarkerToSupercharger(this.googleMap, supercharger);
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

        MapView.prototype.shouldDraw = function (supercharger) {
            return (supercharger.construction && this.controlState.showConstruction) ||
                (!supercharger.construction && this.controlState.showCompleted);
        };

        MapView.prototype.buildRangeCircleOptions = function () {
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
// Geo-coding
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

        MapView.prototype.zoomToLocation = function (locationText) {
            var geocodeService = new google.maps.Geocoder();
            var request = { address: locationText};
            geocodeService.geocode(request, jQuery.proxy(this.zoomToLocationResponseHandler, this));
        };

        MapView.prototype.zoomToLocationResponseHandler = function (resultArray, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                var firstResult = resultArray[0];
                var geometry = firstResult.geometry;
                this.googleMap.setCenter(geometry.location);
                this.googleMap.fitBounds(geometry.bounds);
            } else {
                alert("result: " + status);
            }
        };

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// getters/setters
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

        MapView.prototype.setControlState = function (controlState) {
            this.controlState = controlState;
        };

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// InfoWindow Event handlers
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

        MapView.prototype.handleCircleToggle = function (event) {
            var eventDetail = Events.eventDetail(event);
            var id = parseInt(eventDetail.actionName);
            var supercharger = this.superData.getById(id);
            if (supercharger.circle.getVisible()) {
                eventDetail.link.text("circle on");
                supercharger.circle.setVisible(false);
            } else {
                eventDetail.link.text("circle off");
                supercharger.circle.setVisible(true);
            }
        };

        MapView.prototype.handleMarkerRemove = function (event) {
            event.preventDefault();
            var id = parseInt($(event.target).attr('href'));
            var supercharger = this.superData.getById(id);
            supercharger.circle.setMap(null);
            supercharger.marker.setMap(null);
            this.superData.removeById(id);
        };

        MapView.prototype.handleAddToRoute = function (event) {
            var eventDetail = Events.eventDetail(event);
            var id = parseInt(eventDetail.actionName);
            var supercharger = this.superData.getById(id);
            this.trigger("map-event-route-added", { latLng: supercharger.location, googleMap: this.googleMap });
        };


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Context menu handlers.
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


        MapView.prototype.handleAddToRouteContextMenu = function (event) {
            this.trigger("map-event-route-added", { latLng: event.latLng, googleMap: this.googleMap });
        };

        /**
         * Add a custom marker and range circle to the map.
         */
        MapView.prototype.handleAddMarker = function (event) {
            var markerInput = $("#new-marker-name-input");
            var markerDialog = $("#new-marker-dialog");
            var mapView = this;


            function handleOK() {
                markerDialog.dialog("close");
                var markerName = markerInput.val();
                markerInput.val("");
                // add marker
                var newCharger = mapView.superData.addSupercharger(markerName, event.latLng);
                MapView.addMarkerToSupercharger(mapView.googleMap, newCharger);
                mapView.redraw(false);
                MapView.showInfoWindowForMarker.call(newCharger.marker);
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

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Other controls
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

        MapView.prototype.setAllRangeCircleVisibility = function (isViaible) {
            for (var i = 0; i < this.superData.size(); i++) {
                var supercharger = this.superData.get(i);
                if (supercharger.circle != null) {
                    supercharger.circle.setVisible(isViaible);
                }
            }
        };

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// CLASS level methods
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


        MapView.addMarkerToSupercharger = function (googleMap, supercharger) {
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
            google.maps.event.addListener(supercharger.marker, 'click', MapView.showInfoWindowForMarker);
        }

        MapView.showInfoWindowForMarker = function () {
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

        return MapView;

    });