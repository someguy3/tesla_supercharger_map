redshiftsoft = createMyNamespace("redshiftsoft");

/**
 * Constructor
 */
redshiftsoft.MapViewContextMenu = function (googleMap) {
    this.mapCanvas = $('#map-canvas');
    this.googleMap = googleMap;
    this.contextMenuDiv = redshiftsoft.MapViewContextMenu.createMenu(this.googleMap.getDiv());
}

/**
 * Hide context menu.
 */
redshiftsoft.MapViewContextMenu.prototype.hide = function () {
    this.contextMenuDiv.hide();
}

/**
 * Show context menu.
 */
redshiftsoft.MapViewContextMenu.prototype.show = function (currentLatLng) {
    var mapWidth = this.mapCanvas.width();
    var mapHeight = this.mapCanvas.height();
    var menuWidth = this.contextMenuDiv.width();
    var menuHeight = this.contextMenuDiv.height();
    var clickedPosition = this.getCanvasXY(currentLatLng);
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

    this.contextMenuDiv.css('left', x);
    this.contextMenuDiv.css('top', y);
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
}

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// class methods
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

redshiftsoft.MapViewContextMenu.createMenu = function (parentDiv) {
    var contextMenuDiv = $("<div></div>");
    contextMenuDiv.addClass('map-context-menu');
    contextMenuDiv.append('<div class="context add-supercharger-trigger">Add custom marker...<\/div>');
    contextMenuDiv.append('<div class="context">Add to route...</div>');
    contextMenuDiv.hide();
    $(parentDiv).append(contextMenuDiv);
    return contextMenuDiv;
}
