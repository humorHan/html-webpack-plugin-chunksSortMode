webpackJsonp([3,19],[
/* 0 */
/***/ function(module, exports) {

	(function() {
	    //配送区域select插件初始化
	    $("#receiver_province").chosen({
	        width: "124px",
	        search_contains: true,
	        no_results_text: "无匹配结果"
	    });
	    $("#receiver_city").chosen({
	        width: "124px",
	        search_contains: true,
	        no_results_text: "无匹配结果"
	    });
	    $("#receiver_county").chosen({
	        width: "124px",
	        search_contains: true,
	        no_results_text: "无匹配结果"
	    });
	    /*
	        初始化获取省级列表
	     */
	    var container = $("#product_item");
	    $http('/api/v2/others/get-address').get(function(result) {
	        if (result.consignee_name) {
	            $("#receiver_name").val(result.consignee_name);
	            $("#receiver_address").val(result.address);
	            $("#receiver_phone").val(result.consignee_phone);
	            $("#receiver_code").val(result.post_code);
	            get_provice_regions(result.regions[0].id);
	            set_provice_city(result.regions[0].id, result.regions[1].id);
	            set_city_county(result.regions[1].id, result.regions.length === 3 ? result.regions[2].id : "");
	
	            var show_phone = result.consignee_phone.substring(0, 3) + '****' + result.consignee_phone.substring(7, 11);
	            $("#display_receiver_name").text(result.consignee_name);
	            $("#display_receiver_phone").text(show_phone);
	            $("#display_receiver_address").text(result.address);
	            $("#display_receiver_province").text(result.regions[0].name);
	            $("#display_receiver_city").text(result.regions[1].name);
	            result.regions.length === 3 && $("#display_receiver_county").text(result.regions[2].name);
	
	            $("#confirm_msg").text(result.consignee_name + " " + show_phone);
	            $("#confirm_receiver_address").text(result.address);
	            $("#confirm_receiver_province").text(result.regions[0].name);
	            $("#confirm_receiver_city").text(result.regions[1].name);
	            result.regions.length === 3 && $("#confirm_receiver_county").text(result.regions[2].name);
	
	            $("#edit_receiver_box").hide();
	            $("#display_receiver_box").show();
	        } else {
	            get_provice_regions('110100');
	            set_provice_city('110100');
	        }
	    }, false);
	    var url = '/api/v2/cart/confirm-data' + location.search;
	    $http(url).get(function(result) {
	        if (result === 5) {
	            location.href = '/';
	        } else {
	            result.img_link = IMG_LINK;
	            result.item_prices = 0;
	            if (result.items.length > 0) {
	                var items = result.items;
	                for (var i = 0; i < items.length; i++) {
	                    result.item_prices += items[i].price * items[i].quantity;
	                }
	            }
	            result.amount = '￥' + processData.processPrice(result.item_prices);
	            if (result.custom_items.length > 0) {
	                if (result.item_prices >= 20000) {
	                    result.freight = '￥0.00';
	                    result.freightTip = '（商品金额已满200元免运费）';
	                } else {
	                    result.freight = '￥ ？';
	                    result.freightTip = '（商品金额满200元即可免运费）';
	                }
	                result.amount += ' +？';
	                result.total = result.amount;
	            } else {
	                if (result.item_prices >= 20000) {
	                    result.freight = '￥ 0.00';
	                    result.freightTip = '（商品金额已满200元免运费）';
	                    result.total = result.amount;
	                } else {
	                    result.freight_price = 20000 - result.item_prices;
	                    result.freight = '￥ 10.00';
	                    result.freightTip = '（还差' + processData.processPrice(result.freight_price) + '元即可免运费）';
	                    result.total = '￥' + processData.processPrice(result.item_prices + 1000);
	                }
	            }
	            $("#product_template").tmpl(result).appendTo('#product_item');
	            $("#confirm_amount").text(result.amount);
	            $("#confirm_freight").html(result.freight + '<span class="item-tip">' + result.freightTip + '</span>');
	            $("#confirm_total").text(result.total);
	            $("#confirm_total_show").text(result.total);
	        }
	    }, false);
	
	    container.delegate(".add-file", "change", function(event) {
	        uploadComp.uploadFile(event);
	    });
	    container.delegate(".delete-file", "click", function(event) {
	        uploadComp.deleteFile(event);
	    });
	    //修改配送信息
	    $("#edit_receiver_btn").click(function() {
	        $("#edit_receiver_box").show();
	        $("#display_receiver_box").hide();
	    });
	    //保存配送信息
	    $("#save_receiver_btn").click(function() {
	        var name = $("#receiver_name").val();
	        if (!checkInputCondition("receiver_name", (/^.{1,25}$/.test(name) && $.trim(name) !== ""))) {
	            return;
	        }
	        if (!checkReceiverRegion()) {
	            return;
	        }
	        var address = $("#receiver_address").val();
	        if (!checkInputCondition("receiver_address", (/^[\s\S]{1,50}$/.test(address) && $.trim(address) !== ""))) {
	            return;
	        }
	        var phone = $("#receiver_phone").val();
	        if (!checkInputCondition("receiver_phone", (/^\d{11}$/.test(phone)))) {
	            return;
	        }
	        var code = $("#receiver_code").val();
	        if (!checkInputCondition("receiver_code", (/^[0-9]{0,6}$/.test(code)))) {
	            return;
	        }
	        //保存时修改显示状态的内容和页面底部提交时的内容
	        var name = $.trim($("#receiver_name").val());
	        var phone = $("#receiver_phone").val();
	        var address = $.trim($("#receiver_address").val());
	        var province = $("#receiver_province").find(":checked").text();
	        var city = $("#receiver_city").find(":checked").text();
	        var county = $("#receiver_county").find(":checked").text();
	        var data = {
	            consignee_name: name,
	            region_id: parseInt($("#receiver_county").val() ? $("#receiver_county").val() : $("#receiver_city").val()),
	            address: address,
	            post_code: $("#receiver_code").val(),
	            consignee_phone: phone
	        }
	        $http('/api/v2/others/save-address').post(data, function() {
	            var show_phone = phone.substring(0, 3) + '****' + phone.substring(7, 11);
	
	            $("#display_receiver_name").text(name);
	            $("#display_receiver_phone").text(show_phone);
	            $("#display_receiver_address").text(address);
	            $("#display_receiver_province").text(province);
	            $("#display_receiver_city").text(city);
	            $("#display_receiver_county").text(county);
	
	            $("#confirm_msg").text(name + " " + show_phone);
	            $("#confirm_receiver_address").text(address);
	            $("#confirm_receiver_province").text(province);
	            $("#confirm_receiver_city").text(city);
	            $("#confirm_receiver_county").text(county);
	
	            $("#edit_receiver_box").hide();
	            $("#display_receiver_box").show();
	        })
	
	    });
	    //填写配送信息内容判断
	    $("#receiver_name").change(function() {
	        var name = $(this).val();
	        checkInputCondition("receiver_name", (/^.{1,25}$/.test(name) && $.trim(name) !== ""));
	    });
	    $("#receiver_phone").change(function() {
	        var phone = $(this).val();
	        checkInputCondition("receiver_phone", (/^\d{11}$/.test(phone)));
	    });
	    $("#receiver_address").change(function() {
	        var address = $(this).val();
	        checkInputCondition("receiver_address", (/^[\s\S]{1,50}$/.test(address) && $.trim(address) !== ""));
	    });
	    $("#receiver_province").change(function() {
	        var id = $("#receiver_province").val();
	        set_provice_city(id);
	    });
	    $("#receiver_city").change(function() {
	        checkReceiverRegion();
	        var id = $("#receiver_city").val();
	        set_city_county(id);
	    });
	    $("#receiver_county").change(function() {
	        checkReceiverRegion();
	    });
	    $("#contact_name").change(function() {
	        var name = $(this).val();
	        checkInputCondition("contact_name", (/^.{0,25}$/.test(name) && $.trim(name) !== ""));
	    });
	    $("#contact_phone").change(function() {
	        var phone = $(this).val();
	        checkInputCondition("contact_phone", (phone == "" || /^\d{11}$/.test(phone)));
	    });
	    $("#receiver_code").change(function() {
	        var code = $(this).val();
	        checkInputCondition("receiver_code", (/^[0-9]{0,6}$/.test(code)));
	    });
	    $("#contact_qq").change(function() {
	        var qq = $(this).val();
	        checkInputCondition("contact_qq", (/^[0-9]{0,10}$/.test(qq)));
	    });
	    $("#receiver_invoice").change(function() {
	        var invoice = $(this).val();
	        checkInputCondition("receiver_invoice", (/^[\s\S]{0,50}$/.test(invoice) && $.trim(invoice) !== ""));
	    });
	    $("#receiver_remark").change(function() {
	        var remark = $(this).val();
	        checkInputCondition("receiver_remark", (/^[\s\S]{0,500}$/.test(remark) && $.trim(remark) !== ""));
	    });
	    //改变支付方式事件
	    $("#change_pay_method .pay-method").click(function(event) {
	        var target = event.target;
	        $("#change_pay_method .pay-method").removeClass("selected");
	        $(target).addClass("selected");
	    });
	    //是否需要添加需求联系人
	    $("#need_contact").click(function(event) {
	        var $target;
	        if (event.target.nodeName.toLowerCase() !== "a") {
	            $target = $(event.target).parent();
	        } else {
	            $target = $(event.target);
	        }
	        if ($target.hasClass("checked")) {
	            $target.removeClass("checked");
	            $("#need_contact_detail").show();
	        } else {
	            $target.addClass("checked");
	            $("#need_contact_detail").hide();
	        }
	        /* 
	         * IE浏览器取消事件处理，IE9，IE10已解决
	         * 这里如果不作处理，点击span元素会同时触发span和a各走一遍逻辑，最终结果是没变
	         * 然而IE11下没起作用，没办法解决了，不过问题不大，不影响使用
	         */
	        window.event.returnValue = false;
	        // window.event.cancelBubble = true;
	    });
	    //是否需要发票
	    $("#need_invoice").click(function(event) {
	        var $target;
	        if (event.target.nodeName.toLowerCase() !== "a") {
	            $target = $(event.target).parent();
	        } else {
	            $target = $(event.target);
	        }
	        if ($target.hasClass("checked")) {
	            $target.removeClass("checked");
	            $("#need_invoice_detail").hide();
	        } else {
	            $target.addClass("checked");
	            $("#need_invoice_detail").show();
	        }
	        window.event.returnValue = false;
	    });
	    //按需定制商品查看详情
	    showDemandDetail(container);
	    //提交订单
	    $("#create_order").click(function() {
	        if (!$("#edit_receiver_box").is(":hidden")) {
	            alert("请先保存收货地址");
	            return;
	        }
	        var qq = $("#contact_qq").val();
	        if (!checkInputCondition("contact_qq", (/^[0-9]{0,10}$/.test(qq)))) {
	            return;
	        }
	        var contact = false;
	        if (!$("#need_contact").hasClass("checked")) {
	            contact = true;
	            var name = $("#contact_name").val();
	            if (!checkInputCondition("contact_name", (/^.{1,25}$/.test(name) && $.trim(name) !== ""))) {
	                return;
	            }
	            var phone = $("#contact_phone").val();
	            if (!checkInputCondition("contact_phone", (/^\d{11}$/.test(phone)))) {
	                return;
	            }
	        }
	        var remark = $("#receiver_remark").val();
	        if (!checkInputCondition("receiver_remark", (/^[\s\S]{0,500}$/.test(remark)))) {
	            return;
	        }
	        var url = "/api/v2/orders/create";
	        var data = {
	            consignee_name: $.trim($("#receiver_name").val()),
	            address: $.trim($("#receiver_address").val()),
	            post_code: $("#receiver_code").val(),
	            consignee_phone: $("#receiver_phone").val(),
	            contact_name: contact ? $.trim($("#contact_name").val()) : "",
	            contact_phone: contact ? $("#contact_phone").val() : "",
	            contact_qq: $("#contact_qq").val(),
	            remark: $.trim($("#receiver_remark").val()),
	            payment: $($("#change_pay_method").children(".selected")[0]).attr("data-value"),
	        };
	        var search = location.search.substr(1).split("&");
	        item_ids = [];
	        for (var i = 0; i < search.length; i++) {
	            item_ids.push(search[i].replace("id=", "") * 1)
	        }
	        data.item_ids = item_ids;
	        data.region_id = ($("#receiver_county").val() ? $("#receiver_county").val() : $("#receiver_city").val()) * 1;
	        if ($("#need_invoice").hasClass("checked")) {
	            var invoice = $("#receiver_invoice").val();
	            if (!checkInputCondition("receiver_invoice", (/^[\s\S]{1,50}$/.test(invoice) && $.trim(invoice) !== ""))) {
	                return;
	            } else {
	                data.invoice_title = $("#receiver_invoice").val();
	            }
	        }
	        $http(url).post(data, function(result) {
	            if (data.payment === "ONLINE") {
	                location.href = "/pay?order_id=" + result.id;
	            } else {
	                location.href = "/order?id=" + result.id;
	            }
	        })
	    });
	
	})()


/***/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvY29uZmlybS1vcmRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBK0Isa0JBQWtCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSx3REFBdUQsS0FBSztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnRUFBK0QsS0FBSztBQUNwRTtBQUNBO0FBQ0E7QUFDQSwwREFBeUQsR0FBRztBQUM1RDtBQUNBO0FBQ0E7QUFDQSw0REFBMkQsSUFBSTtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVM7O0FBRVQsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLG1EQUFrRCxLQUFLO0FBQ3ZELE1BQUs7QUFDTDtBQUNBO0FBQ0EscURBQW9ELEdBQUc7QUFDdkQsTUFBSztBQUNMO0FBQ0E7QUFDQSwyREFBMEQsS0FBSztBQUMvRCxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLGtEQUFpRCxLQUFLO0FBQ3RELE1BQUs7QUFDTDtBQUNBO0FBQ0EsbUVBQWtFLEdBQUc7QUFDckUsTUFBSztBQUNMO0FBQ0E7QUFDQSx1REFBc0QsSUFBSTtBQUMxRCxNQUFLO0FBQ0w7QUFDQTtBQUNBLG9EQUFtRCxLQUFLO0FBQ3hELE1BQUs7QUFDTDtBQUNBO0FBQ0EsMkRBQTBELEtBQUs7QUFDL0QsTUFBSztBQUNMO0FBQ0E7QUFDQSwwREFBeUQsTUFBTTtBQUMvRCxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUF3RCxLQUFLO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJEQUEwRCxLQUFLO0FBQy9EO0FBQ0E7QUFDQTtBQUNBLDZEQUE0RCxHQUFHO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0RBQThELE1BQU07QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBdUIsbUJBQW1CO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9FQUFtRSxLQUFLO0FBQ3hFO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsVUFBUztBQUNULE1BQUs7O0FBRUwsRUFBQyIsImZpbGUiOiJqcy9jb25maXJtLW9yZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCkge1xuICAgIC8v6YWN6YCB5Yy65Z+fc2VsZWN05o+S5Lu25Yid5aeL5YyWXG4gICAgJChcIiNyZWNlaXZlcl9wcm92aW5jZVwiKS5jaG9zZW4oe1xuICAgICAgICB3aWR0aDogXCIxMjRweFwiLFxuICAgICAgICBzZWFyY2hfY29udGFpbnM6IHRydWUsXG4gICAgICAgIG5vX3Jlc3VsdHNfdGV4dDogXCLml6DljLnphY3nu5PmnpxcIlxuICAgIH0pO1xuICAgICQoXCIjcmVjZWl2ZXJfY2l0eVwiKS5jaG9zZW4oe1xuICAgICAgICB3aWR0aDogXCIxMjRweFwiLFxuICAgICAgICBzZWFyY2hfY29udGFpbnM6IHRydWUsXG4gICAgICAgIG5vX3Jlc3VsdHNfdGV4dDogXCLml6DljLnphY3nu5PmnpxcIlxuICAgIH0pO1xuICAgICQoXCIjcmVjZWl2ZXJfY291bnR5XCIpLmNob3Nlbih7XG4gICAgICAgIHdpZHRoOiBcIjEyNHB4XCIsXG4gICAgICAgIHNlYXJjaF9jb250YWluczogdHJ1ZSxcbiAgICAgICAgbm9fcmVzdWx0c190ZXh0OiBcIuaXoOWMuemFjee7k+aenFwiXG4gICAgfSk7XG4gICAgLypcbiAgICAgICAg5Yid5aeL5YyW6I635Y+W55yB57qn5YiX6KGoXG4gICAgICovXG4gICAgdmFyIGNvbnRhaW5lciA9ICQoXCIjcHJvZHVjdF9pdGVtXCIpO1xuICAgICRodHRwKCcvYXBpL3YyL290aGVycy9nZXQtYWRkcmVzcycpLmdldChmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgaWYgKHJlc3VsdC5jb25zaWduZWVfbmFtZSkge1xuICAgICAgICAgICAgJChcIiNyZWNlaXZlcl9uYW1lXCIpLnZhbChyZXN1bHQuY29uc2lnbmVlX25hbWUpO1xuICAgICAgICAgICAgJChcIiNyZWNlaXZlcl9hZGRyZXNzXCIpLnZhbChyZXN1bHQuYWRkcmVzcyk7XG4gICAgICAgICAgICAkKFwiI3JlY2VpdmVyX3Bob25lXCIpLnZhbChyZXN1bHQuY29uc2lnbmVlX3Bob25lKTtcbiAgICAgICAgICAgICQoXCIjcmVjZWl2ZXJfY29kZVwiKS52YWwocmVzdWx0LnBvc3RfY29kZSk7XG4gICAgICAgICAgICBnZXRfcHJvdmljZV9yZWdpb25zKHJlc3VsdC5yZWdpb25zWzBdLmlkKTtcbiAgICAgICAgICAgIHNldF9wcm92aWNlX2NpdHkocmVzdWx0LnJlZ2lvbnNbMF0uaWQsIHJlc3VsdC5yZWdpb25zWzFdLmlkKTtcbiAgICAgICAgICAgIHNldF9jaXR5X2NvdW50eShyZXN1bHQucmVnaW9uc1sxXS5pZCwgcmVzdWx0LnJlZ2lvbnMubGVuZ3RoID09PSAzID8gcmVzdWx0LnJlZ2lvbnNbMl0uaWQgOiBcIlwiKTtcblxuICAgICAgICAgICAgdmFyIHNob3dfcGhvbmUgPSByZXN1bHQuY29uc2lnbmVlX3Bob25lLnN1YnN0cmluZygwLCAzKSArICcqKioqJyArIHJlc3VsdC5jb25zaWduZWVfcGhvbmUuc3Vic3RyaW5nKDcsIDExKTtcbiAgICAgICAgICAgICQoXCIjZGlzcGxheV9yZWNlaXZlcl9uYW1lXCIpLnRleHQocmVzdWx0LmNvbnNpZ25lZV9uYW1lKTtcbiAgICAgICAgICAgICQoXCIjZGlzcGxheV9yZWNlaXZlcl9waG9uZVwiKS50ZXh0KHNob3dfcGhvbmUpO1xuICAgICAgICAgICAgJChcIiNkaXNwbGF5X3JlY2VpdmVyX2FkZHJlc3NcIikudGV4dChyZXN1bHQuYWRkcmVzcyk7XG4gICAgICAgICAgICAkKFwiI2Rpc3BsYXlfcmVjZWl2ZXJfcHJvdmluY2VcIikudGV4dChyZXN1bHQucmVnaW9uc1swXS5uYW1lKTtcbiAgICAgICAgICAgICQoXCIjZGlzcGxheV9yZWNlaXZlcl9jaXR5XCIpLnRleHQocmVzdWx0LnJlZ2lvbnNbMV0ubmFtZSk7XG4gICAgICAgICAgICByZXN1bHQucmVnaW9ucy5sZW5ndGggPT09IDMgJiYgJChcIiNkaXNwbGF5X3JlY2VpdmVyX2NvdW50eVwiKS50ZXh0KHJlc3VsdC5yZWdpb25zWzJdLm5hbWUpO1xuXG4gICAgICAgICAgICAkKFwiI2NvbmZpcm1fbXNnXCIpLnRleHQocmVzdWx0LmNvbnNpZ25lZV9uYW1lICsgXCIgXCIgKyBzaG93X3Bob25lKTtcbiAgICAgICAgICAgICQoXCIjY29uZmlybV9yZWNlaXZlcl9hZGRyZXNzXCIpLnRleHQocmVzdWx0LmFkZHJlc3MpO1xuICAgICAgICAgICAgJChcIiNjb25maXJtX3JlY2VpdmVyX3Byb3ZpbmNlXCIpLnRleHQocmVzdWx0LnJlZ2lvbnNbMF0ubmFtZSk7XG4gICAgICAgICAgICAkKFwiI2NvbmZpcm1fcmVjZWl2ZXJfY2l0eVwiKS50ZXh0KHJlc3VsdC5yZWdpb25zWzFdLm5hbWUpO1xuICAgICAgICAgICAgcmVzdWx0LnJlZ2lvbnMubGVuZ3RoID09PSAzICYmICQoXCIjY29uZmlybV9yZWNlaXZlcl9jb3VudHlcIikudGV4dChyZXN1bHQucmVnaW9uc1syXS5uYW1lKTtcblxuICAgICAgICAgICAgJChcIiNlZGl0X3JlY2VpdmVyX2JveFwiKS5oaWRlKCk7XG4gICAgICAgICAgICAkKFwiI2Rpc3BsYXlfcmVjZWl2ZXJfYm94XCIpLnNob3coKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdldF9wcm92aWNlX3JlZ2lvbnMoJzExMDEwMCcpO1xuICAgICAgICAgICAgc2V0X3Byb3ZpY2VfY2l0eSgnMTEwMTAwJyk7XG4gICAgICAgIH1cbiAgICB9LCBmYWxzZSk7XG4gICAgdmFyIHVybCA9ICcvYXBpL3YyL2NhcnQvY29uZmlybS1kYXRhJyArIGxvY2F0aW9uLnNlYXJjaDtcbiAgICAkaHR0cCh1cmwpLmdldChmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gNSkge1xuICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9ICcvJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdC5pbWdfbGluayA9IElNR19MSU5LO1xuICAgICAgICAgICAgcmVzdWx0Lml0ZW1fcHJpY2VzID0gMDtcbiAgICAgICAgICAgIGlmIChyZXN1bHQuaXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHZhciBpdGVtcyA9IHJlc3VsdC5pdGVtcztcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5pdGVtX3ByaWNlcyArPSBpdGVtc1tpXS5wcmljZSAqIGl0ZW1zW2ldLnF1YW50aXR5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdC5hbW91bnQgPSAn77+lJyArIHByb2Nlc3NEYXRhLnByb2Nlc3NQcmljZShyZXN1bHQuaXRlbV9wcmljZXMpO1xuICAgICAgICAgICAgaWYgKHJlc3VsdC5jdXN0b21faXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuaXRlbV9wcmljZXMgPj0gMjAwMDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmZyZWlnaHQgPSAn77+lMC4wMCc7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5mcmVpZ2h0VGlwID0gJ++8iOWVhuWTgemHkemineW3sua7oTIwMOWFg+WFjei/kOi0ue+8iSc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmZyZWlnaHQgPSAn77+lIO+8nyc7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5mcmVpZ2h0VGlwID0gJ++8iOWVhuWTgemHkeminea7oTIwMOWFg+WNs+WPr+WFjei/kOi0ue+8iSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc3VsdC5hbW91bnQgKz0gJyAr77yfJztcbiAgICAgICAgICAgICAgICByZXN1bHQudG90YWwgPSByZXN1bHQuYW1vdW50O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0Lml0ZW1fcHJpY2VzID49IDIwMDAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5mcmVpZ2h0ID0gJ++/pSAwLjAwJztcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmZyZWlnaHRUaXAgPSAn77yI5ZWG5ZOB6YeR6aKd5bey5ruhMjAw5YWD5YWN6L+Q6LS577yJJztcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnRvdGFsID0gcmVzdWx0LmFtb3VudDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQuZnJlaWdodF9wcmljZSA9IDIwMDAwIC0gcmVzdWx0Lml0ZW1fcHJpY2VzO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQuZnJlaWdodCA9ICfvv6UgMTAuMDAnO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQuZnJlaWdodFRpcCA9ICfvvIjov5jlt64nICsgcHJvY2Vzc0RhdGEucHJvY2Vzc1ByaWNlKHJlc3VsdC5mcmVpZ2h0X3ByaWNlKSArICflhYPljbPlj6/lhY3ov5DotLnvvIknO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQudG90YWwgPSAn77+lJyArIHByb2Nlc3NEYXRhLnByb2Nlc3NQcmljZShyZXN1bHQuaXRlbV9wcmljZXMgKyAxMDAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkKFwiI3Byb2R1Y3RfdGVtcGxhdGVcIikudG1wbChyZXN1bHQpLmFwcGVuZFRvKCcjcHJvZHVjdF9pdGVtJyk7XG4gICAgICAgICAgICAkKFwiI2NvbmZpcm1fYW1vdW50XCIpLnRleHQocmVzdWx0LmFtb3VudCk7XG4gICAgICAgICAgICAkKFwiI2NvbmZpcm1fZnJlaWdodFwiKS5odG1sKHJlc3VsdC5mcmVpZ2h0ICsgJzxzcGFuIGNsYXNzPVwiaXRlbS10aXBcIj4nICsgcmVzdWx0LmZyZWlnaHRUaXAgKyAnPC9zcGFuPicpO1xuICAgICAgICAgICAgJChcIiNjb25maXJtX3RvdGFsXCIpLnRleHQocmVzdWx0LnRvdGFsKTtcbiAgICAgICAgICAgICQoXCIjY29uZmlybV90b3RhbF9zaG93XCIpLnRleHQocmVzdWx0LnRvdGFsKTtcbiAgICAgICAgfVxuICAgIH0sIGZhbHNlKTtcblxuICAgIGNvbnRhaW5lci5kZWxlZ2F0ZShcIi5hZGQtZmlsZVwiLCBcImNoYW5nZVwiLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICB1cGxvYWRDb21wLnVwbG9hZEZpbGUoZXZlbnQpO1xuICAgIH0pO1xuICAgIGNvbnRhaW5lci5kZWxlZ2F0ZShcIi5kZWxldGUtZmlsZVwiLCBcImNsaWNrXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHVwbG9hZENvbXAuZGVsZXRlRmlsZShldmVudCk7XG4gICAgfSk7XG4gICAgLy/kv67mlLnphY3pgIHkv6Hmga9cbiAgICAkKFwiI2VkaXRfcmVjZWl2ZXJfYnRuXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKFwiI2VkaXRfcmVjZWl2ZXJfYm94XCIpLnNob3coKTtcbiAgICAgICAgJChcIiNkaXNwbGF5X3JlY2VpdmVyX2JveFwiKS5oaWRlKCk7XG4gICAgfSk7XG4gICAgLy/kv53lrZjphY3pgIHkv6Hmga9cbiAgICAkKFwiI3NhdmVfcmVjZWl2ZXJfYnRuXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbmFtZSA9ICQoXCIjcmVjZWl2ZXJfbmFtZVwiKS52YWwoKTtcbiAgICAgICAgaWYgKCFjaGVja0lucHV0Q29uZGl0aW9uKFwicmVjZWl2ZXJfbmFtZVwiLCAoL14uezEsMjV9JC8udGVzdChuYW1lKSAmJiAkLnRyaW0obmFtZSkgIT09IFwiXCIpKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY2hlY2tSZWNlaXZlclJlZ2lvbigpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGFkZHJlc3MgPSAkKFwiI3JlY2VpdmVyX2FkZHJlc3NcIikudmFsKCk7XG4gICAgICAgIGlmICghY2hlY2tJbnB1dENvbmRpdGlvbihcInJlY2VpdmVyX2FkZHJlc3NcIiwgKC9eW1xcc1xcU117MSw1MH0kLy50ZXN0KGFkZHJlc3MpICYmICQudHJpbShhZGRyZXNzKSAhPT0gXCJcIikpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHBob25lID0gJChcIiNyZWNlaXZlcl9waG9uZVwiKS52YWwoKTtcbiAgICAgICAgaWYgKCFjaGVja0lucHV0Q29uZGl0aW9uKFwicmVjZWl2ZXJfcGhvbmVcIiwgKC9eXFxkezExfSQvLnRlc3QocGhvbmUpKSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY29kZSA9ICQoXCIjcmVjZWl2ZXJfY29kZVwiKS52YWwoKTtcbiAgICAgICAgaWYgKCFjaGVja0lucHV0Q29uZGl0aW9uKFwicmVjZWl2ZXJfY29kZVwiLCAoL15bMC05XXswLDZ9JC8udGVzdChjb2RlKSkpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy/kv53lrZjml7bkv67mlLnmmL7npLrnirbmgIHnmoTlhoXlrrnlkozpobXpnaLlupXpg6jmj5DkuqTml7bnmoTlhoXlrrlcbiAgICAgICAgdmFyIG5hbWUgPSAkLnRyaW0oJChcIiNyZWNlaXZlcl9uYW1lXCIpLnZhbCgpKTtcbiAgICAgICAgdmFyIHBob25lID0gJChcIiNyZWNlaXZlcl9waG9uZVwiKS52YWwoKTtcbiAgICAgICAgdmFyIGFkZHJlc3MgPSAkLnRyaW0oJChcIiNyZWNlaXZlcl9hZGRyZXNzXCIpLnZhbCgpKTtcbiAgICAgICAgdmFyIHByb3ZpbmNlID0gJChcIiNyZWNlaXZlcl9wcm92aW5jZVwiKS5maW5kKFwiOmNoZWNrZWRcIikudGV4dCgpO1xuICAgICAgICB2YXIgY2l0eSA9ICQoXCIjcmVjZWl2ZXJfY2l0eVwiKS5maW5kKFwiOmNoZWNrZWRcIikudGV4dCgpO1xuICAgICAgICB2YXIgY291bnR5ID0gJChcIiNyZWNlaXZlcl9jb3VudHlcIikuZmluZChcIjpjaGVja2VkXCIpLnRleHQoKTtcbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICBjb25zaWduZWVfbmFtZTogbmFtZSxcbiAgICAgICAgICAgIHJlZ2lvbl9pZDogcGFyc2VJbnQoJChcIiNyZWNlaXZlcl9jb3VudHlcIikudmFsKCkgPyAkKFwiI3JlY2VpdmVyX2NvdW50eVwiKS52YWwoKSA6ICQoXCIjcmVjZWl2ZXJfY2l0eVwiKS52YWwoKSksXG4gICAgICAgICAgICBhZGRyZXNzOiBhZGRyZXNzLFxuICAgICAgICAgICAgcG9zdF9jb2RlOiAkKFwiI3JlY2VpdmVyX2NvZGVcIikudmFsKCksXG4gICAgICAgICAgICBjb25zaWduZWVfcGhvbmU6IHBob25lXG4gICAgICAgIH1cbiAgICAgICAgJGh0dHAoJy9hcGkvdjIvb3RoZXJzL3NhdmUtYWRkcmVzcycpLnBvc3QoZGF0YSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgc2hvd19waG9uZSA9IHBob25lLnN1YnN0cmluZygwLCAzKSArICcqKioqJyArIHBob25lLnN1YnN0cmluZyg3LCAxMSk7XG5cbiAgICAgICAgICAgICQoXCIjZGlzcGxheV9yZWNlaXZlcl9uYW1lXCIpLnRleHQobmFtZSk7XG4gICAgICAgICAgICAkKFwiI2Rpc3BsYXlfcmVjZWl2ZXJfcGhvbmVcIikudGV4dChzaG93X3Bob25lKTtcbiAgICAgICAgICAgICQoXCIjZGlzcGxheV9yZWNlaXZlcl9hZGRyZXNzXCIpLnRleHQoYWRkcmVzcyk7XG4gICAgICAgICAgICAkKFwiI2Rpc3BsYXlfcmVjZWl2ZXJfcHJvdmluY2VcIikudGV4dChwcm92aW5jZSk7XG4gICAgICAgICAgICAkKFwiI2Rpc3BsYXlfcmVjZWl2ZXJfY2l0eVwiKS50ZXh0KGNpdHkpO1xuICAgICAgICAgICAgJChcIiNkaXNwbGF5X3JlY2VpdmVyX2NvdW50eVwiKS50ZXh0KGNvdW50eSk7XG5cbiAgICAgICAgICAgICQoXCIjY29uZmlybV9tc2dcIikudGV4dChuYW1lICsgXCIgXCIgKyBzaG93X3Bob25lKTtcbiAgICAgICAgICAgICQoXCIjY29uZmlybV9yZWNlaXZlcl9hZGRyZXNzXCIpLnRleHQoYWRkcmVzcyk7XG4gICAgICAgICAgICAkKFwiI2NvbmZpcm1fcmVjZWl2ZXJfcHJvdmluY2VcIikudGV4dChwcm92aW5jZSk7XG4gICAgICAgICAgICAkKFwiI2NvbmZpcm1fcmVjZWl2ZXJfY2l0eVwiKS50ZXh0KGNpdHkpO1xuICAgICAgICAgICAgJChcIiNjb25maXJtX3JlY2VpdmVyX2NvdW50eVwiKS50ZXh0KGNvdW50eSk7XG5cbiAgICAgICAgICAgICQoXCIjZWRpdF9yZWNlaXZlcl9ib3hcIikuaGlkZSgpO1xuICAgICAgICAgICAgJChcIiNkaXNwbGF5X3JlY2VpdmVyX2JveFwiKS5zaG93KCk7XG4gICAgICAgIH0pXG5cbiAgICB9KTtcbiAgICAvL+Whq+WGmemFjemAgeS/oeaBr+WGheWuueWIpOaWrVxuICAgICQoXCIjcmVjZWl2ZXJfbmFtZVwiKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBuYW1lID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgY2hlY2tJbnB1dENvbmRpdGlvbihcInJlY2VpdmVyX25hbWVcIiwgKC9eLnsxLDI1fSQvLnRlc3QobmFtZSkgJiYgJC50cmltKG5hbWUpICE9PSBcIlwiKSk7XG4gICAgfSk7XG4gICAgJChcIiNyZWNlaXZlcl9waG9uZVwiKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBwaG9uZSA9ICQodGhpcykudmFsKCk7XG4gICAgICAgIGNoZWNrSW5wdXRDb25kaXRpb24oXCJyZWNlaXZlcl9waG9uZVwiLCAoL15cXGR7MTF9JC8udGVzdChwaG9uZSkpKTtcbiAgICB9KTtcbiAgICAkKFwiI3JlY2VpdmVyX2FkZHJlc3NcIikuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYWRkcmVzcyA9ICQodGhpcykudmFsKCk7XG4gICAgICAgIGNoZWNrSW5wdXRDb25kaXRpb24oXCJyZWNlaXZlcl9hZGRyZXNzXCIsICgvXltcXHNcXFNdezEsNTB9JC8udGVzdChhZGRyZXNzKSAmJiAkLnRyaW0oYWRkcmVzcykgIT09IFwiXCIpKTtcbiAgICB9KTtcbiAgICAkKFwiI3JlY2VpdmVyX3Byb3ZpbmNlXCIpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGlkID0gJChcIiNyZWNlaXZlcl9wcm92aW5jZVwiKS52YWwoKTtcbiAgICAgICAgc2V0X3Byb3ZpY2VfY2l0eShpZCk7XG4gICAgfSk7XG4gICAgJChcIiNyZWNlaXZlcl9jaXR5XCIpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgY2hlY2tSZWNlaXZlclJlZ2lvbigpO1xuICAgICAgICB2YXIgaWQgPSAkKFwiI3JlY2VpdmVyX2NpdHlcIikudmFsKCk7XG4gICAgICAgIHNldF9jaXR5X2NvdW50eShpZCk7XG4gICAgfSk7XG4gICAgJChcIiNyZWNlaXZlcl9jb3VudHlcIikuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICBjaGVja1JlY2VpdmVyUmVnaW9uKCk7XG4gICAgfSk7XG4gICAgJChcIiNjb250YWN0X25hbWVcIikuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbmFtZSA9ICQodGhpcykudmFsKCk7XG4gICAgICAgIGNoZWNrSW5wdXRDb25kaXRpb24oXCJjb250YWN0X25hbWVcIiwgKC9eLnswLDI1fSQvLnRlc3QobmFtZSkgJiYgJC50cmltKG5hbWUpICE9PSBcIlwiKSk7XG4gICAgfSk7XG4gICAgJChcIiNjb250YWN0X3Bob25lXCIpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHBob25lID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgY2hlY2tJbnB1dENvbmRpdGlvbihcImNvbnRhY3RfcGhvbmVcIiwgKHBob25lID09IFwiXCIgfHwgL15cXGR7MTF9JC8udGVzdChwaG9uZSkpKTtcbiAgICB9KTtcbiAgICAkKFwiI3JlY2VpdmVyX2NvZGVcIikuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY29kZSA9ICQodGhpcykudmFsKCk7XG4gICAgICAgIGNoZWNrSW5wdXRDb25kaXRpb24oXCJyZWNlaXZlcl9jb2RlXCIsICgvXlswLTldezAsNn0kLy50ZXN0KGNvZGUpKSk7XG4gICAgfSk7XG4gICAgJChcIiNjb250YWN0X3FxXCIpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHFxID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgY2hlY2tJbnB1dENvbmRpdGlvbihcImNvbnRhY3RfcXFcIiwgKC9eWzAtOV17MCwxMH0kLy50ZXN0KHFxKSkpO1xuICAgIH0pO1xuICAgICQoXCIjcmVjZWl2ZXJfaW52b2ljZVwiKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBpbnZvaWNlID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgY2hlY2tJbnB1dENvbmRpdGlvbihcInJlY2VpdmVyX2ludm9pY2VcIiwgKC9eW1xcc1xcU117MCw1MH0kLy50ZXN0KGludm9pY2UpICYmICQudHJpbShpbnZvaWNlKSAhPT0gXCJcIikpO1xuICAgIH0pO1xuICAgICQoXCIjcmVjZWl2ZXJfcmVtYXJrXCIpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJlbWFyayA9ICQodGhpcykudmFsKCk7XG4gICAgICAgIGNoZWNrSW5wdXRDb25kaXRpb24oXCJyZWNlaXZlcl9yZW1hcmtcIiwgKC9eW1xcc1xcU117MCw1MDB9JC8udGVzdChyZW1hcmspICYmICQudHJpbShyZW1hcmspICE9PSBcIlwiKSk7XG4gICAgfSk7XG4gICAgLy/mlLnlj5jmlK/ku5jmlrnlvI/kuovku7ZcbiAgICAkKFwiI2NoYW5nZV9wYXlfbWV0aG9kIC5wYXktbWV0aG9kXCIpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgICQoXCIjY2hhbmdlX3BheV9tZXRob2QgLnBheS1tZXRob2RcIikucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZFwiKTtcbiAgICAgICAgJCh0YXJnZXQpLmFkZENsYXNzKFwic2VsZWN0ZWRcIik7XG4gICAgfSk7XG4gICAgLy/mmK/lkKbpnIDopoHmt7vliqDpnIDmsYLogZTns7vkurpcbiAgICAkKFwiI25lZWRfY29udGFjdFwiKS5jbGljayhmdW5jdGlvbihldmVudCkge1xuICAgICAgICB2YXIgJHRhcmdldDtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpICE9PSBcImFcIikge1xuICAgICAgICAgICAgJHRhcmdldCA9ICQoZXZlbnQudGFyZ2V0KS5wYXJlbnQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICR0YXJnZXQgPSAkKGV2ZW50LnRhcmdldCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCR0YXJnZXQuaGFzQ2xhc3MoXCJjaGVja2VkXCIpKSB7XG4gICAgICAgICAgICAkdGFyZ2V0LnJlbW92ZUNsYXNzKFwiY2hlY2tlZFwiKTtcbiAgICAgICAgICAgICQoXCIjbmVlZF9jb250YWN0X2RldGFpbFwiKS5zaG93KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkdGFyZ2V0LmFkZENsYXNzKFwiY2hlY2tlZFwiKTtcbiAgICAgICAgICAgICQoXCIjbmVlZF9jb250YWN0X2RldGFpbFwiKS5oaWRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgLyogXG4gICAgICAgICAqIElF5rWP6KeI5Zmo5Y+W5raI5LqL5Lu25aSE55CG77yMSUU577yMSUUxMOW3suino+WGs1xuICAgICAgICAgKiDov5nph4zlpoLmnpzkuI3kvZzlpITnkIbvvIzngrnlh7tzcGFu5YWD57Sg5Lya5ZCM5pe26Kem5Y+Rc3BhbuWSjGHlkITotbDkuIDpgY3pgLvovpHvvIzmnIDnu4jnu5PmnpzmmK/msqHlj5hcbiAgICAgICAgICog54S26ICMSUUxMeS4i+ayoei1t+S9nOeUqO+8jOayoeWKnuazleino+WGs+S6hu+8jOS4jei/h+mXrumimOS4jeWkp++8jOS4jeW9seWTjeS9v+eUqFxuICAgICAgICAgKi9cbiAgICAgICAgd2luZG93LmV2ZW50LnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICAgIC8vIHdpbmRvdy5ldmVudC5jYW5jZWxCdWJibGUgPSB0cnVlO1xuICAgIH0pO1xuICAgIC8v5piv5ZCm6ZyA6KaB5Y+R56WoXG4gICAgJChcIiNuZWVkX2ludm9pY2VcIikuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgdmFyICR0YXJnZXQ7XG4gICAgICAgIGlmIChldmVudC50YXJnZXQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSAhPT0gXCJhXCIpIHtcbiAgICAgICAgICAgICR0YXJnZXQgPSAkKGV2ZW50LnRhcmdldCkucGFyZW50KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkdGFyZ2V0ID0gJChldmVudC50YXJnZXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICgkdGFyZ2V0Lmhhc0NsYXNzKFwiY2hlY2tlZFwiKSkge1xuICAgICAgICAgICAgJHRhcmdldC5yZW1vdmVDbGFzcyhcImNoZWNrZWRcIik7XG4gICAgICAgICAgICAkKFwiI25lZWRfaW52b2ljZV9kZXRhaWxcIikuaGlkZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJHRhcmdldC5hZGRDbGFzcyhcImNoZWNrZWRcIik7XG4gICAgICAgICAgICAkKFwiI25lZWRfaW52b2ljZV9kZXRhaWxcIikuc2hvdygpO1xuICAgICAgICB9XG4gICAgICAgIHdpbmRvdy5ldmVudC5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgIH0pO1xuICAgIC8v5oyJ6ZyA5a6a5Yi25ZWG5ZOB5p+l55yL6K+m5oOFXG4gICAgc2hvd0RlbWFuZERldGFpbChjb250YWluZXIpO1xuICAgIC8v5o+Q5Lqk6K6i5Y2VXG4gICAgJChcIiNjcmVhdGVfb3JkZXJcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghJChcIiNlZGl0X3JlY2VpdmVyX2JveFwiKS5pcyhcIjpoaWRkZW5cIikpIHtcbiAgICAgICAgICAgIGFsZXJ0KFwi6K+35YWI5L+d5a2Y5pS26LSn5Zyw5Z2AXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBxcSA9ICQoXCIjY29udGFjdF9xcVwiKS52YWwoKTtcbiAgICAgICAgaWYgKCFjaGVja0lucHV0Q29uZGl0aW9uKFwiY29udGFjdF9xcVwiLCAoL15bMC05XXswLDEwfSQvLnRlc3QocXEpKSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY29udGFjdCA9IGZhbHNlO1xuICAgICAgICBpZiAoISQoXCIjbmVlZF9jb250YWN0XCIpLmhhc0NsYXNzKFwiY2hlY2tlZFwiKSkge1xuICAgICAgICAgICAgY29udGFjdCA9IHRydWU7XG4gICAgICAgICAgICB2YXIgbmFtZSA9ICQoXCIjY29udGFjdF9uYW1lXCIpLnZhbCgpO1xuICAgICAgICAgICAgaWYgKCFjaGVja0lucHV0Q29uZGl0aW9uKFwiY29udGFjdF9uYW1lXCIsICgvXi57MSwyNX0kLy50ZXN0KG5hbWUpICYmICQudHJpbShuYW1lKSAhPT0gXCJcIikpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHBob25lID0gJChcIiNjb250YWN0X3Bob25lXCIpLnZhbCgpO1xuICAgICAgICAgICAgaWYgKCFjaGVja0lucHV0Q29uZGl0aW9uKFwiY29udGFjdF9waG9uZVwiLCAoL15cXGR7MTF9JC8udGVzdChwaG9uZSkpKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVtYXJrID0gJChcIiNyZWNlaXZlcl9yZW1hcmtcIikudmFsKCk7XG4gICAgICAgIGlmICghY2hlY2tJbnB1dENvbmRpdGlvbihcInJlY2VpdmVyX3JlbWFya1wiLCAoL15bXFxzXFxTXXswLDUwMH0kLy50ZXN0KHJlbWFyaykpKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciB1cmwgPSBcIi9hcGkvdjIvb3JkZXJzL2NyZWF0ZVwiO1xuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIGNvbnNpZ25lZV9uYW1lOiAkLnRyaW0oJChcIiNyZWNlaXZlcl9uYW1lXCIpLnZhbCgpKSxcbiAgICAgICAgICAgIGFkZHJlc3M6ICQudHJpbSgkKFwiI3JlY2VpdmVyX2FkZHJlc3NcIikudmFsKCkpLFxuICAgICAgICAgICAgcG9zdF9jb2RlOiAkKFwiI3JlY2VpdmVyX2NvZGVcIikudmFsKCksXG4gICAgICAgICAgICBjb25zaWduZWVfcGhvbmU6ICQoXCIjcmVjZWl2ZXJfcGhvbmVcIikudmFsKCksXG4gICAgICAgICAgICBjb250YWN0X25hbWU6IGNvbnRhY3QgPyAkLnRyaW0oJChcIiNjb250YWN0X25hbWVcIikudmFsKCkpIDogXCJcIixcbiAgICAgICAgICAgIGNvbnRhY3RfcGhvbmU6IGNvbnRhY3QgPyAkKFwiI2NvbnRhY3RfcGhvbmVcIikudmFsKCkgOiBcIlwiLFxuICAgICAgICAgICAgY29udGFjdF9xcTogJChcIiNjb250YWN0X3FxXCIpLnZhbCgpLFxuICAgICAgICAgICAgcmVtYXJrOiAkLnRyaW0oJChcIiNyZWNlaXZlcl9yZW1hcmtcIikudmFsKCkpLFxuICAgICAgICAgICAgcGF5bWVudDogJCgkKFwiI2NoYW5nZV9wYXlfbWV0aG9kXCIpLmNoaWxkcmVuKFwiLnNlbGVjdGVkXCIpWzBdKS5hdHRyKFwiZGF0YS12YWx1ZVwiKSxcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHNlYXJjaCA9IGxvY2F0aW9uLnNlYXJjaC5zdWJzdHIoMSkuc3BsaXQoXCImXCIpO1xuICAgICAgICBpdGVtX2lkcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNlYXJjaC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaXRlbV9pZHMucHVzaChzZWFyY2hbaV0ucmVwbGFjZShcImlkPVwiLCBcIlwiKSAqIDEpXG4gICAgICAgIH1cbiAgICAgICAgZGF0YS5pdGVtX2lkcyA9IGl0ZW1faWRzO1xuICAgICAgICBkYXRhLnJlZ2lvbl9pZCA9ICgkKFwiI3JlY2VpdmVyX2NvdW50eVwiKS52YWwoKSA/ICQoXCIjcmVjZWl2ZXJfY291bnR5XCIpLnZhbCgpIDogJChcIiNyZWNlaXZlcl9jaXR5XCIpLnZhbCgpKSAqIDE7XG4gICAgICAgIGlmICgkKFwiI25lZWRfaW52b2ljZVwiKS5oYXNDbGFzcyhcImNoZWNrZWRcIikpIHtcbiAgICAgICAgICAgIHZhciBpbnZvaWNlID0gJChcIiNyZWNlaXZlcl9pbnZvaWNlXCIpLnZhbCgpO1xuICAgICAgICAgICAgaWYgKCFjaGVja0lucHV0Q29uZGl0aW9uKFwicmVjZWl2ZXJfaW52b2ljZVwiLCAoL15bXFxzXFxTXXsxLDUwfSQvLnRlc3QoaW52b2ljZSkgJiYgJC50cmltKGludm9pY2UpICE9PSBcIlwiKSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRhdGEuaW52b2ljZV90aXRsZSA9ICQoXCIjcmVjZWl2ZXJfaW52b2ljZVwiKS52YWwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAkaHR0cCh1cmwpLnBvc3QoZGF0YSwgZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5wYXltZW50ID09PSBcIk9OTElORVwiKSB7XG4gICAgICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9IFwiL3BheT9vcmRlcl9pZD1cIiArIHJlc3VsdC5pZDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9IFwiL29yZGVyP2lkPVwiICsgcmVzdWx0LmlkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0pO1xuXG59KSgpXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2NvbmZpcm0tb3JkZXIuanNcbiAqKiBtb2R1bGUgaWQgPSAwXG4gKiogbW9kdWxlIGNodW5rcyA9IDNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9