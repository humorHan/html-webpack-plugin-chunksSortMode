webpackJsonp([17,19],[
/* 0 */
/***/ function(module, exports) {

	(function() {
	    addOption.bindEvent();
	    imgZoom.bindEvent();
	    /*
	        判断是否有维度的参数
	     */
	    var selectStr = decodeURI(location.hash.substr(1));
	    if (!selectStr) {
	        initSelected();
	    } else {
	        changeProductItem(selectStr);
	    }
	    getRecommdProduct();
	    //修改维度事件
	    $(".vals").delegate(".val", "click", function(event) {
	        var target = event.target;
	        if (target.className.indexOf('dis') !== -1) {
	            return;
	        }
	        var vals = target.parentNode;
	        $(vals).find(".val").removeClass("sel");
	        $(target).addClass("sel");
	        var queryStr = getProductItem();
	        changeProductPrice(queryStr);
	        changeNonOption(queryStr);
	    });
	    //添加购物车
	    $("#add_to_cart").click(function() {
	        var truthId = $.cookie("truthid");
	        var userId = $.cookie("userid");
	        if (!truthId || !userId) {
	            login.showPop(function() {
	                addToCart();
	            })
	        } else {
	            addToCart();
	        }
	    });
	    $(".custom-input").keyup(function(e) {
	        var type = $(this).attr('data-type');
	        var value = $(this).attr('data-value');
	        var current = value;
	        if ($(this).attr('data-current') !== undefined) {
	            current = $(this).attr('data-current');
	        }
	        if (e.key == 'Backspace') {
	            $(this).parents(".customs").removeClass("ok");
	            $(this).attr('data-current', $(this).val());
	            current = $(this).val();
	        } else {
	            if (type === 'int') {
	                if (/[0-9]/.test(e.key)) {
	                    $(this).parents(".customs").removeClass("ok");
	                    $(this).attr('data-current', $(this).val());
	                    current = $(this).val();
	                } else {
	                    $(this).val(current);
	                }
	            } else if (type === 'float') {
	                if (/[0-9|.]/.test(e.key)) {
	                    $(this).parents(".customs").removeClass("ok");
	                    $(this).attr('data-current', $(this).val());
	                    current = $(this).val();
	                } else {
	                    $(this).val(current);
	                }
	            } else {
	                if (e.key !== " ") {
	
	                }
	                $(this).parents(".customs").removeClass("ok");
	                $(this).attr('data-current', $(this).val());
	                current = $(this).val();
	            }
	        }
	    });
	    $(".confirm-btn").click(function() {
	        if ($(this).parents(".customs").hasClass('ok')) {
	            return;
	        }
	        var input = $(this).parents(".customs").find('.custom-input');
	        for (var i = 0; i < input.length; i++) {
	            if (!checkInput(input[i])) {
	                return;
	            } else {
	                $(input[i]).attr("data-value", $(input[i]).val());
	            }
	        }
	        $(this).parents(".customs").addClass('ok');
	        getCustomPrice();
	
	    });
	    //获取自定义属性的值
	    function getCustomValues() {
	        var custom = $(".product-body").children('.product-custom');
	        var fields = [];
	        for (var i = 0; i < custom.length; i++) {
	            var name = $(custom[i]).find(".attr").text();
	            name = name.substr(0, name.length - 1);
	            var values = [];
	            var isOk = $(custom[i]).find('.customs').hasClass("ok");
	            var inputs = $(custom[i]).find('.custom-input');
	            for (var j = 0; j < inputs.length; j++) {
	                if (isOk) {
	                    values.push($(inputs[j]).val());
	                } else {
	                    values.push($(inputs[j]).attr('data-value'));
	                }
	            }
	            fields.push({
	                name: name,
	                values: values
	            });
	        }
	        return fields;
	    }
	
	    function checkInput(node) {
	        var isNeed = $(node).parents('.product-custom').attr('data-need');
	        var type = $(node).attr('data-type');
	        var max = parseFloat($(node).attr('data-max'));
	        var min = parseFloat($(node).attr('data-min'));
	        var value = $.trim($(node).val());
	        var tag = $(node).prev().text();
	        if (!value && isNeed === 'false') {
	            $(node).val(value);
	            return true;
	        } else {
	            if (!value) {
	                $("#error_tip").text('请填写' + tag).show();
	                setTimeout(function() {
	                    $("#error_tip").hide();
	                }, 2000);
	                return false;
	            }
	            if (type === "int") {
	                max = parseInt(max);
	                min = parseInt(min);
	                value = parseInt(value);
	                if (value > max) {
	                    $("#error_tip").text(tag + "不能大于" + max).show();
	                    setTimeout(function() {
	                        $("#error_tip").hide();
	                    }, 2000);
	                    return false;
	                } else if (value < min) {
	                    $("#error_tip").text(tag + "不能小于" + min).show();
	                    setTimeout(function() {
	                        $("#error_tip").hide();
	                    }, 2000);
	                    return false;
	                } else {
	                    $(node).val(value);
	                    return true;
	                }
	            } else if (type === "float") {
	                value = parseFloat(value);
	                if (value > max) {
	                    $("#error_tip").text(tag + "不能大于" + max).show();
	                    setTimeout(function() {
	                        $("#error_tip").hide();
	                    }, 2000);
	                    return false;
	                } else if (value < min) {
	                    $("#error_tip").text(tag + "不能小于" + min).show();
	                    setTimeout(function() {
	                        $("#error_tip").hide();
	                    }, 2000);
	                    return false;
	                } else {
	                    if ((value + "").indexOf('.') === -1) {
	                        value += ".0";
	                    }
	                    $(node).val(value);
	                    return true;
	                }
	            } else {
	                max = parseInt(max);
	                min = parseInt(min);
	                if (value.length > max) {
	                    $("#error_tip").text(tag + "字数不能超过" + max).show();
	                    setTimeout(function() {
	                        $("#error_tip").hide();
	                    }, 2000);
	                    return false;
	                } else if (value.length < min) {
	                    $("#error_tip").text(tag + "字数不能少于" + min).show();
	                    setTimeout(function() {
	                        $("#error_tip").hide();
	                    }, 2000);
	                    return false;
	                } else {
	                    $(node).val(value);
	                    return true;
	                }
	            }
	        }
	    }
	
	    function getRecommdProduct() {
	        var IMG_LINK = 'http://source.soyyin.com/';
	        var recommds = [{
	            id: 12,
	            img_key: 'shoutidai_rexiao.png',
	            name: '手提袋',
	            brief: '每一个都是您的移动广告'
	        }, {
	            id: 15,
	            img_key: 'huace_rexiao.png',
	            name: '画册',
	            brief: '企业品牌形象经典展现'
	        }, {
	            id: 11,
	            img_key: 'zheye_rexiao.png',
	            name: '折页',
	            brief: '能让客户主动带走的纸'
	        }, {
	            id: 34,
	            img_key: 'buganjiaotie_rexiao.png ',
	            name: '不干胶贴',
	            brief: '短小精悍神通广大'
	        }, {
	            id: 26,
	            img_key: 'tshirt_rexiao.png',
	            name: '文化衫',
	            brief: '团队建设的不二之选'
	        }, {
	            id: 27,
	            img_key: 'fanbudai_rexiao.png',
	            name: '帆布袋',
	            brief: '环保时尚经久耐用'
	        }, ];
	        var lists = '';
	        for (var i = 0; i < recommds.length; i++) {
	            lists += '<li class="product-recommend-item"><a href="/product?id=' + recommds[i].id + '">';
	            lists += '<img src="' + IMG_LINK + recommds[i].img_key + '"><p class="product-recommend-title">';
	            lists += '<span class="product-recommend-title-right">' + recommds[i].brief + '</span>';
	            lists += '<span class="product-recommend-title-left">' + recommds[i].name + '</span></p></a></li>';
	        }
	        $(".product-recommend-list").html(lists);
	    }
	
	    function addToCart() {
	        var custom = $(".product-body").children('.product-custom');
	        for (var i = 0; i < custom.length; i++) {
	            var input = $(custom[i]).find('.custom-input');
	            for (var j = 0; j < input.length; j++) {
	                if (!checkInput(input[j])) {
	                    return;
	                } else {
	                    $(input[j]).attr("data-value", $(input[j]).val());
	                }
	            }
	            if (!$(custom[i]).find('.customs').hasClass("ok")) {
	                popUp.showPop("#no_confirm");
	                return;
	            }
	        }
	        var url = "/api/v2/cart/add";
	        var data = {
	            price_id: $("#add_to_cart").attr("data-id") * 1,
	            quantity: $("#product_num").val() * 1,
	            fields: getCustomValues(),
	        }
	        $http(url).post(data, function(result) {
	            popUp.showPop("#add_cart");
	            /* 商品成功加入购物车后，右上角购物车数据刷新 */
	            $("#add_cart .no-stay").click(function() {
	                getShowCartBtn();
	            })
	            $("#add_cart .close").click(function() {
	                getShowCartBtn();
	            })
	        })
	    }
	
	    //缺省项维度置为不可点击
	    function changeNonOption(queryStr) {
	        var dimension = $(".product-body").children('.product-type');
	        for (var i = 0; i < dimension.length - 1; i++) {
	            var options = $(dimension[i]).find(".vals").children();
	            for (var j = 0; j < options.length; j++) {
	                var arr = queryStr.split('_');
	                arr[i] = $(options[j]).attr("value");
	                var newStr = arr.join('_');
	                if (productMap[newStr]) {
	                    $(options[j]).removeClass('dis').addClass('val');
	                } else {
	                    $(options[j]).removeClass('val').addClass('dis');
	                }
	            }
	        }
	    }
	    //首次加载选中维度的第一项
	    function initSelected() {
	        var vals = $(".vals");
	        $(".vals .val").removeClass("sel");
	        for (var i = 0; i < vals.length - 1; i++) {
	            var first = $($(vals[i]).children("a")[0]);
	            first.addClass("sel");
	        }
	        var queryStr = getProductItem();
	        changeProductPrice(queryStr);
	        changeNonOption(queryStr);
	    }
	    //把选中的维度拼接成字符串
	    function getProductItem() {
	        var allSelect = $(".vals .sel");
	        var queryArr = [];
	        for (var i = 0; i < allSelect.length; i++) {
	            queryArr.push($(allSelect[i]).text());
	        }
	        var queryStr = queryArr.join("_");
	        return queryStr;
	    }
	    //根据选中的维度修改价格和图片
	    function changeProductPrice(queryStr) {
	        var item = productMap[queryStr];
	        if (item) {
	            // $("#product_price").text(processData.processPrice(item.price));
	            $("#product_num").attr("min-num", item.min_num).val(item.min_num);
	            if (item.max_num) {
	                $("#product_num").attr("max-num", item.max_num);
	            }
	            $("#add_to_cart").attr("data-id", item.id);
	            var lis = '';
	            for (var i = 0; i < item.image_keys.length; i++) {
	                lis += '<li><img src="' + IMG_LINK + item.image_keys[i] + '"></li>';
	            }
	            $("#imageList").html(lis);
	            imgZoom.showImg();
	            getCustomPrice();
	            return item.id;
	        } else {
	            popUp.showPop("#no_product");
	            $(".modal-foot .right").click(function(event) {
	                popUp.hidePop("#no_product");
	                initSelected();
	            });
	            $(".modal-layer").click(function() {
	                initSelected();
	            })
	        }
	    }
	    //根据拼接维度字符串修改维度
	    function changeProductItem(selectStr) {
	        var selectArr = selectStr.split("_");
	        var allItem = $(".vals .val");
	        allItem.removeClass("sel");
	        var itemArr = [];
	        var items = $(".product-body").children(".product-item");
	        for (var i = 0; i < items.length; i++) {
	            if ($(items[i]).hasClass("product-type")) {
	                allItem.filter("a[value='" + selectArr[i] + "']").addClass("sel");
	                itemArr.push(selectArr[i]);
	            } else {
	                var inputs = $(items[i]).find('.custom-input');
	                if (inputs.length > 1) {
	                    selectArr[i] = selectArr[i].split("*");
	                    for (var j = 0; j < inputs.length; j++) {
	                        $(inputs[j]).attr('data-current', selectArr[i][j]);
	                        $(inputs[j]).val(selectArr[i][j]);
	                    }
	                } else {
	                    $(inputs).attr('data-current', selectArr[i]);
	                    $(inputs).val(selectArr[i]);
	                }
	
	            }
	        }
	        var itemStr = itemArr.join('_');
	        changeProductPrice(itemStr);
	        changeNonOption(itemStr);
	    }
	
	    function getCustomPrice() {
	        var url = "/api/v2/products/new-price";
	        var data = {
	            price_id: $("#add_to_cart").attr("data-id") * 1,
	            fields: getCustomValues(),
	        }
	        $http(url).post(data, function(result) {
	            $("#product_price").text(processData.processPrice(result.price));
	        })
	    }
	})()


/***/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvcHJvZHVjdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYixVQUFTO0FBQ1Q7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsY0FBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXVCLGtCQUFrQjtBQUN6QztBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXVCLG1CQUFtQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTJCLG1CQUFtQjtBQUM5QztBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUI7QUFDckI7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCO0FBQ3JCO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCO0FBQ3JCO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQjtBQUNyQjtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCO0FBQ3JCO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQjtBQUNyQjtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQSx3QkFBdUIscUJBQXFCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3QkFBdUIsbUJBQW1CO0FBQzFDO0FBQ0EsNEJBQTJCLGtCQUFrQjtBQUM3QztBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSxjQUFhO0FBQ2IsVUFBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdCQUF1QiwwQkFBMEI7QUFDakQ7QUFDQSw0QkFBMkIsb0JBQW9CO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXVCLHFCQUFxQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUEyQiw0QkFBNEI7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXVCLGtCQUFrQjtBQUN6QztBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0Esb0NBQW1DLG1CQUFtQjtBQUN0RDtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsRUFBQyIsImZpbGUiOiJqcy9wcm9kdWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCkge1xuICAgIGFkZE9wdGlvbi5iaW5kRXZlbnQoKTtcbiAgICBpbWdab29tLmJpbmRFdmVudCgpO1xuICAgIC8qXG4gICAgICAgIOWIpOaWreaYr+WQpuaciee7tOW6pueahOWPguaVsFxuICAgICAqL1xuICAgIHZhciBzZWxlY3RTdHIgPSBkZWNvZGVVUkkobG9jYXRpb24uaGFzaC5zdWJzdHIoMSkpO1xuICAgIGlmICghc2VsZWN0U3RyKSB7XG4gICAgICAgIGluaXRTZWxlY3RlZCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNoYW5nZVByb2R1Y3RJdGVtKHNlbGVjdFN0cik7XG4gICAgfVxuICAgIGdldFJlY29tbWRQcm9kdWN0KCk7XG4gICAgLy/kv67mlLnnu7Tluqbkuovku7ZcbiAgICAkKFwiLnZhbHNcIikuZGVsZWdhdGUoXCIudmFsXCIsIFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgaWYgKHRhcmdldC5jbGFzc05hbWUuaW5kZXhPZignZGlzJykgIT09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHZhbHMgPSB0YXJnZXQucGFyZW50Tm9kZTtcbiAgICAgICAgJCh2YWxzKS5maW5kKFwiLnZhbFwiKS5yZW1vdmVDbGFzcyhcInNlbFwiKTtcbiAgICAgICAgJCh0YXJnZXQpLmFkZENsYXNzKFwic2VsXCIpO1xuICAgICAgICB2YXIgcXVlcnlTdHIgPSBnZXRQcm9kdWN0SXRlbSgpO1xuICAgICAgICBjaGFuZ2VQcm9kdWN0UHJpY2UocXVlcnlTdHIpO1xuICAgICAgICBjaGFuZ2VOb25PcHRpb24ocXVlcnlTdHIpO1xuICAgIH0pO1xuICAgIC8v5re75Yqg6LSt54mp6L2mXG4gICAgJChcIiNhZGRfdG9fY2FydFwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHRydXRoSWQgPSAkLmNvb2tpZShcInRydXRoaWRcIik7XG4gICAgICAgIHZhciB1c2VySWQgPSAkLmNvb2tpZShcInVzZXJpZFwiKTtcbiAgICAgICAgaWYgKCF0cnV0aElkIHx8ICF1c2VySWQpIHtcbiAgICAgICAgICAgIGxvZ2luLnNob3dQb3AoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYWRkVG9DYXJ0KCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWRkVG9DYXJ0KCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAkKFwiLmN1c3RvbS1pbnB1dFwiKS5rZXl1cChmdW5jdGlvbihlKSB7XG4gICAgICAgIHZhciB0eXBlID0gJCh0aGlzKS5hdHRyKCdkYXRhLXR5cGUnKTtcbiAgICAgICAgdmFyIHZhbHVlID0gJCh0aGlzKS5hdHRyKCdkYXRhLXZhbHVlJyk7XG4gICAgICAgIHZhciBjdXJyZW50ID0gdmFsdWU7XG4gICAgICAgIGlmICgkKHRoaXMpLmF0dHIoJ2RhdGEtY3VycmVudCcpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGN1cnJlbnQgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtY3VycmVudCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlLmtleSA9PSAnQmFja3NwYWNlJykge1xuICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnRzKFwiLmN1c3RvbXNcIikucmVtb3ZlQ2xhc3MoXCJva1wiKTtcbiAgICAgICAgICAgICQodGhpcykuYXR0cignZGF0YS1jdXJyZW50JywgJCh0aGlzKS52YWwoKSk7XG4gICAgICAgICAgICBjdXJyZW50ID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0eXBlID09PSAnaW50Jykge1xuICAgICAgICAgICAgICAgIGlmICgvWzAtOV0vLnRlc3QoZS5rZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50cyhcIi5jdXN0b21zXCIpLnJlbW92ZUNsYXNzKFwib2tcIik7XG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuYXR0cignZGF0YS1jdXJyZW50JywgJCh0aGlzKS52YWwoKSk7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICQodGhpcykudmFsKGN1cnJlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2Zsb2F0Jykge1xuICAgICAgICAgICAgICAgIGlmICgvWzAtOXwuXS8udGVzdChlLmtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnRzKFwiLmN1c3RvbXNcIikucmVtb3ZlQ2xhc3MoXCJva1wiKTtcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKCdkYXRhLWN1cnJlbnQnLCAkKHRoaXMpLnZhbCgpKTtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudCA9ICQodGhpcykudmFsKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS52YWwoY3VycmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoZS5rZXkgIT09IFwiIFwiKSB7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnRzKFwiLmN1c3RvbXNcIikucmVtb3ZlQ2xhc3MoXCJva1wiKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoJ2RhdGEtY3VycmVudCcsICQodGhpcykudmFsKCkpO1xuICAgICAgICAgICAgICAgIGN1cnJlbnQgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgJChcIi5jb25maXJtLWJ0blwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCQodGhpcykucGFyZW50cyhcIi5jdXN0b21zXCIpLmhhc0NsYXNzKCdvaycpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGlucHV0ID0gJCh0aGlzKS5wYXJlbnRzKFwiLmN1c3RvbXNcIikuZmluZCgnLmN1c3RvbS1pbnB1dCcpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGlucHV0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoIWNoZWNrSW5wdXQoaW5wdXRbaV0pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKGlucHV0W2ldKS5hdHRyKFwiZGF0YS12YWx1ZVwiLCAkKGlucHV0W2ldKS52YWwoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgJCh0aGlzKS5wYXJlbnRzKFwiLmN1c3RvbXNcIikuYWRkQ2xhc3MoJ29rJyk7XG4gICAgICAgIGdldEN1c3RvbVByaWNlKCk7XG5cbiAgICB9KTtcbiAgICAvL+iOt+WPluiHquWumuS5ieWxnuaAp+eahOWAvFxuICAgIGZ1bmN0aW9uIGdldEN1c3RvbVZhbHVlcygpIHtcbiAgICAgICAgdmFyIGN1c3RvbSA9ICQoXCIucHJvZHVjdC1ib2R5XCIpLmNoaWxkcmVuKCcucHJvZHVjdC1jdXN0b20nKTtcbiAgICAgICAgdmFyIGZpZWxkcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGN1c3RvbS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIG5hbWUgPSAkKGN1c3RvbVtpXSkuZmluZChcIi5hdHRyXCIpLnRleHQoKTtcbiAgICAgICAgICAgIG5hbWUgPSBuYW1lLnN1YnN0cigwLCBuYW1lLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgICAgICAgICAgdmFyIGlzT2sgPSAkKGN1c3RvbVtpXSkuZmluZCgnLmN1c3RvbXMnKS5oYXNDbGFzcyhcIm9rXCIpO1xuICAgICAgICAgICAgdmFyIGlucHV0cyA9ICQoY3VzdG9tW2ldKS5maW5kKCcuY3VzdG9tLWlucHV0Jyk7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGlucHV0cy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGlmIChpc09rKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKCQoaW5wdXRzW2pdKS52YWwoKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzLnB1c2goJChpbnB1dHNbal0pLmF0dHIoJ2RhdGEtdmFsdWUnKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmllbGRzLnB1c2goe1xuICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgICAgdmFsdWVzOiB2YWx1ZXNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmaWVsZHM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tJbnB1dChub2RlKSB7XG4gICAgICAgIHZhciBpc05lZWQgPSAkKG5vZGUpLnBhcmVudHMoJy5wcm9kdWN0LWN1c3RvbScpLmF0dHIoJ2RhdGEtbmVlZCcpO1xuICAgICAgICB2YXIgdHlwZSA9ICQobm9kZSkuYXR0cignZGF0YS10eXBlJyk7XG4gICAgICAgIHZhciBtYXggPSBwYXJzZUZsb2F0KCQobm9kZSkuYXR0cignZGF0YS1tYXgnKSk7XG4gICAgICAgIHZhciBtaW4gPSBwYXJzZUZsb2F0KCQobm9kZSkuYXR0cignZGF0YS1taW4nKSk7XG4gICAgICAgIHZhciB2YWx1ZSA9ICQudHJpbSgkKG5vZGUpLnZhbCgpKTtcbiAgICAgICAgdmFyIHRhZyA9ICQobm9kZSkucHJldigpLnRleHQoKTtcbiAgICAgICAgaWYgKCF2YWx1ZSAmJiBpc05lZWQgPT09ICdmYWxzZScpIHtcbiAgICAgICAgICAgICQobm9kZSkudmFsKHZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgICAgICQoXCIjZXJyb3JfdGlwXCIpLnRleHQoJ+ivt+Whq+WGmScgKyB0YWcpLnNob3coKTtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAkKFwiI2Vycm9yX3RpcFwiKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGUgPT09IFwiaW50XCIpIHtcbiAgICAgICAgICAgICAgICBtYXggPSBwYXJzZUludChtYXgpO1xuICAgICAgICAgICAgICAgIG1pbiA9IHBhcnNlSW50KG1pbik7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBwYXJzZUludCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID4gbWF4KSB7XG4gICAgICAgICAgICAgICAgICAgICQoXCIjZXJyb3JfdGlwXCIpLnRleHQodGFnICsgXCLkuI3og73lpKfkuo5cIiArIG1heCkuc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNlcnJvcl90aXBcIikuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPCBtaW4pIHtcbiAgICAgICAgICAgICAgICAgICAgJChcIiNlcnJvcl90aXBcIikudGV4dCh0YWcgKyBcIuS4jeiDveWwj+S6jlwiICsgbWluKS5zaG93KCk7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiI2Vycm9yX3RpcFwiKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJChub2RlKS52YWwodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFwiZmxvYXRcIikge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gcGFyc2VGbG9hdCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID4gbWF4KSB7XG4gICAgICAgICAgICAgICAgICAgICQoXCIjZXJyb3JfdGlwXCIpLnRleHQodGFnICsgXCLkuI3og73lpKfkuo5cIiArIG1heCkuc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNlcnJvcl90aXBcIikuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPCBtaW4pIHtcbiAgICAgICAgICAgICAgICAgICAgJChcIiNlcnJvcl90aXBcIikudGV4dCh0YWcgKyBcIuS4jeiDveWwj+S6jlwiICsgbWluKS5zaG93KCk7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiI2Vycm9yX3RpcFwiKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCh2YWx1ZSArIFwiXCIpLmluZGV4T2YoJy4nKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlICs9IFwiLjBcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAkKG5vZGUpLnZhbCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbWF4ID0gcGFyc2VJbnQobWF4KTtcbiAgICAgICAgICAgICAgICBtaW4gPSBwYXJzZUludChtaW4pO1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPiBtYXgpIHtcbiAgICAgICAgICAgICAgICAgICAgJChcIiNlcnJvcl90aXBcIikudGV4dCh0YWcgKyBcIuWtl+aVsOS4jeiDvei2hei/h1wiICsgbWF4KS5zaG93KCk7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiI2Vycm9yX3RpcFwiKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZS5sZW5ndGggPCBtaW4pIHtcbiAgICAgICAgICAgICAgICAgICAgJChcIiNlcnJvcl90aXBcIikudGV4dCh0YWcgKyBcIuWtl+aVsOS4jeiDveWwkeS6jlwiICsgbWluKS5zaG93KCk7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiI2Vycm9yX3RpcFwiKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJChub2RlKS52YWwodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRSZWNvbW1kUHJvZHVjdCgpIHtcbiAgICAgICAgdmFyIElNR19MSU5LID0gJ2h0dHA6Ly9zb3VyY2Uuc295eWluLmNvbS8nO1xuICAgICAgICB2YXIgcmVjb21tZHMgPSBbe1xuICAgICAgICAgICAgaWQ6IDEyLFxuICAgICAgICAgICAgaW1nX2tleTogJ3Nob3V0aWRhaV9yZXhpYW8ucG5nJyxcbiAgICAgICAgICAgIG5hbWU6ICfmiYvmj5DooosnLFxuICAgICAgICAgICAgYnJpZWY6ICfmr4/kuIDkuKrpg73mmK/mgqjnmoTnp7vliqjlub/lkYonXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiAxNSxcbiAgICAgICAgICAgIGltZ19rZXk6ICdodWFjZV9yZXhpYW8ucG5nJyxcbiAgICAgICAgICAgIG5hbWU6ICfnlLvlhownLFxuICAgICAgICAgICAgYnJpZWY6ICfkvIHkuJrlk4HniYzlvaLosaHnu4/lhbjlsZXnjrAnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiAxMSxcbiAgICAgICAgICAgIGltZ19rZXk6ICd6aGV5ZV9yZXhpYW8ucG5nJyxcbiAgICAgICAgICAgIG5hbWU6ICfmipjpobUnLFxuICAgICAgICAgICAgYnJpZWY6ICfog73orqnlrqLmiLfkuLvliqjluKbotbDnmoTnurgnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiAzNCxcbiAgICAgICAgICAgIGltZ19rZXk6ICdidWdhbmppYW90aWVfcmV4aWFvLnBuZyAnLFxuICAgICAgICAgICAgbmFtZTogJ+S4jeW5suiDtui0tCcsXG4gICAgICAgICAgICBicmllZjogJ+efreWwj+eyvuaCjeelnumAmuW5v+WkpydcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaWQ6IDI2LFxuICAgICAgICAgICAgaW1nX2tleTogJ3RzaGlydF9yZXhpYW8ucG5nJyxcbiAgICAgICAgICAgIG5hbWU6ICfmlofljJbooasnLFxuICAgICAgICAgICAgYnJpZWY6ICflm6LpmJ/lu7rorr7nmoTkuI3kuozkuYvpgIknXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiAyNyxcbiAgICAgICAgICAgIGltZ19rZXk6ICdmYW5idWRhaV9yZXhpYW8ucG5nJyxcbiAgICAgICAgICAgIG5hbWU6ICfluIbluIPooosnLFxuICAgICAgICAgICAgYnJpZWY6ICfnjq/kv53ml7blsJrnu4/kuYXogJDnlKgnXG4gICAgICAgIH0sIF07XG4gICAgICAgIHZhciBsaXN0cyA9ICcnO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlY29tbWRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsaXN0cyArPSAnPGxpIGNsYXNzPVwicHJvZHVjdC1yZWNvbW1lbmQtaXRlbVwiPjxhIGhyZWY9XCIvcHJvZHVjdD9pZD0nICsgcmVjb21tZHNbaV0uaWQgKyAnXCI+JztcbiAgICAgICAgICAgIGxpc3RzICs9ICc8aW1nIHNyYz1cIicgKyBJTUdfTElOSyArIHJlY29tbWRzW2ldLmltZ19rZXkgKyAnXCI+PHAgY2xhc3M9XCJwcm9kdWN0LXJlY29tbWVuZC10aXRsZVwiPic7XG4gICAgICAgICAgICBsaXN0cyArPSAnPHNwYW4gY2xhc3M9XCJwcm9kdWN0LXJlY29tbWVuZC10aXRsZS1yaWdodFwiPicgKyByZWNvbW1kc1tpXS5icmllZiArICc8L3NwYW4+JztcbiAgICAgICAgICAgIGxpc3RzICs9ICc8c3BhbiBjbGFzcz1cInByb2R1Y3QtcmVjb21tZW5kLXRpdGxlLWxlZnRcIj4nICsgcmVjb21tZHNbaV0ubmFtZSArICc8L3NwYW4+PC9wPjwvYT48L2xpPic7XG4gICAgICAgIH1cbiAgICAgICAgJChcIi5wcm9kdWN0LXJlY29tbWVuZC1saXN0XCIpLmh0bWwobGlzdHMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZFRvQ2FydCgpIHtcbiAgICAgICAgdmFyIGN1c3RvbSA9ICQoXCIucHJvZHVjdC1ib2R5XCIpLmNoaWxkcmVuKCcucHJvZHVjdC1jdXN0b20nKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjdXN0b20ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBpbnB1dCA9ICQoY3VzdG9tW2ldKS5maW5kKCcuY3VzdG9tLWlucHV0Jyk7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGlucHV0Lmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFjaGVja0lucHV0KGlucHV0W2pdKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJChpbnB1dFtqXSkuYXR0cihcImRhdGEtdmFsdWVcIiwgJChpbnB1dFtqXSkudmFsKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghJChjdXN0b21baV0pLmZpbmQoJy5jdXN0b21zJykuaGFzQ2xhc3MoXCJva1wiKSkge1xuICAgICAgICAgICAgICAgIHBvcFVwLnNob3dQb3AoXCIjbm9fY29uZmlybVwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHVybCA9IFwiL2FwaS92Mi9jYXJ0L2FkZFwiO1xuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIHByaWNlX2lkOiAkKFwiI2FkZF90b19jYXJ0XCIpLmF0dHIoXCJkYXRhLWlkXCIpICogMSxcbiAgICAgICAgICAgIHF1YW50aXR5OiAkKFwiI3Byb2R1Y3RfbnVtXCIpLnZhbCgpICogMSxcbiAgICAgICAgICAgIGZpZWxkczogZ2V0Q3VzdG9tVmFsdWVzKCksXG4gICAgICAgIH1cbiAgICAgICAgJGh0dHAodXJsKS5wb3N0KGRhdGEsIGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgcG9wVXAuc2hvd1BvcChcIiNhZGRfY2FydFwiKTtcbiAgICAgICAgICAgIC8qIOWVhuWTgeaIkOWKn+WKoOWFpei0reeJqei9puWQju+8jOWPs+S4iuinkui0reeJqei9puaVsOaNruWIt+aWsCAqL1xuICAgICAgICAgICAgJChcIiNhZGRfY2FydCAubm8tc3RheVwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBnZXRTaG93Q2FydEJ0bigpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICQoXCIjYWRkX2NhcnQgLmNsb3NlXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGdldFNob3dDYXJ0QnRuKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8v57y655yB6aG557u05bqm572u5Li65LiN5Y+v54K55Ye7XG4gICAgZnVuY3Rpb24gY2hhbmdlTm9uT3B0aW9uKHF1ZXJ5U3RyKSB7XG4gICAgICAgIHZhciBkaW1lbnNpb24gPSAkKFwiLnByb2R1Y3QtYm9keVwiKS5jaGlsZHJlbignLnByb2R1Y3QtdHlwZScpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRpbWVuc2lvbi5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gJChkaW1lbnNpb25baV0pLmZpbmQoXCIudmFsc1wiKS5jaGlsZHJlbigpO1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBvcHRpb25zLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFyciA9IHF1ZXJ5U3RyLnNwbGl0KCdfJyk7XG4gICAgICAgICAgICAgICAgYXJyW2ldID0gJChvcHRpb25zW2pdKS5hdHRyKFwidmFsdWVcIik7XG4gICAgICAgICAgICAgICAgdmFyIG5ld1N0ciA9IGFyci5qb2luKCdfJyk7XG4gICAgICAgICAgICAgICAgaWYgKHByb2R1Y3RNYXBbbmV3U3RyXSkge1xuICAgICAgICAgICAgICAgICAgICAkKG9wdGlvbnNbal0pLnJlbW92ZUNsYXNzKCdkaXMnKS5hZGRDbGFzcygndmFsJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJChvcHRpb25zW2pdKS5yZW1vdmVDbGFzcygndmFsJykuYWRkQ2xhc3MoJ2RpcycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvL+mmluasoeWKoOi9vemAieS4ree7tOW6pueahOesrOS4gOmhuVxuICAgIGZ1bmN0aW9uIGluaXRTZWxlY3RlZCgpIHtcbiAgICAgICAgdmFyIHZhbHMgPSAkKFwiLnZhbHNcIik7XG4gICAgICAgICQoXCIudmFscyAudmFsXCIpLnJlbW92ZUNsYXNzKFwic2VsXCIpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbHMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgZmlyc3QgPSAkKCQodmFsc1tpXSkuY2hpbGRyZW4oXCJhXCIpWzBdKTtcbiAgICAgICAgICAgIGZpcnN0LmFkZENsYXNzKFwic2VsXCIpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBxdWVyeVN0ciA9IGdldFByb2R1Y3RJdGVtKCk7XG4gICAgICAgIGNoYW5nZVByb2R1Y3RQcmljZShxdWVyeVN0cik7XG4gICAgICAgIGNoYW5nZU5vbk9wdGlvbihxdWVyeVN0cik7XG4gICAgfVxuICAgIC8v5oqK6YCJ5Lit55qE57u05bqm5ou85o6l5oiQ5a2X56ym5LiyXG4gICAgZnVuY3Rpb24gZ2V0UHJvZHVjdEl0ZW0oKSB7XG4gICAgICAgIHZhciBhbGxTZWxlY3QgPSAkKFwiLnZhbHMgLnNlbFwiKTtcbiAgICAgICAgdmFyIHF1ZXJ5QXJyID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWxsU2VsZWN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBxdWVyeUFyci5wdXNoKCQoYWxsU2VsZWN0W2ldKS50ZXh0KCkpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBxdWVyeVN0ciA9IHF1ZXJ5QXJyLmpvaW4oXCJfXCIpO1xuICAgICAgICByZXR1cm4gcXVlcnlTdHI7XG4gICAgfVxuICAgIC8v5qC55o2u6YCJ5Lit55qE57u05bqm5L+u5pS55Lu35qC85ZKM5Zu+54mHXG4gICAgZnVuY3Rpb24gY2hhbmdlUHJvZHVjdFByaWNlKHF1ZXJ5U3RyKSB7XG4gICAgICAgIHZhciBpdGVtID0gcHJvZHVjdE1hcFtxdWVyeVN0cl07XG4gICAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgICAgICAvLyAkKFwiI3Byb2R1Y3RfcHJpY2VcIikudGV4dChwcm9jZXNzRGF0YS5wcm9jZXNzUHJpY2UoaXRlbS5wcmljZSkpO1xuICAgICAgICAgICAgJChcIiNwcm9kdWN0X251bVwiKS5hdHRyKFwibWluLW51bVwiLCBpdGVtLm1pbl9udW0pLnZhbChpdGVtLm1pbl9udW0pO1xuICAgICAgICAgICAgaWYgKGl0ZW0ubWF4X251bSkge1xuICAgICAgICAgICAgICAgICQoXCIjcHJvZHVjdF9udW1cIikuYXR0cihcIm1heC1udW1cIiwgaXRlbS5tYXhfbnVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICQoXCIjYWRkX3RvX2NhcnRcIikuYXR0cihcImRhdGEtaWRcIiwgaXRlbS5pZCk7XG4gICAgICAgICAgICB2YXIgbGlzID0gJyc7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGl0ZW0uaW1hZ2Vfa2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxpcyArPSAnPGxpPjxpbWcgc3JjPVwiJyArIElNR19MSU5LICsgaXRlbS5pbWFnZV9rZXlzW2ldICsgJ1wiPjwvbGk+JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICQoXCIjaW1hZ2VMaXN0XCIpLmh0bWwobGlzKTtcbiAgICAgICAgICAgIGltZ1pvb20uc2hvd0ltZygpO1xuICAgICAgICAgICAgZ2V0Q3VzdG9tUHJpY2UoKTtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLmlkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcG9wVXAuc2hvd1BvcChcIiNub19wcm9kdWN0XCIpO1xuICAgICAgICAgICAgJChcIi5tb2RhbC1mb290IC5yaWdodFwiKS5jbGljayhmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgICAgIHBvcFVwLmhpZGVQb3AoXCIjbm9fcHJvZHVjdFwiKTtcbiAgICAgICAgICAgICAgICBpbml0U2VsZWN0ZWQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJChcIi5tb2RhbC1sYXllclwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpbml0U2VsZWN0ZWQoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG4gICAgLy/moLnmja7mi7zmjqXnu7TluqblrZfnrKbkuLLkv67mlLnnu7TluqZcbiAgICBmdW5jdGlvbiBjaGFuZ2VQcm9kdWN0SXRlbShzZWxlY3RTdHIpIHtcbiAgICAgICAgdmFyIHNlbGVjdEFyciA9IHNlbGVjdFN0ci5zcGxpdChcIl9cIik7XG4gICAgICAgIHZhciBhbGxJdGVtID0gJChcIi52YWxzIC52YWxcIik7XG4gICAgICAgIGFsbEl0ZW0ucmVtb3ZlQ2xhc3MoXCJzZWxcIik7XG4gICAgICAgIHZhciBpdGVtQXJyID0gW107XG4gICAgICAgIHZhciBpdGVtcyA9ICQoXCIucHJvZHVjdC1ib2R5XCIpLmNoaWxkcmVuKFwiLnByb2R1Y3QtaXRlbVwiKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKCQoaXRlbXNbaV0pLmhhc0NsYXNzKFwicHJvZHVjdC10eXBlXCIpKSB7XG4gICAgICAgICAgICAgICAgYWxsSXRlbS5maWx0ZXIoXCJhW3ZhbHVlPSdcIiArIHNlbGVjdEFycltpXSArIFwiJ11cIikuYWRkQ2xhc3MoXCJzZWxcIik7XG4gICAgICAgICAgICAgICAgaXRlbUFyci5wdXNoKHNlbGVjdEFycltpXSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBpbnB1dHMgPSAkKGl0ZW1zW2ldKS5maW5kKCcuY3VzdG9tLWlucHV0Jyk7XG4gICAgICAgICAgICAgICAgaWYgKGlucHV0cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdEFycltpXSA9IHNlbGVjdEFycltpXS5zcGxpdChcIipcIik7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgaW5wdXRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKGlucHV0c1tqXSkuYXR0cignZGF0YS1jdXJyZW50Jywgc2VsZWN0QXJyW2ldW2pdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoaW5wdXRzW2pdKS52YWwoc2VsZWN0QXJyW2ldW2pdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICQoaW5wdXRzKS5hdHRyKCdkYXRhLWN1cnJlbnQnLCBzZWxlY3RBcnJbaV0pO1xuICAgICAgICAgICAgICAgICAgICAkKGlucHV0cykudmFsKHNlbGVjdEFycltpXSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGl0ZW1TdHIgPSBpdGVtQXJyLmpvaW4oJ18nKTtcbiAgICAgICAgY2hhbmdlUHJvZHVjdFByaWNlKGl0ZW1TdHIpO1xuICAgICAgICBjaGFuZ2VOb25PcHRpb24oaXRlbVN0cik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Q3VzdG9tUHJpY2UoKSB7XG4gICAgICAgIHZhciB1cmwgPSBcIi9hcGkvdjIvcHJvZHVjdHMvbmV3LXByaWNlXCI7XG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgcHJpY2VfaWQ6ICQoXCIjYWRkX3RvX2NhcnRcIikuYXR0cihcImRhdGEtaWRcIikgKiAxLFxuICAgICAgICAgICAgZmllbGRzOiBnZXRDdXN0b21WYWx1ZXMoKSxcbiAgICAgICAgfVxuICAgICAgICAkaHR0cCh1cmwpLnBvc3QoZGF0YSwgZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAkKFwiI3Byb2R1Y3RfcHJpY2VcIikudGV4dChwcm9jZXNzRGF0YS5wcm9jZXNzUHJpY2UocmVzdWx0LnByaWNlKSk7XG4gICAgICAgIH0pXG4gICAgfVxufSkoKVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9wcm9kdWN0LmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSAxN1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=