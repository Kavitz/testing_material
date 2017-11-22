/*!
 * WULF v1.2.39 (http://wulf-demo.dynamic.nsn-net.net/)
 * Copyright © 2016-2017 Nokia. All rights Reserved.
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery","bootstrap","./keyboard/keyboard-core"],a):"object"==typeof module&&module.exports?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c,require("bootstrap"),require("./keyboard/keyboard-core")),c}:a(jQuery)}(function(a){"use strict";function b(){o.each(function(){var b=a(this),c=b.find(".n-banner-toggle"),d=b.width()-b.find(".n-banner-logo-img ").width()-b.find(".n-banner-1st-gray-to-white").width()-b.find(".n-banner-controls").width()-b.find(".n-banner-1st-blue-to-gray .gray-corner").width(),e=b.find(".n-banner-2nd .n-banner-tabs"),f=e.width(),g=b.attr("data-visual-break");!j.matches&&m?b.trigger(k):void 0===g?f>d?b.trigger(k):b.trigger(l):"true"===g&&d>f&&"undefined"!=typeof c&&"none"===a(c).css("display")?b.trigger(l):"false"===g&&f>d&&b.trigger(k),j.matches?b.find(".n-banner-tabs li a i.icon").removeClass("icon-next").removeClass("icon-arrow").addClass("icon-next"):m&&b.find(".n-banner-tabs li a i.icon").removeClass("icon-next").removeClass("icon-arrow").addClass("icon-arrow")})}function c(a){var b=a.$banner,c=a.detach,d=b.find(".hidden-on-blue-detached"),e=b.find(".show-on-blue-detached"),f=b.find(".overflow-toggle-area-cover"),g=b.find(".n-banner-3rd-filler-dark");c?(d.hide(),e.show(),f.show(),g.hide()):(d.show(),e.hide(),f.hide(),"none"!==b.find(".filter-bar").css("display")&&g.show())}function d(){var b=a(this);b.attr("data-visual-break",!0),c({$banner:b,detach:!0});var d=b.find(".n-banner-2nd .rightmost-tab");d.removeClass("rightmost-tab").addClass("rightmost-tab-disabled");var e=b.find(p.DetachedNavLinks),f=b.find(p.DetachedNavDropdownLinks);f.find("li.dropdown").each(function(){b.addClass("n-dropdown-menu-item-has-child")}),f.find("ul.dropdown-menu").each(function(){b.addClass("n-dropdown-sub-menu")}),e.removeClass(p.navLinksAttatchedClass).addClass(p.navLinksDetachedClass),f.removeClass(p.navDropdownLinksAttatchedClass).addClass(p.navDropdownLinksDetachedClass);var g=b.find(p.DetachedNavLinksSubmenu);g.addClass("n-collapse-dropdown-sub-menu")}function e(){var b=a(this);b.attr("data-visual-break",!1),c({$banner:b,detach:!1});var d=b.find(".n-banner-2nd .rightmost-tab-disabled");d.removeClass("rightmost-tab-disabled").addClass("rightmost-tab");var e=b.find(p.attachNavLinks),f=b.find(p.attachNavDropdownLinks);f.find("li.dropdown").each(function(){b.removeClass("n-dropdown-menu-item-has-child")}),f.find("ul.dropdown-menu").each(function(){b.removeClass("n-dropdown-sub-menu")}),e.removeClass(p.navLinksDetachedClass).addClass(p.navLinksAttatchedClass),f.removeClass(p.navDropdownLinksDetachedClass).addClass(p.navDropdownLinksAttatchedClass);var g=b.find(p.attachNavLinksSubmenu);g.removeClass("n-collapse-dropdown-sub-menu")}var f=a(".n-banner-links-collapse"),g=a(".n-banner-tabs"),h={up:38,down:40,right:39,left:37,space:32,enter:13},i=992,j=window.matchMedia("(min-width:"+i+"px)"),k="n.banner.blue.block.detached",l="n.banner.blue.block.attached",m=a(".n-banner").length,n=m?".n-banner":".n-banner-noResponsive",o=a(m?".n-banner":".n-banner-noResponsive"),p={collapseDropdownMenu:".n-banner-links-collapse-dropdown-menu > .dropdown",collapseDropdownMenuChild:".n-banner-links-collapse-dropdown-menu > .dropdown .n-collapse-dropdown-sub-menu>li",bannerRightDropdown:".n-banner-links .dropdown",navSecondHoverItem:".nav-secondary-horizontal li",dropdownItemHasChild:".n-dropdown-menu-item-has-child",navLinksDetachedClass:"dropdown-menu n-banner-links-collapse-dropdown-menu",navLinksAttatchedClass:"nav n-banner-nav n-banner-links",navDropdownLinksDetachedClass:"dropdown-menu n-banner-dropdown-links-collapse-dropdown-menu",navDropdownLinksAttatchedClass:"nav n-banner-nav n-banner-dropdown-links",navDropDowns:".n-banner li.dropdown",attachNavLinks:".n-banner-2nd .n-banner-links-collapse-dropdown-menu",attachNavDropdownLinks:".n-banner-2nd .n-banner-dropdown-links-collapse-dropdown-menu",attachNavLinksSubmenu:".n-banner-2nd .n-banner-links-collapse .dropdown .dropdown-menu.n-collapse-dropdown-sub-menu",DetachedNavLinks:".n-banner-2nd .n-banner-links",DetachedNavDropdownLinks:".n-banner-2nd .n-banner-dropdown-links",DetachedNavLinksSubmenu:".n-banner-2nd .n-banner-links-collapse .dropdown .dropdown-menu"},q=function(a){a.css("left","auto"),a.removeClass("open"),a.siblings("a").removeClass("n-dropdown-sub-menu-parent-active")},r=function(b){var c=b.parent("ul").innerWidth(),d=b.children(".n-dropdown-sub-menu");j.matches&&(c<b.closest(n).width()-b.offset().left?d.css("left",c+"px"):d.css("left","-"+d.innerWidth()+"px")),m||(c<b.closest(n).width()-b.offset().left?d.css("left",c+"px"):d.css("left","-"+d.innerWidth()+"px")),q(b.siblings("li.n-dropdown-menu-item-has-child").children(".n-dropdown-sub-menu.open")),j.matches?(d.addClass("open"),b.children("a").addClass("n-dropdown-sub-menu-parent-active")):b.children(".n-dropdown-sub-menu").toggle(function(){a(this).removeClass("open"),b.children("a").remove("n-dropdown-sub-menu-parent-active")},function(){a(this).addClass("open"),b.children("a").addClass("n-dropdown-sub-menu-parent-active")})},s=function(a,b){a.siblings("li").children("a").blur();var c=b?a.prev("li"):a.next("li");0===c.length&&(c=b?a.parent().children("li").last():a.parent().children("li").first()),c.children("a").focus()},t=function(a){!j.matches&&m&&(a.siblings().removeClass("open"),a.siblings().children("a").removeClass("n-dropdown-sub-menu-parent-active"));var b=a.parent("ul").innerWidth(),c=a.children(".n-collapse-dropdown-sub-menu");if(b<a.closest(n).width()-a.offset().left)c.css("left",b+"px");else{var d=c.innerWidth()+2;c.css("left","-"+d+"px")}a.addClass("open"),a.children("a").eq(0).addClass("n-dropdown-sub-menu-parent-active")},u=function(a){a.children(".n-collapse-dropdown-sub-menu").css("left","auto"),a.removeClass("open"),a.children("a").eq(0).removeClass("n-dropdown-sub-menu-parent-active")},v=function(){var b=a(this).find("div");if(b.hasClass("n-banner-overflow-control")||(a(".n-banner-3rd-filler-gray").hide(),a(".n-banner-3rd").find(".n_banner_3rd_subItem").hide()),a(this).hasClass("n-banner-3Link")){var c=a(this).find("a").data("item");j.matches&&a(".n-banner-3rd-filler-gray").show(),m||a(".n-banner-3rd-filler-gray").show(),a(".n-banner-3rd").show(),a("#"+c).show()}},w=function(a){var b=a.closest("li");b.siblings("li").removeClass("active"),b.addClass("active");var c=b.closest(".n-banner-tabs").siblings(".n-banner-2nd-gray-to-blue");c.length>0&&(b.hasClass("rightmost-tab")?c.addClass("active"):c.removeClass("active"))};o.on(k,d).on(l,e),g.on("mouseover touchstart",p.dropdownItemHasChild,function(b){b.stopPropagation(),b.preventDefault(),r(a(this))}),g.on("mouseleave",p.dropdownItemHasChild,function(b){j.matches&&q(a(this).children(".n-dropdown-sub-menu")),m||q(a(this).children(".n-dropdown-sub-menu")),b.stopPropagation()}),g.on("keydown",p.dropdownItemHasChild,function(b){if(b.keyCode===h.right||b.keyCode===h.space||b.keyCode===h.enter){var c=a(this).children(".n-dropdown-sub-menu");c.hasClass("open")||(r(a(this)),a(this).blur(),c.children("li").first().children("a").focus())}}),g.on("click",".n-banner-dropdown-toggle",function(){var b=b||a(".n-dropdown-sub-menu.open");0!==b.length&&(b.removeClass("open"),b.siblings("a").removeClass("n-dropdown-sub-menu-parent-active"))}),g.on("click",".dropdown-menu>li",function(){a(this).parent().hasClass("open")||a(this).closest(".dropdown").find("a").first().focus()}),g.on("keydown",".n-dropdown-sub-menu>li",function(b){if(b.stopPropagation(),b.keyCode===h.up)s(a(this),!0),b.preventDefault();else if(b.keyCode===h.down)s(a(this),!1),b.preventDefault();else if(b.keyCode===h.left){var c=a(this).parent(".n-dropdown-sub-menu");q(c),c.prev("a").focus()}}),g.on("keydown",">li>a",function(b){(b.keyCode===h.space||b.keyCode===h.enter)&&w(a(this))}),g.on("keydown","li",function(b){if(b.keyCode===h.space||b.keyCode===h.enter){b.preventDefault(),b.stopPropagation();var c=a(this).hasClass("n-dropdown-menu-item-has-child");c||a(b.target)[0].click(),v.call(this)}}),a(document).on("click.bs.dropdown.data-api",function(){var b=b||a(".n-dropdown-sub-menu.open");0!==b.length&&(b.removeClass("open"),b.siblings("a").removeClass("n-dropdown-sub-menu-parent-active"))}),a(p.navDropDowns).on("click",function(){var b=b||a(".n-dropdown-sub-menu.open");0!==b.length&&(b.removeClass("open"),b.siblings("a").removeClass("n-dropdown-sub-menu-parent-active"))}),a(document).on("click",p.navSecondHoverItem,function(){var b=a(this);a(p.navSecondHoverItem).removeClass("selected"),b.hasClass("selected")||b.addClass("selected")}),a(document).on("scroll",function(){a(this).scrollTop()?a(".n-banner-secondary-row").addClass("n-banner-secondary-row-scrolled"):a(".n-banner-secondary-row").removeClass("n-banner-secondary-row-scrolled")}),a(document).on("show.bs.dropdown",p.bannerRightDropdown,function(){a(this).offset().left+a(this).children("ul").eq(0).width()>a(window).width()?a(this).addClass("pull-right"):a(this).removeClass("pull-right")}),g.on("click",">li",function(){w(a(this)),v.call(this)}),a("a").blur(function(b){var c=a(b.target||b.srcElement),d=a(c.closest("li.dropdown"));d.length>0&&d.hasClass("open")&&setTimeout(function(){if(0===d.find("ul li a:focus").length){var b=a(d).find("a").first();a(b).is(":focus")||(q(d),a(d).find("a").first().attr("aria-expanded","false"))}},50)}),a(".n_banner_3rd_subItem").on("focus",">li>a",function(){var b=a(this),c=b.closest("li");c.siblings("li").removeClass("active"),c.addClass("active")}),f.on("mouseover touchstart",p.collapseDropdownMenu,function(b){b.stopPropagation(),b.preventDefault(),t(a(this))}),f.on("mouseleave",p.collapseDropdownMenu,function(){u(a(this))});var x=function(b){u(a(b.closest(".dropdown")))};f.on("click touchstart",p.collapseDropdownMenuChild,function(b){!j.matches&&m&&(b.stopPropagation(),b.preventDefault(),x(a(this)))}),a(window).resize(b),a.fn.extend({triggerCollapseBanner:b}),a(function(){a(this).triggerCollapseBanner()}),a(document).on("keydown.wf.banner.keyboard",".n-banner-tabs li, .n-banner-links li, .n_banner_3rd_subItem li",a.wfKBCore.commonKeyboardHandler),a(document).on("click",function(b){a("li.selected").each(function(c,d){d&&!d.contains(b.target)&&a(".local-navigation .nav-secondary-horizontal li").removeClass("selected")})}),a(document).on("keydown",".nav-secondary-horizontal li",function(b){b.keyCode===h.space||b.keyCode===h.enter?(b.preventDefault(),b.stopPropagation(),a(b.target)[0].click()):b.keyCode===h.left?a(this).prev().children("a").focus():b.keyCode===h.right&&a(this).next().children("a").focus()})});