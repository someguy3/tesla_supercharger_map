redshiftsoft = createMyNamespace("redshiftsoft");

redshiftsoft.SuperchargerCount = function () {

    this.superData = new redshiftsoft.SuperchargerData();

    var headerRow = $("<tr><th class='vert'></th></tr>");
    var openRow = $("<tr><th class='vert'>Open</th></tr>");
    var constRow = $("<tr><th class='vert'>Construction</th></tr>");

    var countryCountMap = this.superData.getConstructionCount();
    for (var countryName in countryCountMap) {
        var countryCode = redshiftsoft.CountryCodes.fromName(countryName);
        headerRow.append("<th title='" + countryName + "'>" + countryCode + "</th>")
        openRow.append("<td>" + countryCountMap[countryName]['open'] + "</td>");
        constRow.append("<td>" + countryCountMap[countryName]['construction'] + "</td>");
    }

    var table = $("<table></table>");
    table.addClass("supercharger-count-table");
    table.append(headerRow);
    table.append(openRow);
    table.append(constRow);

    table.appendTo("#supercharger-count-container");
};


