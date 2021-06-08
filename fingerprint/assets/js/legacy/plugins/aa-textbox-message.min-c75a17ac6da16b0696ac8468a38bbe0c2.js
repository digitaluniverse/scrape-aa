"use strict";
/**
 *  UI-REFACTORED
 *    FROM --> ./legacy-web/src/main/js/apps/common/js/jquery/aacom/plugins/aaTextboxMessage.js
 *    TO   --> ./webapps/shared-web/src/main/assets/js/legacy/plugins/aa-textbox-message.js
 **/
// ----------------------------------------------------------------------------------------------------------------------------------
// aaTextBoxMessage
// ----------------------------------------------------------------------------------------------------------------------------------
function aaTextBoxMessage(paramElement, paramMessage) {
    if (paramElement) {
        // Initialize internal parameters
        this.element = paramElement;
        this.message = paramMessage ? paramMessage.replace(/^\s+|\s+$/g, "") : "aaTextBoxMessage - ATTENTION: caption has not been defined";
        // Initialize HTML element
        this.element.aaTextBoxMessage = this;
        this.element.value = this.message;
        this.element.onfocus = aaTextBoxMessage.onfocus;
        this.element.onblur = aaTextBoxMessage.onblur;
        this.element.aaTextBoxMessage = this
    }
}
aaTextBoxMessage.onfocus = function() {
    if (this.value.replace(/^\s+|\s+$/g, "") === this.aaTextBoxMessage.message) {
        this.value = ""
    }
}
;
aaTextBoxMessage.onblur = function() {
    if (this.value.replace(/^\s+|\s+$/g, "") === "") {
        this.value = this.aaTextBoxMessage.message
    }
}
;
// ----------------------------------------------------------------------------------------------------------------------------------
// Register with jQuery as a plugin
// ----------------------------------------------------------------------------------------------------------------------------------
jQuery.fn.aaTextBoxMessage = function(paramMessage) {
    var i = 0;
    var obj;
    for (i; i < this.length; i++) {
        obj = new aaTextBoxMessage(this[i],paramMessage)
    }
}
;
//# sourceMappingURL=aa-textbox-message.min.js.map
