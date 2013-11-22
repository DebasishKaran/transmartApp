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
  

package com.recomdata.transmart

import bio.BioMesh
import bio.Disease

class DiseaseService {

    boolean transactional = true

    def getMeshLineage(Disease disease) throws Exception {
        def lineage = []
        def mesh = disease.primarySourceCode
        def lineageCodes = mesh.code?.split("\\.")
        if (lineageCodes) {
            def concatenatedCode = ""
            for (code in lineageCodes) {
                concatenatedCode += code
                def meshCodeDisease = Disease.findByPrimarySourceCode(concatenatedCode)
                if (meshCodeDisease == null) {
                    concatenatedCode += "."
                    continue
                }
                lineage.add(meshCodeDisease)
                concatenatedCode += "."
            }
        }

        return lineage
    }
}