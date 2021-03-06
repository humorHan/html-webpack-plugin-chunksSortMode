
package views.html.templates.about

import play.twirl.api._
import play.twirl.api.TemplateMagic._


     object introduction_Scope0 {
import models._
import controllers._
import play.api.i18n._
import views.html._
import play.api.templates.PlayMagic._
import play.api.mvc._
import play.api.data._

class introduction extends BaseScalaTemplate[play.twirl.api.HtmlFormat.Appendable,Format[play.twirl.api.HtmlFormat.Appendable]](play.twirl.api.HtmlFormat) with play.twirl.api.Template1[views.params.PageParam,play.twirl.api.HtmlFormat.Appendable] {

  /**/
  def apply/*1.2*/()(implicit pageParam: views.params.PageParam):play.twirl.api.HtmlFormat.Appendable = {
    _display_ {
      {
import views.html.templates._

Seq[Any](format.raw/*1.48*/("""
"""),format.raw/*3.1*/("""
"""),_display_(/*4.2*/main("公司简介")/*4.14*/ {_display_(Seq[Any](format.raw/*4.16*/("""
	"""),format.raw/*5.2*/("""<link rel="stylesheet" type="text/css" href="/assets/css/sidebar.css">
	<link rel="stylesheet" type="text/css" href="/assets/css/help.css">
""")))}/*7.2*/ {_display_(Seq[Any](format.raw/*7.4*/("""
	"""),format.raw/*8.2*/("""<div class="box helper_box">
        <div class="container">
        	<div class="helper_layout">
				<dl id="sidebar" class="sidebar">
				    <dt><a href="javascript:;">关于我们</a></dt>
				    <dd><a href="/about/introduction" class="sel">公司简介</a></dd>
				    <dd><a href="/about/contactus">联系我们</a></dd>
				    <dd><a href="/about/services">服务声明</a></dd>
				</dl>
				<div class="helper_right_container">
					<div class="helper_title"><span>公司简介</span></div>
					<div class="content_container">
						<div>
							<p>北京小酱油文化传媒有限公司成立于2014年7月，旗下酱印网是新一代互联网印刷品牌。酱印网将以互联网的方式重构传统商务印刷领域，致力于打造中国最大的互联网印刷和设计服务平台。团队核心成员来自腾讯、阿里等知名企业。</p>
							<p>公司在2014年获得北软、厚德和百度前高管蔡虎的百万级天使轮融资，在2015年获得近千万preA轮融资，目前逐步发展成为集线上活动及票务平台、宣传品印制、活动周边相关物料购销、活动品牌传播整合服务为一体的综合型企业。</p>
						</div>
						<h3>酱印网文化</h3>
						<div>
							<p>我们的目标：质量好、价格低、速度快、服务优</p>
							<p>我们的宗旨：借助互联网技术，改造传统印刷行业，为客户提供高品质、个性化、全品类的印刷定制服务。</p>
						</div>
						<h3>酱印网公关会展服务介绍</h3>
						<div>
							<p>整体策划</p>
							<p>会议执行</p>
							<p>舞台及会场搭建</p>
							<p>灯光音响，投影等设备租赁</p>
							<p>主视觉设计，现场相关设计</p>
							<p>人员服务（摄影、摄像、速记、同声传译、编导等）</p>
							<p>演出及节目</p>
							<p>公关传播</p>
							<p>Overall planning</p>
							<p>Hotel and conference reception</p>
							<p>Stage and venue set up</p>
							<p>Sound lighting,projectors and other equipment leasing</p>
							<p>The main visual design,site-related design</p>
							<p>Personnel services (photography,video,shorthand,simultaneous interpretation,director,etc.)</p>
							<p>Program performance</p>
							<p>PR</p>
						</div>
						<h3>酱印网优势</h3>
						<div>
							<p>产品丰富：</p>
							<p>酱印网致力于向用户提供最优质的印刷和设计服务。主要产品包括名片、会员卡、宣传单、海报、折页、易拉宝、X展架、封套、画册、宣传册、手提袋、信纸、信封、档案袋、文件夹、文件袋、标签、相片书、个性化包装、个性化印品等。</p>
							<p>品质卓越：</p>
							<p>酱印网自创立之初，就对产品有着极致的追求。酱印网所有的产品都采用先进的印刷设备进行生产。优质的原材料、完善的色彩管理流程以及经验丰富的操作人员保证了产品的绝佳品质。</p>
							<p>高效快捷：</p>
							<p>酱印网自主开发了在线下单平台、ERP系统，文件云储存等特有功能，方便用户无论何时何地都可以在线下单；同时酱印网陆续在各大商业商务中心建立了实体门店，方便用户来店体验，并且为门店周边提供送货上门等更多服务。</p>
							<p>服务保障：</p>
							<p>酱印网推出了沟通无忧服务，无论通过客服热线还是客服QQ，您都可以轻松联系到酱印网客服。酱印网还有购物无忧服务，为您提供7天退换货服务保障，无论是产品质量，还是运输损坏问题，全部都由酱印网承担，真正让您购物无忧。</p>
						</div>
					</div>
				</div>
				<div class="clear"></div>
			</div>
		</div>
	</div>
""")))}/*65.2*/ {_display_(Seq[Any](format.raw/*65.4*/("""
"""),format.raw/*66.1*/("""<!-- js 们 -->
""")))}),format.raw/*67.2*/("""
"""))
      }
    }
  }

  def render(pageParam:views.params.PageParam): play.twirl.api.HtmlFormat.Appendable = apply()(pageParam)

  def f:(() => (views.params.PageParam) => play.twirl.api.HtmlFormat.Appendable) = () => (pageParam) => apply()(pageParam)

  def ref: this.type = this

}


}

/**/
object introduction extends introduction_Scope0.introduction
              /*
                  -- GENERATED --
                  DATE: Wed Nov 02 15:46:32 CST 2016
                  SOURCE: /Users/humorHan/work/reaf-print-dom-server/app/views/templates/about/introduction.scala.html
                  HASH: e7210ba8d3ad3ec563fe877e73bda0601baac3d9
                  MATRIX: 573->1|743->47|770->79|797->81|817->93|856->95|884->97|1042->238|1080->240|1108->242|3338->2454|3377->2456|3405->2457|3450->2472
                  LINES: 20->1|25->1|26->3|27->4|27->4|27->4|28->5|30->7|30->7|31->8|88->65|88->65|89->66|90->67
                  -- GENERATED --
              */
          