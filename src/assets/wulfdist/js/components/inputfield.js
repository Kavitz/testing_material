/*!
 * WULF v1.2.39 (http://wulf-demo.dynamic.nsn-net.net/)
 * Copyright © 2016-2017 Nokia. All rights Reserved.
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery","./keyboard/keyboard-core"],a):"object"==typeof module&&module.exports?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c,require("./keyboard/keyboard-core")),c}:a(jQuery)}(function(a){"use strict";function b(b){var c=b.target.value,d=a(b.target).next(".form-control-feedback").find(".icon");c.length>0?d.removeClass("icon-mandatory"):d.addClass("icon-mandatory")}function c(b){var c=b.target.value,d=a(b.target).next(".n-inputfield-control-icon");c.length>0?d.show():d.hide()}function d(){a(".n-inputfield-clearable input").each(function(){var b=a(this).attr("placeholder");a(this).on("blur",function(){a(this).attr("placeholder",b)})})}function e(b){a(b.target).removeClass("n-link-visited").addClass("n-link-visited")}function f(b){var c=!1;a(b.target).closest(".n-login-textfields").find(".n-inputfield").each(function(){return a(this).val()?void 0:(c=!0,!1)});var d=a(b.target).closest(".n-login").find(".n-login-action .n-login-button");c?d.prop("disabled",!0):d.prop("disabled",!1)}function g(b){return this.each(function(){var c=a(this),d=c.data("wf.inputfield"),e="object"==typeof b&&b;(d||!/destroy|hide/.test(b))&&(d||c.data("wf.inputfield",d=new i(this,e)),"string"==typeof b&&d[b]())})}function h(){var b=a(".n-login-textfields .n-inputfield"),c=b.closest(".n-login").find(".n-login-action button"),d=!0;b.length&&b.each(function(){a(this).val()||"rgb(250, 255, 189)"===a(this).css("background-color")||(d=!1)}),d&&c.prop("disabled",!1)}var i=function(a,b){};i.VERSION="1.1.0",i.prototype.constructor=i,i.prototype.clearContent=function(){var b=a(this).prev();b.hasClass("n-inputfield")&&(b.hasClass("n-search-input")||a(this).hide(),b.val(""),b.focus())};var j=a.fn.nInputField;a.fn.nInputField=g,a.fn.nInputField.Constructor=i,a.fn.nInputField.noConflict=function(){return a.fn.nInputField=j,this},a(document).on("keyup.wf.forms",".input-required input",b).on("keyup.wf.forms",".n-inputfield-clearable input",c).on("click.wf.forms",".n-inputfield-clearable .n-inputfield-control-icon",i.prototype.clearContent).on("click.wf.forms",".n-login-forget-password > a",e).on("keyup.wf.forms change.wulf.forms",".n-login .n-inputfield",f).on("keydown.wf.forms.keyboard",'[class$="-clearable"] a',a.wfKBCore.commonKeyboardHandler),a(document).ready(function(){d(),h()})});