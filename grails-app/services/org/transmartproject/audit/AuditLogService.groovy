package org.transmartproject.audit

import java.util.Map;

import groovy.util.logging.Slf4j

import org.transmartproject.core.users.User;

/**
 * Logs to level TRACE in a specific `metric' format.
 * Configuration of output done in (out-of-tree) Config.groovy.
 *
 * @author gijs@thehyve.nl
 */
@Slf4j
class AuditLogService {

    User currentUserBean
    def grailsApplication

    def report(Map<String, Object> additionalParams = [:], User user, String task, String action) {
        def metadata = grailsApplication?.metadata
        def appVersion = metadata ? metadata['app.version'] : ''
        def message = "${task}\t${action}\t${user?.username}\t${appVersion}\t"
        log.trace message
    }
}
