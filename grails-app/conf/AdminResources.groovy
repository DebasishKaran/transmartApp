modules = {
    admin {
        dependsOn 'jquery', 'jquery-ui', 'extjs', 'main_mod', 'session_timeout'

        resource url: '/css/admin.css'

        resource url: '/js/usergroup.js'
        resource url: '/js/utilitiesMenu.js'
    }
}
