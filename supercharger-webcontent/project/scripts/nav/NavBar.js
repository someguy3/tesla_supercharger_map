define(
    ['jquery', 'nav/NavBarMapAction', 'util/Events', 'nav/NavBarToAboutPage' ],
    function ($, NavBarMapAction, Events, NavBarToAboutPage) {


        /**
         * Constructor
         */
        var NavBar = function () {
            this.navBarMapActionHandler = new NavBarMapAction();
            this.currentPage = "map";
            this.initListeners();
        };

        NavBar.prototype.initListeners = function () {
            $("#navbar-menu-item-list").find("a").click(jQuery.proxy(this.handlePageChange, this));
            $("#navbar-dropdown-menu-item-list").find("a").click(jQuery.proxy(this.navBarMapActionHandler.handleAction, this.navBarMapActionHandler));
        };

        NavBar.prototype.handlePageChange = function (event) {
            var eventDetail = Events.eventDetail(event);

            this.hidePage();
            this.currentPage = eventDetail.actionName;
            this.showPage();

            if ("map" === this.currentPage) {
                $("#navbar-map-dropdown").show();
                $("#navbar-map-search").show();
            } else {
                $("#navbar-map-dropdown").hide();
                $("#navbar-map-search").hide();
            }

            if ("about" === this.currentPage) {
                new NavBarToAboutPage().populateAboutPage();
            }
        };

        NavBar.prototype.hidePage = function () {
            $("#page-" + this.currentPage).hide();
            $("#page-link-" + this.currentPage).closest("li").removeClass("active");
        };

        NavBar.prototype.showPage = function () {
            $("#page-" + this.currentPage).show();
            $("#page-link-" + this.currentPage).closest("li").addClass("active");
        };

        return NavBar;

    });