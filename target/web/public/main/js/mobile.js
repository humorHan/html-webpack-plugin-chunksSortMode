webpackJsonp([12,19],[
/* 0 */
/***/ function(module, exports) {

	//判断是测服还是线上
	if(/soyyin.com/.test(location.href)){
	    var Mobile_Url = 'http://m.soyyin.com';
	} else {
	    var Mobile_Url = 'http://m.localprint.tinysoy.com';
	}      
	if (navigator.userAgent.match(/mobile/i)) {
	    if(/product/.test(location.pathname)){
	        location.href = Mobile_Url + '/product.html' + location.search + location.hash;
	    } else{
	        location.href = Mobile_Url;
	    }
	}

/***/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvbW9iaWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQSxFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxFIiwiZmlsZSI6ImpzL21vYmlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8v5Yik5pat5piv5rWL5pyN6L+Y5piv57q/5LiKXG5pZigvc295eWluLmNvbS8udGVzdChsb2NhdGlvbi5ocmVmKSl7XG4gICAgdmFyIE1vYmlsZV9VcmwgPSAnaHR0cDovL20uc295eWluLmNvbSc7XG59IGVsc2Uge1xuICAgIHZhciBNb2JpbGVfVXJsID0gJ2h0dHA6Ly9tLmxvY2FscHJpbnQudGlueXNveS5jb20nO1xufSAgICAgIFxuaWYgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL21vYmlsZS9pKSkge1xuICAgIGlmKC9wcm9kdWN0Ly50ZXN0KGxvY2F0aW9uLnBhdGhuYW1lKSl7XG4gICAgICAgIGxvY2F0aW9uLmhyZWYgPSBNb2JpbGVfVXJsICsgJy9wcm9kdWN0Lmh0bWwnICsgbG9jYXRpb24uc2VhcmNoICsgbG9jYXRpb24uaGFzaDtcbiAgICB9IGVsc2V7XG4gICAgICAgIGxvY2F0aW9uLmhyZWYgPSBNb2JpbGVfVXJsO1xuICAgIH1cbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL21vYmlsZS5qc1xuICoqIG1vZHVsZSBpZCA9IDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMTJcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9