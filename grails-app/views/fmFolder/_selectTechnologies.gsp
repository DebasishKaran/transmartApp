<g:setProvider library="prototype"/>
<g:select style="width: 400px" id="technology" name="technology"
          noSelection="${['null': 'Select...']}" from="${technologies}"
          value="${technology}"
          onchange="${remoteFunction(action: 'ajaxMeasurements', update: 'measurementwrapper', onSuccess: 'updatePlatforms()', params: '\'technologyName=\' + this.value + \'&vendorName=\' + $F(\'vendor\') + \'&measurementName=\' + $F(\'measurement\')')};
                    ${remoteFunction(action: 'ajaxVendors', update: 'vendorwrapper', onSuccess: 'updatePlatforms()', params: '\'technologyName=\' + this.value + \'&vendorName=\' + $F(\'vendor\') + \'&measurementName=\' + $F(\'measurement\')')}"/>
