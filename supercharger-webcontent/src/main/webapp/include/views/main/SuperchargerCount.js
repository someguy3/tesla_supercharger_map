redshiftsoft = createMyNamespace("redshiftsoft");

redshiftsoft.SuperchargerCount = function () {

    this.superData = new redshiftsoft.SuperchargerData();

    var headerRow = $("<tr><th class='vert'></th></tr>");
    var openRow = $("<tr><th class='vert'>Open</th></tr>");
    var constRow = $("<tr><th class='vert'>Under Construction</th></tr>");

    var countryCountMap = this.superData.getConstructionCount();
    for (var country in countryCountMap) {
        headerRow.append("<th>" + country + "</th>")
        openRow.append("<td>" + countryCountMap[country]['open'] + "</td>");
        constRow.append("<td>" + countryCountMap[country]['construction'] + "</td>");
    }

    var table = $("<table></table>");
    table.addClass("supercharger-count-table");
    table.append(headerRow);
    table.append(openRow);
    table.append(constRow);

    table.appendTo("#supercharger-count-div");
};


