
// @GENERATOR:play-routes-compiler
// @SOURCE:/Users/humorHan/work/reaf-print-dom-server/conf/routes
// @DATE:Wed Nov 02 15:46:31 CST 2016


package router {
  object RoutesPrefix {
    private var _prefix: String = "/"
    def setPrefix(p: String): Unit = {
      _prefix = p
    }
    def prefix: String = _prefix
    val byNamePrefix: Function0[String] = { () => prefix }
  }
}
