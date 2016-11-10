<!DOCTYPE html>
<html>
<head>
    <title><g:if env="development">Grails Runtime Exception</g:if><g:else>Error</g:else></title>
    <meta name="layout" content="main">
    <g:if env="development"><link rel="stylesheet" href="${resource(dir: 'css', file: 'errors.css')}" type="text/css"></g:if>
</head>
<body>

<table style="width:auto; border:0px; text-align:center; margin:auto;" align="center">
        <tr>
            <td style="text-align:center;vertical-align:middle;margin-left:-40px;">
  			<g:link controller="RWG" action="index"><img src="${resource(dir:'images',file:grailsApplication.config.com.recomdata.largeLogo)}" alt="Transmart" /></g:link>
            </td>
        </tr>
        <tr><td>&nbsp;</td></tr>
        <tr><td>
	        Transmart is currently under maintenance. Please try again later.
	    </td></tr>
    

</body>
</html>
