redshiftsoft = createMyNamespace("redshiftsoft");

redshiftsoft.SuperchargerCount = function () {

    this.superData = new redshiftsoft.SuperchargerData();

    $("#supercharger-count-div").append("US: " + "<b>" + this.superData.getRegionCount("|USA|Canada|") + "</b>");
    $("#supercharger-count-div").append(" ");
    $("#supercharger-count-div").append("Europe: " + "<b>" + this.superData.getRegionCount("|Norway|") + "</b>");
    $("#supercharger-count-div").append(" ");

};


