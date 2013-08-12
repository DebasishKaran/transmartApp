
dataSource {
	// pooled connection
	pooled = true

	// standard jdbc driver
	driverClassName ="oracle.jdbc.driver.OracleDriver"

	// oracle jdbc url- example here is connecting to an oracle xe instance on localhost
	url = "jdbc:oracle:thin:@musa.bos.us.genedata.com:1521:tmdev"

	// user name and password
	username = "biomart_user"
	password = "biomart_user"

	// hibernate database connection dialect
	dialect = "org.hibernate.dialect.Oracle10gDialect"

	// enable this for SQL debugging
	//loggingSql = true

	properties {
		maxActive = 100
		maxIdle = 25
		minIdle = 5
		initialSize =10
		minEvictableIdleTimeMillis = 60000
		timeBetweenEvictionRunsMillis = 60000
		maxWait = 60000
		numTestsPerEvictionRun=3
		testOnBorrow=true
		testWhileIdle=false
		testOnReturn=false
		validationQuery = "SELECT 1 FROM DUAL"
	}

}


hibernate {
	// hibernate cache config
	cache.use_second_level_cache=true

	//turn on query cache
	cache.use_query_cache=true
	cache.provider_class='org.hibernate.cache.EhCacheProvider'

	// pool size
	connection.pool_size=30
}
