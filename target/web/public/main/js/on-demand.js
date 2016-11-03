webpackJsonp([13,19],[
/* 0 */
/***/ function(module, exports) {

	var OnDemandProduct = {
	    validateName: function(value) {
	        if (value.length === 0) {
	            return "请填写产品名称";
	        } else if (value.length > 25) {
	            return "产品名称不能超过25个字";
	        }
	        return;
	    },
	    validateQuantity: function(value) {
	        var numberPattern = /^[0-9]{1,7}[^0-9]{1,2}$/;
	        if (value.length === 0) {
	            return "请填写数量";
	        } else if (!numberPattern.test(value)) {
	            return "请填写正确的数量";
	        }
	        return;
	    },
	    validateSize: function(value) {
	        if (value.length > 50) {
	            return "字数过多";
	        }
	        return;
	    },
	    validateCaizhi: function(value) {
	        if (value.length > 50) {
	            return "材质不能超过50个字";
	        }
	        return;
	    },
	    validateOthers: function(value) {
	        if (value.length > 500) {
	            return "其他要求不能超过500个字";
	        }
	        return;
	    },
	    setNameErrorHint: function(productName) {
	        var value = productName.value;
	        var formItem = $(productName).closest(".form-item");
	        var hint = $(productName).siblings("i.msg")[0];
	        var errorMsg = this.validateName(value);
	        if (errorMsg) {
	            if (!formItem.hasClass("error")) {
	                formItem.addClass("error");
	            }
	            hint.innerText = errorMsg;
	        } else {
	            if (formItem.hasClass("error")) {
	                formItem.removeClass("error");
	            }
	        }
	    },
	    setQuantityErrorHint: function(productQuantity) {
	        var value = productQuantity.value;
	        var formItem = $(productQuantity).closest(".form-item");
	        var hint = $(productQuantity).siblings("i.msg")[0];
	        var errorMsg = this.validateQuantity(value);
	        if (errorMsg) {
	            if (!formItem.hasClass("error")) {
	                formItem.addClass("error");
	            }
	            hint.innerText = errorMsg;
	        } else {
	            if (formItem.hasClass("error")) {
	                formItem.removeClass("error");
	            }
	        }
	    },
	    setSizeErrorHint: function(productSize) {
	        var value = productSize.value;
	        var formItem = $(productSize).closest(".form-item");
	        var hint = $(productSize).siblings("i.msg")[0];
	        var errorMsg = this.validateSize(value);
	        if (errorMsg) {
	            if (!formItem.hasClass("error")) {
	                formItem.addClass("error");
	            }
	            hint.innerText = errorMsg;
	        } else {
	            if (formItem.hasClass("error")) {
	                formItem.removeClass("error");
	            }
	        }
	    },
	    setCaizhiErrorHint: function(productCaizhi) {
	        var value = productCaizhi.value;
	        var formItem = $(productCaizhi).closest(".form-item");
	        var hint = $(productCaizhi).siblings("i.msg")[0];
	        var errorMsg = this.validateCaizhi(value);
	        if (errorMsg) {
	            if (!formItem.hasClass("error")) {
	                formItem.addClass("error");
	            }
	            hint.innerText = errorMsg;
	        } else {
	            if (formItem.hasClass("error")) {
	                formItem.removeClass("error");
	            }
	        }
	    },
	    setOthersErrorHint: function(productOthers) {
	        var value = productOthers.value;
	        var formItem = $(productOthers).closest(".form-item");
	        var hint = $(productOthers).siblings("i.msg")[0];
	        var errorMsg = this.validateOthers(value);
	        if (errorMsg) {
	            if (!formItem.hasClass("error")) {
	                formItem.addClass("error");
	            }
	            hint.innerText = errorMsg;
	        } else {
	            if (formItem.hasClass("error")) {
	                formItem.removeClass("error");
	            }
	        }
	    },
	    initData: function() {
	        // 产品名称
	        var productName = document.getElementById("on_demand_product_name_input");
	        $(productName).siblings("input.placeholder, textarea.placeholder")[0].style.display = "inline-block";
	        $(productName).val("");
	        $(productName).closest(".form-item").removeClass("error");
	        $(productName).siblings("i.msg")[0].innerText = "请填写产品名称";
	
	        // 数量
	        var productQuantity = document.getElementById("on_demand_product_quantity_input");
	        $(productQuantity).siblings("input.placeholder, textarea.placeholder")[0].style.display = "inline-block";
	        $(productQuantity).val("");
	        $(productQuantity).closest(".form-item").removeClass("error");
	        $(productQuantity).siblings("i.msg")[0].innerText = "请填写数量";
	
	        // 产品尺寸
	        var productSize = document.getElementById("on_demand_product_size_input");
	        $(productSize).siblings("input.placeholder, textarea.placeholder")[0].style.display = "inline-block";
	        $(productSize).val("");
	        $(productSize).closest(".form-item").removeClass("error");
	        $(productSize).siblings("i.msg")[0].innerText = "字数过多";
	
	        // 材质
	        var productCaizhi = document.getElementById("on_demand_product_caizhi_input");
	        $(productCaizhi).siblings("input.placeholder, textarea.placeholder")[0].style.display = "inline-block";
	        $(productCaizhi).val("");
	        $(productCaizhi).closest(".form-item").removeClass("error");
	        $(productCaizhi).siblings("i.msg")[0].innerText = "材质不能超过50个字";
	
	        // 其他要求
	        var productOthers = document.getElementById("on_demand_product_others_input");
	        $(productOthers).siblings("input.placeholder, textarea.placeholder")[0].style.display = "inline-block";
	        $(productOthers).val("");
	        $(productOthers).closest(".form-item").removeClass("error");
	        $(productOthers).siblings("i.msg")[0].innerText = "其他要求不能超过500个字";
	    },
	    setData: function(name, quantity, size, caizhi, others) {
	        // 产品名称
	        var productName = document.getElementById("on_demand_product_name_input");
	        if (name && name.length !== 0) {
	            $(productName).siblings("input.placeholder, textarea.placeholder")[0].style.display = "none";
	            $(productName).val(name);
	        } else {
	            $(productName).siblings("input.placeholder, textarea.placeholder")[0].style.display = "inline-block";
	            $(productName).val("");
	        }
	        this.setNameErrorHint(productName);
	
	        // 数量
	        var productQuantity = document.getElementById("on_demand_product_quantity_input");
	        if (quantity && quantity.length !== 0) {
	            $(productQuantity).siblings("input.placeholder, textarea.placeholder")[0].style.display = "none";
	            $(productQuantity).val(quantity);
	        } else {
	            $(productQuantity).siblings("input.placeholder, textarea.placeholder")[0].style.display = "inline-block";
	            $(productQuantity).val("");
	        }
	        this.setQuantityErrorHint(productQuantity);
	
	        // 产品尺寸
	        var productSize = document.getElementById("on_demand_product_size_input");
	        if (size && size.length !== 0) {
	            $(productSize).siblings("input.placeholder, textarea.placeholder")[0].style.display = "none";
	            $(productSize).val(size);
	        } else {
	            $(productSize).siblings("input.placeholder, textarea.placeholder")[0].style.display = "inline-block";
	            $(productSize).val("");
	        }
	        this.setSizeErrorHint(productSize);
	
	        // 材质
	        var productCaizhi = document.getElementById("on_demand_product_caizhi_input");
	        if (caizhi && caizhi.length !== 0) {
	            $(productCaizhi).siblings("input.placeholder, textarea.placeholder")[0].style.display = "none";
	            $(productCaizhi).val(caizhi);
	        } else {
	            $(productCaizhi).siblings("input.placeholder, textarea.placeholder")[0].style.display = "inline-block";
	            $(productCaizhi).val("");
	        }
	        this.setCaizhiErrorHint(productCaizhi);
	
	        // 其他要求
	        var productOthers = document.getElementById("on_demand_product_others_input");
	        if (others && others.length !== 0) {
	            $(productOthers).siblings("input.placeholder, textarea.placeholder")[0].style.display = "none";
	            $(productOthers).val(others);
	        } else {
	            $(productOthers).siblings("input.placeholder, textarea.placeholder")[0].style.display = "inline-block";
	            $(productOthers).val("");
	        }
	        this.setOthersErrorHint(productOthers);
	    },
	    bindOnDemandInputEvent: function() {
	        var self = this;
	        // placeholder
	        $(".on-demand-body").delegate("input.placeholder, textarea.placeholder", "focus", function(e) {
	            this.style.display = "none";
	            this.blur();
	            $(this).siblings("input.on-demand-item-content, textarea.on-demand-item-content").focus();
	        });
	        $(".on-demand-body").delegate("input.on-demand-item-content, textarea.on-demand-item-content", "focus", function(e) {
	            if (this.value.length === 0) {
	                $(this).siblings("input.placeholder, textarea.placeholder")[0].style.display = "none";
	            }
	        });
	
	        // input, textarea失去焦点时的错误提示判断
	        $(".on-demand-body").delegate("input.on-demand-item-content, textarea.on-demand-item-content", "blur", function(e) {
	            if (this.value.length === 0) {
	                $(this).siblings("input.placeholder, textarea.placeholder")[0].style.display = "inline-block";
	            }
	
	            if (this.id === "on_demand_product_name_input") {
	                self.setNameErrorHint(this);
	            } else if (this.id === "on_demand_product_quantity_input") {
	                self.setQuantityErrorHint(this);
	            } else if (this.id === "on_demand_product_size_input") {
	                self.setSizeErrorHint(this);
	            } else if (this.id === "on_demand_product_caizhi_input") {
	                self.setCaizhiErrorHint(this);
	            } else if (this.id === "on_demand_product_others_input") {
	                self.setOthersErrorHint(this);
	            }
	        });
	
	        // select选项改变时的错误提示判断
	        $(".on-demand-body #on_demand_product_category_input").change(function(e) {
	            var formItem = $(this).closest(".form-item");
	            var value = $(this).val();
	            if (value.length === 0) {
	                if (!formItem.hasClass("error")) {
	                    formItem.addClass("error");
	                }
	            } else {
	                if (formItem.hasClass("error")) {
	                    formItem.removeClass("error");
	                }
	            }
	        });
	    }
	};
	
	! function() {
	    imgZoom.bindEvent();
	
	    OnDemandProduct.bindOnDemandInputEvent();
	
	    $("#add_to_cart").click(function() {
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
	
	        var url = "/api/v2/cart/add-custom";
	        $http(url).post(data, function() {
	            popUp.showPop("#add_to_cart_modal");
	            /* 按需定制商品成功加入购物车后，右上角购物车数据刷新 */
	            $("#add_to_cart_modal .close").click(function(){
	                getShowCartBtn();
	            })
	        });
	    });
	}();


/***/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvb24tZGVtYW5kLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxxQ0FBb0MsSUFBSSxPQUFPLElBQUk7QUFDbkQ7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQSxjQUFhO0FBQ2I7QUFDQSxjQUFhO0FBQ2I7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiLFVBQVM7QUFDVCxNQUFLO0FBQ0wsRUFBQyIsImZpbGUiOiJqcy9vbi1kZW1hbmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgT25EZW1hbmRQcm9kdWN0ID0ge1xuICAgIHZhbGlkYXRlTmFtZTogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIFwi6K+35aGr5YaZ5Lqn5ZOB5ZCN56ewXCI7XG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWUubGVuZ3RoID4gMjUpIHtcbiAgICAgICAgICAgIHJldHVybiBcIuS6p+WTgeWQjeensOS4jeiDvei2hei/hzI15Liq5a2XXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH0sXG4gICAgdmFsaWRhdGVRdWFudGl0eTogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgdmFyIG51bWJlclBhdHRlcm4gPSAvXlswLTldezEsN31bXjAtOV17MSwyfSQvO1xuICAgICAgICBpZiAodmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gXCLor7floavlhpnmlbDph49cIjtcbiAgICAgICAgfSBlbHNlIGlmICghbnVtYmVyUGF0dGVybi50ZXN0KHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIFwi6K+35aGr5YaZ5q2j56Gu55qE5pWw6YePXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH0sXG4gICAgdmFsaWRhdGVTaXplOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUubGVuZ3RoID4gNTApIHtcbiAgICAgICAgICAgIHJldHVybiBcIuWtl+aVsOi/h+WkmlwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9LFxuICAgIHZhbGlkYXRlQ2FpemhpOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUubGVuZ3RoID4gNTApIHtcbiAgICAgICAgICAgIHJldHVybiBcIuadkOi0qOS4jeiDvei2hei/hzUw5Liq5a2XXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH0sXG4gICAgdmFsaWRhdGVPdGhlcnM6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPiA1MDApIHtcbiAgICAgICAgICAgIHJldHVybiBcIuWFtuS7luimgeaxguS4jeiDvei2hei/hzUwMOS4quWtl1wiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9LFxuICAgIHNldE5hbWVFcnJvckhpbnQ6IGZ1bmN0aW9uKHByb2R1Y3ROYW1lKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IHByb2R1Y3ROYW1lLnZhbHVlO1xuICAgICAgICB2YXIgZm9ybUl0ZW0gPSAkKHByb2R1Y3ROYW1lKS5jbG9zZXN0KFwiLmZvcm0taXRlbVwiKTtcbiAgICAgICAgdmFyIGhpbnQgPSAkKHByb2R1Y3ROYW1lKS5zaWJsaW5ncyhcImkubXNnXCIpWzBdO1xuICAgICAgICB2YXIgZXJyb3JNc2cgPSB0aGlzLnZhbGlkYXRlTmFtZSh2YWx1ZSk7XG4gICAgICAgIGlmIChlcnJvck1zZykge1xuICAgICAgICAgICAgaWYgKCFmb3JtSXRlbS5oYXNDbGFzcyhcImVycm9yXCIpKSB7XG4gICAgICAgICAgICAgICAgZm9ybUl0ZW0uYWRkQ2xhc3MoXCJlcnJvclwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGhpbnQuaW5uZXJUZXh0ID0gZXJyb3JNc2c7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoZm9ybUl0ZW0uaGFzQ2xhc3MoXCJlcnJvclwiKSkge1xuICAgICAgICAgICAgICAgIGZvcm1JdGVtLnJlbW92ZUNsYXNzKFwiZXJyb3JcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHNldFF1YW50aXR5RXJyb3JIaW50OiBmdW5jdGlvbihwcm9kdWN0UXVhbnRpdHkpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gcHJvZHVjdFF1YW50aXR5LnZhbHVlO1xuICAgICAgICB2YXIgZm9ybUl0ZW0gPSAkKHByb2R1Y3RRdWFudGl0eSkuY2xvc2VzdChcIi5mb3JtLWl0ZW1cIik7XG4gICAgICAgIHZhciBoaW50ID0gJChwcm9kdWN0UXVhbnRpdHkpLnNpYmxpbmdzKFwiaS5tc2dcIilbMF07XG4gICAgICAgIHZhciBlcnJvck1zZyA9IHRoaXMudmFsaWRhdGVRdWFudGl0eSh2YWx1ZSk7XG4gICAgICAgIGlmIChlcnJvck1zZykge1xuICAgICAgICAgICAgaWYgKCFmb3JtSXRlbS5oYXNDbGFzcyhcImVycm9yXCIpKSB7XG4gICAgICAgICAgICAgICAgZm9ybUl0ZW0uYWRkQ2xhc3MoXCJlcnJvclwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGhpbnQuaW5uZXJUZXh0ID0gZXJyb3JNc2c7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoZm9ybUl0ZW0uaGFzQ2xhc3MoXCJlcnJvclwiKSkge1xuICAgICAgICAgICAgICAgIGZvcm1JdGVtLnJlbW92ZUNsYXNzKFwiZXJyb3JcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHNldFNpemVFcnJvckhpbnQ6IGZ1bmN0aW9uKHByb2R1Y3RTaXplKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IHByb2R1Y3RTaXplLnZhbHVlO1xuICAgICAgICB2YXIgZm9ybUl0ZW0gPSAkKHByb2R1Y3RTaXplKS5jbG9zZXN0KFwiLmZvcm0taXRlbVwiKTtcbiAgICAgICAgdmFyIGhpbnQgPSAkKHByb2R1Y3RTaXplKS5zaWJsaW5ncyhcImkubXNnXCIpWzBdO1xuICAgICAgICB2YXIgZXJyb3JNc2cgPSB0aGlzLnZhbGlkYXRlU2l6ZSh2YWx1ZSk7XG4gICAgICAgIGlmIChlcnJvck1zZykge1xuICAgICAgICAgICAgaWYgKCFmb3JtSXRlbS5oYXNDbGFzcyhcImVycm9yXCIpKSB7XG4gICAgICAgICAgICAgICAgZm9ybUl0ZW0uYWRkQ2xhc3MoXCJlcnJvclwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGhpbnQuaW5uZXJUZXh0ID0gZXJyb3JNc2c7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoZm9ybUl0ZW0uaGFzQ2xhc3MoXCJlcnJvclwiKSkge1xuICAgICAgICAgICAgICAgIGZvcm1JdGVtLnJlbW92ZUNsYXNzKFwiZXJyb3JcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHNldENhaXpoaUVycm9ySGludDogZnVuY3Rpb24ocHJvZHVjdENhaXpoaSkge1xuICAgICAgICB2YXIgdmFsdWUgPSBwcm9kdWN0Q2FpemhpLnZhbHVlO1xuICAgICAgICB2YXIgZm9ybUl0ZW0gPSAkKHByb2R1Y3RDYWl6aGkpLmNsb3Nlc3QoXCIuZm9ybS1pdGVtXCIpO1xuICAgICAgICB2YXIgaGludCA9ICQocHJvZHVjdENhaXpoaSkuc2libGluZ3MoXCJpLm1zZ1wiKVswXTtcbiAgICAgICAgdmFyIGVycm9yTXNnID0gdGhpcy52YWxpZGF0ZUNhaXpoaSh2YWx1ZSk7XG4gICAgICAgIGlmIChlcnJvck1zZykge1xuICAgICAgICAgICAgaWYgKCFmb3JtSXRlbS5oYXNDbGFzcyhcImVycm9yXCIpKSB7XG4gICAgICAgICAgICAgICAgZm9ybUl0ZW0uYWRkQ2xhc3MoXCJlcnJvclwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGhpbnQuaW5uZXJUZXh0ID0gZXJyb3JNc2c7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoZm9ybUl0ZW0uaGFzQ2xhc3MoXCJlcnJvclwiKSkge1xuICAgICAgICAgICAgICAgIGZvcm1JdGVtLnJlbW92ZUNsYXNzKFwiZXJyb3JcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHNldE90aGVyc0Vycm9ySGludDogZnVuY3Rpb24ocHJvZHVjdE90aGVycykge1xuICAgICAgICB2YXIgdmFsdWUgPSBwcm9kdWN0T3RoZXJzLnZhbHVlO1xuICAgICAgICB2YXIgZm9ybUl0ZW0gPSAkKHByb2R1Y3RPdGhlcnMpLmNsb3Nlc3QoXCIuZm9ybS1pdGVtXCIpO1xuICAgICAgICB2YXIgaGludCA9ICQocHJvZHVjdE90aGVycykuc2libGluZ3MoXCJpLm1zZ1wiKVswXTtcbiAgICAgICAgdmFyIGVycm9yTXNnID0gdGhpcy52YWxpZGF0ZU90aGVycyh2YWx1ZSk7XG4gICAgICAgIGlmIChlcnJvck1zZykge1xuICAgICAgICAgICAgaWYgKCFmb3JtSXRlbS5oYXNDbGFzcyhcImVycm9yXCIpKSB7XG4gICAgICAgICAgICAgICAgZm9ybUl0ZW0uYWRkQ2xhc3MoXCJlcnJvclwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGhpbnQuaW5uZXJUZXh0ID0gZXJyb3JNc2c7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoZm9ybUl0ZW0uaGFzQ2xhc3MoXCJlcnJvclwiKSkge1xuICAgICAgICAgICAgICAgIGZvcm1JdGVtLnJlbW92ZUNsYXNzKFwiZXJyb3JcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGluaXREYXRhOiBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8g5Lqn5ZOB5ZCN56ewXG4gICAgICAgIHZhciBwcm9kdWN0TmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib25fZGVtYW5kX3Byb2R1Y3RfbmFtZV9pbnB1dFwiKTtcbiAgICAgICAgJChwcm9kdWN0TmFtZSkuc2libGluZ3MoXCJpbnB1dC5wbGFjZWhvbGRlciwgdGV4dGFyZWEucGxhY2Vob2xkZXJcIilbMF0uc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lLWJsb2NrXCI7XG4gICAgICAgICQocHJvZHVjdE5hbWUpLnZhbChcIlwiKTtcbiAgICAgICAgJChwcm9kdWN0TmFtZSkuY2xvc2VzdChcIi5mb3JtLWl0ZW1cIikucmVtb3ZlQ2xhc3MoXCJlcnJvclwiKTtcbiAgICAgICAgJChwcm9kdWN0TmFtZSkuc2libGluZ3MoXCJpLm1zZ1wiKVswXS5pbm5lclRleHQgPSBcIuivt+Whq+WGmeS6p+WTgeWQjeensFwiO1xuXG4gICAgICAgIC8vIOaVsOmHj1xuICAgICAgICB2YXIgcHJvZHVjdFF1YW50aXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvbl9kZW1hbmRfcHJvZHVjdF9xdWFudGl0eV9pbnB1dFwiKTtcbiAgICAgICAgJChwcm9kdWN0UXVhbnRpdHkpLnNpYmxpbmdzKFwiaW5wdXQucGxhY2Vob2xkZXIsIHRleHRhcmVhLnBsYWNlaG9sZGVyXCIpWzBdLnN0eWxlLmRpc3BsYXkgPSBcImlubGluZS1ibG9ja1wiO1xuICAgICAgICAkKHByb2R1Y3RRdWFudGl0eSkudmFsKFwiXCIpO1xuICAgICAgICAkKHByb2R1Y3RRdWFudGl0eSkuY2xvc2VzdChcIi5mb3JtLWl0ZW1cIikucmVtb3ZlQ2xhc3MoXCJlcnJvclwiKTtcbiAgICAgICAgJChwcm9kdWN0UXVhbnRpdHkpLnNpYmxpbmdzKFwiaS5tc2dcIilbMF0uaW5uZXJUZXh0ID0gXCLor7floavlhpnmlbDph49cIjtcblxuICAgICAgICAvLyDkuqflk4HlsLrlr7hcbiAgICAgICAgdmFyIHByb2R1Y3RTaXplID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvbl9kZW1hbmRfcHJvZHVjdF9zaXplX2lucHV0XCIpO1xuICAgICAgICAkKHByb2R1Y3RTaXplKS5zaWJsaW5ncyhcImlucHV0LnBsYWNlaG9sZGVyLCB0ZXh0YXJlYS5wbGFjZWhvbGRlclwiKVswXS5zdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmUtYmxvY2tcIjtcbiAgICAgICAgJChwcm9kdWN0U2l6ZSkudmFsKFwiXCIpO1xuICAgICAgICAkKHByb2R1Y3RTaXplKS5jbG9zZXN0KFwiLmZvcm0taXRlbVwiKS5yZW1vdmVDbGFzcyhcImVycm9yXCIpO1xuICAgICAgICAkKHByb2R1Y3RTaXplKS5zaWJsaW5ncyhcImkubXNnXCIpWzBdLmlubmVyVGV4dCA9IFwi5a2X5pWw6L+H5aSaXCI7XG5cbiAgICAgICAgLy8g5p2Q6LSoXG4gICAgICAgIHZhciBwcm9kdWN0Q2FpemhpID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvbl9kZW1hbmRfcHJvZHVjdF9jYWl6aGlfaW5wdXRcIik7XG4gICAgICAgICQocHJvZHVjdENhaXpoaSkuc2libGluZ3MoXCJpbnB1dC5wbGFjZWhvbGRlciwgdGV4dGFyZWEucGxhY2Vob2xkZXJcIilbMF0uc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lLWJsb2NrXCI7XG4gICAgICAgICQocHJvZHVjdENhaXpoaSkudmFsKFwiXCIpO1xuICAgICAgICAkKHByb2R1Y3RDYWl6aGkpLmNsb3Nlc3QoXCIuZm9ybS1pdGVtXCIpLnJlbW92ZUNsYXNzKFwiZXJyb3JcIik7XG4gICAgICAgICQocHJvZHVjdENhaXpoaSkuc2libGluZ3MoXCJpLm1zZ1wiKVswXS5pbm5lclRleHQgPSBcIuadkOi0qOS4jeiDvei2hei/hzUw5Liq5a2XXCI7XG5cbiAgICAgICAgLy8g5YW25LuW6KaB5rGCXG4gICAgICAgIHZhciBwcm9kdWN0T3RoZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvbl9kZW1hbmRfcHJvZHVjdF9vdGhlcnNfaW5wdXRcIik7XG4gICAgICAgICQocHJvZHVjdE90aGVycykuc2libGluZ3MoXCJpbnB1dC5wbGFjZWhvbGRlciwgdGV4dGFyZWEucGxhY2Vob2xkZXJcIilbMF0uc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lLWJsb2NrXCI7XG4gICAgICAgICQocHJvZHVjdE90aGVycykudmFsKFwiXCIpO1xuICAgICAgICAkKHByb2R1Y3RPdGhlcnMpLmNsb3Nlc3QoXCIuZm9ybS1pdGVtXCIpLnJlbW92ZUNsYXNzKFwiZXJyb3JcIik7XG4gICAgICAgICQocHJvZHVjdE90aGVycykuc2libGluZ3MoXCJpLm1zZ1wiKVswXS5pbm5lclRleHQgPSBcIuWFtuS7luimgeaxguS4jeiDvei2hei/hzUwMOS4quWtl1wiO1xuICAgIH0sXG4gICAgc2V0RGF0YTogZnVuY3Rpb24obmFtZSwgcXVhbnRpdHksIHNpemUsIGNhaXpoaSwgb3RoZXJzKSB7XG4gICAgICAgIC8vIOS6p+WTgeWQjeensFxuICAgICAgICB2YXIgcHJvZHVjdE5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm9uX2RlbWFuZF9wcm9kdWN0X25hbWVfaW5wdXRcIik7XG4gICAgICAgIGlmIChuYW1lICYmIG5hbWUubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICAkKHByb2R1Y3ROYW1lKS5zaWJsaW5ncyhcImlucHV0LnBsYWNlaG9sZGVyLCB0ZXh0YXJlYS5wbGFjZWhvbGRlclwiKVswXS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICAkKHByb2R1Y3ROYW1lKS52YWwobmFtZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKHByb2R1Y3ROYW1lKS5zaWJsaW5ncyhcImlucHV0LnBsYWNlaG9sZGVyLCB0ZXh0YXJlYS5wbGFjZWhvbGRlclwiKVswXS5zdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmUtYmxvY2tcIjtcbiAgICAgICAgICAgICQocHJvZHVjdE5hbWUpLnZhbChcIlwiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldE5hbWVFcnJvckhpbnQocHJvZHVjdE5hbWUpO1xuXG4gICAgICAgIC8vIOaVsOmHj1xuICAgICAgICB2YXIgcHJvZHVjdFF1YW50aXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvbl9kZW1hbmRfcHJvZHVjdF9xdWFudGl0eV9pbnB1dFwiKTtcbiAgICAgICAgaWYgKHF1YW50aXR5ICYmIHF1YW50aXR5Lmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgJChwcm9kdWN0UXVhbnRpdHkpLnNpYmxpbmdzKFwiaW5wdXQucGxhY2Vob2xkZXIsIHRleHRhcmVhLnBsYWNlaG9sZGVyXCIpWzBdLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgICQocHJvZHVjdFF1YW50aXR5KS52YWwocXVhbnRpdHkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJChwcm9kdWN0UXVhbnRpdHkpLnNpYmxpbmdzKFwiaW5wdXQucGxhY2Vob2xkZXIsIHRleHRhcmVhLnBsYWNlaG9sZGVyXCIpWzBdLnN0eWxlLmRpc3BsYXkgPSBcImlubGluZS1ibG9ja1wiO1xuICAgICAgICAgICAgJChwcm9kdWN0UXVhbnRpdHkpLnZhbChcIlwiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFF1YW50aXR5RXJyb3JIaW50KHByb2R1Y3RRdWFudGl0eSk7XG5cbiAgICAgICAgLy8g5Lqn5ZOB5bC65a+4XG4gICAgICAgIHZhciBwcm9kdWN0U2l6ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib25fZGVtYW5kX3Byb2R1Y3Rfc2l6ZV9pbnB1dFwiKTtcbiAgICAgICAgaWYgKHNpemUgJiYgc2l6ZS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgICQocHJvZHVjdFNpemUpLnNpYmxpbmdzKFwiaW5wdXQucGxhY2Vob2xkZXIsIHRleHRhcmVhLnBsYWNlaG9sZGVyXCIpWzBdLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgICQocHJvZHVjdFNpemUpLnZhbChzaXplKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQocHJvZHVjdFNpemUpLnNpYmxpbmdzKFwiaW5wdXQucGxhY2Vob2xkZXIsIHRleHRhcmVhLnBsYWNlaG9sZGVyXCIpWzBdLnN0eWxlLmRpc3BsYXkgPSBcImlubGluZS1ibG9ja1wiO1xuICAgICAgICAgICAgJChwcm9kdWN0U2l6ZSkudmFsKFwiXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0U2l6ZUVycm9ySGludChwcm9kdWN0U2l6ZSk7XG5cbiAgICAgICAgLy8g5p2Q6LSoXG4gICAgICAgIHZhciBwcm9kdWN0Q2FpemhpID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvbl9kZW1hbmRfcHJvZHVjdF9jYWl6aGlfaW5wdXRcIik7XG4gICAgICAgIGlmIChjYWl6aGkgJiYgY2FpemhpLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgJChwcm9kdWN0Q2FpemhpKS5zaWJsaW5ncyhcImlucHV0LnBsYWNlaG9sZGVyLCB0ZXh0YXJlYS5wbGFjZWhvbGRlclwiKVswXS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICAkKHByb2R1Y3RDYWl6aGkpLnZhbChjYWl6aGkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJChwcm9kdWN0Q2FpemhpKS5zaWJsaW5ncyhcImlucHV0LnBsYWNlaG9sZGVyLCB0ZXh0YXJlYS5wbGFjZWhvbGRlclwiKVswXS5zdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmUtYmxvY2tcIjtcbiAgICAgICAgICAgICQocHJvZHVjdENhaXpoaSkudmFsKFwiXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0Q2FpemhpRXJyb3JIaW50KHByb2R1Y3RDYWl6aGkpO1xuXG4gICAgICAgIC8vIOWFtuS7luimgeaxglxuICAgICAgICB2YXIgcHJvZHVjdE90aGVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib25fZGVtYW5kX3Byb2R1Y3Rfb3RoZXJzX2lucHV0XCIpO1xuICAgICAgICBpZiAob3RoZXJzICYmIG90aGVycy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgICQocHJvZHVjdE90aGVycykuc2libGluZ3MoXCJpbnB1dC5wbGFjZWhvbGRlciwgdGV4dGFyZWEucGxhY2Vob2xkZXJcIilbMF0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgJChwcm9kdWN0T3RoZXJzKS52YWwob3RoZXJzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQocHJvZHVjdE90aGVycykuc2libGluZ3MoXCJpbnB1dC5wbGFjZWhvbGRlciwgdGV4dGFyZWEucGxhY2Vob2xkZXJcIilbMF0uc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lLWJsb2NrXCI7XG4gICAgICAgICAgICAkKHByb2R1Y3RPdGhlcnMpLnZhbChcIlwiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldE90aGVyc0Vycm9ySGludChwcm9kdWN0T3RoZXJzKTtcbiAgICB9LFxuICAgIGJpbmRPbkRlbWFuZElucHV0RXZlbnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIC8vIHBsYWNlaG9sZGVyXG4gICAgICAgICQoXCIub24tZGVtYW5kLWJvZHlcIikuZGVsZWdhdGUoXCJpbnB1dC5wbGFjZWhvbGRlciwgdGV4dGFyZWEucGxhY2Vob2xkZXJcIiwgXCJmb2N1c1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICB0aGlzLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgIHRoaXMuYmx1cigpO1xuICAgICAgICAgICAgJCh0aGlzKS5zaWJsaW5ncyhcImlucHV0Lm9uLWRlbWFuZC1pdGVtLWNvbnRlbnQsIHRleHRhcmVhLm9uLWRlbWFuZC1pdGVtLWNvbnRlbnRcIikuZm9jdXMoKTtcbiAgICAgICAgfSk7XG4gICAgICAgICQoXCIub24tZGVtYW5kLWJvZHlcIikuZGVsZWdhdGUoXCJpbnB1dC5vbi1kZW1hbmQtaXRlbS1jb250ZW50LCB0ZXh0YXJlYS5vbi1kZW1hbmQtaXRlbS1jb250ZW50XCIsIFwiZm9jdXNcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMudmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5zaWJsaW5ncyhcImlucHV0LnBsYWNlaG9sZGVyLCB0ZXh0YXJlYS5wbGFjZWhvbGRlclwiKVswXS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGlucHV0LCB0ZXh0YXJlYeWkseWOu+eEpueCueaXtueahOmUmeivr+aPkOekuuWIpOaWrVxuICAgICAgICAkKFwiLm9uLWRlbWFuZC1ib2R5XCIpLmRlbGVnYXRlKFwiaW5wdXQub24tZGVtYW5kLWl0ZW0tY29udGVudCwgdGV4dGFyZWEub24tZGVtYW5kLWl0ZW0tY29udGVudFwiLCBcImJsdXJcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMudmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5zaWJsaW5ncyhcImlucHV0LnBsYWNlaG9sZGVyLCB0ZXh0YXJlYS5wbGFjZWhvbGRlclwiKVswXS5zdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmUtYmxvY2tcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuaWQgPT09IFwib25fZGVtYW5kX3Byb2R1Y3RfbmFtZV9pbnB1dFwiKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5zZXROYW1lRXJyb3JIaW50KHRoaXMpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlkID09PSBcIm9uX2RlbWFuZF9wcm9kdWN0X3F1YW50aXR5X2lucHV0XCIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnNldFF1YW50aXR5RXJyb3JIaW50KHRoaXMpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlkID09PSBcIm9uX2RlbWFuZF9wcm9kdWN0X3NpemVfaW5wdXRcIikge1xuICAgICAgICAgICAgICAgIHNlbGYuc2V0U2l6ZUVycm9ySGludCh0aGlzKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5pZCA9PT0gXCJvbl9kZW1hbmRfcHJvZHVjdF9jYWl6aGlfaW5wdXRcIikge1xuICAgICAgICAgICAgICAgIHNlbGYuc2V0Q2FpemhpRXJyb3JIaW50KHRoaXMpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlkID09PSBcIm9uX2RlbWFuZF9wcm9kdWN0X290aGVyc19pbnB1dFwiKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5zZXRPdGhlcnNFcnJvckhpbnQodGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHNlbGVjdOmAiemhueaUueWPmOaXtueahOmUmeivr+aPkOekuuWIpOaWrVxuICAgICAgICAkKFwiLm9uLWRlbWFuZC1ib2R5ICNvbl9kZW1hbmRfcHJvZHVjdF9jYXRlZ29yeV9pbnB1dFwiKS5jaGFuZ2UoZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgdmFyIGZvcm1JdGVtID0gJCh0aGlzKS5jbG9zZXN0KFwiLmZvcm0taXRlbVwiKTtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9ICQodGhpcykudmFsKCk7XG4gICAgICAgICAgICBpZiAodmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFmb3JtSXRlbS5oYXNDbGFzcyhcImVycm9yXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1JdGVtLmFkZENsYXNzKFwiZXJyb3JcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoZm9ybUl0ZW0uaGFzQ2xhc3MoXCJlcnJvclwiKSkge1xuICAgICAgICAgICAgICAgICAgICBmb3JtSXRlbS5yZW1vdmVDbGFzcyhcImVycm9yXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufTtcblxuISBmdW5jdGlvbigpIHtcbiAgICBpbWdab29tLmJpbmRFdmVudCgpO1xuXG4gICAgT25EZW1hbmRQcm9kdWN0LmJpbmRPbkRlbWFuZElucHV0RXZlbnQoKTtcblxuICAgICQoXCIjYWRkX3RvX2NhcnRcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgbmFtZTogJChcIiNvbl9kZW1hbmRfcHJvZHVjdF9uYW1lX2lucHV0XCIpLnZhbCgpLFxuICAgICAgICAgICAgY2F0ZWdvcnk6ICflrprliLblkI3niYcnLFxuICAgICAgICAgICAgcXVhbnRpdHk6ICQoXCIjb25fZGVtYW5kX3Byb2R1Y3RfcXVhbnRpdHlfaW5wdXRcIikudmFsKCksXG4gICAgICAgICAgICBzaXplOiAkKFwiI29uX2RlbWFuZF9wcm9kdWN0X3NpemVfaW5wdXRcIikudmFsKCksXG4gICAgICAgICAgICBjYWl6aGk6ICQoXCIjb25fZGVtYW5kX3Byb2R1Y3RfY2FpemhpX2lucHV0XCIpLnZhbCgpLFxuICAgICAgICAgICAgb3RoZXJzOiAkKFwiI29uX2RlbWFuZF9wcm9kdWN0X290aGVyc19pbnB1dFwiKS52YWwoKSxcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgZm9ybUl0ZW07XG4gICAgICAgIGlmIChPbkRlbWFuZFByb2R1Y3QudmFsaWRhdGVOYW1lKGRhdGEubmFtZSkpIHtcbiAgICAgICAgICAgIGZvcm1JdGVtID0gJChcIiNvbl9kZW1hbmRfcHJvZHVjdF9uYW1lX2lucHV0XCIpLmNsb3Nlc3QoXCIuZm9ybS1pdGVtXCIpO1xuICAgICAgICAgICAgaWYgKCFmb3JtSXRlbS5oYXNDbGFzcyhcImVycm9yXCIpKSB7XG4gICAgICAgICAgICAgICAgZm9ybUl0ZW0uYWRkQ2xhc3MoXCJlcnJvclwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICQoXCIjb25fZGVtYW5kX3Byb2R1Y3RfbmFtZV9pbnB1dFwiKS5mb2N1cygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChPbkRlbWFuZFByb2R1Y3QudmFsaWRhdGVRdWFudGl0eShkYXRhLnF1YW50aXR5KSkge1xuICAgICAgICAgICAgZm9ybUl0ZW0gPSAkKFwiI29uX2RlbWFuZF9wcm9kdWN0X3F1YW50aXR5X2lucHV0XCIpLmNsb3Nlc3QoXCIuZm9ybS1pdGVtXCIpO1xuICAgICAgICAgICAgaWYgKCFmb3JtSXRlbS5oYXNDbGFzcyhcImVycm9yXCIpKSB7XG4gICAgICAgICAgICAgICAgZm9ybUl0ZW0uYWRkQ2xhc3MoXCJlcnJvclwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICQoXCIjb25fZGVtYW5kX3Byb2R1Y3RfcXVhbnRpdHlfaW5wdXRcIikuZm9jdXMoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChPbkRlbWFuZFByb2R1Y3QudmFsaWRhdGVTaXplKGRhdGEuc2l6ZSkgfHwgT25EZW1hbmRQcm9kdWN0LnZhbGlkYXRlQ2FpemhpKGRhdGEuY2FpemhpKSB8fFxuICAgICAgICAgICAgT25EZW1hbmRQcm9kdWN0LnZhbGlkYXRlT3RoZXJzKGRhdGEub3RoZXJzKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHVybCA9IFwiL2FwaS92Mi9jYXJ0L2FkZC1jdXN0b21cIjtcbiAgICAgICAgJGh0dHAodXJsKS5wb3N0KGRhdGEsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcG9wVXAuc2hvd1BvcChcIiNhZGRfdG9fY2FydF9tb2RhbFwiKTtcbiAgICAgICAgICAgIC8qIOaMiemcgOWumuWItuWVhuWTgeaIkOWKn+WKoOWFpei0reeJqei9puWQju+8jOWPs+S4iuinkui0reeJqei9puaVsOaNruWIt+aWsCAqL1xuICAgICAgICAgICAgJChcIiNhZGRfdG9fY2FydF9tb2RhbCAuY2xvc2VcIikuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBnZXRTaG93Q2FydEJ0bigpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KCk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL29uLWRlbWFuZC5qc1xuICoqIG1vZHVsZSBpZCA9IDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMTNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9