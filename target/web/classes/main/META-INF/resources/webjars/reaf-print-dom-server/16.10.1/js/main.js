webpackJsonp([11,19],[
/* 0 */
/***/ function(module, exports) {

	(function() {
	    getShowCartBtn();
	    //跳转购物车
	    $("#go_to_cart").click(function(event) {
	        if (!$.cookie("truthid") || !$.cookie("userid")) {
	            event.preventDefault();
	            login.showPop(function() {
	                location.href = "/cart";
	            })
	        }
	    });
	    //购物车删除操作
	    $("#cart_item_content").delegate(".cart-item-opreation", "click", function(event) {
	        var $target = $(event.target);
	        var id = $target.attr("data-id");
	        var url = "/api/v2/cart/delete?id=" + id;
	        $http(url).delete(function(result) {
	            $target.parents(".cart-list-item").remove();
	            var num = parseInt($("#cart_item_count").text());
	            if (num === 1) {
	                $("#cart_item_count").hide();
	                $("#no_cart_item").show();
	                $("#cart_item_list").hide();
	            } else {
	                $("#cart_item_count").text(num - 1);
	            }
	        });
	    });
	    $(".special-list").hover(function() {
	        $(".special-product").children("a").addClass("special-selected");
	    }, function() {
	        $(".special-product").children("a").removeClass("special-selected");
	    });
	    //判断当前页面是否为首页、商品详情页、按需定制页
	    var current = location.pathname;
	    var sidebarBox = $("#sidebar_input_box");
	    if (current === '/' || current === '/product' || current === '/product/custom') {
	        sidebarBox.show();
	    } else {
	        sidebarBox.hide();
	    }
	    $("#sidebar_call_btn").hover(function() {
	        sidebarBox.show();
	    });
	    $("#sidebar_close").click(function() {
	        sidebarBox.hide();
	    });
	    $("#call_phone_submit").click(function() {
	        var contact = $("#contact_phone_input").val();
	        if (/^([\+][0-9]{1,3}([ \.\-])?)?([\(][0-9]{1,6}[\)])?([0-9 \.\-]{1,32})(([A-Za-z \:]{1,11})?[0-9]{1,4}?)$/.test(contact)) {
	            $http('/api/v2/others/submit-contact').post({ contact: contact }, function() {
	                alert("稍后您将接到我们的电话，该通话对您完全免费，请放心接听！您也可以通过点击屏幕右侧的“联系客服”按钮直接QQ在线咨询。");
	            })
	        } else {
	            alert("请您输入正确的号码，手机号码请直接输入，座机请加区号");
	        }
	    });
	})();
	//项目中的图片链接
	try {
	    var IMG_LINK = qiniuCdnHost + '/';
	} catch (e) {
	    var IMG_LINK = "http://7xsexg.com2.z0.glb.qiniucdn.com/";
	}
	/* 获取右上角购物车数据 */
	function getShowCartBtn() {
	    if (showCart) {
	        $("#showCartBtn").show();
	        /* 右上角购物车获取数据 */
	        $http('/api/v2/cart/brief').get(function(data) {
	            if (data.count > 0) {
	                var items = data.items;
	                var str = '';
	                for (var i = 0; i < items.length; i++) {
	                    if (items[i].is_custom) {
	                        items[i].productUrl = '/cart';
	                    } else {
	                        items[i].productUrl = '/product?id=' + items[i].product_id + '#' + items[i].brief;
	                    }
	                    str += '<div class="cart-list-item"><div class="cart-item-left"><a href="' + items[i].productUrl + '">';
	                    str += '<img src="' + IMG_LINK + items[i].image_key + '?imageView2/1/w/80/h/80/"></a></div><div class="cart-item-center">';
	                    if (items[i].is_custom) {
	                        str += '<div class="cart-item-line"><span class="cart-item-right">待定</span>';
	                    } else {
	                        str += '<div class="cart-item-line"><span class="cart-item-right">￥' + processData.processPrice(items[i].price) + 'x' + items[i].quantity + '</span>';
	                    }
	                    str += '<a class="cart-item-name" href="' + items[i].productUrl + '">' + items[i].title + '</a></div>';
	                    str += '<div class="cart-item-line"><a class="cart-item-right cart-item-opreation" data-id="' + items[i].id + '">删除</a>';
	                    str += '<a class="cart-item-det" href="' + items[i].productUrl + '">' + items[i].brief + '</a></div></div></div>';
	                }
	                /* 右上角购物车商品数量最多显示99 */
	                if (data.count < 100) {
	                    $("#cart_item_count").text(data.count).show();
	                } else {
	                    $("#cart_item_count").html('99<sup>+</sup>').show();
	                }
	                $("#no_cart_item").hide();
	                $("#cart_item_list").show();
	                $("#cart_item_content").html(str);
	            } else {
	                $("#cart_item_count").hide();
	                $("#no_cart_item").show();
	                $("#cart_item_list").hide();
	            }
	        });
	    } else {
	        $("#showCartBtn").hide();
	    }
	}
	
	function getLinkParam(key) {
	    if (location.params) {
	        return location.params[key];
	    }
	    location.params = {};
	    var search = location.search.substr(1);
	    var paramArr = search.split("&");
	    for (var i = 0; i < paramArr.length; i++) {
	        var param = paramArr[i].split("=");
	        location.params[param[0]] = param[1];
	    }
	    return location.params[key];
	}
	/*
	    ajax数据交互
	 */
	function $http(url) {
	
	    // A small example of object
	    var core = {
	        // Method that performs the ajax request
	        ajaxGet: function(method, url, callback, alertWhenSuccess) {
	            var self = this;
	            $.ajax({
	                url: url,
	                type: method,
	                contentType: 'application/json',
	                dataType: 'json',
	                processData: false,
	                async: true,
	                success: function(result) {
	                    if (!result.result || result.result === 0) {
	                        callback(result);
	                    } else {
	                        if (alertWhenSuccess === false) {
	                            callback(result);
	                        } else {
	                            self.successDeal(result);
	                        }
	                    }
	                },
	                error: function(err) {
	                    self.errorDeal(err);
	                }
	            });
	        },
	        ajaxPost: function(method, url, data, callback, alertWhenSuccess) {
	            var self = this;
	            $.ajax({
	                url: url,
	                type: method,
	                contentType: 'application/json',
	                dataType: 'json',
	                processData: false,
	                data: JSON.stringify(data),
	                async: true,
	                success: function(result) {
	                    if (!result.result || result.result === 0) {
	                        callback(result);
	                    } else {
	                        if (alertWhenSuccess === false) {
	                            callback(result);
	                        } else {
	                            self.successDeal(result);
	                        }
	                    }
	                },
	                error: function(err) {
	                    self.errorDeal(err);
	                }
	            });
	        },
	        successDeal: function(data) {
	            if (data.result == 5) {
	                alert("该资源不存在！");
	            } else if (data.result == 6) {
	                alert("不支持该操作！");
	            } else if (data.result == 8) {
	                alert("您没有权限操作，请联系管理员");
	            } else if (data.error_message) {
	                alert(data.error_message);
	            } else if (data.result == 1012) {
	                alert("提交频率过高，请稍后再试");
	            } else {
	                alert("出错了，请稍后重试");
	            }
	            location.reload();
	        },
	        errorDeal: function(err) {
	            if (err.status == 403) {
	                alert("用户身份验证失败");
	                location.href = "/#showLogin";
	            } else if (err.status == 503) {
	                alert("Opps！酱油服务器正在维护中，请耐心等待，很快就好哦！");
	                location.href = "/";
	            } else {
	                alert("出错了，" + err.status + err.statusText);
	                location.href = "/";
	            }
	        },
	    };
	
	    // Adapter pattern
	    return {
	        'get': function(callback, alertWhenSuccess) {
	            return core.ajaxGet('GET', url, callback, alertWhenSuccess);
	        },
	        'delete': function(callback, alertWhenSuccess) {
	            return core.ajaxGet('DELETE', url, callback, alertWhenSuccess);
	        },
	        'post': function(data, callback, alertWhenSuccess) {
	            return core.ajaxPost('POST', url, data, callback, alertWhenSuccess);
	        },
	        'put': function(data, callback, alertWhenSuccess) {
	            return core.ajaxPost('PUT', url, data, callback, alertWhenSuccess);
	        },
	    };
	}
	//处理价格，浮点数转整数、整数转浮点数
	var processData = {
	    //39.00变成3900
	    processRealProce: function(s) {
	        if (s.indexOf(".") == -1) {
	            s += ".00";
	        }
	        var arr = s.split(".");
	        if (arr[1].length == 1) {
	            arr[1] += "0"
	        } else if (arr[1].length > 2) {
	            arr[1] = arr[1].substr(0, 2)
	        }
	        var show = arr.join("");
	        return show * 1;
	    },
	    //3900变成39.00
	    processPrice: function(p) {
	        var str = p + "";
	        var arr = str.split("");
	        if (arr.length === 1) {
	            arr.unshift("0", "0");
	        } else if (arr.length === 2) {
	            arr.unshift("0");
	        }
	        arr.splice(arr.length - 2, 0, ".");
	        var real = arr.join("");
	        return real;
	    },
	};
	
	function calculateTotal(amount, freight, is_priced) {
	    var total = '';
	    if (is_priced) {
	        if (amount > 20000) {
	            total = processData.processPrice(amount);
	        } else {
	            total = processData.processPrice(amount + freight);
	        }
	    } else {
	        total = processData.processPrice(amount) + '+？';
	    }
	    return total;
	}
	Date.prototype.dateFormat = function() {
	    var y = this.getFullYear();
	    var m = String(this.getMonth() + 1);
	    var d = String(this.getDate());
	    var H = this.getHours();
	    var M = this.getMinutes();
	    var S = this.getSeconds();
	    var h = String(H);
	    var i = String(M);
	    var s = String(S);
	    if (m.length == 1) {
	        m = "0" + m;
	    }
	    if (d.length == 1) {
	        d = "0" + d;
	    }
	    if (h.length == 1) {
	        h = "0" + h;
	    }
	    if (i.length == 1) {
	        i = "0" + i;
	    }
	    if (s.length == 1) {
	        s = "0" + s;
	    }
	    var format = y + "-" + m + "-" + d + " " + h + ":" + i + ":" + s;
	    return format;
	};
	//分页插件
	(function($, window, document, undefined) {
	    var Pagination = function(ele, opt) {
	        this.$element = ele;
	        this.defaults = {
	            count: 0,
	            pageSize: 15
	        };
	        this.options = $.extend({}, this.defaults, opt);
	        //总页数
	        this.totalPage = 0;
	        //当前页码，默认为1
	        this.pageIndex = 1;
	        //网页链接
	        this.location = window.location.valueOf()
	    }
	
	    Pagination.prototype = {
	        init: function() {
	            if (this.options.count == 0) {
	                return;
	            }
	            this.totalPage = Math.ceil(this.options.count / this.options.pageSize);
	            if (isNaN(this.totalPage) || this.totalPage <= 1) {
	                return;
	            }
	            var search = this.location.search.substr(1);
	            this.location.paramArr = search.split("&");
	            for (var i = 0; i < this.location.paramArr.length; i++) {
	                if (this.location.paramArr[i].indexOf("page") >= 0) {
	                    this.location.i = i;
	                    this.pageIndex = 1 * (this.location.paramArr[i].split("=")[1]);
	                } else {
	                    this.location.i = this.location.paramArr.length;
	                }
	            }
	            if (this.pageIndex > this.totalPage) {
	                location.href = this.setLink(1);
	            }
	            this.setPagination();
	        },
	        //设置分页按钮的链接
	        setLink: function(num) {
	            var i = this.location.i;
	            if (i === this.location.paramArr.length) {
	                this.location.paramArr[i] = "page=" + num;
	            } else {
	                this.location.paramArr[this.location.i] = "page=" + num;
	            }
	            var href = this.location.pathname + "?" + this.location.paramArr.join("&");
	            return href;
	        },
	        //显示分页
	        setPagination: function() {
	            var pagination = $("#show_pagination");
	            var str = "";
	            //当前页为第一页，则前一页不能点击
	            if (this.pageIndex == 1) {
	                str = "<ul><li class='disabled'><a>&lt;</a></li>";
	            } else {
	                str = "<ul><li><a href=" + this.setLink(this.pageIndex - 1) + ">&lt;</a></li>";
	                if (this.pageIndex > 2) {
	                    str += "<li><a href=" + this.setLink(1) + ">1</a></li>";
	                    if (this.pageIndex > 3) {
	                        if (this.pageIndex == this.totalPage && this.pageIndex - 2 == 2) {
	                            str += "<li><a href=" + this.setLink(this.pageIndex - 2) + ">" + (this.pageIndex - 2) + "</a></li>";
	                        } else if (this.pageIndex == this.totalPage && this.pageIndex - 2 != 2) {
	                            str += "<li>...</li><li><a href=" + this.setLink(this.pageIndex - 2) + ">" + (this.pageIndex - 2) + "</a></li>";
	                        } else {
	                            str += "<li>...</li>";
	                        }
	                    }
	                }
	                str += "<li><a href=" + this.setLink(this.pageIndex - 1) + ">" + (this.pageIndex - 1) + "</a></li>";
	            }
	            str += "<li class='active'><a>" + this.pageIndex + "</a></li>";
	            if (this.pageIndex == this.totalPage) {
	                str += "<li class='disabled'><a>&gt;</a></li></ul>";
	            } else {
	                if (this.pageIndex < this.totalPage - 1) {
	                    str += "<li><a href=" + this.setLink(this.pageIndex + 1) + ">" + (this.pageIndex + 1) + "</a></li>";
	                    if (this.pageIndex < this.totalPage - 2) {
	                        if (this.pageIndex == 1 && this.pageIndex + 2 == this.totalPage - 1) {
	                            str += "<li><a href=" + this.setLink(3) + ">" + (3) + "</a></li>";
	                        } else if (this.pageIndex == 1 && this.pageIndex + 2 !== this.totalPage - 1) {
	                            str += "<li><a href=" + this.setLink(3) + ">" + (3) + "</a></li><li>...</li>";
	                        } else {
	                            str += "<li>...</li>";
	                        }
	                    }
	                }
	                str += "<li><a href=" + this.setLink(this.totalPage) + ">" + this.totalPage + "</a></li><li><a href=" + this.setLink(this.pageIndex + 1) + ">&gt;</a></li></ul>";
	            }
	            this.$element.html(str);
	        },
	    }
	
	    $.fn.pagination = function(options) {
	        return this.each(function() {
	            var pag = new Pagination($(this), options);
	            return pag.init();
	        })
	    }
	})(jQuery, window, document);


/***/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBLFVBQVM7QUFDVCxNQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLDBCQUF5QixJQUFJLHVCQUF1QixJQUFJLGtCQUFrQixLQUFLLGVBQWUsS0FBSyxRQUFRLElBQUk7QUFDL0csMERBQXlELG1CQUFtQjtBQUM1RTtBQUNBLGNBQWE7QUFDYixVQUFTO0FBQ1Q7QUFDQTtBQUNBLE1BQUs7QUFDTCxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBK0Isa0JBQWtCO0FBQ2pEO0FBQ0E7QUFDQSxzQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNULE1BQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBbUIscUJBQXFCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUI7QUFDckI7QUFDQTtBQUNBLDBCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsMEJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2IsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBLGNBQWE7QUFDYjtBQUNBLGNBQWE7QUFDYjtBQUNBLGNBQWE7QUFDYjtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTJCLG1DQUFtQztBQUM5RDtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3REFBdUQ7QUFDdkQsY0FBYTtBQUNiLHFGQUFvRjtBQUNwRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQXlCO0FBQ3pCO0FBQ0EsMEJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBb0Q7QUFDcEQsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBeUI7QUFDekI7QUFDQSwwQkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrS0FBaUs7QUFDaks7QUFDQTtBQUNBLFVBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBLEVBQUMiLCJmaWxlIjoianMvbWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpIHtcbiAgICBnZXRTaG93Q2FydEJ0bigpO1xuICAgIC8v6Lez6L2s6LSt54mp6L2mXG4gICAgJChcIiNnb190b19jYXJ0XCIpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGlmICghJC5jb29raWUoXCJ0cnV0aGlkXCIpIHx8ICEkLmNvb2tpZShcInVzZXJpZFwiKSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGxvZ2luLnNob3dQb3AoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9IFwiL2NhcnRcIjtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvL+i0reeJqei9puWIoOmZpOaTjeS9nFxuICAgICQoXCIjY2FydF9pdGVtX2NvbnRlbnRcIikuZGVsZWdhdGUoXCIuY2FydC1pdGVtLW9wcmVhdGlvblwiLCBcImNsaWNrXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHZhciAkdGFyZ2V0ID0gJChldmVudC50YXJnZXQpO1xuICAgICAgICB2YXIgaWQgPSAkdGFyZ2V0LmF0dHIoXCJkYXRhLWlkXCIpO1xuICAgICAgICB2YXIgdXJsID0gXCIvYXBpL3YyL2NhcnQvZGVsZXRlP2lkPVwiICsgaWQ7XG4gICAgICAgICRodHRwKHVybCkuZGVsZXRlKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgJHRhcmdldC5wYXJlbnRzKFwiLmNhcnQtbGlzdC1pdGVtXCIpLnJlbW92ZSgpO1xuICAgICAgICAgICAgdmFyIG51bSA9IHBhcnNlSW50KCQoXCIjY2FydF9pdGVtX2NvdW50XCIpLnRleHQoKSk7XG4gICAgICAgICAgICBpZiAobnVtID09PSAxKSB7XG4gICAgICAgICAgICAgICAgJChcIiNjYXJ0X2l0ZW1fY291bnRcIikuaGlkZSgpO1xuICAgICAgICAgICAgICAgICQoXCIjbm9fY2FydF9pdGVtXCIpLnNob3coKTtcbiAgICAgICAgICAgICAgICAkKFwiI2NhcnRfaXRlbV9saXN0XCIpLmhpZGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJChcIiNjYXJ0X2l0ZW1fY291bnRcIikudGV4dChudW0gLSAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgJChcIi5zcGVjaWFsLWxpc3RcIikuaG92ZXIoZnVuY3Rpb24oKSB7XG4gICAgICAgICQoXCIuc3BlY2lhbC1wcm9kdWN0XCIpLmNoaWxkcmVuKFwiYVwiKS5hZGRDbGFzcyhcInNwZWNpYWwtc2VsZWN0ZWRcIik7XG4gICAgfSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICQoXCIuc3BlY2lhbC1wcm9kdWN0XCIpLmNoaWxkcmVuKFwiYVwiKS5yZW1vdmVDbGFzcyhcInNwZWNpYWwtc2VsZWN0ZWRcIik7XG4gICAgfSk7XG4gICAgLy/liKTmlq3lvZPliY3pobXpnaLmmK/lkKbkuLrpppbpobXjgIHllYblk4Hor6bmg4XpobXjgIHmjInpnIDlrprliLbpobVcbiAgICB2YXIgY3VycmVudCA9IGxvY2F0aW9uLnBhdGhuYW1lO1xuICAgIHZhciBzaWRlYmFyQm94ID0gJChcIiNzaWRlYmFyX2lucHV0X2JveFwiKTtcbiAgICBpZiAoY3VycmVudCA9PT0gJy8nIHx8IGN1cnJlbnQgPT09ICcvcHJvZHVjdCcgfHwgY3VycmVudCA9PT0gJy9wcm9kdWN0L2N1c3RvbScpIHtcbiAgICAgICAgc2lkZWJhckJveC5zaG93KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc2lkZWJhckJveC5oaWRlKCk7XG4gICAgfVxuICAgICQoXCIjc2lkZWJhcl9jYWxsX2J0blwiKS5ob3ZlcihmdW5jdGlvbigpIHtcbiAgICAgICAgc2lkZWJhckJveC5zaG93KCk7XG4gICAgfSk7XG4gICAgJChcIiNzaWRlYmFyX2Nsb3NlXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICBzaWRlYmFyQm94LmhpZGUoKTtcbiAgICB9KTtcbiAgICAkKFwiI2NhbGxfcGhvbmVfc3VibWl0XCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY29udGFjdCA9ICQoXCIjY29udGFjdF9waG9uZV9pbnB1dFwiKS52YWwoKTtcbiAgICAgICAgaWYgKC9eKFtcXCtdWzAtOV17MSwzfShbIFxcLlxcLV0pPyk/KFtcXChdWzAtOV17MSw2fVtcXCldKT8oWzAtOSBcXC5cXC1dezEsMzJ9KSgoW0EtWmEteiBcXDpdezEsMTF9KT9bMC05XXsxLDR9PykkLy50ZXN0KGNvbnRhY3QpKSB7XG4gICAgICAgICAgICAkaHR0cCgnL2FwaS92Mi9vdGhlcnMvc3VibWl0LWNvbnRhY3QnKS5wb3N0KHsgY29udGFjdDogY29udGFjdCB9LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBhbGVydChcIueojeWQjuaCqOWwhuaOpeWIsOaIkeS7rOeahOeUteivne+8jOivpemAmuivneWvueaCqOWujOWFqOWFjei0ue+8jOivt+aUvuW/g+aOpeWQrO+8geaCqOS5n+WPr+S7pemAmui/h+eCueWHu+Wxj+W5leWPs+S+p+eahOKAnOiBlOezu+WuouacjeKAneaMiemSruebtOaOpVFR5Zyo57q/5ZKo6K+i44CCXCIpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFsZXJ0KFwi6K+35oKo6L6T5YWl5q2j56Gu55qE5Y+356CB77yM5omL5py65Y+356CB6K+355u05o6l6L6T5YWl77yM5bqn5py66K+35Yqg5Yy65Y+3XCIpO1xuICAgICAgICB9XG4gICAgfSk7XG59KSgpO1xuLy/pobnnm67kuK3nmoTlm77niYfpk77mjqVcbnRyeSB7XG4gICAgdmFyIElNR19MSU5LID0gcWluaXVDZG5Ib3N0ICsgJy8nO1xufSBjYXRjaCAoZSkge1xuICAgIHZhciBJTUdfTElOSyA9IFwiaHR0cDovLzd4c2V4Zy5jb20yLnowLmdsYi5xaW5pdWNkbi5jb20vXCI7XG59XG4vKiDojrflj5blj7PkuIrop5LotK3nianovabmlbDmja4gKi9cbmZ1bmN0aW9uIGdldFNob3dDYXJ0QnRuKCkge1xuICAgIGlmIChzaG93Q2FydCkge1xuICAgICAgICAkKFwiI3Nob3dDYXJ0QnRuXCIpLnNob3coKTtcbiAgICAgICAgLyog5Y+z5LiK6KeS6LSt54mp6L2m6I635Y+W5pWw5o2uICovXG4gICAgICAgICRodHRwKCcvYXBpL3YyL2NhcnQvYnJpZWYnKS5nZXQoZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgaWYgKGRhdGEuY291bnQgPiAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIGl0ZW1zID0gZGF0YS5pdGVtcztcbiAgICAgICAgICAgICAgICB2YXIgc3RyID0gJyc7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbXNbaV0uaXNfY3VzdG9tKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtc1tpXS5wcm9kdWN0VXJsID0gJy9jYXJ0JztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zW2ldLnByb2R1Y3RVcmwgPSAnL3Byb2R1Y3Q/aWQ9JyArIGl0ZW1zW2ldLnByb2R1Y3RfaWQgKyAnIycgKyBpdGVtc1tpXS5icmllZjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzdHIgKz0gJzxkaXYgY2xhc3M9XCJjYXJ0LWxpc3QtaXRlbVwiPjxkaXYgY2xhc3M9XCJjYXJ0LWl0ZW0tbGVmdFwiPjxhIGhyZWY9XCInICsgaXRlbXNbaV0ucHJvZHVjdFVybCArICdcIj4nO1xuICAgICAgICAgICAgICAgICAgICBzdHIgKz0gJzxpbWcgc3JjPVwiJyArIElNR19MSU5LICsgaXRlbXNbaV0uaW1hZ2Vfa2V5ICsgJz9pbWFnZVZpZXcyLzEvdy84MC9oLzgwL1wiPjwvYT48L2Rpdj48ZGl2IGNsYXNzPVwiY2FydC1pdGVtLWNlbnRlclwiPic7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtc1tpXS5pc19jdXN0b20pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ciArPSAnPGRpdiBjbGFzcz1cImNhcnQtaXRlbS1saW5lXCI+PHNwYW4gY2xhc3M9XCJjYXJ0LWl0ZW0tcmlnaHRcIj7lvoXlrpo8L3NwYW4+JztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ciArPSAnPGRpdiBjbGFzcz1cImNhcnQtaXRlbS1saW5lXCI+PHNwYW4gY2xhc3M9XCJjYXJ0LWl0ZW0tcmlnaHRcIj7vv6UnICsgcHJvY2Vzc0RhdGEucHJvY2Vzc1ByaWNlKGl0ZW1zW2ldLnByaWNlKSArICd4JyArIGl0ZW1zW2ldLnF1YW50aXR5ICsgJzwvc3Bhbj4nO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHN0ciArPSAnPGEgY2xhc3M9XCJjYXJ0LWl0ZW0tbmFtZVwiIGhyZWY9XCInICsgaXRlbXNbaV0ucHJvZHVjdFVybCArICdcIj4nICsgaXRlbXNbaV0udGl0bGUgKyAnPC9hPjwvZGl2Pic7XG4gICAgICAgICAgICAgICAgICAgIHN0ciArPSAnPGRpdiBjbGFzcz1cImNhcnQtaXRlbS1saW5lXCI+PGEgY2xhc3M9XCJjYXJ0LWl0ZW0tcmlnaHQgY2FydC1pdGVtLW9wcmVhdGlvblwiIGRhdGEtaWQ9XCInICsgaXRlbXNbaV0uaWQgKyAnXCI+5Yig6ZmkPC9hPic7XG4gICAgICAgICAgICAgICAgICAgIHN0ciArPSAnPGEgY2xhc3M9XCJjYXJ0LWl0ZW0tZGV0XCIgaHJlZj1cIicgKyBpdGVtc1tpXS5wcm9kdWN0VXJsICsgJ1wiPicgKyBpdGVtc1tpXS5icmllZiArICc8L2E+PC9kaXY+PC9kaXY+PC9kaXY+JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLyog5Y+z5LiK6KeS6LSt54mp6L2m5ZWG5ZOB5pWw6YeP5pyA5aSa5pi+56S6OTkgKi9cbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5jb3VudCA8IDEwMCkge1xuICAgICAgICAgICAgICAgICAgICAkKFwiI2NhcnRfaXRlbV9jb3VudFwiKS50ZXh0KGRhdGEuY291bnQpLnNob3coKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkKFwiI2NhcnRfaXRlbV9jb3VudFwiKS5odG1sKCc5OTxzdXA+Kzwvc3VwPicpLnNob3coKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJChcIiNub19jYXJ0X2l0ZW1cIikuaGlkZSgpO1xuICAgICAgICAgICAgICAgICQoXCIjY2FydF9pdGVtX2xpc3RcIikuc2hvdygpO1xuICAgICAgICAgICAgICAgICQoXCIjY2FydF9pdGVtX2NvbnRlbnRcIikuaHRtbChzdHIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKFwiI2NhcnRfaXRlbV9jb3VudFwiKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgJChcIiNub19jYXJ0X2l0ZW1cIikuc2hvdygpO1xuICAgICAgICAgICAgICAgICQoXCIjY2FydF9pdGVtX2xpc3RcIikuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkKFwiI3Nob3dDYXJ0QnRuXCIpLmhpZGUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldExpbmtQYXJhbShrZXkpIHtcbiAgICBpZiAobG9jYXRpb24ucGFyYW1zKSB7XG4gICAgICAgIHJldHVybiBsb2NhdGlvbi5wYXJhbXNba2V5XTtcbiAgICB9XG4gICAgbG9jYXRpb24ucGFyYW1zID0ge307XG4gICAgdmFyIHNlYXJjaCA9IGxvY2F0aW9uLnNlYXJjaC5zdWJzdHIoMSk7XG4gICAgdmFyIHBhcmFtQXJyID0gc2VhcmNoLnNwbGl0KFwiJlwiKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhcmFtQXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBwYXJhbSA9IHBhcmFtQXJyW2ldLnNwbGl0KFwiPVwiKTtcbiAgICAgICAgbG9jYXRpb24ucGFyYW1zW3BhcmFtWzBdXSA9IHBhcmFtWzFdO1xuICAgIH1cbiAgICByZXR1cm4gbG9jYXRpb24ucGFyYW1zW2tleV07XG59XG4vKlxuICAgIGFqYXjmlbDmja7kuqTkupJcbiAqL1xuZnVuY3Rpb24gJGh0dHAodXJsKSB7XG5cbiAgICAvLyBBIHNtYWxsIGV4YW1wbGUgb2Ygb2JqZWN0XG4gICAgdmFyIGNvcmUgPSB7XG4gICAgICAgIC8vIE1ldGhvZCB0aGF0IHBlcmZvcm1zIHRoZSBhamF4IHJlcXVlc3RcbiAgICAgICAgYWpheEdldDogZnVuY3Rpb24obWV0aG9kLCB1cmwsIGNhbGxiYWNrLCBhbGVydFdoZW5TdWNjZXNzKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgICAgIHR5cGU6IG1ldGhvZCxcbiAgICAgICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICAgICAgcHJvY2Vzc0RhdGE6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdC5yZXN1bHQgfHwgcmVzdWx0LnJlc3VsdCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2socmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhbGVydFdoZW5TdWNjZXNzID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc3VjY2Vzc0RlYWwocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmVycm9yRGVhbChlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBhamF4UG9zdDogZnVuY3Rpb24obWV0aG9kLCB1cmwsIGRhdGEsIGNhbGxiYWNrLCBhbGVydFdoZW5TdWNjZXNzKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgICAgIHR5cGU6IG1ldGhvZCxcbiAgICAgICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICAgICAgcHJvY2Vzc0RhdGE6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdC5yZXN1bHQgfHwgcmVzdWx0LnJlc3VsdCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2socmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhbGVydFdoZW5TdWNjZXNzID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc3VjY2Vzc0RlYWwocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmVycm9yRGVhbChlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBzdWNjZXNzRGVhbDogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgaWYgKGRhdGEucmVzdWx0ID09IDUpIHtcbiAgICAgICAgICAgICAgICBhbGVydChcIuivpei1hOa6kOS4jeWtmOWcqO+8gVwiKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5yZXN1bHQgPT0gNikge1xuICAgICAgICAgICAgICAgIGFsZXJ0KFwi5LiN5pSv5oyB6K+l5pON5L2c77yBXCIpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLnJlc3VsdCA9PSA4KSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoXCLmgqjmsqHmnInmnYPpmZDmk43kvZzvvIzor7fogZTns7vnrqHnkIblkZhcIik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEuZXJyb3JfbWVzc2FnZSkge1xuICAgICAgICAgICAgICAgIGFsZXJ0KGRhdGEuZXJyb3JfbWVzc2FnZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEucmVzdWx0ID09IDEwMTIpIHtcbiAgICAgICAgICAgICAgICBhbGVydChcIuaPkOS6pOmikeeOh+i/h+mrmO+8jOivt+eojeWQjuWGjeivlVwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoXCLlh7rplJnkuobvvIzor7fnqI3lkI7ph43or5VcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3JEZWFsOiBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIGlmIChlcnIuc3RhdHVzID09IDQwMykge1xuICAgICAgICAgICAgICAgIGFsZXJ0KFwi55So5oi36Lqr5Lu96aqM6K+B5aSx6LSlXCIpO1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSBcIi8jc2hvd0xvZ2luXCI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGVyci5zdGF0dXMgPT0gNTAzKSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoXCJPcHBz77yB6YWx5rK55pyN5Yqh5Zmo5q2j5Zyo57u05oqk5Lit77yM6K+36ICQ5b+D562J5b6F77yM5b6I5b+r5bCx5aW95ZOm77yBXCIpO1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSBcIi9cIjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoXCLlh7rplJnkuobvvIxcIiArIGVyci5zdGF0dXMgKyBlcnIuc3RhdHVzVGV4dCk7XG4gICAgICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9IFwiL1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH07XG5cbiAgICAvLyBBZGFwdGVyIHBhdHRlcm5cbiAgICByZXR1cm4ge1xuICAgICAgICAnZ2V0JzogZnVuY3Rpb24oY2FsbGJhY2ssIGFsZXJ0V2hlblN1Y2Nlc3MpIHtcbiAgICAgICAgICAgIHJldHVybiBjb3JlLmFqYXhHZXQoJ0dFVCcsIHVybCwgY2FsbGJhY2ssIGFsZXJ0V2hlblN1Y2Nlc3MpO1xuICAgICAgICB9LFxuICAgICAgICAnZGVsZXRlJzogZnVuY3Rpb24oY2FsbGJhY2ssIGFsZXJ0V2hlblN1Y2Nlc3MpIHtcbiAgICAgICAgICAgIHJldHVybiBjb3JlLmFqYXhHZXQoJ0RFTEVURScsIHVybCwgY2FsbGJhY2ssIGFsZXJ0V2hlblN1Y2Nlc3MpO1xuICAgICAgICB9LFxuICAgICAgICAncG9zdCc6IGZ1bmN0aW9uKGRhdGEsIGNhbGxiYWNrLCBhbGVydFdoZW5TdWNjZXNzKSB7XG4gICAgICAgICAgICByZXR1cm4gY29yZS5hamF4UG9zdCgnUE9TVCcsIHVybCwgZGF0YSwgY2FsbGJhY2ssIGFsZXJ0V2hlblN1Y2Nlc3MpO1xuICAgICAgICB9LFxuICAgICAgICAncHV0JzogZnVuY3Rpb24oZGF0YSwgY2FsbGJhY2ssIGFsZXJ0V2hlblN1Y2Nlc3MpIHtcbiAgICAgICAgICAgIHJldHVybiBjb3JlLmFqYXhQb3N0KCdQVVQnLCB1cmwsIGRhdGEsIGNhbGxiYWNrLCBhbGVydFdoZW5TdWNjZXNzKTtcbiAgICAgICAgfSxcbiAgICB9O1xufVxuLy/lpITnkIbku7fmoLzvvIzmta7ngrnmlbDovazmlbTmlbDjgIHmlbTmlbDovazmta7ngrnmlbBcbnZhciBwcm9jZXNzRGF0YSA9IHtcbiAgICAvLzM5LjAw5Y+Y5oiQMzkwMFxuICAgIHByb2Nlc3NSZWFsUHJvY2U6IGZ1bmN0aW9uKHMpIHtcbiAgICAgICAgaWYgKHMuaW5kZXhPZihcIi5cIikgPT0gLTEpIHtcbiAgICAgICAgICAgIHMgKz0gXCIuMDBcIjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgYXJyID0gcy5zcGxpdChcIi5cIik7XG4gICAgICAgIGlmIChhcnJbMV0ubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgIGFyclsxXSArPSBcIjBcIlxuICAgICAgICB9IGVsc2UgaWYgKGFyclsxXS5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgICBhcnJbMV0gPSBhcnJbMV0uc3Vic3RyKDAsIDIpXG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNob3cgPSBhcnIuam9pbihcIlwiKTtcbiAgICAgICAgcmV0dXJuIHNob3cgKiAxO1xuICAgIH0sXG4gICAgLy8zOTAw5Y+Y5oiQMzkuMDBcbiAgICBwcm9jZXNzUHJpY2U6IGZ1bmN0aW9uKHApIHtcbiAgICAgICAgdmFyIHN0ciA9IHAgKyBcIlwiO1xuICAgICAgICB2YXIgYXJyID0gc3RyLnNwbGl0KFwiXCIpO1xuICAgICAgICBpZiAoYXJyLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgYXJyLnVuc2hpZnQoXCIwXCIsIFwiMFwiKTtcbiAgICAgICAgfSBlbHNlIGlmIChhcnIubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICBhcnIudW5zaGlmdChcIjBcIik7XG4gICAgICAgIH1cbiAgICAgICAgYXJyLnNwbGljZShhcnIubGVuZ3RoIC0gMiwgMCwgXCIuXCIpO1xuICAgICAgICB2YXIgcmVhbCA9IGFyci5qb2luKFwiXCIpO1xuICAgICAgICByZXR1cm4gcmVhbDtcbiAgICB9LFxufTtcblxuZnVuY3Rpb24gY2FsY3VsYXRlVG90YWwoYW1vdW50LCBmcmVpZ2h0LCBpc19wcmljZWQpIHtcbiAgICB2YXIgdG90YWwgPSAnJztcbiAgICBpZiAoaXNfcHJpY2VkKSB7XG4gICAgICAgIGlmIChhbW91bnQgPiAyMDAwMCkge1xuICAgICAgICAgICAgdG90YWwgPSBwcm9jZXNzRGF0YS5wcm9jZXNzUHJpY2UoYW1vdW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRvdGFsID0gcHJvY2Vzc0RhdGEucHJvY2Vzc1ByaWNlKGFtb3VudCArIGZyZWlnaHQpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdG90YWwgPSBwcm9jZXNzRGF0YS5wcm9jZXNzUHJpY2UoYW1vdW50KSArICcr77yfJztcbiAgICB9XG4gICAgcmV0dXJuIHRvdGFsO1xufVxuRGF0ZS5wcm90b3R5cGUuZGF0ZUZvcm1hdCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciB5ID0gdGhpcy5nZXRGdWxsWWVhcigpO1xuICAgIHZhciBtID0gU3RyaW5nKHRoaXMuZ2V0TW9udGgoKSArIDEpO1xuICAgIHZhciBkID0gU3RyaW5nKHRoaXMuZ2V0RGF0ZSgpKTtcbiAgICB2YXIgSCA9IHRoaXMuZ2V0SG91cnMoKTtcbiAgICB2YXIgTSA9IHRoaXMuZ2V0TWludXRlcygpO1xuICAgIHZhciBTID0gdGhpcy5nZXRTZWNvbmRzKCk7XG4gICAgdmFyIGggPSBTdHJpbmcoSCk7XG4gICAgdmFyIGkgPSBTdHJpbmcoTSk7XG4gICAgdmFyIHMgPSBTdHJpbmcoUyk7XG4gICAgaWYgKG0ubGVuZ3RoID09IDEpIHtcbiAgICAgICAgbSA9IFwiMFwiICsgbTtcbiAgICB9XG4gICAgaWYgKGQubGVuZ3RoID09IDEpIHtcbiAgICAgICAgZCA9IFwiMFwiICsgZDtcbiAgICB9XG4gICAgaWYgKGgubGVuZ3RoID09IDEpIHtcbiAgICAgICAgaCA9IFwiMFwiICsgaDtcbiAgICB9XG4gICAgaWYgKGkubGVuZ3RoID09IDEpIHtcbiAgICAgICAgaSA9IFwiMFwiICsgaTtcbiAgICB9XG4gICAgaWYgKHMubGVuZ3RoID09IDEpIHtcbiAgICAgICAgcyA9IFwiMFwiICsgcztcbiAgICB9XG4gICAgdmFyIGZvcm1hdCA9IHkgKyBcIi1cIiArIG0gKyBcIi1cIiArIGQgKyBcIiBcIiArIGggKyBcIjpcIiArIGkgKyBcIjpcIiArIHM7XG4gICAgcmV0dXJuIGZvcm1hdDtcbn07XG4vL+WIhumhteaPkuS7tlxuKGZ1bmN0aW9uKCQsIHdpbmRvdywgZG9jdW1lbnQsIHVuZGVmaW5lZCkge1xuICAgIHZhciBQYWdpbmF0aW9uID0gZnVuY3Rpb24oZWxlLCBvcHQpIHtcbiAgICAgICAgdGhpcy4kZWxlbWVudCA9IGVsZTtcbiAgICAgICAgdGhpcy5kZWZhdWx0cyA9IHtcbiAgICAgICAgICAgIGNvdW50OiAwLFxuICAgICAgICAgICAgcGFnZVNpemU6IDE1XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMub3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCB0aGlzLmRlZmF1bHRzLCBvcHQpO1xuICAgICAgICAvL+aAu+mhteaVsFxuICAgICAgICB0aGlzLnRvdGFsUGFnZSA9IDA7XG4gICAgICAgIC8v5b2T5YmN6aG156CB77yM6buY6K6k5Li6MVxuICAgICAgICB0aGlzLnBhZ2VJbmRleCA9IDE7XG4gICAgICAgIC8v572R6aG16ZO+5o6lXG4gICAgICAgIHRoaXMubG9jYXRpb24gPSB3aW5kb3cubG9jYXRpb24udmFsdWVPZigpXG4gICAgfVxuXG4gICAgUGFnaW5hdGlvbi5wcm90b3R5cGUgPSB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5jb3VudCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy50b3RhbFBhZ2UgPSBNYXRoLmNlaWwodGhpcy5vcHRpb25zLmNvdW50IC8gdGhpcy5vcHRpb25zLnBhZ2VTaXplKTtcbiAgICAgICAgICAgIGlmIChpc05hTih0aGlzLnRvdGFsUGFnZSkgfHwgdGhpcy50b3RhbFBhZ2UgPD0gMSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBzZWFyY2ggPSB0aGlzLmxvY2F0aW9uLnNlYXJjaC5zdWJzdHIoMSk7XG4gICAgICAgICAgICB0aGlzLmxvY2F0aW9uLnBhcmFtQXJyID0gc2VhcmNoLnNwbGl0KFwiJlwiKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sb2NhdGlvbi5wYXJhbUFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxvY2F0aW9uLnBhcmFtQXJyW2ldLmluZGV4T2YoXCJwYWdlXCIpID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2NhdGlvbi5pID0gaTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdlSW5kZXggPSAxICogKHRoaXMubG9jYXRpb24ucGFyYW1BcnJbaV0uc3BsaXQoXCI9XCIpWzFdKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvY2F0aW9uLmkgPSB0aGlzLmxvY2F0aW9uLnBhcmFtQXJyLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5wYWdlSW5kZXggPiB0aGlzLnRvdGFsUGFnZSkge1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSB0aGlzLnNldExpbmsoMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNldFBhZ2luYXRpb24oKTtcbiAgICAgICAgfSxcbiAgICAgICAgLy/orr7nva7liIbpobXmjInpkq7nmoTpk77mjqVcbiAgICAgICAgc2V0TGluazogZnVuY3Rpb24obnVtKSB7XG4gICAgICAgICAgICB2YXIgaSA9IHRoaXMubG9jYXRpb24uaTtcbiAgICAgICAgICAgIGlmIChpID09PSB0aGlzLmxvY2F0aW9uLnBhcmFtQXJyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9jYXRpb24ucGFyYW1BcnJbaV0gPSBcInBhZ2U9XCIgKyBudW07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubG9jYXRpb24ucGFyYW1BcnJbdGhpcy5sb2NhdGlvbi5pXSA9IFwicGFnZT1cIiArIG51bTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBocmVmID0gdGhpcy5sb2NhdGlvbi5wYXRobmFtZSArIFwiP1wiICsgdGhpcy5sb2NhdGlvbi5wYXJhbUFyci5qb2luKFwiJlwiKTtcbiAgICAgICAgICAgIHJldHVybiBocmVmO1xuICAgICAgICB9LFxuICAgICAgICAvL+aYvuekuuWIhumhtVxuICAgICAgICBzZXRQYWdpbmF0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBwYWdpbmF0aW9uID0gJChcIiNzaG93X3BhZ2luYXRpb25cIik7XG4gICAgICAgICAgICB2YXIgc3RyID0gXCJcIjtcbiAgICAgICAgICAgIC8v5b2T5YmN6aG15Li656ys5LiA6aG177yM5YiZ5YmN5LiA6aG15LiN6IO954K55Ye7XG4gICAgICAgICAgICBpZiAodGhpcy5wYWdlSW5kZXggPT0gMSkge1xuICAgICAgICAgICAgICAgIHN0ciA9IFwiPHVsPjxsaSBjbGFzcz0nZGlzYWJsZWQnPjxhPiZsdDs8L2E+PC9saT5cIjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3RyID0gXCI8dWw+PGxpPjxhIGhyZWY9XCIgKyB0aGlzLnNldExpbmsodGhpcy5wYWdlSW5kZXggLSAxKSArIFwiPiZsdDs8L2E+PC9saT5cIjtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wYWdlSW5kZXggPiAyKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0ciArPSBcIjxsaT48YSBocmVmPVwiICsgdGhpcy5zZXRMaW5rKDEpICsgXCI+MTwvYT48L2xpPlwiO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wYWdlSW5kZXggPiAzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wYWdlSW5kZXggPT0gdGhpcy50b3RhbFBhZ2UgJiYgdGhpcy5wYWdlSW5kZXggLSAyID09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHIgKz0gXCI8bGk+PGEgaHJlZj1cIiArIHRoaXMuc2V0TGluayh0aGlzLnBhZ2VJbmRleCAtIDIpICsgXCI+XCIgKyAodGhpcy5wYWdlSW5kZXggLSAyKSArIFwiPC9hPjwvbGk+XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucGFnZUluZGV4ID09IHRoaXMudG90YWxQYWdlICYmIHRoaXMucGFnZUluZGV4IC0gMiAhPSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyICs9IFwiPGxpPi4uLjwvbGk+PGxpPjxhIGhyZWY9XCIgKyB0aGlzLnNldExpbmsodGhpcy5wYWdlSW5kZXggLSAyKSArIFwiPlwiICsgKHRoaXMucGFnZUluZGV4IC0gMikgKyBcIjwvYT48L2xpPlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHIgKz0gXCI8bGk+Li4uPC9saT5cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdHIgKz0gXCI8bGk+PGEgaHJlZj1cIiArIHRoaXMuc2V0TGluayh0aGlzLnBhZ2VJbmRleCAtIDEpICsgXCI+XCIgKyAodGhpcy5wYWdlSW5kZXggLSAxKSArIFwiPC9hPjwvbGk+XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdHIgKz0gXCI8bGkgY2xhc3M9J2FjdGl2ZSc+PGE+XCIgKyB0aGlzLnBhZ2VJbmRleCArIFwiPC9hPjwvbGk+XCI7XG4gICAgICAgICAgICBpZiAodGhpcy5wYWdlSW5kZXggPT0gdGhpcy50b3RhbFBhZ2UpIHtcbiAgICAgICAgICAgICAgICBzdHIgKz0gXCI8bGkgY2xhc3M9J2Rpc2FibGVkJz48YT4mZ3Q7PC9hPjwvbGk+PC91bD5cIjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGFnZUluZGV4IDwgdGhpcy50b3RhbFBhZ2UgLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0ciArPSBcIjxsaT48YSBocmVmPVwiICsgdGhpcy5zZXRMaW5rKHRoaXMucGFnZUluZGV4ICsgMSkgKyBcIj5cIiArICh0aGlzLnBhZ2VJbmRleCArIDEpICsgXCI8L2E+PC9saT5cIjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGFnZUluZGV4IDwgdGhpcy50b3RhbFBhZ2UgLSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wYWdlSW5kZXggPT0gMSAmJiB0aGlzLnBhZ2VJbmRleCArIDIgPT0gdGhpcy50b3RhbFBhZ2UgLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyICs9IFwiPGxpPjxhIGhyZWY9XCIgKyB0aGlzLnNldExpbmsoMykgKyBcIj5cIiArICgzKSArIFwiPC9hPjwvbGk+XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucGFnZUluZGV4ID09IDEgJiYgdGhpcy5wYWdlSW5kZXggKyAyICE9PSB0aGlzLnRvdGFsUGFnZSAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHIgKz0gXCI8bGk+PGEgaHJlZj1cIiArIHRoaXMuc2V0TGluaygzKSArIFwiPlwiICsgKDMpICsgXCI8L2E+PC9saT48bGk+Li4uPC9saT5cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyICs9IFwiPGxpPi4uLjwvbGk+XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3RyICs9IFwiPGxpPjxhIGhyZWY9XCIgKyB0aGlzLnNldExpbmsodGhpcy50b3RhbFBhZ2UpICsgXCI+XCIgKyB0aGlzLnRvdGFsUGFnZSArIFwiPC9hPjwvbGk+PGxpPjxhIGhyZWY9XCIgKyB0aGlzLnNldExpbmsodGhpcy5wYWdlSW5kZXggKyAxKSArIFwiPiZndDs8L2E+PC9saT48L3VsPlwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy4kZWxlbWVudC5odG1sKHN0cik7XG4gICAgICAgIH0sXG4gICAgfVxuXG4gICAgJC5mbi5wYWdpbmF0aW9uID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHBhZyA9IG5ldyBQYWdpbmF0aW9uKCQodGhpcyksIG9wdGlvbnMpO1xuICAgICAgICAgICAgcmV0dXJuIHBhZy5pbml0KCk7XG4gICAgICAgIH0pXG4gICAgfVxufSkoalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50KTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvbWFpbi5qc1xuICoqIG1vZHVsZSBpZCA9IDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMTFcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9