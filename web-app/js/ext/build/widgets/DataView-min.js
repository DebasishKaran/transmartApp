/*
 * Ext JS Library 2.2
 * Copyright(c) 2006-2008, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

Ext.DataView=Ext.extend(Ext.BoxComponent,{selectedClass:"x-view-selected",emptyText:"",deferEmptyText:true,trackOver:false,last:false,initComponent:function(){Ext.DataView.superclass.initComponent.call(this);if(typeof this.tpl=="string"){this.tpl=new Ext.XTemplate(this.tpl)}this.addEvents("beforeclick","click","mouseenter","mouseleave","containerclick","dblclick","contextmenu","selectionchange","beforeselect");this.all=new Ext.CompositeElementLite();this.selected=new Ext.CompositeElementLite()},onRender:function(){if(!this.el){this.el=document.createElement("div");this.el.id=this.id}Ext.DataView.superclass.onRender.apply(this,arguments)},afterRender:function(){Ext.DataView.superclass.afterRender.call(this);this.el.on({"click":this.onClick,"dblclick":this.onDblClick,"contextmenu":this.onContextMenu,scope:this});if(this.overClass||this.trackOver){this.el.on({"mouseover":this.onMouseOver,"mouseout":this.onMouseOut,scope:this})}if(this.store){this.setStore(this.store,true)}},refresh:function(){this.clearSelections(false,true);this.el.update("");var A=this.store.getRange();if(A.length<1){if(!this.deferEmptyText||this.hasSkippedEmptyText){this.el.update(this.emptyText)}this.hasSkippedEmptyText=true;this.all.clear();return }this.tpl.overwrite(this.el,this.collectData(A,0));this.all.fill(Ext.query(this.itemSelector,this.el.dom));this.updateIndexes(0)},prepareData:function(A){return A},collectData:function(B,E){var D=[];for(var C=0,A=B.length;C<A;C++){D[D.length]=this.prepareData(B[C].data,E+C,B[C])}return D},bufferRender:function(A){var B=document.createElement("div");this.tpl.overwrite(B,this.collectData(A));return Ext.query(this.itemSelector,B)},onUpdate:function(F,A){var B=this.store.indexOf(A);var E=this.isSelected(B);var C=this.all.elements[B];var D=this.bufferRender([A],B)[0];this.all.replaceElement(B,D,true);if(E){this.selected.replaceElement(C,D);this.all.item(B).addClass(this.selectedClass)}this.updateIndexes(B,B)},onAdd:function(E,C,D){if(this.all.getCount()==0){this.refresh();return }var B=this.bufferRender(C,D),F,A=this.all.elements;if(D<this.all.getCount()){F=this.all.item(D).insertSibling(B,"before",true);A.splice.apply(A,[D,0].concat(B))}else{F=this.all.last().insertSibling(B,"after",true);A.push.apply(A,B)}this.updateIndexes(D)},onRemove:function(C,A,B){this.deselect(B);this.all.removeElement(B,true);this.updateIndexes(B)},refreshNode:function(A){this.onUpdate(this.store,this.store.getAt(A))},updateIndexes:function(D,C){var B=this.all.elements;D=D||0;C=C||((C===0)?0:(B.length-1));for(var A=D;A<=C;A++){B[A].viewIndex=A}},setStore:function(A,B){if(!B&&this.store){this.store.un("beforeload",this.onBeforeLoad,this);this.store.un("datachanged",this.refresh,this);this.store.un("add",this.onAdd,this);this.store.un("remove",this.onRemove,this);this.store.un("update",this.onUpdate,this);this.store.un("clear",this.refresh,this)}if(A){A=Ext.StoreMgr.lookup(A);A.on("beforeload",this.onBeforeLoad,this);A.on("datachanged",this.refresh,this);A.on("add",this.onAdd,this);A.on("remove",this.onRemove,this);A.on("update",this.onUpdate,this);A.on("clear",this.refresh,this)}this.store=A;if(A){this.refresh()}},findItemFromChild:function(A){return Ext.fly(A).findParent(this.itemSelector,this.el)},onClick:function(C){var B=C.getTarget(this.itemSelector,this.el);if(B){var A=this.indexOf(B);if(this.onItemClick(B,A,C)!==false){this.fireEvent("click",this,A,B,C)}}else{if(this.fireEvent("containerclick",this,C)!==false){this.clearSelections()}}},onContextMenu:function(B){var A=B.getTarget(this.itemSelector,this.el);if(A){this.fireEvent("contextmenu",this,this.indexOf(A),A,B)}},onDblClick:function(B){var A=B.getTarget(this.itemSelector,this.el);if(A){this.fireEvent("dblclick",this,this.indexOf(A),A,B)}},onMouseOver:function(B){var A=B.getTarget(this.itemSelector,this.el);if(A&&A!==this.lastItem){this.lastItem=A;Ext.fly(A).addClass(this.overClass);this.fireEvent("mouseenter",this,this.indexOf(A),A,B)}},onMouseOut:function(A){if(this.lastItem){if(!A.within(this.lastItem,true)){Ext.fly(this.lastItem).removeClass(this.overClass);this.fireEvent("mouseleave",this,this.indexOf(this.lastItem),this.lastItem,A);delete this.lastItem}}},onItemClick:function(B,A,C){if(this.fireEvent("beforeclick",this,A,B,C)===false){return false}if(this.multiSelect){this.doMultiSelection(B,A,C);C.preventDefault()}else{if(this.singleSelect){this.doSingleSelection(B,A,C);C.preventDefault()}}return true},doSingleSelection:function(B,A,C){if(C.ctrlKey&&this.isSelected(A)){this.deselect(A)}else{this.select(A,false)}},doMultiSelection:function(C,A,D){if(D.shiftKey&&this.last!==false){var B=this.last;this.selectRange(B,A,D.ctrlKey);this.last=B}else{if((D.ctrlKey||this.simpleSelect)&&this.isSelected(A)){this.deselect(A)}else{this.select(A,D.ctrlKey||D.shiftKey||this.simpleSelect)}}},getSelectionCount:function(){return this.selected.getCount()},getSelectedNodes:function(){return this.selected.elements},getSelectedIndexes:function(){var B=[],D=this.selected.elements;for(var C=0,A=D.length;C<A;C++){B.push(D[C].viewIndex)}return B},getSelectedRecords:function(){var D=[],C=this.selected.elements;for(var B=0,A=C.length;B<A;B++){D[D.length]=this.store.getAt(C[B].viewIndex)}return D},getRecords:function(B){var E=[],D=B;for(var C=0,A=D.length;C<A;C++){E[E.length]=this.store.getAt(D[C].viewIndex)}return E},getRecord:function(A){return this.store.getAt(A.viewIndex)},clearSelections:function(A,B){if((this.multiSelect||this.singleSelect)&&this.selected.getCount()>0){if(!B){this.selected.removeClass(this.selectedClass)}this.selected.clear();this.last=false;if(!A){this.fireEvent("selectionchange",this,this.selected.elements)}}},isSelected:function(A){return this.selected.contains(this.getNode(A))},deselect:function(A){if(this.isSelected(A)){A=this.getNode(A);this.selected.removeElement(A);if(this.last==A.viewIndex){this.last=false}Ext.fly(A).removeClass(this.selectedClass);this.fireEvent("selectionchange",this,this.selected.elements)}},select:function(D,F,B){if(Ext.isArray(D)){if(!F){this.clearSelections(true)}for(var C=0,A=D.length;C<A;C++){this.select(D[C],true,true)}if(!B){this.fireEvent("selectionchange",this,this.selected.elements)}}else{var E=this.getNode(D);if(!F){this.clearSelections(true)}if(E&&!this.isSelected(E)){if(this.fireEvent("beforeselect",this,E,this.selected.elements)!==false){Ext.fly(E).addClass(this.selectedClass);this.selected.add(E);this.last=E.viewIndex;if(!B){this.fireEvent("selectionchange",this,this.selected.elements)}}}}},selectRange:function(C,A,B){if(!B){this.clearSelections(true)}this.select(this.getNodes(C,A),true)},getNode:function(A){if(typeof A=="string"){return document.getElementById(A)}else{if(typeof A=="number"){return this.all.elements[A]}}return A},getNodes:function(E,A){var D=this.all.elements;E=E||0;A=typeof A=="undefined"?Math.max(D.length-1,0):A;var B=[],C;if(E<=A){for(C=E;C<=A&&D[C];C++){B.push(D[C])}}else{for(C=E;C>=A&&D[C];C--){B.push(D[C])}}return B},indexOf:function(A){A=this.getNode(A);if(typeof A.viewIndex=="number"){return A.viewIndex}return this.all.indexOf(A)},onBeforeLoad:function(){if(this.loadingText){this.clearSelections(false,true);this.el.update("<div class=\"loading-indicator\">"+this.loadingText+"</div>");this.all.clear()}},onDestroy:function(){Ext.DataView.superclass.onDestroy.call(this);this.setStore(null)}});Ext.reg("dataview",Ext.DataView);