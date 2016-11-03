
// @GENERATOR:play-routes-compiler
// @SOURCE:/Users/humorHan/work/reaf-print-dom-server/conf/routes
// @DATE:Wed Nov 02 15:46:31 CST 2016

import play.api.mvc.{ QueryStringBindable, PathBindable, Call, JavascriptLiteral }
import play.core.routing.{ HandlerDef, ReverseRouteContext, queryString, dynamicString }


import _root_.controllers.Assets.Asset

// @LINE:4
package controllers {

  // @LINE:4
  class ReverseAssets(_prefix: => String) {
    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:4
    def at(file:String): Call = {
    
      (file: @unchecked) match {
      
        // @LINE:4
        case (file)  =>
          implicit val _rrc = new ReverseRouteContext(Map(("path", "/public")))
          Call("GET", _prefix + { _defaultPrefix } + "assets/" + implicitly[PathBindable[String]].unbind("file", file))
      
      }
    
    }
  
  }

  // @LINE:50
  class ReverseAdminController(_prefix: => String) {
    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:50
    def orderList(): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "admin/order/list")
    }
  
    // @LINE:51
    def order(): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "admin/order")
    }
  
    // @LINE:54
    def editProduct(): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "admin/product/edit")
    }
  
    // @LINE:52
    def editOrder(): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "admin/order/edit")
    }
  
  }

  // @LINE:58
  class ReverseProxyController(_prefix: => String) {
    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:58
    def proxyPass(path:String): Call = {
    
      (path: @unchecked) match {
      
        // @LINE:58
        case (path)  =>
          import ReverseRouteContext.empty
          Call("GET", _prefix + { _defaultPrefix } + "api/" + implicitly[PathBindable[String]].unbind("path", path))
      
      }
    
    }
  
  }

  // @LINE:11
  class ReverseApplication(_prefix: => String) {
    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:12
    def product(id:Int = -1): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "product" + queryString(List(if(id == -1) None else Some(implicitly[QueryStringBindable[Int]].unbind("id", id)))))
    }
  
    // @LINE:14
    def cart(): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "cart")
    }
  
    // @LINE:19
    def pay(): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "pay")
    }
  
    // @LINE:13
    def customProduct(): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "product/custom")
    }
  
    // @LINE:24
    def notFound(): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "404")
    }
  
    // @LINE:15
    def cartConfirm(): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "cart/confirm")
    }
  
    // @LINE:22
    def equipmentLeasing(): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "equipmentLeasing")
    }
  
    // @LINE:20
    def paySuccess(): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "pay/success")
    }
  
    // @LINE:17
    def order(): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "order")
    }
  
    // @LINE:16
    def home(): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "home")
    }
  
    // @LINE:26
    def activities(): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "activities/998")
    }
  
    // @LINE:11
    def index(): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix)
    }
  
    // @LINE:23
    def design(): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "design")
    }
  
  }

  // @LINE:30
  class ReverseHelpController(_prefix: => String) {
    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:42
    def upload(): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "help/upload")
    }
  
    // @LINE:39
    def logistics(): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "help/logistics")
    }
  
    // @LINE:38
    def download(): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "help/download")
    }
  
    // @LINE:46
    def services(): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "about/services")
    }
  
    // @LINE:40
    def process(): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "help/process")
    }
  
    // @LINE:33
    def other(): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "faq/other")
    }
  
    // @LINE:45
    def contactus(): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "about/contactus")
    }
  
    // @LINE:34
    def payment(): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "faq/payment")
    }
  
    // @LINE:41
    def returns(): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "help/returns")
    }
  
    // @LINE:32
    def order(): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "faq/order")
    }
  
    // @LINE:30
    def account(): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "faq/account")
    }
  
    // @LINE:35
    def printing(): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "faq/printing")
    }
  
    // @LINE:37
    def chromatism(): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "help/chromatism")
    }
  
    // @LINE:44
    def introduction(): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "about/introduction")
    }
  
    // @LINE:31
    def distribution(): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "faq/distribution")
    }
  
  }


}
