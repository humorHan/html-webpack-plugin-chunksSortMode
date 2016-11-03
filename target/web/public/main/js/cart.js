webpackJsonp([1,19],[
/* 0 */
/***/ function(module, exports) {

	(function() {
	    $http('/api/v2/cart/full').get(function(data) {
	        var items = data.items;
	        var custom_items = data.custom_items;
	        var items_l = items.length;
	        var custom_items_l = custom_items.length;
	        var count = items_l + custom_items_l;
	        if (count === 0) {
	            $("#empty_cart_box").show();
	            $("#my_cart_box").hide();
	        } else {
	            $("#my_cart_count").text(count);
	            $("#empty_cart_box").hide();
	            $("#my_cart_box").show();
	            var str = '';
	            if (items_l > 0) {
	                for (var i = 0; i < items.length; i++) {
	                    items[i].productUrl = '/product?id=' + items[i].product_id + '#' + items[i].brief;
	                    items[i].amount = processData.processPrice(items[i].price * items[i].quantity);
	                    str += '<tr class="priced-product selected" data-id="' + items[i].id + '"><td class="item-select"><a class="check-box">';
	                    str += '<input id="cart_product_' + items[i].id + '" type="checkbox"><label for="cart_product_' + items[i].id + '">';
	                    str += '</label></a></td><td class="item-product"><div><div class="item-product-img"><a href="' + items[i].productUrl + '">';
	                    str += '<img src="' + IMG_LINK + items[i].image_key + '?imageView2/1/w/80/h/80/">';
	                    str += '</a></div><div class="item-product-describe"><a href="' + items[i].productUrl + '"><p class="title">' + items[i].title + '</p>';
	                    str += '<p class="describe">' + items[i].brief + '</p></a></div></div></td><td class="item-price" data-price="' + items[i].price + '">';
	                    str += '<div>' + processData.processPrice(items[i].price) + '</div></td><td class="item-num"><div class="add-num">';
	                    if (items[i].min_quantity == items[i].quantity) {
	                        str += '<span class="minus disabled">-</span>';
	                    } else {
	                        str += '<span class="minus">-</span>';
	                    }
	                    str += '<input max-num="100000" min-num="' + items[i].min_quantity + '" value="' + items[i].quantity + '" class="value">';
	                    str += '<span class="plus">+</span></div></td><td class="item-total">' + items[i].amount + '</td>';
	                    str += '<td class="item-deal"><a class="delete-product">删除</a></td></tr>';
	                }
	            }
	            if (custom_items_l > 0) {
	                str += '<tr class="on-demand"><td colspan="6"><div class="on-demand-title">按需定制商品';
	                str += '<span>（该类商品暂无价格，提交订单后客服MM将与您进一步沟通并确定价格）</span></div></td></tr>';
	                for (var i = 0; i < custom_items.length; i++) {
	                    str += '<tr class="demand-product selected" data-id="' + custom_items[i].id + '" data-detail=' + JSON.stringify(custom_items[i].detail) + '><td class="item-select">';
	                    str += '<a class="check-box"><input id="cart_product_' + custom_items[i].id + '" type="checkbox">';
	                    str += '<label for="cart_product_' + custom_items[i].id + '"></label></a></td><td class="item-product">';
	                    str += '<div><div class="item-product-img"><a class="demand-pop">';
	                    str += '<img src="' + IMG_LINK + custom_items[i].image_key + '?imageView2/1/w/80/h/80/"></a>';
	                    str += '</div><div class="item-product-describe"><a class="demand-pop">';
	                    str += '<p class="title">' + custom_items[i].title + '</p><p class="describe">' + custom_items[i].brief + '</p>';
	                    str += '</a></div></div></td><td class="item-price"><div>暂无</div></td>';
	                    str += '<td class="item-num"><div>1</div></td><td class="item-total">暂无</td>';
	                    str += '<td class="item-deal"><a class="edit-product">编辑</a>';
	                    str += '<a class="delete-product">删除</a></td></tr>';
	                }
	            }
	            $("#product_item").html(str);
	            calculateTotalCost();
	            addOption.bindEvent();
	        }
	    });
	    var $table = $("#product_item");
	    //选中某个商品
	    $table.delegate(".check-box", "click", function(event) {
	        var target = event.target;
	        var parent = $(target).parent().parent("tr");
	        if (parent.hasClass("selected")) {
	            parent.removeClass("selected");
	            $(".all-select .check-box").removeClass("checked");
	        } else {
	            parent.addClass("selected");
	            if ($("#product_item .check-box").length == $("#product_item .selected").length) {
	                $(".all-select .check-box").addClass("checked");
	            }
	        }
	        calculateTotalCost();
	    });
	    //选中全选按钮
	    $(".all-select .check-box").click(function(event) {
	        var $taregt = $(event.target);
	        if ($taregt.hasClass("checked")) {
	            $(".all-select .check-box").removeClass("checked");
	            $("#product_item tr").removeClass("selected");
	        } else {
	            $(".all-select .check-box").addClass("checked");
	            $("#product_item tr").addClass("selected");
	            $("#product_item .on-demand").removeClass("selected");
	        }
	        calculateTotalCost();
	    });
	    //删除商品
	    $table.delegate(".delete-product", "click", function() {
	        var id = $(this).parents("tr").attr("data-id");
	        $("#delete_product .right").data("ids", [id]);
	        popUp.showPop("#delete_product");
	    });
	    $("#delete_product .right").click(function() {
	        var ids = $(this).data("ids");
	        var url = "/api/v2/cart/delete?id=" + ids[0];
	        if (ids.length > 1) {
	            for (var i = 1; i < ids.length; i++) {
	                url += '&id=' + ids[i];
	            }
	        }
	        $http(url).delete(function(result) {
	            location.reload();
	        });
	    });
	    //删除选中商品
	    $(".deleteSelect").click(function() {
	        var selected = $table.children('.selected');
	        var ids = [];
	        if (selected.length === 0) {
	            return;
	        }
	        for (var i = 0; i < selected.length; i++) {
	            ids.push($(selected[i]).attr("data-id"));
	        }
	        $("#delete_product .right").data("ids", ids);
	        popUp.showPop("#delete_product");
	    });
	    //查看按需定制商品
	    showDemandDetail($table);
	    //修改按需定制商品
	    $table.delegate(".edit-product", "click", function(event) {
	        var id = $(this).parents("tr").attr("data-id");
	        var detail = JSON.parse($(this).parents("tr").attr("data-detail"));
	        if (detail.name) {
	            var data = detail;
	
	            OnDemandProduct.setData(data.name, data.quantity, data.size, data.caizhi,
	                data.others);
	
	            popUp.showPop("#edit_demand_detail");
	            $("#edit_demand_detail .right").data("id", id);
	        }
	    });
	
	    $("#edit_demand_detail .right").click(function() {
	        var id = $(this).data("id");
	        var url = "/api/v2/cart/edit-custom?id=" + id;
	        var data = {
	            name: $("#on_demand_product_name_input").val(),
	            category:'定制名片',
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
	        $http(url).put(data, function() {
	            location.reload();
	        });
	    });
	    //修改数量
	    $table.delegate(".value", "change", function(event) {
	        changeProductNum(event, $(this).val());
	    });
	    $table.delegate(".plus", "click", function(event) {
	        changeProductNum(event, $(this).prev().val());
	    });
	    $table.delegate(".minus", "click", function(event) {
	        changeProductNum(event, $(this).next().val());
	    });
	    //去结算
	    $("#go_to_confirm").click(function() {
	        var selected = $table.find(".selected");
	        var jumpLink = "/cart/confirm?id=";
	        var length = selected.length;
	        if (length == 0) {
	            alert("请选择商品！");
	        } else {
	            for (var i = 0; i < length; i++) {
	                jumpLink += $(selected[i]).attr("data-id");
	                if (i != length - 1) {
	                    jumpLink += "&id=";
	                }
	            }
	            location.href = jumpLink;
	        }
	    });
	
	    //修改商品数量
	    function changeProductNum(event, val) {
	        var $tr = $(event.target).parents("tr");
	        var id = $tr.attr("data-id");
	        var url = "/api/v2/cart/update-quantity?id=" + id + "&quantity=" + val;
	        $http(url).put({}, function(result) {
	            var price = $tr.find(".item-price").attr("data-price");
	            var sum = price * val;
	            var total = processData.processPrice(sum);
	            $tr.find(".item-total").text(total);
	            calculateTotalCost()
	        })
	    }
	    //计算选中商品的总价钱
	    function calculateTotalCost() {
	        var $priced = $table.find(".priced-product");
	        var totalPrice = 0;
	        for (var i = 0; i < $priced.length; i++) {
	            if ($($priced[i]).hasClass("selected")) {
	                totalPrice += processData.processRealProce($($priced[i]).find(".item-total").text());
	            }
	        }
	        totalPrice = processData.processPrice(totalPrice);
	        if ($table.find(".demand-product").hasClass("selected")) {
	            if (totalPrice === "0.00") {
	                totalPrice = " ？";
	            } else {
	                totalPrice += " + ？";
	            }
	        }
	        $("#total_price").text("￥" + totalPrice);
	    }
	})()


/***/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvY2FydC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUErQixrQkFBa0I7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUErQix5QkFBeUI7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTJCLGdCQUFnQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNULE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF1QixxQkFBcUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVCxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVCw0QkFBMkIsWUFBWTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBdUIsb0JBQW9CO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMiLCJmaWxlIjoianMvY2FydC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpIHtcbiAgICAkaHR0cCgnL2FwaS92Mi9jYXJ0L2Z1bGwnKS5nZXQoZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICB2YXIgaXRlbXMgPSBkYXRhLml0ZW1zO1xuICAgICAgICB2YXIgY3VzdG9tX2l0ZW1zID0gZGF0YS5jdXN0b21faXRlbXM7XG4gICAgICAgIHZhciBpdGVtc19sID0gaXRlbXMubGVuZ3RoO1xuICAgICAgICB2YXIgY3VzdG9tX2l0ZW1zX2wgPSBjdXN0b21faXRlbXMubGVuZ3RoO1xuICAgICAgICB2YXIgY291bnQgPSBpdGVtc19sICsgY3VzdG9tX2l0ZW1zX2w7XG4gICAgICAgIGlmIChjb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgJChcIiNlbXB0eV9jYXJ0X2JveFwiKS5zaG93KCk7XG4gICAgICAgICAgICAkKFwiI215X2NhcnRfYm94XCIpLmhpZGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoXCIjbXlfY2FydF9jb3VudFwiKS50ZXh0KGNvdW50KTtcbiAgICAgICAgICAgICQoXCIjZW1wdHlfY2FydF9ib3hcIikuaGlkZSgpO1xuICAgICAgICAgICAgJChcIiNteV9jYXJ0X2JveFwiKS5zaG93KCk7XG4gICAgICAgICAgICB2YXIgc3RyID0gJyc7XG4gICAgICAgICAgICBpZiAoaXRlbXNfbCA+IDApIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zW2ldLnByb2R1Y3RVcmwgPSAnL3Byb2R1Y3Q/aWQ9JyArIGl0ZW1zW2ldLnByb2R1Y3RfaWQgKyAnIycgKyBpdGVtc1tpXS5icmllZjtcbiAgICAgICAgICAgICAgICAgICAgaXRlbXNbaV0uYW1vdW50ID0gcHJvY2Vzc0RhdGEucHJvY2Vzc1ByaWNlKGl0ZW1zW2ldLnByaWNlICogaXRlbXNbaV0ucXVhbnRpdHkpO1xuICAgICAgICAgICAgICAgICAgICBzdHIgKz0gJzx0ciBjbGFzcz1cInByaWNlZC1wcm9kdWN0IHNlbGVjdGVkXCIgZGF0YS1pZD1cIicgKyBpdGVtc1tpXS5pZCArICdcIj48dGQgY2xhc3M9XCJpdGVtLXNlbGVjdFwiPjxhIGNsYXNzPVwiY2hlY2stYm94XCI+JztcbiAgICAgICAgICAgICAgICAgICAgc3RyICs9ICc8aW5wdXQgaWQ9XCJjYXJ0X3Byb2R1Y3RfJyArIGl0ZW1zW2ldLmlkICsgJ1wiIHR5cGU9XCJjaGVja2JveFwiPjxsYWJlbCBmb3I9XCJjYXJ0X3Byb2R1Y3RfJyArIGl0ZW1zW2ldLmlkICsgJ1wiPic7XG4gICAgICAgICAgICAgICAgICAgIHN0ciArPSAnPC9sYWJlbD48L2E+PC90ZD48dGQgY2xhc3M9XCJpdGVtLXByb2R1Y3RcIj48ZGl2PjxkaXYgY2xhc3M9XCJpdGVtLXByb2R1Y3QtaW1nXCI+PGEgaHJlZj1cIicgKyBpdGVtc1tpXS5wcm9kdWN0VXJsICsgJ1wiPic7XG4gICAgICAgICAgICAgICAgICAgIHN0ciArPSAnPGltZyBzcmM9XCInICsgSU1HX0xJTksgKyBpdGVtc1tpXS5pbWFnZV9rZXkgKyAnP2ltYWdlVmlldzIvMS93LzgwL2gvODAvXCI+JztcbiAgICAgICAgICAgICAgICAgICAgc3RyICs9ICc8L2E+PC9kaXY+PGRpdiBjbGFzcz1cIml0ZW0tcHJvZHVjdC1kZXNjcmliZVwiPjxhIGhyZWY9XCInICsgaXRlbXNbaV0ucHJvZHVjdFVybCArICdcIj48cCBjbGFzcz1cInRpdGxlXCI+JyArIGl0ZW1zW2ldLnRpdGxlICsgJzwvcD4nO1xuICAgICAgICAgICAgICAgICAgICBzdHIgKz0gJzxwIGNsYXNzPVwiZGVzY3JpYmVcIj4nICsgaXRlbXNbaV0uYnJpZWYgKyAnPC9wPjwvYT48L2Rpdj48L2Rpdj48L3RkPjx0ZCBjbGFzcz1cIml0ZW0tcHJpY2VcIiBkYXRhLXByaWNlPVwiJyArIGl0ZW1zW2ldLnByaWNlICsgJ1wiPic7XG4gICAgICAgICAgICAgICAgICAgIHN0ciArPSAnPGRpdj4nICsgcHJvY2Vzc0RhdGEucHJvY2Vzc1ByaWNlKGl0ZW1zW2ldLnByaWNlKSArICc8L2Rpdj48L3RkPjx0ZCBjbGFzcz1cIml0ZW0tbnVtXCI+PGRpdiBjbGFzcz1cImFkZC1udW1cIj4nO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbXNbaV0ubWluX3F1YW50aXR5ID09IGl0ZW1zW2ldLnF1YW50aXR5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHIgKz0gJzxzcGFuIGNsYXNzPVwibWludXMgZGlzYWJsZWRcIj4tPC9zcGFuPic7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHIgKz0gJzxzcGFuIGNsYXNzPVwibWludXNcIj4tPC9zcGFuPic7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc3RyICs9ICc8aW5wdXQgbWF4LW51bT1cIjEwMDAwMFwiIG1pbi1udW09XCInICsgaXRlbXNbaV0ubWluX3F1YW50aXR5ICsgJ1wiIHZhbHVlPVwiJyArIGl0ZW1zW2ldLnF1YW50aXR5ICsgJ1wiIGNsYXNzPVwidmFsdWVcIj4nO1xuICAgICAgICAgICAgICAgICAgICBzdHIgKz0gJzxzcGFuIGNsYXNzPVwicGx1c1wiPis8L3NwYW4+PC9kaXY+PC90ZD48dGQgY2xhc3M9XCJpdGVtLXRvdGFsXCI+JyArIGl0ZW1zW2ldLmFtb3VudCArICc8L3RkPic7XG4gICAgICAgICAgICAgICAgICAgIHN0ciArPSAnPHRkIGNsYXNzPVwiaXRlbS1kZWFsXCI+PGEgY2xhc3M9XCJkZWxldGUtcHJvZHVjdFwiPuWIoOmZpDwvYT48L3RkPjwvdHI+JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY3VzdG9tX2l0ZW1zX2wgPiAwKSB7XG4gICAgICAgICAgICAgICAgc3RyICs9ICc8dHIgY2xhc3M9XCJvbi1kZW1hbmRcIj48dGQgY29sc3Bhbj1cIjZcIj48ZGl2IGNsYXNzPVwib24tZGVtYW5kLXRpdGxlXCI+5oyJ6ZyA5a6a5Yi25ZWG5ZOBJztcbiAgICAgICAgICAgICAgICBzdHIgKz0gJzxzcGFuPu+8iOivpeexu+WVhuWTgeaaguaXoOS7t+agvO+8jOaPkOS6pOiuouWNleWQjuWuouacjU1N5bCG5LiO5oKo6L+b5LiA5q2l5rKf6YCa5bm256Gu5a6a5Lu35qC877yJPC9zcGFuPjwvZGl2PjwvdGQ+PC90cj4nO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY3VzdG9tX2l0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0ciArPSAnPHRyIGNsYXNzPVwiZGVtYW5kLXByb2R1Y3Qgc2VsZWN0ZWRcIiBkYXRhLWlkPVwiJyArIGN1c3RvbV9pdGVtc1tpXS5pZCArICdcIiBkYXRhLWRldGFpbD0nICsgSlNPTi5zdHJpbmdpZnkoY3VzdG9tX2l0ZW1zW2ldLmRldGFpbCkgKyAnPjx0ZCBjbGFzcz1cIml0ZW0tc2VsZWN0XCI+JztcbiAgICAgICAgICAgICAgICAgICAgc3RyICs9ICc8YSBjbGFzcz1cImNoZWNrLWJveFwiPjxpbnB1dCBpZD1cImNhcnRfcHJvZHVjdF8nICsgY3VzdG9tX2l0ZW1zW2ldLmlkICsgJ1wiIHR5cGU9XCJjaGVja2JveFwiPic7XG4gICAgICAgICAgICAgICAgICAgIHN0ciArPSAnPGxhYmVsIGZvcj1cImNhcnRfcHJvZHVjdF8nICsgY3VzdG9tX2l0ZW1zW2ldLmlkICsgJ1wiPjwvbGFiZWw+PC9hPjwvdGQ+PHRkIGNsYXNzPVwiaXRlbS1wcm9kdWN0XCI+JztcbiAgICAgICAgICAgICAgICAgICAgc3RyICs9ICc8ZGl2PjxkaXYgY2xhc3M9XCJpdGVtLXByb2R1Y3QtaW1nXCI+PGEgY2xhc3M9XCJkZW1hbmQtcG9wXCI+JztcbiAgICAgICAgICAgICAgICAgICAgc3RyICs9ICc8aW1nIHNyYz1cIicgKyBJTUdfTElOSyArIGN1c3RvbV9pdGVtc1tpXS5pbWFnZV9rZXkgKyAnP2ltYWdlVmlldzIvMS93LzgwL2gvODAvXCI+PC9hPic7XG4gICAgICAgICAgICAgICAgICAgIHN0ciArPSAnPC9kaXY+PGRpdiBjbGFzcz1cIml0ZW0tcHJvZHVjdC1kZXNjcmliZVwiPjxhIGNsYXNzPVwiZGVtYW5kLXBvcFwiPic7XG4gICAgICAgICAgICAgICAgICAgIHN0ciArPSAnPHAgY2xhc3M9XCJ0aXRsZVwiPicgKyBjdXN0b21faXRlbXNbaV0udGl0bGUgKyAnPC9wPjxwIGNsYXNzPVwiZGVzY3JpYmVcIj4nICsgY3VzdG9tX2l0ZW1zW2ldLmJyaWVmICsgJzwvcD4nO1xuICAgICAgICAgICAgICAgICAgICBzdHIgKz0gJzwvYT48L2Rpdj48L2Rpdj48L3RkPjx0ZCBjbGFzcz1cIml0ZW0tcHJpY2VcIj48ZGl2PuaaguaXoDwvZGl2PjwvdGQ+JztcbiAgICAgICAgICAgICAgICAgICAgc3RyICs9ICc8dGQgY2xhc3M9XCJpdGVtLW51bVwiPjxkaXY+MTwvZGl2PjwvdGQ+PHRkIGNsYXNzPVwiaXRlbS10b3RhbFwiPuaaguaXoDwvdGQ+JztcbiAgICAgICAgICAgICAgICAgICAgc3RyICs9ICc8dGQgY2xhc3M9XCJpdGVtLWRlYWxcIj48YSBjbGFzcz1cImVkaXQtcHJvZHVjdFwiPue8lui+kTwvYT4nO1xuICAgICAgICAgICAgICAgICAgICBzdHIgKz0gJzxhIGNsYXNzPVwiZGVsZXRlLXByb2R1Y3RcIj7liKDpmaQ8L2E+PC90ZD48L3RyPic7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJChcIiNwcm9kdWN0X2l0ZW1cIikuaHRtbChzdHIpO1xuICAgICAgICAgICAgY2FsY3VsYXRlVG90YWxDb3N0KCk7XG4gICAgICAgICAgICBhZGRPcHRpb24uYmluZEV2ZW50KCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICB2YXIgJHRhYmxlID0gJChcIiNwcm9kdWN0X2l0ZW1cIik7XG4gICAgLy/pgInkuK3mn5DkuKrllYblk4FcbiAgICAkdGFibGUuZGVsZWdhdGUoXCIuY2hlY2stYm94XCIsIFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgdmFyIHBhcmVudCA9ICQodGFyZ2V0KS5wYXJlbnQoKS5wYXJlbnQoXCJ0clwiKTtcbiAgICAgICAgaWYgKHBhcmVudC5oYXNDbGFzcyhcInNlbGVjdGVkXCIpKSB7XG4gICAgICAgICAgICBwYXJlbnQucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZFwiKTtcbiAgICAgICAgICAgICQoXCIuYWxsLXNlbGVjdCAuY2hlY2stYm94XCIpLnJlbW92ZUNsYXNzKFwiY2hlY2tlZFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhcmVudC5hZGRDbGFzcyhcInNlbGVjdGVkXCIpO1xuICAgICAgICAgICAgaWYgKCQoXCIjcHJvZHVjdF9pdGVtIC5jaGVjay1ib3hcIikubGVuZ3RoID09ICQoXCIjcHJvZHVjdF9pdGVtIC5zZWxlY3RlZFwiKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAkKFwiLmFsbC1zZWxlY3QgLmNoZWNrLWJveFwiKS5hZGRDbGFzcyhcImNoZWNrZWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2FsY3VsYXRlVG90YWxDb3N0KCk7XG4gICAgfSk7XG4gICAgLy/pgInkuK3lhajpgInmjInpkq5cbiAgICAkKFwiLmFsbC1zZWxlY3QgLmNoZWNrLWJveFwiKS5jbGljayhmdW5jdGlvbihldmVudCkge1xuICAgICAgICB2YXIgJHRhcmVndCA9ICQoZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgaWYgKCR0YXJlZ3QuaGFzQ2xhc3MoXCJjaGVja2VkXCIpKSB7XG4gICAgICAgICAgICAkKFwiLmFsbC1zZWxlY3QgLmNoZWNrLWJveFwiKS5yZW1vdmVDbGFzcyhcImNoZWNrZWRcIik7XG4gICAgICAgICAgICAkKFwiI3Byb2R1Y3RfaXRlbSB0clwiKS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJChcIi5hbGwtc2VsZWN0IC5jaGVjay1ib3hcIikuYWRkQ2xhc3MoXCJjaGVja2VkXCIpO1xuICAgICAgICAgICAgJChcIiNwcm9kdWN0X2l0ZW0gdHJcIikuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKTtcbiAgICAgICAgICAgICQoXCIjcHJvZHVjdF9pdGVtIC5vbi1kZW1hbmRcIikucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZFwiKTtcbiAgICAgICAgfVxuICAgICAgICBjYWxjdWxhdGVUb3RhbENvc3QoKTtcbiAgICB9KTtcbiAgICAvL+WIoOmZpOWVhuWTgVxuICAgICR0YWJsZS5kZWxlZ2F0ZShcIi5kZWxldGUtcHJvZHVjdFwiLCBcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaWQgPSAkKHRoaXMpLnBhcmVudHMoXCJ0clwiKS5hdHRyKFwiZGF0YS1pZFwiKTtcbiAgICAgICAgJChcIiNkZWxldGVfcHJvZHVjdCAucmlnaHRcIikuZGF0YShcImlkc1wiLCBbaWRdKTtcbiAgICAgICAgcG9wVXAuc2hvd1BvcChcIiNkZWxldGVfcHJvZHVjdFwiKTtcbiAgICB9KTtcbiAgICAkKFwiI2RlbGV0ZV9wcm9kdWN0IC5yaWdodFwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGlkcyA9ICQodGhpcykuZGF0YShcImlkc1wiKTtcbiAgICAgICAgdmFyIHVybCA9IFwiL2FwaS92Mi9jYXJ0L2RlbGV0ZT9pZD1cIiArIGlkc1swXTtcbiAgICAgICAgaWYgKGlkcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGlkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHVybCArPSAnJmlkPScgKyBpZHNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgJGh0dHAodXJsKS5kZWxldGUoZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgLy/liKDpmaTpgInkuK3llYblk4FcbiAgICAkKFwiLmRlbGV0ZVNlbGVjdFwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNlbGVjdGVkID0gJHRhYmxlLmNoaWxkcmVuKCcuc2VsZWN0ZWQnKTtcbiAgICAgICAgdmFyIGlkcyA9IFtdO1xuICAgICAgICBpZiAoc2VsZWN0ZWQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWxlY3RlZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWRzLnB1c2goJChzZWxlY3RlZFtpXSkuYXR0cihcImRhdGEtaWRcIikpO1xuICAgICAgICB9XG4gICAgICAgICQoXCIjZGVsZXRlX3Byb2R1Y3QgLnJpZ2h0XCIpLmRhdGEoXCJpZHNcIiwgaWRzKTtcbiAgICAgICAgcG9wVXAuc2hvd1BvcChcIiNkZWxldGVfcHJvZHVjdFwiKTtcbiAgICB9KTtcbiAgICAvL+afpeeci+aMiemcgOWumuWItuWVhuWTgVxuICAgIHNob3dEZW1hbmREZXRhaWwoJHRhYmxlKTtcbiAgICAvL+S/ruaUueaMiemcgOWumuWItuWVhuWTgVxuICAgICR0YWJsZS5kZWxlZ2F0ZShcIi5lZGl0LXByb2R1Y3RcIiwgXCJjbGlja1wiLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICB2YXIgaWQgPSAkKHRoaXMpLnBhcmVudHMoXCJ0clwiKS5hdHRyKFwiZGF0YS1pZFwiKTtcbiAgICAgICAgdmFyIGRldGFpbCA9IEpTT04ucGFyc2UoJCh0aGlzKS5wYXJlbnRzKFwidHJcIikuYXR0cihcImRhdGEtZGV0YWlsXCIpKTtcbiAgICAgICAgaWYgKGRldGFpbC5uYW1lKSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IGRldGFpbDtcblxuICAgICAgICAgICAgT25EZW1hbmRQcm9kdWN0LnNldERhdGEoZGF0YS5uYW1lLCBkYXRhLnF1YW50aXR5LCBkYXRhLnNpemUsIGRhdGEuY2FpemhpLFxuICAgICAgICAgICAgICAgIGRhdGEub3RoZXJzKTtcblxuICAgICAgICAgICAgcG9wVXAuc2hvd1BvcChcIiNlZGl0X2RlbWFuZF9kZXRhaWxcIik7XG4gICAgICAgICAgICAkKFwiI2VkaXRfZGVtYW5kX2RldGFpbCAucmlnaHRcIikuZGF0YShcImlkXCIsIGlkKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgJChcIiNlZGl0X2RlbWFuZF9kZXRhaWwgLnJpZ2h0XCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaWQgPSAkKHRoaXMpLmRhdGEoXCJpZFwiKTtcbiAgICAgICAgdmFyIHVybCA9IFwiL2FwaS92Mi9jYXJ0L2VkaXQtY3VzdG9tP2lkPVwiICsgaWQ7XG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgbmFtZTogJChcIiNvbl9kZW1hbmRfcHJvZHVjdF9uYW1lX2lucHV0XCIpLnZhbCgpLFxuICAgICAgICAgICAgY2F0ZWdvcnk6J+WumuWItuWQjeeJhycsXG4gICAgICAgICAgICBxdWFudGl0eTogJChcIiNvbl9kZW1hbmRfcHJvZHVjdF9xdWFudGl0eV9pbnB1dFwiKS52YWwoKSxcbiAgICAgICAgICAgIHNpemU6ICQoXCIjb25fZGVtYW5kX3Byb2R1Y3Rfc2l6ZV9pbnB1dFwiKS52YWwoKSxcbiAgICAgICAgICAgIGNhaXpoaTogJChcIiNvbl9kZW1hbmRfcHJvZHVjdF9jYWl6aGlfaW5wdXRcIikudmFsKCksXG4gICAgICAgICAgICBvdGhlcnM6ICQoXCIjb25fZGVtYW5kX3Byb2R1Y3Rfb3RoZXJzX2lucHV0XCIpLnZhbCgpLFxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBmb3JtSXRlbTtcbiAgICAgICAgaWYgKE9uRGVtYW5kUHJvZHVjdC52YWxpZGF0ZU5hbWUoZGF0YS5uYW1lKSkge1xuICAgICAgICAgICAgZm9ybUl0ZW0gPSAkKFwiI29uX2RlbWFuZF9wcm9kdWN0X25hbWVfaW5wdXRcIikuY2xvc2VzdChcIi5mb3JtLWl0ZW1cIik7XG4gICAgICAgICAgICBpZiAoIWZvcm1JdGVtLmhhc0NsYXNzKFwiZXJyb3JcIikpIHtcbiAgICAgICAgICAgICAgICBmb3JtSXRlbS5hZGRDbGFzcyhcImVycm9yXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJChcIiNvbl9kZW1hbmRfcHJvZHVjdF9uYW1lX2lucHV0XCIpLmZvY3VzKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKE9uRGVtYW5kUHJvZHVjdC52YWxpZGF0ZVF1YW50aXR5KGRhdGEucXVhbnRpdHkpKSB7XG4gICAgICAgICAgICBmb3JtSXRlbSA9ICQoXCIjb25fZGVtYW5kX3Byb2R1Y3RfcXVhbnRpdHlfaW5wdXRcIikuY2xvc2VzdChcIi5mb3JtLWl0ZW1cIik7XG4gICAgICAgICAgICBpZiAoIWZvcm1JdGVtLmhhc0NsYXNzKFwiZXJyb3JcIikpIHtcbiAgICAgICAgICAgICAgICBmb3JtSXRlbS5hZGRDbGFzcyhcImVycm9yXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJChcIiNvbl9kZW1hbmRfcHJvZHVjdF9xdWFudGl0eV9pbnB1dFwiKS5mb2N1cygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKE9uRGVtYW5kUHJvZHVjdC52YWxpZGF0ZVNpemUoZGF0YS5zaXplKSB8fCBPbkRlbWFuZFByb2R1Y3QudmFsaWRhdGVDYWl6aGkoZGF0YS5jYWl6aGkpIHx8XG4gICAgICAgICAgICBPbkRlbWFuZFByb2R1Y3QudmFsaWRhdGVPdGhlcnMoZGF0YS5vdGhlcnMpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgJGh0dHAodXJsKS5wdXQoZGF0YSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgLy/kv67mlLnmlbDph49cbiAgICAkdGFibGUuZGVsZWdhdGUoXCIudmFsdWVcIiwgXCJjaGFuZ2VcIiwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgY2hhbmdlUHJvZHVjdE51bShldmVudCwgJCh0aGlzKS52YWwoKSk7XG4gICAgfSk7XG4gICAgJHRhYmxlLmRlbGVnYXRlKFwiLnBsdXNcIiwgXCJjbGlja1wiLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBjaGFuZ2VQcm9kdWN0TnVtKGV2ZW50LCAkKHRoaXMpLnByZXYoKS52YWwoKSk7XG4gICAgfSk7XG4gICAgJHRhYmxlLmRlbGVnYXRlKFwiLm1pbnVzXCIsIFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgY2hhbmdlUHJvZHVjdE51bShldmVudCwgJCh0aGlzKS5uZXh0KCkudmFsKCkpO1xuICAgIH0pO1xuICAgIC8v5Y6757uT566XXG4gICAgJChcIiNnb190b19jb25maXJtXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc2VsZWN0ZWQgPSAkdGFibGUuZmluZChcIi5zZWxlY3RlZFwiKTtcbiAgICAgICAgdmFyIGp1bXBMaW5rID0gXCIvY2FydC9jb25maXJtP2lkPVwiO1xuICAgICAgICB2YXIgbGVuZ3RoID0gc2VsZWN0ZWQubGVuZ3RoO1xuICAgICAgICBpZiAobGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIGFsZXJ0KFwi6K+36YCJ5oup5ZWG5ZOB77yBXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGp1bXBMaW5rICs9ICQoc2VsZWN0ZWRbaV0pLmF0dHIoXCJkYXRhLWlkXCIpO1xuICAgICAgICAgICAgICAgIGlmIChpICE9IGxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAganVtcExpbmsgKz0gXCImaWQ9XCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9IGp1bXBMaW5rO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvL+S/ruaUueWVhuWTgeaVsOmHj1xuICAgIGZ1bmN0aW9uIGNoYW5nZVByb2R1Y3ROdW0oZXZlbnQsIHZhbCkge1xuICAgICAgICB2YXIgJHRyID0gJChldmVudC50YXJnZXQpLnBhcmVudHMoXCJ0clwiKTtcbiAgICAgICAgdmFyIGlkID0gJHRyLmF0dHIoXCJkYXRhLWlkXCIpO1xuICAgICAgICB2YXIgdXJsID0gXCIvYXBpL3YyL2NhcnQvdXBkYXRlLXF1YW50aXR5P2lkPVwiICsgaWQgKyBcIiZxdWFudGl0eT1cIiArIHZhbDtcbiAgICAgICAgJGh0dHAodXJsKS5wdXQoe30sIGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgdmFyIHByaWNlID0gJHRyLmZpbmQoXCIuaXRlbS1wcmljZVwiKS5hdHRyKFwiZGF0YS1wcmljZVwiKTtcbiAgICAgICAgICAgIHZhciBzdW0gPSBwcmljZSAqIHZhbDtcbiAgICAgICAgICAgIHZhciB0b3RhbCA9IHByb2Nlc3NEYXRhLnByb2Nlc3NQcmljZShzdW0pO1xuICAgICAgICAgICAgJHRyLmZpbmQoXCIuaXRlbS10b3RhbFwiKS50ZXh0KHRvdGFsKTtcbiAgICAgICAgICAgIGNhbGN1bGF0ZVRvdGFsQ29zdCgpXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8v6K6h566X6YCJ5Lit5ZWG5ZOB55qE5oC75Lu36ZKxXG4gICAgZnVuY3Rpb24gY2FsY3VsYXRlVG90YWxDb3N0KCkge1xuICAgICAgICB2YXIgJHByaWNlZCA9ICR0YWJsZS5maW5kKFwiLnByaWNlZC1wcm9kdWN0XCIpO1xuICAgICAgICB2YXIgdG90YWxQcmljZSA9IDA7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgJHByaWNlZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKCQoJHByaWNlZFtpXSkuaGFzQ2xhc3MoXCJzZWxlY3RlZFwiKSkge1xuICAgICAgICAgICAgICAgIHRvdGFsUHJpY2UgKz0gcHJvY2Vzc0RhdGEucHJvY2Vzc1JlYWxQcm9jZSgkKCRwcmljZWRbaV0pLmZpbmQoXCIuaXRlbS10b3RhbFwiKS50ZXh0KCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRvdGFsUHJpY2UgPSBwcm9jZXNzRGF0YS5wcm9jZXNzUHJpY2UodG90YWxQcmljZSk7XG4gICAgICAgIGlmICgkdGFibGUuZmluZChcIi5kZW1hbmQtcHJvZHVjdFwiKS5oYXNDbGFzcyhcInNlbGVjdGVkXCIpKSB7XG4gICAgICAgICAgICBpZiAodG90YWxQcmljZSA9PT0gXCIwLjAwXCIpIHtcbiAgICAgICAgICAgICAgICB0b3RhbFByaWNlID0gXCIg77yfXCI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRvdGFsUHJpY2UgKz0gXCIgKyDvvJ9cIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAkKFwiI3RvdGFsX3ByaWNlXCIpLnRleHQoXCLvv6VcIiArIHRvdGFsUHJpY2UpO1xuICAgIH1cbn0pKClcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvY2FydC5qc1xuICoqIG1vZHVsZSBpZCA9IDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=