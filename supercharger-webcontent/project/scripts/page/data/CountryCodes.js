//
// http://www.iso.org/iso/country_codes/iso_3166_code_lists/country_names_and_code_elements.htm
//
define([], function () {

    var CountryCodes = {};

    CountryCodes.CODE_TO_NAME_MAP =
    {
        "AU": "Australia",
        "AT": "Austria",
        "BE": "Belgium",
        "CN": "China",
        "CA": "Canada",
        "DK": "Denmark",
        "FI": "Finland",
        "FR": "France",
        "DE": "Germany",
        "HK": "Hong Kong",
        "IT": "Italy",
        "IE": "Ireland",
        "JP": "Japan",
        "LU": "Luxembourg",
        "MX": "Mexico",
        "PL": "Poland",
        "PT": "Portugal",
        "RU": "Russia",
        "KR": "South Korea",
        "SE": "Sweden",
        "CH": "Switzerland",
        "GB": "United Kingdom",
        "NL": "Netherlands",
        "NO": "Norway",
        "ES": "Spain",
        "US": "USA"
    };

    CountryCodes.NAME_TO_CODE_MAP = null;

    CountryCodes.initializeReverseMap = function () {
        CountryCodes.NAME_TO_CODE_MAP = {};
        for (var code in CountryCodes.CODE_TO_NAME_MAP) {
            if (CountryCodes.CODE_TO_NAME_MAP.hasOwnProperty(code)) {
                var country = CountryCodes.CODE_TO_NAME_MAP[code];
                CountryCodes.NAME_TO_CODE_MAP[country] = code;
            }
        }
    };

    CountryCodes.fromName = function (countryName) {
        if (CountryCodes.NAME_TO_CODE_MAP === null) {
            CountryCodes.initializeReverseMap();
        }
        return CountryCodes.NAME_TO_CODE_MAP[countryName];
    };

    return CountryCodes;

});