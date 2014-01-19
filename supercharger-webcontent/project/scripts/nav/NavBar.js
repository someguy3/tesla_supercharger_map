define(
    [
        'nav/NavBarDropdown', 'util/Events',
        'page/map/MapPage', 'page/data/DataPage', "page/charts/ChartsPage", 'page/changes/ChangesPage', 'page/about/AboutPage'
    ],
    function (NavBarDropdown, Events, MapPage, DataPage, ChartsPage, ChangesPage, AboutPage) {


        /**
         * Constructor
         */
        var NavBar = function () {
            this.navBarDropdown = new NavBarDropdown();
            this.currentPage = "map";

            this.mapPage = new MapPage();
            this.dataPage = new DataPage();
            this.chartsPage = new ChartsPage();
            this.changesPage = new ChangesPage();
            this.aboutPage = new AboutPage();

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
            this.changePage(eventDetail.actionName);
        };

        NavBar.prototype.changePage = function (newPageName) {
            this.hidePage();
            this.currentPage = newPageName;
            this.showPage();

            if ("map" == this.currentPage) {
                this.mapPage.loadPage();
                $("#navbar-map-dropdown").show();
                $("#navbar-map-search").show();
                $("#carousel-container").show();
            } else {
                $("#navbar-map-dropdown").hide();
                $("#navbar-map-search").hide();
                $("#carousel-container").hide();
            }
            if ("data" === this.currentPage) {
                this.dataPage.loadPage();
            }
            if ("charts" === this.currentPage) {
                this.chartsPage.loadPage();
            }
            if ("changes" === this.currentPage) {
                this.changesPage.loadPage();
            }
            if ("about" === this.currentPage) {
                this.aboutPage.loadPage();
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