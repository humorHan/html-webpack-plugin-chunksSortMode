webpackJsonp([15,19],[
/* 0 */
/***/ function(module, exports) {

	(function() {
	    var order_id = getLinkParam('order_id');
	    if (location.pathname.indexOf('success') > 0) {
	        $("#see_order").attr("href", "/order?id=" + order_id);
	        $("#pay_success_id").text(order_id);
	        var i = 5;
	        var time = setInterval(function() {
	            i--;
	            if (i == 1) {
	                clearInterval(time)
	                location.href = "/order?id=" + order_id;
	            }
	            $("#count").text(i);
	        }, 1000)
	    } else {
	        getPayStatus();
	    }
	    $("#change_pay_method .pay-method").click(function(event) {
	        var $target = $(event.target);
	        $("#change_pay_method .pay-method").removeClass("selected");
	        $target.addClass("selected");
	    });
	    $("#online_pay").click(function() {
	        $selected = $("#change_pay_method").find(".selected");
	        var type = $selected.attr("id");
	        var data = {
	            order_id: parseInt(order_id),
	            payment: type
	        };
	        $http('/api/v2/orders/create-pingxx-charge').post(data, function(result) {
	            if (result.charge && result.charge != null) {
	                if (type === "ALIPAY_PC") {
	                    pingppPc.createPayment(result.charge, function(result, error) {
	                        if (result == "success") {
	                            // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。
	                        } else if (result == "fail") {
	                            // charge 不正确或者微信公众账号支付失败时会在此处返回
	                            location.reload();
	                        } else if (result == "cancel") {
	                            location.href = "/order?id=" + order_id;
	                        }
	                    });
	                } else {
	                    var charge = JSON.parse(result.charge);
	                    var qr_url = '';
	                    if (type === "WECHAT_QR") {
	                        qr_url = charge.credential.wx_pub_qr
	                        $("#qr_pay_method").text("微信");
	                    } else {
	                        qr_url = charge.credential.alipay_qr
	                        $("#qr_pay_method").text("支付宝");
	                    }
	                    $("#qr_pay_money").text($("#pay_money").text());
	                    $("#qrcode_pay").html('').qrcode({
	                        width: 280,
	                        height: 280,
	                        text: qr_url
	                    });
	                    $(".modal").width(360);
	                    popUp.showPop();
	                    var polling = setInterval(function() {
	                        getPayStatus(polling);
	                    }, 1000);
	                    $(".close").click(function() {
	                        clearInterval(polling);
	                    });
	                    $(".modal-layer").click(function() {
	                        clearInterval(polling);
	                    });
	                }
	            }
	        })
	    });
	
	    function getPayStatus(polling) {
	        var url = '/api/v2/orders/payment-detail?id=' + order_id;
	        $http(url).get(function(result) {
	            if (polling) {
	                if (result.status === 'PAID') {
	                    clearInterval(polling);
	                    location.href = '/pay/success?order_id=' + result.id;
	                }
	            } else {
	                if (result.status === "WAITING_PAYMENT") {
	                    $("#pay_order_id").text(result.id);
	                    $("#pay_money").text(processData.processPrice(result.total));
	                    $("#pay_order_time").text(new Date(result.create_time).dateFormat());
	                    $("#pay_order_detail").attr("href","/order?id=" + result.id);
	                } else {
	                    location.href = '/order?id=' + result.id;
	                }
	            }
	        })
	    }
	})()


/***/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvcGF5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVCxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQXlCO0FBQ3pCO0FBQ0E7QUFDQSwwQkFBeUI7QUFDekI7QUFDQTtBQUNBLHNCQUFxQjtBQUNyQixrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxzQkFBcUI7QUFDckI7QUFDQTtBQUNBLHNCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsVUFBUztBQUNULE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBLEVBQUMiLCJmaWxlIjoianMvcGF5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCkge1xuICAgIHZhciBvcmRlcl9pZCA9IGdldExpbmtQYXJhbSgnb3JkZXJfaWQnKTtcbiAgICBpZiAobG9jYXRpb24ucGF0aG5hbWUuaW5kZXhPZignc3VjY2VzcycpID4gMCkge1xuICAgICAgICAkKFwiI3NlZV9vcmRlclwiKS5hdHRyKFwiaHJlZlwiLCBcIi9vcmRlcj9pZD1cIiArIG9yZGVyX2lkKTtcbiAgICAgICAgJChcIiNwYXlfc3VjY2Vzc19pZFwiKS50ZXh0KG9yZGVyX2lkKTtcbiAgICAgICAgdmFyIGkgPSA1O1xuICAgICAgICB2YXIgdGltZSA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaS0tO1xuICAgICAgICAgICAgaWYgKGkgPT0gMSkge1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZSlcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gXCIvb3JkZXI/aWQ9XCIgKyBvcmRlcl9pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICQoXCIjY291bnRcIikudGV4dChpKTtcbiAgICAgICAgfSwgMTAwMClcbiAgICB9IGVsc2Uge1xuICAgICAgICBnZXRQYXlTdGF0dXMoKTtcbiAgICB9XG4gICAgJChcIiNjaGFuZ2VfcGF5X21ldGhvZCAucGF5LW1ldGhvZFwiKS5jbGljayhmdW5jdGlvbihldmVudCkge1xuICAgICAgICB2YXIgJHRhcmdldCA9ICQoZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgJChcIiNjaGFuZ2VfcGF5X21ldGhvZCAucGF5LW1ldGhvZFwiKS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkXCIpO1xuICAgICAgICAkdGFyZ2V0LmFkZENsYXNzKFwic2VsZWN0ZWRcIik7XG4gICAgfSk7XG4gICAgJChcIiNvbmxpbmVfcGF5XCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAkc2VsZWN0ZWQgPSAkKFwiI2NoYW5nZV9wYXlfbWV0aG9kXCIpLmZpbmQoXCIuc2VsZWN0ZWRcIik7XG4gICAgICAgIHZhciB0eXBlID0gJHNlbGVjdGVkLmF0dHIoXCJpZFwiKTtcbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICBvcmRlcl9pZDogcGFyc2VJbnQob3JkZXJfaWQpLFxuICAgICAgICAgICAgcGF5bWVudDogdHlwZVxuICAgICAgICB9O1xuICAgICAgICAkaHR0cCgnL2FwaS92Mi9vcmRlcnMvY3JlYXRlLXBpbmd4eC1jaGFyZ2UnKS5wb3N0KGRhdGEsIGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKHJlc3VsdC5jaGFyZ2UgJiYgcmVzdWx0LmNoYXJnZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IFwiQUxJUEFZX1BDXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgcGluZ3BwUGMuY3JlYXRlUGF5bWVudChyZXN1bHQuY2hhcmdlLCBmdW5jdGlvbihyZXN1bHQsIGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ID09IFwic3VjY2Vzc1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5Y+q5pyJ5b6u5L+h5YWs5LyX6LSm5Y+3IHd4X3B1YiDmlK/ku5jmiJDlip/nmoTnu5PmnpzkvJrlnKjov5nph4zov5Tlm57vvIzlhbbku5bnmoTmlK/ku5jnu5Pmnpzpg73kvJrot7PovazliLAgZXh0cmEg5Lit5a+55bqU55qEIFVSTOOAglxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQgPT0gXCJmYWlsXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjaGFyZ2Ug5LiN5q2j56Gu5oiW6ICF5b6u5L+h5YWs5LyX6LSm5Y+35pSv5LuY5aSx6LSl5pe25Lya5Zyo5q2k5aSE6L+U5ZueXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdCA9PSBcImNhbmNlbFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9IFwiL29yZGVyP2lkPVwiICsgb3JkZXJfaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjaGFyZ2UgPSBKU09OLnBhcnNlKHJlc3VsdC5jaGFyZ2UpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcXJfdXJsID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcIldFQ0hBVF9RUlwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBxcl91cmwgPSBjaGFyZ2UuY3JlZGVudGlhbC53eF9wdWJfcXJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjcXJfcGF5X21ldGhvZFwiKS50ZXh0KFwi5b6u5L+hXCIpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcXJfdXJsID0gY2hhcmdlLmNyZWRlbnRpYWwuYWxpcGF5X3FyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiI3FyX3BheV9tZXRob2RcIikudGV4dChcIuaUr+S7mOWunVwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAkKFwiI3FyX3BheV9tb25leVwiKS50ZXh0KCQoXCIjcGF5X21vbmV5XCIpLnRleHQoKSk7XG4gICAgICAgICAgICAgICAgICAgICQoXCIjcXJjb2RlX3BheVwiKS5odG1sKCcnKS5xcmNvZGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDI4MCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogMjgwLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogcXJfdXJsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAkKFwiLm1vZGFsXCIpLndpZHRoKDM2MCk7XG4gICAgICAgICAgICAgICAgICAgIHBvcFVwLnNob3dQb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBvbGxpbmcgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldFBheVN0YXR1cyhwb2xsaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgICAgICQoXCIuY2xvc2VcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHBvbGxpbmcpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgJChcIi5tb2RhbC1sYXllclwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwocG9sbGluZyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGdldFBheVN0YXR1cyhwb2xsaW5nKSB7XG4gICAgICAgIHZhciB1cmwgPSAnL2FwaS92Mi9vcmRlcnMvcGF5bWVudC1kZXRhaWw/aWQ9JyArIG9yZGVyX2lkO1xuICAgICAgICAkaHR0cCh1cmwpLmdldChmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChwb2xsaW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5zdGF0dXMgPT09ICdQQUlEJykge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHBvbGxpbmcpO1xuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gJy9wYXkvc3VjY2Vzcz9vcmRlcl9pZD0nICsgcmVzdWx0LmlkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5zdGF0dXMgPT09IFwiV0FJVElOR19QQVlNRU5UXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgJChcIiNwYXlfb3JkZXJfaWRcIikudGV4dChyZXN1bHQuaWQpO1xuICAgICAgICAgICAgICAgICAgICAkKFwiI3BheV9tb25leVwiKS50ZXh0KHByb2Nlc3NEYXRhLnByb2Nlc3NQcmljZShyZXN1bHQudG90YWwpKTtcbiAgICAgICAgICAgICAgICAgICAgJChcIiNwYXlfb3JkZXJfdGltZVwiKS50ZXh0KG5ldyBEYXRlKHJlc3VsdC5jcmVhdGVfdGltZSkuZGF0ZUZvcm1hdCgpKTtcbiAgICAgICAgICAgICAgICAgICAgJChcIiNwYXlfb3JkZXJfZGV0YWlsXCIpLmF0dHIoXCJocmVmXCIsXCIvb3JkZXI/aWQ9XCIgKyByZXN1bHQuaWQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSAnL29yZGVyP2lkPScgKyByZXN1bHQuaWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cbn0pKClcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvcGF5LmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSAxNVxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=