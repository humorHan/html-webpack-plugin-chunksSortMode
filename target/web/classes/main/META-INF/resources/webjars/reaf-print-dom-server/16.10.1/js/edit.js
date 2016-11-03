webpackJsonp([4,19],[
/* 0 */
/***/ function(module, exports) {

	(function() {
	    var order_id = getLinkParam("id");
	    var container = $("#edit_order_box");
	    $http('/api/v2/admin/orders/detail?id=' + order_id).get(function(result) {
	        result.img_link = IMG_LINK;
	        if(!result.contact_name){
	            result.contact_name = result.consignee_name;
	        }
	        if(!result.contact_phone){
	            result.contact_phone = result.consignee_phone;
	        }
	        result.total = '￥' + calculateTotal(result.amount, result.freight, result.is_priced);
	        $("#template").tmpl(result).appendTo('#edit_order_box');
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
	        get_provice_regions(result.regions[0].id);
	        set_provice_city(result.regions[0].id, result.regions[1].id);
	        set_city_county(result.regions[1].id, result.regions[2] ? result.regions[2].id : '');
	        showDemandDetail();
	        if (result.invoice_title) {
	            $("#need_invoice").addClass("checked");
	            $("#need_invoice_detail").show();
	        }
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
	            checkInputCondition("contact_name", (/^.{1,25}$/.test(name) && $.trim(name) !== ""));
	        });
	        $("#contact_phone").change(function() {
	            var phone = $(this).val();
	            checkInputCondition("contact_phone", (/^\d{11}$/.test(phone)));
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
	        //删除商品
	        $(".delete-product").click(function() {
	            var id = $(this).parents("tr").attr("data-id");
	            $("#delete_product .right").data("id", id);
	            popUp.showPop("#delete_product");
	        });
	        $("#delete_product .right").click(function() {
	            var id = $(this).data("id");
	            var url = "/api/v2/admin/orders/remove-item?item_id=" + id;
	            $http(url).delete(function(result) {
	                location.reload();
	            });
	        });
	        //改变支付方式事件
	        $("#change_pay_method .pay-method").click(function(event) {
	            if (result.status === 'DELIVERY_CONFIRMED' && payment === 'CASH_ON_DELIVERY') {
	                return;
	            }
	            var target = event.target;
	            $("#change_pay_method .pay-method").removeClass("selected");
	            $(target).addClass("selected");
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
	        //修改按需定制商品
	        $(".edit-product").click(function(event) {
	            var id = $(this).parents("tr").attr("data-id");
	            var detail = JSON.parse($(this).parents("tr").attr("data-detail"));
	            if (detail.name) {
	                var data = detail;
	
	                OnDemandProduct.setData(data.name, data.quantity, data.size, data.caizhi, data.others);
	
	                popUp.showPop("#edit_demand_detail");
	                $("#edit_demand_detail_title").html("编辑按需定制商品");
	
	                $("#edit_demand_detail .right").data("id", id);
	
	                $("#edit_demand_detail .right").unbind();
	                $("#edit_demand_detail .right").click(function() {
	                    var id = $(this).data("id");
	                    var url = "/api/v2/admin/orders/edit-custom-item?item_id=" + id;
	                    addOrEditOnDemandProduct(url, 2);
	                });
	            }
	        });
	
	        //添加按需定制商品
	        $("#admin_add_demand").click(function() {
	            OnDemandProduct.initData();
	
	            popUp.showPop("#edit_demand_detail");
	            $("#edit_demand_detail_title").html("添加按需定制商品");
	
	            $("#edit_demand_detail .right").unbind();
	            $("#edit_demand_detail .right").click(function() {
	                // TODO
	                var url = "";
	                addOrEditOnDemandProduct(url, 1);
	            });
	        });
	
	        //提交订单
	        $("#admin_create_order").click(function() {
	            var receiver_name = $("#receiver_name").val();
	            if (!checkInputCondition("receiver_name", (/^.{1,25}$/.test(receiver_name) && $.trim(receiver_name) !== ""))) {
	                return;
	            }
	            if (!checkReceiverRegion()) {
	                return;
	            }
	            var receiver_address = $("#receiver_address").val();
	            if (!checkInputCondition("receiver_address", (/^[\s\S]{1,50}$/.test(receiver_address) && $.trim(receiver_address) !== ""))) {
	                return;
	            }
	            var receiver_phone = $("#receiver_phone").val();
	            if (!checkInputCondition("receiver_phone", (/^\d{11}$/.test(receiver_phone)))) {
	                return;
	            }
	            var receiver_code = $("#receiver_code").val();
	            if (!checkInputCondition("receiver_code", (/^[0-9]{0,6}$/.test(receiver_code)))) {
	                return;
	            }
	            var contact_qq = $("#contact_qq").val();
	            if (!checkInputCondition("contact_qq", (/^[0-9]{0,10}$/.test(contact_qq)))) {
	                return
	            }
	            var contact_name = $("#contact_name").val();
	            if (!checkInputCondition("contact_name", (/^.{1,25}$/.test(contact_name) && $.trim(contact_name) !== ""))) {
	                return
	            }
	            var contact_phone = $("#contact_phone").val();
	            if (!checkInputCondition("contact_phone", (/^\d{11}$/.test(contact_phone)))) {
	                return
	            }
	            var receiver_remark = $("#receiver_remark").val();
	            if (!checkInputCondition("receiver_remark", (/^[\s\S]{0,500}$/.test(receiver_remark)))) {
	                return
	            }
	            var id = $(this).attr("data-id");
	            var url = "/api/v2/admin/orders/edit?id=" + id;
	            var data = {
	                item_ids: [],
	                consignee_name: $.trim($("#receiver_name").val()),
	                address: $.trim($("#receiver_address").val()),
	                post_code: $("#receiver_code").val(),
	                consignee_phone: $("#receiver_phone").val(),
	                contact_name: $.trim($("#contact_name").val()),
	                contact_phone: $("#contact_phone").val(),
	                contact_qq: $("#contact_qq").val(),
	                remark: $.trim($("#receiver_remark").val()),
	                payment: $($("#change_pay_method").children(".selected")[0]).attr("data-value"),
	            };
	            data.region_id = ($("#receiver_county").val() ? $("#receiver_county").val() : $("#receiver_city").val()) * 1;
	            if ($("#need_invoice").hasClass("checked")) {
	                var receiver_invoice = $("#receiver_invoice").val();
	                if (!checkInputCondition("receiver_invoice", (/^[\s\S]{0,50}$/.test(receiver_invoice) && $.trim(receiver_invoice) !== ""))) {
	                    return;
	                } else {
	                    data.invoice_title = $.trim($("#receiver_invoice").val());
	                }
	            } else {
	                data.invoice_title = "";
	            }
	            $http(url).put(data, function(result) {
	                location.href = "/admin/order?id=" + id;
	            })
	        });
	        //修改订单数量价格
	        $(".admin-edit-order").click(function(event) {
	            var $target = $(event.target);
	            var $display = $target.parent(".product-display");
	            var $edit = $display.next(".product-edit");
	            $display.hide();
	            $edit.show();
	        });
	        //保存修改订单数量价格
	        $(".admin-save-order").click(function(event) {
	            var $target = $(event.target);
	            var $input = $target.prev(".admin-input");
	            var $edit = $target.parent(".product-edit");
	            var $display = $edit.prev(".product-display");
	            adminChangeOrder($edit, $display);
	        });
	        //取消修改订单数量价格
	        $(".admin-cancel-order").click(function(event) {
	            var $target = $(event.target);
	            var $edit = $target.parent(".product-edit");
	            var $display = $edit.prev(".product-display");
	            $display.show();
	            $edit.hide();
	        });
	        //价格必须是0.00的形式
	        $(".admin-price").change(function() {
	            var val = $(this).val();
	            var price = parseFloat(val);
	            var isPrice = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;
	            if (!isPrice.test(val)) {
	                var isTwo = /^([1-9][\d]{0,7}|0)(\.[\d]+)?$/;
	                if (isTwo.test(val)) {
	                    var index = val.indexOf(".");
	                    var real = val.substr(0, index + 3);
	                    $(this).val(real);
	                } else {
	                    $(this).val("");
	                    return false
	                }
	
	            } else if (price > 1000000.00) {
	                $(this).val("1000000.00")
	            } else if (price < 0.00) {
	                $(this).val("0.00")
	            }
	            return true
	        });
	        //数量必须是整数
	        $(".admin-num").change(function() {
	            var val = $(this).val();
	            var num = parseInt(val);
	            if (isNaN(num)) {
	                $(this).val("")
	                return false;
	            } else if (val != num) {
	                $(this).val(num)
	            } else if (num > 100000) {
	                $(this).val("100000")
	            } else if (num < 0) {
	                $(this).val("0")
	            }
	            return true
	        });
	    });
	
	    function addOrEditOnDemandProduct(url, method) {
	        var data = {
	            name: $("#on_demand_product_name_input").val(),
	            category: '定制名片',
	            quantity: $("#on_demand_product_quantity_input").val(),
	            size: $("#on_demand_product_size_input").val(),
	            caizhi: $("#on_demand_product_caizhi_input").val(),
	            others: $("#on_demand_product_others_input").val(),
	        };
	
	        var formItem;
	        if (OnDemandProduct.validateName(data.name)) {
	            formItem = $("#on_demand_product_name_input").closest(".form-item");
	            if (!formItem.hasClass("error")) {
	                formItem.addClass("error");
	            }
	            $("#on_demand_product_name_input").focus();
	            return;
	        }
	        if (OnDemandProduct.validateQuantity(data.quantity)) {
	            formItem = $("#on_demand_product_quantity_input").closest(".form-item");
	            if (!formItem.hasClass("error")) {
	                formItem.addClass("error");
	            }
	            $("#on_demand_product_quantity_input").focus();
	            return;
	        }
	
	        if (OnDemandProduct.validateSize(data.size) || OnDemandProduct.validateCaizhi(data.caizhi) ||
	            OnDemandProduct.validateOthers(data.others)) {
	            return;
	        }
	
	        if (method == 2) {
	            $http(url).put(data, function() {
	                location.reload();
	            });
	        } else {
	            $http(url).post(data, function() {
	                location.reload();
	            });
	        }
	    }
	
	    function adminChangeOrder($edit, $display) {
	        var $tr = $edit.parent().parent("tr");
	        var id = $tr.attr("data-id");
	        var $input = $edit.find(".admin-input");
	        if ($input.hasClass("admin-price")) {
	            var price = processData.processRealProce($input.val());
	            if ($input.hasClass("admin-demand")) {
	                var quantity = 1;
	            } else {
	                var quantity = $tr.find(".admin-num").val();
	            }
	        } else {
	            var quantity = $input.val();
	            var price = processData.processRealProce($tr.find(".admin-price").val());
	        }
	        if (!price || !quantity) {
	            return;
	        }
	        var url = "/api/v2/admin/orders/update-item-price?item_id=" + id + "&price=" + price + "&quantity=" + quantity;
	        $http(url).put({}, function() {
	            // $display.show();
	            // $display.find("span").text($input.val());
	            // $edit.hide();
	            location.reload();
	        })
	    }
	})()


/***/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYWRtaW4vZWRpdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXNELEtBQUs7QUFDM0QsVUFBUztBQUNUO0FBQ0E7QUFDQSx5REFBd0QsR0FBRztBQUMzRCxVQUFTO0FBQ1Q7QUFDQTtBQUNBLCtEQUE4RCxLQUFLO0FBQ25FLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0Esc0RBQXFELEtBQUs7QUFDMUQsVUFBUztBQUNUO0FBQ0E7QUFDQSx3REFBdUQsR0FBRztBQUMxRCxVQUFTO0FBQ1Q7QUFDQTtBQUNBLDJEQUEwRCxJQUFJO0FBQzlELFVBQVM7QUFDVDtBQUNBO0FBQ0Esd0RBQXVELEtBQUs7QUFDNUQsVUFBUztBQUNUO0FBQ0E7QUFDQSwrREFBOEQsS0FBSztBQUNuRSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLDhEQUE2RCxNQUFNO0FBQ25FLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2IsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2IsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQSw0REFBMkQsS0FBSztBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvRUFBbUUsS0FBSztBQUN4RTtBQUNBO0FBQ0E7QUFDQSw4REFBNkQsR0FBRztBQUNoRTtBQUNBO0FBQ0E7QUFDQSxnRUFBK0QsSUFBSTtBQUNuRTtBQUNBO0FBQ0E7QUFDQSw2REFBNEQsS0FBSztBQUNqRTtBQUNBO0FBQ0E7QUFDQSwyREFBMEQsS0FBSztBQUMvRDtBQUNBO0FBQ0E7QUFDQSw2REFBNEQsR0FBRztBQUMvRDtBQUNBO0FBQ0E7QUFDQSxtRUFBa0UsTUFBTTtBQUN4RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdFQUF1RSxLQUFLO0FBQzVFO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2IsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXVDLElBQUksV0FBVyxJQUFJO0FBQzFEO0FBQ0EsMENBQXlDLElBQUk7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBOztBQUVBLGNBQWE7QUFDYjtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQSxjQUFhO0FBQ2I7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNULE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiLFVBQVM7QUFDVDtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsRUFBQyIsImZpbGUiOiJqcy9lZGl0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCkge1xuICAgIHZhciBvcmRlcl9pZCA9IGdldExpbmtQYXJhbShcImlkXCIpO1xuICAgIHZhciBjb250YWluZXIgPSAkKFwiI2VkaXRfb3JkZXJfYm94XCIpO1xuICAgICRodHRwKCcvYXBpL3YyL2FkbWluL29yZGVycy9kZXRhaWw/aWQ9JyArIG9yZGVyX2lkKS5nZXQoZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgIHJlc3VsdC5pbWdfbGluayA9IElNR19MSU5LO1xuICAgICAgICBpZighcmVzdWx0LmNvbnRhY3RfbmFtZSl7XG4gICAgICAgICAgICByZXN1bHQuY29udGFjdF9uYW1lID0gcmVzdWx0LmNvbnNpZ25lZV9uYW1lO1xuICAgICAgICB9XG4gICAgICAgIGlmKCFyZXN1bHQuY29udGFjdF9waG9uZSl7XG4gICAgICAgICAgICByZXN1bHQuY29udGFjdF9waG9uZSA9IHJlc3VsdC5jb25zaWduZWVfcGhvbmU7XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0LnRvdGFsID0gJ++/pScgKyBjYWxjdWxhdGVUb3RhbChyZXN1bHQuYW1vdW50LCByZXN1bHQuZnJlaWdodCwgcmVzdWx0LmlzX3ByaWNlZCk7XG4gICAgICAgICQoXCIjdGVtcGxhdGVcIikudG1wbChyZXN1bHQpLmFwcGVuZFRvKCcjZWRpdF9vcmRlcl9ib3gnKTtcbiAgICAgICAgLy/phY3pgIHljLrln59zZWxlY3Tmj5Lku7bliJ3lp4vljJZcbiAgICAgICAgJChcIiNyZWNlaXZlcl9wcm92aW5jZVwiKS5jaG9zZW4oe1xuICAgICAgICAgICAgd2lkdGg6IFwiMTI0cHhcIixcbiAgICAgICAgICAgIHNlYXJjaF9jb250YWluczogdHJ1ZSxcbiAgICAgICAgICAgIG5vX3Jlc3VsdHNfdGV4dDogXCLml6DljLnphY3nu5PmnpxcIlxuICAgICAgICB9KTtcbiAgICAgICAgJChcIiNyZWNlaXZlcl9jaXR5XCIpLmNob3Nlbih7XG4gICAgICAgICAgICB3aWR0aDogXCIxMjRweFwiLFxuICAgICAgICAgICAgc2VhcmNoX2NvbnRhaW5zOiB0cnVlLFxuICAgICAgICAgICAgbm9fcmVzdWx0c190ZXh0OiBcIuaXoOWMuemFjee7k+aenFwiXG4gICAgICAgIH0pO1xuICAgICAgICAkKFwiI3JlY2VpdmVyX2NvdW50eVwiKS5jaG9zZW4oe1xuICAgICAgICAgICAgd2lkdGg6IFwiMTI0cHhcIixcbiAgICAgICAgICAgIHNlYXJjaF9jb250YWluczogdHJ1ZSxcbiAgICAgICAgICAgIG5vX3Jlc3VsdHNfdGV4dDogXCLml6DljLnphY3nu5PmnpxcIlxuICAgICAgICB9KTtcbiAgICAgICAgZ2V0X3Byb3ZpY2VfcmVnaW9ucyhyZXN1bHQucmVnaW9uc1swXS5pZCk7XG4gICAgICAgIHNldF9wcm92aWNlX2NpdHkocmVzdWx0LnJlZ2lvbnNbMF0uaWQsIHJlc3VsdC5yZWdpb25zWzFdLmlkKTtcbiAgICAgICAgc2V0X2NpdHlfY291bnR5KHJlc3VsdC5yZWdpb25zWzFdLmlkLCByZXN1bHQucmVnaW9uc1syXSA/IHJlc3VsdC5yZWdpb25zWzJdLmlkIDogJycpO1xuICAgICAgICBzaG93RGVtYW5kRGV0YWlsKCk7XG4gICAgICAgIGlmIChyZXN1bHQuaW52b2ljZV90aXRsZSkge1xuICAgICAgICAgICAgJChcIiNuZWVkX2ludm9pY2VcIikuYWRkQ2xhc3MoXCJjaGVja2VkXCIpO1xuICAgICAgICAgICAgJChcIiNuZWVkX2ludm9pY2VfZGV0YWlsXCIpLnNob3coKTtcbiAgICAgICAgfVxuICAgICAgICAkKFwiI3JlY2VpdmVyX25hbWVcIikuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIG5hbWUgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICAgICAgY2hlY2tJbnB1dENvbmRpdGlvbihcInJlY2VpdmVyX25hbWVcIiwgKC9eLnsxLDI1fSQvLnRlc3QobmFtZSkgJiYgJC50cmltKG5hbWUpICE9PSBcIlwiKSk7XG4gICAgICAgIH0pO1xuICAgICAgICAkKFwiI3JlY2VpdmVyX3Bob25lXCIpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBwaG9uZSA9ICQodGhpcykudmFsKCk7XG4gICAgICAgICAgICBjaGVja0lucHV0Q29uZGl0aW9uKFwicmVjZWl2ZXJfcGhvbmVcIiwgKC9eXFxkezExfSQvLnRlc3QocGhvbmUpKSk7XG4gICAgICAgIH0pO1xuICAgICAgICAkKFwiI3JlY2VpdmVyX2FkZHJlc3NcIikuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGFkZHJlc3MgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICAgICAgY2hlY2tJbnB1dENvbmRpdGlvbihcInJlY2VpdmVyX2FkZHJlc3NcIiwgKC9eW1xcc1xcU117MSw1MH0kLy50ZXN0KGFkZHJlc3MpICYmICQudHJpbShhZGRyZXNzKSAhPT0gXCJcIikpO1xuICAgICAgICB9KTtcbiAgICAgICAgJChcIiNyZWNlaXZlcl9wcm92aW5jZVwiKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaWQgPSAkKFwiI3JlY2VpdmVyX3Byb3ZpbmNlXCIpLnZhbCgpO1xuICAgICAgICAgICAgc2V0X3Byb3ZpY2VfY2l0eShpZCk7XG4gICAgICAgIH0pO1xuICAgICAgICAkKFwiI3JlY2VpdmVyX2NpdHlcIikuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY2hlY2tSZWNlaXZlclJlZ2lvbigpO1xuICAgICAgICAgICAgdmFyIGlkID0gJChcIiNyZWNlaXZlcl9jaXR5XCIpLnZhbCgpO1xuICAgICAgICAgICAgc2V0X2NpdHlfY291bnR5KGlkKTtcbiAgICAgICAgfSk7XG4gICAgICAgICQoXCIjcmVjZWl2ZXJfY291bnR5XCIpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNoZWNrUmVjZWl2ZXJSZWdpb24oKTtcbiAgICAgICAgfSk7XG4gICAgICAgICQoXCIjY29udGFjdF9uYW1lXCIpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBuYW1lID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgICAgIGNoZWNrSW5wdXRDb25kaXRpb24oXCJjb250YWN0X25hbWVcIiwgKC9eLnsxLDI1fSQvLnRlc3QobmFtZSkgJiYgJC50cmltKG5hbWUpICE9PSBcIlwiKSk7XG4gICAgICAgIH0pO1xuICAgICAgICAkKFwiI2NvbnRhY3RfcGhvbmVcIikuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHBob25lID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgICAgIGNoZWNrSW5wdXRDb25kaXRpb24oXCJjb250YWN0X3Bob25lXCIsICgvXlxcZHsxMX0kLy50ZXN0KHBob25lKSkpO1xuICAgICAgICB9KTtcbiAgICAgICAgJChcIiNyZWNlaXZlcl9jb2RlXCIpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBjb2RlID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgICAgIGNoZWNrSW5wdXRDb25kaXRpb24oXCJyZWNlaXZlcl9jb2RlXCIsICgvXlswLTldezAsNn0kLy50ZXN0KGNvZGUpKSk7XG4gICAgICAgIH0pO1xuICAgICAgICAkKFwiI2NvbnRhY3RfcXFcIikuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHFxID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgICAgIGNoZWNrSW5wdXRDb25kaXRpb24oXCJjb250YWN0X3FxXCIsICgvXlswLTldezAsMTB9JC8udGVzdChxcSkpKTtcbiAgICAgICAgfSk7XG4gICAgICAgICQoXCIjcmVjZWl2ZXJfaW52b2ljZVwiKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaW52b2ljZSA9ICQodGhpcykudmFsKCk7XG4gICAgICAgICAgICBjaGVja0lucHV0Q29uZGl0aW9uKFwicmVjZWl2ZXJfaW52b2ljZVwiLCAoL15bXFxzXFxTXXswLDUwfSQvLnRlc3QoaW52b2ljZSkgJiYgJC50cmltKGludm9pY2UpICE9PSBcIlwiKSk7XG4gICAgICAgIH0pO1xuICAgICAgICAkKFwiI3JlY2VpdmVyX3JlbWFya1wiKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgcmVtYXJrID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgICAgIGNoZWNrSW5wdXRDb25kaXRpb24oXCJyZWNlaXZlcl9yZW1hcmtcIiwgKC9eW1xcc1xcU117MCw1MDB9JC8udGVzdChyZW1hcmspICYmICQudHJpbShyZW1hcmspICE9PSBcIlwiKSk7XG4gICAgICAgIH0pO1xuICAgICAgICAvL+WIoOmZpOWVhuWTgVxuICAgICAgICAkKFwiLmRlbGV0ZS1wcm9kdWN0XCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGlkID0gJCh0aGlzKS5wYXJlbnRzKFwidHJcIikuYXR0cihcImRhdGEtaWRcIik7XG4gICAgICAgICAgICAkKFwiI2RlbGV0ZV9wcm9kdWN0IC5yaWdodFwiKS5kYXRhKFwiaWRcIiwgaWQpO1xuICAgICAgICAgICAgcG9wVXAuc2hvd1BvcChcIiNkZWxldGVfcHJvZHVjdFwiKTtcbiAgICAgICAgfSk7XG4gICAgICAgICQoXCIjZGVsZXRlX3Byb2R1Y3QgLnJpZ2h0XCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGlkID0gJCh0aGlzKS5kYXRhKFwiaWRcIik7XG4gICAgICAgICAgICB2YXIgdXJsID0gXCIvYXBpL3YyL2FkbWluL29yZGVycy9yZW1vdmUtaXRlbT9pdGVtX2lkPVwiICsgaWQ7XG4gICAgICAgICAgICAkaHR0cCh1cmwpLmRlbGV0ZShmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgLy/mlLnlj5jmlK/ku5jmlrnlvI/kuovku7ZcbiAgICAgICAgJChcIiNjaGFuZ2VfcGF5X21ldGhvZCAucGF5LW1ldGhvZFwiKS5jbGljayhmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgaWYgKHJlc3VsdC5zdGF0dXMgPT09ICdERUxJVkVSWV9DT05GSVJNRUQnICYmIHBheW1lbnQgPT09ICdDQVNIX09OX0RFTElWRVJZJykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgICAgICAkKFwiI2NoYW5nZV9wYXlfbWV0aG9kIC5wYXktbWV0aG9kXCIpLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIik7XG4gICAgICAgICAgICAkKHRhcmdldCkuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8v5piv5ZCm6ZyA6KaB5Y+R56WoXG4gICAgICAgICQoXCIjbmVlZF9pbnZvaWNlXCIpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgJHRhcmdldDtcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSAhPT0gXCJhXCIpIHtcbiAgICAgICAgICAgICAgICAkdGFyZ2V0ID0gJChldmVudC50YXJnZXQpLnBhcmVudCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkdGFyZ2V0ID0gJChldmVudC50YXJnZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCR0YXJnZXQuaGFzQ2xhc3MoXCJjaGVja2VkXCIpKSB7XG4gICAgICAgICAgICAgICAgJHRhcmdldC5yZW1vdmVDbGFzcyhcImNoZWNrZWRcIik7XG4gICAgICAgICAgICAgICAgJChcIiNuZWVkX2ludm9pY2VfZGV0YWlsXCIpLmhpZGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJHRhcmdldC5hZGRDbGFzcyhcImNoZWNrZWRcIik7XG4gICAgICAgICAgICAgICAgJChcIiNuZWVkX2ludm9pY2VfZGV0YWlsXCIpLnNob3coKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdpbmRvdy5ldmVudC5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgICAgLy/kv67mlLnmjInpnIDlrprliLbllYblk4FcbiAgICAgICAgJChcIi5lZGl0LXByb2R1Y3RcIikuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBpZCA9ICQodGhpcykucGFyZW50cyhcInRyXCIpLmF0dHIoXCJkYXRhLWlkXCIpO1xuICAgICAgICAgICAgdmFyIGRldGFpbCA9IEpTT04ucGFyc2UoJCh0aGlzKS5wYXJlbnRzKFwidHJcIikuYXR0cihcImRhdGEtZGV0YWlsXCIpKTtcbiAgICAgICAgICAgIGlmIChkZXRhaWwubmFtZSkge1xuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gZGV0YWlsO1xuXG4gICAgICAgICAgICAgICAgT25EZW1hbmRQcm9kdWN0LnNldERhdGEoZGF0YS5uYW1lLCBkYXRhLnF1YW50aXR5LCBkYXRhLnNpemUsIGRhdGEuY2FpemhpLCBkYXRhLm90aGVycyk7XG5cbiAgICAgICAgICAgICAgICBwb3BVcC5zaG93UG9wKFwiI2VkaXRfZGVtYW5kX2RldGFpbFwiKTtcbiAgICAgICAgICAgICAgICAkKFwiI2VkaXRfZGVtYW5kX2RldGFpbF90aXRsZVwiKS5odG1sKFwi57yW6L6R5oyJ6ZyA5a6a5Yi25ZWG5ZOBXCIpO1xuXG4gICAgICAgICAgICAgICAgJChcIiNlZGl0X2RlbWFuZF9kZXRhaWwgLnJpZ2h0XCIpLmRhdGEoXCJpZFwiLCBpZCk7XG5cbiAgICAgICAgICAgICAgICAkKFwiI2VkaXRfZGVtYW5kX2RldGFpbCAucmlnaHRcIikudW5iaW5kKCk7XG4gICAgICAgICAgICAgICAgJChcIiNlZGl0X2RlbWFuZF9kZXRhaWwgLnJpZ2h0XCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaWQgPSAkKHRoaXMpLmRhdGEoXCJpZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHVybCA9IFwiL2FwaS92Mi9hZG1pbi9vcmRlcnMvZWRpdC1jdXN0b20taXRlbT9pdGVtX2lkPVwiICsgaWQ7XG4gICAgICAgICAgICAgICAgICAgIGFkZE9yRWRpdE9uRGVtYW5kUHJvZHVjdCh1cmwsIDIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvL+a3u+WKoOaMiemcgOWumuWItuWVhuWTgVxuICAgICAgICAkKFwiI2FkbWluX2FkZF9kZW1hbmRcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBPbkRlbWFuZFByb2R1Y3QuaW5pdERhdGEoKTtcblxuICAgICAgICAgICAgcG9wVXAuc2hvd1BvcChcIiNlZGl0X2RlbWFuZF9kZXRhaWxcIik7XG4gICAgICAgICAgICAkKFwiI2VkaXRfZGVtYW5kX2RldGFpbF90aXRsZVwiKS5odG1sKFwi5re75Yqg5oyJ6ZyA5a6a5Yi25ZWG5ZOBXCIpO1xuXG4gICAgICAgICAgICAkKFwiI2VkaXRfZGVtYW5kX2RldGFpbCAucmlnaHRcIikudW5iaW5kKCk7XG4gICAgICAgICAgICAkKFwiI2VkaXRfZGVtYW5kX2RldGFpbCAucmlnaHRcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgLy8gVE9ET1xuICAgICAgICAgICAgICAgIHZhciB1cmwgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGFkZE9yRWRpdE9uRGVtYW5kUHJvZHVjdCh1cmwsIDEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8v5o+Q5Lqk6K6i5Y2VXG4gICAgICAgICQoXCIjYWRtaW5fY3JlYXRlX29yZGVyXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHJlY2VpdmVyX25hbWUgPSAkKFwiI3JlY2VpdmVyX25hbWVcIikudmFsKCk7XG4gICAgICAgICAgICBpZiAoIWNoZWNrSW5wdXRDb25kaXRpb24oXCJyZWNlaXZlcl9uYW1lXCIsICgvXi57MSwyNX0kLy50ZXN0KHJlY2VpdmVyX25hbWUpICYmICQudHJpbShyZWNlaXZlcl9uYW1lKSAhPT0gXCJcIikpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFjaGVja1JlY2VpdmVyUmVnaW9uKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgcmVjZWl2ZXJfYWRkcmVzcyA9ICQoXCIjcmVjZWl2ZXJfYWRkcmVzc1wiKS52YWwoKTtcbiAgICAgICAgICAgIGlmICghY2hlY2tJbnB1dENvbmRpdGlvbihcInJlY2VpdmVyX2FkZHJlc3NcIiwgKC9eW1xcc1xcU117MSw1MH0kLy50ZXN0KHJlY2VpdmVyX2FkZHJlc3MpICYmICQudHJpbShyZWNlaXZlcl9hZGRyZXNzKSAhPT0gXCJcIikpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHJlY2VpdmVyX3Bob25lID0gJChcIiNyZWNlaXZlcl9waG9uZVwiKS52YWwoKTtcbiAgICAgICAgICAgIGlmICghY2hlY2tJbnB1dENvbmRpdGlvbihcInJlY2VpdmVyX3Bob25lXCIsICgvXlxcZHsxMX0kLy50ZXN0KHJlY2VpdmVyX3Bob25lKSkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHJlY2VpdmVyX2NvZGUgPSAkKFwiI3JlY2VpdmVyX2NvZGVcIikudmFsKCk7XG4gICAgICAgICAgICBpZiAoIWNoZWNrSW5wdXRDb25kaXRpb24oXCJyZWNlaXZlcl9jb2RlXCIsICgvXlswLTldezAsNn0kLy50ZXN0KHJlY2VpdmVyX2NvZGUpKSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgY29udGFjdF9xcSA9ICQoXCIjY29udGFjdF9xcVwiKS52YWwoKTtcbiAgICAgICAgICAgIGlmICghY2hlY2tJbnB1dENvbmRpdGlvbihcImNvbnRhY3RfcXFcIiwgKC9eWzAtOV17MCwxMH0kLy50ZXN0KGNvbnRhY3RfcXEpKSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBjb250YWN0X25hbWUgPSAkKFwiI2NvbnRhY3RfbmFtZVwiKS52YWwoKTtcbiAgICAgICAgICAgIGlmICghY2hlY2tJbnB1dENvbmRpdGlvbihcImNvbnRhY3RfbmFtZVwiLCAoL14uezEsMjV9JC8udGVzdChjb250YWN0X25hbWUpICYmICQudHJpbShjb250YWN0X25hbWUpICE9PSBcIlwiKSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBjb250YWN0X3Bob25lID0gJChcIiNjb250YWN0X3Bob25lXCIpLnZhbCgpO1xuICAgICAgICAgICAgaWYgKCFjaGVja0lucHV0Q29uZGl0aW9uKFwiY29udGFjdF9waG9uZVwiLCAoL15cXGR7MTF9JC8udGVzdChjb250YWN0X3Bob25lKSkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgcmVjZWl2ZXJfcmVtYXJrID0gJChcIiNyZWNlaXZlcl9yZW1hcmtcIikudmFsKCk7XG4gICAgICAgICAgICBpZiAoIWNoZWNrSW5wdXRDb25kaXRpb24oXCJyZWNlaXZlcl9yZW1hcmtcIiwgKC9eW1xcc1xcU117MCw1MDB9JC8udGVzdChyZWNlaXZlcl9yZW1hcmspKSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBpZCA9ICQodGhpcykuYXR0cihcImRhdGEtaWRcIik7XG4gICAgICAgICAgICB2YXIgdXJsID0gXCIvYXBpL3YyL2FkbWluL29yZGVycy9lZGl0P2lkPVwiICsgaWQ7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICBpdGVtX2lkczogW10sXG4gICAgICAgICAgICAgICAgY29uc2lnbmVlX25hbWU6ICQudHJpbSgkKFwiI3JlY2VpdmVyX25hbWVcIikudmFsKCkpLFxuICAgICAgICAgICAgICAgIGFkZHJlc3M6ICQudHJpbSgkKFwiI3JlY2VpdmVyX2FkZHJlc3NcIikudmFsKCkpLFxuICAgICAgICAgICAgICAgIHBvc3RfY29kZTogJChcIiNyZWNlaXZlcl9jb2RlXCIpLnZhbCgpLFxuICAgICAgICAgICAgICAgIGNvbnNpZ25lZV9waG9uZTogJChcIiNyZWNlaXZlcl9waG9uZVwiKS52YWwoKSxcbiAgICAgICAgICAgICAgICBjb250YWN0X25hbWU6ICQudHJpbSgkKFwiI2NvbnRhY3RfbmFtZVwiKS52YWwoKSksXG4gICAgICAgICAgICAgICAgY29udGFjdF9waG9uZTogJChcIiNjb250YWN0X3Bob25lXCIpLnZhbCgpLFxuICAgICAgICAgICAgICAgIGNvbnRhY3RfcXE6ICQoXCIjY29udGFjdF9xcVwiKS52YWwoKSxcbiAgICAgICAgICAgICAgICByZW1hcms6ICQudHJpbSgkKFwiI3JlY2VpdmVyX3JlbWFya1wiKS52YWwoKSksXG4gICAgICAgICAgICAgICAgcGF5bWVudDogJCgkKFwiI2NoYW5nZV9wYXlfbWV0aG9kXCIpLmNoaWxkcmVuKFwiLnNlbGVjdGVkXCIpWzBdKS5hdHRyKFwiZGF0YS12YWx1ZVwiKSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBkYXRhLnJlZ2lvbl9pZCA9ICgkKFwiI3JlY2VpdmVyX2NvdW50eVwiKS52YWwoKSA/ICQoXCIjcmVjZWl2ZXJfY291bnR5XCIpLnZhbCgpIDogJChcIiNyZWNlaXZlcl9jaXR5XCIpLnZhbCgpKSAqIDE7XG4gICAgICAgICAgICBpZiAoJChcIiNuZWVkX2ludm9pY2VcIikuaGFzQ2xhc3MoXCJjaGVja2VkXCIpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlY2VpdmVyX2ludm9pY2UgPSAkKFwiI3JlY2VpdmVyX2ludm9pY2VcIikudmFsKCk7XG4gICAgICAgICAgICAgICAgaWYgKCFjaGVja0lucHV0Q29uZGl0aW9uKFwicmVjZWl2ZXJfaW52b2ljZVwiLCAoL15bXFxzXFxTXXswLDUwfSQvLnRlc3QocmVjZWl2ZXJfaW52b2ljZSkgJiYgJC50cmltKHJlY2VpdmVyX2ludm9pY2UpICE9PSBcIlwiKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEuaW52b2ljZV90aXRsZSA9ICQudHJpbSgkKFwiI3JlY2VpdmVyX2ludm9pY2VcIikudmFsKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGF0YS5pbnZvaWNlX3RpdGxlID0gXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICRodHRwKHVybCkucHV0KGRhdGEsIGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSBcIi9hZG1pbi9vcmRlcj9pZD1cIiArIGlkO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgICAgIC8v5L+u5pS56K6i5Y2V5pWw6YeP5Lu35qC8XG4gICAgICAgICQoXCIuYWRtaW4tZWRpdC1vcmRlclwiKS5jbGljayhmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgdmFyICR0YXJnZXQgPSAkKGV2ZW50LnRhcmdldCk7XG4gICAgICAgICAgICB2YXIgJGRpc3BsYXkgPSAkdGFyZ2V0LnBhcmVudChcIi5wcm9kdWN0LWRpc3BsYXlcIik7XG4gICAgICAgICAgICB2YXIgJGVkaXQgPSAkZGlzcGxheS5uZXh0KFwiLnByb2R1Y3QtZWRpdFwiKTtcbiAgICAgICAgICAgICRkaXNwbGF5LmhpZGUoKTtcbiAgICAgICAgICAgICRlZGl0LnNob3coKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8v5L+d5a2Y5L+u5pS56K6i5Y2V5pWw6YeP5Lu35qC8XG4gICAgICAgICQoXCIuYWRtaW4tc2F2ZS1vcmRlclwiKS5jbGljayhmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgdmFyICR0YXJnZXQgPSAkKGV2ZW50LnRhcmdldCk7XG4gICAgICAgICAgICB2YXIgJGlucHV0ID0gJHRhcmdldC5wcmV2KFwiLmFkbWluLWlucHV0XCIpO1xuICAgICAgICAgICAgdmFyICRlZGl0ID0gJHRhcmdldC5wYXJlbnQoXCIucHJvZHVjdC1lZGl0XCIpO1xuICAgICAgICAgICAgdmFyICRkaXNwbGF5ID0gJGVkaXQucHJldihcIi5wcm9kdWN0LWRpc3BsYXlcIik7XG4gICAgICAgICAgICBhZG1pbkNoYW5nZU9yZGVyKCRlZGl0LCAkZGlzcGxheSk7XG4gICAgICAgIH0pO1xuICAgICAgICAvL+WPlua2iOS/ruaUueiuouWNleaVsOmHj+S7t+agvFxuICAgICAgICAkKFwiLmFkbWluLWNhbmNlbC1vcmRlclwiKS5jbGljayhmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgdmFyICR0YXJnZXQgPSAkKGV2ZW50LnRhcmdldCk7XG4gICAgICAgICAgICB2YXIgJGVkaXQgPSAkdGFyZ2V0LnBhcmVudChcIi5wcm9kdWN0LWVkaXRcIik7XG4gICAgICAgICAgICB2YXIgJGRpc3BsYXkgPSAkZWRpdC5wcmV2KFwiLnByb2R1Y3QtZGlzcGxheVwiKTtcbiAgICAgICAgICAgICRkaXNwbGF5LnNob3coKTtcbiAgICAgICAgICAgICRlZGl0LmhpZGUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8v5Lu35qC85b+F6aG75pivMC4wMOeahOW9ouW8j1xuICAgICAgICAkKFwiLmFkbWluLXByaWNlXCIpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICAgICAgdmFyIHByaWNlID0gcGFyc2VGbG9hdCh2YWwpO1xuICAgICAgICAgICAgdmFyIGlzUHJpY2UgPSAvXihbMS05XVtcXGRdezAsN318MCkoXFwuW1xcZF17MSwyfSk/JC87XG4gICAgICAgICAgICBpZiAoIWlzUHJpY2UudGVzdCh2YWwpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGlzVHdvID0gL14oWzEtOV1bXFxkXXswLDd9fDApKFxcLltcXGRdKyk/JC87XG4gICAgICAgICAgICAgICAgaWYgKGlzVHdvLnRlc3QodmFsKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSB2YWwuaW5kZXhPZihcIi5cIik7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZWFsID0gdmFsLnN1YnN0cigwLCBpbmRleCArIDMpO1xuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnZhbChyZWFsKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnZhbChcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHByaWNlID4gMTAwMDAwMC4wMCkge1xuICAgICAgICAgICAgICAgICQodGhpcykudmFsKFwiMTAwMDAwMC4wMFwiKVxuICAgICAgICAgICAgfSBlbHNlIGlmIChwcmljZSA8IDAuMDApIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnZhbChcIjAuMDBcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICAvL+aVsOmHj+W/hemhu+aYr+aVtOaVsFxuICAgICAgICAkKFwiLmFkbWluLW51bVwiKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgICAgIHZhciBudW0gPSBwYXJzZUludCh2YWwpO1xuICAgICAgICAgICAgaWYgKGlzTmFOKG51bSkpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnZhbChcIlwiKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsICE9IG51bSkge1xuICAgICAgICAgICAgICAgICQodGhpcykudmFsKG51bSlcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobnVtID4gMTAwMDAwKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS52YWwoXCIxMDAwMDBcIilcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobnVtIDwgMCkge1xuICAgICAgICAgICAgICAgICQodGhpcykudmFsKFwiMFwiKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBhZGRPckVkaXRPbkRlbWFuZFByb2R1Y3QodXJsLCBtZXRob2QpIHtcbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICBuYW1lOiAkKFwiI29uX2RlbWFuZF9wcm9kdWN0X25hbWVfaW5wdXRcIikudmFsKCksXG4gICAgICAgICAgICBjYXRlZ29yeTogJ+WumuWItuWQjeeJhycsXG4gICAgICAgICAgICBxdWFudGl0eTogJChcIiNvbl9kZW1hbmRfcHJvZHVjdF9xdWFudGl0eV9pbnB1dFwiKS52YWwoKSxcbiAgICAgICAgICAgIHNpemU6ICQoXCIjb25fZGVtYW5kX3Byb2R1Y3Rfc2l6ZV9pbnB1dFwiKS52YWwoKSxcbiAgICAgICAgICAgIGNhaXpoaTogJChcIiNvbl9kZW1hbmRfcHJvZHVjdF9jYWl6aGlfaW5wdXRcIikudmFsKCksXG4gICAgICAgICAgICBvdGhlcnM6ICQoXCIjb25fZGVtYW5kX3Byb2R1Y3Rfb3RoZXJzX2lucHV0XCIpLnZhbCgpLFxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBmb3JtSXRlbTtcbiAgICAgICAgaWYgKE9uRGVtYW5kUHJvZHVjdC52YWxpZGF0ZU5hbWUoZGF0YS5uYW1lKSkge1xuICAgICAgICAgICAgZm9ybUl0ZW0gPSAkKFwiI29uX2RlbWFuZF9wcm9kdWN0X25hbWVfaW5wdXRcIikuY2xvc2VzdChcIi5mb3JtLWl0ZW1cIik7XG4gICAgICAgICAgICBpZiAoIWZvcm1JdGVtLmhhc0NsYXNzKFwiZXJyb3JcIikpIHtcbiAgICAgICAgICAgICAgICBmb3JtSXRlbS5hZGRDbGFzcyhcImVycm9yXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJChcIiNvbl9kZW1hbmRfcHJvZHVjdF9uYW1lX2lucHV0XCIpLmZvY3VzKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKE9uRGVtYW5kUHJvZHVjdC52YWxpZGF0ZVF1YW50aXR5KGRhdGEucXVhbnRpdHkpKSB7XG4gICAgICAgICAgICBmb3JtSXRlbSA9ICQoXCIjb25fZGVtYW5kX3Byb2R1Y3RfcXVhbnRpdHlfaW5wdXRcIikuY2xvc2VzdChcIi5mb3JtLWl0ZW1cIik7XG4gICAgICAgICAgICBpZiAoIWZvcm1JdGVtLmhhc0NsYXNzKFwiZXJyb3JcIikpIHtcbiAgICAgICAgICAgICAgICBmb3JtSXRlbS5hZGRDbGFzcyhcImVycm9yXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJChcIiNvbl9kZW1hbmRfcHJvZHVjdF9xdWFudGl0eV9pbnB1dFwiKS5mb2N1cygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKE9uRGVtYW5kUHJvZHVjdC52YWxpZGF0ZVNpemUoZGF0YS5zaXplKSB8fCBPbkRlbWFuZFByb2R1Y3QudmFsaWRhdGVDYWl6aGkoZGF0YS5jYWl6aGkpIHx8XG4gICAgICAgICAgICBPbkRlbWFuZFByb2R1Y3QudmFsaWRhdGVPdGhlcnMoZGF0YS5vdGhlcnMpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWV0aG9kID09IDIpIHtcbiAgICAgICAgICAgICRodHRwKHVybCkucHV0KGRhdGEsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkaHR0cCh1cmwpLnBvc3QoZGF0YSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkbWluQ2hhbmdlT3JkZXIoJGVkaXQsICRkaXNwbGF5KSB7XG4gICAgICAgIHZhciAkdHIgPSAkZWRpdC5wYXJlbnQoKS5wYXJlbnQoXCJ0clwiKTtcbiAgICAgICAgdmFyIGlkID0gJHRyLmF0dHIoXCJkYXRhLWlkXCIpO1xuICAgICAgICB2YXIgJGlucHV0ID0gJGVkaXQuZmluZChcIi5hZG1pbi1pbnB1dFwiKTtcbiAgICAgICAgaWYgKCRpbnB1dC5oYXNDbGFzcyhcImFkbWluLXByaWNlXCIpKSB7XG4gICAgICAgICAgICB2YXIgcHJpY2UgPSBwcm9jZXNzRGF0YS5wcm9jZXNzUmVhbFByb2NlKCRpbnB1dC52YWwoKSk7XG4gICAgICAgICAgICBpZiAoJGlucHV0Lmhhc0NsYXNzKFwiYWRtaW4tZGVtYW5kXCIpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHF1YW50aXR5ID0gMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIHF1YW50aXR5ID0gJHRyLmZpbmQoXCIuYWRtaW4tbnVtXCIpLnZhbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIHF1YW50aXR5ID0gJGlucHV0LnZhbCgpO1xuICAgICAgICAgICAgdmFyIHByaWNlID0gcHJvY2Vzc0RhdGEucHJvY2Vzc1JlYWxQcm9jZSgkdHIuZmluZChcIi5hZG1pbi1wcmljZVwiKS52YWwoKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFwcmljZSB8fCAhcXVhbnRpdHkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdXJsID0gXCIvYXBpL3YyL2FkbWluL29yZGVycy91cGRhdGUtaXRlbS1wcmljZT9pdGVtX2lkPVwiICsgaWQgKyBcIiZwcmljZT1cIiArIHByaWNlICsgXCImcXVhbnRpdHk9XCIgKyBxdWFudGl0eTtcbiAgICAgICAgJGh0dHAodXJsKS5wdXQoe30sIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gJGRpc3BsYXkuc2hvdygpO1xuICAgICAgICAgICAgLy8gJGRpc3BsYXkuZmluZChcInNwYW5cIikudGV4dCgkaW5wdXQudmFsKCkpO1xuICAgICAgICAgICAgLy8gJGVkaXQuaGlkZSgpO1xuICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgIH0pXG4gICAgfVxufSkoKVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9hZG1pbi9lZGl0LmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSA0XG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==