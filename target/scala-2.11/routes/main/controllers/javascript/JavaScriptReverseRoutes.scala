
// @GENERATOR:play-routes-compiler
// @SOURCE:/Users/humorHan/work/reaf-print-dom-server/conf/routes
// @DATE:Wed Nov 02 15:46:31 CST 2016

import play.api.routing.JavaScriptReverseRoute
import play.api.mvc.{ QueryStringBindable, PathBindable, Call, JavascriptLiteral }
import play.core.routing.{ HandlerDef, ReverseRouteContext, queryString, dynamicString }


import _root_.controllers.Assets.Asset

// @LINE:4
package controllers.javascript {
  import ReverseRouteContext.empty

  // @LINE:4
  class ReverseAssets(_prefix: => String) {

    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:4
    def at: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.Assets.at",
      """
        function(file1) {
        
          if (true) {
            return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "assets/" + (""" + implicitly[PathBindable[String]].javascriptUnbind + """)("file", file1)})
          }
        
        }
      """
    )
  
  }

  // @LINE:50
  class ReverseAdminController(_prefix: => String) {

    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:50
    def orderList: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.AdminController.orderList",
      """
        function() {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "admin/order/list"})
        }
      """
    )
  
    // @LINE:51
    def order: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.AdminController.order",
      """
        function() {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "admin/order"})
        }
      """
    )
  
    // @LINE:54
    def editProduct: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.AdminController.editProduct",
      """
        function() {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "admin/product/edit"})
        }
      """
    )
  
    // @LINE:52
    def editOrder: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.AdminController.editOrder",
      """
        function() {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "admin/order/edit"})
        }
      """
    )
  
  }

  // @LINE:58
  class ReverseProxyController(_prefix: => String) {

    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:58
    def proxyPass: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.ProxyController.proxyPass",
      """
        function(path0) {
        
          if (true) {
            return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "api/" + (""" + implicitly[PathBindable[String]].javascriptUnbind + """)("path", path0)})
          }
        
        }
      """
    )
  
  }

  // @LINE:11
  class ReverseApplication(_prefix: => String) {

    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:12
    def product: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.Application.product",
      """
        function(id0) {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "product" + _qS([(id0 == null ? null : (""" + implicitly[QueryStringBindable[Int]].javascriptUnbind + """)("id", id0))])})
        }
      """
    )
  
    // @LINE:14
    def cart: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.Application.cart",
      """
        function() {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "cart"})
        }
      """
    )
  
    // @LINE:19
    def pay: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.Application.pay",
      """
        function() {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "pay"})
        }
      """
    )
  
    // @LINE:13
    def customProduct: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.Application.customProduct",
      """
        function() {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "product/custom"})
        }
      """
    )
  
    // @LINE:24
    def notFound: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.Application.notFound",
      """
        function() {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "404"})
        }
      """
    )
  
    // @LINE:15
    def cartConfirm: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.Application.cartConfirm",
      """
        function() {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "cart/confirm"})
        }
      """
    )
  
    // @LINE:22
    def equipmentLeasing: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.Application.equipmentLeasing",
      """
        function() {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "equipmentLeasing"})
        }
      """
    )
  
    // @LINE:20
    def paySuccess: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.Application.paySuccess",
      """
        function() {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "pay/success"})
        }
      """
    )
  
    // @LINE:17
    def order: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.Application.order",
      """
        function() {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "order"})
        }
      """
    )
  
    // @LINE:16
    def home: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.Application.home",
      """
        function() {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "home"})
        }
      """
    )
  
    // @LINE:26
    def activities: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.Application.activities",
      """
        function() {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "activities/998"})
        }
      """
    )
  
    // @LINE:11
    def index: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.Application.index",
      """
        function() {
          return _wA({method:"GET", url:"""" + _prefix + """"})
        }
      """
    )
  
    // @LINE:23
    def design: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.Application.design",
      """
        function() {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "design"})
        }
      """
    )
  
  }

  // @LINE:30
  class ReverseHelpController(_prefix: => String) {

    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:42
    def upload: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.HelpController.upload",
      """
        function() {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "help/upload"})
        }
      """
    )
  
    // @LINE:39
    def logistics: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.HelpController.logistics",
      """
        function() {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "help/logistics"})
        }
      """
    )
  
    // @LINE:38
    def download: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.HelpController.download",
      """
        function() {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "help/download"})
        }
      """
    )
  
    // @LINE:46
    def services: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.HelpController.services",
      """
        function() {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "about/services"})
        }
      """
    )
  
    // @LINE:40
    def process: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.HelpController.process",
      """
        function() {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "help/process"})
        }
      """
    )
  
    // @LINE:33
    def other: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.HelpController.other",
      """
        function() {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "faq/other"})
        }
      """
    )
  
    // @LINE:45
    def contactus: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.HelpController.contactus",
      """
        function() {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "about/contactus"})
        }
      """
    )
  
    // @LINE:34
    def payment: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.HelpController.payment",
      """
        function() {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "faq/payment"})
        }
      """
    )
  
    // @LINE:41
    def returns: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.HelpController.returns",
      """
        function() {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "help/returns"})
        }
      """
    )
  
    // @LINE:32
    def order: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.HelpController.order",
      """
        function() {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "faq/order"})
        }
      """
    )
  
    // @LINE:30
    def account: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.HelpController.account",
      """
        function() {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "faq/account"})
        }
      """
    )
  
    // @LINE:35
    def printing: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.HelpController.printing",
      """
        function() {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "faq/printing"})
        }
      """
    )
  
    // @LINE:37
    def chromatism: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.HelpController.chromatism",
      """
        function() {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "help/chromatism"})
        }
      """
    )
  
    // @LINE:44
    def introduction: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.HelpController.introduction",
      """
        function() {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "about/introduction"})
        }
      """
    )
  
    // @LINE:31
    def distribution: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.HelpController.distribution",
      """
        function() {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "faq/distribution"})
        }
      """
    )
  
  }


}
