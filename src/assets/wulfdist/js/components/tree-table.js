/*!
 * WULF v1.2.39 (http://wulf-demo.dynamic.nsn-net.net/)
 * Copyright © 2016-2017 Nokia. All rights Reserved.
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery","jqxcore","jqxdata","jqxbuttons","jqxscrollbar","jqxdatatable","jqxtreegrid"],a):"object"==typeof module&&module.exports?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c,require("jqwidgets-framework/jqwidgets/jqx-all"),require("./scroll")),c}:a(jQuery)}(function(a){"use strict";function b(a,b){for(var c=0,d=0;d<b.length&&b[d].uid!==a.uid;d++)b[d].parent===a.parent&&c++;return c}void 0!==a.jqx&&void 0!==a.jqx._jqxTreeGrid&&a.extend(a.jqx._jqxTreeGrid.prototype,{expandRow:function(a,c){var d=this.base;if(!d._loading){var e=d._names(),f=this,g=d.rowinfo[a];if(!g){var h=this.getRow(a);h&&(d.rowinfo[a]={row:h},h.originalRecord&&(d.rowinfo[a].originalRecord=h.originalRecord),g=d.rowinfo[a])}if(g){if(g.expanded)return void(g.row[e.expanded]=!0);if(g.expanded=!0,g.row[e.expanded]=!0,g.originalRecord&&(g.originalRecord[e.expanded]=!0),this.virtualModeCreateRecords&&!g.row._loadedOnDemand){var i=function(a){if(g.row._loadedOnDemand=!0,a===!1)return d._loading=!1,f._hideLoadElement(),g.leaf=!0,g.row[e.leaf]=!0,d._renderrows(),void(c&&c());for(var b=0;b<a.length;b++){if(a[b][e.level]=g.row[e.level]+1,a[b][e.parent]=g.row,d.rowsByKey[a[b].uid])throw d._loading=!1,f._hideLoadElement(),g.leaf=!0,g.row[e.leaf]=!0,d._renderrows(),c&&c(),new Error("Please, check whether you Add Records with unique ID/Key. ");d.rowsByKey[a[b].uid]=a[b],f.virtualModeRecordCreating(a[b])}g.row.records?g.row.records=g.row.records.concat(a):g.row.records=a,(!a||a&&0===a.length)&&(g.leaf=!0,g.row[e.leaf]=!0),g.originalRecord&&(g.originalRecord.records=a,g.originalRecord[e.expanded]=!0,0===a.length&&(g.originalRecord[e.leaf]=!0)),d._loading=!1,f._hideLoadElement();var h=d.vScrollBar.css("visibility");d._renderrows(),d._updateScrollbars();var i=h!==d.vScrollBar.css("visibility");("auto"===d.height||null===d.height||d.autoheight||i)&&d._arrange(),d._renderhorizontalscroll(),c&&c()};if(!g.row[e.leaf])return d._loading=!0,this._showLoadElement(),void this.virtualModeCreateRecords(g.row,i)}if(!d.updating()){var j=d.vScrollBar.css("visibility");d._renderrows(),d._updateScrollbars();var k=j!==d.vScrollBar.css("visibility");("auto"===d.height||null===d.height||d.autoheight||k)&&d._arrange(),d._renderhorizontalscroll(),d._raiseEvent("rowExpand",{row:g.row,key:a})}}for(var l=d.host.height(),m=d.table.height(),n=this.getRow(a),o=d.getRows(),p=0;null!==n.parent;)p+=b(n,o),n=this.getRow(n.parent);var q=d.columnsHeight*p,r=d.vScrollBar.jqxScrollBar("max");m>l&&(q>r&&(q=r),d.vScrollBar.jqxScrollBar("setPosition",q))}}}),a(document).on("rowClick",'.jqx-grid:not([class~="n-jqxgrid-table"])',function(b){var c=b.args,d=c.row,e=c.key;d.records&&(d.expanded?a(this).jqxTreeGrid("collapseRow",e):a(this).jqxTreeGrid("expandRow",e))}).on("keydown.wf.treeTable.keyboard",".jqx-grid:not(.n-jqxgrid-table)",function(b){if(9===b.which){var c=a(b.target),d=c.jqxTreeGrid("getSelection");if(d.length>0)c.jqxTreeGrid("clearSelection");else{var e=c.jqxTreeGrid("getRows");if(e.length>0){var f=e[0].ID;return c.jqxTreeGrid("selectRow",f),!1}}}}),a(document).ready(function(){setTimeout(function(){a('.jqx-grid:not([class~="n-jqxgrid-table"])').addClass("n-jqx-tree-table")},50)})});