
package views.html.templates

import play.twirl.api._
import play.twirl.api.TemplateMagic._


     object pageHeader_Scope0 {
import models._
import controllers._
import play.api.i18n._
import views.html._
import play.api.templates.PlayMagic._
import play.api.mvc._
import play.api.data._

class pageHeader extends BaseScalaTemplate[play.twirl.api.HtmlFormat.Appendable,Format[play.twirl.api.HtmlFormat.Appendable]](play.twirl.api.HtmlFormat) with play.twirl.api.Template2[Boolean,views.params.PageParam,play.twirl.api.HtmlFormat.Appendable] {

  /**/
  def apply/*1.2*/(showNavigationBar: Boolean = true)(implicit param: views.params.PageParam):play.twirl.api.HtmlFormat.Appendable = {
    _display_ {
      {


Seq[Any](format.raw/*1.77*/("""

"""),format.raw/*3.22*/("""
"""),format.raw/*4.1*/("""<script type="text/javascript">
    if (document.referrer.indexOf("baidu.com") >=0 || document.location.href === "http://www.soyyin.com/") """),format.raw/*5.108*/("""{"""),format.raw/*5.109*/("""
        """),format.raw/*6.9*/("""var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
        document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F5014582dd695d7245fed59e668a39588' type='text/javascript'%3E%3C/script%3E"));
    """),format.raw/*8.5*/("""}"""),format.raw/*8.6*/("""
"""),format.raw/*9.1*/("""</script>
<div class="box header">
    <div class="box header-fixed">
        <div class="container">
            <ul class="header-fixed-list">
                <!-- 未登录状态 -->
                <li class="log-out"><a href="javascript:;" id="login_in_header">登录</a></li>
                <li class="log-out"><a href="/static/register.html">注册</a></li>
                <!-- 已登录状态 -->
                <li class="log-in list-menu">
                    <span>欢迎您，<span id="userName" class="font-color">酱油君</span></span>
                    <img src="/assets/img/arrow_top_color.png">
                    <ul class="nav-address-tip">
                        <li><a href="/home">我的订单</a></li>
                        <li><a class="logout-in-header" href="javascript:;">退出</a></li>
                    </ul>
                </li>
                <li class="log-in"><a class="logout-in-header" href="javascript:;">[退出]</a></li>
                <li><a class="img-contain" href="/faq/account"><img class="img-middle" src="/assets/img/help.png">帮助中心</a></li>
            </ul>
            <div class="nav-address">
                <span>配送至：北京</span>
                <img src="/assets/img/arrow_top.png">
                <div class="nav-address-tip">暂不支持其他区域</div>
            </div>
            <div class="nav-welcome">您好，欢迎光临酱印网！<a target="_blank" href="http://q.url.cn/s/9VHYO">客服QQ：2852519982</a></div>
        </div>
    </div>
    <!-- 右上角购物车按钮 -->
    <div class="box header-logo">
        <div class="container header-title">
            <div class="cart-btn img-contain" id="showCartBtn">
                <img class="img-middle" src="/assets/img/cart_icon.png">
                <a href="/cart" class="no-product-link" id="go_to_cart">购物车></a>
                <span class="cart-num" id="cart_item_count"></span>
                <div class="cart-drop">
                    <div class="spacer"></div>
                    <div class="cart-content">
                        <div class="no-cart" id="no_cart_item">购物车还没有商品哦，快去挑选心仪的商品吧~</div>
                        <div class="cart-lists" id="cart_item_list">
                            <div class="cart-title">最新加入的商品：</div>
                            <div class="cart-body" id="cart_item_content">
                            </div>
                            <div class="cart-footer"><a href="/cart" class="cart-footer-link">查看购物车></a></div>
                        </div>
                    </div>
                </div>
            </div>
            <a class="logo-link" href="/" title="【酱印网】物料制作_公关会展_场地_活动整包解决方案服务平台"><img src="/assets/img/yinshua_logo.png"></a>
        </div>
    </div>
    """),_display_(/*60.6*/if(showNavigationBar)/*60.27*/ {_display_(Seq[Any](format.raw/*60.29*/(""" """),_display_(/*60.31*/navigationBar()),format.raw/*60.46*/(""" """)))}),format.raw/*60.48*/("""
"""),format.raw/*61.1*/("""</div>
<!-- 结束 -->
<div class="toolbar-right">
    <div class="toolbar-border-right"></div>
    <div class="toolbar-content">
        <a class="sidebar-btn content-qq" target="_blank" href="http://q.url.cn/s/9VHYO" title="联系客服"></a>
        <a class="sidebar-btn call-phone" title="拨打电话" id="sidebar_call_btn"></a>
        <a class="sidebar-btn goto-top" href="#" title="返回顶部"></a>
        <div class="sidebar-input-box" id="sidebar_input_box">
            <a id="sidebar_close"></a>
            <div class="sidebar-title">热线电话</div>
            <div class="sidebar-tel">400-038-6898</div>
            <div class="sidebar-qq">
                <a target="_blank" href="http://q.url.cn/s/9VHYO">
                    <img border="0" src="http://wpa.qq.com/pa?p=2:2780471630:52" alt="点击这里给我发消息" title="点击这里给我发消息"/>
                    <span>2852519982</span>
                </a>
            </div>
            <input type="text" placeholder="请输入您的电话号码" id="contact_phone_input">
            <a id="call_phone_submit" target="_blank" href="http://q.url.cn/s/9VHYO">免费通话</a>
            <div class="sidebar-triangle"></div>
        </div>
    </div>
</div>
"""))
      }
    }
  }

  def render(showNavigationBar:Boolean,param:views.params.PageParam): play.twirl.api.HtmlFormat.Appendable = apply(showNavigationBar)(param)

  def f:((Boolean) => (views.params.PageParam) => play.twirl.api.HtmlFormat.Appendable) = (showNavigationBar) => (param) => apply(showNavigationBar)(param)

  def ref: this.type = this

}


}

/**/
object pageHeader extends pageHeader_Scope0.pageHeader
              /*
                  -- GENERATED --
                  DATE: Thu Nov 03 11:51:57 CST 2016
                  SOURCE: /Users/humorHan/work/reaf-print-dom-server/app/views/templates/pageHeader.scala.html
                  HASH: 0b0502cf63945d9e07da6a73dc94ce22654465cf
                  MATRIX: 571->1|741->76|770->99|797->100|964->239|993->240|1028->249|1315->510|1342->511|1369->512|4040->3157|4070->3178|4110->3180|4139->3182|4175->3197|4208->3199|4236->3200
                  LINES: 20->1|25->1|27->3|28->4|29->5|29->5|30->6|32->8|32->8|33->9|84->60|84->60|84->60|84->60|84->60|84->60|85->61
                  -- GENERATED --
              */
          