/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/reaf-print-dom-server/public/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
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
/******/ ]);