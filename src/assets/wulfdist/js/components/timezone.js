/*!
 * WULF v1.2.39 (http://wulf-demo.dynamic.nsn-net.net/)
 * Copyright © 2016-2017 Nokia. All rights Reserved.
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery","moment-timezone","bootstrap","fuelux/selectlist","malihu-custom-scrollbar-plugin","./keyboard/keyboard-core"],a):"object"==typeof module&&module.exports?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c,require("moment-timezone"),require("bootstrap"),require("fuelux/selectlist"),require("malihu-custom-scrollbar-plugin"),require("./keyboard/keyboard-core")),c}:a(jQuery)}(function(a,b){"use strict";function c(b,c){var d=c.closest(".n-timezone").find("ul");d.find("li").each(function(){var c=a(this).find("span").html();if(c=c.replace("<strong>","").replace("</strong>",""),c.toUpperCase().indexOf(b.toUpperCase())<0)a(this).hide();else{a(this).show();var d=c.toUpperCase().indexOf(b.toUpperCase()),e=c.substring(d,d+b.length);c=c.replace(e,"<strong>"+e+"</strong>")}a(this).find("span").html(c)})}function d(b){b.find("li").each(function(){var b=a(this).find("span").html();b=b.replace("<strong>","").replace("</strong>",""),a(this).find("span").html(b),a(this).show()})}function e(a){var b=a.find(".selected-label > span").html();b=b.replace("<strong>","").replace("</strong>",""),a.find(".selected-label > span").html(b)}function f(a){var b=a.find(".filter-input input");b.val(""),b.next(".n-inputfield-control-icon").hide()}function g(a){a.sort(function(a,b){var c=parseInt(a.offset.replace(":",""),10),d=parseInt(b.offset.replace(":",""),10);return c-d!==0?c-d:a.name>b.name?1:a.name<b.name?-1:0})}function h(){var a=[],c=b.tz.names();for(var d in c)c.hasOwnProperty(d)&&void 0!==c[d]&&a.push({name:c[d],offset:b.tz(c[d]).format("Z")});return a}function i(b){var c="Etc/GMT"+(new Date).getTimezoneOffset()/60;b.find("li").each(function(){a(this).data("value")===c&&b.selectlist("selectByValue",c)})}function j(a,b){for(var c="",d=0;d<a.length;d++){var e=a[d];c+=b===e.name?'<li data-value="'+e.name+'" data-offset="'+e.offset+'" data-selected="true"><a href="#"><span>(GMT '+e.offset+") "+e.name+"</span></a></li>":'<li data-value="'+e.name+'" data-offset="'+e.offset+'"><a href="#"><span>(GMT '+e.offset+") "+e.name+"</span></a></li>"}return c}function k(b){var c=!0;return b.prevAll("li").each(function(){return a(this).is(":visible")?(c=!1,!1):void 0}),c}function l(a){var b=!1,c=a.split("|");if(2===c.length){var d=c[0],e=c[1],f=new RegExp("\\S*\\/\\S*"),g=new RegExp("^(?:Z|[+-](?:2[0-3]|[01][0-9]):[0-5][0-9])$");null!==e.match(g)&&null!==d.match(f)&&(b=!0)}return b}function m(b){var c="";return b.find("li").each(function(){return a(this).data("selected")===!0?(c=a(this).data("value"),!1):void 0}),c}function n(a){var b,c,d=a.parents(".mCSB_container");if(d.length)return b=d.parent(),c=[d[0].offsetTop,d[0].offsetLeft],c[0]+o(a)[0]>=0&&c[0]+o(a)[0]<=b.height()-a.outerHeight(!1)&&c[1]+o(a)[1]>=0&&c[1]+o(a)[1]<=b.width()-a.outerWidth(!1)}function o(a){var b=a.parents(".mCSB_container");return[a.offset().top-b.offset().top,a.offset().left-b.offset().left]}function p(b){return this.each(function(){var c=a(this),d=c.data("wf.timezone");d||b?d||"[object Array]"!==Object.prototype.toString.call(b)||c.data("wf.timezone",d=new t(this,b)):c.data("wf.timezone",d=new t(this)),"string"==typeof b&&d[b].call(c)})}function q(b,c){var d=a("<span>").hide().appendTo(document.body);""!==c.css("font")?a(d).html(b).css("font",c.css("font")):a(d).html(b).css("font-size",c.css("font-size"));var e=d.width();return d.remove(),e}function r(){var b=a(this);b.removeAttr("data-original-title"),b.removeAttr("title");var c=b.find("span").not(".checkbox"),d=q(c.html(),c);d>=b.width()?(c.addClass("active"),c.css("border-bottom-color","transparent"),b.attr("data-original-title",a(c).text()),b.tooltip("show")):b.tooltip("hide")}function s(){var b=a(this);b.removeAttr("data-original-title"),b.removeAttr("title");for(var c=b.find(".selected-label"),d=c.find("span"),e="",f=0;f<d.length;f++)e=e.concat(a(d[f]).html());var g=q(e,c);g>=c.width()?(b.attr("data-original-title",e),b.tooltip("show")):b.tooltip("hide")}var t=function(b,l){var m=a(b);m.hasClass("n-timezone")||m.addClass("n-timezone"),l||(l=h()),g(l);var o=m.find("ul");o.append(j(l,null)),m.selectlist();var p='<div class="filter-input"><div class="n-inputfield-clearable n-inputfield-filter"><a class="n-inputfield-filter-icon"><span class="icon icon-filter"></span></a><input type="text" class="form-control n-inputfield n-inputfield-small" placeholder="Filter..."><a href="javascript:void(0)" class="n-inputfield-control-icon n-inputfield-control-icon-small" style="display: none;"><span role="button" aria-label="clear textfield content" class="icon icon-close"></span></a></div><div class="seperator"></div></div>';o.before(p),m.find(".filter-input").hide(),i(m),o.mCustomScrollbar({keyboard:{enable:!1}}),m.find(".n-inputfield-clearable input").on("keyup",function(b){var d=b.target.value,e=a(b.target).next(".n-inputfield-control-icon");d.length>0?e.show():e.hide(),c(d,a(b.target))}),m.find(".n-inputfield-control-icon").on("click",function(b){b.stopPropagation();var c=a(this).prev();if(c.hasClass("n-inputfield")){c.focus();var e=a(this).closest(".n-timezone");f(e),d(e)}}),m.on("changed.fu.selectlist",function(){d(a(this)),e(a(this)),f(a(this))}),m.on("shown.bs.dropdown",function(){var b=a(this);b.find(".filter-input").show(),b.find(".filter-input input").focus();var c=b.find("ul").find("[data-selected=true]").index();b.find("ul").mCustomScrollbar("scrollTo",b.find("ul").find("li:eq("+c+")"),{scrollInertia:0})}),m.on("hide.bs.dropdown",function(){a(this).find(".filter-input").hide()}),m.on("click",".mCSB_dragger_bar",function(a){a.stopPropagation()}),m.on("keydown",".filter-input",function(b){40===b.keyCode&&(b.preventDefault(),a(this).next("ul").find("li").each(function(){return n(a(this))===!0?(a(this).children("a").focus(),!1):void 0})),27===b.keyCode&&(a(this).prev("button").trigger("click"),a(this).prev("button").trigger("focus")),57===b.keyCode&&b.shiftKey&&(b.preventDefault(),a(this).find("input").val("("))}),m.on("keydown",".dropdown-menu li",function(b){38===b.keyCode&&a(this).is(":visible")&&k(a(this))&&(b.stopPropagation(),a(this).closest(".n-timezone").find(".filter-input input").focus())})};t.VERSION="1.1.0";var u=a.fn.nTimezone;a.fn.nTimezone=p,a.fn.nTimezone.Constructor=t,a.fn.nTimezone.noConflict=function(){return a.fn.nTimezone=u,this},a(function(){a('[data-markup^="timezone"]').each(function(){a(this).nTimezone()})}),a(document).on("mouseenter",".n-timezone .dropdown-menu li a",r).on("focus",".n-timezone .dropdown-menu li a",r).on("mouseleave",".n-timezone .dropdown-menu li a",function(){var b=a(this),c=b.find("span").not(".checkbox");c.css("border-bottom-color",""),c.removeClass("active")}).on("blur",".n-timezone .dropdown-menu li a",function(){var b=a(this),c=b.find("span").not(".checkbox");c.css("border-bottom-color",""),c.removeClass("active")}).on("mouseenter",".n-timezone [data-toggle='dropdown']",s).on("focus",".n-timezone [data-toggle='dropdown']",s).on("mouseleave",".n-timezone [data-toggle='dropdown']",function(){var b=a(this);b.tooltip("hide")}),a.fn.extend({setDefaultZone:function(b){var c=a(this);c.find("li").each(function(){a(this).data("value")===b&&c.selectlist("selectByValue",b)})},addZone:function(b){var c=[];a(this).find("li").each(function(){c.push({name:a(this).data("value"),offset:a(this).data("offset")})});var d=[];if(a.isArray(b))for(var e in b)b.hasOwnProperty(e)&&void 0!==b[e]&&l(b[e])&&(d=b[e].split("|"),c.push({name:d[0],offset:d[1]}));else l(b)&&(d=b.split("|"),c.push({name:d[0],offset:d[1]}));g(c),a(this).find(".mCSB_container").html(j(c,m(a(this))))},removeZone:function(b){var c=[];a(this).find("li").each(function(){var d=a(this).data("value"),e=a(this).data("offset");a.isArray(b)?b.indexOf(d)<0&&c.push({name:d,offset:e}):b!==d&&c.push({name:d,offset:e})}),g(c),a(this).find(".mCSB_container").html(j(c,m(a(this))))}})});