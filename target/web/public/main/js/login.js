webpackJsonp([10,19],[
/* 0 */
/***/ function(module, exports) {

	var login = {
	    lognBoxShadeLayer: $("#login_box_shade_layer"),
	    loginBox: $("#login_box"),
	    loginBoxClose: $("#login_box_close"),
	    loginTypeLi: $("#login_type li"),
	    getPhoneCodeBtn: $("#get_phone_code"),
	    loginShowCaptchaImg: $("#login_show_captcha_img"),
	    autoLoginBtn: $("#auto_login"),
	    loginSubmitBtn: $("#login_submit"),
	    errorTipWhenLogin: $("#login_error_tip"),
	    errorTipWhenCodeLogin: $("#quick_login_error_tip"),
	    callBackWhenFinishLogin: null,
	    init: function() {
	        var self = this;
	        this.loginBoxClose.click(function() {
	            self.hidePop();
	        });
	        this.lognBoxShadeLayer.click(function() {
	            self.hidePop();
	        });
	        this.loginTypeLi.click(function(event) {
	            self.changeLoginType(event);
	        });
	        this.getPhoneCodeBtn.click(function() {
	            self.getLoginPhoneCode();
	        });
	        this.autoLoginBtn.click(function(event) {
	            self.setAutoLogin(event);
	        });
	        this.loginSubmitBtn.click(function() {
	            self.userLogin();
	        });
	    },
	    showPop: function(callBackWhenFinishLogin) {
	        var self = this;
	        this.loginBox.show();
	        this.lognBoxShadeLayer.show();
	        if (callBackWhenFinishLogin) {
	            this.callBackWhenFinishLogin = callBackWhenFinishLogin;
	        } else {
	            this.callBackWhenFinishLogin = null;
	        }
	    },
	    hidePop: function() {
	        this.loginBox.hide();
	        this.lognBoxShadeLayer.hide();
	    },
	    setAutoLogin: function(event) {
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
	    changeLoginType: function(event) {
	        var $target = $(event.target);
	        this.loginTypeLi.removeClass("login-type-checked");
	        $target.addClass("login-type-checked");
	        var type = $target.attr("data-type");
	        $("#login_submit").attr("data-type", type);
	        $("#login_box .form-type").hide();
	        $("#" + type).show();
	    },
	    userLogin: function() {
	        var self = this;
	        if (self.loginSubmitBtn.hasClass("btn-disable")) {
	            return;
	        }
	
	        self.initErrorTip();
	        var type = $("#login_submit").attr("data-type");
	        var url, data;
	        if (type == 'commonLog') {
	            data = {
	                "username": $("#login_item_username").val(),
	                "password": $("#login_item_password").val()
	            };
	            if (!self.validateUsernamePwd(data.username, data.password)) {
	                return;
	            }
	            url = '/api/v2/web/users/login';
	        } else {
	            data = {
	                "username": $("#login_item_phone").val(),
	                "password": $("#login_item_code").val()
	            };
	            if (!self.validatePhoneCode(data.username, data.password)) {
	                return;
	            }
	            url = '/api/v2/web/users/code-login';
	        }
	        self.initErrorTip();
	
	        var auto_login = $("#auto_login").hasClass("active");
	        data["auto_login"] = auto_login;
	
	        self.loginSubmitBtn.removeClass("btn-enable").addClass("btn-disable").text("正在登录，请稍后");
	
	        $http(url).post(data, function(result) {
	            self.loginSubmitBtn.removeClass("btn-disable").addClass("btn-enable").text("登 录");
	            if (result.result === 0) {
	                self.hidePop();
	
	                if (!result.display_name) {
	                    result.display_name = "暂无";
	                }
	
	                if (auto_login) {
	                    $.cookie("id", result.id, { expires: 30, path: '/' });
	                    $.cookie("userid", result.old_user_info_id, { expires: 30, path: '/' });
	                    $.cookie("truthid", result.uuid, { expires: 30, path: '/' });
	                    $.cookie("username", result.display_name, { expires: 30, path: '/' });
	                    $.cookie("image_url", result.image_url, { expires: 30, path: '/' });
	                    $.cookie("usertype", result.type, { expires: 30, path: '/' });
	                } else {
	                    $.cookie("id", result.id, { path: '/' });
	                    $.cookie("userid", result.old_user_info_id, { path: '/' });
	                    $.cookie("truthid", result.uuid, { path: '/' });
	                    $.cookie("username", result.display_name, { path: '/' });
	                    $.cookie("image_url", result.image_url, { path: '/' });
	                    $.cookie("usertype", result.type, { path: '/' });
	                }
	                
	                setHeaderLogin();
	
	                if (self.callBackWhenFinishLogin !== null) {
	                    self.callBackWhenFinishLogin();
	                } else {
	                    location.reload(true);
	                }
	            } else {
	                var errorTip = type == 'commonLog' ? self.errorTipWhenLogin : self.errorTipWhenCodeLogin;
	                if (result.result === 4) {
	                    errorTip.html(result.error_message);
	                } else if (result.result === 1013) {
	                    errorTip.html(type == 'commonLog' ? "手机号或密码错误" : "手机号或验证码错误");
	                } else if (result.result === 10) {
	                    errorTip.html("旧服务器出错，" + result.extra);
	                }
	            }
	        }, false);
	    },
	    initErrorTip: function() {
	        this.errorTipWhenLogin.html("");
	        this.errorTipWhenCodeLogin.html("");
	    },
	    validateUsernamePwd: function(username, pwd) {
	        var email_pattern = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/;
	        var phone_pattern = /^[0-9]{11}$/;
	        if (!email_pattern.test(username) && !phone_pattern.test(username)) {
	            this.errorTipWhenLogin.html("请输入正确的邮箱或手机号");
	            return false;
	        }
	        if (username.length > 50) {
	            this.errorTipWhenLogin.html("账号过长");
	            $("#login_item_username").focus();
	            return false;
	        }
	        if (pwd.length === 0) {
	            this.errorTipWhenLogin.html("密码不能为空");
	            $("#login_item_password").focus();
	            return false;
	        }
	        if (pwd.length > 50) {
	            this.errorTipWhenLogin.html("密码过长");
	            $("#login_item_password").focus();
	            return false;
	        }
	        return true;
	    },
	    validatePhone: function(phone) {
	        var phone_pattern = /^[0-9]{11}$/;
	        if (!phone_pattern.test(phone)) {
	            this.errorTipWhenCodeLogin.html("请输入正确的手机号");
	            $("#login_item_phone").focus();
	            return false;
	        }
	        return true;
	    },
	    validatePhoneCode: function(phone, code) {
	        var code_pattern = /^[0-9]{4}$/;
	
	        if (!this.validatePhone(phone)) {
	            return false;
	        }
	        if (!code_pattern.test(code)) {
	            this.errorTipWhenCodeLogin.html("请输入正确的验证码");
	            $("#login_item_code").focus();
	            return false;
	        }
	        return true;
	    },
	    waitLoginCode: function() {
	        var self = this;
	        self.getPhoneCodeBtn.removeClass("btn-enable").addClass("btn-disable").text("重新获取60s");
	        var i = 59;
	        self.set_login_time = setInterval(function() {
	            self.getPhoneCodeBtn.text("重新获取" + i + "s");
	            i--;
	            if (i === -1) {
	                clearInterval(self.set_login_time);
	                self.getPhoneCodeBtn.removeClass("btn-disable").addClass("btn-enable").text("获取验证码");
	            }
	        }, 1000);
	    },
	    getLoginPhoneCode: function() {
	        var self = this;
	        if (self.getPhoneCodeBtn.hasClass("btn-disable")) {
	            return;
	        }
	
	        self.errorTipWhenCodeLogin.html("");
	
	        var data = {
	            "phone": $("#login_item_phone").val()
	        };
	        var url = '/api/v2/web/users/send-login-code';
	
	        if (!self.validatePhone(data.phone)) {
	            return;
	        }
	
	        self.errorTipWhenCodeLogin.html("");
	
	        $http(url).post(data, function(result) {
	            if (result.result === 0) {
	                self.waitLoginCode();
	            } else {
	                self.getPhoneCodeBtn.removeClass("btn-disable").addClass("btn-enable").text("获取验证码");
	                if (result.result === 4) {
	                    self.errorTipWhenCodeLogin.html(result.error_message);
	                } else if (result.result === 9) {
	                    self.errorTipWhenCodeLogin.html("发送短信失败，请稍后再试");
	                } else if (result.result === 1010) {
	                    self.errorTipWhenCodeLogin.html("手机号格式错误");
	                } else if (result.result === 1009) {
	                    self.errorTipWhenCodeLogin.html("文字验证码错误");
	                } else if (result.result === 1012) {
	                    self.errorTipWhenCodeLogin.html("请求的太频繁，请稍等1分钟重试");
	                }
	            }
	        }, false);
	    }
	};
	
	//判断登录状态
	function setHeaderLogin() {
	    var truthId = $.cookie("truthid");
	    var userName = $.cookie("username");
	    if (truthId && userName) {
	        if (userName.length > 4) {
	            $(".header-fixed-list #userName").parent().parent().attr("title", userName);
	            userName = userName.substr(0, 4) + "...";
	        }
	        $(".header-fixed-list #userName").text(userName);
	        $(".header-fixed-list .log-in").css("display", "inline-block");
	        $(".header-fixed-list .log-out").hide();
	    } else {
	        $(".header-fixed-list .log-out").css("display", "inline-block");
	        $(".header-fixed-list .log-in").hide();
	    }
	}
	
	! function() {
	    login.init();
	    $("#login_in_header").click(function() {
	        login.showPop();
	    });
	
	    if ((location.pathname === "/") && (location.hash.indexOf("showLogin") > 0) && !($.cookie("id") && $.cookie("username"))) {
	        login.showPop();
	    }
	
	    setHeaderLogin();
	    $(".logout-in-header").click(function() {
	        var url = '/api/v2/users/logout';
	        $http(url).get(function(result){
	            $.cookie("id", "", { expires: -1, path: '/' });
	            $.cookie("userid", "", { expires: -1, path: '/' });
	            $.cookie("truthid", "", { expires: -1, path: '/' });
	            $.cookie("username", "", { expires: -1, path: '/' });
	            $.cookie("image_url", "", { expires: -1, path: '/' });
	            $.cookie("usertype", "", { expires: -1, path: '/' });
	
	            location.href = "/";
	        });
	    });
	}();


/***/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvbG9naW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVM7QUFDVCxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdEQUErQyx5QkFBeUI7QUFDeEUsa0VBQWlFLHlCQUF5QjtBQUMxRix1REFBc0QseUJBQXlCO0FBQy9FLGdFQUErRCx5QkFBeUI7QUFDeEYsOERBQTZELHlCQUF5QjtBQUN0Rix3REFBdUQseUJBQXlCO0FBQ2hGLGtCQUFpQjtBQUNqQixnREFBK0MsWUFBWTtBQUMzRCxrRUFBaUUsWUFBWTtBQUM3RSx1REFBc0QsWUFBWTtBQUNsRSxnRUFBK0QsWUFBWTtBQUMzRSw4REFBNkQsWUFBWTtBQUN6RSx3REFBdUQsWUFBWTtBQUNuRTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVCxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxxQ0FBb0MsR0FBRztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EscUNBQW9DLEdBQUc7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0Esb0NBQW1DLEVBQUU7O0FBRXJDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNULE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWdDLHlCQUF5QjtBQUN6RCxxQ0FBb0MseUJBQXlCO0FBQzdELHNDQUFxQyx5QkFBeUI7QUFDOUQsdUNBQXNDLHlCQUF5QjtBQUMvRCx3Q0FBdUMseUJBQXlCO0FBQ2hFLHVDQUFzQyx5QkFBeUI7O0FBRS9EO0FBQ0EsVUFBUztBQUNULE1BQUs7QUFDTCxFQUFDIiwiZmlsZSI6ImpzL2xvZ2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGxvZ2luID0ge1xuICAgIGxvZ25Cb3hTaGFkZUxheWVyOiAkKFwiI2xvZ2luX2JveF9zaGFkZV9sYXllclwiKSxcbiAgICBsb2dpbkJveDogJChcIiNsb2dpbl9ib3hcIiksXG4gICAgbG9naW5Cb3hDbG9zZTogJChcIiNsb2dpbl9ib3hfY2xvc2VcIiksXG4gICAgbG9naW5UeXBlTGk6ICQoXCIjbG9naW5fdHlwZSBsaVwiKSxcbiAgICBnZXRQaG9uZUNvZGVCdG46ICQoXCIjZ2V0X3Bob25lX2NvZGVcIiksXG4gICAgbG9naW5TaG93Q2FwdGNoYUltZzogJChcIiNsb2dpbl9zaG93X2NhcHRjaGFfaW1nXCIpLFxuICAgIGF1dG9Mb2dpbkJ0bjogJChcIiNhdXRvX2xvZ2luXCIpLFxuICAgIGxvZ2luU3VibWl0QnRuOiAkKFwiI2xvZ2luX3N1Ym1pdFwiKSxcbiAgICBlcnJvclRpcFdoZW5Mb2dpbjogJChcIiNsb2dpbl9lcnJvcl90aXBcIiksXG4gICAgZXJyb3JUaXBXaGVuQ29kZUxvZ2luOiAkKFwiI3F1aWNrX2xvZ2luX2Vycm9yX3RpcFwiKSxcbiAgICBjYWxsQmFja1doZW5GaW5pc2hMb2dpbjogbnVsbCxcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLmxvZ2luQm94Q2xvc2UuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZWxmLmhpZGVQb3AoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubG9nbkJveFNoYWRlTGF5ZXIuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZWxmLmhpZGVQb3AoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubG9naW5UeXBlTGkuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIHNlbGYuY2hhbmdlTG9naW5UeXBlKGV2ZW50KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZ2V0UGhvbmVDb2RlQnRuLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2VsZi5nZXRMb2dpblBob25lQ29kZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5hdXRvTG9naW5CdG4uY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIHNlbGYuc2V0QXV0b0xvZ2luKGV2ZW50KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubG9naW5TdWJtaXRCdG4uY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZWxmLnVzZXJMb2dpbigpO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHNob3dQb3A6IGZ1bmN0aW9uKGNhbGxCYWNrV2hlbkZpbmlzaExvZ2luKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5sb2dpbkJveC5zaG93KCk7XG4gICAgICAgIHRoaXMubG9nbkJveFNoYWRlTGF5ZXIuc2hvdygpO1xuICAgICAgICBpZiAoY2FsbEJhY2tXaGVuRmluaXNoTG9naW4pIHtcbiAgICAgICAgICAgIHRoaXMuY2FsbEJhY2tXaGVuRmluaXNoTG9naW4gPSBjYWxsQmFja1doZW5GaW5pc2hMb2dpbjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2FsbEJhY2tXaGVuRmluaXNoTG9naW4gPSBudWxsO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBoaWRlUG9wOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5sb2dpbkJveC5oaWRlKCk7XG4gICAgICAgIHRoaXMubG9nbkJveFNoYWRlTGF5ZXIuaGlkZSgpO1xuICAgIH0sXG4gICAgc2V0QXV0b0xvZ2luOiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICB2YXIgJHRhcmdldDtcbiAgICAgICAgaWYgKCQoZXZlbnQudGFyZ2V0KS5pcyhcInNwYW5cIikpIHtcbiAgICAgICAgICAgICR0YXJnZXQgPSAkKGV2ZW50LnRhcmdldCkucGFyZW50KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkdGFyZ2V0ID0gJChldmVudC50YXJnZXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICgkdGFyZ2V0Lmhhc0NsYXNzKFwiYWN0aXZlXCIpKSB7XG4gICAgICAgICAgICAkdGFyZ2V0LnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJHRhcmdldC5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgY2hhbmdlTG9naW5UeXBlOiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICB2YXIgJHRhcmdldCA9ICQoZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgdGhpcy5sb2dpblR5cGVMaS5yZW1vdmVDbGFzcyhcImxvZ2luLXR5cGUtY2hlY2tlZFwiKTtcbiAgICAgICAgJHRhcmdldC5hZGRDbGFzcyhcImxvZ2luLXR5cGUtY2hlY2tlZFwiKTtcbiAgICAgICAgdmFyIHR5cGUgPSAkdGFyZ2V0LmF0dHIoXCJkYXRhLXR5cGVcIik7XG4gICAgICAgICQoXCIjbG9naW5fc3VibWl0XCIpLmF0dHIoXCJkYXRhLXR5cGVcIiwgdHlwZSk7XG4gICAgICAgICQoXCIjbG9naW5fYm94IC5mb3JtLXR5cGVcIikuaGlkZSgpO1xuICAgICAgICAkKFwiI1wiICsgdHlwZSkuc2hvdygpO1xuICAgIH0sXG4gICAgdXNlckxvZ2luOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAoc2VsZi5sb2dpblN1Ym1pdEJ0bi5oYXNDbGFzcyhcImJ0bi1kaXNhYmxlXCIpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzZWxmLmluaXRFcnJvclRpcCgpO1xuICAgICAgICB2YXIgdHlwZSA9ICQoXCIjbG9naW5fc3VibWl0XCIpLmF0dHIoXCJkYXRhLXR5cGVcIik7XG4gICAgICAgIHZhciB1cmwsIGRhdGE7XG4gICAgICAgIGlmICh0eXBlID09ICdjb21tb25Mb2cnKSB7XG4gICAgICAgICAgICBkYXRhID0ge1xuICAgICAgICAgICAgICAgIFwidXNlcm5hbWVcIjogJChcIiNsb2dpbl9pdGVtX3VzZXJuYW1lXCIpLnZhbCgpLFxuICAgICAgICAgICAgICAgIFwicGFzc3dvcmRcIjogJChcIiNsb2dpbl9pdGVtX3Bhc3N3b3JkXCIpLnZhbCgpXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKCFzZWxmLnZhbGlkYXRlVXNlcm5hbWVQd2QoZGF0YS51c2VybmFtZSwgZGF0YS5wYXNzd29yZCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB1cmwgPSAnL2FwaS92Mi93ZWIvdXNlcnMvbG9naW4nO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICBcInVzZXJuYW1lXCI6ICQoXCIjbG9naW5faXRlbV9waG9uZVwiKS52YWwoKSxcbiAgICAgICAgICAgICAgICBcInBhc3N3b3JkXCI6ICQoXCIjbG9naW5faXRlbV9jb2RlXCIpLnZhbCgpXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKCFzZWxmLnZhbGlkYXRlUGhvbmVDb2RlKGRhdGEudXNlcm5hbWUsIGRhdGEucGFzc3dvcmQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdXJsID0gJy9hcGkvdjIvd2ViL3VzZXJzL2NvZGUtbG9naW4nO1xuICAgICAgICB9XG4gICAgICAgIHNlbGYuaW5pdEVycm9yVGlwKCk7XG5cbiAgICAgICAgdmFyIGF1dG9fbG9naW4gPSAkKFwiI2F1dG9fbG9naW5cIikuaGFzQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgICAgIGRhdGFbXCJhdXRvX2xvZ2luXCJdID0gYXV0b19sb2dpbjtcblxuICAgICAgICBzZWxmLmxvZ2luU3VibWl0QnRuLnJlbW92ZUNsYXNzKFwiYnRuLWVuYWJsZVwiKS5hZGRDbGFzcyhcImJ0bi1kaXNhYmxlXCIpLnRleHQoXCLmraPlnKjnmbvlvZXvvIzor7fnqI3lkI5cIik7XG5cbiAgICAgICAgJGh0dHAodXJsKS5wb3N0KGRhdGEsIGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgc2VsZi5sb2dpblN1Ym1pdEJ0bi5yZW1vdmVDbGFzcyhcImJ0bi1kaXNhYmxlXCIpLmFkZENsYXNzKFwiYnRuLWVuYWJsZVwiKS50ZXh0KFwi55m7IOW9lVwiKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQucmVzdWx0ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5oaWRlUG9wKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdC5kaXNwbGF5X25hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmRpc3BsYXlfbmFtZSA9IFwi5pqC5pegXCI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGF1dG9fbG9naW4pIHtcbiAgICAgICAgICAgICAgICAgICAgJC5jb29raWUoXCJpZFwiLCByZXN1bHQuaWQsIHsgZXhwaXJlczogMzAsIHBhdGg6ICcvJyB9KTtcbiAgICAgICAgICAgICAgICAgICAgJC5jb29raWUoXCJ1c2VyaWRcIiwgcmVzdWx0Lm9sZF91c2VyX2luZm9faWQsIHsgZXhwaXJlczogMzAsIHBhdGg6ICcvJyB9KTtcbiAgICAgICAgICAgICAgICAgICAgJC5jb29raWUoXCJ0cnV0aGlkXCIsIHJlc3VsdC51dWlkLCB7IGV4cGlyZXM6IDMwLCBwYXRoOiAnLycgfSk7XG4gICAgICAgICAgICAgICAgICAgICQuY29va2llKFwidXNlcm5hbWVcIiwgcmVzdWx0LmRpc3BsYXlfbmFtZSwgeyBleHBpcmVzOiAzMCwgcGF0aDogJy8nIH0pO1xuICAgICAgICAgICAgICAgICAgICAkLmNvb2tpZShcImltYWdlX3VybFwiLCByZXN1bHQuaW1hZ2VfdXJsLCB7IGV4cGlyZXM6IDMwLCBwYXRoOiAnLycgfSk7XG4gICAgICAgICAgICAgICAgICAgICQuY29va2llKFwidXNlcnR5cGVcIiwgcmVzdWx0LnR5cGUsIHsgZXhwaXJlczogMzAsIHBhdGg6ICcvJyB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkLmNvb2tpZShcImlkXCIsIHJlc3VsdC5pZCwgeyBwYXRoOiAnLycgfSk7XG4gICAgICAgICAgICAgICAgICAgICQuY29va2llKFwidXNlcmlkXCIsIHJlc3VsdC5vbGRfdXNlcl9pbmZvX2lkLCB7IHBhdGg6ICcvJyB9KTtcbiAgICAgICAgICAgICAgICAgICAgJC5jb29raWUoXCJ0cnV0aGlkXCIsIHJlc3VsdC51dWlkLCB7IHBhdGg6ICcvJyB9KTtcbiAgICAgICAgICAgICAgICAgICAgJC5jb29raWUoXCJ1c2VybmFtZVwiLCByZXN1bHQuZGlzcGxheV9uYW1lLCB7IHBhdGg6ICcvJyB9KTtcbiAgICAgICAgICAgICAgICAgICAgJC5jb29raWUoXCJpbWFnZV91cmxcIiwgcmVzdWx0LmltYWdlX3VybCwgeyBwYXRoOiAnLycgfSk7XG4gICAgICAgICAgICAgICAgICAgICQuY29va2llKFwidXNlcnR5cGVcIiwgcmVzdWx0LnR5cGUsIHsgcGF0aDogJy8nIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBzZXRIZWFkZXJMb2dpbigpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuY2FsbEJhY2tXaGVuRmluaXNoTG9naW4gIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jYWxsQmFja1doZW5GaW5pc2hMb2dpbigpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCh0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBlcnJvclRpcCA9IHR5cGUgPT0gJ2NvbW1vbkxvZycgPyBzZWxmLmVycm9yVGlwV2hlbkxvZ2luIDogc2VsZi5lcnJvclRpcFdoZW5Db2RlTG9naW47XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5yZXN1bHQgPT09IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JUaXAuaHRtbChyZXN1bHQuZXJyb3JfbWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQucmVzdWx0ID09PSAxMDEzKSB7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yVGlwLmh0bWwodHlwZSA9PSAnY29tbW9uTG9nJyA/IFwi5omL5py65Y+35oiW5a+G56CB6ZSZ6K+vXCIgOiBcIuaJi+acuuWPt+aIlumqjOivgeeggemUmeivr1wiKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdC5yZXN1bHQgPT09IDEwKSB7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yVGlwLmh0bWwoXCLml6fmnI3liqHlmajlh7rplJnvvIxcIiArIHJlc3VsdC5leHRyYSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCBmYWxzZSk7XG4gICAgfSxcbiAgICBpbml0RXJyb3JUaXA6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmVycm9yVGlwV2hlbkxvZ2luLmh0bWwoXCJcIik7XG4gICAgICAgIHRoaXMuZXJyb3JUaXBXaGVuQ29kZUxvZ2luLmh0bWwoXCJcIik7XG4gICAgfSxcbiAgICB2YWxpZGF0ZVVzZXJuYW1lUHdkOiBmdW5jdGlvbih1c2VybmFtZSwgcHdkKSB7XG4gICAgICAgIHZhciBlbWFpbF9wYXR0ZXJuID0gL14oW2EtekEtWjAtOV8tXSkrQChbYS16QS1aMC05Xy1dKSsoLlthLXpBLVowLTlfLV0pKyQvO1xuICAgICAgICB2YXIgcGhvbmVfcGF0dGVybiA9IC9eWzAtOV17MTF9JC87XG4gICAgICAgIGlmICghZW1haWxfcGF0dGVybi50ZXN0KHVzZXJuYW1lKSAmJiAhcGhvbmVfcGF0dGVybi50ZXN0KHVzZXJuYW1lKSkge1xuICAgICAgICAgICAgdGhpcy5lcnJvclRpcFdoZW5Mb2dpbi5odG1sKFwi6K+36L6T5YWl5q2j56Gu55qE6YKu566x5oiW5omL5py65Y+3XCIpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1c2VybmFtZS5sZW5ndGggPiA1MCkge1xuICAgICAgICAgICAgdGhpcy5lcnJvclRpcFdoZW5Mb2dpbi5odG1sKFwi6LSm5Y+36L+H6ZW/XCIpO1xuICAgICAgICAgICAgJChcIiNsb2dpbl9pdGVtX3VzZXJuYW1lXCIpLmZvY3VzKCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHB3ZC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3JUaXBXaGVuTG9naW4uaHRtbChcIuWvhueggeS4jeiDveS4uuepulwiKTtcbiAgICAgICAgICAgICQoXCIjbG9naW5faXRlbV9wYXNzd29yZFwiKS5mb2N1cygpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwd2QubGVuZ3RoID4gNTApIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3JUaXBXaGVuTG9naW4uaHRtbChcIuWvhueggei/h+mVv1wiKTtcbiAgICAgICAgICAgICQoXCIjbG9naW5faXRlbV9wYXNzd29yZFwiKS5mb2N1cygpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gICAgdmFsaWRhdGVQaG9uZTogZnVuY3Rpb24ocGhvbmUpIHtcbiAgICAgICAgdmFyIHBob25lX3BhdHRlcm4gPSAvXlswLTldezExfSQvO1xuICAgICAgICBpZiAoIXBob25lX3BhdHRlcm4udGVzdChwaG9uZSkpIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3JUaXBXaGVuQ29kZUxvZ2luLmh0bWwoXCLor7fovpPlhaXmraPnoa7nmoTmiYvmnLrlj7dcIik7XG4gICAgICAgICAgICAkKFwiI2xvZ2luX2l0ZW1fcGhvbmVcIikuZm9jdXMoKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICAgIHZhbGlkYXRlUGhvbmVDb2RlOiBmdW5jdGlvbihwaG9uZSwgY29kZSkge1xuICAgICAgICB2YXIgY29kZV9wYXR0ZXJuID0gL15bMC05XXs0fSQvO1xuXG4gICAgICAgIGlmICghdGhpcy52YWxpZGF0ZVBob25lKHBob25lKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY29kZV9wYXR0ZXJuLnRlc3QoY29kZSkpIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3JUaXBXaGVuQ29kZUxvZ2luLmh0bWwoXCLor7fovpPlhaXmraPnoa7nmoTpqozor4HnoIFcIik7XG4gICAgICAgICAgICAkKFwiI2xvZ2luX2l0ZW1fY29kZVwiKS5mb2N1cygpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gICAgd2FpdExvZ2luQ29kZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgc2VsZi5nZXRQaG9uZUNvZGVCdG4ucmVtb3ZlQ2xhc3MoXCJidG4tZW5hYmxlXCIpLmFkZENsYXNzKFwiYnRuLWRpc2FibGVcIikudGV4dChcIumHjeaWsOiOt+WPljYwc1wiKTtcbiAgICAgICAgdmFyIGkgPSA1OTtcbiAgICAgICAgc2VsZi5zZXRfbG9naW5fdGltZSA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2VsZi5nZXRQaG9uZUNvZGVCdG4udGV4dChcIumHjeaWsOiOt+WPllwiICsgaSArIFwic1wiKTtcbiAgICAgICAgICAgIGktLTtcbiAgICAgICAgICAgIGlmIChpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoc2VsZi5zZXRfbG9naW5fdGltZSk7XG4gICAgICAgICAgICAgICAgc2VsZi5nZXRQaG9uZUNvZGVCdG4ucmVtb3ZlQ2xhc3MoXCJidG4tZGlzYWJsZVwiKS5hZGRDbGFzcyhcImJ0bi1lbmFibGVcIikudGV4dChcIuiOt+WPlumqjOivgeeggVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMTAwMCk7XG4gICAgfSxcbiAgICBnZXRMb2dpblBob25lQ29kZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgaWYgKHNlbGYuZ2V0UGhvbmVDb2RlQnRuLmhhc0NsYXNzKFwiYnRuLWRpc2FibGVcIikpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNlbGYuZXJyb3JUaXBXaGVuQ29kZUxvZ2luLmh0bWwoXCJcIik7XG5cbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICBcInBob25lXCI6ICQoXCIjbG9naW5faXRlbV9waG9uZVwiKS52YWwoKVxuICAgICAgICB9O1xuICAgICAgICB2YXIgdXJsID0gJy9hcGkvdjIvd2ViL3VzZXJzL3NlbmQtbG9naW4tY29kZSc7XG5cbiAgICAgICAgaWYgKCFzZWxmLnZhbGlkYXRlUGhvbmUoZGF0YS5waG9uZSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNlbGYuZXJyb3JUaXBXaGVuQ29kZUxvZ2luLmh0bWwoXCJcIik7XG5cbiAgICAgICAgJGh0dHAodXJsKS5wb3N0KGRhdGEsIGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKHJlc3VsdC5yZXN1bHQgPT09IDApIHtcbiAgICAgICAgICAgICAgICBzZWxmLndhaXRMb2dpbkNvZGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi5nZXRQaG9uZUNvZGVCdG4ucmVtb3ZlQ2xhc3MoXCJidG4tZGlzYWJsZVwiKS5hZGRDbGFzcyhcImJ0bi1lbmFibGVcIikudGV4dChcIuiOt+WPlumqjOivgeeggVwiKTtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnJlc3VsdCA9PT0gNCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmVycm9yVGlwV2hlbkNvZGVMb2dpbi5odG1sKHJlc3VsdC5lcnJvcl9tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdC5yZXN1bHQgPT09IDkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5lcnJvclRpcFdoZW5Db2RlTG9naW4uaHRtbChcIuWPkemAgeefreS/oeWksei0pe+8jOivt+eojeWQjuWGjeivlVwiKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdC5yZXN1bHQgPT09IDEwMTApIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5lcnJvclRpcFdoZW5Db2RlTG9naW4uaHRtbChcIuaJi+acuuWPt+agvOW8j+mUmeivr1wiKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdC5yZXN1bHQgPT09IDEwMDkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5lcnJvclRpcFdoZW5Db2RlTG9naW4uaHRtbChcIuaWh+Wtl+mqjOivgeeggemUmeivr1wiKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdC5yZXN1bHQgPT09IDEwMTIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5lcnJvclRpcFdoZW5Db2RlTG9naW4uaHRtbChcIuivt+axgueahOWkqumikee5ge+8jOivt+eojeetiTHliIbpkp/ph43or5VcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCBmYWxzZSk7XG4gICAgfVxufTtcblxuLy/liKTmlq3nmbvlvZXnirbmgIFcbmZ1bmN0aW9uIHNldEhlYWRlckxvZ2luKCkge1xuICAgIHZhciB0cnV0aElkID0gJC5jb29raWUoXCJ0cnV0aGlkXCIpO1xuICAgIHZhciB1c2VyTmFtZSA9ICQuY29va2llKFwidXNlcm5hbWVcIik7XG4gICAgaWYgKHRydXRoSWQgJiYgdXNlck5hbWUpIHtcbiAgICAgICAgaWYgKHVzZXJOYW1lLmxlbmd0aCA+IDQpIHtcbiAgICAgICAgICAgICQoXCIuaGVhZGVyLWZpeGVkLWxpc3QgI3VzZXJOYW1lXCIpLnBhcmVudCgpLnBhcmVudCgpLmF0dHIoXCJ0aXRsZVwiLCB1c2VyTmFtZSk7XG4gICAgICAgICAgICB1c2VyTmFtZSA9IHVzZXJOYW1lLnN1YnN0cigwLCA0KSArIFwiLi4uXCI7XG4gICAgICAgIH1cbiAgICAgICAgJChcIi5oZWFkZXItZml4ZWQtbGlzdCAjdXNlck5hbWVcIikudGV4dCh1c2VyTmFtZSk7XG4gICAgICAgICQoXCIuaGVhZGVyLWZpeGVkLWxpc3QgLmxvZy1pblwiKS5jc3MoXCJkaXNwbGF5XCIsIFwiaW5saW5lLWJsb2NrXCIpO1xuICAgICAgICAkKFwiLmhlYWRlci1maXhlZC1saXN0IC5sb2ctb3V0XCIpLmhpZGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkKFwiLmhlYWRlci1maXhlZC1saXN0IC5sb2ctb3V0XCIpLmNzcyhcImRpc3BsYXlcIiwgXCJpbmxpbmUtYmxvY2tcIik7XG4gICAgICAgICQoXCIuaGVhZGVyLWZpeGVkLWxpc3QgLmxvZy1pblwiKS5oaWRlKCk7XG4gICAgfVxufVxuXG4hIGZ1bmN0aW9uKCkge1xuICAgIGxvZ2luLmluaXQoKTtcbiAgICAkKFwiI2xvZ2luX2luX2hlYWRlclwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgbG9naW4uc2hvd1BvcCgpO1xuICAgIH0pO1xuXG4gICAgaWYgKChsb2NhdGlvbi5wYXRobmFtZSA9PT0gXCIvXCIpICYmIChsb2NhdGlvbi5oYXNoLmluZGV4T2YoXCJzaG93TG9naW5cIikgPiAwKSAmJiAhKCQuY29va2llKFwiaWRcIikgJiYgJC5jb29raWUoXCJ1c2VybmFtZVwiKSkpIHtcbiAgICAgICAgbG9naW4uc2hvd1BvcCgpO1xuICAgIH1cblxuICAgIHNldEhlYWRlckxvZ2luKCk7XG4gICAgJChcIi5sb2dvdXQtaW4taGVhZGVyXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdXJsID0gJy9hcGkvdjIvdXNlcnMvbG9nb3V0JztcbiAgICAgICAgJGh0dHAodXJsKS5nZXQoZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICQuY29va2llKFwiaWRcIiwgXCJcIiwgeyBleHBpcmVzOiAtMSwgcGF0aDogJy8nIH0pO1xuICAgICAgICAgICAgJC5jb29raWUoXCJ1c2VyaWRcIiwgXCJcIiwgeyBleHBpcmVzOiAtMSwgcGF0aDogJy8nIH0pO1xuICAgICAgICAgICAgJC5jb29raWUoXCJ0cnV0aGlkXCIsIFwiXCIsIHsgZXhwaXJlczogLTEsIHBhdGg6ICcvJyB9KTtcbiAgICAgICAgICAgICQuY29va2llKFwidXNlcm5hbWVcIiwgXCJcIiwgeyBleHBpcmVzOiAtMSwgcGF0aDogJy8nIH0pO1xuICAgICAgICAgICAgJC5jb29raWUoXCJpbWFnZV91cmxcIiwgXCJcIiwgeyBleHBpcmVzOiAtMSwgcGF0aDogJy8nIH0pO1xuICAgICAgICAgICAgJC5jb29raWUoXCJ1c2VydHlwZVwiLCBcIlwiLCB7IGV4cGlyZXM6IC0xLCBwYXRoOiAnLycgfSk7XG5cbiAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSBcIi9cIjtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KCk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2xvZ2luLmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSAxMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=