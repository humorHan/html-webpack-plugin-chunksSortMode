webpackJsonp([0,19],[
/* 0 */
/***/ function(module, exports) {

	var clickToSelectHintText = "点击选购该商品";
	var clickToUnselectHintText = "点击取消选择";
	var unableToSelectHintText = "已选满3个商品，如想要继续选购此商品，请先取消其他商品";
	
	var selectBtnObject = $(".optional-product div.btn");
	var selectStatus = [false, false, false, false, false, false];
	var selectStatusTextObject = $(".act-combo-table .act-combo-table-cell-status-unchecked");
	var originCostObject = $(".original-cost");
	var cartObject = $(".act-combo .add-cart-btn");
	var optionalProductPrices = [144, 144, 150, 124, 140, 150];
	var optionalProductName = ["海报12张", "名片8盒", "不干胶1000张", "横幅2条", "单页1000张", "胸牌30个"];
	var selectedProductCount = 0;
	var originalCost = 952;
	var comboProductCustomName = "可选商品";
	
	var comboProductPriceId = 3493;
	
	function addToCart() {
		var values = [];
		for (var i = 0; i < 6; i++) {
			if (selectStatus[i]) {
				values.push(optionalProductName[i]);
			}
		}
		var fields = [{name: comboProductCustomName, values: values}];
	
		var url = "/api/v2/cart/add";
	    var data = {
	        price_id: comboProductPriceId,
	        quantity: 1,
	        fields: fields,
	    };
	    $http(url).post(data, function(result) {
	        popUp.showPop("#add_cart");
	        /* 商品成功加入购物车后，右上角购物车数据刷新 */
	        $("#add_cart .no-stay").click(function() {
	            getShowCartBtn();
	        });
	        $("#add_cart .close").click(function() {
	            getShowCartBtn();
	        });
	    });
	}
	
	! function() {
		$(".act-998 .optional-product").delegate("div.btn", "click", function(e) {
			var index = selectBtnObject.index($(this));
			if (selectStatus[index]) {
				// 六选三中选购按钮
				$(this).removeClass("checked").addClass("unchecked");
				$(this).attr("title", clickToSelectHintText);
				if (selectedProductCount === 3) {
					for (var i = 0; i < 6; i++) {
						if (i !== index && selectStatus[i] === false) {
							$(selectBtnObject[i]).attr("title", clickToSelectHintText);
							$(selectBtnObject[i]).css("cursor", "pointer");
						}
					}
				}
	
				// 表格中选购情况文字
				selectStatusTextObject[index].innerHTML = "未选";
				$(selectStatusTextObject[index]).removeClass("act-combo-table-cell-status-checked").addClass("act-combo-table-cell-status-unchecked");
	
				// 原价
				originalCost = originalCost - optionalProductPrices[index];
				originCostObject[0].innerHTML = "原价：￥" + originalCost;
	
				// 购物车按钮
				if (selectedProductCount === 3) {
					cartObject.removeClass("enabled").addClass("disabled");
				}
	
				selectedProductCount--;
				selectStatus[index] = false;
		
			} else if (selectedProductCount < 3) {
				// 六选三中选购按钮
				$(this).removeClass("unchecked").addClass("checked");
				$(this).attr("title", clickToUnselectHintText);
				if (selectedProductCount === 2) {
					for (var i = 0; i < 6; i++) {
						if (i !== index && selectStatus[i] === false) {
							$(selectBtnObject[i]).attr("title", unableToSelectHintText);
							$(selectBtnObject[i]).css("cursor", "not-allowed");
						}
					}
				}
	
				// 表格中选购情况文字
				selectStatusTextObject[index].innerHTML = "已选";
				$(selectStatusTextObject[index]).removeClass("act-combo-table-cell-status-unchecked").addClass("act-combo-table-cell-status-checked");
	
				// 原价
				originalCost = originalCost + optionalProductPrices[index];
				originCostObject[0].innerHTML = "原价：￥" + originalCost;
	
				// 购物车按钮
				if (selectedProductCount === 2) {
					cartObject.removeClass("disabled").addClass("enabled");
				}
	
				selectedProductCount++;
				selectStatus[index] = true;
			}
		});
		$(".act-998 .act-combo").delegate("div.add-cart-btn", "click", function(e) {
			if (cartObject.hasClass("enabled")) {
				var truthId = $.cookie("truthid");
		        var userId = $.cookie("userid");
		        if (!truthId || !userId) {
		            login.showPop(function() {
		                addToCart();
		            });
		        } else {
		            addToCart();
		        }
			}
		});
	}();

/***/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYWN0aXZpdGllcy85OTguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWdCLE9BQU87QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0IsNkNBQTZDOztBQUU3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBbUIsT0FBTztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFtQixPQUFPO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWM7QUFDZCxXQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGLEVBQUMsRyIsImZpbGUiOiJqcy85OTguanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgY2xpY2tUb1NlbGVjdEhpbnRUZXh0ID0gXCLngrnlh7vpgInotK3or6XllYblk4FcIjtcbnZhciBjbGlja1RvVW5zZWxlY3RIaW50VGV4dCA9IFwi54K55Ye75Y+W5raI6YCJ5oupXCI7XG52YXIgdW5hYmxlVG9TZWxlY3RIaW50VGV4dCA9IFwi5bey6YCJ5ruhM+S4quWVhuWTge+8jOWmguaDs+imgee7p+e7remAiei0reatpOWVhuWTge+8jOivt+WFiOWPlua2iOWFtuS7luWVhuWTgVwiO1xuXG52YXIgc2VsZWN0QnRuT2JqZWN0ID0gJChcIi5vcHRpb25hbC1wcm9kdWN0IGRpdi5idG5cIik7XG52YXIgc2VsZWN0U3RhdHVzID0gW2ZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2VdO1xudmFyIHNlbGVjdFN0YXR1c1RleHRPYmplY3QgPSAkKFwiLmFjdC1jb21iby10YWJsZSAuYWN0LWNvbWJvLXRhYmxlLWNlbGwtc3RhdHVzLXVuY2hlY2tlZFwiKTtcbnZhciBvcmlnaW5Db3N0T2JqZWN0ID0gJChcIi5vcmlnaW5hbC1jb3N0XCIpO1xudmFyIGNhcnRPYmplY3QgPSAkKFwiLmFjdC1jb21ibyAuYWRkLWNhcnQtYnRuXCIpO1xudmFyIG9wdGlvbmFsUHJvZHVjdFByaWNlcyA9IFsxNDQsIDE0NCwgMTUwLCAxMjQsIDE0MCwgMTUwXTtcbnZhciBvcHRpb25hbFByb2R1Y3ROYW1lID0gW1wi5rW35oqlMTLlvKBcIiwgXCLlkI3niYc455uSXCIsIFwi5LiN5bmy6IO2MTAwMOW8oFwiLCBcIuaoquW5hTLmnaFcIiwgXCLljZXpobUxMDAw5bygXCIsIFwi6IO454mMMzDkuKpcIl07XG52YXIgc2VsZWN0ZWRQcm9kdWN0Q291bnQgPSAwO1xudmFyIG9yaWdpbmFsQ29zdCA9IDk1MjtcbnZhciBjb21ib1Byb2R1Y3RDdXN0b21OYW1lID0gXCLlj6/pgInllYblk4FcIjtcblxudmFyIGNvbWJvUHJvZHVjdFByaWNlSWQgPSAzNDkzO1xuXG5mdW5jdGlvbiBhZGRUb0NhcnQoKSB7XG5cdHZhciB2YWx1ZXMgPSBbXTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCA2OyBpKyspIHtcblx0XHRpZiAoc2VsZWN0U3RhdHVzW2ldKSB7XG5cdFx0XHR2YWx1ZXMucHVzaChvcHRpb25hbFByb2R1Y3ROYW1lW2ldKTtcblx0XHR9XG5cdH1cblx0dmFyIGZpZWxkcyA9IFt7bmFtZTogY29tYm9Qcm9kdWN0Q3VzdG9tTmFtZSwgdmFsdWVzOiB2YWx1ZXN9XTtcblxuXHR2YXIgdXJsID0gXCIvYXBpL3YyL2NhcnQvYWRkXCI7XG4gICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHByaWNlX2lkOiBjb21ib1Byb2R1Y3RQcmljZUlkLFxuICAgICAgICBxdWFudGl0eTogMSxcbiAgICAgICAgZmllbGRzOiBmaWVsZHMsXG4gICAgfTtcbiAgICAkaHR0cCh1cmwpLnBvc3QoZGF0YSwgZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgIHBvcFVwLnNob3dQb3AoXCIjYWRkX2NhcnRcIik7XG4gICAgICAgIC8qIOWVhuWTgeaIkOWKn+WKoOWFpei0reeJqei9puWQju+8jOWPs+S4iuinkui0reeJqei9puaVsOaNruWIt+aWsCAqL1xuICAgICAgICAkKFwiI2FkZF9jYXJ0IC5uby1zdGF5XCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZ2V0U2hvd0NhcnRCdG4oKTtcbiAgICAgICAgfSk7XG4gICAgICAgICQoXCIjYWRkX2NhcnQgLmNsb3NlXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZ2V0U2hvd0NhcnRCdG4oKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5cbiEgZnVuY3Rpb24oKSB7XG5cdCQoXCIuYWN0LTk5OCAub3B0aW9uYWwtcHJvZHVjdFwiKS5kZWxlZ2F0ZShcImRpdi5idG5cIiwgXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG5cdFx0dmFyIGluZGV4ID0gc2VsZWN0QnRuT2JqZWN0LmluZGV4KCQodGhpcykpO1xuXHRcdGlmIChzZWxlY3RTdGF0dXNbaW5kZXhdKSB7XG5cdFx0XHQvLyDlha3pgInkuInkuK3pgInotK3mjInpkq5cblx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MoXCJjaGVja2VkXCIpLmFkZENsYXNzKFwidW5jaGVja2VkXCIpO1xuXHRcdFx0JCh0aGlzKS5hdHRyKFwidGl0bGVcIiwgY2xpY2tUb1NlbGVjdEhpbnRUZXh0KTtcblx0XHRcdGlmIChzZWxlY3RlZFByb2R1Y3RDb3VudCA9PT0gMykge1xuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IDY7IGkrKykge1xuXHRcdFx0XHRcdGlmIChpICE9PSBpbmRleCAmJiBzZWxlY3RTdGF0dXNbaV0gPT09IGZhbHNlKSB7XG5cdFx0XHRcdFx0XHQkKHNlbGVjdEJ0bk9iamVjdFtpXSkuYXR0cihcInRpdGxlXCIsIGNsaWNrVG9TZWxlY3RIaW50VGV4dCk7XG5cdFx0XHRcdFx0XHQkKHNlbGVjdEJ0bk9iamVjdFtpXSkuY3NzKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8g6KGo5qC85Lit6YCJ6LSt5oOF5Ya15paH5a2XXG5cdFx0XHRzZWxlY3RTdGF0dXNUZXh0T2JqZWN0W2luZGV4XS5pbm5lckhUTUwgPSBcIuacqumAiVwiO1xuXHRcdFx0JChzZWxlY3RTdGF0dXNUZXh0T2JqZWN0W2luZGV4XSkucmVtb3ZlQ2xhc3MoXCJhY3QtY29tYm8tdGFibGUtY2VsbC1zdGF0dXMtY2hlY2tlZFwiKS5hZGRDbGFzcyhcImFjdC1jb21iby10YWJsZS1jZWxsLXN0YXR1cy11bmNoZWNrZWRcIik7XG5cblx0XHRcdC8vIOWOn+S7t1xuXHRcdFx0b3JpZ2luYWxDb3N0ID0gb3JpZ2luYWxDb3N0IC0gb3B0aW9uYWxQcm9kdWN0UHJpY2VzW2luZGV4XTtcblx0XHRcdG9yaWdpbkNvc3RPYmplY3RbMF0uaW5uZXJIVE1MID0gXCLljp/ku7fvvJrvv6VcIiArIG9yaWdpbmFsQ29zdDtcblxuXHRcdFx0Ly8g6LSt54mp6L2m5oyJ6ZKuXG5cdFx0XHRpZiAoc2VsZWN0ZWRQcm9kdWN0Q291bnQgPT09IDMpIHtcblx0XHRcdFx0Y2FydE9iamVjdC5yZW1vdmVDbGFzcyhcImVuYWJsZWRcIikuYWRkQ2xhc3MoXCJkaXNhYmxlZFwiKTtcblx0XHRcdH1cblxuXHRcdFx0c2VsZWN0ZWRQcm9kdWN0Q291bnQtLTtcblx0XHRcdHNlbGVjdFN0YXR1c1tpbmRleF0gPSBmYWxzZTtcblx0XG5cdFx0fSBlbHNlIGlmIChzZWxlY3RlZFByb2R1Y3RDb3VudCA8IDMpIHtcblx0XHRcdC8vIOWFremAieS4ieS4remAiei0reaMiemSrlxuXHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcyhcInVuY2hlY2tlZFwiKS5hZGRDbGFzcyhcImNoZWNrZWRcIik7XG5cdFx0XHQkKHRoaXMpLmF0dHIoXCJ0aXRsZVwiLCBjbGlja1RvVW5zZWxlY3RIaW50VGV4dCk7XG5cdFx0XHRpZiAoc2VsZWN0ZWRQcm9kdWN0Q291bnQgPT09IDIpIHtcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCA2OyBpKyspIHtcblx0XHRcdFx0XHRpZiAoaSAhPT0gaW5kZXggJiYgc2VsZWN0U3RhdHVzW2ldID09PSBmYWxzZSkge1xuXHRcdFx0XHRcdFx0JChzZWxlY3RCdG5PYmplY3RbaV0pLmF0dHIoXCJ0aXRsZVwiLCB1bmFibGVUb1NlbGVjdEhpbnRUZXh0KTtcblx0XHRcdFx0XHRcdCQoc2VsZWN0QnRuT2JqZWN0W2ldKS5jc3MoXCJjdXJzb3JcIiwgXCJub3QtYWxsb3dlZFwiKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8g6KGo5qC85Lit6YCJ6LSt5oOF5Ya15paH5a2XXG5cdFx0XHRzZWxlY3RTdGF0dXNUZXh0T2JqZWN0W2luZGV4XS5pbm5lckhUTUwgPSBcIuW3sumAiVwiO1xuXHRcdFx0JChzZWxlY3RTdGF0dXNUZXh0T2JqZWN0W2luZGV4XSkucmVtb3ZlQ2xhc3MoXCJhY3QtY29tYm8tdGFibGUtY2VsbC1zdGF0dXMtdW5jaGVja2VkXCIpLmFkZENsYXNzKFwiYWN0LWNvbWJvLXRhYmxlLWNlbGwtc3RhdHVzLWNoZWNrZWRcIik7XG5cblx0XHRcdC8vIOWOn+S7t1xuXHRcdFx0b3JpZ2luYWxDb3N0ID0gb3JpZ2luYWxDb3N0ICsgb3B0aW9uYWxQcm9kdWN0UHJpY2VzW2luZGV4XTtcblx0XHRcdG9yaWdpbkNvc3RPYmplY3RbMF0uaW5uZXJIVE1MID0gXCLljp/ku7fvvJrvv6VcIiArIG9yaWdpbmFsQ29zdDtcblxuXHRcdFx0Ly8g6LSt54mp6L2m5oyJ6ZKuXG5cdFx0XHRpZiAoc2VsZWN0ZWRQcm9kdWN0Q291bnQgPT09IDIpIHtcblx0XHRcdFx0Y2FydE9iamVjdC5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpLmFkZENsYXNzKFwiZW5hYmxlZFwiKTtcblx0XHRcdH1cblxuXHRcdFx0c2VsZWN0ZWRQcm9kdWN0Q291bnQrKztcblx0XHRcdHNlbGVjdFN0YXR1c1tpbmRleF0gPSB0cnVlO1xuXHRcdH1cblx0fSk7XG5cdCQoXCIuYWN0LTk5OCAuYWN0LWNvbWJvXCIpLmRlbGVnYXRlKFwiZGl2LmFkZC1jYXJ0LWJ0blwiLCBcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcblx0XHRpZiAoY2FydE9iamVjdC5oYXNDbGFzcyhcImVuYWJsZWRcIikpIHtcblx0XHRcdHZhciB0cnV0aElkID0gJC5jb29raWUoXCJ0cnV0aGlkXCIpO1xuXHQgICAgICAgIHZhciB1c2VySWQgPSAkLmNvb2tpZShcInVzZXJpZFwiKTtcblx0ICAgICAgICBpZiAoIXRydXRoSWQgfHwgIXVzZXJJZCkge1xuXHQgICAgICAgICAgICBsb2dpbi5zaG93UG9wKGZ1bmN0aW9uKCkge1xuXHQgICAgICAgICAgICAgICAgYWRkVG9DYXJ0KCk7XG5cdCAgICAgICAgICAgIH0pO1xuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIGFkZFRvQ2FydCgpO1xuXHQgICAgICAgIH1cblx0XHR9XG5cdH0pO1xufSgpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvYWN0aXZpdGllcy85OTguanNcbiAqKiBtb2R1bGUgaWQgPSAwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9