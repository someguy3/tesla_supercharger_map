//
// http://www.iso.org/iso/country_codes/iso_3166_code_lists/country_names_and_code_elements.htm
//

var redshiftsoft = createMyNamespace("redshiftsoft");

redshiftsoft.CountryCodes = {};

redshiftsoft.CountryCodes.CODE_TO_NAME_MAP =
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

redshiftsoft.CountryCodes.NAME_TO_CODE_MAP = null;


redshiftsoft.CountryCodes.initializeReverseMap = function () {
    redshiftsoft.CountryCodes.NAME_TO_CODE_MAP = {};
    for (var code in redshiftsoft.CountryCodes.CODE_TO_NAME_MAP) {
        if (redshiftsoft.CountryCodes.CODE_TO_NAME_MAP.hasOwnProperty(code)) {
            var country = redshiftsoft.CountryCodes.CODE_TO_NAME_MAP[code];
            redshiftsoft.CountryCodes.NAME_TO_CODE_MAP[country] = code;
        }
    }
};

redshiftsoft.CountryCodes.fromName = function (countryName) {
    if (redshiftsoft.CountryCodes.NAME_TO_CODE_MAP === null) {
        redshiftsoft.CountryCodes.initializeReverseMap();
    }
    return redshiftsoft.CountryCodes.NAME_TO_CODE_MAP[countryName];
};
