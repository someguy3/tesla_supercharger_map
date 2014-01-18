define(
    ['nav/NavBarDropdown', 'util/Events', 'nav/NavBarToAboutPage', 'nav/NavBarToChangesPage' ],
    function (NavBarDropdown, Events, NavBarToAboutPage, NavBarToChangesPage) {


        /**
         * Constructor
         */
        var NavBar = function () {
            this.navBarDropdown = new NavBarDropdown();
            this.currentPage = "map";
            this.initListeners();
        };

        NavBar.prototype.initListeners = function () {
            $("#navbar-menu-item-list").find("a").click(jQuery.proxy(this.handlePageChange, this));
            $("#navbar-dropdown-menu-item-list").find("a").click(jQuery.proxy(this.navBarDropdown.handleAction, this.navBarDropdown));
        };

        NavBar.prototype.onDropDownEvent = function (eventName, callback) {
            this.navBarDropdown.on(eventName, callback);
        };

        NavBar.prototype.handlePageChange = function (event) {
            var eventDetail = Events.eventDetail(event);

            this.hidePage();
            this.currentPage = eventDetail.actionName;
            this.showPage();

            if ("map" === this.currentPage) {
                $("#navbar-map-dropdown").show();
                $("#navbar-map-search").show();
                $("#carousel-container").show();
            } else {
                $("#navbar-map-dropdown").hide();
                $("#navbar-map-search").hide();
                $("#carousel-container").hide();
            }

            if ("about" === this.currentPage) {
                new NavBarToAboutPage().populateAboutPage();
            }
            if ("changes" === this.currentPage) {
                new NavBarToChangesPage().load();
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