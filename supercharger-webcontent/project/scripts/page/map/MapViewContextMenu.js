define([], function () {


    /**
     * Constructor
     */
    var MapViewContextMenu = function (googleMap) {
        this.mapCanvas = $('#map-canvas');
        this.googleMap = googleMap;
        this.contextMenuDiv = MapViewContextMenu.createMenu(this.googleMap.getDiv());
        this.showStartTime = 0;

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

        google.maps.event.addListener(this.googleMap, 'mousedown', jQuery.proxy(this.mousedown, this));
        google.maps.event.addListener(this.googleMap, 'mouseup', jQuery.proxy(this.mouseup, this));

    };

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Constants
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    /* Browser context menu is already disabled on google map, but not on our context menu. Draw context menu with slight
     offset so that we don't get the browser context menu ON our context menu. */
    MapViewContextMenu.DRAW_OFFSET_PX = 5;

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Event delegate methods.
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    MapViewContextMenu.prototype.on = function (eventName, callback) {
        this.contextMenuDiv.on(eventName, callback);
    };
    MapViewContextMenu.prototype.trigger = function (event) {
        this.contextMenuDiv.trigger(event);
    };

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Detect long-click (on tables, phones, etc)
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    MapViewContextMenu.prototype.mousedown = function (event) {
        var contextMenu = this;
        $(this).doTimeout('detect-long-click', 3000, function () {
            contextMenu.show(event);
        });
        return true;
    };

    MapViewContextMenu.prototype.mouseup = function (event) {
        $(this).doTimeout('detect-long-click');
    };

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    /**
     * Hide context menu.
     */
    MapViewContextMenu.prototype.hide = function () {
        var elapsedTime = new Date().getTime() - this.showStartTime;
        if (elapsedTime > 900) {
            this.contextMenuDiv.hide();
            this.showStartTime = 0;
        }
    };

    /**
     * Show context menu at some lat/lon.
     */
    MapViewContextMenu.prototype.show = function (event) {
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

        this.contextMenuDiv.css('left', x + MapViewContextMenu.DRAW_OFFSET_PX);
        this.contextMenuDiv.css('top', y + MapViewContextMenu.DRAW_OFFSET_PX);
        this.contextMenuDiv.show();
        this.showStartTime = new Date().getTime();
    };

    MapViewContextMenu.prototype.getCanvasXY = function (currentLatLng) {
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

    MapViewContextMenu.createMenu = function (parentDiv) {
        var contextMenuList = $(
            "<ul class='dropdown-menu' id='navbar-dropdown-menu-item-list'>" +
                "   <li><a href='' class='context-menu-add-marker'>Add custom marker...</a></li>" +
                "   <li><a href='' class='context-menu-add-to-route'>Add to route...</a></li> " +
                "</ul>"
        );
        contextMenuList.hide();
        $(parentDiv).append(contextMenuList);
        return contextMenuList;
    };

    return MapViewContextMenu;

});