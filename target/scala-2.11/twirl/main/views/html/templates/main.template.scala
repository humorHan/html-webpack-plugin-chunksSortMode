
package views.html.templates

import play.twirl.api._
import play.twirl.api.TemplateMagic._


     object main_Scope0 {
import models._
import controllers._
import play.api.i18n._
import views.html._
import play.api.templates.PlayMagic._
import play.api.mvc._
import play.api.data._

class main extends BaseScalaTemplate[play.twirl.api.HtmlFormat.Appendable,Format[play.twirl.api.HtmlFormat.Appendable]](play.twirl.api.HtmlFormat) with play.twirl.api.Template9[String,Boolean,Boolean,String,String,Html,Html,Html,views.params.PageParam,play.twirl.api.HtmlFormat.Appendable] {

  /**/
  def apply/*1.2*/(title: String, showCart: Boolean = true, showNavigationBar: Boolean = true, description: String = "", keywords: String = "")(styles: Html)(content: Html)(jsFiles: Html)(implicit pageParam: views.params.PageParam):play.twirl.api.HtmlFormat.Appendable = {
    _display_ {
      {


Seq[Any](format.raw/*1.215*/("""

"""),format.raw/*3.1*/("""<!DOCTYPE html>
<html lang="en">
<head>
    """),_display_(/*6.6*/pageMeta(description, keywords)),format.raw/*6.37*/("""
    """),format.raw/*7.5*/("""<title>"""),_display_(/*7.13*/title),format.raw/*7.18*/("""</title>
    <link href="/assets/img/favicon.ico" rel="shortcut icon" type="image/x-icon">
    <link rel="stylesheet" type="text/css" href="/assets/css/normalize.css">
    <script type="text/javascript" src="/assets/js/mobile.js"></script>
    """),_display_(/*11.6*/styles),format.raw/*11.12*/("""
"""),format.raw/*12.1*/("""</head>
<body>
    """),_display_(/*14.6*/pageHeader(showNavigationBar)),format.raw/*14.35*/("""

    """),_display_(/*16.6*/content),format.raw/*16.13*/("""

    """),_display_(/*18.6*/pageFooter(showCart)),format.raw/*18.26*/("""
    """),format.raw/*19.5*/("""<script src="http://cdn.staticfile.org/jquery/1.11.0/jquery.min.js" type="text/javascript"></script>
    <script src="http://cdn.staticfile.org/jquery-cookie/1.4.0/jquery.cookie.min.js"></script>
    <script src="/assets/js/main.js"></script>
    <script src="/assets/js/login.js"></script>
    """),_display_(/*23.6*/jsFiles),format.raw/*23.13*/("""
    """),format.raw/*24.5*/("""<div style="display:none">
        <script src="http://s11.cnzz.com/z_stat.php?id=1258858023&web_id=1258858023" language="JavaScript"></script>
    </div>
</body>
</html>
"""))
      }
    }
  }

  def render(title:String,showCart:Boolean,showNavigationBar:Boolean,description:String,keywords:String,styles:Html,content:Html,jsFiles:Html,pageParam:views.params.PageParam): play.twirl.api.HtmlFormat.Appendable = apply(title,showCart,showNavigationBar,description,keywords)(styles)(content)(jsFiles)(pageParam)

  def f:((String,Boolean,Boolean,String,String) => (Html) => (Html) => (Html) => (views.params.PageParam) => play.twirl.api.HtmlFormat.Appendable) = (title,showCart,showNavigationBar,description,keywords) => (styles) => (content) => (jsFiles) => (pageParam) => apply(title,showCart,showNavigationBar,description,keywords)(styles)(content)(jsFiles)(pageParam)

  def ref: this.type = this

}


}

/**/
object main extends main_Scope0.main
              /*
                  -- GENERATED --
                  DATE: Thu Nov 03 11:51:57 CST 2016
                  SOURCE: /Users/humorHan/work/reaf-print-dom-server/app/views/templates/main.scala.html
                  HASH: a437829fd854a2cc434081bf7aa3ee5085490b5b
                  MATRIX: 603->1|912->214|940->216|1010->261|1061->292|1092->297|1126->305|1151->310|1422->555|1449->561|1477->562|1523->582|1573->611|1606->618|1634->625|1667->632|1708->652|1740->657|2062->953|2090->960|2122->965
                  LINES: 20->1|25->1|27->3|30->6|30->6|31->7|31->7|31->7|35->11|35->11|36->12|38->14|38->14|40->16|40->16|42->18|42->18|43->19|47->23|47->23|48->24
                  -- GENERATED --
              */
          