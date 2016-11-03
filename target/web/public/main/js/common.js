webpackJsonp([2,19],[
/* 0 */
/***/ function(module, exports) {

	/*
	    商品详情页数量加减操作
	    addOption.bindEvent()
	 */
	var addOption = {
	    bindEvent: function() {
	        var self = this;
	        $(".plus").click(function(event) {
	            self.addOptionPlus(event);
	        })
	        $(".minus").click(function(event) {
	            self.addOptionMinus(event);
	        })
	        $(".value").change(function(event) {
	            self.addOptionValue(event);
	        })
	    },
	    addOptionPlus: function(event) { //加1
	        var target = $(event.target);
	        var addOption = target.parent();
	        var value = addOption.find(".value");
	        if (!target.hasClass("disabled")) {
	            var val = parseInt(value.val());
	            var min = parseInt(value.attr("min-num"));
	            var max = parseInt(value.attr("max-num"));
	            var now = (val + 1) > max ? max : val + 1;
	            if (!isNaN(min) && now > min) {
	                addOption.find(".minus").removeClass("disabled");
	            }
	            if (!isNaN(max) && now >= max) {
	                addOption.find(".plus").addClass("disabled");
	            }
	            value.val(now);
	        }
	    },
	    addOptionMinus: function(event) { //减1
	        var target = $(event.target);
	        var addOption = target.parent();
	        var value = addOption.find(".value");
	        if (!target.hasClass("disabled")) {
	            var val = parseInt(value.val());
	            var min = parseInt(value.attr("min-num"));
	            var max = parseInt(value.attr("max-num"));
	            var now = (val - 1) < min ? min : val - 1;
	            if (!isNaN(min) && now <= min) {
	                value.val(min);
	                addOption.find(".minus").addClass("disabled");
	            }
	            if (!isNaN(max) && now <= max) {
	                addOption.find(".plus").removeClass("disabled");
	            }
	            value.val(now);
	        }
	    },
	    addOptionValue: function(event) { //直接写入数值
	        var target = $(event.target);
	        var addOption = target.parent();
	        var org_val = target.val() ? target.val() : min;
	        var val = parseInt(target.val());
	        var min = parseInt(target.attr("min-num"));
	        var max = parseInt(target.attr("max-num"));
	        if (isNaN(org_val)) {
	            if (isNaN(val)) {
	                val = min;
	                target.val(min);
	            } else {
	                target.val(val);
	            }
	
	        } else if (org_val !== val) {
	            target.val(val);
	        }
	        if (!isNaN(min) && val <= min) {
	            target.val(min);
	            addOption.find(".minus").addClass("disabled");
	        } else {
	            addOption.find(".minus").removeClass("disabled");
	        }
	        if (!isNaN(max) && val >= max) {
	            target.val(max);
	            addOption.find(".plus").addClass("disabled");
	        } else {
	            addOption.find(".plus").removeClass("disabled");
	        }
	    }
	};
	/**
	    商品详情中图片放大镜和鼠标悬浮换图
	 */
	var imgZoom = {
	    imgShow: $("#image_show"),
	    imgSpan: $("#image_show span"),
	    imgBig: $("#image_big"),
	    bindEvent: function() {
	        var self = this;
	        this.showImg();
	        $("#imageList").delegate("li", "mouseover", function(event) {
	            self.changeImg(event);
	        })
	        self.imgShow.mouseover(function() {
	            self.imgSpan.show();
	            self.imgBig.show();
	        })
	        self.imgShow.mouseout(function() {
	            self.imgSpan.hide();
	            self.imgBig.hide();
	        })
	        self.imgShow.mousemove(function(event) {
	            self.showBigImg(event);
	        })
	    },
	    changeImg: function(event) {
	        var target;
	        $("#imageList li").removeClass("active");
	        if (event.target.nodeName.toLowerCase() === "img") {
	            target = $(event.target.parentNode);
	        } else {
	            target = $(event.target);
	        }
	        target.addClass("active");
	        this.showImg(target);
	    },
	    showImg: function(target) {
	        if (target) {
	            var imgUrl = target.find("img").attr("src");
	        } else {
	            var first = $("#imageList li:first-child");
	            first.addClass("active");
	            var imgUrl = first.find("img").attr("src");
	        }
	        this.imgShow.find("img").attr("src", imgUrl);
	        this.imgBig.find("img").attr("src", imgUrl);
	    },
	    showBigImg: function(event) {
	        var imgOrg = this.imgBig.find("img");
	        var scrollTop = $(document).scrollTop();
	        var imgTop;
	        if (scrollTop == 0) {
	            imgTop = this.imgShow.offset().top;
	        } else {
	            imgTop = this.imgShow.offset().top - scrollTop;
	        }
	        var x = event.clientX - this.imgShow.offset().left - (this.imgSpan.width() / 2);
	        var y = event.clientY - imgTop - (this.imgSpan.height() / 2);
	
	        if (x < 0) {
	            x = 0;
	        } else if (x > this.imgShow.width() - this.imgSpan.width()) {
	            x = this.imgShow.width() - this.imgSpan.width();
	        }
	        if (y < 0) {
	            y = 0;
	        } else if (y > this.imgShow.height() - this.imgSpan.height()) {
	            y = this.imgShow.height() - this.imgSpan.height();
	        }
	
	        this.imgSpan.css({ left: x + "px", top: y + "px" });
	        var percentX = x / (this.imgShow.width() - this.imgSpan.width());
	        var percentY = y / (this.imgShow.height() - this.imgSpan.height());
	        var left = -percentX * (imgOrg.width() - this.imgBig.width()) + 'px';
	        var top = -percentY * (imgOrg.height() - this.imgBig.height()) + 'px';
	        imgOrg.css({ left: left, top: top });
	    },
	};
	/*
	    弹窗事件
	    打开弹窗用popUp.showPop()
	 */
	var popUp = {
	    modal_layer: $(".modal-layer"),
	    modal: $(".modal"),
	    close: $(".modal .close"),
	    bindEvent: function() {
	        var self = this;
	        this.close.click(function() {
	            self.hidePop();
	        });
	        this.modal_layer.click(function() {
	            self.hidePop();
	        });
	        $(".modal .no-stay").click(function() {
	            popUp.hidePop();
	        });
	    },
	    showPop: function(id) {
	        if (id) {
	            $(id).show();
	        } else {
	            this.modal.show();
	        }
	        this.modal_layer.show();
	        this.bindEvent();
	    },
	    hidePop: function(id) {
	        if (id) {
	            $(id).hide();
	        } else {
	            this.modal.hide();
	        }
	        this.modal_layer.hide();
	    },
	};
	/*
	    上传文件组件
	 */
	var uploadComp = {
	    isAdmin: location.pathname.indexOf("admin") > 0 ? true : false,
	    fileSize: 1024 * 1048576, //文件大小限制，单位Byte
	    bindEvent: function() {
	        var self = this;
	        $(".add-file").change(function(event) {
	            self.uploadFile(event);
	        });
	        $(".delete-file").click(function(event) {
	            self.deleteFile(event);
	        });
	    },
	    deleteFile: function(event) {
	        var $target = $(event.target).parent().parent("tr");
	        var id = $target.attr("data-id");
	        if (this.isAdmin) {
	            var url = "/api/v2/admin/orders/delete-file?item_id=" + id;
	        } else {
	            var url = "/api/v2/orders/delete-file?item_id=" + id;
	        }
	        $http(url).delete(function() {
	            $target.find(".upload-file").attr("href", "").text("").hide();
	            $target.find(".delete-file").hide();
	        })
	    },
	    loadCallback: function(blkRet, target_ele, f) {
	        var id = target_ele.parent().parent("tr").attr("data-id");
	        if (this.uploadComp.isAdmin) {
	            var url = "/api/v2/admin/orders/update-file?item_id=" + id;
	        } else {
	            var url = "/api/v2/orders/update-file?item_id=" + id;
	        }
	        var data = {
	            file_name: f.name,
	            file_key: blkRet.key
	        }
	        $http(url).put(data, function(result) {
	            var delete_ele = target_ele.nextAll(".delete-file");
	            delete_ele.show();
	            var link = IMG_LINK + blkRet.key;
	            target_ele.attr({ "href": link, title: f.name }).text(f.name);
	        })
	    },
	    uploadFile: function(event) {
	        var f = $(event.target).prop("files");
	        if (f && f[0] && f[0].size < this.fileSize) {
	            var $target = $(event.target).parent().parent();
	            var target_ele = $target.find(".upload-file");
	            var name = f[0].name;
	            var key_token = this.form_get_qiniu_token();
	            if (key_token) {
	                target_ele.text("正在上传，请稍等...").show();
	                var key = key_token["key"];
	                var uploadToken = key_token["token"];
	                f = f[0];
	                this.qiniuUploadAsync(f, uploadToken, key, this.loadCallback, target_ele,
	                    function(target_ele, data) { target_ele.text("正在上传，" + data.percent + "%，速度：" + data.speed); });
	            } else {
	                alert("出错了，请稍后重试！");
	            }
	        } else {
	            alert("文件太大了，请压缩后重新上传！");
	        }
	    },
	    qiniuUploadAsync: function(f, token, key, callback, target_ele, progress) {
	        var xhr = new XMLHttpRequest();
	        xhr.open('POST', "http://upload.qiniu.com", true);
	        var formData, startDate;
	        formData = new FormData();
	        if (key !== null && key !== undefined) formData.append('key', key);
	        formData.append('token', token);
	        formData.append('file', f);
	        var taking;
	        xhr.upload.addEventListener("progress", function(evt) {
	            if (evt.lengthComputable) {
	                var nowDate = new Date().getTime();
	                taking = nowDate - startDate;
	                var x = (evt.loaded) / 1024;
	                var y = taking / 1000;
	                var uploadSpeed = (x / y);
	                var formatSpeed;
	                if (uploadSpeed > 1024) {
	                    formatSpeed = (uploadSpeed / 1024).toFixed(2) + "Mb\/s";
	                } else {
	                    formatSpeed = uploadSpeed.toFixed(2) + "Kb\/s";
	                }
	                var percentComplete = Math.round(evt.loaded * 100 / evt.total);
	                progress(target_ele, {
	                    "speed": formatSpeed,
	                    "percent": percentComplete
	                });
	            }
	        }, false);
	
	        xhr.onreadystatechange = function(response) {
	            if (xhr.readyState == 4) {
	                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
	                    var blkRet = JSON.parse(xhr.responseText);
	                    callback(blkRet, target_ele, f);
	                } else {
	                    alert("上传失败，请稍后重试");
	                    target_ele.text("").hide();
	                }
	            }
	        };
	        startDate = new Date().getTime();
	        xhr.send(formData);
	    },
	    form_get_qiniu_token: function() {
	        var htmlobj = $.ajax({
	            url: '/api/v2/others/upload-token',
	            type: 'GET',
	            contentType: 'application/json',
	            dataType: 'json',
	            processData: false,
	            cache: false,
	            async: false
	        });
	        if (htmlobj["responseJSON"] && !htmlobj["responseJSON"]["error"]) {
	            return htmlobj["responseJSON"];
	        } else if (htmlobj["responseJSON"]["error"] == "unauthorized") {
	            return false;
	        } else {
	            return false;
	        }
	    },
	};
	
	//判断用户输入符合条件
	function checkInputCondition(item, condition) {
	    if (condition) {
	        $("#" + item + "_tip").hide();
	        return true;
	    } else {
	        $("#" + item + "_tip").show();
	        return false;
	    }
	}
	
	function showDemandDetail(ele) {
	    if (ele) {
	        ele.delegate(".demand-pop", "click", function(event) {
	            getData(event)
	        });
	    } else {
	        $(".demand-pop").click(function(event) {
	            getData(event)
	        });
	    }
	
	    function getData(event) {
	        var $target = $(event.target);
	        var id = $target.parents("tr").attr("data-id");
	        var detail = JSON.parse($target.parents("tr").attr("data-detail"));
	        if (detail.name) {
	            var data = detail;
	            $("#demand_name").text(data.name);
	            $("#demand_num").text(data.quantity);
	            $("#demand_size").text(data.size);
	            $("#demand_caizhi").text(data.caizhi);
	            $("#demand_others").text(data.others);
	            popUp.showPop("#demand_detail");
	        }
	    }
	}
	//判断配送区域是否填写
	function checkReceiverRegion() {
	    if ($("#receiver_province").val()) {
	        if ($("#receiver_city").val()) {
	            if (!$("#receiver_county").is(":hidden") && $("#receiver_county").val()) {
	                $("#receiver_region_tip").show();
	                return false;
	            } else {
	                $("#receiver_region_tip").hide();
	                return true;
	            }
	        } else {
	            $("#receiver_region_tip").show();
	            return false;
	        }
	    } else {
	        $("#receiver_region_tip").show();
	        return false;
	    }
	}
	
	//获取省级区域列表
	function get_provice_regions(chosen) {
	    var $province = $("#receiver_province");
	    var provinces = JSON.parse(localStorage.getItem("ys_province_regions"));
	    if (provinces) {
	        str = '<option></option>';
	        for (var i = 0; i < provinces.length; i++) {
	            str += '<option value="' + provinces[i]['region_id'] + '">' + provinces[i]['name'] + '</option>';
	        }
	        $province.html(str);
	        if (chosen) {
	            $province.find("option[value='" + chosen + "']").attr("selected", true);
	        }
	        $province.trigger("chosen:updated");
	    } else {
	        var url = '/api/v2/web/locations/full-provinces';
	        $http(url).get(function(result) {
	            if (result.provinces) {
	                localStorage.setItem("ys_province_regions", JSON.stringify(result.provinces));
	                str = '<option></option>';
	                for (var i = 0; i < result.provinces.length; i++) {
	                    str += '<option value="' + result.provinces[i]['region_id'] + '">' + result.provinces[i]['name'] + '</option>';
	                }
	                $province.html(str);
	                if (chosen) {
	                    $province.find("option[value='" + chosen + "']").attr("selected", true);
	                }
	                $province.trigger("chosen:updated");
	            }
	        });
	    }
	}
	//对应省份下的城市列表
	function set_provice_city(id, chosen) {
	    // $('#receiver_provice').val(id);
	    var $city = $("#receiver_city");
	    var str = '';
	    var url = '/api/v2/web/locations/province-cities?province_id=' + id;
	    $http(url).get(function(result) {
	        if (result.cities) {
	            str = '<option></option>';
	            for (var i = 0; i < result.cities.length; i++) {
	                str += '<option value="' + result.cities[i]['region_id'] + '">' + result.cities[i]['name'] + '</option>';
	            }
	        }
	        $city.html(str);
	        if (chosen) {
	            $city.find("option[value='" + chosen + "']").attr("selected", true);
	        }
	        $city.trigger("chosen:updated");
	    })
	}
	//对应城市下的区县列表
	function set_city_county(id, chosen) {
	    // $('#receiver_city').val(id);
	    var $county = $("#receiver_county");
	    var str = '';
	    var url = '/api/v2/web/locations/city-counties?city_id=' + id;
	    $http(url).get(function(result) {
	        if (result.counties) {
	            $("#receiver_county_chosen").show();
	            str = '<option></option>';
	            for (var i = 0; i < result.counties.length; i++) {
	                str += '<option value="' + result.counties[i]['region_id'] + '">' + result.counties[i]['name'] + '</option>';
	            }
	            $county.html(str);
	            if (chosen) {
	                $county.find("option[value='" + chosen + "']").attr("selected", true);
	            }
	            $county.trigger("chosen:updated");
	        } else {
	            $("#display_receiver_county").text("");
	            $("#receiver_county").val("");
	            $("#receiver_county_chosen").hide();
	        }
	    })
	}


/***/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tbW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsVUFBUztBQUNULE1BQUs7QUFDTCxxQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0wsc0NBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0wsc0NBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7O0FBRUEsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBOztBQUVBLDJCQUEwQixnQ0FBZ0M7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBb0IsdUJBQXVCO0FBQzNDLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVM7QUFDVCxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNULE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE2Qiw4QkFBOEI7QUFDM0QsVUFBUztBQUNULE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFnRCxnRUFBZ0UsRUFBRTtBQUNsSCxjQUFhO0FBQ2I7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsTUFBSztBQUNMO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBK0IsNkJBQTZCO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUEyQiwwQkFBMEI7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTJCLDRCQUE0QjtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTCIsImZpbGUiOiJqcy9jb21tb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICAgIOWVhuWTgeivpuaDhemhteaVsOmHj+WKoOWHj+aTjeS9nFxuICAgIGFkZE9wdGlvbi5iaW5kRXZlbnQoKVxuICovXG52YXIgYWRkT3B0aW9uID0ge1xuICAgIGJpbmRFdmVudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgJChcIi5wbHVzXCIpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBzZWxmLmFkZE9wdGlvblBsdXMoZXZlbnQpO1xuICAgICAgICB9KVxuICAgICAgICAkKFwiLm1pbnVzXCIpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBzZWxmLmFkZE9wdGlvbk1pbnVzKGV2ZW50KTtcbiAgICAgICAgfSlcbiAgICAgICAgJChcIi52YWx1ZVwiKS5jaGFuZ2UoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIHNlbGYuYWRkT3B0aW9uVmFsdWUoZXZlbnQpO1xuICAgICAgICB9KVxuICAgIH0sXG4gICAgYWRkT3B0aW9uUGx1czogZnVuY3Rpb24oZXZlbnQpIHsgLy/liqAxXG4gICAgICAgIHZhciB0YXJnZXQgPSAkKGV2ZW50LnRhcmdldCk7XG4gICAgICAgIHZhciBhZGRPcHRpb24gPSB0YXJnZXQucGFyZW50KCk7XG4gICAgICAgIHZhciB2YWx1ZSA9IGFkZE9wdGlvbi5maW5kKFwiLnZhbHVlXCIpO1xuICAgICAgICBpZiAoIXRhcmdldC5oYXNDbGFzcyhcImRpc2FibGVkXCIpKSB7XG4gICAgICAgICAgICB2YXIgdmFsID0gcGFyc2VJbnQodmFsdWUudmFsKCkpO1xuICAgICAgICAgICAgdmFyIG1pbiA9IHBhcnNlSW50KHZhbHVlLmF0dHIoXCJtaW4tbnVtXCIpKTtcbiAgICAgICAgICAgIHZhciBtYXggPSBwYXJzZUludCh2YWx1ZS5hdHRyKFwibWF4LW51bVwiKSk7XG4gICAgICAgICAgICB2YXIgbm93ID0gKHZhbCArIDEpID4gbWF4ID8gbWF4IDogdmFsICsgMTtcbiAgICAgICAgICAgIGlmICghaXNOYU4obWluKSAmJiBub3cgPiBtaW4pIHtcbiAgICAgICAgICAgICAgICBhZGRPcHRpb24uZmluZChcIi5taW51c1wiKS5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFpc05hTihtYXgpICYmIG5vdyA+PSBtYXgpIHtcbiAgICAgICAgICAgICAgICBhZGRPcHRpb24uZmluZChcIi5wbHVzXCIpLmFkZENsYXNzKFwiZGlzYWJsZWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YWx1ZS52YWwobm93KTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgYWRkT3B0aW9uTWludXM6IGZ1bmN0aW9uKGV2ZW50KSB7IC8v5YePMVxuICAgICAgICB2YXIgdGFyZ2V0ID0gJChldmVudC50YXJnZXQpO1xuICAgICAgICB2YXIgYWRkT3B0aW9uID0gdGFyZ2V0LnBhcmVudCgpO1xuICAgICAgICB2YXIgdmFsdWUgPSBhZGRPcHRpb24uZmluZChcIi52YWx1ZVwiKTtcbiAgICAgICAgaWYgKCF0YXJnZXQuaGFzQ2xhc3MoXCJkaXNhYmxlZFwiKSkge1xuICAgICAgICAgICAgdmFyIHZhbCA9IHBhcnNlSW50KHZhbHVlLnZhbCgpKTtcbiAgICAgICAgICAgIHZhciBtaW4gPSBwYXJzZUludCh2YWx1ZS5hdHRyKFwibWluLW51bVwiKSk7XG4gICAgICAgICAgICB2YXIgbWF4ID0gcGFyc2VJbnQodmFsdWUuYXR0cihcIm1heC1udW1cIikpO1xuICAgICAgICAgICAgdmFyIG5vdyA9ICh2YWwgLSAxKSA8IG1pbiA/IG1pbiA6IHZhbCAtIDE7XG4gICAgICAgICAgICBpZiAoIWlzTmFOKG1pbikgJiYgbm93IDw9IG1pbikge1xuICAgICAgICAgICAgICAgIHZhbHVlLnZhbChtaW4pO1xuICAgICAgICAgICAgICAgIGFkZE9wdGlvbi5maW5kKFwiLm1pbnVzXCIpLmFkZENsYXNzKFwiZGlzYWJsZWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWlzTmFOKG1heCkgJiYgbm93IDw9IG1heCkge1xuICAgICAgICAgICAgICAgIGFkZE9wdGlvbi5maW5kKFwiLnBsdXNcIikucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhbHVlLnZhbChub3cpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBhZGRPcHRpb25WYWx1ZTogZnVuY3Rpb24oZXZlbnQpIHsgLy/nm7TmjqXlhpnlhaXmlbDlgLxcbiAgICAgICAgdmFyIHRhcmdldCA9ICQoZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgdmFyIGFkZE9wdGlvbiA9IHRhcmdldC5wYXJlbnQoKTtcbiAgICAgICAgdmFyIG9yZ192YWwgPSB0YXJnZXQudmFsKCkgPyB0YXJnZXQudmFsKCkgOiBtaW47XG4gICAgICAgIHZhciB2YWwgPSBwYXJzZUludCh0YXJnZXQudmFsKCkpO1xuICAgICAgICB2YXIgbWluID0gcGFyc2VJbnQodGFyZ2V0LmF0dHIoXCJtaW4tbnVtXCIpKTtcbiAgICAgICAgdmFyIG1heCA9IHBhcnNlSW50KHRhcmdldC5hdHRyKFwibWF4LW51bVwiKSk7XG4gICAgICAgIGlmIChpc05hTihvcmdfdmFsKSkge1xuICAgICAgICAgICAgaWYgKGlzTmFOKHZhbCkpIHtcbiAgICAgICAgICAgICAgICB2YWwgPSBtaW47XG4gICAgICAgICAgICAgICAgdGFyZ2V0LnZhbChtaW4pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQudmFsKHZhbCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmIChvcmdfdmFsICE9PSB2YWwpIHtcbiAgICAgICAgICAgIHRhcmdldC52YWwodmFsKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzTmFOKG1pbikgJiYgdmFsIDw9IG1pbikge1xuICAgICAgICAgICAgdGFyZ2V0LnZhbChtaW4pO1xuICAgICAgICAgICAgYWRkT3B0aW9uLmZpbmQoXCIubWludXNcIikuYWRkQ2xhc3MoXCJkaXNhYmxlZFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFkZE9wdGlvbi5maW5kKFwiLm1pbnVzXCIpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc05hTihtYXgpICYmIHZhbCA+PSBtYXgpIHtcbiAgICAgICAgICAgIHRhcmdldC52YWwobWF4KTtcbiAgICAgICAgICAgIGFkZE9wdGlvbi5maW5kKFwiLnBsdXNcIikuYWRkQ2xhc3MoXCJkaXNhYmxlZFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFkZE9wdGlvbi5maW5kKFwiLnBsdXNcIikucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG4vKipcbiAgICDllYblk4Hor6bmg4XkuK3lm77niYfmlL7lpKfplZzlkozpvKDmoIfmgqzmta7mjaLlm75cbiAqL1xudmFyIGltZ1pvb20gPSB7XG4gICAgaW1nU2hvdzogJChcIiNpbWFnZV9zaG93XCIpLFxuICAgIGltZ1NwYW46ICQoXCIjaW1hZ2Vfc2hvdyBzcGFuXCIpLFxuICAgIGltZ0JpZzogJChcIiNpbWFnZV9iaWdcIiksXG4gICAgYmluZEV2ZW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLnNob3dJbWcoKTtcbiAgICAgICAgJChcIiNpbWFnZUxpc3RcIikuZGVsZWdhdGUoXCJsaVwiLCBcIm1vdXNlb3ZlclwiLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgc2VsZi5jaGFuZ2VJbWcoZXZlbnQpO1xuICAgICAgICB9KVxuICAgICAgICBzZWxmLmltZ1Nob3cubW91c2VvdmVyKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2VsZi5pbWdTcGFuLnNob3coKTtcbiAgICAgICAgICAgIHNlbGYuaW1nQmlnLnNob3coKTtcbiAgICAgICAgfSlcbiAgICAgICAgc2VsZi5pbWdTaG93Lm1vdXNlb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2VsZi5pbWdTcGFuLmhpZGUoKTtcbiAgICAgICAgICAgIHNlbGYuaW1nQmlnLmhpZGUoKTtcbiAgICAgICAgfSlcbiAgICAgICAgc2VsZi5pbWdTaG93Lm1vdXNlbW92ZShmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgc2VsZi5zaG93QmlnSW1nKGV2ZW50KTtcbiAgICAgICAgfSlcbiAgICB9LFxuICAgIGNoYW5nZUltZzogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgdmFyIHRhcmdldDtcbiAgICAgICAgJChcIiNpbWFnZUxpc3QgbGlcIikucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgICAgIGlmIChldmVudC50YXJnZXQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJpbWdcIikge1xuICAgICAgICAgICAgdGFyZ2V0ID0gJChldmVudC50YXJnZXQucGFyZW50Tm9kZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0YXJnZXQgPSAkKGV2ZW50LnRhcmdldCk7XG4gICAgICAgIH1cbiAgICAgICAgdGFyZ2V0LmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuICAgICAgICB0aGlzLnNob3dJbWcodGFyZ2V0KTtcbiAgICB9LFxuICAgIHNob3dJbWc6IGZ1bmN0aW9uKHRhcmdldCkge1xuICAgICAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgICAgICB2YXIgaW1nVXJsID0gdGFyZ2V0LmZpbmQoXCJpbWdcIikuYXR0cihcInNyY1wiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBmaXJzdCA9ICQoXCIjaW1hZ2VMaXN0IGxpOmZpcnN0LWNoaWxkXCIpO1xuICAgICAgICAgICAgZmlyc3QuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgICAgICAgICB2YXIgaW1nVXJsID0gZmlyc3QuZmluZChcImltZ1wiKS5hdHRyKFwic3JjXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW1nU2hvdy5maW5kKFwiaW1nXCIpLmF0dHIoXCJzcmNcIiwgaW1nVXJsKTtcbiAgICAgICAgdGhpcy5pbWdCaWcuZmluZChcImltZ1wiKS5hdHRyKFwic3JjXCIsIGltZ1VybCk7XG4gICAgfSxcbiAgICBzaG93QmlnSW1nOiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICB2YXIgaW1nT3JnID0gdGhpcy5pbWdCaWcuZmluZChcImltZ1wiKTtcbiAgICAgICAgdmFyIHNjcm9sbFRvcCA9ICQoZG9jdW1lbnQpLnNjcm9sbFRvcCgpO1xuICAgICAgICB2YXIgaW1nVG9wO1xuICAgICAgICBpZiAoc2Nyb2xsVG9wID09IDApIHtcbiAgICAgICAgICAgIGltZ1RvcCA9IHRoaXMuaW1nU2hvdy5vZmZzZXQoKS50b3A7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpbWdUb3AgPSB0aGlzLmltZ1Nob3cub2Zmc2V0KCkudG9wIC0gc2Nyb2xsVG9wO1xuICAgICAgICB9XG4gICAgICAgIHZhciB4ID0gZXZlbnQuY2xpZW50WCAtIHRoaXMuaW1nU2hvdy5vZmZzZXQoKS5sZWZ0IC0gKHRoaXMuaW1nU3Bhbi53aWR0aCgpIC8gMik7XG4gICAgICAgIHZhciB5ID0gZXZlbnQuY2xpZW50WSAtIGltZ1RvcCAtICh0aGlzLmltZ1NwYW4uaGVpZ2h0KCkgLyAyKTtcblxuICAgICAgICBpZiAoeCA8IDApIHtcbiAgICAgICAgICAgIHggPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKHggPiB0aGlzLmltZ1Nob3cud2lkdGgoKSAtIHRoaXMuaW1nU3Bhbi53aWR0aCgpKSB7XG4gICAgICAgICAgICB4ID0gdGhpcy5pbWdTaG93LndpZHRoKCkgLSB0aGlzLmltZ1NwYW4ud2lkdGgoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoeSA8IDApIHtcbiAgICAgICAgICAgIHkgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKHkgPiB0aGlzLmltZ1Nob3cuaGVpZ2h0KCkgLSB0aGlzLmltZ1NwYW4uaGVpZ2h0KCkpIHtcbiAgICAgICAgICAgIHkgPSB0aGlzLmltZ1Nob3cuaGVpZ2h0KCkgLSB0aGlzLmltZ1NwYW4uaGVpZ2h0KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmltZ1NwYW4uY3NzKHsgbGVmdDogeCArIFwicHhcIiwgdG9wOiB5ICsgXCJweFwiIH0pO1xuICAgICAgICB2YXIgcGVyY2VudFggPSB4IC8gKHRoaXMuaW1nU2hvdy53aWR0aCgpIC0gdGhpcy5pbWdTcGFuLndpZHRoKCkpO1xuICAgICAgICB2YXIgcGVyY2VudFkgPSB5IC8gKHRoaXMuaW1nU2hvdy5oZWlnaHQoKSAtIHRoaXMuaW1nU3Bhbi5oZWlnaHQoKSk7XG4gICAgICAgIHZhciBsZWZ0ID0gLXBlcmNlbnRYICogKGltZ09yZy53aWR0aCgpIC0gdGhpcy5pbWdCaWcud2lkdGgoKSkgKyAncHgnO1xuICAgICAgICB2YXIgdG9wID0gLXBlcmNlbnRZICogKGltZ09yZy5oZWlnaHQoKSAtIHRoaXMuaW1nQmlnLmhlaWdodCgpKSArICdweCc7XG4gICAgICAgIGltZ09yZy5jc3MoeyBsZWZ0OiBsZWZ0LCB0b3A6IHRvcCB9KTtcbiAgICB9LFxufTtcbi8qXG4gICAg5by556qX5LqL5Lu2XG4gICAg5omT5byA5by556qX55SocG9wVXAuc2hvd1BvcCgpXG4gKi9cbnZhciBwb3BVcCA9IHtcbiAgICBtb2RhbF9sYXllcjogJChcIi5tb2RhbC1sYXllclwiKSxcbiAgICBtb2RhbDogJChcIi5tb2RhbFwiKSxcbiAgICBjbG9zZTogJChcIi5tb2RhbCAuY2xvc2VcIiksXG4gICAgYmluZEV2ZW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLmNsb3NlLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2VsZi5oaWRlUG9wKCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm1vZGFsX2xheWVyLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2VsZi5oaWRlUG9wKCk7XG4gICAgICAgIH0pO1xuICAgICAgICAkKFwiLm1vZGFsIC5uby1zdGF5XCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcG9wVXAuaGlkZVBvcCgpO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHNob3dQb3A6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIGlmIChpZCkge1xuICAgICAgICAgICAgJChpZCkuc2hvdygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tb2RhbC5zaG93KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tb2RhbF9sYXllci5zaG93KCk7XG4gICAgICAgIHRoaXMuYmluZEV2ZW50KCk7XG4gICAgfSxcbiAgICBoaWRlUG9wOiBmdW5jdGlvbihpZCkge1xuICAgICAgICBpZiAoaWQpIHtcbiAgICAgICAgICAgICQoaWQpLmhpZGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubW9kYWwuaGlkZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubW9kYWxfbGF5ZXIuaGlkZSgpO1xuICAgIH0sXG59O1xuLypcbiAgICDkuIrkvKDmlofku7bnu4Tku7ZcbiAqL1xudmFyIHVwbG9hZENvbXAgPSB7XG4gICAgaXNBZG1pbjogbG9jYXRpb24ucGF0aG5hbWUuaW5kZXhPZihcImFkbWluXCIpID4gMCA/IHRydWUgOiBmYWxzZSxcbiAgICBmaWxlU2l6ZTogMTAyNCAqIDEwNDg1NzYsIC8v5paH5Lu25aSn5bCP6ZmQ5Yi277yM5Y2V5L2NQnl0ZVxuICAgIGJpbmRFdmVudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgJChcIi5hZGQtZmlsZVwiKS5jaGFuZ2UoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIHNlbGYudXBsb2FkRmlsZShldmVudCk7XG4gICAgICAgIH0pO1xuICAgICAgICAkKFwiLmRlbGV0ZS1maWxlXCIpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBzZWxmLmRlbGV0ZUZpbGUoZXZlbnQpO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGRlbGV0ZUZpbGU6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHZhciAkdGFyZ2V0ID0gJChldmVudC50YXJnZXQpLnBhcmVudCgpLnBhcmVudChcInRyXCIpO1xuICAgICAgICB2YXIgaWQgPSAkdGFyZ2V0LmF0dHIoXCJkYXRhLWlkXCIpO1xuICAgICAgICBpZiAodGhpcy5pc0FkbWluKSB7XG4gICAgICAgICAgICB2YXIgdXJsID0gXCIvYXBpL3YyL2FkbWluL29yZGVycy9kZWxldGUtZmlsZT9pdGVtX2lkPVwiICsgaWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgdXJsID0gXCIvYXBpL3YyL29yZGVycy9kZWxldGUtZmlsZT9pdGVtX2lkPVwiICsgaWQ7XG4gICAgICAgIH1cbiAgICAgICAgJGh0dHAodXJsKS5kZWxldGUoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkdGFyZ2V0LmZpbmQoXCIudXBsb2FkLWZpbGVcIikuYXR0cihcImhyZWZcIiwgXCJcIikudGV4dChcIlwiKS5oaWRlKCk7XG4gICAgICAgICAgICAkdGFyZ2V0LmZpbmQoXCIuZGVsZXRlLWZpbGVcIikuaGlkZSgpO1xuICAgICAgICB9KVxuICAgIH0sXG4gICAgbG9hZENhbGxiYWNrOiBmdW5jdGlvbihibGtSZXQsIHRhcmdldF9lbGUsIGYpIHtcbiAgICAgICAgdmFyIGlkID0gdGFyZ2V0X2VsZS5wYXJlbnQoKS5wYXJlbnQoXCJ0clwiKS5hdHRyKFwiZGF0YS1pZFwiKTtcbiAgICAgICAgaWYgKHRoaXMudXBsb2FkQ29tcC5pc0FkbWluKSB7XG4gICAgICAgICAgICB2YXIgdXJsID0gXCIvYXBpL3YyL2FkbWluL29yZGVycy91cGRhdGUtZmlsZT9pdGVtX2lkPVwiICsgaWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgdXJsID0gXCIvYXBpL3YyL29yZGVycy91cGRhdGUtZmlsZT9pdGVtX2lkPVwiICsgaWQ7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICBmaWxlX25hbWU6IGYubmFtZSxcbiAgICAgICAgICAgIGZpbGVfa2V5OiBibGtSZXQua2V5XG4gICAgICAgIH1cbiAgICAgICAgJGh0dHAodXJsKS5wdXQoZGF0YSwgZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICB2YXIgZGVsZXRlX2VsZSA9IHRhcmdldF9lbGUubmV4dEFsbChcIi5kZWxldGUtZmlsZVwiKTtcbiAgICAgICAgICAgIGRlbGV0ZV9lbGUuc2hvdygpO1xuICAgICAgICAgICAgdmFyIGxpbmsgPSBJTUdfTElOSyArIGJsa1JldC5rZXk7XG4gICAgICAgICAgICB0YXJnZXRfZWxlLmF0dHIoeyBcImhyZWZcIjogbGluaywgdGl0bGU6IGYubmFtZSB9KS50ZXh0KGYubmFtZSk7XG4gICAgICAgIH0pXG4gICAgfSxcbiAgICB1cGxvYWRGaWxlOiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICB2YXIgZiA9ICQoZXZlbnQudGFyZ2V0KS5wcm9wKFwiZmlsZXNcIik7XG4gICAgICAgIGlmIChmICYmIGZbMF0gJiYgZlswXS5zaXplIDwgdGhpcy5maWxlU2l6ZSkge1xuICAgICAgICAgICAgdmFyICR0YXJnZXQgPSAkKGV2ZW50LnRhcmdldCkucGFyZW50KCkucGFyZW50KCk7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0X2VsZSA9ICR0YXJnZXQuZmluZChcIi51cGxvYWQtZmlsZVwiKTtcbiAgICAgICAgICAgIHZhciBuYW1lID0gZlswXS5uYW1lO1xuICAgICAgICAgICAgdmFyIGtleV90b2tlbiA9IHRoaXMuZm9ybV9nZXRfcWluaXVfdG9rZW4oKTtcbiAgICAgICAgICAgIGlmIChrZXlfdG9rZW4pIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRfZWxlLnRleHQoXCLmraPlnKjkuIrkvKDvvIzor7fnqI3nrYkuLi5cIikuc2hvdygpO1xuICAgICAgICAgICAgICAgIHZhciBrZXkgPSBrZXlfdG9rZW5bXCJrZXlcIl07XG4gICAgICAgICAgICAgICAgdmFyIHVwbG9hZFRva2VuID0ga2V5X3Rva2VuW1widG9rZW5cIl07XG4gICAgICAgICAgICAgICAgZiA9IGZbMF07XG4gICAgICAgICAgICAgICAgdGhpcy5xaW5pdVVwbG9hZEFzeW5jKGYsIHVwbG9hZFRva2VuLCBrZXksIHRoaXMubG9hZENhbGxiYWNrLCB0YXJnZXRfZWxlLFxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbih0YXJnZXRfZWxlLCBkYXRhKSB7IHRhcmdldF9lbGUudGV4dChcIuato+WcqOS4iuS8oO+8jFwiICsgZGF0YS5wZXJjZW50ICsgXCIl77yM6YCf5bqm77yaXCIgKyBkYXRhLnNwZWVkKTsgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFsZXJ0KFwi5Ye66ZSZ5LqG77yM6K+356iN5ZCO6YeN6K+V77yBXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWxlcnQoXCLmlofku7blpKrlpKfkuobvvIzor7fljovnvKnlkI7ph43mlrDkuIrkvKDvvIFcIik7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHFpbml1VXBsb2FkQXN5bmM6IGZ1bmN0aW9uKGYsIHRva2VuLCBrZXksIGNhbGxiYWNrLCB0YXJnZXRfZWxlLCBwcm9ncmVzcykge1xuICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHhoci5vcGVuKCdQT1NUJywgXCJodHRwOi8vdXBsb2FkLnFpbml1LmNvbVwiLCB0cnVlKTtcbiAgICAgICAgdmFyIGZvcm1EYXRhLCBzdGFydERhdGU7XG4gICAgICAgIGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgIGlmIChrZXkgIT09IG51bGwgJiYga2V5ICE9PSB1bmRlZmluZWQpIGZvcm1EYXRhLmFwcGVuZCgna2V5Jywga2V5KTtcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCd0b2tlbicsIHRva2VuKTtcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdmaWxlJywgZik7XG4gICAgICAgIHZhciB0YWtpbmc7XG4gICAgICAgIHhoci51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcihcInByb2dyZXNzXCIsIGZ1bmN0aW9uKGV2dCkge1xuICAgICAgICAgICAgaWYgKGV2dC5sZW5ndGhDb21wdXRhYmxlKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5vd0RhdGUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgICAgICAgICB0YWtpbmcgPSBub3dEYXRlIC0gc3RhcnREYXRlO1xuICAgICAgICAgICAgICAgIHZhciB4ID0gKGV2dC5sb2FkZWQpIC8gMTAyNDtcbiAgICAgICAgICAgICAgICB2YXIgeSA9IHRha2luZyAvIDEwMDA7XG4gICAgICAgICAgICAgICAgdmFyIHVwbG9hZFNwZWVkID0gKHggLyB5KTtcbiAgICAgICAgICAgICAgICB2YXIgZm9ybWF0U3BlZWQ7XG4gICAgICAgICAgICAgICAgaWYgKHVwbG9hZFNwZWVkID4gMTAyNCkge1xuICAgICAgICAgICAgICAgICAgICBmb3JtYXRTcGVlZCA9ICh1cGxvYWRTcGVlZCAvIDEwMjQpLnRvRml4ZWQoMikgKyBcIk1iXFwvc1wiO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdFNwZWVkID0gdXBsb2FkU3BlZWQudG9GaXhlZCgyKSArIFwiS2JcXC9zXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBwZXJjZW50Q29tcGxldGUgPSBNYXRoLnJvdW5kKGV2dC5sb2FkZWQgKiAxMDAgLyBldnQudG90YWwpO1xuICAgICAgICAgICAgICAgIHByb2dyZXNzKHRhcmdldF9lbGUsIHtcbiAgICAgICAgICAgICAgICAgICAgXCJzcGVlZFwiOiBmb3JtYXRTcGVlZCxcbiAgICAgICAgICAgICAgICAgICAgXCJwZXJjZW50XCI6IHBlcmNlbnRDb21wbGV0ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBmYWxzZSk7XG5cbiAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCkge1xuICAgICAgICAgICAgICAgIGlmICgoeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8IDMwMCkgfHwgeGhyLnN0YXR1cyA9PSAzMDQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJsa1JldCA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGJsa1JldCwgdGFyZ2V0X2VsZSwgZik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCLkuIrkvKDlpLHotKXvvIzor7fnqI3lkI7ph43or5VcIik7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldF9lbGUudGV4dChcIlwiKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBzdGFydERhdGUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgeGhyLnNlbmQoZm9ybURhdGEpO1xuICAgIH0sXG4gICAgZm9ybV9nZXRfcWluaXVfdG9rZW46IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaHRtbG9iaiA9ICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6ICcvYXBpL3YyL290aGVycy91cGxvYWQtdG9rZW4nLFxuICAgICAgICAgICAgdHlwZTogJ0dFVCcsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIHByb2Nlc3NEYXRhOiBmYWxzZSxcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgIGFzeW5jOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGh0bWxvYmpbXCJyZXNwb25zZUpTT05cIl0gJiYgIWh0bWxvYmpbXCJyZXNwb25zZUpTT05cIl1bXCJlcnJvclwiXSkge1xuICAgICAgICAgICAgcmV0dXJuIGh0bWxvYmpbXCJyZXNwb25zZUpTT05cIl07XG4gICAgICAgIH0gZWxzZSBpZiAoaHRtbG9ialtcInJlc3BvbnNlSlNPTlwiXVtcImVycm9yXCJdID09IFwidW5hdXRob3JpemVkXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0sXG59O1xuXG4vL+WIpOaWreeUqOaIt+i+k+WFpeespuWQiOadoeS7tlxuZnVuY3Rpb24gY2hlY2tJbnB1dENvbmRpdGlvbihpdGVtLCBjb25kaXRpb24pIHtcbiAgICBpZiAoY29uZGl0aW9uKSB7XG4gICAgICAgICQoXCIjXCIgKyBpdGVtICsgXCJfdGlwXCIpLmhpZGUoKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJChcIiNcIiArIGl0ZW0gKyBcIl90aXBcIikuc2hvdygpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzaG93RGVtYW5kRGV0YWlsKGVsZSkge1xuICAgIGlmIChlbGUpIHtcbiAgICAgICAgZWxlLmRlbGVnYXRlKFwiLmRlbWFuZC1wb3BcIiwgXCJjbGlja1wiLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgZ2V0RGF0YShldmVudClcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJChcIi5kZW1hbmQtcG9wXCIpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBnZXREYXRhKGV2ZW50KVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXREYXRhKGV2ZW50KSB7XG4gICAgICAgIHZhciAkdGFyZ2V0ID0gJChldmVudC50YXJnZXQpO1xuICAgICAgICB2YXIgaWQgPSAkdGFyZ2V0LnBhcmVudHMoXCJ0clwiKS5hdHRyKFwiZGF0YS1pZFwiKTtcbiAgICAgICAgdmFyIGRldGFpbCA9IEpTT04ucGFyc2UoJHRhcmdldC5wYXJlbnRzKFwidHJcIikuYXR0cihcImRhdGEtZGV0YWlsXCIpKTtcbiAgICAgICAgaWYgKGRldGFpbC5uYW1lKSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IGRldGFpbDtcbiAgICAgICAgICAgICQoXCIjZGVtYW5kX25hbWVcIikudGV4dChkYXRhLm5hbWUpO1xuICAgICAgICAgICAgJChcIiNkZW1hbmRfbnVtXCIpLnRleHQoZGF0YS5xdWFudGl0eSk7XG4gICAgICAgICAgICAkKFwiI2RlbWFuZF9zaXplXCIpLnRleHQoZGF0YS5zaXplKTtcbiAgICAgICAgICAgICQoXCIjZGVtYW5kX2NhaXpoaVwiKS50ZXh0KGRhdGEuY2FpemhpKTtcbiAgICAgICAgICAgICQoXCIjZGVtYW5kX290aGVyc1wiKS50ZXh0KGRhdGEub3RoZXJzKTtcbiAgICAgICAgICAgIHBvcFVwLnNob3dQb3AoXCIjZGVtYW5kX2RldGFpbFwiKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8v5Yik5pat6YWN6YCB5Yy65Z+f5piv5ZCm5aGr5YaZXG5mdW5jdGlvbiBjaGVja1JlY2VpdmVyUmVnaW9uKCkge1xuICAgIGlmICgkKFwiI3JlY2VpdmVyX3Byb3ZpbmNlXCIpLnZhbCgpKSB7XG4gICAgICAgIGlmICgkKFwiI3JlY2VpdmVyX2NpdHlcIikudmFsKCkpIHtcbiAgICAgICAgICAgIGlmICghJChcIiNyZWNlaXZlcl9jb3VudHlcIikuaXMoXCI6aGlkZGVuXCIpICYmICQoXCIjcmVjZWl2ZXJfY291bnR5XCIpLnZhbCgpKSB7XG4gICAgICAgICAgICAgICAgJChcIiNyZWNlaXZlcl9yZWdpb25fdGlwXCIpLnNob3coKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoXCIjcmVjZWl2ZXJfcmVnaW9uX3RpcFwiKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKFwiI3JlY2VpdmVyX3JlZ2lvbl90aXBcIikuc2hvdygpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJChcIiNyZWNlaXZlcl9yZWdpb25fdGlwXCIpLnNob3coKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxuLy/ojrflj5bnnIHnuqfljLrln5/liJfooahcbmZ1bmN0aW9uIGdldF9wcm92aWNlX3JlZ2lvbnMoY2hvc2VuKSB7XG4gICAgdmFyICRwcm92aW5jZSA9ICQoXCIjcmVjZWl2ZXJfcHJvdmluY2VcIik7XG4gICAgdmFyIHByb3ZpbmNlcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ5c19wcm92aW5jZV9yZWdpb25zXCIpKTtcbiAgICBpZiAocHJvdmluY2VzKSB7XG4gICAgICAgIHN0ciA9ICc8b3B0aW9uPjwvb3B0aW9uPic7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvdmluY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBzdHIgKz0gJzxvcHRpb24gdmFsdWU9XCInICsgcHJvdmluY2VzW2ldWydyZWdpb25faWQnXSArICdcIj4nICsgcHJvdmluY2VzW2ldWyduYW1lJ10gKyAnPC9vcHRpb24+JztcbiAgICAgICAgfVxuICAgICAgICAkcHJvdmluY2UuaHRtbChzdHIpO1xuICAgICAgICBpZiAoY2hvc2VuKSB7XG4gICAgICAgICAgICAkcHJvdmluY2UuZmluZChcIm9wdGlvblt2YWx1ZT0nXCIgKyBjaG9zZW4gKyBcIiddXCIpLmF0dHIoXCJzZWxlY3RlZFwiLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICAkcHJvdmluY2UudHJpZ2dlcihcImNob3Nlbjp1cGRhdGVkXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciB1cmwgPSAnL2FwaS92Mi93ZWIvbG9jYXRpb25zL2Z1bGwtcHJvdmluY2VzJztcbiAgICAgICAgJGh0dHAodXJsKS5nZXQoZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAocmVzdWx0LnByb3ZpbmNlcykge1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwieXNfcHJvdmluY2VfcmVnaW9uc1wiLCBKU09OLnN0cmluZ2lmeShyZXN1bHQucHJvdmluY2VzKSk7XG4gICAgICAgICAgICAgICAgc3RyID0gJzxvcHRpb24+PC9vcHRpb24+JztcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlc3VsdC5wcm92aW5jZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgc3RyICs9ICc8b3B0aW9uIHZhbHVlPVwiJyArIHJlc3VsdC5wcm92aW5jZXNbaV1bJ3JlZ2lvbl9pZCddICsgJ1wiPicgKyByZXN1bHQucHJvdmluY2VzW2ldWyduYW1lJ10gKyAnPC9vcHRpb24+JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJHByb3ZpbmNlLmh0bWwoc3RyKTtcbiAgICAgICAgICAgICAgICBpZiAoY2hvc2VuKSB7XG4gICAgICAgICAgICAgICAgICAgICRwcm92aW5jZS5maW5kKFwib3B0aW9uW3ZhbHVlPSdcIiArIGNob3NlbiArIFwiJ11cIikuYXR0cihcInNlbGVjdGVkXCIsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkcHJvdmluY2UudHJpZ2dlcihcImNob3Nlbjp1cGRhdGVkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4vL+WvueW6lOecgeS7veS4i+eahOWfjuW4guWIl+ihqFxuZnVuY3Rpb24gc2V0X3Byb3ZpY2VfY2l0eShpZCwgY2hvc2VuKSB7XG4gICAgLy8gJCgnI3JlY2VpdmVyX3Byb3ZpY2UnKS52YWwoaWQpO1xuICAgIHZhciAkY2l0eSA9ICQoXCIjcmVjZWl2ZXJfY2l0eVwiKTtcbiAgICB2YXIgc3RyID0gJyc7XG4gICAgdmFyIHVybCA9ICcvYXBpL3YyL3dlYi9sb2NhdGlvbnMvcHJvdmluY2UtY2l0aWVzP3Byb3ZpbmNlX2lkPScgKyBpZDtcbiAgICAkaHR0cCh1cmwpLmdldChmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgaWYgKHJlc3VsdC5jaXRpZXMpIHtcbiAgICAgICAgICAgIHN0ciA9ICc8b3B0aW9uPjwvb3B0aW9uPic7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlc3VsdC5jaXRpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBzdHIgKz0gJzxvcHRpb24gdmFsdWU9XCInICsgcmVzdWx0LmNpdGllc1tpXVsncmVnaW9uX2lkJ10gKyAnXCI+JyArIHJlc3VsdC5jaXRpZXNbaV1bJ25hbWUnXSArICc8L29wdGlvbj4nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgICRjaXR5Lmh0bWwoc3RyKTtcbiAgICAgICAgaWYgKGNob3Nlbikge1xuICAgICAgICAgICAgJGNpdHkuZmluZChcIm9wdGlvblt2YWx1ZT0nXCIgKyBjaG9zZW4gKyBcIiddXCIpLmF0dHIoXCJzZWxlY3RlZFwiLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICAkY2l0eS50cmlnZ2VyKFwiY2hvc2VuOnVwZGF0ZWRcIik7XG4gICAgfSlcbn1cbi8v5a+55bqU5Z+O5biC5LiL55qE5Yy65Y6/5YiX6KGoXG5mdW5jdGlvbiBzZXRfY2l0eV9jb3VudHkoaWQsIGNob3Nlbikge1xuICAgIC8vICQoJyNyZWNlaXZlcl9jaXR5JykudmFsKGlkKTtcbiAgICB2YXIgJGNvdW50eSA9ICQoXCIjcmVjZWl2ZXJfY291bnR5XCIpO1xuICAgIHZhciBzdHIgPSAnJztcbiAgICB2YXIgdXJsID0gJy9hcGkvdjIvd2ViL2xvY2F0aW9ucy9jaXR5LWNvdW50aWVzP2NpdHlfaWQ9JyArIGlkO1xuICAgICRodHRwKHVybCkuZ2V0KGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICBpZiAocmVzdWx0LmNvdW50aWVzKSB7XG4gICAgICAgICAgICAkKFwiI3JlY2VpdmVyX2NvdW50eV9jaG9zZW5cIikuc2hvdygpO1xuICAgICAgICAgICAgc3RyID0gJzxvcHRpb24+PC9vcHRpb24+JztcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVzdWx0LmNvdW50aWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgc3RyICs9ICc8b3B0aW9uIHZhbHVlPVwiJyArIHJlc3VsdC5jb3VudGllc1tpXVsncmVnaW9uX2lkJ10gKyAnXCI+JyArIHJlc3VsdC5jb3VudGllc1tpXVsnbmFtZSddICsgJzwvb3B0aW9uPic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkY291bnR5Lmh0bWwoc3RyKTtcbiAgICAgICAgICAgIGlmIChjaG9zZW4pIHtcbiAgICAgICAgICAgICAgICAkY291bnR5LmZpbmQoXCJvcHRpb25bdmFsdWU9J1wiICsgY2hvc2VuICsgXCInXVwiKS5hdHRyKFwic2VsZWN0ZWRcIiwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkY291bnR5LnRyaWdnZXIoXCJjaG9zZW46dXBkYXRlZFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoXCIjZGlzcGxheV9yZWNlaXZlcl9jb3VudHlcIikudGV4dChcIlwiKTtcbiAgICAgICAgICAgICQoXCIjcmVjZWl2ZXJfY291bnR5XCIpLnZhbChcIlwiKTtcbiAgICAgICAgICAgICQoXCIjcmVjZWl2ZXJfY291bnR5X2Nob3NlblwiKS5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9jb21tb24uanNcbiAqKiBtb2R1bGUgaWQgPSAwXG4gKiogbW9kdWxlIGNodW5rcyA9IDJcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9