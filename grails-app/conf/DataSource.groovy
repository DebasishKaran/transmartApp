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
  
//check external configuration as described in Config.groovy


dataSource_oauth2 {
    driverClassName = 'org.h2.Driver'
    url = "jdbc:h2:~/.grails/oauth2db;MVCC=TRUE"
    username = 'sa'
    password = ''
    dbCreate = 'update'
    logSql = true
    formatSql = true
}

hibernate {
    cache.use_query_cache        = true
    cache.use_second_level_cache = true
	hibernate.jdbc.fetch_size = 1000

    // make sure hibernate.cache.provider_class is not being set
    // see http://stackoverflow.com/a/3690212/127724 and the docs for the cache-ehcache plugin
    cache.region.factory_class   = 'grails.plugin.cache.ehcache.hibernate.BeanEhcacheRegionFactory'
}

environments {
    test {
        dataSource {
            driverClassName = 'org.h2.Driver'
            url             = "jdbc:h2:mem:testDb;MVCC=TRUE;LOCK_TIMEOUT=10000;INIT=RUNSCRIPT FROM './h2_init.sql'"
            username        = 'sa'
            password        = ''
            dbCreate        = 'update'
            logSql          = true
            formatSql       = true
        }

        dataSource_oauth2 {
            driverClassName = 'org.h2.Driver'
            url = "jdbc:h2:mem:oauth2;MVCC=TRUE"
            username = 'sa'
            password = ''
            dbCreate = 'update'
            logSql = true
            formatSql = true
        }

        hibernate {
            cache.use_second_level_cache = true
            cache.use_query_cache = false
        }
    }
}
