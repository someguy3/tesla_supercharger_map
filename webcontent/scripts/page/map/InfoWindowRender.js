define(['util/Objects'], function (Objects) {

    var Renderer = {};

    Renderer.showInfoWindowForMarker = function (marker, supercharger) {
        var popupContent = "";
        popupContent += "<div class='info-window-content'>";
        //
        // Title/Supercharger-name
        //
        popupContent += "<div class='title'>" + supercharger.displayName + "</div>" + "";
        //
        // Construction
        //
        if (supercharger.isConstruction()) {
            popupContent += "<div style='color: orange; font-size: smaller; font-weight: bold'>under construction</div>";
        }
        //
        // Street Address
        //
        popupContent += supercharger.address.street + "<br/>";
        //
        // Web Page
        //
        if (Objects.isNotNullOrUndef(supercharger.url)) {
            popupContent += "<a target='_blank' href='" + supercharger.url + "'>web page</a>";
            popupContent += "&nbsp;&nbsp;&nbsp;";
        }
        //
        // Circle On/Off
        //
        var circleOnOffLabel = (Objects.isNotNullOrUndef(supercharger.circle) && supercharger.circle.getVisible()) ? "circle off" : "circle on";
        popupContent += "<a class='circle-toggle-trigger' href='" + supercharger.id + "'>" + circleOnOffLabel + "</a>";
        popupContent += "&nbsp;&nbsp;&nbsp;";
        //
        // Remove Marker
        //
        if (supercharger.isUserAdded()) {
            popupContent += "<a class='marker-toggle-trigger' href='" + supercharger.id + "'>remove</a>";
            popupContent += "&nbsp;&nbsp;&nbsp;";
        }
        //
        // Add to Route
        //
        popupContent += "<a class='add-to-route-trigger' href='" + supercharger.id + "'>add to route</a>";
        popupContent += "</div>";

        var windowOptions = { content: popupContent };
        var infoWindow = new google.maps.InfoWindow(windowOptions);
        infoWindow.open(marker.map, marker);
    };

    return Renderer;

});