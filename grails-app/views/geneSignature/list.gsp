<!--
  tranSMART - translational medicine data mart
  
  Copyright 2008-2012 Janssen Research & Development, LLC.
  
  This product includes software developed at Janssen Research & Development, LLC.
  
  This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License 
  as published by the Free Software  * Foundation, either version 3 of the License, or (at your option) any later version, along with the following terms:
  1.	You may convey a work based on this program in accordance with section 5, provided that you retain the above notices.
  2.	You may convey verbatim copies of this program code as you receive it, in any medium, provided that you retain the above notices.
  
  This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS    * FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
  
  You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.
  
 
-->

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/> 
        <meta name="layout" content="genesigmain" />
        <title>Gene Signature Search</title>
        
		<!-- override main.css -->
		<style type="text/css">		
			.detail td a {
			    background: '';
			    padding-left: 10px;
			    vertical-align: top;			    
			 }		

			.detail td a:hover {
			    white-space: normal;		    
			 }		
		</style>    
		
		<script language="javascript" type="text/javascript">

			function handleActionItem(actionItem, id) {
				var action = actionItem.value;
				var url 
				if(action=="") return false;
				
				// clone existing object and bring into edit wizard
				if(action=="clone") {
					url = "${createLink(action: 'cloneWizard')}/"+id+"";
				}
				
				// set delete flag
				if(action=="delete") {
					var del=confirm("Are you sure you want to delete?")

					if(del) {
						url="${createLink(action: 'delete')}/"+id;
						window.location.href=url;
					} else {
						return false;
					}
				}

				// edit wizard
				if(action=="edit") {
					url = "${createLink(action: 'editWizard')}/"+id+"";
				}				

				if(action=="showEditItems") {
					url = "${createLink(action: 'showEditItems')}/"+id+"";
				}
				
				// export to Excel 
				if(action=="export") {
					url = "${createLink(action: 'downloadExcel')}/"+id+"";
				}

				// get GMT file 
				if(action=="gmt") {
					url = "${createLink(action: 'downloadGMT')}/"+id+"";
				}

				// public action
				if(action=="public") {
					url = "${createLink(action: 'makePublic')}/"+id;
				}

				// send to url
				window.location.href=url;
			}
		
		</script>
	  <script type="text/javascript" src="${resource(dir:'js', file:'help/D2H_ctxt.js')}"></script>
        <script language="javascript">
        	helpURL = '${grailsApplication.config.com.recomdata.searchtool.adminHelpURL}';
        </script>
    </head>
    <body>
    <div class="body">   
  		<g:form frm="GenSignatureFrm" method="post">
  		<g:hiddenField name="id" value="" />
		 
	    <!--  show message -->
    	<g:if test="${flash.message}"><div class="message">${flash.message}</div><br></g:if>
 		


    	<h1>Gene Signature List &nbsp;&nbsp;<a HREF="JavaScript:D2H_ShowHelp('1259',helpURL,'wndExternal',CTXT_DISPLAY_FULLHELP )">
				<img src="${resource(dir:'images',file:'help/helpicon_white.jpg')}" alt="Help" border=0 width=18pt style="vertical-align:middle;margin-left:5pt;"/>
			</a></h1>
	
    	<!-- show my signatures -->
            <p style="text-align: right;"><span class="button"><g:actionSubmit class="edit" action="createWizard" value="New Signature"/></span></p>
       	<table id="mySignatures"  class="detail" style="width: 100%">
		<g:tableHeaderToggle label="My Signatures (${myItems.size()})" divPrefix="my_signatures" status="open" colSpan="${12}"/>
       	
    	<tbody id="my_signatures_detail" style="display: block;">
             <tr>	                
        	 	<th>Name</th>          	   	                
        	    <th>Author</th>
        	    <th>Date Created</th>
        	    <th>Species</th>
        	    <th>Tech Platform</th>
				<th>Tissue Type</th>           	                   	        
        	    <th>Public</th>
        	    <th>Gene List</th>
        	    <th># Genes</th>
        	    <th># Up-Regulated</th>
        	    <th># Down-Regulated</th>              	        
        	    <th>&nbsp;</th>
        	</tr>

	       	<g:each var="gs" in="${myItems}" status="idx">      		 	       		
				<g:render template="/geneSignature/summary_record" model="[gs:gs, idx: idx]" /> 	       		
			</g:each> 		
		</tbody>
       	</table>     
       	
       	<!--  public signatures -->
       	<br>
      	<table id="publicSignatures"  class="detail" style="width: 100%">      	
		<g:tableHeaderToggle label="${adminFlag ? ('Other Signatures ('+pubItems.size()+')') : ('Public Signatures ('+pubItems.size()+')')}" divPrefix="pub_signatures" colSpan="${12}" />
       	
    	<tbody id="pub_signatures_detail" style="display: none;">
             <tr>	                
        	 	<th>Name</th>          	   	                
        	    <th>Author</th>
        	    <th>Date Created</th>
        	    <th>Species</th>
        	    <th>Tech Platform</th>
				<th>Tissue Type</th>           	                   	        
        	    <th>Public</th>
        	    <th>Gene List</th>
        	    <th># Genes</th>
        	    <th># Up-Regulated</th>
        	    <th># Down-Regulated</th>              	        
        	    <th>&nbsp;</th>
        	</tr>

	       	<g:each var="gs" in="${pubItems}" status="idx">      		 	       		
				<g:render template="/geneSignature/summary_record" model="[gs:gs, idx: idx]" /> 	       		
			</g:each>

		</tbody>
       	</table>
            <br>
            <p style="text-align: right;"><span class="button"><g:actionSubmit class="edit" action="createListWizard" value="New Gene List"/></span></p>
            <!-- show my lists -->
            <table id="myLists"  class="detail" style="width: 100%">
                <g:tableHeaderToggle label="My Lists (${myListItems.size()})" divPrefix="my_lists" status="open" colSpan="${5}"/>

                <tbody id="my_lists_detail" style="display: block;">
                <tr>
                    <th>Name</th>
                    <th>Author</th>
                    <th>Date Created</th>
                    <th># Genes</th>
                    <th>&nbsp;</th>
                </tr>

                <g:each var="gs" in="${myListItems}" status="idx">
                    <g:render template="/geneSignature/list_summary_record" model="[gs:gs, idx: idx]" />
                </g:each>
                </tbody>
            </table>


        </g:form>
    </div>
	</body>
</html>
