/*!
 * WULF v1.2.39 (http://wulf-demo.dynamic.nsn-net.net/)
 * Copyright © 2016-2017 Nokia. All rights Reserved.
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c),c}:a(jQuery)}(function(a){"use strict";var b,c="";a(".n-inputfield-validation").bind("blur",function(){var d=a(this).val();a(this).hasClass("n-inputfield-ip-address")?c=/^((25[0-5]|2[0-4]\d|[01]?\d\d?)($|(?!\.$)\.)){4}$/:a(this).hasClass("n-inputfield-date")?c=/^(?:(?:(?:0?[1-9]|1[0-9]|2[0-8])\/(?:0?[1-9]|1[0-2])|(?:29|30)\/(?:0?[13-9]|1[0-2])|31\/(?:0?[13578]|1[02]))\/(?!0000)[0-9]{4}|29\/0?2\/(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00))$/:a(this).hasClass("n-inputfield-placeholder")?c=/^(?:(?:(?:0?[1-9]|1[0-9]|2[0-8])\/(?:0?[1-9]|1[0-2])|(?:29|30)\/(?:0?[13-9]|1[0-2])|31\/(?:0?[13578]|1[02]))\/(?!0000)[0-9]{4}|29\/0?2\/(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00))$/:a(this).hasClass("n-inputfield-time")?c=/^([0-1]?[0-9]|2[0-3]):([0-9]|[0-5][0-9]):([0-9]|[0-5][0-9])$/:a(this).hasClass("n-inputfield-customized")&&(c=b),d&&!c.test(d)?a(this).addClass("n-inputfield-validation"):a(this).removeClass("n-inputfield-validation")}),a(".n-inputfield-validation").bind("focus",function(){a(this).removeClass("n-inputfield-validation")}),a.fn.extend({customerReg:function(a){b=a}})});