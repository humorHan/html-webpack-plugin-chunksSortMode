webpackJsonp([16,19],[
/* 0 */
/***/ function(module, exports) {

	(function(){
	var
	  version = "2.0.9",
	  hasOwn = {}.hasOwnProperty,
	  PingppSDK = function(){},
	  cfg = {
	    PINGPP_NOTIFY_URL: 'https://api.pingxx.com/notify/charges/',
	    PINGPP_MOCK_URL: 'http://sissi.pingxx.com/mock.php',
	    ALIPAY_PC_DIRECT_URL: 'https://mapi.alipay.com/gateway.do',
	    UPACP_PC_URL: 'https://gateway.95516.com/gateway/api/frontTransReq.do',
	    CP_B2B_URL: 'https://payment.chinapay.com/CTITS/service/rest/page/nref/000000000017/0/0/0/0/0'
	  },
	  channels = {
	    alipay_pc_direct: 'alipay_pc_direct',
	    upacp_pc: 'upacp_pc',
	    cp_b2b: 'cp_b2b'
	  };
	
	PingppSDK.prototype = {
	
	  version: version,
	
	  _resultCallback: undefined,
	
	  _debug: false,
	
	  createPayment: function(charge_json, callback, debug) {
	    if (typeof callback == "function") {
	      this._resultCallback = callback;
	    }
	    if (typeof debug == "boolean") {
	      this._debug = debug;
	    }
	    var charge;
	    if(typeof charge_json == "string"){
	      try{
	        charge = JSON.parse(charge_json);
	      }catch(err){
	        this._innerCallback("fail", this._error("json_decode_fail"));
	        return;
	      }
	    }else{
	      charge = charge_json;
	    }
	    if(typeof charge == "undefined"){
	      this._innerCallback("fail", this._error("json_decode_fail"));
	      return;
	    }
	    if(!hasOwn.call(charge, 'id')){
	      this._innerCallback("fail", this._error("invalid_charge", "no_charge_id"));
	      return;
	    }
	    if(!hasOwn.call(charge, 'channel')){
	      this._innerCallback("fail", this._error("invalid_charge", "no_channel"));
	      return;
	    }
	    var channel = charge['channel'];
	    if(!hasOwn.call(charge, 'credential')){
	      this._innerCallback("fail", this._error("invalid_charge", "no_credential"));
	      return;
	    }
	    if (!charge['credential']) {
	      this._innerCallback("fail", this._error("invalid_credential", "credential_is_undefined"));
	      return;
	    }
	    if (!hasOwn.call(channels, channel)) {
	      this._innerCallback("fail", this._error("invalid_charge", "no_such_channel:" + channel));
	      return;
	    }
	    if (!hasOwn.call(charge['credential'], channel)) {
	      this._innerCallback("fail", this._error("invalid_credential", "no_valid_channel_credential"));
	      return;
	    }
	    if(!hasOwn.call(charge, 'livemode')){
	      this._innerCallback("fail", this._error("invalid_charge", "no_livemode"));
	      return;
	    }
	    if (charge['livemode'] == false) {
	      this._testModeNotify(charge);
	      return;
	    }
	    var credential = charge['credential'][channel];
	    if (channel == channels.upacp_pc) {
	      form_submit(cfg.UPACP_PC_URL, 'post', credential);
	    } else if (channel == channels.alipay_pc_direct) {
	      if (!hasOwn.call(credential, "_input_charset")) {
	        credential["_input_charset"] = 'utf-8';
	      }
	      var query = stringify_data(credential, channel, true);
	      window.location.href = cfg.ALIPAY_PC_DIRECT_URL + "?" + query;
	    } else if (channel == channels.cp_b2b) {
	      form_submit(cfg.CP_B2B_URL, 'post', credential);
	    }
	  },
	
	  _error: function(msg, extra) {
	    msg = (typeof msg == "undefined") ? "" : msg;
	    extra = (typeof extra == "undefined") ? "" : extra;
	    return {
	      msg:msg,
	      extra:extra
	    };
	  },
	
	  _innerCallback: function(result, err) {
	    if (typeof this._resultCallback == "function") {
	      if (typeof err == "undefined") {
	        err = this._error();
	      }
	      this._resultCallback(result, err);
	    }
	  },
	
	  _testModeNotify: function(charge) {
	    var params = {
	      'ch_id': charge['id'],
	      'scheme': 'http',
	      'channel': charge['channel']
	    };
	    if (hasOwn.call(charge, 'order_no')) {
	      params['order_no'] = charge['order_no'];
	    } else if (hasOwn.call(charge, 'orderNo')) {
	      params['order_no'] = charge['orderNo'];
	    }
	    if (hasOwn.call(charge, 'time_expire')) {
	      params['time_expire'] = charge['time_expire'];
	    } else if (hasOwn.call(charge, 'timeExpire')) {
	      params['time_expire'] = charge['timeExpire'];
	    }
	    if (hasOwn.call(charge, 'extra')) {
	      params['extra'] = encodeURIComponent(JSON.stringify(charge['extra']));
	    }
	    location.href = cfg.PINGPP_MOCK_URL+'?'+stringify_data(params);
	  }
	};
	
	function form_submit(url, method, params) {
	  var form = document.createElement("form");
	  form.setAttribute("method", method);
	  form.setAttribute("action", url);
	
	  for (var key in params) {
	    if (hasOwn.call(params, key)) {
	      var hiddenField = document.createElement("input");
	      hiddenField.setAttribute("type", "hidden");
	      hiddenField.setAttribute("name", key);
	      hiddenField.setAttribute("value", params[key]);
	      form.appendChild(hiddenField);
	    }
	  }
	
	  document.body.appendChild(form);
	  form.submit();
	}
	
	function stringify_data(data, channel, urlencode) {
	  if (typeof urlencode == "undefined") {
	    urlencode = false;
	  }
	  var output = [];
	  for (var i in data) {
	    if (!hasOwn.call(data, i) || typeof data[i] === 'function') {
	      continue;
	    }
	    if (channel == "bfb_wap" && i == "url") {
	      continue;
	    }
	    if (channel == "yeepay_wap" && i == "mode") {
	      continue;
	    }
	    output.push(i + '=' + (urlencode ? encodeURIComponent(data[i]) : data[i]));
	  }
	  return output.join('&');
	}
	
	PingppSDK.prototype.payment = PingppSDK.prototype.createPayment;
	window.pingppPc = new PingppSDK();
	})();


/***/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvcGluZ3BwLXBjLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2IsMkJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUMiLCJmaWxlIjoianMvcGluZ3BwLXBjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7XG52YXJcbiAgdmVyc2lvbiA9IFwiMi4wLjlcIixcbiAgaGFzT3duID0ge30uaGFzT3duUHJvcGVydHksXG4gIFBpbmdwcFNESyA9IGZ1bmN0aW9uKCl7fSxcbiAgY2ZnID0ge1xuICAgIFBJTkdQUF9OT1RJRllfVVJMOiAnaHR0cHM6Ly9hcGkucGluZ3h4LmNvbS9ub3RpZnkvY2hhcmdlcy8nLFxuICAgIFBJTkdQUF9NT0NLX1VSTDogJ2h0dHA6Ly9zaXNzaS5waW5neHguY29tL21vY2sucGhwJyxcbiAgICBBTElQQVlfUENfRElSRUNUX1VSTDogJ2h0dHBzOi8vbWFwaS5hbGlwYXkuY29tL2dhdGV3YXkuZG8nLFxuICAgIFVQQUNQX1BDX1VSTDogJ2h0dHBzOi8vZ2F0ZXdheS45NTUxNi5jb20vZ2F0ZXdheS9hcGkvZnJvbnRUcmFuc1JlcS5kbycsXG4gICAgQ1BfQjJCX1VSTDogJ2h0dHBzOi8vcGF5bWVudC5jaGluYXBheS5jb20vQ1RJVFMvc2VydmljZS9yZXN0L3BhZ2UvbnJlZi8wMDAwMDAwMDAwMTcvMC8wLzAvMC8wJ1xuICB9LFxuICBjaGFubmVscyA9IHtcbiAgICBhbGlwYXlfcGNfZGlyZWN0OiAnYWxpcGF5X3BjX2RpcmVjdCcsXG4gICAgdXBhY3BfcGM6ICd1cGFjcF9wYycsXG4gICAgY3BfYjJiOiAnY3BfYjJiJ1xuICB9O1xuXG5QaW5ncHBTREsucHJvdG90eXBlID0ge1xuXG4gIHZlcnNpb246IHZlcnNpb24sXG5cbiAgX3Jlc3VsdENhbGxiYWNrOiB1bmRlZmluZWQsXG5cbiAgX2RlYnVnOiBmYWxzZSxcblxuICBjcmVhdGVQYXltZW50OiBmdW5jdGlvbihjaGFyZ2VfanNvbiwgY2FsbGJhY2ssIGRlYnVnKSB7XG4gICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHRoaXMuX3Jlc3VsdENhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgZGVidWcgPT0gXCJib29sZWFuXCIpIHtcbiAgICAgIHRoaXMuX2RlYnVnID0gZGVidWc7XG4gICAgfVxuICAgIHZhciBjaGFyZ2U7XG4gICAgaWYodHlwZW9mIGNoYXJnZV9qc29uID09IFwic3RyaW5nXCIpe1xuICAgICAgdHJ5e1xuICAgICAgICBjaGFyZ2UgPSBKU09OLnBhcnNlKGNoYXJnZV9qc29uKTtcbiAgICAgIH1jYXRjaChlcnIpe1xuICAgICAgICB0aGlzLl9pbm5lckNhbGxiYWNrKFwiZmFpbFwiLCB0aGlzLl9lcnJvcihcImpzb25fZGVjb2RlX2ZhaWxcIikpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfWVsc2V7XG4gICAgICBjaGFyZ2UgPSBjaGFyZ2VfanNvbjtcbiAgICB9XG4gICAgaWYodHlwZW9mIGNoYXJnZSA9PSBcInVuZGVmaW5lZFwiKXtcbiAgICAgIHRoaXMuX2lubmVyQ2FsbGJhY2soXCJmYWlsXCIsIHRoaXMuX2Vycm9yKFwianNvbl9kZWNvZGVfZmFpbFwiKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmKCFoYXNPd24uY2FsbChjaGFyZ2UsICdpZCcpKXtcbiAgICAgIHRoaXMuX2lubmVyQ2FsbGJhY2soXCJmYWlsXCIsIHRoaXMuX2Vycm9yKFwiaW52YWxpZF9jaGFyZ2VcIiwgXCJub19jaGFyZ2VfaWRcIikpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZighaGFzT3duLmNhbGwoY2hhcmdlLCAnY2hhbm5lbCcpKXtcbiAgICAgIHRoaXMuX2lubmVyQ2FsbGJhY2soXCJmYWlsXCIsIHRoaXMuX2Vycm9yKFwiaW52YWxpZF9jaGFyZ2VcIiwgXCJub19jaGFubmVsXCIpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGNoYW5uZWwgPSBjaGFyZ2VbJ2NoYW5uZWwnXTtcbiAgICBpZighaGFzT3duLmNhbGwoY2hhcmdlLCAnY3JlZGVudGlhbCcpKXtcbiAgICAgIHRoaXMuX2lubmVyQ2FsbGJhY2soXCJmYWlsXCIsIHRoaXMuX2Vycm9yKFwiaW52YWxpZF9jaGFyZ2VcIiwgXCJub19jcmVkZW50aWFsXCIpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFjaGFyZ2VbJ2NyZWRlbnRpYWwnXSkge1xuICAgICAgdGhpcy5faW5uZXJDYWxsYmFjayhcImZhaWxcIiwgdGhpcy5fZXJyb3IoXCJpbnZhbGlkX2NyZWRlbnRpYWxcIiwgXCJjcmVkZW50aWFsX2lzX3VuZGVmaW5lZFwiKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghaGFzT3duLmNhbGwoY2hhbm5lbHMsIGNoYW5uZWwpKSB7XG4gICAgICB0aGlzLl9pbm5lckNhbGxiYWNrKFwiZmFpbFwiLCB0aGlzLl9lcnJvcihcImludmFsaWRfY2hhcmdlXCIsIFwibm9fc3VjaF9jaGFubmVsOlwiICsgY2hhbm5lbCkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIWhhc093bi5jYWxsKGNoYXJnZVsnY3JlZGVudGlhbCddLCBjaGFubmVsKSkge1xuICAgICAgdGhpcy5faW5uZXJDYWxsYmFjayhcImZhaWxcIiwgdGhpcy5fZXJyb3IoXCJpbnZhbGlkX2NyZWRlbnRpYWxcIiwgXCJub192YWxpZF9jaGFubmVsX2NyZWRlbnRpYWxcIikpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZighaGFzT3duLmNhbGwoY2hhcmdlLCAnbGl2ZW1vZGUnKSl7XG4gICAgICB0aGlzLl9pbm5lckNhbGxiYWNrKFwiZmFpbFwiLCB0aGlzLl9lcnJvcihcImludmFsaWRfY2hhcmdlXCIsIFwibm9fbGl2ZW1vZGVcIikpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoY2hhcmdlWydsaXZlbW9kZSddID09IGZhbHNlKSB7XG4gICAgICB0aGlzLl90ZXN0TW9kZU5vdGlmeShjaGFyZ2UpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgY3JlZGVudGlhbCA9IGNoYXJnZVsnY3JlZGVudGlhbCddW2NoYW5uZWxdO1xuICAgIGlmIChjaGFubmVsID09IGNoYW5uZWxzLnVwYWNwX3BjKSB7XG4gICAgICBmb3JtX3N1Ym1pdChjZmcuVVBBQ1BfUENfVVJMLCAncG9zdCcsIGNyZWRlbnRpYWwpO1xuICAgIH0gZWxzZSBpZiAoY2hhbm5lbCA9PSBjaGFubmVscy5hbGlwYXlfcGNfZGlyZWN0KSB7XG4gICAgICBpZiAoIWhhc093bi5jYWxsKGNyZWRlbnRpYWwsIFwiX2lucHV0X2NoYXJzZXRcIikpIHtcbiAgICAgICAgY3JlZGVudGlhbFtcIl9pbnB1dF9jaGFyc2V0XCJdID0gJ3V0Zi04JztcbiAgICAgIH1cbiAgICAgIHZhciBxdWVyeSA9IHN0cmluZ2lmeV9kYXRhKGNyZWRlbnRpYWwsIGNoYW5uZWwsIHRydWUpO1xuICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjZmcuQUxJUEFZX1BDX0RJUkVDVF9VUkwgKyBcIj9cIiArIHF1ZXJ5O1xuICAgIH0gZWxzZSBpZiAoY2hhbm5lbCA9PSBjaGFubmVscy5jcF9iMmIpIHtcbiAgICAgIGZvcm1fc3VibWl0KGNmZy5DUF9CMkJfVVJMLCAncG9zdCcsIGNyZWRlbnRpYWwpO1xuICAgIH1cbiAgfSxcblxuICBfZXJyb3I6IGZ1bmN0aW9uKG1zZywgZXh0cmEpIHtcbiAgICBtc2cgPSAodHlwZW9mIG1zZyA9PSBcInVuZGVmaW5lZFwiKSA/IFwiXCIgOiBtc2c7XG4gICAgZXh0cmEgPSAodHlwZW9mIGV4dHJhID09IFwidW5kZWZpbmVkXCIpID8gXCJcIiA6IGV4dHJhO1xuICAgIHJldHVybiB7XG4gICAgICBtc2c6bXNnLFxuICAgICAgZXh0cmE6ZXh0cmFcbiAgICB9O1xuICB9LFxuXG4gIF9pbm5lckNhbGxiYWNrOiBmdW5jdGlvbihyZXN1bHQsIGVycikge1xuICAgIGlmICh0eXBlb2YgdGhpcy5fcmVzdWx0Q2FsbGJhY2sgPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBpZiAodHlwZW9mIGVyciA9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGVyciA9IHRoaXMuX2Vycm9yKCk7XG4gICAgICB9XG4gICAgICB0aGlzLl9yZXN1bHRDYWxsYmFjayhyZXN1bHQsIGVycik7XG4gICAgfVxuICB9LFxuXG4gIF90ZXN0TW9kZU5vdGlmeTogZnVuY3Rpb24oY2hhcmdlKSB7XG4gICAgdmFyIHBhcmFtcyA9IHtcbiAgICAgICdjaF9pZCc6IGNoYXJnZVsnaWQnXSxcbiAgICAgICdzY2hlbWUnOiAnaHR0cCcsXG4gICAgICAnY2hhbm5lbCc6IGNoYXJnZVsnY2hhbm5lbCddXG4gICAgfTtcbiAgICBpZiAoaGFzT3duLmNhbGwoY2hhcmdlLCAnb3JkZXJfbm8nKSkge1xuICAgICAgcGFyYW1zWydvcmRlcl9ubyddID0gY2hhcmdlWydvcmRlcl9ubyddO1xuICAgIH0gZWxzZSBpZiAoaGFzT3duLmNhbGwoY2hhcmdlLCAnb3JkZXJObycpKSB7XG4gICAgICBwYXJhbXNbJ29yZGVyX25vJ10gPSBjaGFyZ2VbJ29yZGVyTm8nXTtcbiAgICB9XG4gICAgaWYgKGhhc093bi5jYWxsKGNoYXJnZSwgJ3RpbWVfZXhwaXJlJykpIHtcbiAgICAgIHBhcmFtc1sndGltZV9leHBpcmUnXSA9IGNoYXJnZVsndGltZV9leHBpcmUnXTtcbiAgICB9IGVsc2UgaWYgKGhhc093bi5jYWxsKGNoYXJnZSwgJ3RpbWVFeHBpcmUnKSkge1xuICAgICAgcGFyYW1zWyd0aW1lX2V4cGlyZSddID0gY2hhcmdlWyd0aW1lRXhwaXJlJ107XG4gICAgfVxuICAgIGlmIChoYXNPd24uY2FsbChjaGFyZ2UsICdleHRyYScpKSB7XG4gICAgICBwYXJhbXNbJ2V4dHJhJ10gPSBlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY2hhcmdlWydleHRyYSddKSk7XG4gICAgfVxuICAgIGxvY2F0aW9uLmhyZWYgPSBjZmcuUElOR1BQX01PQ0tfVVJMKyc/JytzdHJpbmdpZnlfZGF0YShwYXJhbXMpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBmb3JtX3N1Ym1pdCh1cmwsIG1ldGhvZCwgcGFyYW1zKSB7XG4gIHZhciBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIik7XG4gIGZvcm0uc2V0QXR0cmlidXRlKFwibWV0aG9kXCIsIG1ldGhvZCk7XG4gIGZvcm0uc2V0QXR0cmlidXRlKFwiYWN0aW9uXCIsIHVybCk7XG5cbiAgZm9yICh2YXIga2V5IGluIHBhcmFtcykge1xuICAgIGlmIChoYXNPd24uY2FsbChwYXJhbXMsIGtleSkpIHtcbiAgICAgIHZhciBoaWRkZW5GaWVsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgIGhpZGRlbkZpZWxkLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJoaWRkZW5cIik7XG4gICAgICBoaWRkZW5GaWVsZC5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIsIGtleSk7XG4gICAgICBoaWRkZW5GaWVsZC5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBwYXJhbXNba2V5XSk7XG4gICAgICBmb3JtLmFwcGVuZENoaWxkKGhpZGRlbkZpZWxkKTtcbiAgICB9XG4gIH1cblxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZvcm0pO1xuICBmb3JtLnN1Ym1pdCgpO1xufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnlfZGF0YShkYXRhLCBjaGFubmVsLCB1cmxlbmNvZGUpIHtcbiAgaWYgKHR5cGVvZiB1cmxlbmNvZGUgPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHVybGVuY29kZSA9IGZhbHNlO1xuICB9XG4gIHZhciBvdXRwdXQgPSBbXTtcbiAgZm9yICh2YXIgaSBpbiBkYXRhKSB7XG4gICAgaWYgKCFoYXNPd24uY2FsbChkYXRhLCBpKSB8fCB0eXBlb2YgZGF0YVtpXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmIChjaGFubmVsID09IFwiYmZiX3dhcFwiICYmIGkgPT0gXCJ1cmxcIikge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmIChjaGFubmVsID09IFwieWVlcGF5X3dhcFwiICYmIGkgPT0gXCJtb2RlXCIpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBvdXRwdXQucHVzaChpICsgJz0nICsgKHVybGVuY29kZSA/IGVuY29kZVVSSUNvbXBvbmVudChkYXRhW2ldKSA6IGRhdGFbaV0pKTtcbiAgfVxuICByZXR1cm4gb3V0cHV0LmpvaW4oJyYnKTtcbn1cblxuUGluZ3BwU0RLLnByb3RvdHlwZS5wYXltZW50ID0gUGluZ3BwU0RLLnByb3RvdHlwZS5jcmVhdGVQYXltZW50O1xud2luZG93LnBpbmdwcFBjID0gbmV3IFBpbmdwcFNESygpO1xufSkoKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvcGluZ3BwLXBjLmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSAxNlxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=