/*!
 * WULF v1.2.39 (http://wulf-demo.dynamic.nsn-net.net/)
 * Copyright © 2016-2017 Nokia. All rights Reserved.
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery","bootstrap","twitter-bootstrap-wizard","./keyboard/keyboard-core"],a):"object"==typeof module&&module.exports?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c,require("bootstrap"),require("twitter-bootstrap-wizard"),require("./keyboard/keyboard-core")),c}:a(jQuery)}(function(a){"use strict";function b(a){a.removeClass("passed").siblings("li").removeClass("passed");var b=a.prevAll("li");b.length>0&&b.addClass("passed")}var c=9,d=13,e=32;a.fn.extend({initWizard:function(){a(this).bootstrapWizard({nextSelector:".button-next",previousSelector:".button-previous",firstSelector:".button-first",lastSelector:".button-last"});var b=a(this).find(".navbar-inner>ul>li"),c=(100/(b.length-1)).toFixed(3),d=40/(b.length-1);b.not(":last-child").css("width","calc("+c+"% - "+d+"px)")}}),a(".n-dlg-wizard").on("click",".modal-footer>input[type=button]",function(){for(var c=a(this).closest(".modal-footer").find("input[type=button]"),d=0;d<c.length;d++){var e=c[d];e.className.indexOf("disabled")>=0?a(e).attr("disabled","disabled"):a(e).removeAttr("disabled")}var f=a(this).closest(".modal-footer").prev(".modal-body").find("li.active");b(f)}),a(".n-dlg-wizard").on("keydown.wf.wizard.tab",function(b){b.keyCode===c&&a(b.target).attr("tabindex")>4&&(a("input[type=button][name=previous]").attr("disabled")||a("input[type=button][name=previous]").is(":focus")?(b.preventDefault(),a("input[type=button][name=next]").attr("disabled")?a("input[type=button][name=last]").focus():a("input[type=button][name=next]").focus()):(b.preventDefault(),a("input[type=button][name=previous]").focus()))}),a('i[data-dismiss="modal"]').on("keydown.wf.wizard.closeIcon",function(b){b.preventDefault(),(b.keyCode===d||b.keyCode===e)&&a(b.target).click()}),a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(){var b=a(".n-dlg-wizard.in");b.length>0&&(b.find("input[type=button][name=next]").focus(),b.find("input[type=button][name=first]").trigger("click"))})});