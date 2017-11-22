/*!
 * WULF v1.2.39 (http://wulf-demo.dynamic.nsn-net.net/)
 * Copyright © 2016-2017 Nokia. All rights Reserved.
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery","./keyboard/keyboard-core","./keyboard/keyboard-grid","./tabbable","jqxcore","jqxdata","jqxbuttons","jqxscrollbar","jqxmenu","jqxcheckbox","jqxlistbox","jqxdropdownlist","jqxgrid","jqxgrid.filter","jqxgrid.pager","jqxgrid.sort","jqxgrid.storage","jqxgrid.edit","jqxgrid.selection","jqxgrid.columnsresize","jqxgrid.columnsreorder","jqxdata.export","jqxgrid.export","jqxpanel","jqxcombobox"],a):"object"==typeof module&&module.exports?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c,require("./keyboard/keyboard-core"),require("./keyboard/keyboard-grid"),require("jqwidgets-framework/jqwidgets/jqx-all")),c}:a(jQuery)}(function(a){"use strict";function b(){s.each(function(){var b=a(this).find("div[id^=verticalScrollBar]").first(),c=a(this).find("div[id^=horizontalScrollBar]").first();b.css("max-height","none"),c.length>0?b.css("max-height",b.outerHeight()-39+"px"):b.css("max-height",b.outerHeight()-26+"px");var d=a(this).find("div[id^=jqxScrollThumbverticalScrollBar]").first();d.css("max-height","none"),d.css("max-height",d.height()-26+"px")})}function c(){var b=a(this).attr("aria-sort");if(""!==b&&void 0!==b){var c=a(this).children("div").children("div")[0],d=a(c).css("text-align");"right"!==d||"ascending"!==b&&"descending"!==b?a(c).css("padding-right","8px"):a(c).css("padding-right","18px")}}function d(b,c,d){var e=a("#"+d+" #n-row-indicated-"+b),f=e.attr("changed-col");void 0===f&&(f=""),-1===f.indexOf(c)&&(f+=c,e.attr("changed-col",f))}function e(b,c,d){var e=a("#"+d+" #n-row-indicated-"+b),f=e.attr("changed-col");void 0===f&&(f=""),f=f.replace(c,""),e.attr("changed-col",f);var g=e.attr("changed-col");void 0!==g&&""===g.replace("editorId","")&&a("#"+d+" #n-row-indicated-"+b+" > span").removeClass("icon-edited-white")}function f(b){var c=b.parent().attr("id").replace("contenttable",""),d=b.attr("id").replace("customeditor"+c,""),e=d.substring(0,d.indexOf("_")),f=a("#"+c).jqxGrid("getcolumnproperty",e,"indicator");return void 0===f&&(f=!1),f}function g(b,c,d,e){var f=c.closest(".jqx-grid"),g=f.jqxGrid("getrowdata",d);c.parent().attr("id").replace("contenttable","");var h=a(f).jqxGrid("getrowid",d);g[e]!==b&&(g[e]=b,a(f).jqxGrid("updaterow",h,g))}function h(b,c,d){if(9===b.which){b.preventDefault(),b.stopPropagation();var e=c.closest(".jqx-grid"),f=c.attr("id"),g=f.split("_")[0];g=g.replace("customeditor"+e.attr("id"),"");var h=e.jqxGrid("getcolumnindex",g),i=e.jqxGrid("getrowdata",d),j=[];a.each(i,function(a){j.push(a)}),e.jqxGrid("selectcell",d,j[h+1])}}function i(a,b){return a===b||a==="wrapper"+b||a==="content"+b}function j(a,b){return a.find(".icon-close-rounded").parent("a").get(0)===b.get(0)}function k(a,b,c){return a.find(".jqx-grid-header :tabbable"+c).get(0)===b.get(0)}function l(a){return a.find(".icon-close-rounded").parent("a").length>0?(a.find(".icon-close-rounded").parent("a").focus(),a.jqxGrid("clearselection"),!0):!1}function m(a,b){return a.find(".jqx-grid-header :tabbable").length>0?(a.find(".jqx-grid-header :tabbable"+b).focus(),a.jqxGrid("clearselection"),!0):!1}function n(a){if(a.jqxGrid("focus"),null===a.jqxGrid("getselectedcell")&&-1===a.jqxGrid("getselectedrowindex")){var b=a.jqxGrid("columns").records[0].datafield;a.jqxGrid("selectcell",0,b),a.jqxGrid("selectrow",0)}}function o(b,c){var d=a(b.target).attr("id"),e=c.attr("id");if(i(d,e)){if(l(c)||m(c,":last"))return void 0}else if(j(c,a(b.target))){if(m(c,":last"))return void 0;c.focus()}var f=a.getPrevTabbale();return d=f.attr("id"),i(d,e)&&(f.closest(".jqx-grid").focus(),f=a.getPrevTabbale()),f}function p(b,c){var d=c.attr("id");if(k(c,a(b.target),":last"))return l(c)?void 0:void n(c);if(j(c,a(b.target)))return void n(c);var e=a.getNextTabbale(),f=e.attr("id");return i(f,d)&&(e.focus(),e=a.getNextTabbale()),k(c,e,":first")&&(c.find(".jqx-grid-header :tabbable:last").get(0).focus(),e=a.getNextTabbale()),j(c,e)&&(e.focus(),e=a.getNextTabbale()),e}function q(a){var b=a.closest(".jqx-grid"),c=a.attr("id"),d=b.attr("id");return b.length<1?(a.focus(),!0):void(i(c,d)||j(b,a)||k(b,a,":last")?n(b):a.focus())}function r(a){var b=a.closest(".jqx-grid"),c=a.attr("id"),d=b.attr("id");return b.length<1?(a.focus(),!0):void(i(c,d)?m(b,":first")||l(b)||n(b):a.focus())}jQuery.browser={},jQuery.browser.mozilla=/mozilla/.test(navigator.userAgent.toLowerCase())&&!/webkit/.test(navigator.userAgent.toLowerCase()),jQuery.browser.webkit=/webkit/.test(navigator.userAgent.toLowerCase()),jQuery.browser.opera=/opera/.test(navigator.userAgent.toLowerCase()),jQuery.browser.msie=/msie/.test(navigator.userAgent.toLowerCase());var s=a(".n-jqxgrid-table");a.grid={nTextFieldCellRenderer:function(b,c,d){var e=a(this.element).closest(".jqx-grid").attr("id"),f=a("#"+e).jqxGrid("disabled");return f?'<input class="n-inputfield n-inputfield-small" value="'+d+'" tabindex="-1" disabled/>':'<input class="n-inputfield n-inputfield-small" value="'+d+'" tabindex="-1"/>'},nCreateTextFieldEditor:function(b,c,d){var e=a('<input class="n-inputfield n-inputfield-small" />');d.append(e),d.on("keydown",function(c){h(c,a(this),b)})},nInitTextFieldEditor:function(a,b,c){var d=c.find("input");d.val(b),setTimeout(function(){d.focus()},50)},nGetTextFieldEditorValue:function(a,b,c){return c.find("input").val()},nIndicatorTextFieldCellRenderer:function(b){return function(c,d,e){var f="";return a(b+" .n-grid-inputfield-indicated").each(function(){var b=!1,g=a(this).parent().attr("id");void 0!==g&&g.indexOf(d+"_"+c)>=0&&(b=!0),a(this).find("input").val()===e&&b&&a(this).find(".icon").hasClass("icon-edited-small")&&(f="icon-edited-small")}),'<div class="n-grid-inputfield-indicated"><input class="n-inputfield n-inputfield-small" value="'+e+'" tabindex="-1"><a class="form-control-feedback"><span class="icon '+f+'"></span></a></div>'}},nCreateIndicatorTextFieldEditor:function(b,c,g){var i=g.parent().attr("id").replace("contenttable",""),j=f(g),k='<div class="n-grid-inputfield-indicated"><input class="n-inputfield n-inputfield-small"/><a class="form-control-feedback"><span class="icon"></span></a></div>';g.append(k);var l=g.attr("id"),m=g.find("input");m.bind("input",function(){m.val()!==c?(j&&g.find(".icon").addClass("icon-edited-small"),a("#"+i+" #n-row-indicated-"+b+" > span").addClass("icon-edited-white"),d(b,l,i)):(g.find(".icon").removeClass("icon-edited-small"),e(b,l,i))}),g.on("keydown",function(c){h(c,a(this),b)})},nInitIndicatorTextFieldEditor:function(b){var c=b;return function(b,d,e){var f=e.find("input");f.val(d),f.focus(),e.on("change",function(){var d=e.find("input").val();g(d,a(this),b,c)})}},nGetIndicatorTextFieldEditorValue:function(a,b,c){return c.find("input").val()},nStringCellRenderer:function(a,b,c,d){var e=d;return-1!==c.indexOf("#errordata#")&&(e=e.replace('class="','class="n-cell-error '),e=e.replace("#errordata#","")),e},nNumberCellRenderer:function(a,b,c,d){var e=c.toString(),f=d;return 0===e.indexOf("((")&&e.indexOf("))")===e.length-2&&(f=f.replace('class="','class="n-cell-error '),f=f.replace("((",""),f=f.replace("))","")),f},nCheckboxCellsrenderer:function(b){var c=b;return function(b,d,e){var f=a(this.element).closest(".jqx-grid").attr("id"),g=a("#"+f).jqxGrid("disabled"),h="cb"+b+Date.now();return'<div class="n-checkbox checkbox checkbox-small"><input id="'+h+'" type="checkbox" '+(e?' checked="true"':"")+' tabindex="-1" '+(g?" disabled ":"")+'/><label for="'+h+'">'+c+"</label></div>"}},nCreateCheckboxEditor:function(b){var c=b;return function(b,d,e){var f="cb"+b+Date.now(),g=d?' checked="true"':"",i='<div class="n-checkbox checkbox checkbox-small margin-add-one"><input id="'+f+'" type="checkbox" '+g+'/><label for="'+f+'">'+c+"</label></div>";e.append(i),e.on("keydown",function(c){h(c,a(this),b)})}},nInitCheckboxEditor:function(a,b,c){var d=c.find("input"),e=d.prop("checked");d.prop({checked:!e}),d.prop("checked"),d.focus()},nGetCheckboxEditorValue:function(a,b,c){var d=c.find("input");return d.prop("checked")},nIndicatorCheckboxCellsrenderer:function(b,c){var d=c;return function(c,e,f){var g="",h="";a(b+" .grid-checkbox-indicated").each(function(){var b=!1,d=a(this).parent().attr("id");void 0!==d&&d.indexOf(e+"_"+c)>=0&&(b=!0),b&&(a(this).find(".icon").hasClass("icon-edited-small")&&(g="icon-edited-small"),a(this).find(".icon").hasClass("icon-edited-small-white")&&(g="icon-edited-small-white"),h=a(this).find("input").attr("orignal-value"))});var i="cb"+c+Date.now();return'<div id="indicator-checkbox-'+c+'" class="n-checkbox checkbox checkbox-small grid-checkbox-indicated"><input id="'+i+'" type="checkbox" '+(f?' checked="true"':"")+' orignal-value="'+h+'" tabindex="-1"/><label for="'+i+'">'+d+'</label><span class="icon align-right '+g+'"></span></div>'}},nCreateIndicatorCheckboxEditor:function(b){var c=b;return function(b,d,e){var f="cb"+b+Date.now(),g=d?' checked="true"':"",i='<div id="indicator-checkbox-'+b+'" class="n-checkbox checkbox checkbox-small margin-add-one grid-checkbox-indicated"><input id="'+f+'" type="checkbox" '+g+' orignal-value="'+d+'"/><label for="'+f+'">'+c+'</label><span class="icon align-right editor"></span></div>';e.append(i),e.on("keydown",function(c){h(c,a(this),b)})}},nInitIndicatorCheckboxEditor:function(b){var c=b,h=0;return function(b,i,j){if(h++)return void(h=0);var k=j.parent().attr("id").replace("contenttable",""),l=f(j),m=j.find("input"),n=m.prop("checked");m.prop({checked:!n}),g(m.prop("checked"),j,b,c),m.prop("checked"),m.focus();var o=j.attr("id");n.toString()===m.attr("orignal-value")?(l&&j.find(".icon").addClass("icon-edited-small-white"),a("#"+k+" #n-row-indicated-"+b+" > span").addClass("icon-edited-white"),d(b,o,k)):(j.find(".icon").removeClass("icon-edited-small-white"),e(b,o,k)),m.change(function(){m.prop("checked").toString()===m.attr("orignal-value")?(j.find(".icon").removeClass("icon-edited-small-white"),e(b,o,k)):(l&&j.find(".icon").addClass("icon-edited-small-white"),a("#"+k+" #n-row-indicated-"+b+" > span").addClass("icon-edited-white"),d(b,o,k))}),j.on("change",function(){var d=m.prop("checked");g(d,a(this),b,c)})}},nGetIndicatorCheckboxEditorValue:function(a,b,c){var d=c.find("input");return d.prop("checked")},dropdownlistCellsrenderer:function(b,c,d){var e=a(this.element).closest(".jqx-grid").attr("id"),f=a("#"+e).jqxGrid("disabled");return'<div class="btn-group selectlist selectlist-small selectlist-resize'+(f?' disabled"':'"')+'data-resize="none" data-initialize="selectlist"><button class="btn btn-default dropdown-toggle'+(f?' disabled"':'"')+'data-toggle="dropdown" type="button" tabindex="-1"'+(f?" disabled":"")+'><span class="selected-label">'+d+'</span><span class="selected-caret" ><span class="caret"></span></span></button><ul class="dropdown-menu" role="menu"><li data-value="1"><a href="#"><span>'+d+"</span></a></li></ul></div>"},dropdownlistEditor:function(b){var c=b;return function(b,d,e,f,g){e.jqxDropDownList({autoDropDownHeight:!1,itemHeight:27,dropDownHeight:"150px",scrollBarSize:8,width:g-4,height:24,source:c.map(function(a){return"<span>"+a+"</span>"})}),e.on("keydown",function(c){h(c,a(this),b)})}},dropdownlistInitEditor:function(b){return function(c,d,e){e.jqxDropDownList("selectItem","<span>"+d+"</span>"),e.jqxDropDownList("focus"),e.jqxDropDownList("open"),e.on("select",function(d){var e=d.args.item.value;g(a(e).html(),a(this),c,b)})}},dropdownlistEditorValue:function(b,c,d){return a(d.val()).html()},indicatorDropdownlistCellsrenderer:function(b){return function(c,d,e){var f="";return a(b+" .grid-selectlist-indicated").each(function(){var b=!1,e=a(this).parent().attr("id");void 0!==e&&e.indexOf(d+"_"+c)>=0&&(b=!0),b&&a(this).find(".icon").hasClass("icon-edited-small")&&(f="icon-edited-small")}),'<div class="btn-group selectlist selectlist-small selectlist-resize selectlist-indicated" data-resize="none" data-initialize="selectlist" id="mySelectlist'+c+'"><button class="btn btn-default dropdown-toggle" data-toggle="dropdown" type="button" tabindex="-1"><span class="selected-label">'+e+'</span><span class="selected-caret" ><span class="caret"></span></span></button><ul class="dropdown-menu" role="menu"><li data-value="1"><a href="#"><span>'+e+'</span></a></li></ul><a class="form-control-feedback"><span class="icon '+f+'"></span></a></div>'}},indicatorDropdownlistEditor:function(b){var c=b;return function(b,g,i,j,k){var l=i.parent().attr("id").replace("contenttable",""),m=f(i),n=i.attr("id");i.jqxDropDownList({autoDropDownHeight:!1,itemHeight:27,dropDownHeight:"150px",scrollBarSize:8,width:k-4,height:24,source:c.map(function(a){return"<span>"+a+"</span>"}),selectionRenderer:function(){var c=i.jqxDropDownList("getSelectedItem");return null!==c?c.value.indexOf(j)>=0?(e(b,n,l),c.value):(d(b,n,l),a("#"+l+" #n-row-indicated-"+b+" > span").addClass("icon-edited-white"),m?c.value+'<div class="grid-selectlist-indicated"><a class="form-control-feedback"><span class="icon icon-edited-small"></span></a></div>':c.value):void 0}}),i.on("keydown",function(c){h(c,a(this),b)})}},indicatorDropdownlistInitEditor:function(b){return function(c,d,e){e.jqxDropDownList("selectItem","<span>"+d+"</span>"),e.jqxDropDownList("focus"),e.jqxDropDownList("open"),e.on("select",function(d){var e=d.args.item.value;g(a(e).html(),a(this),c,b)})}},indicatorDropdownlistEditorValue:function(b,c,d){return a(d.val()).html()},indicatorRenderer:function(b){return function(c){var d="";a(b+" #n-row-indicated-"+c+" > span").hasClass("icon-edited")&&(d="icon-edited"),a(b+" #n-row-indicated-"+c+" > span").hasClass("icon-edited-white")&&(d="icon-edited-white");var e=a(b+" #n-row-indicated-"+c).attr("changed-col");return void 0===e&&(e=""),'<div id="n-row-indicated-'+c+'" class="n-row-indicated text-center" changed-col="'+e+'"><span class="icon '+d+'"></span></div>'}},indicatorRowSelectRenderer:function(b){var c=a(b);c.bind("rowselect",function(c){var d=c.args.rowindex;a(b+" .n-row-indicated").each(function(){var b=a(this).find("span");b.hasClass("icon-edited-white")&&(b.removeClass("icon-edited-white"),b.addClass("icon-edited"))}),a(b+" #n-row-indicated-"+d+" > span").hasClass("icon-edited")&&(a(b+" #n-row-indicated-"+d+" > span").removeClass("icon-edited"),a(b+" #n-row-indicated-"+d+" > span").addClass("icon-edited-white")),a(b+" .grid-checkbox-indicated").each(function(){var b=a(this).attr("id"),c=a(this).find("span");-1===b.indexOf(d,b.length-d.length)?c.hasClass("icon-edited-small-white")&&(c.removeClass("icon-edited-small-white"),c.addClass("icon-edited-small")):c.hasClass("icon-edited-small")&&(c.removeClass("icon-edited-small"),c.addClass("icon-edited-small-white"))})})},dropdownFilterRender:function(a,b,c){c.jqxDropDownList({scrollBarSize:8,placeHolder:"No filter",filterable:!0,filterPlaceHolder:"Filter",searchMode:"containsignorecase",renderer:function(a,b){return"<span>"+b+"</span>"}}),b.keydown(function(a){32===a.keyCode&&a.preventDefault()})},dropdownFilterString:{filterchoosestring:"No filter"},updatePageInfor:function(b,c,d){var e=a(b).find(".n-table-paging-left .n-table-data-total");if(e.text("Total: "+c),d){var f=a(b).find(".pageField span").get(1);a(f).html("/ "+d)}},pagerrenderer:function(c,d,e){function f(){k.on("filter",function(){var c=k.jqxGrid("getrows"),d=k.jqxGrid("getboundrows"),e=k.find(".n-table-paging-left");d.length===c.length?(e.removeClass("has-filter"),e.addClass("no-filter")):(e.removeClass("no-filter"),e.addClass("has-filter"),a(e).find(".n-table-filter-result span").html(c.length)),setTimeout(b,50)})}function g(){var b=a('<span class="n-table-paging-left no-filter"><span class="icon icon-filter"></span><span class="n-table-filter-result">Results: <span></span></span><span class=\'n-table-data-total\'>Total: '+m.rowscount+"</span></span>");b.appendTo(l)}function h(){var b=a("<span class=\"n-table-paging-left\"><span class='n-table-data-total'>Total:"+m.rowscount+"</span></span>");b.appendTo(l)}function i(){function c(){1===parseInt(i.val())?(f.prop("disabled",!0),g.prop("disabled",!0)):(f.prop("disabled",!1),g.prop("disabled",!1)),parseInt(i.val())===o?(m.prop("disabled",!0),j.prop("disabled",!0)):(m.prop("disabled",!1),j.prop("disabled",!1))}function d(a){var b=parseInt(a)-1;k.jqxGrid("gotopage",b)}var e=a('<div class="n-table-paging-middle"></div>'),f=a('<button class="btn btn-icon page-first" type="button" aria-label="first page"><span class="icon icon-first"></span></button>'),g=a('<button class="btn btn-icon page-prev" type="button" aria-label="previous page"><span class="icon icon-back"></span></button>'),h=a("<div class='pageField'></div>"),i=a('<input type="text" class="n-inputfield n-inputfield-small" />');a("<span>Page</span>").appendTo(h),i.appendTo(h),a("<span>/ "+o+"</span>").appendTo(h);var j=a('<button class="btn btn-icon page-next" type="button" aria-label="next page"><span class="icon icon-next"></span></button>'),m=a('<button class="btn btn-icon page-last" type="button" aria-label="last page"><span class="icon icon-last"></span></button>');f.appendTo(e),g.appendTo(e),h.appendTo(e),j.appendTo(e),m.appendTo(e),e.appendTo(l),i.val(parseInt(n.pagenum)+1),c(),f.on("click",function(){k.jqxGrid("gotopage",0),setTimeout(b,50)}),f.off("keydown").on("keydown",function(b){if(9===b.which&&b.shiftKey){b.preventDefault();var c=a(this).closest(".jqx-widget-content").attr("id");a("#wrapper"+c).trigger("focus")}}),g.off("click").on("click",function(){k.jqxGrid("gotoprevpage"),setTimeout(b,50)}),j.off("click").on("click",function(){k.jqxGrid("gotonextpage"),setTimeout(b,50)}),m.off("click").on("click",function(){k.jqxGrid("gotopage",o),setTimeout(b,50)}),i.off("change").on("change",function(){d(a(this).val()),setTimeout(b,50)}),i.off("keydown").on("keydown",function(a){13===a.keyCode&&d(i.val())}),k.off("pagechanged").on("pagechanged",function(){var a=k.jqxGrid("getdatainformation"),d=a.paginginformation;i.val(parseInt(d.pagenum)+1),setTimeout(b,50),c()})}function j(d){var e=a("<div class='n-table-paging-right'></div>"),f=a('<div id="'+c+'jqxPerPageCombo"></div>'),g=k.jqxGrid("pagesize"),h=[10,20,30];void 0!==d&&(h=d);var i=h.indexOf(g);f.jqxComboBox({source:h,width:60,height:24,selectedIndex:i,autoDropDownHeight:!0,enableBrowserBoundsDetection:!0,renderer:function(a,b){return"<span>"+b+"</span>"}}),f.appendTo(e),a("<span>Items per page</span>").appendTo(e),e.appendTo(l),f.on("open",function(){a("div[id^='dropdownlistContent'] > input").attr("readonly","readonly")}),f.off("change").on("change",function(a){var c=a.args;c&&k.jqxGrid("pagesize",c.item.originalItem),setTimeout(b,50)})}var k=a(c),l=a('<div class="page-container"></div>'),m=k.jqxGrid("getdatainformation"),n=m.paginginformation,o=n.pagescount;if(d)g(),f(),i(),j(e);else{var p=k.jqxGrid("filterable");p?(g(),f()):(h(),i(),j(e))}return l},handlekeyboardnavigation:function(b){var c=a(":focus");if(a(b.target).is("body")&&void 0===c.get(0)||c.get(0)===b.target){var d="";if(d=b.charCode?b.charCode:b.keyCode?b.keyCode:0,9===d){var e,f=a(b.target).closest(".jqx-grid");if(b.shiftKey){if(f.length>0){if(e=o(b,f),!e)return!0;f.jqxGrid("clearselection")}else e=a.getPrevTabbale();q(e)}else{if(f.length>0){if(e=p(b,f),!e)return!0;f.jqxGrid("clearselection")}else e=a.getNextTabbale();r(e)}return!0}}},enableErrorHeaderRow:function(b){setTimeout(function(){for(var c="#"+b,d=0,e=a(c).jqxGrid("getrows"),f=a(c).jqxGrid("columns").records,g=0;g<e.length;g++)for(var h=0;h<f.length;h++){var i=f[h].datafield,j=e[g][i].toString();(-1!==j.indexOf("#errordata#")&&"textbox"===f[h].columntype||"NumberInput"===f[h].columntype&&0===j.indexOf("((")&&j.indexOf("))")===j.length-2)&&(d+=1)}var k=a(c).find(".jqx-grid-header");k.children().after('<div class="grid-error-header"><span><span class="icon icon-error"></span>There are '+d+" errors in this table.</span></div>"),k.css("height","50px"),k.children().css("height","50%"),k.after('<div class="grid-error-header-icon"><a href="#"><span class="icon icon-close-rounded"></span></a></div>'),a(".icon-close-rounded").parent("a").on("click",function(){var b=a(c).find(".jqx-grid-header");b.css("height","25px"),b.children().css("height","100%"),a(c).find(".grid-error-header").css("display","none"),a(c).jqxGrid("render")})},50)},enableHeadErrorIndicator:function(b){setTimeout(function(){for(var c="#"+b,d=a(c).jqxGrid("getrows"),e=a(c).jqxGrid("columns").records,f=[],g=0;g<e.length;g++)f[g]=0;for(var h=0;h<d.length;h++)for(var i=0;i<e.length;i++){var j=e[i].datafield,k=d[h][j].toString();(-1!==k.indexOf("#errordata#")&&"textbox"===e[i].columntype||"NumberInput"===e[i].columntype&&0===k.indexOf("((")&&k.indexOf("))")===k.length-2)&&(f[i]=f[i]+1)}for(var l=a(c).find(".jqx-grid-column-header").length,m=0;l>m;m++){var n=f[m];n>0&&a(c).find(".jqx-grid-column-header").eq(m).find("span").after('<span class="icon text-center n-error-indicator">'+n+"</span>")}},50)},nDeleteButtonOnCellRenderer:function(a,b,c){return'<div class="n-cell-icon-container"><button type="button" class="n-cell-icon n-cell-icon-control n-del-row-btn" tabindex="-1" data-row-index="'+a+'"><span class="icon '+c+'"></span></button></div>'},nAddRows:function(c,d){c.jqxGrid("beginupdate"),c.jqxGrid("addrow",null,d),setTimeout(b,50);var e=c.jqxGrid("getdatainformation"),f=e.rowscount,g=e.paginginformation.pagescount;a.grid.updatePageInfor(c,f,g),c.jqxGrid("endupdate")},nAddRow:function(c,d){c.jqxGrid("beginupdate"),c.jqxGrid("addrow",null,d),setTimeout(b,50);for(var e=c.jqxGrid("getdatainformation"),f=e.rowscount,g=e.paginginformation.pagescount,h=c.jqxGrid("getselectedrowindexes"),i=h?[].concat(h):[],j=0;j<i.length;j++){var k=i[i.length-j-1],l=c.jqxGrid("getrowboundindex",k);c.jqxGrid("unselectrow",l)}c.jqxGrid("endupdate"),c.jqxGrid("selectrow",f-1),c.jqxGrid("ensurerowvisible",f-1),a.grid.updatePageInfor(c,f,g)},nDelRow:function(c){var d=c.jqxGrid("getselectedrowindexes"),e=c.jqxGrid("getdatainformation").rowscount;c.jqxGrid("beginupdate"),d.sort(function(a,b){return a-b});var f,g=d?[].concat(d):[];f=g[g.length-1]+1<e?g[g.length-1]-g.length+1:g[g.length-1]-g.length;for(var h=0;h<g.length;h++){var i=g[g.length-h-1];if(i>=0&&e>i){var j=c.jqxGrid("getrowid",i);c.jqxGrid("deleterow",j)}}setTimeout(b,10);var k=c.jqxGrid("getrowboundindex",f);c.jqxGrid("endupdate"),c.jqxGrid("selectrow",k),c.jqxGrid("ensurerowvisible",k);var l=c.jqxGrid("getdatainformation").paginginformation.pagescount;a.grid.updatePageInfor(c,e-g.length,l)},nEnableDeleteButtonOnCell:function(c){c.on("click",".n-del-row-btn",function(){c.jqxGrid("beginupdate");var d,e=c.jqxGrid("getselectedrowindex"),f=c.jqxGrid("getdatainformation").rowscount;if(d=f>e+1?e:e-1,e>=0&&f>e){var g=c.jqxGrid("getrowid",e);c.jqxGrid("deleterow",g),a.grid.updatePageInfor(c,f-1)}var h=c.jqxGrid("getrowboundindex",d);setTimeout(b,10),c.jqxGrid("endupdate"),c.jqxGrid("selectrow",h),c.jqxGrid("ensurerowvisible",h)})}},s.on("bindingcomplete",function(){if(a(this).find("div[id^=verticalScrollBar]").first().before('<div class="n-extra-scrollbar-div"></div>'),a(this).jqxGrid({rendered:function(){setTimeout(b,50)}}),a(this).find(".jqx-scrollbar").first().jqxScrollBar({thumbMinSize:50}),a.browser.mozilla){var c=a(this).find("div[id^=content].jqx-overflow-hidden");c.css("height","none"),c.css("height",c.height()-1+"px")}setTimeout(b,50)}),s.on("filter",function(){setTimeout(b,50)}),a(document).ready(function(){setTimeout(function(){for(var b=a(".jqx-grid-column-header"),d=0;d<b.length;d++)b[d].onclick=c;a(".jqx-grid").each(function(){a(this).on("cellselect",function(b){var c=a(this).attr("id"),d=a(document.activeElement),e=d.parent().attr("id");"checkbox"===d.attr("type")&&(e=d.parent().parent().attr("id"));var f=b.args.datafield,g=b.args.rowindex;if(void 0!==e&&"customeditor"+c+f+"_"+g!==e){e=e.replace("customeditor"+c,"");var h=e.split("_");a(this).jqxGrid("endcelledit",h[1],h[0])}}),a(this).attr("tabindex","0")}),a(".jqx-grid-cell-filter-row .jqx-dropdownlist-state-normal").on("keydown",function(b){if(32===b.which){var c=a(this).jqxDropDownList("isOpened");c?a(this).jqxDropDownList("close"):a(this).jqxDropDownList("open")}})},50)}),void 0!==a.jqx&&a.jqx.init({scrollBarButtonsVisibility:"hidden"}),a(document).on("keydown.wf.grid.keyboard",".grid-error-header-icon",a.wfKBCore.commonKeyboardHandler).on("focusin.wf.grid.keyboard",".jqx-widget-content",a.wfKBGrid.gridFocusinHandler)});