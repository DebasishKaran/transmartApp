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


<g:formRemote name="ontTagFilterForm" id="ontTagFilterForm"
	url="[controller:'ontology',action:'ajaxOntTagFilter']"
	before="if(searchByTagBefore()==false) return false;"
	onSuccess="searchByTagComplete(e)">
	<table class="searchform" width="100%">
		<tr>
			<td valign="top"><b>Search:</b><br> <g:textField
					id="ontsearchterm" name="ontsearchterm" value="" size="10" /><br>
			</td>
			<td valign="top"><br>AND</td>
			<td valign="top"><b>Type:</b><br>
			 <g:select
					class="searchform" name="tagtype" id="tagtype" from="${tagtypes}"
					onchange="changeType();${remoteFunction(
            controller:'ontology', 
            action:'ajaxGetOntTagFilterTerms', 
            params: '{tagtype:this.value}', 
            update:'tagtermdiv')}"></g:select><br>
				<div id="tagtermdiv">
				&nbsp;
				</div></td>
		</tr>
	</table>
    <div style="text-align: center">
	    <input id="ontSearchButton" type="SUBMIT" VALUE="Search" class="searchform">
        <input type="reset" VALUE="Clear" onclick="clearSearch();" class="searchform">
    </div>
	<div class="searchform" id="searchresultstext"></div>

</g:formRemote>
<script type="text/javascript">
function clearSearch()
	{
	document.getElementById('searchresultstext').innerHTML='';
	document.getElementById('tagtermdiv').innerHTML='';	
	 ontFilterForm.setHeight(130);
	 ontFilterPanel.doLayout();
	}
function changeType()
{
 var tagtype=document.getElementById("tagtype");
   if(tagtype.selectedIndex==0)
   {
   	 ontFilterForm.setHeight(130);
   	}
   	else
   	{
   	ontFilterForm.setHeight(250);
   	}
   	ontFilterPanel.doLayout();
}
</script>