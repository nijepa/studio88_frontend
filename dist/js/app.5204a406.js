(function(e){function t(t){for(var r,a,c=t[0],u=t[1],i=t[2],l=0,d=[];l<c.length;l++)a=c[l],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&d.push(o[a][0]),o[a]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);p&&p(t);while(d.length)d.shift()();return s.push.apply(s,i||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],r=!0,a=1;a<n.length;a++){var c=n[a];0!==o[c]&&(r=!1)}r&&(s.splice(t--,1),e=u(u.s=n[0]))}return e}var r={},a={app:0},o={app:0},s=[];function c(e){return u.p+"./studio88_frontend/js/"+({about:"about"}[e]||e)+"."+{about:"1267ff02"}[e]+".js"}function u(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(e){var t=[],n={about:1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=new Promise((function(t,n){for(var r="./studio88_frontend/css/"+({about:"about"}[e]||e)+"."+{about:"b968df2f"}[e]+".css",o=u.p+r,s=document.getElementsByTagName("link"),c=0;c<s.length;c++){var i=s[c],l=i.getAttribute("data-href")||i.getAttribute("href");if("stylesheet"===i.rel&&(l===r||l===o))return t()}var d=document.getElementsByTagName("style");for(c=0;c<d.length;c++){i=d[c],l=i.getAttribute("data-href");if(l===r||l===o)return t()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=t,p.onerror=function(t){var r=t&&t.target&&t.target.src||o,s=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");s.code="CSS_CHUNK_LOAD_FAILED",s.request=r,delete a[e],p.parentNode.removeChild(p),n(s)},p.href=o;var f=document.getElementsByTagName("head")[0];f.appendChild(p)})).then((function(){a[e]=0})));var r=o[e];if(0!==r)if(r)t.push(r[2]);else{var s=new Promise((function(t,n){r=o[e]=[t,n]}));t.push(r[2]=s);var i,l=document.createElement("script");l.charset="utf-8",l.timeout=120,u.nc&&l.setAttribute("nonce",u.nc),l.src=c(e);var d=new Error;i=function(t){l.onerror=l.onload=null,clearTimeout(p);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",d.name="ChunkLoadError",d.type=r,d.request=a,n[1](d)}o[e]=void 0}};var p=setTimeout((function(){i({type:"timeout",target:l})}),12e4);l.onerror=l.onload=i,document.head.appendChild(l)}return Promise.all(t)},u.m=e,u.c=r,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)u.d(n,r,function(t){return e[t]}.bind(null,r));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="/",u.oe=function(e){throw console.error(e),e};var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=t,i=i.slice();for(var d=0;d<i.length;d++)t(i[d]);var p=l;s.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"2b32":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},o=[],s=(n("5c0b"),n("2877")),c={},u=Object(s["a"])(c,a,o,!1,null,null,null),i=u.exports,l=(n("d3b7"),n("8c4f")),d=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home"},[n("HelloWorld",{attrs:{msg:"Studio 88"}})],1)},p=[],f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"hello"},[n("div",{staticClass:"club__title"},[n("h1",{staticClass:"club"},[e._v(e._s(e.msg)+" ")]),n("p",{staticClass:"club__type"},[e._v("p i l a t e s")]),n("div",{staticClass:"club__login"},[n("transition",{attrs:{name:"slide-fade",mode:"out-in"}},[e.loginForm?n("log-in"):n("p",{staticClass:"club__link",attrs:{href:"#",target:"_blank",rel:"noopener"},on:{click:e.toggleLoginForm}},[e._v(" Log In ")])],1)],1)])])},m=[],h=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"login__wrapper"},[n("label",{attrs:{for:"username"}},[e._v("User name")]),n("input",{staticClass:"login_input",attrs:{type:"text",name:"username"}}),n("label",{attrs:{for:"pass"}},[e._v("Password")]),n("input",{staticClass:"login_input",attrs:{type:"password",name:"pass"}}),n("button",{staticClass:"login_btn",attrs:{type:"submit"},on:{click:e.logIn}},[e._v("Log In")])])},g=[],v={name:"LogIn",methods:{logIn:function(){T.push("/dashboard")}}},b=v,w=(n("70c3"),Object(s["a"])(b,h,g,!1,null,null,null)),y=w.exports,_={name:"HelloWorld",props:{msg:String},components:{LogIn:y},data:function(){return{loginForm:!1}},methods:{toggleLoginForm:function(){this.loginForm=!0}}},O=_,x=(n("9d42"),Object(s["a"])(O,f,m,!1,null,"13dafc5a",null)),j=x.exports,k={name:"Home",components:{HelloWorld:j}},R=k,S=Object(s["a"])(R,d,p,!1,null,null,null),C=S.exports;r["a"].use(l["a"]);var E=[{path:"/",name:"Home",component:C},{path:"/about",name:"About",component:function(){return n.e("about").then(n.bind(null,"f820"))}},{path:"/dashboard",name:"Dashboard",component:function(){return n.e("about").then(n.bind(null,"7277"))}}],U=new l["a"]({base:"/",routes:E}),T=U,P=n("2f62"),L=(n("99af"),n("4de4"),n("d81d"),n("96cf"),n("1da1")),A=n("5530"),I=n("2909"),N=n("bc3a"),F=n.n(N),M="https://studio88.herokuapp.com/",D={client:{},clients:[],formType:""},H={getAllClients:function(e){return e.clients},getOneClient:function(e){return e.client},getFormType:function(e){return e.formType}},J={setClients:function(e,t){return e.clients=t},setClient:function(e,t){return e.client=t},clearClient:function(e){e.client={}},setFormType:function(e,t){return e.formType=t},addClient:function(e,t){e.clients=[t].concat(Object(I["a"])(e.clients))},updateClient:function(e,t){e.clients=Object(I["a"])(e.clients.map((function(e){return e._id!==t._id?e:Object(A["a"])(Object(A["a"])({},e),t)})))},deleteClient:function(e,t){e.clients=Object(I["a"])(e.clients.filter((function(e){return e._id!==t})))}},K={fetchClients:function(e){return Object(L["a"])(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e.commit,t.next=3,F.a.get(M+"clients");case 3:r=t.sent,n("setClients",r.data);case 5:case"end":return t.stop()}}),t)})))()},fetchClient:function(e,t){return Object(L["a"])(regeneratorRuntime.mark((function n(){var r,a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=e.commit,n.next=3,F.a.get(M+"clients/"+t._id,t);case 3:a=n.sent,r("setClient",a.data);case 5:case"end":return n.stop()}}),n)})))()},clientAdd:function(e,t){return Object(L["a"])(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=e.commit,n.next=3,F.a.post(M+"clients",t).then((function(e){r("addClient",e.data.client)})).catch((function(e){e.response?r("setErrors",e.response.data.error):r("setErrors",e)}));case 3:case"end":return n.stop()}}),n)})))()},clientUpdate:function(e,t){return Object(L["a"])(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=e.commit,n.next=3,F.a.put(M+"clients/"+t._id,t).then((function(e){r("updateClient",e.data)})).catch((function(e){e.response?r("setErrors",e.response.data.error):r("setErrors",e)}));case 3:case"end":return n.stop()}}),n)})))()},clientDelete:function(e,t){return Object(L["a"])(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=e.commit,n.next=3,F.a.delete(M+"clients/"+t._id,t).then((function(e){r("deleteClient",e.data._id)})).catch((function(e){e.response?r("setErrors",e.response.data.error):r("setErrors",e)}));case 3:case"end":return n.stop()}}),n)})))()},clientClear:function(e){return Object(L["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:n=e.commit,n("clearClient");case 2:case"end":return t.stop()}}),t)})))()},formTypeChange:function(e,t){return Object(L["a"])(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:r=e.commit,r("setFormType",t);case 2:case"end":return n.stop()}}),n)})))()}},$={state:D,getters:H,actions:K,mutations:J},B="https://studio88.herokuapp.com/",q={schedule:{},schedules:[],notClients:[]},W={getAllSchedules:function(e){return e.schedules},getOneSchedule:function(e){return e.schedule},getNotClients:function(e){return e.notClients}},z={setSchedules:function(e,t){return e.schedules=t},setSchedule:function(e,t){return e.schedule=t},setNotClients:function(e,t){return e.notClients=t},clearSchedule:function(e){e.schedule={}},addSchedule:function(e,t){e.schedules=[t].concat(Object(I["a"])(e.schedules))},updateSchedule:function(e,t){e.schedules=Object(I["a"])(e.schedules.map((function(e){return e._id!==t._id?e:Object(A["a"])(Object(A["a"])({},e),t)})))},deleteSchedule:function(e,t){e.schedules=Object(I["a"])(e.schedules.filter((function(e){return e._id!==t})))}},G={fetchSchedules:function(e){return Object(L["a"])(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e.commit,t.next=3,F.a.get(B+"schedules");case 3:r=t.sent,n("setSchedules",r.data);case 5:case"end":return t.stop()}}),t)})))()},fetchSchedule:function(e,t){return Object(L["a"])(regeneratorRuntime.mark((function n(){var r,a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=e.commit,n.next=3,F.a.get(B+"schedules/"+t._id,t);case 3:a=n.sent,r("setSchedule",a.data);case 5:case"end":return n.stop()}}),n)})))()},fetchNotClients:function(e,t){return Object(L["a"])(regeneratorRuntime.mark((function n(){var r,a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=e.commit,n.next=3,F.a.get(B+"schedules/clientsnot/"+t._id,t);case 3:a=n.sent,r("setNotClients",a.data);case 5:case"end":return n.stop()}}),n)})))()},scheduleAdd:function(e,t){return Object(L["a"])(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=e.commit,n.next=3,F.a.post(B+"schedules",t).then((function(e){r("addSchedule",e.data.schedule)})).catch((function(e){e.response?r("setErrors",e.response.data.error):r("setErrors",e)}));case 3:case"end":return n.stop()}}),n)})))()},scheduleUpdate:function(e,t){return Object(L["a"])(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=e.commit,n.next=3,F.a.put(B+"schedules/"+t._id,t).then((function(e){r("updateSchedule",e.data)})).catch((function(e){e.response?r("setErrors",e.response.data.error):r("setErrors",e)}));case 3:case"end":return n.stop()}}),n)})))()},scheduleDelete:function(e,t){return Object(L["a"])(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=e.commit,n.next=3,F.a.delete(B+"schedules/"+t._id,t).then((function(e){r("deleteSchedule",e.data._id)})).catch((function(e){e.response?r("setErrors",e.response.data.error):r("setErrors",e)}));case 3:case"end":return n.stop()}}),n)})))()},scheduleClear:function(e){return Object(L["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:n=e.commit,n("clearSchedule");case 2:case"end":return t.stop()}}),t)})))()}},Q={state:q,getters:W,actions:G,mutations:z},V="https://studio88.herokuapp.com/",X={payment:{},payments:[]},Y={getAllPayments:function(e){return e.payments},getOnePayment:function(e){return e.payment}},Z={setPayments:function(e,t){return e.payments=t},setPayment:function(e,t){return e.payment=t},clearPayment:function(e){e.payment={}},addPayment:function(e,t){e.payments=[t].concat(Object(I["a"])(e.payments))},updatePayment:function(e,t){e.payments=Object(I["a"])(e.payments.map((function(e){return e._id!==t._id?e:Object(A["a"])(Object(A["a"])({},e),t)})))},deletePayment:function(e,t){e.payments=Object(I["a"])(e.payments.filter((function(e){return e._id!==t})))}},ee={fetchPayments:function(e){return Object(L["a"])(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e.commit,t.next=3,F.a.get(V+"payments");case 3:r=t.sent,n("setPayments",r.data);case 5:case"end":return t.stop()}}),t)})))()},fetchPayment:function(e,t){return Object(L["a"])(regeneratorRuntime.mark((function n(){var r,a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=e.commit,n.next=3,F.a.get(V+"payments/"+t._id,t);case 3:a=n.sent,r("setPayment",a.data);case 5:case"end":return n.stop()}}),n)})))()},paymentAdd:function(e,t){return Object(L["a"])(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=e.commit,n.next=3,F.a.post(V+"payments",t).then((function(e){r("addPayment",e.data.payment)})).catch((function(e){e.response?r("setErrors",e.response.data.error):r("setErrors",e)}));case 3:case"end":return n.stop()}}),n)})))()},paymentUpdate:function(e,t){return Object(L["a"])(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=e.commit,n.next=3,F.a.put(V+"payments/"+t._id,t).then((function(e){r("updatePayment",e.data)})).catch((function(e){e.response?r("setErrors",e.response.data.error):r("setErrors",e)}));case 3:case"end":return n.stop()}}),n)})))()},paymentDelete:function(e,t){return Object(L["a"])(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=e.commit,n.next=3,F.a.delete(V+"payments/"+t._id,t).then((function(e){r("deletePayment",e.data._id)})).catch((function(e){e.response?r("setErrors",e.response.data.error):r("setErrors",e)}));case 3:case"end":return n.stop()}}),n)})))()},paymentClear:function(e){return Object(L["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:n=e.commit,n("clearPayment");case 2:case"end":return t.stop()}}),t)})))()}},te={state:X,getters:Y,actions:ee,mutations:Z},ne=F.a.create({withCredentials:!1,headers:{Accept:"application/json","Content-Type":"application/json"}});ne.interceptors.request.use((function(e){var t=me.getters.getAuthKey;return e.headers["Authorization"]="Bearer "+t,e}));var re=ne;function ae(e){localStorage.setItem("odinbook_user",JSON.stringify(e))}function oe(){return JSON.parse(localStorage.getItem("odinbook_user"))}function se(){localStorage.removeItem("odinbook_user")}function ce(e){var t=JSON.parse(localStorage.getItem("odinbook_user"));t.user=e,localStorage.setItem("odinbook_user",JSON.stringify(t))}var ue="https://studio88.herokuapp.com/",ie={authKey:"",user:{},users:[],selectedUser:{},logged:!1,loading:!0,inputType:"",errors:[]},le={getAuthKey:function(e){return e.authKey},allUsers:function(e){return e.users},loggedUser:function(e){return e.user},loadingState:function(e){return e.loading},isLogged:function(e){return e.logged},getInputType:function(e){return e.inputType},getErrors:function(e){return e.errors},getSelectedUser:function(e){return e.selectedUser}},de={setToken:function(e,t){return e.authKey=t},setUsers:function(e,t){return e.users=t},setUser:function(e,t){return e.user=t},setSelectedUser:function(e,t){return e.selectedUser=t},clearSelectedUser:function(e){return e.selectedUser={}},updateUser:function(e,t){e.user=t},changeLoadingState:function(e,t){e.loading=t},setSignType:function(e,t){e.inputType=t},setLogged:function(e,t){e.logged=t},setErrors:function(e,t){e.errors=t}},pe={initialState:function(e){var t=e.commit,n=oe();n&&(t("setToken",n.token),t("setUser",n.user),t("setLogged",!0),t("changeLoadingState",!1))},setLoadingState:function(e){var t=e.commit;t("changeLoadingState",!1)},signType:function(e,t){var n=e.commit;n("setSignType",t)},signup:function(e,t){return Object(L["a"])(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=e.commit,n.next=3,F.a.post(ue+"users/signup",t).then((function(e){r("setUser",e.data.user),r("setToken",e.data.token),r("setLogged",!0),T.push("/")})).catch((function(e){e.response?r("setErrors",e.response.data.error):r("setErrors",e)}));case 3:case"end":return n.stop()}}),n)})))()},login:function(e,t){return Object(L["a"])(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=e.commit,n.next=3,F.a.post(ue+"users/login",t).then((function(e){ae(e.data),r("setUser",e.data.user),r("setToken",e.data.token),r("setLogged",!0)})).catch((function(e){e.response?r("setErrors",e.response.data.error):r("setErrors",e)}));case 3:case"end":return n.stop()}}),n)})))()},logout:function(e,t){return Object(L["a"])(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=e.commit,n.next=3,re.post(ue+"users/me/logout",t).then((function(e){r("setUser",e.data.user),r("setToken",e.data.token),r("setLogged",!1),se(),T.push("/")})).catch((function(e){e.response?r("setErrors",e.response.data.error):r("setErrors",e)}));case 3:case"end":return n.stop()}}),n)})))()},fetchUsers:function(e){return Object(L["a"])(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e.commit,t.next=3,F.a.get(ue+"users");case 3:r=t.sent,n("setUsers",r.data);case 5:case"end":return t.stop()}}),t)})))()},fetchUser:function(e){return Object(L["a"])(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e.commit,t.next=3,re.get(ue+"users/me");case 3:r=t.sent,n("setUser",r.data),n("setLogged",!0),n("changeLoadingState",!1);case 7:case"end":return t.stop()}}),t)})))()},fetchSelectedUser:function(e,t){return Object(L["a"])(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:r=e.commit,r("setSelectedUser",t);case 2:case"end":return n.stop()}}),n)})))()},userUpdate:function(e,t){return Object(L["a"])(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=e.commit,n.next=3,re.put(ue+"users/"+t._id,t).then((function(e){r("updateUser",e.data),ce(t),T.push("/")})).catch((function(e){e.response?r("setErrors",e.response.data.error):r("setErrors",e)}));case 3:case"end":return n.stop()}}),n)})))()},clearErrors:function(e){var t=e.commit;t("setErrors",[])}},fe={state:ie,getters:le,actions:pe,mutations:de};r["a"].use(P["a"]);var me=new P["a"].Store({modules:{clientModule:$,scheduleModule:Q,paymentModule:te,userModule:fe}}),he=n("e399"),ge=n.n(he);n("2068");r["a"].use(ge.a),r["a"].config.productionTip=!1,new r["a"]({router:T,store:me,render:function(e){return e(i)}}).$mount("#app")},"5c0b":function(e,t,n){"use strict";var r=n("9c0c"),a=n.n(r);a.a},"70c3":function(e,t,n){"use strict";var r=n("2b32"),a=n.n(r);a.a},"9c0c":function(e,t,n){},"9d42":function(e,t,n){"use strict";var r=n("fb2d"),a=n.n(r);a.a},fb2d:function(e,t,n){}});
//# sourceMappingURL=app.5204a406.js.map