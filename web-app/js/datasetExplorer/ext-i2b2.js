/*************************************************************************
 * tranSMART - translational medicine data mart
 * 
 * Copyright 2008-2012 Janssen Research & Development, LLC.
 * 
 * This product includes software developed at Janssen Research & Development, LLC.
 * 
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License 
 * as published by the Free Software  * Foundation, either version 3 of the License, or (at your option) any later version, along with the following terms:
 * 1.	You may convey a work based on this program in accordance with section 5, provided that you retain the above notices.
 * 2.	You may convey verbatim copies of this program code as you receive it, in any medium, provided that you retain the above notices.
 * 
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS    * FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * 
 *
 ******************************************************************/


Ext.ux.OntologyTreeLoader = Ext.extend(Ext.tree.TreeLoader, {

    requestData: function (node, callback) {
        if (this.fireEvent("beforeload", this, node, callback) !== false) {

			if(node.attributes.cls == 'fileFolderNode') {
                this.transId = FM.handleFolderFilesRequest(this, node, callback);
            }
            else {
	            this.transId = Ext.Ajax.request({
	                method: 'GET',
	                url: pageInfo.basePath + "/concepts/getChildren",
	                params: { concept_key: node.id },
	                success: this.handleResponse,
	                failure: this.handleFailure,
	                scope: this,
	                argument: {callback: callback, node: node},
	                timeout: '120000' //2 minutes
	            });
            }

        } else {
            // if the load is cancelled, make sure we notify
            // the node that we are done
            if (typeof callback == "function") {
                callback();
            }
        }
    },

    processResponse: function (response, node, callback) {
        node.beginUpdate();
        //node.appendChild(nodes);
        this.parseJson(response, node);
 //       getChildConceptPatientCounts(node);
 		if(node.attributes.cls == 'fileFolderNode') {
        	FM.addFileNodes(this, response, node, callback);
        	node.endUpdate();
	        if (typeof callback == "function") {
	            callback(this, node);
	        }
    	}
    	else {
	        if (node.attributes.level == 1) {
	            FM.handleFolderHasFilesRequest(this, response, node, callback);
	        }
	        
	        
	        else {
	//            parseJson(response, node);
	            getChildConceptPatientCounts(node);
	//            this.endAppending(node, callback);
	        }
	        node.endUpdate();
	        if (typeof callback == "function") {
	            callback(this, node);
	        }
        }
    },

    parseJson: function (response, node) {
        // shorthand
        var Tree = Ext.tree;

        var concepts = Ext.decode(response.responseText)

        var matchList = GLOBAL.PathToExpand.split(",");
        for (i = 0; i < concepts.length; i++) {
            var c = getTreeNodeFromJsonNode(concepts[i]);
            if(c.attributes.id.indexOf("SECURITY")>-1) {continue;}
            //For search results - if the node level is 1 (study) or below and it doesn't appear in the search results, filter it out.
            if(c.attributes.level <= '1' && GLOBAL.PathToExpand != '' && GLOBAL.PathToExpand.indexOf(c.attributes.id) == -1) {
                //However, don't filter studies/top folders out if a higher-level match exists
                var highLevelMatchFound = false;
                for (var j = 0; j < matchList.size()-1; j++) { //-1 here - leave out last result (trailing comma)	
                    if (c.id.startsWith(matchList[j]) && c.id != matchList[j]) {
                        highLevelMatchFound = true;
                        break;
                    }
                }
                if (!highLevelMatchFound) {
                    continue;
                }
            }
   		 
            //If the node has been disabled, ignore all children
            if (!node.disabled) {
                node.appendChild(c);
            }
        }

    }});

function getConceptPatientCount(node) {
    Ext.Ajax.request(
        {
            url: pageInfo.basePath + "/chart/conceptPatientCount",
            method: 'POST',
            success: function (result, request) {
                getConceptPatientCountComplete(result, node);
            },
            failure: function (result, request) {
                getConceptPatientCountComplete(result, node);
            },
            timeout: '300000',
            params: Ext.urlEncode({charttype: "conceptpatientcount",
                concept_key: node.attributes.id})
        });
}

function parseJson (response, node) {
        // shorthand
        var Tree = Ext.tree;

        var concepts = Ext.decode(response.responseText)

        var matchList = GLOBAL.PathToExpand.split(",");
        for (i = 0; i < concepts.length; i++) {
            var c = getTreeNodeFromJsonNode(concepts[i]);
            if(c.attributes.id.indexOf("SECURITY")>-1) {continue;}
            //For search results - if the node level is 1 (study) or below and it doesn't appear in the search results, filter it out.
            if(c.attributes.level <= '1' && GLOBAL.PathToExpand != '' && GLOBAL.PathToExpand.indexOf(c.attributes.id) == -1) {
                //However, don't filter studies/top folders out if a higher-level match exists
                var highLevelMatchFound = false;
                for (var j = 0; j < matchList.size()-1; j++) { //-1 here - leave out last result (trailing comma)	
                    if (c.id.startsWith(matchList[j]) && c.id != matchList[j]) {
                        highLevelMatchFound = true;
                        break;
                    }
                }
                if (!highLevelMatchFound) {
                    continue;
                }
            }
   		 
            //If the node has been disabled, ignore all children
            if (!node.disabled) {
                node.appendChild(c);
            }
        }
        
 }

 function handleFolderHasFilesRequest (source, originalResponse, node, callback) {

    Ext.Ajax.request({
        url: pageInfo.basePath+"/fmFolder/getFolderHasFiles",
        method: 'GET',
        success: function(response) {
            if (response.responseText == "true") {
                node.appendChild(getFileFolderNode(node));
            }
            //parseJson(originalResponse, node);
            //source.endAppending(node, callback);
        },
        timeout: '120000', //2 minutes
        params: {accession: node.attributes.accession}
    });


}

function getConceptPatientCountComplete(result, node) {
    node.setText(node.text + " <b>(" + result.responseText + ")</b>");
}

function getChildConceptPatientCounts(node) {
	
var params =	Ext.urlEncode({charttype:"childconceptpatientcounts",
		   concept_key: node.attributes.id})

// Ext AJAX has intermittent failure to pass parameters when many AJAX requests are made in a short space of time - switched to jQuery here
jQuery.ajax({
            url: pageInfo.basePath + "/chart/childConceptPatientCounts",
            method: 'POST',
    	        success: function(result){getChildConceptPatientCountsComplete(result, node);},
    	        data: {charttype: "childconceptpatientcounts", concept_key: node.attributes.id}
        });
}

function getChildConceptPatientCountsComplete(result, node) {
	//window.alert("node attributes"+node.attributes);//added
    /* eval the response and look up in loop*/
//var childaccess=Ext.util.JSON.decode(result.responseText).accesslevels;
//var childcounts=Ext.util.JSON.decode(result.responseText).counts;
	var mobj=result;
    var childaccess = mobj.accesslevels;
    var childcounts = mobj.counts;
    var childDataCommon = mobj.dataCommon; //added
  
    /*var cca=new Array();
     var size=childcounts.size();
     for(var i=0;i<size;i++)
     {
     cca[childcounts[i].concept]=childcounts[i].count;
     }*/
    var blah = node;
    node.beginUpdate();
    var children = node.childNodes;
    var size2 = children.size()
    for (var i = 0; i < size2; i++) {
        var key = children[i].attributes.id;
        var fullname = key.substr(key.indexOf("\\", 2), key.length);
        var count = childcounts[fullname];
        var access = childaccess[fullname];
        var dataCommon = childDataCommon[fullname]; //added
        var child = children[i];
        var level = child.attributes.level;
       
        if (count != undefined) {
            child.setText(child.text + " (" + count + ")");
        }

      //added dataCommon
        if (dataCommon = 'YES'&& ((access != undefined && access != 'Locked') || GLOBAL.IsAdmin) && level =='1'){
        	// edit child attribute so it looks like a data commons study
        	child.ui.iconNode.className= 'x-tree-node-icon opengreenlockicon';
        	
        }

        else{      
        	if ((access != undefined && access != 'Locked') || GLOBAL.IsAdmin) //if im an admin or there is an access level other than locked leave node unlocked
            {
                //leave node unlocked must have some read access
            	//iconCls = "openredlockicon";
            	//child.setIconCls = "openredlockicon";
            	if (level =='1') {
            		child.ui.iconNode.className= 'x-tree-node-icon openredlockicon';
            	}
            }
        else {
            //default node to locked
            //child.setText(child.text+" <b>Locked</b>");
        	
        	if (level =='1') {
        		child.ui.iconNode.className= 'x-tree-node-icon closedredlockicon';
            }

        	//child.ui.iconNode.className= 'x-tree-node-icon closedredlockicon';
            child.attributes.access = 'locked';
            child.disable();
            child.on('beforeload', function (node) {
            	
                alert("Access to this node has been restricted. Please contact your administrator for access.");
                return false
            });
        	}
        }
      
    }
    node.endUpdate();
}

