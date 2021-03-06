
package views.html.templates.faq

import play.twirl.api._
import play.twirl.api.TemplateMagic._


     object order_Scope0 {
import models._
import controllers._
import play.api.i18n._
import views.html._
import play.api.templates.PlayMagic._
import play.api.mvc._
import play.api.data._

class order extends BaseScalaTemplate[play.twirl.api.HtmlFormat.Appendable,Format[play.twirl.api.HtmlFormat.Appendable]](play.twirl.api.HtmlFormat) with play.twirl.api.Template1[views.params.PageParam,play.twirl.api.HtmlFormat.Appendable] {

  /**/
  def apply/*1.2*/()(implicit pageParam: views.params.PageParam):play.twirl.api.HtmlFormat.Appendable = {
    _display_ {
      {
import views.html.templates._

Seq[Any](format.raw/*1.48*/("""
"""),format.raw/*3.1*/("""
"""),_display_(/*4.2*/main("常见问题-订单类")/*4.18*/ {_display_(Seq[Any](format.raw/*4.20*/("""
	"""),format.raw/*5.2*/("""<link rel="stylesheet" type="text/css" href="/assets/css/sidebar.css">
	<link rel="stylesheet" type="text/css" href="/assets/css/help.css">
""")))}/*7.2*/ {_display_(Seq[Any](format.raw/*7.4*/("""
	"""),format.raw/*8.2*/("""<div class="box helper_box">
        <div class="container">
			<div class="helper_layout">
				<dl id="sidebar" class="sidebar">
				    <dt><a href="javascript:;">常见问题</a></dt>
				    <dd><a href="/faq/account">账号类</a></dd>
				    <dd><a href="/faq/order" class="sel">订单类</a></dd>
				    <dd><a href="/faq/payment">支付类</a></dd>
				    <dd><a href="/faq/distribution">配送类</a></dd>
				    <dd><a href="/faq/printing">印刷类</a></dd>
				    <dd><a href="/faq/other">其他类</a></dd>
				    <dt><a href="javascript:;">印刷知识</a></dt>
				    <dd><a href="/help/upload">上传文件须知</a></dd>
				    <dd><a href="/help/chromatism">关于色差</a></dd>
				    <dd><a href="/help/download">空白模板下载</a></dd>
				    <dt><a href="javascript:;">订购指南</a></dt>
				    <dd><a href="/help/process">订购流程</a></dd>
				    <dd><a href="/help/logistics">物流查询</a></dd>
				    <dt><a href="javascript:;">售后服务</a></dt>
				    <dd><a href="/help/returns">退换货说明</a></dd>
		    		<dt></dt>
				</dl>
				<div class="helper_right_container">
					<div class="helper_title"><span>订单类</span></div>
					<div class="content_container">
						<dl class="faq_item open">
							<dt class="faq_tit"> <span>1.如何下单？</span> </dt>
							<dd class="faq_contain">
								<div>具体内容见<a href="/help/process" target="_blank">"订购流程"</a>。</div>
								<div>下单一般流程如下：</div>
								<div class="img">
									<img src="/assets/img/order_process.png" alt="酱印网">
								</div>
							</dd>
						</dl>
						<dl class="faq_item">
							<dt class="faq_tit"><span>2.可以拨打客服热线/联系QQ客服下单吗？</span> </dt>
							<dd class="faq_contain">
								<div>可以。如果您对网站下单流程已经比较熟悉，建议直接使用网站下单，更加便捷、高效。</div>
							</dd>
						</dl>
						<dl class="faq_item">
							<dt class="faq_tit"> <span>3.如何上传印刷文件？</span> </dt>
							<dd class="faq_contain">
								<div>1、在您确认订单时，可以点击上传文件按钮，上传各个商品对应的印刷文件。</div>
								<div>2、在订单详情页（从“<a href="/home" target="_blank">我的订单</a>”页面点击“查看订单详情”进入具体的订单详情页）中，也可以点击上传文件按钮，上传各个商品对应的印刷文件。</div>
								<div>
									<p>具体上传文件方式如下：</p>
		                        	<p>上传您电脑中的本地文件。文件格式支持ai、cdr、psd、pdf，具体印刷文件要求见“<a href="/help/upload" target="_blank">上传文件须知</a>”。</p>
		                        </div>
							</dd>
						</dl>
						<dl class="faq_item">
							<dt class="faq_tit"> <span>4.印刷文件需要什么格式？</span> </dt>
							<dd class="faq_contain">
								<div>目前印刷文件支持ai、cdr、psd、pdf、jpg格式；如果上传jpg图片，请确保分辨率为300~350DPI，色彩模式为CMYK。</div>
								<div>如果需要上传多个文件，请将以上文件压缩为rar/zip格式上传。</div>
								<div>具体见"<a href="/help/upload.html">上传文件须知</a>"。</div>
								
							</dd>
						</dl>
						<dl class="faq_item">
							<dt class="faq_tit"> <span>5.一次需要印刷多个产品的话怎么下单？</span> </dt>
							<dd class="faq_contain">
								<div>如果是印刷同一种产品（纸质、数量、工艺一致），但印刷信息不同，请在备注中说明，并且将包含不同印刷信息的各个文件打包压缩后上传。</div>
								<div>如果需要印刷不同产品，则分别选择产品加入购物车，提交订单后一起支付。</div>
							</dd>
						</dl>
						<dl class="faq_item">
							<dt class="faq_tit"> <span>6.定制商品怎么下单？</span> </dt>
							<dd class="faq_contain">
								<div>对于网上没有展现的印刷产品，您可以咨询我们的客服是否可以生产。确认报价后，在“<a href="/product/custom" target="_blank">按需定制</a>”页面填写商品信息下单。</div>
								<div>当然，您也可以直接填写信息下单，下单后我们的客服将联系您，与您确认商品信息及商品报价。</div>
							</dd>
						</dl>
						<dl class="faq_item">
							<dt class="faq_tit"> <span>7.印刷文件上传错了怎么办？/印刷文件上传了还可以修改吗？</span> </dt>
							<dd class="faq_contain">
								<div>在确认订单页面及订单详情页，您可以随时上传/修改/删除印刷文件。</div>
								<div>请尽可能在酱印网客服确认接单前，完成各个商品印刷文件的上传。只有印刷文件上传并且正确无误，商品才会开始投入生产。</div>
								<div>在酱印网客服确认接单后，如果印刷文件有改动，请联系客服进行沟通，若商品已投入生产，则改动后的印刷信息将不会被再次生产。</div>
							</dd>
						</dl>
						<dl class="faq_item">
							<dt class="faq_tit"> <span>8.订单提交成功后，还可以修改订单信息吗？</span> </dt>
							<dd class="faq_contain">
								<div>订单提交后，购买的商品信息不支持修改。您可以拨打400-038-6898或通过QQ联系客服人员修改订单。</div>
								<div>若酱印网客服尚未确认接单，您也可以直接自行取消此订单后重新下单。</div>
							</dd>
						</dl>
						<dl class="faq_item">
							<dt class="faq_tit"> <span>9.如何取消订单？</span> </dt>
							<dd class="faq_contain">
								<div>若订单尚未被客服确认接单，您可以在订单详情页面直接取消订单。若已完成在线支付，取消订单后付款金额将2-3个工作日内原路返回给您。</div>
								<div>若订单已被客服确认接单，则不支持取消订单，如有疑问，可以直接联系客服进一步沟通。</div>
							</dd>
						</dl>
						<dl class="faq_item">
							<dt class="faq_tit"> <span>10.订单取消后还能恢复吗？</span> </dt>
							<dd class="faq_contain">
								<div>订单取消后，将无法进行恢复。因此，请您取消订单前确认相关信息。</div>
							</dd>
						</dl>
						<dl class="faq_item">
							<dt class="faq_tit"> <span>11.订单取消后怎么进行退款？</span> </dt>
							<dd class="faq_contain">
								<div>当您取消订单成功后，如已涉及支付，系统自动退款，订单金额将原路退回您的支付账户。</div>
							</dd>
						</dl>
						<dl class="faq_item">
							<dt class="faq_tit"> <span>12.怎么查看我的订单？</span> </dt>
							<dd class="faq_contain">
								<div>在网站右上角点击"我的订单"按钮，可以进入“<a href="/home" target="_blank">我的订单</a>”页面查看订单基本信息；</div>
								<div>在"我的订单"页面"查看订单详情"，可以查看各订单的详细信息。</div>
							</dd>
						</dl>
						<dl class="faq_item">
							<dt class="faq_tit"> <span>13.网站支持哪些配送方式？</span> </dt>
							<dd class="faq_contain">
								<div>系统支持两种配送方式：酱印网配送（仅限北京部分地区）、第三方物流。</div>
							</dd>
						</dl>
						<dl class="faq_item">
							<dt class="faq_tit"> <span>14.需求联系人有什么用？</span> </dt>
							<dd class="faq_contain">
								<div>在订单中印刷文件缺失、有误，或者存在按需定制商品时，酱印网客服将会联系需求联系人沟通、确认。</div>
							</dd>
						</dl>
						<dl class="faq_item">
							<dt class="faq_tit"> <span>15.如何修改收货人、需求联系人等信息？</span> </dt>
							<dd class="faq_contain">
								<div>您可以在订单确认页面填写、修改收货人、需求联系人等信息。</div>
								<div>如果您已经提交订单需要修改这些信息，请及时联系我们的客服记录并更新。</div>
							</dd>
						</dl>
					</div>
				</div>
				<div class="clear"></div>
			</div>
		</div>
	</div>
""")))}/*149.2*/ {_display_(Seq[Any](format.raw/*149.4*/("""
	"""),format.raw/*150.2*/("""<script type="text/javascript">
		!function()
		"""),format.raw/*152.3*/("""{"""),format.raw/*152.4*/("""
			"""),format.raw/*153.4*/("""$(".helper_right_container").delegate("dt.faq_tit, .open .faq_close a","click",function(e)
				"""),format.raw/*154.5*/("""{"""),format.raw/*154.6*/("""
					"""),format.raw/*155.6*/("""var a=$(this).closest(".faq_item");
					a.hasClass("open")?a.removeClass("open").siblings("dl.faq_item").removeClass("open"):a.addClass("open").siblings("dl.faq_item").removeClass("open")
				"""),format.raw/*157.5*/("""}"""),format.raw/*157.6*/("""
			"""),format.raw/*158.4*/(""");
		"""),format.raw/*159.3*/("""}"""),format.raw/*159.4*/("""();
	</script>
""")))}),format.raw/*161.2*/("""
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
object order extends order_Scope0.order
              /*
                  -- GENERATED --
                  DATE: Wed Nov 02 15:46:32 CST 2016
                  SOURCE: /Users/humorHan/work/reaf-print-dom-server/app/views/templates/faq/order.scala.html
                  HASH: b3bec99e1df1da26bcb8d3dd4a85bb0dd8b37657
                  MATRIX: 557->1|727->47|754->79|781->81|805->97|844->99|872->101|1030->242|1068->244|1096->246|6655->5786|6695->5788|6725->5790|6801->5838|6830->5839|6862->5843|6985->5938|7014->5939|7048->5945|7269->6138|7298->6139|7330->6143|7363->6148|7392->6149|7439->6165
                  LINES: 20->1|25->1|26->3|27->4|27->4|27->4|28->5|30->7|30->7|31->8|172->149|172->149|173->150|175->152|175->152|176->153|177->154|177->154|178->155|180->157|180->157|181->158|182->159|182->159|184->161
                  -- GENERATED --
              */
          