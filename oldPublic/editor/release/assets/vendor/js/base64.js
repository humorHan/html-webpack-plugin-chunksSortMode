!function(a){"use strict";var b,c=a.Base64,d="2.1.9";if("undefined"!=typeof module&&module.exports)try{b=require("buffer").Buffer}catch(e){}var f="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",g=function(a){for(var b={},c=0,d=a.length;d>c;c++)b[a.charAt(c)]=c;return b}(f),h=String.fromCharCode,i=function(a){if(a.length<2){var b=a.charCodeAt(0);return 128>b?a:2048>b?h(192|b>>>6)+h(128|63&b):h(224|b>>>12&15)+h(128|b>>>6&63)+h(128|63&b)}var b=65536+1024*(a.charCodeAt(0)-55296)+(a.charCodeAt(1)-56320);return h(240|b>>>18&7)+h(128|b>>>12&63)+h(128|b>>>6&63)+h(128|63&b)},j=/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,k=function(a){return a.replace(j,i)},l=function(a){var b=[0,2,1][a.length%3],c=a.charCodeAt(0)<<16|(a.length>1?a.charCodeAt(1):0)<<8|(a.length>2?a.charCodeAt(2):0),d=[f.charAt(c>>>18),f.charAt(c>>>12&63),b>=2?"=":f.charAt(c>>>6&63),b>=1?"=":f.charAt(63&c)];return d.join("")},m=a.btoa?function(b){return a.btoa(b)}:function(a){return a.replace(/[\s\S]{1,3}/g,l)},n=b?function(a){return(a.constructor===b.constructor?a:new b(a)).toString("base64")}:function(a){return m(k(a))},o=function(a,b){return b?n(String(a)).replace(/[+\/]/g,function(a){return"+"==a?"-":"_"}).replace(/=/g,""):n(String(a))},p=function(a){return o(a,!0)},q=new RegExp(["[À-ß][-¿]","[à-ï][-¿]{2}","[ð-÷][-¿]{3}"].join("|"),"g"),r=function(a){switch(a.length){case 4:var b=(7&a.charCodeAt(0))<<18|(63&a.charCodeAt(1))<<12|(63&a.charCodeAt(2))<<6|63&a.charCodeAt(3),c=b-65536;return h((c>>>10)+55296)+h((1023&c)+56320);case 3:return h((15&a.charCodeAt(0))<<12|(63&a.charCodeAt(1))<<6|63&a.charCodeAt(2));default:return h((31&a.charCodeAt(0))<<6|63&a.charCodeAt(1))}},s=function(a){return a.replace(q,r)},t=function(a){var b=a.length,c=b%4,d=(b>0?g[a.charAt(0)]<<18:0)|(b>1?g[a.charAt(1)]<<12:0)|(b>2?g[a.charAt(2)]<<6:0)|(b>3?g[a.charAt(3)]:0),e=[h(d>>>16),h(d>>>8&255),h(255&d)];return e.length-=[0,0,2,1][c],e.join("")},u=a.atob?function(b){return a.atob(b)}:function(a){return a.replace(/[\s\S]{1,4}/g,t)},v=b?function(a){return(a.constructor===b.constructor?a:new b(a,"base64")).toString()}:function(a){return s(u(a))},w=function(a){return v(String(a).replace(/[-_]/g,function(a){return"-"==a?"+":"/"}).replace(/[^A-Za-z0-9\+\/]/g,""))},x=function(){var b=a.Base64;return a.Base64=c,b};if(a.Base64={VERSION:d,atob:u,btoa:m,fromBase64:w,toBase64:o,utob:k,encode:o,encodeURI:p,btou:s,decode:w,noConflict:x},"function"==typeof Object.defineProperty){var y=function(a){return{value:a,enumerable:!1,writable:!0,configurable:!0}};a.Base64.extendString=function(){Object.defineProperty(String.prototype,"fromBase64",y(function(){return w(this)})),Object.defineProperty(String.prototype,"toBase64",y(function(a){return o(this,a)})),Object.defineProperty(String.prototype,"toBase64URI",y(function(){return o(this,!0)}))}}a.Meteor&&(Base64=a.Base64)}(this);