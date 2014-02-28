define(['util/Objects'], function (Objects) {

    var Renderer = {};

    Renderer.showInfoWindowForMarker = function (marker, supercharger) {
        var popupContent = "<div class='info-window-content'>";
        //
        // Title/Supercharger-name
        //
        popupContent += "<div class='title'>" + supercharger.displayName + "</div>" + "";
        //
        // Construction
        //
        if (supercharger.isConstruction()) {
            popupContent += "<div class='construction'>Status: Construction</div>";
        }
        else if (supercharger.isPermit()) {
            popupContent += "<div class='permit'>Status: Permit</div>";
        }
        //
        // Street Address
        //
        popupContent += supercharger.address.street + "<br/>";

        popupContent += buildLinksDiv(supercharger);

        popupContent += "</div>";

        var windowOptions = { content: popupContent };
        var infoWindow = new google.maps.InfoWindow(windowOptions);
        infoWindow.open(marker.map, marker);
    };

    function buildLinksDiv(supercharger) {
        var content = "<div class='links-container'>";

        var linkList = [
            buildLinkZoom(supercharger),
            buildLinkCircleToggle(supercharger),
            buildLinkAddToRoute(supercharger),
            buildLinkURL(supercharger),
            buildLinkDiscussURL(supercharger),
            buildLinkRemoveMarker(supercharger)
        ];

        var count = 1;
        $.each(linkList, function (index, value) {
            if (value != null) {
                content += value + "";
                if (((count++) % 3 === 0) && (index != linkList.length - 1)) {
                    content += "<br/>";
                }
            }
        });
        content += "</div>";
        return content;
    }

    function buildLinkZoom(supercharger) {
        return "<a class='zoom-to-site-trigger' href='" + supercharger.id + "'>zoom in</a>";
    }

    function buildLinkCircleToggle(supercharger) {
        var circleOnOffLabel = (Objects.isNotNullOrUndef(supercharger.circle) && supercharger.circle.getVisible()) ? "circle off" : "circle on";
        return "<a class='circle-toggle-trigger' href='" + supercharger.id + "'>" + circleOnOffLabel + "</a>";
    }

    function buildLinkAddToRoute(supercharger) {
        return "<a class='add-to-route-trigger' href='" + supercharger.id + "'>add to route</a>";
    }

    function buildLinkURL(supercharger) {
        if (Objects.isNotNullOrUndef(supercharger.url)) {
            return "<a target='_blank' href='" + supercharger.url + "'>web page</a>";
        }
        return null;
    }

    function buildLinkDiscussURL(supercharger) {
        if (Objects.isNotNullOrUndef(supercharger.urlDiscuss)) {
            return "<a target='_blank' href='" + supercharger.urlDiscuss + "'>discuss</a>";
        }
        return null;
    }

    function buildLinkRemoveMarker(supercharger) {
        if (supercharger.isUserAdded()) {
            return "<a class='marker-toggle-trigger' href='" + supercharger.id + "'>remove</a>";
        }
        return null;
    }

    return Renderer;

});