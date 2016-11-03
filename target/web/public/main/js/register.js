webpackJsonp([18,19],[
/* 0 */
/***/ function(module, exports) {

	var register = {
	    usernameItemInput: $("#register_item_username"),
	    codeItemInput: $("#register_item_code"),
	    getPhoneCodeBtn: $("#get_phone_code"),
		passwordItemInput: $("#register_item_password"),
	    usernameErrorTip: $("#username_error_tip"),
	    codeErrorTip: $("#code_error_tip"),
	    passwordErrorTip: $("#password_error_tip"),
	    agreeBtn: $("#agree"),
	    registerSubmitBtn: $("#register_submit"),
	    agreementBoxShadeLayer: $("#agreement_box_shade_layer"),
	    agreementBox: $("#agreement_box"),
	    agreementBoxClose: $("#agreement_box_close"),
	    readAndAgreeButton: $("#read_and_agree_button"),
	    init: function() {
	        var self = this;
	        this.agreementBoxClose.click(function() {
	            self.hidePop();
	        });
	        this.agreementBoxShadeLayer.click(function() {
	            self.hidePop();
	        });
	        this.readAndAgreeButton.click(function() {
	            self.hidePop();
	            if (!self.agreeBtn.hasClass("active")) {
	                self.agreeBtn.addClass("active");
	            }
	        });
	        this.getPhoneCodeBtn.click(function() {
	            self.getRegisterPhoneCode();
	        });
	        this.agreeBtn.click(function(event) {
	            self.setAgree(event);
	        });
	        this.registerSubmitBtn.click(function() {
	            self.userRegister();
	        });
	        $(".register-box").delegate("input.register-item-input", "blur", function(e) {
	            if (this.id === "register_item_username") {
	                self.validateUsername(this.value);
	            } else if (this.id === "register_item_code") {
	                self.validateCode(this.value);
	            } else if (this.id === "register_item_password") {
	                self.validatePwd(this.value);
	            }
	        });
	    },
	    showPop: function() {
	        var self = this;
	        this.agreementBox.show();
	        this.agreementBoxShadeLayer.show();
	    },
	    hidePop: function() {
	        this.agreementBox.hide();
	        this.agreementBoxShadeLayer.hide();
	    },
	    setAgree: function(event) {
	        var $target;
	        if ($(event.target).is("span")) {
	            $target = $(event.target).parent();
	        } else {
	            $target = $(event.target);
	        }
	        if ($target.hasClass("active")) {
	            $target.removeClass("active");
	        } else {
	            $target.addClass("active");
	        }
	    },
	    userRegister: function() {
	        var self = this;
	        if (self.registerSubmitBtn.hasClass("btn-disable")) {
	            return;
	        }
	
	        var data = {
	            "phone": self.usernameItemInput.val(),
	            "code": self.codeItemInput.val(),
	            "password": self.passwordItemInput.val(),
	            "type": 2
	        };
	        var url = '/api/v2/web/users/phone-signup';
	
	        if (!self.validateUsername(data.phone) || !self.validateCode(data.code) || !self.validatePwd(data.password)) {
	            return;
	        }
	        if (!self.agreeBtn.hasClass("active")) {
	            self.showPop();
	            return;
	        }
	
	        self.usernameErrorTip.html("");
	        self.codeErrorTip.html("");
	        self.passwordErrorTip.html("");
	
	        self.registerSubmitBtn.removeClass("btn-enable").addClass("btn-disable").text("正在注册，请稍后");
	
	        $http(url).post(data, function(result) {
	            self.registerSubmitBtn.removeClass("btn-disable").addClass("btn-enable").text("注 册");
	            if (result.result === 0) {
	                if (!result.display_name) {
	                    result.display_name = "暂无";
	                }
	                $.cookie("id", result.id, { path: '/' });
	                $.cookie("userid", result.old_user_info_id, { path: '/' });
	                $.cookie("truthid", result.uuid, { path: '/' });
	                $.cookie("username", result.display_name, { path: '/' });
	                $.cookie("image_url", result.image_url, { path: '/' });
	                $.cookie("usertype", result.type, { path: '/' });
	
	                var referrerUrl = document.referrer;
	                if (!referrerUrl || referrerUrl.length === 0) {
	                    window.location.href = "/";
	                } else if (referrerUrl.indexOf(location.hostname) >= 0) {
	                    window.location.href = referrerUrl;
	                } else {
	                    window.location.href= "/";
	                }
	            } else {
	                if (result.result === 4) {
	                    self.usernameErrorTip.html(result.error_message);
	                } else if (result.result === 1010) {
	                    self.usernameErrorTip.html("手机号格式错误");
	                } else if (result.result === 1011) {
	                    self.codeErrorTip.html("短信验证码错误");
	                } else if (result.result === 1008) {
	                    self.passwordErrorTip.html("密码格式错误");
	                } else if (result.result === 1003) {
	                    self.usernameErrorTip.html("该手机号已经注册，请直接登录");
	                } else if (result.result === 6) {
	                    self.usernameErrorTip.html("该手机号已经注册，请直接登录");
	                }
	            }
	        }, false);
	    },
	    validateUsername: function(username) {
	        var phone_pattern = /^[0-9]{11}$/;
	        if (!phone_pattern.test(username)) {
	            this.usernameErrorTip.html("请输入正确的手机号");
	            return false;
	        }
	        this.usernameErrorTip.html("");
	        return true;
	    },
	    validateCode: function(code) {
	        var code_pattern = /^[0-9]{4}$/;
	
	        if (!code_pattern.test(code)) {
	            this.codeErrorTip.html("请输入正确的验证码");
	            return false;
	        }
	        this.codeErrorTip.html("");
	        return true;
	    },
	    validatePwd: function(pwd) {
	        if (pwd.length === 0) {
	            this.passwordErrorTip.html("密码不能为空");
	            return false;
	        }
	        if (pwd.length > 12 || pwd.length < 6) {
	            this.passwordErrorTip.html("密码由6-12位字符组成");
	            return false;
	        }
	        this.passwordErrorTip.html("");
	        return true;
	    },
	    waitLoginCode: function() {
	        var self = this;
	        self.getPhoneCodeBtn.removeClass("btn-enable").addClass("btn-disable").text("重新获取60s");
	        var i = 59;
	        self.set_register_time = setInterval(function() {
	            self.getPhoneCodeBtn.text("重新获取" + i + "s");
	            i--;
	            if (i === -1) {
	                clearInterval(self.set_register_time);
	                self.getPhoneCodeBtn.removeClass("btn-disable").addClass("btn-enable").text("获取验证码");
	            }
	        }, 1000);
	    },
	    getRegisterPhoneCode: function() {
	        var self = this;
	        if (self.getPhoneCodeBtn.hasClass("btn-disable")) {
	            return;
	        }
	
	        var data = {
	            "phone": self.usernameItemInput.val()
	        };
	        var url = '/api/v2/web/users/send-signup-code?version=1';
	
	        if (!self.validateUsername(data.phone)) {
	            return;
	        }
	
	        self.codeErrorTip.html("");
	
	        $http(url).post(data, function(result) {
	            if (result.result === 0) {
	                self.waitLoginCode();
	            } else {
	                self.getPhoneCodeBtn.removeClass("btn-disable").addClass("btn-enable").text("获取验证码");
	                if (result.result === 4) {
	                    self.codeErrorTip.html(result.error_message);
	                } else if (result.result === 9) {
	                    self.codeErrorTip.html("发送短信失败，请稍后再试");
	                } else if (result.result === 6) {
	                    self.usernameErrorTip.html("该手机号已经注册，请直接登录");
	                } else if (result.result === 1010) {
	                    self.usernameErrorTip.html("手机号格式错误");
	                } else if (result.result === 1009) {
	                    self.codeErrorTip.html("图片验证码错误");
	                } else if (result.result === 1012) {
	                    self.codeErrorTip.html("请求的太频繁，请稍等1分钟重试");
	                }
	            }
	        }, false);
	    }
	};
	
	! function() {
	    if ($.cookie("id") && $.cookie("username")) {
	        window.location.href= "/";
	    }
	    
	    register.init();
	    $("#agreement").click(function() {
	        register.showPop();
	    });
	}();


/***/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvcmVnaXN0ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUEyQyxZQUFZO0FBQ3ZELDhEQUE2RCxZQUFZO0FBQ3pFLG1EQUFrRCxZQUFZO0FBQzlELDREQUEyRCxZQUFZO0FBQ3ZFLDBEQUF5RCxZQUFZO0FBQ3JFLG9EQUFtRCxZQUFZOztBQUUvRDtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVCxNQUFLO0FBQ0w7QUFDQSxxQ0FBb0MsR0FBRztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxvQ0FBbUMsRUFBRTs7QUFFckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVCxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0wsRUFBQyIsImZpbGUiOiJqcy9yZWdpc3Rlci5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciByZWdpc3RlciA9IHtcbiAgICB1c2VybmFtZUl0ZW1JbnB1dDogJChcIiNyZWdpc3Rlcl9pdGVtX3VzZXJuYW1lXCIpLFxuICAgIGNvZGVJdGVtSW5wdXQ6ICQoXCIjcmVnaXN0ZXJfaXRlbV9jb2RlXCIpLFxuICAgIGdldFBob25lQ29kZUJ0bjogJChcIiNnZXRfcGhvbmVfY29kZVwiKSxcblx0cGFzc3dvcmRJdGVtSW5wdXQ6ICQoXCIjcmVnaXN0ZXJfaXRlbV9wYXNzd29yZFwiKSxcbiAgICB1c2VybmFtZUVycm9yVGlwOiAkKFwiI3VzZXJuYW1lX2Vycm9yX3RpcFwiKSxcbiAgICBjb2RlRXJyb3JUaXA6ICQoXCIjY29kZV9lcnJvcl90aXBcIiksXG4gICAgcGFzc3dvcmRFcnJvclRpcDogJChcIiNwYXNzd29yZF9lcnJvcl90aXBcIiksXG4gICAgYWdyZWVCdG46ICQoXCIjYWdyZWVcIiksXG4gICAgcmVnaXN0ZXJTdWJtaXRCdG46ICQoXCIjcmVnaXN0ZXJfc3VibWl0XCIpLFxuICAgIGFncmVlbWVudEJveFNoYWRlTGF5ZXI6ICQoXCIjYWdyZWVtZW50X2JveF9zaGFkZV9sYXllclwiKSxcbiAgICBhZ3JlZW1lbnRCb3g6ICQoXCIjYWdyZWVtZW50X2JveFwiKSxcbiAgICBhZ3JlZW1lbnRCb3hDbG9zZTogJChcIiNhZ3JlZW1lbnRfYm94X2Nsb3NlXCIpLFxuICAgIHJlYWRBbmRBZ3JlZUJ1dHRvbjogJChcIiNyZWFkX2FuZF9hZ3JlZV9idXR0b25cIiksXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5hZ3JlZW1lbnRCb3hDbG9zZS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNlbGYuaGlkZVBvcCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5hZ3JlZW1lbnRCb3hTaGFkZUxheWVyLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2VsZi5oaWRlUG9wKCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnJlYWRBbmRBZ3JlZUJ1dHRvbi5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNlbGYuaGlkZVBvcCgpO1xuICAgICAgICAgICAgaWYgKCFzZWxmLmFncmVlQnRuLmhhc0NsYXNzKFwiYWN0aXZlXCIpKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5hZ3JlZUJ0bi5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZ2V0UGhvbmVDb2RlQnRuLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2VsZi5nZXRSZWdpc3RlclBob25lQ29kZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5hZ3JlZUJ0bi5jbGljayhmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgc2VsZi5zZXRBZ3JlZShldmVudCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyU3VibWl0QnRuLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2VsZi51c2VyUmVnaXN0ZXIoKTtcbiAgICAgICAgfSk7XG4gICAgICAgICQoXCIucmVnaXN0ZXItYm94XCIpLmRlbGVnYXRlKFwiaW5wdXQucmVnaXN0ZXItaXRlbS1pbnB1dFwiLCBcImJsdXJcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaWQgPT09IFwicmVnaXN0ZXJfaXRlbV91c2VybmFtZVwiKSB7XG4gICAgICAgICAgICAgICAgc2VsZi52YWxpZGF0ZVVzZXJuYW1lKHRoaXMudmFsdWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlkID09PSBcInJlZ2lzdGVyX2l0ZW1fY29kZVwiKSB7XG4gICAgICAgICAgICAgICAgc2VsZi52YWxpZGF0ZUNvZGUodGhpcy52YWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaWQgPT09IFwicmVnaXN0ZXJfaXRlbV9wYXNzd29yZFwiKSB7XG4gICAgICAgICAgICAgICAgc2VsZi52YWxpZGF0ZVB3ZCh0aGlzLnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBzaG93UG9wOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLmFncmVlbWVudEJveC5zaG93KCk7XG4gICAgICAgIHRoaXMuYWdyZWVtZW50Qm94U2hhZGVMYXllci5zaG93KCk7XG4gICAgfSxcbiAgICBoaWRlUG9wOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5hZ3JlZW1lbnRCb3guaGlkZSgpO1xuICAgICAgICB0aGlzLmFncmVlbWVudEJveFNoYWRlTGF5ZXIuaGlkZSgpO1xuICAgIH0sXG4gICAgc2V0QWdyZWU6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHZhciAkdGFyZ2V0O1xuICAgICAgICBpZiAoJChldmVudC50YXJnZXQpLmlzKFwic3BhblwiKSkge1xuICAgICAgICAgICAgJHRhcmdldCA9ICQoZXZlbnQudGFyZ2V0KS5wYXJlbnQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICR0YXJnZXQgPSAkKGV2ZW50LnRhcmdldCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCR0YXJnZXQuaGFzQ2xhc3MoXCJhY3RpdmVcIikpIHtcbiAgICAgICAgICAgICR0YXJnZXQucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkdGFyZ2V0LmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICB1c2VyUmVnaXN0ZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmIChzZWxmLnJlZ2lzdGVyU3VibWl0QnRuLmhhc0NsYXNzKFwiYnRuLWRpc2FibGVcIikpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgXCJwaG9uZVwiOiBzZWxmLnVzZXJuYW1lSXRlbUlucHV0LnZhbCgpLFxuICAgICAgICAgICAgXCJjb2RlXCI6IHNlbGYuY29kZUl0ZW1JbnB1dC52YWwoKSxcbiAgICAgICAgICAgIFwicGFzc3dvcmRcIjogc2VsZi5wYXNzd29yZEl0ZW1JbnB1dC52YWwoKSxcbiAgICAgICAgICAgIFwidHlwZVwiOiAyXG4gICAgICAgIH07XG4gICAgICAgIHZhciB1cmwgPSAnL2FwaS92Mi93ZWIvdXNlcnMvcGhvbmUtc2lnbnVwJztcblxuICAgICAgICBpZiAoIXNlbGYudmFsaWRhdGVVc2VybmFtZShkYXRhLnBob25lKSB8fCAhc2VsZi52YWxpZGF0ZUNvZGUoZGF0YS5jb2RlKSB8fCAhc2VsZi52YWxpZGF0ZVB3ZChkYXRhLnBhc3N3b3JkKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghc2VsZi5hZ3JlZUJ0bi5oYXNDbGFzcyhcImFjdGl2ZVwiKSkge1xuICAgICAgICAgICAgc2VsZi5zaG93UG9wKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzZWxmLnVzZXJuYW1lRXJyb3JUaXAuaHRtbChcIlwiKTtcbiAgICAgICAgc2VsZi5jb2RlRXJyb3JUaXAuaHRtbChcIlwiKTtcbiAgICAgICAgc2VsZi5wYXNzd29yZEVycm9yVGlwLmh0bWwoXCJcIik7XG5cbiAgICAgICAgc2VsZi5yZWdpc3RlclN1Ym1pdEJ0bi5yZW1vdmVDbGFzcyhcImJ0bi1lbmFibGVcIikuYWRkQ2xhc3MoXCJidG4tZGlzYWJsZVwiKS50ZXh0KFwi5q2j5Zyo5rOo5YaM77yM6K+356iN5ZCOXCIpO1xuXG4gICAgICAgICRodHRwKHVybCkucG9zdChkYXRhLCBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgIHNlbGYucmVnaXN0ZXJTdWJtaXRCdG4ucmVtb3ZlQ2xhc3MoXCJidG4tZGlzYWJsZVwiKS5hZGRDbGFzcyhcImJ0bi1lbmFibGVcIikudGV4dChcIuazqCDlhoxcIik7XG4gICAgICAgICAgICBpZiAocmVzdWx0LnJlc3VsdCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGlmICghcmVzdWx0LmRpc3BsYXlfbmFtZSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQuZGlzcGxheV9uYW1lID0gXCLmmoLml6BcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJC5jb29raWUoXCJpZFwiLCByZXN1bHQuaWQsIHsgcGF0aDogJy8nIH0pO1xuICAgICAgICAgICAgICAgICQuY29va2llKFwidXNlcmlkXCIsIHJlc3VsdC5vbGRfdXNlcl9pbmZvX2lkLCB7IHBhdGg6ICcvJyB9KTtcbiAgICAgICAgICAgICAgICAkLmNvb2tpZShcInRydXRoaWRcIiwgcmVzdWx0LnV1aWQsIHsgcGF0aDogJy8nIH0pO1xuICAgICAgICAgICAgICAgICQuY29va2llKFwidXNlcm5hbWVcIiwgcmVzdWx0LmRpc3BsYXlfbmFtZSwgeyBwYXRoOiAnLycgfSk7XG4gICAgICAgICAgICAgICAgJC5jb29raWUoXCJpbWFnZV91cmxcIiwgcmVzdWx0LmltYWdlX3VybCwgeyBwYXRoOiAnLycgfSk7XG4gICAgICAgICAgICAgICAgJC5jb29raWUoXCJ1c2VydHlwZVwiLCByZXN1bHQudHlwZSwgeyBwYXRoOiAnLycgfSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgcmVmZXJyZXJVcmwgPSBkb2N1bWVudC5yZWZlcnJlcjtcbiAgICAgICAgICAgICAgICBpZiAoIXJlZmVycmVyVXJsIHx8IHJlZmVycmVyVXJsLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL1wiO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVmZXJyZXJVcmwuaW5kZXhPZihsb2NhdGlvbi5ob3N0bmFtZSkgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHJlZmVycmVyVXJsO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmPSBcIi9cIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQucmVzdWx0ID09PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYudXNlcm5hbWVFcnJvclRpcC5odG1sKHJlc3VsdC5lcnJvcl9tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdC5yZXN1bHQgPT09IDEwMTApIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi51c2VybmFtZUVycm9yVGlwLmh0bWwoXCLmiYvmnLrlj7fmoLzlvI/plJnor69cIik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQucmVzdWx0ID09PSAxMDExKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY29kZUVycm9yVGlwLmh0bWwoXCLnn63kv6Hpqozor4HnoIHplJnor69cIik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQucmVzdWx0ID09PSAxMDA4KSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYucGFzc3dvcmRFcnJvclRpcC5odG1sKFwi5a+G56CB5qC85byP6ZSZ6K+vXCIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzdWx0LnJlc3VsdCA9PT0gMTAwMykge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnVzZXJuYW1lRXJyb3JUaXAuaHRtbChcIuivpeaJi+acuuWPt+W3sue7j+azqOWGjO+8jOivt+ebtOaOpeeZu+W9lVwiKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdC5yZXN1bHQgPT09IDYpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi51c2VybmFtZUVycm9yVGlwLmh0bWwoXCLor6XmiYvmnLrlj7flt7Lnu4/ms6jlhozvvIzor7fnm7TmjqXnmbvlvZVcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCBmYWxzZSk7XG4gICAgfSxcbiAgICB2YWxpZGF0ZVVzZXJuYW1lOiBmdW5jdGlvbih1c2VybmFtZSkge1xuICAgICAgICB2YXIgcGhvbmVfcGF0dGVybiA9IC9eWzAtOV17MTF9JC87XG4gICAgICAgIGlmICghcGhvbmVfcGF0dGVybi50ZXN0KHVzZXJuYW1lKSkge1xuICAgICAgICAgICAgdGhpcy51c2VybmFtZUVycm9yVGlwLmh0bWwoXCLor7fovpPlhaXmraPnoa7nmoTmiYvmnLrlj7dcIik7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51c2VybmFtZUVycm9yVGlwLmh0bWwoXCJcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gICAgdmFsaWRhdGVDb2RlOiBmdW5jdGlvbihjb2RlKSB7XG4gICAgICAgIHZhciBjb2RlX3BhdHRlcm4gPSAvXlswLTldezR9JC87XG5cbiAgICAgICAgaWYgKCFjb2RlX3BhdHRlcm4udGVzdChjb2RlKSkge1xuICAgICAgICAgICAgdGhpcy5jb2RlRXJyb3JUaXAuaHRtbChcIuivt+i+k+WFpeato+ehrueahOmqjOivgeeggVwiKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvZGVFcnJvclRpcC5odG1sKFwiXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICAgIHZhbGlkYXRlUHdkOiBmdW5jdGlvbihwd2QpIHtcbiAgICAgICAgaWYgKHB3ZC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMucGFzc3dvcmRFcnJvclRpcC5odG1sKFwi5a+G56CB5LiN6IO95Li656m6XCIpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwd2QubGVuZ3RoID4gMTIgfHwgcHdkLmxlbmd0aCA8IDYpIHtcbiAgICAgICAgICAgIHRoaXMucGFzc3dvcmRFcnJvclRpcC5odG1sKFwi5a+G56CB55SxNi0xMuS9jeWtl+espue7hOaIkFwiKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBhc3N3b3JkRXJyb3JUaXAuaHRtbChcIlwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcbiAgICB3YWl0TG9naW5Db2RlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBzZWxmLmdldFBob25lQ29kZUJ0bi5yZW1vdmVDbGFzcyhcImJ0bi1lbmFibGVcIikuYWRkQ2xhc3MoXCJidG4tZGlzYWJsZVwiKS50ZXh0KFwi6YeN5paw6I635Y+WNjBzXCIpO1xuICAgICAgICB2YXIgaSA9IDU5O1xuICAgICAgICBzZWxmLnNldF9yZWdpc3Rlcl90aW1lID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZWxmLmdldFBob25lQ29kZUJ0bi50ZXh0KFwi6YeN5paw6I635Y+WXCIgKyBpICsgXCJzXCIpO1xuICAgICAgICAgICAgaS0tO1xuICAgICAgICAgICAgaWYgKGkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChzZWxmLnNldF9yZWdpc3Rlcl90aW1lKTtcbiAgICAgICAgICAgICAgICBzZWxmLmdldFBob25lQ29kZUJ0bi5yZW1vdmVDbGFzcyhcImJ0bi1kaXNhYmxlXCIpLmFkZENsYXNzKFwiYnRuLWVuYWJsZVwiKS50ZXh0KFwi6I635Y+W6aqM6K+B56CBXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAxMDAwKTtcbiAgICB9LFxuICAgIGdldFJlZ2lzdGVyUGhvbmVDb2RlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAoc2VsZi5nZXRQaG9uZUNvZGVCdG4uaGFzQ2xhc3MoXCJidG4tZGlzYWJsZVwiKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICBcInBob25lXCI6IHNlbGYudXNlcm5hbWVJdGVtSW5wdXQudmFsKClcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHVybCA9ICcvYXBpL3YyL3dlYi91c2Vycy9zZW5kLXNpZ251cC1jb2RlP3ZlcnNpb249MSc7XG5cbiAgICAgICAgaWYgKCFzZWxmLnZhbGlkYXRlVXNlcm5hbWUoZGF0YS5waG9uZSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNlbGYuY29kZUVycm9yVGlwLmh0bWwoXCJcIik7XG5cbiAgICAgICAgJGh0dHAodXJsKS5wb3N0KGRhdGEsIGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKHJlc3VsdC5yZXN1bHQgPT09IDApIHtcbiAgICAgICAgICAgICAgICBzZWxmLndhaXRMb2dpbkNvZGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi5nZXRQaG9uZUNvZGVCdG4ucmVtb3ZlQ2xhc3MoXCJidG4tZGlzYWJsZVwiKS5hZGRDbGFzcyhcImJ0bi1lbmFibGVcIikudGV4dChcIuiOt+WPlumqjOivgeeggVwiKTtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnJlc3VsdCA9PT0gNCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmNvZGVFcnJvclRpcC5odG1sKHJlc3VsdC5lcnJvcl9tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdC5yZXN1bHQgPT09IDkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jb2RlRXJyb3JUaXAuaHRtbChcIuWPkemAgeefreS/oeWksei0pe+8jOivt+eojeWQjuWGjeivlVwiKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdC5yZXN1bHQgPT09IDYpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi51c2VybmFtZUVycm9yVGlwLmh0bWwoXCLor6XmiYvmnLrlj7flt7Lnu4/ms6jlhozvvIzor7fnm7TmjqXnmbvlvZVcIik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQucmVzdWx0ID09PSAxMDEwKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYudXNlcm5hbWVFcnJvclRpcC5odG1sKFwi5omL5py65Y+35qC85byP6ZSZ6K+vXCIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzdWx0LnJlc3VsdCA9PT0gMTAwOSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmNvZGVFcnJvclRpcC5odG1sKFwi5Zu+54mH6aqM6K+B56CB6ZSZ6K+vXCIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzdWx0LnJlc3VsdCA9PT0gMTAxMikge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmNvZGVFcnJvclRpcC5odG1sKFwi6K+35rGC55qE5aSq6aKR57mB77yM6K+356iN562JMeWIhumSn+mHjeivlVwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGZhbHNlKTtcbiAgICB9XG59O1xuXG4hIGZ1bmN0aW9uKCkge1xuICAgIGlmICgkLmNvb2tpZShcImlkXCIpICYmICQuY29va2llKFwidXNlcm5hbWVcIikpIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWY9IFwiL1wiO1xuICAgIH1cbiAgICBcbiAgICByZWdpc3Rlci5pbml0KCk7XG4gICAgJChcIiNhZ3JlZW1lbnRcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlZ2lzdGVyLnNob3dQb3AoKTtcbiAgICB9KTtcbn0oKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvcmVnaXN0ZXIuanNcbiAqKiBtb2R1bGUgaWQgPSAwXG4gKiogbW9kdWxlIGNodW5rcyA9IDE4XG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==