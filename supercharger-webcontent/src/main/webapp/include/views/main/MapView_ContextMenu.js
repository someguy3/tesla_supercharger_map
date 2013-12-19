var redshiftsoft = createMyNamespace("redshiftsoft");

/**
 * Constructor
 */
redshiftsoft.MapViewContextMenu = function (googleMap) {
    this.mapCanvas = $('#map-canvas');
    this.googleMap = googleMap;
    this.contextMenuDiv = redshiftsoft.MapViewContextMenu.createMenu(this.googleMap.getDiv());

    var menu = this;
    this.contextMenuDiv.on("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        var target = $(event.target);
        var targetClass = target.attr('class');
        menu.hide();
        menu.trigger({type: targetClass, latLng: menu.currentLatLng});
    });

    google.maps.event.addListener(this.googleMap, 'rightclick', jQuery.proxy(this.show, this));
    google.maps.event.addListener(this.googleMap, 'click', jQuery.proxy(this.hide, this));

};

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Constants
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/* Browser context menu is already disabled on google map, but not on our context menu. Draw context menu with slight
 offset so that we don't get the browser context menu ON our context menu. */
redshiftsoft.MapViewContextMenu.DRAW_OFFSET_PX = 5;

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Event delegate methods.
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

redshiftsoft.MapViewContextMenu.prototype.on = function (eventName, callback) {
    this.contextMenuDiv.on(eventName, callback);
};
redshiftsoft.MapViewContextMenu.prototype.trigger = function (event) {
    this.contextMenuDiv.trigger(event);
};

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


/**
 * Hide context menu.
 */
redshiftsoft.MapViewContextMenu.prototype.hide = function () {
    this.contextMenuDiv.hide();
};

/**
 * Show context menu at some lat/lon.
 */
redshiftsoft.MapViewContextMenu.prototype.show = function (event) {
    this.currentLatLng = event.latLng;
    var mapWidth = this.mapCanvas.width();
    var mapHeight = this.mapCanvas.height();
    var menuWidth = this.contextMenuDiv.width();
    var menuHeight = this.contextMenuDiv.height();
    var clickedPosition = this.getCanvasXY(this.currentLatLng);
    var x = clickedPosition.x;
    var y = clickedPosition.y;

    //if to close to the map border, decrease x position
    if ((mapWidth - x ) < menuWidth) {
        x = x - menuWidth;
    }
    //if to close to the map border, decrease y position
    if ((mapHeight - y ) < menuHeight) {
        y = y - menuHeight;
    }

    this.contextMenuDiv.css('left', x + redshiftsoft.MapViewContextMenu.DRAW_OFFSET_PX);
    this.contextMenuDiv.css('top', y + redshiftsoft.MapViewContextMenu.DRAW_OFFSET_PX);
    this.contextMenuDiv.show();
};

redshiftsoft.MapViewContextMenu.prototype.getCanvasXY = function (currentLatLng) {
    var scale = Math.pow(2, this.googleMap.getZoom());
    var nw = new google.maps.LatLng(
        this.googleMap.getBounds().getNorthEast().lat(),
        this.googleMap.getBounds().getSouthWest().lng()
    );
    var worldCoordinateNW = this.googleMap.getProjection().fromLatLngToPoint(nw);
    var worldCoordinate = this.googleMap.getProjection().fromLatLngToPoint(currentLatLng);
    var currentLatLngOffset = new google.maps.Point(
        Math.floor((worldCoordinate.x - worldCoordinateNW.x) * scale),
        Math.floor((worldCoordinate.y - worldCoordinateNW.y) * scale)
    );
    return currentLatLngOffset;
};

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// class methods
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

redshiftsoft.MapViewContextMenu.createMenu = function (parentDiv) {
    var contextMenuDiv = $("<div></div>");
    contextMenuDiv.addClass('map-context-menu');
    contextMenuDiv.append('<div class="context-menu-add-marker">Add custom marker...<\/div>');
    contextMenuDiv.append('<div class="context-menu-add-to-route">Add to route...</div>');
    contextMenuDiv.hide();
    $(parentDiv).append(contextMenuDiv);
    return contextMenuDiv;
};