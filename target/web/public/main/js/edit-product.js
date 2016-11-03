webpackJsonp([5,19],[
/* 0 */
/***/ function(module, exports) {

	(function() {
	    var order_id = getLinkParam('id');
	    var url = '/api/v2/admin/products/detail?id=' + order_id;
	    $http(url).get(function(result) {
	        $("#product_template").tmpl(result).appendTo('#edit_product');
	        RCEditor.editor.ready(function() {
	            RCEditor.setContent(result.detail);
	        });
	        $("#update_product_detail").click(function() {
	            var content = RCEditor.getContent();
	            var url = "/api/v2/admin/products/update-detail?id=" + order_id;
	            $http(url).put({ content: content }, function() {
	                alert("修改成功");
	            })
	        })
	    })
	})()


/***/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYWRtaW4vZWRpdC1wcm9kdWN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSw2QkFBNEIsbUJBQW1CO0FBQy9DO0FBQ0EsY0FBYTtBQUNiLFVBQVM7QUFDVCxNQUFLO0FBQ0wsRUFBQyIsImZpbGUiOiJqcy9lZGl0LXByb2R1Y3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKSB7XG4gICAgdmFyIG9yZGVyX2lkID0gZ2V0TGlua1BhcmFtKCdpZCcpO1xuICAgIHZhciB1cmwgPSAnL2FwaS92Mi9hZG1pbi9wcm9kdWN0cy9kZXRhaWw/aWQ9JyArIG9yZGVyX2lkO1xuICAgICRodHRwKHVybCkuZ2V0KGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAkKFwiI3Byb2R1Y3RfdGVtcGxhdGVcIikudG1wbChyZXN1bHQpLmFwcGVuZFRvKCcjZWRpdF9wcm9kdWN0Jyk7XG4gICAgICAgIFJDRWRpdG9yLmVkaXRvci5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIFJDRWRpdG9yLnNldENvbnRlbnQocmVzdWx0LmRldGFpbCk7XG4gICAgICAgIH0pO1xuICAgICAgICAkKFwiI3VwZGF0ZV9wcm9kdWN0X2RldGFpbFwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBjb250ZW50ID0gUkNFZGl0b3IuZ2V0Q29udGVudCgpO1xuICAgICAgICAgICAgdmFyIHVybCA9IFwiL2FwaS92Mi9hZG1pbi9wcm9kdWN0cy91cGRhdGUtZGV0YWlsP2lkPVwiICsgb3JkZXJfaWQ7XG4gICAgICAgICAgICAkaHR0cCh1cmwpLnB1dCh7IGNvbnRlbnQ6IGNvbnRlbnQgfSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoXCLkv67mlLnmiJDlip9cIik7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH0pXG59KSgpXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2FkbWluL2VkaXQtcHJvZHVjdC5qc1xuICoqIG1vZHVsZSBpZCA9IDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gNVxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=