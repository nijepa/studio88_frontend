(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["camera"],{"0d3b":function(e,t,n){var r=n("d039"),a=n("b622"),i=n("c430"),c=a("iterator");e.exports=!r((function(){var e=new URL("b?a=1&b=2&c=3","http://a"),t=e.searchParams,n="";return e.pathname="c%20d",t.forEach((function(e,r){t["delete"]("b"),n+=r+e})),i&&!e.toJSON||!t.sort||"http://a/c%20d?a=1&c=3"!==e.href||"3"!==t.get("c")||"a=1"!==String(new URLSearchParams("?a=1"))||!t[c]||"a"!==new URL("https://a@b").username||"b"!==new URLSearchParams(new URLSearchParams("a=b")).get("a")||"xn--e1aybc"!==new URL("http://тест").host||"#%D0%B1"!==new URL("http://a#б").hash||"a1c3"!==n||"x"!==new URL("http://x",void 0).host}))},"2b3d":function(e,t,n){"use strict";n("3ca3");var r,a=n("23e7"),i=n("83ab"),c=n("0d3b"),s=n("da84"),o=n("37e8"),u=n("6eeb"),l=n("19aa"),h=n("5135"),f=n("60da"),p=n("4df4"),d=n("6547").codeAt,g=n("5fb2"),v=n("d44e"),m=n("9861"),b=n("69f3"),y=s.URL,w=m.URLSearchParams,C=m.getState,_=b.set,k=b.getterFor("URL"),U=Math.floor,L=Math.pow,S="Invalid authority",x="Invalid scheme",R="Invalid host",A="Invalid port",E=/[A-Za-z]/,P=/[\d+-.A-Za-z]/,M=/\d/,B=/^(0x|0X)/,O=/^[0-7]+$/,j=/^\d+$/,I=/^[\dA-Fa-f]+$/,q=/[\u0000\u0009\u000A\u000D #%/:?@[\\]]/,D=/[\u0000\u0009\u000A\u000D #/:?@[\\]]/,F=/^[\u0000-\u001F ]+|[\u0000-\u001F ]+$/g,V=/[\u0009\u000A\u000D]/g,N=function(e,t){var n,r,a;if("["==t.charAt(0)){if("]"!=t.charAt(t.length-1))return R;if(n=z(t.slice(1,-1)),!n)return R;e.host=n}else if(X(e)){if(t=g(t),q.test(t))return R;if(n=$(t),null===n)return R;e.host=n}else{if(D.test(t))return R;for(n="",r=p(t),a=0;a<r.length;a++)n+=Z(r[a],G);e.host=n}},$=function(e){var t,n,r,a,i,c,s,o=e.split(".");if(o.length&&""==o[o.length-1]&&o.pop(),t=o.length,t>4)return e;for(n=[],r=0;r<t;r++){if(a=o[r],""==a)return e;if(i=10,a.length>1&&"0"==a.charAt(0)&&(i=B.test(a)?16:8,a=a.slice(8==i?1:2)),""===a)c=0;else{if(!(10==i?j:8==i?O:I).test(a))return e;c=parseInt(a,i)}n.push(c)}for(r=0;r<t;r++)if(c=n[r],r==t-1){if(c>=L(256,5-t))return null}else if(c>255)return null;for(s=n.pop(),r=0;r<n.length;r++)s+=n[r]*L(256,3-r);return s},z=function(e){var t,n,r,a,i,c,s,o=[0,0,0,0,0,0,0,0],u=0,l=null,h=0,f=function(){return e.charAt(h)};if(":"==f()){if(":"!=e.charAt(1))return;h+=2,u++,l=u}while(f()){if(8==u)return;if(":"!=f()){t=n=0;while(n<4&&I.test(f()))t=16*t+parseInt(f(),16),h++,n++;if("."==f()){if(0==n)return;if(h-=n,u>6)return;r=0;while(f()){if(a=null,r>0){if(!("."==f()&&r<4))return;h++}if(!M.test(f()))return;while(M.test(f())){if(i=parseInt(f(),10),null===a)a=i;else{if(0==a)return;a=10*a+i}if(a>255)return;h++}o[u]=256*o[u]+a,r++,2!=r&&4!=r||u++}if(4!=r)return;break}if(":"==f()){if(h++,!f())return}else if(f())return;o[u++]=t}else{if(null!==l)return;h++,u++,l=u}}if(null!==l){c=u-l,u=7;while(0!=u&&c>0)s=o[u],o[u--]=o[l+c-1],o[l+--c]=s}else if(8!=u)return;return o},K=function(e){for(var t=null,n=1,r=null,a=0,i=0;i<8;i++)0!==e[i]?(a>n&&(t=r,n=a),r=null,a=0):(null===r&&(r=i),++a);return a>n&&(t=r,n=a),t},T=function(e){var t,n,r,a;if("number"==typeof e){for(t=[],n=0;n<4;n++)t.unshift(e%256),e=U(e/256);return t.join(".")}if("object"==typeof e){for(t="",r=K(e),n=0;n<8;n++)a&&0===e[n]||(a&&(a=!1),r===n?(t+=n?":":"::",a=!0):(t+=e[n].toString(16),n<7&&(t+=":")));return"["+t+"]"}return e},G={},H=f({},G,{" ":1,'"':1,"<":1,">":1,"`":1}),Y=f({},H,{"#":1,"?":1,"{":1,"}":1}),J=f({},Y,{"/":1,":":1,";":1,"=":1,"@":1,"[":1,"\\":1,"]":1,"^":1,"|":1}),Z=function(e,t){var n=d(e,0);return n>32&&n<127&&!h(t,e)?e:encodeURIComponent(e)},W={ftp:21,file:null,http:80,https:443,ws:80,wss:443},X=function(e){return h(W,e.scheme)},Q=function(e){return""!=e.username||""!=e.password},ee=function(e){return!e.host||e.cannotBeABaseURL||"file"==e.scheme},te=function(e,t){var n;return 2==e.length&&E.test(e.charAt(0))&&(":"==(n=e.charAt(1))||!t&&"|"==n)},ne=function(e){var t;return e.length>1&&te(e.slice(0,2))&&(2==e.length||"/"===(t=e.charAt(2))||"\\"===t||"?"===t||"#"===t)},re=function(e){var t=e.path,n=t.length;!n||"file"==e.scheme&&1==n&&te(t[0],!0)||t.pop()},ae=function(e){return"."===e||"%2e"===e.toLowerCase()},ie=function(e){return e=e.toLowerCase(),".."===e||"%2e."===e||".%2e"===e||"%2e%2e"===e},ce={},se={},oe={},ue={},le={},he={},fe={},pe={},de={},ge={},ve={},me={},be={},ye={},we={},Ce={},_e={},ke={},Ue={},Le={},Se={},xe=function(e,t,n,a){var i,c,s,o,u=n||ce,l=0,f="",d=!1,g=!1,v=!1;n||(e.scheme="",e.username="",e.password="",e.host=null,e.port=null,e.path=[],e.query=null,e.fragment=null,e.cannotBeABaseURL=!1,t=t.replace(F,"")),t=t.replace(V,""),i=p(t);while(l<=i.length){switch(c=i[l],u){case ce:if(!c||!E.test(c)){if(n)return x;u=oe;continue}f+=c.toLowerCase(),u=se;break;case se:if(c&&(P.test(c)||"+"==c||"-"==c||"."==c))f+=c.toLowerCase();else{if(":"!=c){if(n)return x;f="",u=oe,l=0;continue}if(n&&(X(e)!=h(W,f)||"file"==f&&(Q(e)||null!==e.port)||"file"==e.scheme&&!e.host))return;if(e.scheme=f,n)return void(X(e)&&W[e.scheme]==e.port&&(e.port=null));f="","file"==e.scheme?u=ye:X(e)&&a&&a.scheme==e.scheme?u=ue:X(e)?u=pe:"/"==i[l+1]?(u=le,l++):(e.cannotBeABaseURL=!0,e.path.push(""),u=Ue)}break;case oe:if(!a||a.cannotBeABaseURL&&"#"!=c)return x;if(a.cannotBeABaseURL&&"#"==c){e.scheme=a.scheme,e.path=a.path.slice(),e.query=a.query,e.fragment="",e.cannotBeABaseURL=!0,u=Se;break}u="file"==a.scheme?ye:he;continue;case ue:if("/"!=c||"/"!=i[l+1]){u=he;continue}u=de,l++;break;case le:if("/"==c){u=ge;break}u=ke;continue;case he:if(e.scheme=a.scheme,c==r)e.username=a.username,e.password=a.password,e.host=a.host,e.port=a.port,e.path=a.path.slice(),e.query=a.query;else if("/"==c||"\\"==c&&X(e))u=fe;else if("?"==c)e.username=a.username,e.password=a.password,e.host=a.host,e.port=a.port,e.path=a.path.slice(),e.query="",u=Le;else{if("#"!=c){e.username=a.username,e.password=a.password,e.host=a.host,e.port=a.port,e.path=a.path.slice(),e.path.pop(),u=ke;continue}e.username=a.username,e.password=a.password,e.host=a.host,e.port=a.port,e.path=a.path.slice(),e.query=a.query,e.fragment="",u=Se}break;case fe:if(!X(e)||"/"!=c&&"\\"!=c){if("/"!=c){e.username=a.username,e.password=a.password,e.host=a.host,e.port=a.port,u=ke;continue}u=ge}else u=de;break;case pe:if(u=de,"/"!=c||"/"!=f.charAt(l+1))continue;l++;break;case de:if("/"!=c&&"\\"!=c){u=ge;continue}break;case ge:if("@"==c){d&&(f="%40"+f),d=!0,s=p(f);for(var m=0;m<s.length;m++){var b=s[m];if(":"!=b||v){var y=Z(b,J);v?e.password+=y:e.username+=y}else v=!0}f=""}else if(c==r||"/"==c||"?"==c||"#"==c||"\\"==c&&X(e)){if(d&&""==f)return S;l-=p(f).length+1,f="",u=ve}else f+=c;break;case ve:case me:if(n&&"file"==e.scheme){u=Ce;continue}if(":"!=c||g){if(c==r||"/"==c||"?"==c||"#"==c||"\\"==c&&X(e)){if(X(e)&&""==f)return R;if(n&&""==f&&(Q(e)||null!==e.port))return;if(o=N(e,f),o)return o;if(f="",u=_e,n)return;continue}"["==c?g=!0:"]"==c&&(g=!1),f+=c}else{if(""==f)return R;if(o=N(e,f),o)return o;if(f="",u=be,n==me)return}break;case be:if(!M.test(c)){if(c==r||"/"==c||"?"==c||"#"==c||"\\"==c&&X(e)||n){if(""!=f){var w=parseInt(f,10);if(w>65535)return A;e.port=X(e)&&w===W[e.scheme]?null:w,f=""}if(n)return;u=_e;continue}return A}f+=c;break;case ye:if(e.scheme="file","/"==c||"\\"==c)u=we;else{if(!a||"file"!=a.scheme){u=ke;continue}if(c==r)e.host=a.host,e.path=a.path.slice(),e.query=a.query;else if("?"==c)e.host=a.host,e.path=a.path.slice(),e.query="",u=Le;else{if("#"!=c){ne(i.slice(l).join(""))||(e.host=a.host,e.path=a.path.slice(),re(e)),u=ke;continue}e.host=a.host,e.path=a.path.slice(),e.query=a.query,e.fragment="",u=Se}}break;case we:if("/"==c||"\\"==c){u=Ce;break}a&&"file"==a.scheme&&!ne(i.slice(l).join(""))&&(te(a.path[0],!0)?e.path.push(a.path[0]):e.host=a.host),u=ke;continue;case Ce:if(c==r||"/"==c||"\\"==c||"?"==c||"#"==c){if(!n&&te(f))u=ke;else if(""==f){if(e.host="",n)return;u=_e}else{if(o=N(e,f),o)return o;if("localhost"==e.host&&(e.host=""),n)return;f="",u=_e}continue}f+=c;break;case _e:if(X(e)){if(u=ke,"/"!=c&&"\\"!=c)continue}else if(n||"?"!=c)if(n||"#"!=c){if(c!=r&&(u=ke,"/"!=c))continue}else e.fragment="",u=Se;else e.query="",u=Le;break;case ke:if(c==r||"/"==c||"\\"==c&&X(e)||!n&&("?"==c||"#"==c)){if(ie(f)?(re(e),"/"==c||"\\"==c&&X(e)||e.path.push("")):ae(f)?"/"==c||"\\"==c&&X(e)||e.path.push(""):("file"==e.scheme&&!e.path.length&&te(f)&&(e.host&&(e.host=""),f=f.charAt(0)+":"),e.path.push(f)),f="","file"==e.scheme&&(c==r||"?"==c||"#"==c))while(e.path.length>1&&""===e.path[0])e.path.shift();"?"==c?(e.query="",u=Le):"#"==c&&(e.fragment="",u=Se)}else f+=Z(c,Y);break;case Ue:"?"==c?(e.query="",u=Le):"#"==c?(e.fragment="",u=Se):c!=r&&(e.path[0]+=Z(c,G));break;case Le:n||"#"!=c?c!=r&&("'"==c&&X(e)?e.query+="%27":e.query+="#"==c?"%23":Z(c,G)):(e.fragment="",u=Se);break;case Se:c!=r&&(e.fragment+=Z(c,H));break}l++}},Re=function(e){var t,n,r=l(this,Re,"URL"),a=arguments.length>1?arguments[1]:void 0,c=String(e),s=_(r,{type:"URL"});if(void 0!==a)if(a instanceof Re)t=k(a);else if(n=xe(t={},String(a)),n)throw TypeError(n);if(n=xe(s,c,null,t),n)throw TypeError(n);var o=s.searchParams=new w,u=C(o);u.updateSearchParams(s.query),u.updateURL=function(){s.query=String(o)||null},i||(r.href=Ee.call(r),r.origin=Pe.call(r),r.protocol=Me.call(r),r.username=Be.call(r),r.password=Oe.call(r),r.host=je.call(r),r.hostname=Ie.call(r),r.port=qe.call(r),r.pathname=De.call(r),r.search=Fe.call(r),r.searchParams=Ve.call(r),r.hash=Ne.call(r))},Ae=Re.prototype,Ee=function(){var e=k(this),t=e.scheme,n=e.username,r=e.password,a=e.host,i=e.port,c=e.path,s=e.query,o=e.fragment,u=t+":";return null!==a?(u+="//",Q(e)&&(u+=n+(r?":"+r:"")+"@"),u+=T(a),null!==i&&(u+=":"+i)):"file"==t&&(u+="//"),u+=e.cannotBeABaseURL?c[0]:c.length?"/"+c.join("/"):"",null!==s&&(u+="?"+s),null!==o&&(u+="#"+o),u},Pe=function(){var e=k(this),t=e.scheme,n=e.port;if("blob"==t)try{return new URL(t.path[0]).origin}catch(r){return"null"}return"file"!=t&&X(e)?t+"://"+T(e.host)+(null!==n?":"+n:""):"null"},Me=function(){return k(this).scheme+":"},Be=function(){return k(this).username},Oe=function(){return k(this).password},je=function(){var e=k(this),t=e.host,n=e.port;return null===t?"":null===n?T(t):T(t)+":"+n},Ie=function(){var e=k(this).host;return null===e?"":T(e)},qe=function(){var e=k(this).port;return null===e?"":String(e)},De=function(){var e=k(this),t=e.path;return e.cannotBeABaseURL?t[0]:t.length?"/"+t.join("/"):""},Fe=function(){var e=k(this).query;return e?"?"+e:""},Ve=function(){return k(this).searchParams},Ne=function(){var e=k(this).fragment;return e?"#"+e:""},$e=function(e,t){return{get:e,set:t,configurable:!0,enumerable:!0}};if(i&&o(Ae,{href:$e(Ee,(function(e){var t=k(this),n=String(e),r=xe(t,n);if(r)throw TypeError(r);C(t.searchParams).updateSearchParams(t.query)})),origin:$e(Pe),protocol:$e(Me,(function(e){var t=k(this);xe(t,String(e)+":",ce)})),username:$e(Be,(function(e){var t=k(this),n=p(String(e));if(!ee(t)){t.username="";for(var r=0;r<n.length;r++)t.username+=Z(n[r],J)}})),password:$e(Oe,(function(e){var t=k(this),n=p(String(e));if(!ee(t)){t.password="";for(var r=0;r<n.length;r++)t.password+=Z(n[r],J)}})),host:$e(je,(function(e){var t=k(this);t.cannotBeABaseURL||xe(t,String(e),ve)})),hostname:$e(Ie,(function(e){var t=k(this);t.cannotBeABaseURL||xe(t,String(e),me)})),port:$e(qe,(function(e){var t=k(this);ee(t)||(e=String(e),""==e?t.port=null:xe(t,e,be))})),pathname:$e(De,(function(e){var t=k(this);t.cannotBeABaseURL||(t.path=[],xe(t,e+"",_e))})),search:$e(Fe,(function(e){var t=k(this);e=String(e),""==e?t.query=null:("?"==e.charAt(0)&&(e=e.slice(1)),t.query="",xe(t,e,Le)),C(t.searchParams).updateSearchParams(t.query)})),searchParams:$e(Ve),hash:$e(Ne,(function(e){var t=k(this);e=String(e),""!=e?("#"==e.charAt(0)&&(e=e.slice(1)),t.fragment="",xe(t,e,Se)):t.fragment=null}))}),u(Ae,"toJSON",(function(){return Ee.call(this)}),{enumerable:!0}),u(Ae,"toString",(function(){return Ee.call(this)}),{enumerable:!0}),y){var ze=y.createObjectURL,Ke=y.revokeObjectURL;ze&&u(Re,"createObjectURL",(function(e){return ze.apply(y,arguments)})),Ke&&u(Re,"revokeObjectURL",(function(e){return Ke.apply(y,arguments)}))}v(Re,"URL"),a({global:!0,forced:!c,sham:!i},{URL:Re})},"5e59":function(e,t,n){},"5fb2":function(e,t,n){"use strict";var r=2147483647,a=36,i=1,c=26,s=38,o=700,u=72,l=128,h="-",f=/[^\0-\u007E]/,p=/[.\u3002\uFF0E\uFF61]/g,d="Overflow: input needs wider integers to process",g=a-i,v=Math.floor,m=String.fromCharCode,b=function(e){var t=[],n=0,r=e.length;while(n<r){var a=e.charCodeAt(n++);if(a>=55296&&a<=56319&&n<r){var i=e.charCodeAt(n++);56320==(64512&i)?t.push(((1023&a)<<10)+(1023&i)+65536):(t.push(a),n--)}else t.push(a)}return t},y=function(e){return e+22+75*(e<26)},w=function(e,t,n){var r=0;for(e=n?v(e/o):e>>1,e+=v(e/t);e>g*c>>1;r+=a)e=v(e/g);return v(r+(g+1)*e/(e+s))},C=function(e){var t=[];e=b(e);var n,s,o=e.length,f=l,p=0,g=u;for(n=0;n<e.length;n++)s=e[n],s<128&&t.push(m(s));var C=t.length,_=C;C&&t.push(h);while(_<o){var k=r;for(n=0;n<e.length;n++)s=e[n],s>=f&&s<k&&(k=s);var U=_+1;if(k-f>v((r-p)/U))throw RangeError(d);for(p+=(k-f)*U,f=k,n=0;n<e.length;n++){if(s=e[n],s<f&&++p>r)throw RangeError(d);if(s==f){for(var L=p,S=a;;S+=a){var x=S<=g?i:S>=g+c?c:S-g;if(L<x)break;var R=L-x,A=a-x;t.push(m(y(x+R%A))),L=v(R/A)}t.push(m(y(L))),g=w(p,U,_==C),p=0,++_}}++p,++f}return t.join("")};e.exports=function(e){var t,n,r=[],a=e.toLowerCase().replace(p,".").split(".");for(t=0;t<a.length;t++)n=a[t],r.push(f.test(n)?"xn--"+C(n):n);return r.join(".")}},"6ec0":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"lists__wrapper"},[n("div",{staticClass:"user__form"},[n("div",{staticClass:"camera"},[n("video",{staticClass:"video",attrs:{id:"video",autoplay:""}}),e.loadingState?n("loading",{key:"1",attrs:{pic:"loading1"}}):n("form",{key:"2",attrs:{method:"post"},on:{submit:function(t){return t.preventDefault(),e.savePicture(e.pic)}}},[n("div",{staticClass:"picture__actions"},[e.error?e._e():n("button",{staticClass:"action_btn client__add for__camera",attrs:{id:"snap"},on:{click:function(t){return t.preventDefault(),e.takePicture(t)}}},[n("svg",{staticStyle:{"enable-background":"new 0 0 477.418 477.419"},attrs:{x:"0px",y:"0px",width:"40px",height:"40px",viewBox:"0 0 477.418 477.419","xml:space":"preserve",fill:"var(--purple)"}},[n("circle",{attrs:{cx:"249.209",cy:"160.576",r:"6.448"}}),n("circle",{attrs:{cx:"220.959",cy:"160.576",r:"11.75"}}),n("path",{attrs:{d:"M363.417,113.712H213.609c-21.324,0-38.611,17.287-38.611,38.61v286.485c0,21.325,17.287,38.612,38.611,38.612h149.808\n                c21.324,0,38.609-17.287,38.609-38.612V152.322C402.026,130.999,384.741,113.712,363.417,113.712z M245.959,182.826h-26.5\n                c-12.288,0-22.25-9.962-22.25-22.25c0-12.288,9.962-22.25,22.25-22.25h26.5c12.287,0,22.25,9.962,22.25,22.25\n                C268.209,172.864,258.247,182.826,245.959,182.826z"}}),n("polygon",{attrs:{points:"116.076,110.817 177.572,102.86 183.627,43.549 221.85,95.55 260.706,74.693 253.958,95.618 271.01,95.618 \n                288.512,41.349 226.584,74.589 171.758,0 162.734,88.415 75.393,99.718 136.939,147.624 88.264,212.627 157.947,201.267 \n                157.947,184.823 125.383,190.132 159.479,144.601 \t\t"}})]),e._v(" Slikaj ")]),e.error?e._e():n("h4",[e._v("ili")]),n("div",{staticClass:"action_btn client__add for__camera"},[n("input",{staticStyle:{display:"none"},attrs:{type:"file",name:"",id:""},on:{change:e.selectFile}}),n("button",{staticClass:"browse__btn",on:{click:function(t){return t.preventDefault(),e.browsePicture(t)}}},[n("svg",{staticStyle:{"enable-background":"new 0 0 534.479 534.479"},attrs:{x:"0px",y:"0px",width:"30px",height:"30px",viewBox:"0 0 534.479 534.479","xml:space":"preserve",fill:"var(--purple)"}},[n("path",{attrs:{d:"M77.52,534.479h379.439V0h-242.25v124.949H77.52V534.479z M267.24,155.968l128.52,128.52h-53.896V424.41H192.616V284.488\n                H138.72L267.24,155.968z"}}),n("polygon",{attrs:{points:"199.409,109.649 199.409,6.928 85.968,109.649 \t\t"}})]),e._v(" Učitaj ")])])]),n("canvas",{staticClass:"snap",attrs:{id:"canvas",width:"115px",height:"150px"}}),n("div",{staticClass:"modify_btns"},[n("action-buttons",{on:{canceled:e.handleCancel}})],1)])],1)])])},a=[],i=(n("d3b7"),n("3ca3"),n("ddb0"),n("2b3d"),n("96cf"),n("1da1")),c=n("5530"),s=n("bc3a"),o=n.n(s),u=n("2f62"),l=n("88d8"),h=n("7d33"),f=n("ab63"),p={name:"Camera",components:{Loading:h["a"],ActionButtons:l["a"]},mixins:[f["a"]],data:function(){return{url:Object({NODE_ENV:"production",VUE_APP_BACKEND_URL:"https://studio88.herokuapp.com/",VUE_APP_BACKEND_URL_LOCAL:"http://localhost:4000/",VUE_APP_FACEBOOK_ID:"2032000590426601",VUE_APP_GOOGLE_ID:"371854890286-8234o642rdb5n2pfluhprtchetn3uhad.apps.googleusercontent.com",VUE_APP_TINYMCE_API_KEY:"2guq5wvvizaji79tec92yznr95h8nlnk69m7n7qx7k2lxdpl",BASE_URL:"/"}).VUE_APP_CLOUDINARY,pic:null,clientInput:{picture:""},ima:null,error:null}},computed:Object(c["a"])({},Object(u["c"])(["getOneClient","getErrors","loadingState"])),methods:Object(c["a"])(Object(c["a"])({},Object(u["b"])(["fetchClients","clientUpdate","clearErrors","setLoadingState"])),{},{handleCancel:function(){this.closeCamera()},takePicture:function(){var e=document.getElementById("canvas"),t=e.getContext("2d"),n=document.getElementById("video"),r=e.width,a=e.height,i=n.clientWidth,c=n.clientHeight,s=Math.min(r/i,a/c),o=i*s,u=c*s;t.drawImage(n,(r-o)/2,(a-u)/2,o,u),this.pic=e},savePicture:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){var r,a,i;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(t.setLoadingState(!0),e){n.next=5;break}return t.$toast.error(" ","Prvo slikaj!",t.notificationSystem.options.error),t.setLoadingState(!1),n.abrupt("return");case 5:return r=new Image,r.src=e.toDataURL("image/png"),a=Object({NODE_ENV:"production",VUE_APP_BACKEND_URL:"https://studio88.herokuapp.com/",VUE_APP_BACKEND_URL_LOCAL:"http://localhost:4000/",VUE_APP_FACEBOOK_ID:"2032000590426601",VUE_APP_GOOGLE_ID:"371854890286-8234o642rdb5n2pfluhprtchetn3uhad.apps.googleusercontent.com",VUE_APP_TINYMCE_API_KEY:"2guq5wvvizaji79tec92yznr95h8nlnk69m7n7qx7k2lxdpl",BASE_URL:"/"}).VUE_APP_UNSIGNED_UPLOAD_PRESET,i=new FormData,i.append("file",r.src),i.append("upload_preset",a),n.next=13,t.saveClientPhoto(i);case 13:return n.next=15,t.updateClientPhoto();case 15:return n.next=17,t.fetchClients();case 17:return n.next=19,t.setLoadingState(!1);case 19:t.closeCamera();case 20:case"end":return n.stop()}}),n)})))()},saveClientPhoto:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,o.a.post(t.url,e).then((function(e){t.clientInput.picture=e.data.secure_url})).catch((function(e){e.response?console.log=e.response.data.error:console.log=e}));case 2:case"end":return n.stop()}}),n)})))()},updateClientPhoto:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.clientUpdate(e.clientInput);case 2:e.getErrors.length?(e.$toast.error("Greška! "+e.getErrors,"OK",e.notificationSystem.options.error),e.clearErrors()):e.$toast.success("Uspješno sačuvano!","OK",e.notificationSystem.options.success);case 3:case"end":return t.stop()}}),t)})))()},browsePicture:function(){document.querySelector('input[type="file"]').click()},selectFile:function(){var e=document.getElementById("canvas"),t=e.getContext("2d"),n=new Image;n.src=URL.createObjectURL(event.target.files[0]),n.onload=function(){t.drawImage(n,0,0,115,150)},this.pic=e},closeCamera:function(){this.setLoadingState(!0),this.$router.push("/client")},initCamera:function(){var e=this,t=document.getElementById("video");navigator.mediaDevices&&navigator.mediaDevices.getUserMedia&&navigator.mediaDevices.getUserMedia({video:{facingMode:{exact:"environment"}}}).then((function(e){t.srcObject=e,t.play()})).catch((function(n){navigator.mediaDevices.getUserMedia({video:!0}).then((function(e){t.srcObject=e,t.play()})).catch((function(t){e.error=t,e.$toast.error("Nema kamere! ","Greška",e.notificationSystem.options.error)})),console.log(n)}))}}),mounted:function(){this.initCamera(),this.clientInput=this.getOneClient,this.setLoadingState(!1)}},d=p,g=(n("7288"),n("2877")),v=Object(g["a"])(d,r,a,!1,null,null,null);t["default"]=v.exports},7288:function(e,t,n){"use strict";var r=n("5e59"),a=n.n(r);a.a},"88d8":function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"action_btns input__btns"},[n("button",{staticClass:"action_btn save__btn",attrs:{type:"submit"}},[n("svg",{staticStyle:{"enable-background":"new 0 0 408.759 408.759"},attrs:{version:"1.1",id:"Layer_1",x:"0px",y:"0px",height:"40px",viewBox:"0 0 408.759 408.759","xml:space":"preserve"}},[n("g",[n("path",{staticStyle:{fill:"#8bdd6b"},attrs:{d:"M204.383,408.759c-58.121,0-113.674-24.867-152.417-68.225\n          C18.46,303.057,0.005,254.703,0.005,204.381C0.005,91.685,91.688,0,204.383,0c50.319,0,98.674,18.455,136.164,51.964\n          c43.346,38.762,68.207,94.316,68.207,152.417C408.755,317.076,317.074,408.759,204.383,408.759"}}),n("path",{staticStyle:{fill:"#35af05"},attrs:{d:"M377.755,204.379c0,18.08-2.77,35.52-7.909,51.901c-15.6,49.779-53.02,89.899-101.069,109.11\n          c-4.69,1.889-9.481,3.56-14.361,5.03c-10.5,3.16-21.419,5.35-32.65,6.47c-5.719,0.58-11.51,0.87-17.38,0.87\n          c-51.39,0-97.559-22.361-129.299-57.881c-0.26-0.29-0.521-0.591-0.79-0.881c-26.95-30.56-43.29-70.68-43.29-114.62\n          c0-95.749,77.621-173.38,173.379-173.38c43.951,0,84.071,16.35,114.631,43.29c0.29,0.27,0.589,0.53,0.879,0.79\n          c33.66,30.1,55.491,73.13,57.67,121.299v0.011C377.696,199.04,377.755,201.699,377.755,204.379"}}),n("path",{staticStyle:{fill:"#1c6300"},attrs:{d:"M74.34,319.046c3.509,3.976,7.2,7.791,11.056,11.43c-3.585-3.385-7.023-6.919-10.309-10.596\n          C74.84,319.605,74.594,319.321,74.34,319.046 M59.6,299.796c0.005,0.008,0.011,0.016,0.016,0.024\n          C59.611,299.813,59.604,299.802,59.6,299.796 M59.097,299.029c0.017,0.025,0.031,0.048,0.048,0.073\n          C59.128,299.078,59.113,299.054,59.097,299.029 M58.793,298.562c0.021,0.033,0.041,0.063,0.062,0.096\n          C58.834,298.626,58.813,298.593,58.793,298.562 M58.495,298.102c0.056,0.086,0.108,0.168,0.164,0.254\n          C58.605,298.272,58.549,298.186,58.495,298.102 M58.272,297.754c0.036,0.056,0.075,0.117,0.111,0.173\n          C58.346,297.869,58.31,297.813,58.272,297.754 M57.99,297.312c0.044,0.069,0.089,0.14,0.133,0.208\n          C58.078,297.451,58.034,297.381,57.99,297.312 M57.71,296.87c0.061,0.097,0.124,0.197,0.186,0.293\n          C57.834,297.067,57.771,296.967,57.71,296.87 M57.474,296.496c0.051,0.082,0.102,0.162,0.153,0.244\n          C57.576,296.659,57.524,296.576,57.474,296.496 M57.209,296.074c0.061,0.097,0.123,0.197,0.184,0.295\n          C57.333,296.271,57.27,296.171,57.209,296.074 M56.936,295.635c0.067,0.108,0.133,0.214,0.2,0.322\n          C57.069,295.849,57.003,295.743,56.936,295.635 M56.696,295.246c0.062,0.1,0.12,0.195,0.182,0.295\n          C56.817,295.443,56.756,295.344,56.696,295.246 M56.439,294.829c0.071,0.116,0.142,0.231,0.213,0.347\n          C56.582,295.061,56.51,294.944,56.439,294.829 M56.173,294.392c0.072,0.119,0.144,0.237,0.217,0.355\n          C56.318,294.63,56.244,294.51,56.173,294.392 M55.922,293.98c0.073,0.121,0.146,0.242,0.22,0.363\n          C56.069,294.221,55.996,294.102,55.922,293.98 M55.681,293.58c0.076,0.127,0.153,0.254,0.229,0.38\n          C55.834,293.834,55.757,293.706,55.681,293.58 M55.419,293.143c0.077,0.13,0.154,0.258,0.232,0.387\n          C55.574,293.402,55.496,293.272,55.419,293.143 M54.935,292.328c0.161,0.273,0.321,0.542,0.484,0.815\n          C55.257,292.872,55.096,292.599,54.935,292.328 M152.31,38.956C81.994,61.064,31.004,126.76,31.004,204.37\n          c0,32.099,8.717,62.156,23.919,87.936c-15.2-25.78-23.917-55.835-23.917-87.927C31.006,126.769,81.994,61.067,152.31,38.956"}}),n("path",{staticStyle:{fill:"#35af05"},attrs:{d:"M204.383,31.001c-18.142,0-35.638,2.787-52.073,7.955C81.994,61.067,31.006,126.769,31.006,204.379\n          c0,32.092,8.717,62.147,23.917,87.927c0.003,0.005,0.01,0.016,0.013,0.022c0.16,0.271,0.322,0.544,0.484,0.815v0.001\n          c0.077,0.129,0.155,0.259,0.232,0.387c0.009,0.016,0.02,0.034,0.03,0.05c0.076,0.126,0.153,0.254,0.229,0.38\n          c0.005,0.008,0.007,0.012,0.012,0.02c0.074,0.122,0.146,0.241,0.22,0.363c0.009,0.016,0.021,0.034,0.03,0.049\n          c0.071,0.117,0.145,0.238,0.217,0.355c0.016,0.026,0.034,0.056,0.05,0.082c0.071,0.115,0.142,0.232,0.213,0.347\n          c0.014,0.023,0.029,0.047,0.043,0.07c0.06,0.098,0.122,0.197,0.182,0.295c0.019,0.031,0.039,0.063,0.058,0.094\n          c0.067,0.108,0.133,0.214,0.2,0.322c0.024,0.038,0.049,0.079,0.073,0.117c0.061,0.097,0.123,0.197,0.184,0.295\n          c0.027,0.043,0.053,0.084,0.08,0.127c0.051,0.08,0.103,0.163,0.153,0.244c0.027,0.043,0.055,0.088,0.083,0.131\n          c0.061,0.097,0.124,0.197,0.186,0.293c0.032,0.051,0.062,0.097,0.094,0.148c0.044,0.069,0.088,0.139,0.133,0.208\n          c0.05,0.079,0.099,0.156,0.15,0.234c0.038,0.059,0.073,0.114,0.111,0.173c0.037,0.058,0.074,0.116,0.112,0.174\n          c0.054,0.084,0.109,0.17,0.164,0.254c0.044,0.068,0.089,0.138,0.134,0.206c0.02,0.031,0.042,0.065,0.062,0.096\n          c0.079,0.121,0.163,0.25,0.242,0.371c0.016,0.025,0.032,0.048,0.048,0.073c0.152,0.232,0.302,0.462,0.455,0.693\n          c0.004,0.006,0.012,0.018,0.016,0.024c4.462,6.754,9.386,13.178,14.724,19.226c0.254,0.275,0.5,0.559,0.747,0.834\n          c3.286,3.677,6.724,7.212,10.309,10.596c2.298,2.169,4.654,4.273,7.068,6.315c-25.53-30.2-40.919-69.241-40.919-111.881\n          c0-95.749,77.619-173.368,173.379-173.368c42.631,0,81.68,15.39,111.87,40.919C305.004,54.871,257.483,31.001,204.383,31.001"}}),n("path",{staticStyle:{fill:"#35af05"},attrs:{d:"M317.613,136.427L178.714,275.326l90.064,90.064c48.049-19.21,85.469-59.33,101.069-109.11\n          c5.139-16.381,7.909-33.821,7.909-51.901c0-2.679-0.059-5.339-0.19-7.989v-0.011l0,0l-50.069-50.069"}}),n("polyline",{staticStyle:{fill:"#ffffff"},attrs:{points:"188.597,285.205 102.651,199.26 118.207,183.704 188.597,254.094 311.936,130.754 \n          327.492,146.31 188.597,285.205 \t"}})])]),n("p",[e._v("Sačuvaj")])]),n("button",{staticClass:"action_btn cancel__btn",attrs:{type:"submit"},on:{click:function(t){return t.preventDefault(),e.handleCancel(t)}}},[n("svg",{staticStyle:{"enable-background":"new 0 0 408.759 408.759"},attrs:{version:"1.1",id:"Layer_1",x:"0px",y:"0px",height:"40px",viewBox:"0 0 408.759 408.759","xml:space":"preserve"}},[n("g",[n("path",{staticStyle:{fill:"#e7c75b"},attrs:{d:"M204.385,408.759c-58.121,0-113.675-24.868-152.418-68.227\n          C18.46,303.057,0.005,254.703,0.005,204.379C0.005,91.683,91.689,0,204.385,0c50.317,0,98.674,18.453,136.163,51.964\n          c43.348,38.761,68.207,94.315,68.207,152.415C408.755,317.074,317.075,408.759,204.385,408.759"}}),n("path",{staticStyle:{fill:"#ffb515"},attrs:{d:"M377.759,204.379c0,9.08-0.7,17.999-2.05,26.7c-1.331,8.62-3.3,17.039-5.861,25.199\n          c-19.48,62.179-73.03,109.291-138.779,119.43c-3.08,0.48-6.181,0.87-9.3,1.18c-5.721,0.58-11.51,0.87-17.38,0.87\n          c-51.39,0-97.561-22.361-129.301-57.881c-0.26-0.29-0.519-0.589-0.79-0.879c-26.95-30.56-43.289-70.681-43.289-114.62\n          c0-95.751,77.619-173.381,173.38-173.381c43.95,0,84.069,16.35,114.629,43.29c0.29,0.27,0.591,0.53,0.881,0.79\n          C355.409,106.838,377.759,152.989,377.759,204.379"}}),n("path",{staticStyle:{fill:"#e29403"},attrs:{d:"M74.342,319.046c3.837,4.347,7.885,8.496,12.136,12.439c-3.973-3.689-7.776-7.564-11.389-11.607\n          C74.842,319.603,74.597,319.321,74.342,319.046 M65.406,308.053c0.011,0.014,0.021,0.027,0.031,0.042\n          C65.427,308.081,65.417,308.067,65.406,308.053 M65.054,307.58c0.032,0.044,0.066,0.089,0.099,0.133\n          C65.12,307.669,65.087,307.624,65.054,307.58 M64.725,307.135c0.068,0.092,0.139,0.188,0.207,0.28\n          C64.864,307.323,64.793,307.228,64.725,307.135 M64.441,306.749c0.073,0.1,0.142,0.193,0.215,0.293\n          C64.584,306.943,64.513,306.847,64.441,306.749 M64.143,306.34c0.09,0.124,0.176,0.241,0.267,0.365\n          C64.321,306.585,64.231,306.461,64.143,306.34 M163.56,35.832C87.503,54.187,31.004,122.679,31.004,204.37\n          c0,38.107,12.288,73.34,33.125,101.952c-20.836-28.615-33.12-63.843-33.12-101.943C31.009,122.689,87.503,54.189,163.56,35.832"}}),n("path",{staticStyle:{fill:"#ffb515"},attrs:{d:"M204.383,30.999c-14.062,0-27.731,1.673-40.823,4.833C87.503,54.189,31.009,122.689,31.009,204.379\n          c0,38.1,12.284,73.328,33.12,101.943c0.004,0.005,0.01,0.014,0.014,0.019c0.088,0.121,0.178,0.245,0.267,0.365\n          c0.009,0.012,0.023,0.031,0.032,0.043c0.072,0.099,0.143,0.194,0.215,0.293c0.023,0.031,0.046,0.063,0.069,0.094\n          c0.068,0.092,0.139,0.188,0.207,0.28c0.041,0.056,0.081,0.109,0.122,0.165c0.033,0.044,0.066,0.089,0.099,0.133\n          c0.084,0.114,0.169,0.227,0.254,0.341c0.01,0.014,0.021,0.028,0.031,0.042c2.82,3.771,5.792,7.425,8.904,10.951\n          c0.255,0.275,0.5,0.558,0.747,0.832c3.613,4.043,7.416,7.919,11.389,11.607c1.953,1.812,3.952,3.583,5.988,5.304\n          c-25.531-30.2-40.921-69.239-40.921-111.88c0-95.751,77.621-173.37,173.381-173.37c42.629,0,81.68,15.39,111.869,40.919\n          C305.004,54.869,257.484,30.999,204.383,30.999"}}),n("path",{staticStyle:{fill:"#ffb515"},attrs:{d:"M276.012,131.382L131.383,276.013l99.686,99.695c65.749-10.14,119.299-57.251,138.779-119.43\n          c2.561-8.16,4.53-16.579,5.861-25.199l-91.242-91.242"}}),n("polygon",{staticStyle:{fill:"#ffffff"},attrs:{points:"284.473,139.843 268.917,124.286 204.379,188.823 139.842,124.286 124.286,139.843 \n          188.823,204.379 124.286,268.916 139.842,284.472 204.379,219.936 268.917,284.472 284.473,268.916 219.936,204.379 \t"}})])]),n("p",[e._v("Odustani")])])])},a=[],i={name:"ActionButtons",props:{toForm:String},methods:{handleCancel:function(){this.toForm?this.$router.push("/"+this.toForm):this.$emit("canceled",!0)}}},c=i,s=n("2877"),o=Object(s["a"])(c,r,a,!1,null,null,null);t["a"]=o.exports},9861:function(e,t,n){"use strict";n("e260");var r=n("23e7"),a=n("d066"),i=n("0d3b"),c=n("6eeb"),s=n("e2cc"),o=n("d44e"),u=n("9ed3"),l=n("69f3"),h=n("19aa"),f=n("5135"),p=n("0366"),d=n("f5df"),g=n("825a"),v=n("861d"),m=n("7c73"),b=n("5c6c"),y=n("9a1f"),w=n("35a1"),C=n("b622"),_=a("fetch"),k=a("Headers"),U=C("iterator"),L="URLSearchParams",S=L+"Iterator",x=l.set,R=l.getterFor(L),A=l.getterFor(S),E=/\+/g,P=Array(4),M=function(e){return P[e-1]||(P[e-1]=RegExp("((?:%[\\da-f]{2}){"+e+"})","gi"))},B=function(e){try{return decodeURIComponent(e)}catch(t){return e}},O=function(e){var t=e.replace(E," "),n=4;try{return decodeURIComponent(t)}catch(r){while(n)t=t.replace(M(n--),B);return t}},j=/[!'()~]|%20/g,I={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+"},q=function(e){return I[e]},D=function(e){return encodeURIComponent(e).replace(j,q)},F=function(e,t){if(t){var n,r,a=t.split("&"),i=0;while(i<a.length)n=a[i++],n.length&&(r=n.split("="),e.push({key:O(r.shift()),value:O(r.join("="))}))}},V=function(e){this.entries.length=0,F(this.entries,e)},N=function(e,t){if(e<t)throw TypeError("Not enough arguments")},$=u((function(e,t){x(this,{type:S,iterator:y(R(e).entries),kind:t})}),"Iterator",(function(){var e=A(this),t=e.kind,n=e.iterator.next(),r=n.value;return n.done||(n.value="keys"===t?r.key:"values"===t?r.value:[r.key,r.value]),n})),z=function(){h(this,z,L);var e,t,n,r,a,i,c,s,o,u=arguments.length>0?arguments[0]:void 0,l=this,p=[];if(x(l,{type:L,entries:p,updateURL:function(){},updateSearchParams:V}),void 0!==u)if(v(u))if(e=w(u),"function"===typeof e){t=e.call(u),n=t.next;while(!(r=n.call(t)).done){if(a=y(g(r.value)),i=a.next,(c=i.call(a)).done||(s=i.call(a)).done||!i.call(a).done)throw TypeError("Expected sequence with length 2");p.push({key:c.value+"",value:s.value+""})}}else for(o in u)f(u,o)&&p.push({key:o,value:u[o]+""});else F(p,"string"===typeof u?"?"===u.charAt(0)?u.slice(1):u:u+"")},K=z.prototype;s(K,{append:function(e,t){N(arguments.length,2);var n=R(this);n.entries.push({key:e+"",value:t+""}),n.updateURL()},delete:function(e){N(arguments.length,1);var t=R(this),n=t.entries,r=e+"",a=0;while(a<n.length)n[a].key===r?n.splice(a,1):a++;t.updateURL()},get:function(e){N(arguments.length,1);for(var t=R(this).entries,n=e+"",r=0;r<t.length;r++)if(t[r].key===n)return t[r].value;return null},getAll:function(e){N(arguments.length,1);for(var t=R(this).entries,n=e+"",r=[],a=0;a<t.length;a++)t[a].key===n&&r.push(t[a].value);return r},has:function(e){N(arguments.length,1);var t=R(this).entries,n=e+"",r=0;while(r<t.length)if(t[r++].key===n)return!0;return!1},set:function(e,t){N(arguments.length,1);for(var n,r=R(this),a=r.entries,i=!1,c=e+"",s=t+"",o=0;o<a.length;o++)n=a[o],n.key===c&&(i?a.splice(o--,1):(i=!0,n.value=s));i||a.push({key:c,value:s}),r.updateURL()},sort:function(){var e,t,n,r=R(this),a=r.entries,i=a.slice();for(a.length=0,n=0;n<i.length;n++){for(e=i[n],t=0;t<n;t++)if(a[t].key>e.key){a.splice(t,0,e);break}t===n&&a.push(e)}r.updateURL()},forEach:function(e){var t,n=R(this).entries,r=p(e,arguments.length>1?arguments[1]:void 0,3),a=0;while(a<n.length)t=n[a++],r(t.value,t.key,this)},keys:function(){return new $(this,"keys")},values:function(){return new $(this,"values")},entries:function(){return new $(this,"entries")}},{enumerable:!0}),c(K,U,K.entries),c(K,"toString",(function(){var e,t=R(this).entries,n=[],r=0;while(r<t.length)e=t[r++],n.push(D(e.key)+"="+D(e.value));return n.join("&")}),{enumerable:!0}),o(z,L),r({global:!0,forced:!i},{URLSearchParams:z}),i||"function"!=typeof _||"function"!=typeof k||r({global:!0,enumerable:!0,forced:!0},{fetch:function(e){var t,n,r,a=[e];return arguments.length>1&&(t=arguments[1],v(t)&&(n=t.body,d(n)===L&&(r=t.headers?new k(t.headers):new k,r.has("content-type")||r.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"),t=m(t,{body:b(0,String(n)),headers:b(0,r)}))),a.push(t)),_.apply(this,a)}}),e.exports={URLSearchParams:z,getState:R}},"9a1f":function(e,t,n){var r=n("825a"),a=n("35a1");e.exports=function(e){var t=a(e);if("function"!=typeof t)throw TypeError(String(e)+" is not iterable");return r(t.call(e))}},ab63:function(e,t,n){"use strict";n("96cf");var r=n("1da1");t["a"]={data:function(){var e=this;return{notificationSystem:{options:{show:{theme:"dark",icon:"icon-person",position:"topCenter",progressBarColor:"var(--purple-dark)"},ballon:{balloon:!0,position:"bottomCenter"},info:{position:"bottomLeft"},success:{position:"center",timeout:1500},warning:{position:"topLeft"},error:{position:"center",timeout:2e3},question:{timeout:0,close:!1,overlay:!0,toastOnce:!0,id:"question",zindex:999,position:"center",buttons:[["<button><b>DA</b></button>",function(t,n){t.hide({transitionOut:"fadeOut",onClosing:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(n,r,a){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return console.info("closedBy: "+a),t.next=3,e.delEx();case 3:case"end":return t.stop()}}),t)})));function n(e,n,r){return t.apply(this,arguments)}return n}()},n,!0)}],["<button>NE</button>",function(e,t){e.hide({transitionOut:"fadeOutUp",onClosed:function(e,t,n){console.info("closedBy: "+n)}},t,!1)}]],onClosing:function(e,t,n){console.info("Closing | closedBy: "+n)},onClosed:function(e,t,n){console.info("Closed | closedBy: "+n)}}}}}},methods:{delClient:function(){this.$toast.warning("Sigurna ?","Brisanje",this.notificationSystem.options.question)}}}}}]);
//# sourceMappingURL=camera.cf65e0c1.js.map