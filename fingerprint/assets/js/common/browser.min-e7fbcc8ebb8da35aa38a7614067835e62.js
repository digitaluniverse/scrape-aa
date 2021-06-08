"use strict";
var AA = AA || {};
/*
*   The AA.browser will replaced the deprecated jQuery.browser component.  The properties should mirror
*   the jQuery.browser properties for easy migration.
*
*   All references should be updated in the code base including the following
*
*       $.browser
*       $j.browser
*       jQuery.browser
*
* */
(function(browser) {
    var userAgent = navigator.userAgent;
    var appVersion = navigator.appVersion;
    var vendor = navigator.vendor;
    var browserProps = userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    var versionSearchString;
    var DATA_BROWSER = [{
        string: userAgent,
        subString: "Chrome",
        identity: "Chrome"
    }, {
        string: vendor,
        subString: "Apple",
        identity: "Safari",
        versionSearch: "Version"
    }, {
        string: userAgent,
        subString: "Firefox",
        identity: "Firefox"
    }, {
        string: userAgent,
        subString: "MSIE",
        identity: "Explorer",
        versionSearch: "MSIE"
    }];
    var searchString = function searchString(data) {
        for (var i = 0; i < data.length; i++) {
            var dataString = data[i].string;
            var dataProp = data[i].prop;
            versionSearchString = data[i].versionSearch || data[i].identity;
            if (dataString) {
                if (dataString.indexOf(data[i].subString) !== -1) {
                    return data[i].identity
                }
            } else if (dataProp) {
                return data[i].identity
            }
        }
    };
    var searchVersion = function searchVersion(dataString) {
        var index = dataString.indexOf(versionSearchString);
        if (index === -1) {
            return
        }
        return parseFloat(dataString.substring(index + versionSearchString.length + 1))
    };
    /*let isUnsupportedBrowser = () => {
        if(browser.name === 'Firefox' && browser.name < 3.6 ||
            browser.name === 'Safari' && browser.name < 5.0 ||
            browser.name === 'Chrome' && browser.name < 5.0 ||
            browser.name === 'Explorer' && browser.name < 11.0) {
            return true;
        }

        return false;
    };

    let isIeAndCompatibilityMode = () => {
        if(browser.name === 'Explorer') {
            let agentStr = userAgent;
            if(agentStr.indexOf("Trident/6.0") > -1 && agentStr.indexOf("MSIE 7.0") > -1 ||
                agentStr.indexOf("Trident/5.0") > -1 && agentStr.indexOf("MSIE 7.0") > -1 ||
                agentStr.indexOf("Trident/4.0") > -1 && agentStr.indexOf("MSIE 7.0") > -1) {
                return true;
            }
        }

        return false;
    };*/
    var isMozilla = function isMozilla() {
        return browserProps[0].toLowerCase().indexOf("firefox") !== -1
    };
    var isIe = function isIe() {
        return browserProps[0].toLowerCase().indexOf("ie") !== -1
    };
    var isWebkit = function isWebkit() {
        return browserProps[0].toLowerCase().indexOf("chrome") !== -1 || browserProps[0].toLowerCase().indexOf("safari") !== -1
    };
    var getName = function getName() {
        return searchString(DATA_BROWSER) || "An unknown browser"
    };
    var getVersion = function getVersion() {
        return searchVersion(userAgent) || searchVersion(appVersion) || "an unknown version"
    };
    browser.name = getName();
    browser.version = getVersion();
    browser.msie = isIe();
    browser.webkit = isWebkit();
    browser.mozilla = isMozilla()
}
)(AA.browser = AA.browser || {});
//# sourceMappingURL=browser.min.js.map
