webpackJsonp([7,19],[
/* 0 */
/***/ function(module, exports) {

	$(function() {
	    //轮播图片显示
	    var unsliderArr = [{
	        img: "http://source.soyyin.com/banner_tailidingzhi.png",
	        link: "/product?id=23",
	    }, {
	        img: "http://source.soyyin.com/banner_lipinhedingzhi.png",
	        link: "/product?id=62",
	    }, {
	        img: "http://7xsexg.com2.z0.glb.clouddn.com/banner_guanggaobei.png",
	        link: "/product?id=31",
	    }, {
	        img: "http://7xsexg.com2.z0.glb.clouddn.com/banner_design.jpg",
	        link: "/design",
	    }, {
	        img: "http://7xsexg.com2.z0.glb.qiniucdn.com/banner_menxingzhanjia_1.png",
	        link: "/product?id=4",
	    }, {
	        img: "http://7xsexg.com2.z0.glb.qiniucdn.com/banner_gongguanhuizhan_1.png",
	        link: "http://pr.soyyin.com",
	        target_blank: true,
	    }, ];
	    var str = "<ul>";
	    for (var i = 0; i < unsliderArr.length; i++) {
	        str += "<li><a class='unslide-link' href='" + unsliderArr[i].link + "'" + (unsliderArr[i].target_blank ? " target='_blank'" : "") + "><img class='unslide-link-img' src='" + unsliderArr[i].img + "'></a></li>";
	    }
	    str += "</ul>";
	    $("#unslider_auto").html(str).unslider({
	        autoplay: true
	    });
	
	    // 998活动页面入口
	    var a = $("<div id='998_entry' style='width:100%;height:80px;position:absolute;top:31px;left:0;background:#fbd303;'><a href='/activities/998'><img style='width:1200px;height:80px;margin:0 auto;display:block;' src='http://source.soyyin.com/activities/998/998_entry_in_index_page.png'></a><img style='position:absolute;top:50%;left:50%;margin-top:-9px;margin-left:570px;cursor: pointer;' src='http://source.soyyin.com/activities/998/close_998_entry.png'></div>");
	    $("div.header").append(a);  
	    $(".header").css("padding-top", "80px");
	    $("#998_entry").click(function() {
	        $(this).hide();
	        $(".header").css("padding-top", "30px");
	    });
	})


/***/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxvQkFBbUIsd0JBQXdCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0Esc0RBQXFELFlBQVksa0JBQWtCLFNBQVMsT0FBTyxtQkFBbUIscURBQXFELFlBQVksY0FBYyxjQUFjLDhHQUE4RyxRQUFRLFNBQVMsZ0JBQWdCLGtCQUFrQixnQkFBZ0I7QUFDcFksK0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTCxFQUFDIiwiZmlsZSI6ImpzL2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJChmdW5jdGlvbigpIHtcbiAgICAvL+i9ruaSreWbvueJh+aYvuekulxuICAgIHZhciB1bnNsaWRlckFyciA9IFt7XG4gICAgICAgIGltZzogXCJodHRwOi8vc291cmNlLnNveXlpbi5jb20vYmFubmVyX3RhaWxpZGluZ3poaS5wbmdcIixcbiAgICAgICAgbGluazogXCIvcHJvZHVjdD9pZD0yM1wiLFxuICAgIH0sIHtcbiAgICAgICAgaW1nOiBcImh0dHA6Ly9zb3VyY2Uuc295eWluLmNvbS9iYW5uZXJfbGlwaW5oZWRpbmd6aGkucG5nXCIsXG4gICAgICAgIGxpbms6IFwiL3Byb2R1Y3Q/aWQ9NjJcIixcbiAgICB9LCB7XG4gICAgICAgIGltZzogXCJodHRwOi8vN3hzZXhnLmNvbTIuejAuZ2xiLmNsb3VkZG4uY29tL2Jhbm5lcl9ndWFuZ2dhb2JlaS5wbmdcIixcbiAgICAgICAgbGluazogXCIvcHJvZHVjdD9pZD0zMVwiLFxuICAgIH0sIHtcbiAgICAgICAgaW1nOiBcImh0dHA6Ly83eHNleGcuY29tMi56MC5nbGIuY2xvdWRkbi5jb20vYmFubmVyX2Rlc2lnbi5qcGdcIixcbiAgICAgICAgbGluazogXCIvZGVzaWduXCIsXG4gICAgfSwge1xuICAgICAgICBpbWc6IFwiaHR0cDovLzd4c2V4Zy5jb20yLnowLmdsYi5xaW5pdWNkbi5jb20vYmFubmVyX21lbnhpbmd6aGFuamlhXzEucG5nXCIsXG4gICAgICAgIGxpbms6IFwiL3Byb2R1Y3Q/aWQ9NFwiLFxuICAgIH0sIHtcbiAgICAgICAgaW1nOiBcImh0dHA6Ly83eHNleGcuY29tMi56MC5nbGIucWluaXVjZG4uY29tL2Jhbm5lcl9nb25nZ3Vhbmh1aXpoYW5fMS5wbmdcIixcbiAgICAgICAgbGluazogXCJodHRwOi8vcHIuc295eWluLmNvbVwiLFxuICAgICAgICB0YXJnZXRfYmxhbms6IHRydWUsXG4gICAgfSwgXTtcbiAgICB2YXIgc3RyID0gXCI8dWw+XCI7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB1bnNsaWRlckFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICBzdHIgKz0gXCI8bGk+PGEgY2xhc3M9J3Vuc2xpZGUtbGluaycgaHJlZj0nXCIgKyB1bnNsaWRlckFycltpXS5saW5rICsgXCInXCIgKyAodW5zbGlkZXJBcnJbaV0udGFyZ2V0X2JsYW5rID8gXCIgdGFyZ2V0PSdfYmxhbmsnXCIgOiBcIlwiKSArIFwiPjxpbWcgY2xhc3M9J3Vuc2xpZGUtbGluay1pbWcnIHNyYz0nXCIgKyB1bnNsaWRlckFycltpXS5pbWcgKyBcIic+PC9hPjwvbGk+XCI7XG4gICAgfVxuICAgIHN0ciArPSBcIjwvdWw+XCI7XG4gICAgJChcIiN1bnNsaWRlcl9hdXRvXCIpLmh0bWwoc3RyKS51bnNsaWRlcih7XG4gICAgICAgIGF1dG9wbGF5OiB0cnVlXG4gICAgfSk7XG5cbiAgICAvLyA5OTjmtLvliqjpobXpnaLlhaXlj6NcbiAgICB2YXIgYSA9ICQoXCI8ZGl2IGlkPSc5OThfZW50cnknIHN0eWxlPSd3aWR0aDoxMDAlO2hlaWdodDo4MHB4O3Bvc2l0aW9uOmFic29sdXRlO3RvcDozMXB4O2xlZnQ6MDtiYWNrZ3JvdW5kOiNmYmQzMDM7Jz48YSBocmVmPScvYWN0aXZpdGllcy85OTgnPjxpbWcgc3R5bGU9J3dpZHRoOjEyMDBweDtoZWlnaHQ6ODBweDttYXJnaW46MCBhdXRvO2Rpc3BsYXk6YmxvY2s7JyBzcmM9J2h0dHA6Ly9zb3VyY2Uuc295eWluLmNvbS9hY3Rpdml0aWVzLzk5OC85OThfZW50cnlfaW5faW5kZXhfcGFnZS5wbmcnPjwvYT48aW1nIHN0eWxlPSdwb3NpdGlvbjphYnNvbHV0ZTt0b3A6NTAlO2xlZnQ6NTAlO21hcmdpbi10b3A6LTlweDttYXJnaW4tbGVmdDo1NzBweDtjdXJzb3I6IHBvaW50ZXI7JyBzcmM9J2h0dHA6Ly9zb3VyY2Uuc295eWluLmNvbS9hY3Rpdml0aWVzLzk5OC9jbG9zZV85OThfZW50cnkucG5nJz48L2Rpdj5cIik7XG4gICAgJChcImRpdi5oZWFkZXJcIikuYXBwZW5kKGEpOyAgXG4gICAgJChcIi5oZWFkZXJcIikuY3NzKFwicGFkZGluZy10b3BcIiwgXCI4MHB4XCIpO1xuICAgICQoXCIjOTk4X2VudHJ5XCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLmhpZGUoKTtcbiAgICAgICAgJChcIi5oZWFkZXJcIikuY3NzKFwicGFkZGluZy10b3BcIiwgXCIzMHB4XCIpO1xuICAgIH0pO1xufSlcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAwXG4gKiogbW9kdWxlIGNodW5rcyA9IDdcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9