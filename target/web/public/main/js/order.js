webpackJsonp([14,19],[
/* 0 */
/***/ function(module, exports) {

	! function() {
	    var order_id = getLinkParam("id");
	    var container = $("#order_container");
	    var status_t = {
	        SUBMITTED: '订单已提交',
	        DELIVERY_CONFIRMED: '商家已接单',
	        DELIVERY_PAID: '付款成功',
	        ONLINE_PAID: '付款成功',
	        ONLINE_CONFIRMED: '商家已接单',
	        FINISHED: '订单已完成',
	        CANCELED: '订单已取消',
	
	    };
	    var payment_t = {
	        ONLINE: '在线支付',
	        CASH_ON_DELIVERY: '货到付款',
	    };
	    $http('/api/v2/orders/detail?id=' + order_id).get(function(result) {
	        result.status_t = status_t[result.status];
	        result.payment_t = payment_t[result.payment];
	        result.img_link = IMG_LINK;
	        result.process = '';
	        result.amount_t = processData.processPrice(result.amount) + (result.is_priced ? '' : ' + ？');
	        result.freight_t = result.amount >= 20000 ? '0.00' : (result.is_priced ? processData.processPrice(result.freight) : '？');
	        result.total = calculateTotal(result.amount, result.freight, result.is_priced);
	        var length = result.histories.length;
	        var history = {};
	        for (var i = 0; i < length; i++) {
	            result.process += '<span class="circle finished-circle">' + (i + 1) + '</span>';
	            result.process += '<span class="status finished-status"><span class="operate-time">';
	            result.process += new Date(result.histories[i].create_time).dateFormat() + '</span>';
	            result.process += status_t[result.histories[i].status] + '</span>';
	            if (result.histories[i].status !== 'FINISHED' && result.histories[i].status !== "CANCELED") {
	                result.process += '<span class="arrow finished-arrow"></span>';
	                history[result.histories[i].status] = i + 1;
	            }
	        }
	        if (result.histories[length - 1].status !== "FINISHED" && result.histories[length - 1].status !== 'CANCELED') {
	            if (result.payment === "ONLINE") {
	                var step = [
	                    { status: 'SUBMITTED' },
	                    { status: 'ONLINE_PAID' },
	                    { status: 'ONLINE_CONFIRMED' },
	                    { status: 'FINISHED' },
	                ];
	            } else {
	                var step = [
	                    { status: 'SUBMITTED' },
	                    { status: 'DELIVERY_CONFIRMED' },
	                    { status: 'DELIVERY_PAID' },
	                    { status: 'FINISHED' },
	                ];
	            }
	            for (var i = length; i < step.length; i++) {
	                result.process += '<span class="circle">' + (i + 1) + '</span>';
	                result.process += '<span class="status"><span class="operate-time"></span>' + status_t[step[i].status] + '</span>';
	                if (i !== step.length - 1) {
	                    result.process += '<span class="arrow"></span>';
	                }
	            }
	        }
	        $("#template").tmpl(result).appendTo('#order_container');
	    })
	    container.delegate(".add-file", "change", function(event) {
	        uploadComp.uploadFile(event);
	    });
	    container.delegate(".delete-file", "click", function(event) {
	        uploadComp.deleteFile(event);
	    });
	    //取消订单
	    container.delegate("#cancel_order", "click", function() {
	        popUp.showPop("#cancel_order_modal");
	    });
	    $("#cancel_order_modal .right").click(function() {
	        var url = "/api/v2/orders/cancel?id=" + order_id;
	        $http(url).delete(function() {
	            location.reload();
	        });
	    });
	
	    //查看按需定制详情
	    showDemandDetail(container);
	}();


/***/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvb3JkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXVCLFlBQVk7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCLHNCQUFzQjtBQUMzQyxzQkFBcUIsd0JBQXdCO0FBQzdDLHNCQUFxQiw2QkFBNkI7QUFDbEQsc0JBQXFCLHFCQUFxQjtBQUMxQztBQUNBLGNBQWE7QUFDYjtBQUNBLHNCQUFxQixzQkFBc0I7QUFDM0Msc0JBQXFCLCtCQUErQjtBQUNwRCxzQkFBcUIsMEJBQTBCO0FBQy9DLHNCQUFxQixxQkFBcUI7QUFDMUM7QUFDQTtBQUNBLGlDQUFnQyxpQkFBaUI7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNULE1BQUs7O0FBRUw7QUFDQTtBQUNBLEVBQUMiLCJmaWxlIjoianMvb3JkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIhIGZ1bmN0aW9uKCkge1xuICAgIHZhciBvcmRlcl9pZCA9IGdldExpbmtQYXJhbShcImlkXCIpO1xuICAgIHZhciBjb250YWluZXIgPSAkKFwiI29yZGVyX2NvbnRhaW5lclwiKTtcbiAgICB2YXIgc3RhdHVzX3QgPSB7XG4gICAgICAgIFNVQk1JVFRFRDogJ+iuouWNleW3suaPkOS6pCcsXG4gICAgICAgIERFTElWRVJZX0NPTkZJUk1FRDogJ+WVhuWutuW3suaOpeWNlScsXG4gICAgICAgIERFTElWRVJZX1BBSUQ6ICfku5jmrL7miJDlip8nLFxuICAgICAgICBPTkxJTkVfUEFJRDogJ+S7mOasvuaIkOWKnycsXG4gICAgICAgIE9OTElORV9DT05GSVJNRUQ6ICfllYblrrblt7LmjqXljZUnLFxuICAgICAgICBGSU5JU0hFRDogJ+iuouWNleW3suWujOaIkCcsXG4gICAgICAgIENBTkNFTEVEOiAn6K6i5Y2V5bey5Y+W5raIJyxcblxuICAgIH07XG4gICAgdmFyIHBheW1lbnRfdCA9IHtcbiAgICAgICAgT05MSU5FOiAn5Zyo57q/5pSv5LuYJyxcbiAgICAgICAgQ0FTSF9PTl9ERUxJVkVSWTogJ+i0p+WIsOS7mOasvicsXG4gICAgfTtcbiAgICAkaHR0cCgnL2FwaS92Mi9vcmRlcnMvZGV0YWlsP2lkPScgKyBvcmRlcl9pZCkuZ2V0KGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICByZXN1bHQuc3RhdHVzX3QgPSBzdGF0dXNfdFtyZXN1bHQuc3RhdHVzXTtcbiAgICAgICAgcmVzdWx0LnBheW1lbnRfdCA9IHBheW1lbnRfdFtyZXN1bHQucGF5bWVudF07XG4gICAgICAgIHJlc3VsdC5pbWdfbGluayA9IElNR19MSU5LO1xuICAgICAgICByZXN1bHQucHJvY2VzcyA9ICcnO1xuICAgICAgICByZXN1bHQuYW1vdW50X3QgPSBwcm9jZXNzRGF0YS5wcm9jZXNzUHJpY2UocmVzdWx0LmFtb3VudCkgKyAocmVzdWx0LmlzX3ByaWNlZCA/ICcnIDogJyArIO+8nycpO1xuICAgICAgICByZXN1bHQuZnJlaWdodF90ID0gcmVzdWx0LmFtb3VudCA+PSAyMDAwMCA/ICcwLjAwJyA6IChyZXN1bHQuaXNfcHJpY2VkID8gcHJvY2Vzc0RhdGEucHJvY2Vzc1ByaWNlKHJlc3VsdC5mcmVpZ2h0KSA6ICfvvJ8nKTtcbiAgICAgICAgcmVzdWx0LnRvdGFsID0gY2FsY3VsYXRlVG90YWwocmVzdWx0LmFtb3VudCwgcmVzdWx0LmZyZWlnaHQsIHJlc3VsdC5pc19wcmljZWQpO1xuICAgICAgICB2YXIgbGVuZ3RoID0gcmVzdWx0Lmhpc3Rvcmllcy5sZW5ndGg7XG4gICAgICAgIHZhciBoaXN0b3J5ID0ge307XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHJlc3VsdC5wcm9jZXNzICs9ICc8c3BhbiBjbGFzcz1cImNpcmNsZSBmaW5pc2hlZC1jaXJjbGVcIj4nICsgKGkgKyAxKSArICc8L3NwYW4+JztcbiAgICAgICAgICAgIHJlc3VsdC5wcm9jZXNzICs9ICc8c3BhbiBjbGFzcz1cInN0YXR1cyBmaW5pc2hlZC1zdGF0dXNcIj48c3BhbiBjbGFzcz1cIm9wZXJhdGUtdGltZVwiPic7XG4gICAgICAgICAgICByZXN1bHQucHJvY2VzcyArPSBuZXcgRGF0ZShyZXN1bHQuaGlzdG9yaWVzW2ldLmNyZWF0ZV90aW1lKS5kYXRlRm9ybWF0KCkgKyAnPC9zcGFuPic7XG4gICAgICAgICAgICByZXN1bHQucHJvY2VzcyArPSBzdGF0dXNfdFtyZXN1bHQuaGlzdG9yaWVzW2ldLnN0YXR1c10gKyAnPC9zcGFuPic7XG4gICAgICAgICAgICBpZiAocmVzdWx0Lmhpc3Rvcmllc1tpXS5zdGF0dXMgIT09ICdGSU5JU0hFRCcgJiYgcmVzdWx0Lmhpc3Rvcmllc1tpXS5zdGF0dXMgIT09IFwiQ0FOQ0VMRURcIikge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wcm9jZXNzICs9ICc8c3BhbiBjbGFzcz1cImFycm93IGZpbmlzaGVkLWFycm93XCI+PC9zcGFuPic7XG4gICAgICAgICAgICAgICAgaGlzdG9yeVtyZXN1bHQuaGlzdG9yaWVzW2ldLnN0YXR1c10gPSBpICsgMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocmVzdWx0Lmhpc3Rvcmllc1tsZW5ndGggLSAxXS5zdGF0dXMgIT09IFwiRklOSVNIRURcIiAmJiByZXN1bHQuaGlzdG9yaWVzW2xlbmd0aCAtIDFdLnN0YXR1cyAhPT0gJ0NBTkNFTEVEJykge1xuICAgICAgICAgICAgaWYgKHJlc3VsdC5wYXltZW50ID09PSBcIk9OTElORVwiKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN0ZXAgPSBbXG4gICAgICAgICAgICAgICAgICAgIHsgc3RhdHVzOiAnU1VCTUlUVEVEJyB9LFxuICAgICAgICAgICAgICAgICAgICB7IHN0YXR1czogJ09OTElORV9QQUlEJyB9LFxuICAgICAgICAgICAgICAgICAgICB7IHN0YXR1czogJ09OTElORV9DT05GSVJNRUQnIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgc3RhdHVzOiAnRklOSVNIRUQnIH0sXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIHN0ZXAgPSBbXG4gICAgICAgICAgICAgICAgICAgIHsgc3RhdHVzOiAnU1VCTUlUVEVEJyB9LFxuICAgICAgICAgICAgICAgICAgICB7IHN0YXR1czogJ0RFTElWRVJZX0NPTkZJUk1FRCcgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBzdGF0dXM6ICdERUxJVkVSWV9QQUlEJyB9LFxuICAgICAgICAgICAgICAgICAgICB7IHN0YXR1czogJ0ZJTklTSEVEJyB9LFxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gbGVuZ3RoOyBpIDwgc3RlcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wcm9jZXNzICs9ICc8c3BhbiBjbGFzcz1cImNpcmNsZVwiPicgKyAoaSArIDEpICsgJzwvc3Bhbj4nO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wcm9jZXNzICs9ICc8c3BhbiBjbGFzcz1cInN0YXR1c1wiPjxzcGFuIGNsYXNzPVwib3BlcmF0ZS10aW1lXCI+PC9zcGFuPicgKyBzdGF0dXNfdFtzdGVwW2ldLnN0YXR1c10gKyAnPC9zcGFuPic7XG4gICAgICAgICAgICAgICAgaWYgKGkgIT09IHN0ZXAubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHJvY2VzcyArPSAnPHNwYW4gY2xhc3M9XCJhcnJvd1wiPjwvc3Bhbj4nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAkKFwiI3RlbXBsYXRlXCIpLnRtcGwocmVzdWx0KS5hcHBlbmRUbygnI29yZGVyX2NvbnRhaW5lcicpO1xuICAgIH0pXG4gICAgY29udGFpbmVyLmRlbGVnYXRlKFwiLmFkZC1maWxlXCIsIFwiY2hhbmdlXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHVwbG9hZENvbXAudXBsb2FkRmlsZShldmVudCk7XG4gICAgfSk7XG4gICAgY29udGFpbmVyLmRlbGVnYXRlKFwiLmRlbGV0ZS1maWxlXCIsIFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgdXBsb2FkQ29tcC5kZWxldGVGaWxlKGV2ZW50KTtcbiAgICB9KTtcbiAgICAvL+WPlua2iOiuouWNlVxuICAgIGNvbnRhaW5lci5kZWxlZ2F0ZShcIiNjYW5jZWxfb3JkZXJcIiwgXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcG9wVXAuc2hvd1BvcChcIiNjYW5jZWxfb3JkZXJfbW9kYWxcIik7XG4gICAgfSk7XG4gICAgJChcIiNjYW5jZWxfb3JkZXJfbW9kYWwgLnJpZ2h0XCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdXJsID0gXCIvYXBpL3YyL29yZGVycy9jYW5jZWw/aWQ9XCIgKyBvcmRlcl9pZDtcbiAgICAgICAgJGh0dHAodXJsKS5kZWxldGUoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvL+afpeeci+aMiemcgOWumuWItuivpuaDhVxuICAgIHNob3dEZW1hbmREZXRhaWwoY29udGFpbmVyKTtcbn0oKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvb3JkZXIuanNcbiAqKiBtb2R1bGUgaWQgPSAwXG4gKiogbW9kdWxlIGNodW5rcyA9IDE0XG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==