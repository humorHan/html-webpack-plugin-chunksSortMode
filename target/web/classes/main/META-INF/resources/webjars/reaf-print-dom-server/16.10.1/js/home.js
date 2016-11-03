webpackJsonp([6,19],[
/* 0 */
/***/ function(module, exports) {

	(function() {
	    var limit = 15;
	    var count = 0;
	    var status = '';
	    //是否有状态
	    if (getLinkParam('status')) {
	        status = getLinkParam('status');
	        var selected = $(".search-query").find("a[data-status=" + status + "]");
	        if (status && selected.length != 0) {
	            $(".search-query a").removeClass("active");
	            selected.addClass("active");
	        }
	    }
	    if (getLinkParam('page')) {
	        renderOrderList(status, (getLinkParam('page') - 1) * limit);
	    } else {
	        renderOrderList(status);
	    }
	
	    //选择状态
	    $(".search-query a").click(function(event) {
	        var $target = $(event.target);
	        var id = $target.attr("id");
	        var status = $target.attr("data-status")
	        var pathname = location.pathname
	        location.href = pathname + "?status=" + status
	    });
	    //按需定制商品查看详情
	    showDemandDetail($("#my_order_list"));
	
	    function renderOrderList(status, offset) {
	        var status_t = {
	            SUBMITTED: '订单已提交',
	            DELIVERY_CONFIRMED: '商家已接单',
	            DELIVERY_PAID: '付款成功',
	            ONLINE_PAID: '付款成功',
	            ONLINE_CONFIRMED: '商家已接单',
	            FINISHED: '订单已完成',
	            CANCELED: '订单已取消',
	        }
	        var url = '/api/v2/orders/get-list?limit=' + limit;
	        if (status) {
	            url += "&status=" + status;
	        }
	        if (offset) {
	            url += '&offset=' + offset;
	        }
	        $http(url).get(function(result) {
	            var str = '';
	            count = result.count;
	            if (result.orders.length === 0) {
	                return;
	            }
	            var payment_t = {
	                ONLINE: '在线支付',
	                CASH_ON_DELIVERY: '货到付款',
	            }
	            for (var i = 0; i < result.orders.length; i++) {
	                str += '<div class="order-list-item"><div class="order-list-head">';
	                str += '<div class="order-list-brief">订单编号：<span class="color">' + result.orders[i].id;
	                str += '</span></div><div class="order-list-brief">下单时间：<span>' + new Date(result.orders[i].create_time).dateFormat();
	                str += '</span></div><div class="order-list-brief">支付方式：<span class="color">' + payment_t[result.orders[i].payment];
	                str += '</span></div><div class="order-list-brief">收货人：<a class="order-receiver">';
	                str += '<span class="receiver-name">' + result.orders[i].consignee_name + '</span><div class="order-receiver-detail">';
	                str += '<img class="order-receiver-triangle" src="/assets/img/triangle_top.png">';
	                str += '<span>' + result.orders[i].consignee_name + '</span><span>' + result.orders[i].address + '</span>';
	                str += '<span>' + result.orders[i].consignee_phone + '</span></div></a></div></div>';
	                str += '<table class="order-list-table"><thead class="order-table-th"><td class="order-table-product">';
	                str += '<div class="item-product-describe">商品信息</div></td><td>数量</td><td>印刷文件</td>';
	                str += '<td>订单金额</td><td>订单状态</td></thead><tbody class="order-table-tb">';
	                var items = result.orders[i].items;
	                if (result.orders[i].item_count > 0) {
	                    result.orders[i].count = result.orders[i].item_count < 4 ? result.orders[i].item_count : 3;
	                    result.orders[i].total = '￥' + calculateTotal(result.orders[i].amount, result.orders[i].freight, result.orders[i].is_priced);
	                    str += '<tr data-id="' + items[0].id + '" data-detail=' + JSON.stringify(items[0].detail) + '><td class="order-table-product">';
	                    str += '<div class="item-product-img">';
	                    if (items[0].is_custom) {
	                        str += '<a class="demand-pop">';
	                    } else {
	                        str += '<a href="/product?id=' + items[0].product_id + '#' + items[0].brief + '">';
	                    }
	                    str += '<img src="' + IMG_LINK + items[0].image_key + '?imageView2/1/w/80/h/80/"></a>';
	
	                    str += '</div><div class="item-product-describe">';
	                    if (items[0].is_custom) {
	                        str += '<a class="demand-pop">';
	                    } else {
	                        str += '<a href="/product?id=' + items[0].product_id + '#' + items[0].brief + '">';
	                    }
	                    str += '<p class="title">' + items[0].title + '</p></a>';
	
	                    str += '</div></td><td><div>x' + items[0].quantity + '</div></td>';
	                    str += '<td class="divide upload-file">';
	                    if (items[0].file) {
	                        str += '<a class="had-file" href="' + IMG_LINK + items[0].file.file_key + '" title="' + items[0].file.file_name + '">' + items[0].file.file_name + '</a>';
	                    } else {
	                        str += '<a class="color">未上传</a>';
	                    }
	                    str += '</td>';
	                    str += '<td class="divide order-price color" rowspan="' + result.orders[i].count + '">' + result.orders[i].total + '</td>';
	                    str += '<td class="order-status" rowspan="' + result.orders[i].count + '">';
	                    str += '<a class="' + (result.orders[i].status === 'CANCELED' ? 'order-cancel' : 'order-success') + '">' + status_t[result.orders[i].status] + '</a>';
	                    str += '<a class="check-order-detail" href="/order?id=' + result.orders[i].id + '">查看订单详情 ></a></td>';
	                }
	                if (items.length > 1) {
	                    for (var j = 1; j < items.length; j++) {
	                        str += '<tr data-id="' + items[j].id + '" data-detail=' + JSON.stringify(items[j].detail) + '><td class="order-table-product">';
	                        str += '<div class="item-product-img">';
	                        if (items[j].is_custom) {
	                            str += '<a class="demand-pop">';
	                        } else {
	                            str += '<a href="/product?id=' + items[j].product_id + '#' + items[j].brief + '">';
	                        }
	                        str += '<img src="' + IMG_LINK + items[j].image_key + '?imageView2/1/w/80/h/80/"></a>';
	
	                        str += '</div><div class="item-product-describe">';
	                        if (items[j].is_custom) {
	                            str += '<a class="demand-pop">';
	                        } else {
	                            str += '<a href="/product?id=' + items[j].product_id + '#' + items[j].brief + '">';
	                        }
	                        str += '<p class="title">' + items[j].title + '</p></a>';
	
	                        str += '</div></td><td><div>x' + items[j].quantity + '</div></td>';
	                        str += '<td class="divide upload-file">';
	                        if (items[j].file) {
	                            str += '<a class="had-file" href="' + IMG_LINK + items[j].file.file_key + '" title="' + items[j].file.file_name + '">' + items[j].file.file_name + '</a>';
	                        } else {
	                            str += '<a class="color">未上传</a>';
	                        }
	                        str += '</td></tr>';
	                    }
	                }
	                str += '</tbody></table>';
	                if (result.orders[i].item_count > 3) {
	                    str += '<a class="order-list-foot" href="/order?id=' + result.orders[i].id + '">查看更多></a>';
	                }
	                str += '</div>';
	                $("#my_order_list").html(str);
	                /*
	                    分页初始化，必须放在main.js下面
	                    参数有两个：
	                    （必填）count：总条数
	                    （非必填）pageSize：每页的条数，默认为15
	                 */
	                $("#show_pagination").pagination({
	                    count: count,
	                    pageSize: limit,
	                });
	            }
	        })
	    }
	})()


/***/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvaG9tZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBMkIsMEJBQTBCO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUI7QUFDckI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW1DLGtCQUFrQjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMEJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0EsVUFBUztBQUNUO0FBQ0EsRUFBQyIsImZpbGUiOiJqcy9ob21lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCkge1xuICAgIHZhciBsaW1pdCA9IDE1O1xuICAgIHZhciBjb3VudCA9IDA7XG4gICAgdmFyIHN0YXR1cyA9ICcnO1xuICAgIC8v5piv5ZCm5pyJ54q25oCBXG4gICAgaWYgKGdldExpbmtQYXJhbSgnc3RhdHVzJykpIHtcbiAgICAgICAgc3RhdHVzID0gZ2V0TGlua1BhcmFtKCdzdGF0dXMnKTtcbiAgICAgICAgdmFyIHNlbGVjdGVkID0gJChcIi5zZWFyY2gtcXVlcnlcIikuZmluZChcImFbZGF0YS1zdGF0dXM9XCIgKyBzdGF0dXMgKyBcIl1cIik7XG4gICAgICAgIGlmIChzdGF0dXMgJiYgc2VsZWN0ZWQubGVuZ3RoICE9IDApIHtcbiAgICAgICAgICAgICQoXCIuc2VhcmNoLXF1ZXJ5IGFcIikucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgICAgICAgICBzZWxlY3RlZC5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoZ2V0TGlua1BhcmFtKCdwYWdlJykpIHtcbiAgICAgICAgcmVuZGVyT3JkZXJMaXN0KHN0YXR1cywgKGdldExpbmtQYXJhbSgncGFnZScpIC0gMSkgKiBsaW1pdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmVuZGVyT3JkZXJMaXN0KHN0YXR1cyk7XG4gICAgfVxuXG4gICAgLy/pgInmi6nnirbmgIFcbiAgICAkKFwiLnNlYXJjaC1xdWVyeSBhXCIpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHZhciAkdGFyZ2V0ID0gJChldmVudC50YXJnZXQpO1xuICAgICAgICB2YXIgaWQgPSAkdGFyZ2V0LmF0dHIoXCJpZFwiKTtcbiAgICAgICAgdmFyIHN0YXR1cyA9ICR0YXJnZXQuYXR0cihcImRhdGEtc3RhdHVzXCIpXG4gICAgICAgIHZhciBwYXRobmFtZSA9IGxvY2F0aW9uLnBhdGhuYW1lXG4gICAgICAgIGxvY2F0aW9uLmhyZWYgPSBwYXRobmFtZSArIFwiP3N0YXR1cz1cIiArIHN0YXR1c1xuICAgIH0pO1xuICAgIC8v5oyJ6ZyA5a6a5Yi25ZWG5ZOB5p+l55yL6K+m5oOFXG4gICAgc2hvd0RlbWFuZERldGFpbCgkKFwiI215X29yZGVyX2xpc3RcIikpO1xuXG4gICAgZnVuY3Rpb24gcmVuZGVyT3JkZXJMaXN0KHN0YXR1cywgb2Zmc2V0KSB7XG4gICAgICAgIHZhciBzdGF0dXNfdCA9IHtcbiAgICAgICAgICAgIFNVQk1JVFRFRDogJ+iuouWNleW3suaPkOS6pCcsXG4gICAgICAgICAgICBERUxJVkVSWV9DT05GSVJNRUQ6ICfllYblrrblt7LmjqXljZUnLFxuICAgICAgICAgICAgREVMSVZFUllfUEFJRDogJ+S7mOasvuaIkOWKnycsXG4gICAgICAgICAgICBPTkxJTkVfUEFJRDogJ+S7mOasvuaIkOWKnycsXG4gICAgICAgICAgICBPTkxJTkVfQ09ORklSTUVEOiAn5ZWG5a625bey5o6l5Y2VJyxcbiAgICAgICAgICAgIEZJTklTSEVEOiAn6K6i5Y2V5bey5a6M5oiQJyxcbiAgICAgICAgICAgIENBTkNFTEVEOiAn6K6i5Y2V5bey5Y+W5raIJyxcbiAgICAgICAgfVxuICAgICAgICB2YXIgdXJsID0gJy9hcGkvdjIvb3JkZXJzL2dldC1saXN0P2xpbWl0PScgKyBsaW1pdDtcbiAgICAgICAgaWYgKHN0YXR1cykge1xuICAgICAgICAgICAgdXJsICs9IFwiJnN0YXR1cz1cIiArIHN0YXR1cztcbiAgICAgICAgfVxuICAgICAgICBpZiAob2Zmc2V0KSB7XG4gICAgICAgICAgICB1cmwgKz0gJyZvZmZzZXQ9JyArIG9mZnNldDtcbiAgICAgICAgfVxuICAgICAgICAkaHR0cCh1cmwpLmdldChmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgIHZhciBzdHIgPSAnJztcbiAgICAgICAgICAgIGNvdW50ID0gcmVzdWx0LmNvdW50O1xuICAgICAgICAgICAgaWYgKHJlc3VsdC5vcmRlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHBheW1lbnRfdCA9IHtcbiAgICAgICAgICAgICAgICBPTkxJTkU6ICflnKjnur/mlK/ku5gnLFxuICAgICAgICAgICAgICAgIENBU0hfT05fREVMSVZFUlk6ICfotKfliLDku5jmrL4nLFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXN1bHQub3JkZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgc3RyICs9ICc8ZGl2IGNsYXNzPVwib3JkZXItbGlzdC1pdGVtXCI+PGRpdiBjbGFzcz1cIm9yZGVyLWxpc3QtaGVhZFwiPic7XG4gICAgICAgICAgICAgICAgc3RyICs9ICc8ZGl2IGNsYXNzPVwib3JkZXItbGlzdC1icmllZlwiPuiuouWNlee8luWPt++8mjxzcGFuIGNsYXNzPVwiY29sb3JcIj4nICsgcmVzdWx0Lm9yZGVyc1tpXS5pZDtcbiAgICAgICAgICAgICAgICBzdHIgKz0gJzwvc3Bhbj48L2Rpdj48ZGl2IGNsYXNzPVwib3JkZXItbGlzdC1icmllZlwiPuS4i+WNleaXtumXtO+8mjxzcGFuPicgKyBuZXcgRGF0ZShyZXN1bHQub3JkZXJzW2ldLmNyZWF0ZV90aW1lKS5kYXRlRm9ybWF0KCk7XG4gICAgICAgICAgICAgICAgc3RyICs9ICc8L3NwYW4+PC9kaXY+PGRpdiBjbGFzcz1cIm9yZGVyLWxpc3QtYnJpZWZcIj7mlK/ku5jmlrnlvI/vvJo8c3BhbiBjbGFzcz1cImNvbG9yXCI+JyArIHBheW1lbnRfdFtyZXN1bHQub3JkZXJzW2ldLnBheW1lbnRdO1xuICAgICAgICAgICAgICAgIHN0ciArPSAnPC9zcGFuPjwvZGl2PjxkaXYgY2xhc3M9XCJvcmRlci1saXN0LWJyaWVmXCI+5pS26LSn5Lq677yaPGEgY2xhc3M9XCJvcmRlci1yZWNlaXZlclwiPic7XG4gICAgICAgICAgICAgICAgc3RyICs9ICc8c3BhbiBjbGFzcz1cInJlY2VpdmVyLW5hbWVcIj4nICsgcmVzdWx0Lm9yZGVyc1tpXS5jb25zaWduZWVfbmFtZSArICc8L3NwYW4+PGRpdiBjbGFzcz1cIm9yZGVyLXJlY2VpdmVyLWRldGFpbFwiPic7XG4gICAgICAgICAgICAgICAgc3RyICs9ICc8aW1nIGNsYXNzPVwib3JkZXItcmVjZWl2ZXItdHJpYW5nbGVcIiBzcmM9XCIvYXNzZXRzL2ltZy90cmlhbmdsZV90b3AucG5nXCI+JztcbiAgICAgICAgICAgICAgICBzdHIgKz0gJzxzcGFuPicgKyByZXN1bHQub3JkZXJzW2ldLmNvbnNpZ25lZV9uYW1lICsgJzwvc3Bhbj48c3Bhbj4nICsgcmVzdWx0Lm9yZGVyc1tpXS5hZGRyZXNzICsgJzwvc3Bhbj4nO1xuICAgICAgICAgICAgICAgIHN0ciArPSAnPHNwYW4+JyArIHJlc3VsdC5vcmRlcnNbaV0uY29uc2lnbmVlX3Bob25lICsgJzwvc3Bhbj48L2Rpdj48L2E+PC9kaXY+PC9kaXY+JztcbiAgICAgICAgICAgICAgICBzdHIgKz0gJzx0YWJsZSBjbGFzcz1cIm9yZGVyLWxpc3QtdGFibGVcIj48dGhlYWQgY2xhc3M9XCJvcmRlci10YWJsZS10aFwiPjx0ZCBjbGFzcz1cIm9yZGVyLXRhYmxlLXByb2R1Y3RcIj4nO1xuICAgICAgICAgICAgICAgIHN0ciArPSAnPGRpdiBjbGFzcz1cIml0ZW0tcHJvZHVjdC1kZXNjcmliZVwiPuWVhuWTgeS/oeaBrzwvZGl2PjwvdGQ+PHRkPuaVsOmHjzwvdGQ+PHRkPuWNsOWIt+aWh+S7tjwvdGQ+JztcbiAgICAgICAgICAgICAgICBzdHIgKz0gJzx0ZD7orqLljZXph5Hpop08L3RkPjx0ZD7orqLljZXnirbmgIE8L3RkPjwvdGhlYWQ+PHRib2R5IGNsYXNzPVwib3JkZXItdGFibGUtdGJcIj4nO1xuICAgICAgICAgICAgICAgIHZhciBpdGVtcyA9IHJlc3VsdC5vcmRlcnNbaV0uaXRlbXM7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5vcmRlcnNbaV0uaXRlbV9jb3VudCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0Lm9yZGVyc1tpXS5jb3VudCA9IHJlc3VsdC5vcmRlcnNbaV0uaXRlbV9jb3VudCA8IDQgPyByZXN1bHQub3JkZXJzW2ldLml0ZW1fY291bnQgOiAzO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQub3JkZXJzW2ldLnRvdGFsID0gJ++/pScgKyBjYWxjdWxhdGVUb3RhbChyZXN1bHQub3JkZXJzW2ldLmFtb3VudCwgcmVzdWx0Lm9yZGVyc1tpXS5mcmVpZ2h0LCByZXN1bHQub3JkZXJzW2ldLmlzX3ByaWNlZCk7XG4gICAgICAgICAgICAgICAgICAgIHN0ciArPSAnPHRyIGRhdGEtaWQ9XCInICsgaXRlbXNbMF0uaWQgKyAnXCIgZGF0YS1kZXRhaWw9JyArIEpTT04uc3RyaW5naWZ5KGl0ZW1zWzBdLmRldGFpbCkgKyAnPjx0ZCBjbGFzcz1cIm9yZGVyLXRhYmxlLXByb2R1Y3RcIj4nO1xuICAgICAgICAgICAgICAgICAgICBzdHIgKz0gJzxkaXYgY2xhc3M9XCJpdGVtLXByb2R1Y3QtaW1nXCI+JztcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1zWzBdLmlzX2N1c3RvbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RyICs9ICc8YSBjbGFzcz1cImRlbWFuZC1wb3BcIj4nO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RyICs9ICc8YSBocmVmPVwiL3Byb2R1Y3Q/aWQ9JyArIGl0ZW1zWzBdLnByb2R1Y3RfaWQgKyAnIycgKyBpdGVtc1swXS5icmllZiArICdcIj4nO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHN0ciArPSAnPGltZyBzcmM9XCInICsgSU1HX0xJTksgKyBpdGVtc1swXS5pbWFnZV9rZXkgKyAnP2ltYWdlVmlldzIvMS93LzgwL2gvODAvXCI+PC9hPic7XG5cbiAgICAgICAgICAgICAgICAgICAgc3RyICs9ICc8L2Rpdj48ZGl2IGNsYXNzPVwiaXRlbS1wcm9kdWN0LWRlc2NyaWJlXCI+JztcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1zWzBdLmlzX2N1c3RvbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RyICs9ICc8YSBjbGFzcz1cImRlbWFuZC1wb3BcIj4nO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RyICs9ICc8YSBocmVmPVwiL3Byb2R1Y3Q/aWQ9JyArIGl0ZW1zWzBdLnByb2R1Y3RfaWQgKyAnIycgKyBpdGVtc1swXS5icmllZiArICdcIj4nO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHN0ciArPSAnPHAgY2xhc3M9XCJ0aXRsZVwiPicgKyBpdGVtc1swXS50aXRsZSArICc8L3A+PC9hPic7XG5cbiAgICAgICAgICAgICAgICAgICAgc3RyICs9ICc8L2Rpdj48L3RkPjx0ZD48ZGl2PngnICsgaXRlbXNbMF0ucXVhbnRpdHkgKyAnPC9kaXY+PC90ZD4nO1xuICAgICAgICAgICAgICAgICAgICBzdHIgKz0gJzx0ZCBjbGFzcz1cImRpdmlkZSB1cGxvYWQtZmlsZVwiPic7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtc1swXS5maWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHIgKz0gJzxhIGNsYXNzPVwiaGFkLWZpbGVcIiBocmVmPVwiJyArIElNR19MSU5LICsgaXRlbXNbMF0uZmlsZS5maWxlX2tleSArICdcIiB0aXRsZT1cIicgKyBpdGVtc1swXS5maWxlLmZpbGVfbmFtZSArICdcIj4nICsgaXRlbXNbMF0uZmlsZS5maWxlX25hbWUgKyAnPC9hPic7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHIgKz0gJzxhIGNsYXNzPVwiY29sb3JcIj7mnKrkuIrkvKA8L2E+JztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzdHIgKz0gJzwvdGQ+JztcbiAgICAgICAgICAgICAgICAgICAgc3RyICs9ICc8dGQgY2xhc3M9XCJkaXZpZGUgb3JkZXItcHJpY2UgY29sb3JcIiByb3dzcGFuPVwiJyArIHJlc3VsdC5vcmRlcnNbaV0uY291bnQgKyAnXCI+JyArIHJlc3VsdC5vcmRlcnNbaV0udG90YWwgKyAnPC90ZD4nO1xuICAgICAgICAgICAgICAgICAgICBzdHIgKz0gJzx0ZCBjbGFzcz1cIm9yZGVyLXN0YXR1c1wiIHJvd3NwYW49XCInICsgcmVzdWx0Lm9yZGVyc1tpXS5jb3VudCArICdcIj4nO1xuICAgICAgICAgICAgICAgICAgICBzdHIgKz0gJzxhIGNsYXNzPVwiJyArIChyZXN1bHQub3JkZXJzW2ldLnN0YXR1cyA9PT0gJ0NBTkNFTEVEJyA/ICdvcmRlci1jYW5jZWwnIDogJ29yZGVyLXN1Y2Nlc3MnKSArICdcIj4nICsgc3RhdHVzX3RbcmVzdWx0Lm9yZGVyc1tpXS5zdGF0dXNdICsgJzwvYT4nO1xuICAgICAgICAgICAgICAgICAgICBzdHIgKz0gJzxhIGNsYXNzPVwiY2hlY2stb3JkZXItZGV0YWlsXCIgaHJlZj1cIi9vcmRlcj9pZD0nICsgcmVzdWx0Lm9yZGVyc1tpXS5pZCArICdcIj7mn6XnnIvorqLljZXor6bmg4UgPjwvYT48L3RkPic7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpdGVtcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAxOyBqIDwgaXRlbXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ciArPSAnPHRyIGRhdGEtaWQ9XCInICsgaXRlbXNbal0uaWQgKyAnXCIgZGF0YS1kZXRhaWw9JyArIEpTT04uc3RyaW5naWZ5KGl0ZW1zW2pdLmRldGFpbCkgKyAnPjx0ZCBjbGFzcz1cIm9yZGVyLXRhYmxlLXByb2R1Y3RcIj4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RyICs9ICc8ZGl2IGNsYXNzPVwiaXRlbS1wcm9kdWN0LWltZ1wiPic7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbXNbal0uaXNfY3VzdG9tKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyICs9ICc8YSBjbGFzcz1cImRlbWFuZC1wb3BcIj4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHIgKz0gJzxhIGhyZWY9XCIvcHJvZHVjdD9pZD0nICsgaXRlbXNbal0ucHJvZHVjdF9pZCArICcjJyArIGl0ZW1zW2pdLmJyaWVmICsgJ1wiPic7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHIgKz0gJzxpbWcgc3JjPVwiJyArIElNR19MSU5LICsgaXRlbXNbal0uaW1hZ2Vfa2V5ICsgJz9pbWFnZVZpZXcyLzEvdy84MC9oLzgwL1wiPjwvYT4nO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHIgKz0gJzwvZGl2PjxkaXYgY2xhc3M9XCJpdGVtLXByb2R1Y3QtZGVzY3JpYmVcIj4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1zW2pdLmlzX2N1c3RvbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ciArPSAnPGEgY2xhc3M9XCJkZW1hbmQtcG9wXCI+JztcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyICs9ICc8YSBocmVmPVwiL3Byb2R1Y3Q/aWQ9JyArIGl0ZW1zW2pdLnByb2R1Y3RfaWQgKyAnIycgKyBpdGVtc1tqXS5icmllZiArICdcIj4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgc3RyICs9ICc8cCBjbGFzcz1cInRpdGxlXCI+JyArIGl0ZW1zW2pdLnRpdGxlICsgJzwvcD48L2E+JztcblxuICAgICAgICAgICAgICAgICAgICAgICAgc3RyICs9ICc8L2Rpdj48L3RkPjx0ZD48ZGl2PngnICsgaXRlbXNbal0ucXVhbnRpdHkgKyAnPC9kaXY+PC90ZD4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RyICs9ICc8dGQgY2xhc3M9XCJkaXZpZGUgdXBsb2FkLWZpbGVcIj4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1zW2pdLmZpbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHIgKz0gJzxhIGNsYXNzPVwiaGFkLWZpbGVcIiBocmVmPVwiJyArIElNR19MSU5LICsgaXRlbXNbal0uZmlsZS5maWxlX2tleSArICdcIiB0aXRsZT1cIicgKyBpdGVtc1tqXS5maWxlLmZpbGVfbmFtZSArICdcIj4nICsgaXRlbXNbal0uZmlsZS5maWxlX25hbWUgKyAnPC9hPic7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ciArPSAnPGEgY2xhc3M9XCJjb2xvclwiPuacquS4iuS8oDwvYT4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgc3RyICs9ICc8L3RkPjwvdHI+JztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdHIgKz0gJzwvdGJvZHk+PC90YWJsZT4nO1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQub3JkZXJzW2ldLml0ZW1fY291bnQgPiAzKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0ciArPSAnPGEgY2xhc3M9XCJvcmRlci1saXN0LWZvb3RcIiBocmVmPVwiL29yZGVyP2lkPScgKyByZXN1bHQub3JkZXJzW2ldLmlkICsgJ1wiPuafpeeci+abtOWkmj48L2E+JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3RyICs9ICc8L2Rpdj4nO1xuICAgICAgICAgICAgICAgICQoXCIjbXlfb3JkZXJfbGlzdFwiKS5odG1sKHN0cik7XG4gICAgICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAgICAgICAg5YiG6aG15Yid5aeL5YyW77yM5b+F6aG75pS+5ZyobWFpbi5qc+S4i+mdolxuICAgICAgICAgICAgICAgICAgICDlj4LmlbDmnInkuKTkuKrvvJpcbiAgICAgICAgICAgICAgICAgICAg77yI5b+F5aGr77yJY291bnTvvJrmgLvmnaHmlbBcbiAgICAgICAgICAgICAgICAgICAg77yI6Z2e5b+F5aGr77yJcGFnZVNpemXvvJrmr4/pobXnmoTmnaHmlbDvvIzpu5jorqTkuLoxNVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICQoXCIjc2hvd19wYWdpbmF0aW9uXCIpLnBhZ2luYXRpb24oe1xuICAgICAgICAgICAgICAgICAgICBjb3VudDogY291bnQsXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VTaXplOiBsaW1pdCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG59KSgpXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2hvbWUuanNcbiAqKiBtb2R1bGUgaWQgPSAwXG4gKiogbW9kdWxlIGNodW5rcyA9IDZcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9