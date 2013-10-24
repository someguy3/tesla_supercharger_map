redshiftsoft = createMyNamespace("redshiftsoft");

/**
 *
 * @constructor
 */
redshiftsoft.ControlView_Table = function () {
    this.superData = new redshiftsoft.SuperchargerData();
    this.draw();
}

redshiftsoft.ControlView_Table.prototype.draw = function () {

    var table = $("#supercharger-table");

    for (var i = 0; i < this.superData.size(); i++) {
        var supercharger = this.superData.get(i);

        table.append("" +
            "<tr>" +
            "<td>" + supercharger.displayName + "</td>" +
            "<td>" + supercharger.streetAddress + "</td>" +
            "<td>" + supercharger.country + "</td>" +
            "<td>" + "<a href='" + supercharger.url + "'>link</a></td>" +
            "<td class='tog'>" + "on" + "</td>" +
            "<td class='tog'>" + "off" + "</td>" +
            "</tr>"
        );

    }

};