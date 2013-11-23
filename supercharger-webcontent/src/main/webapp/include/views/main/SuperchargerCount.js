redshiftsoft = createMyNamespace("redshiftsoft");

redshiftsoft.SuperchargerCount = function () {

    this.superData = new redshiftsoft.SuperchargerData();

    $("#supercharger-count-div").append("Open: US " + "<b>" + this.superData.getRegionCount("|USA|Canada|") + "</b>");
    $("#supercharger-count-div").append(", ");
    $("#supercharger-count-div").append("Europe " + "<b>" + this.superData.getRegionCount("|Norway|") + "</b>");
    $("#supercharger-count-div").append("<br/> ");
    $("#supercharger-count-div").append("Under Construction: <b>" + this.superData.getConstructionCount() + "</b>");

};


