redshiftsoft = createMyNamespace("redshiftsoft");

/**
 * Constructor
 */
redshiftsoft.ControlView_Table = function () {

    this.superChargerDataTable = $("#supercharger-data-table");

    this.superData = new redshiftsoft.SuperchargerData();

    this.draw();
}

redshiftsoft.ControlView_Table.prototype.draw = function () {

    var tableBodyData = this.superChargerDataTable.find("tbody");

    for (var i = 0; i < this.superData.size(); i++) {
        var supercharger = this.superData.get(i);

        tableBodyData.append("" +
            "<tr>" +
            "<td>" + supercharger.displayName + "</td>" +
            "<td>" + supercharger.address.street + "</td>" +
            "<td>" + supercharger.address.city + "</td>" +
            "<td>" + supercharger.address.state + "</td>" +
            "<td>" + supercharger.address.zip + "</td>" +
            "<td>" + supercharger.address.country + "</td>" +
            "<td class='gps'>" + supercharger.location.toUrlValue() + "</td>" +
            "<td class='tog'>" + "<a href='" + supercharger.url + "'>link</a></td>" +
            "</tr>"
        );


    }

};

redshiftsoft.ControlView_Table.prototype.handleTableClick = function (event) {
    var node = $(event.target);

    /* Find a node we are interested in */
    while (!node.is("td")) {
        node = node.parent();
    }

    if (node.hasClass("tog")) {
        if (node.text() == "on") {
            node.text("off")
        }
        else {
            node.text("on")
        }
    }
};