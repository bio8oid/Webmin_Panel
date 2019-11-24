"use strict";var _this=void 0,_slider=require("/slider"),_slider2=_interopRequireDefault(_slider),_pagination=require("./pagination"),_pagination2=_interopRequireDefault(_pagination),_chart=require("/chart"),_chart2=_interopRequireDefault(_chart),_addLink=require("/addLink"),_addLink2=_interopRequireDefault(_addLink);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}window.onload=function(){(-1<window.location.href.indexOf("index")||-1<window.location.href.indexOf("details")||-1<window.location.href.indexOf("payout"))&&document.getElementById("general-calendar-reset").addEventListener("click",function(){document.getElementById("general-calendar-form").reset()});document.getElementById("menu-burger").addEventListener("click",function(e){e.preventDefault(),function(e){document.getElementById("sidebar-section").classList.toggle("show",e)}()});document.getElementById("sidebar-burger").addEventListener("click",function(e){e.preventDefault(),function(e){document.getElementById("sidebar-section").classList.toggle("sidebar-small",e),document.body.classList.toggle("widen")}()});function t(){document.getElementById("overlay").classList.remove("show")}document.querySelectorAll("#overlay .js--close-modal").forEach(function(e){e.addEventListener("click",function(e){e.preventDefault(),t()})}),document.querySelector("#overlay").addEventListener("click",function(e){e.target===_this&&t()}),document.addEventListener("keyup",function(e){27===e.keyCode&&t()});function n(e){document.querySelectorAll("#overlay > *").forEach(function(e){e.classList.remove("show")}),document.querySelector("#overlay").classList.add("show"),document.querySelector(e).classList.add("show")}document.getElementById("exit").addEventListener("click",function(e){e.preventDefault(),n("#myModal")}),document.getElementById("login").addEventListener("click",function(e){e.preventDefault(),n("#loginModal")}),document.getElementById("exit-sidebar").addEventListener("click",function(e){e.preventDefault(),n("#myModal")}),document.getElementById("login-sidebar").addEventListener("click",function(e){e.preventDefault(),n("#loginModal")}),document.getElementById("contact-manager").addEventListener("click",function(e){e.preventDefault(),n("#manager")}),document.querySelectorAll(".add-link-button").forEach(function(e){e.addEventListener("click",function(e){e.preventDefault(),n("#add-link")})})},Object.defineProperty(exports,"__esModule",{value:!0});var ctx=document.getElementById("myChart"),chart=new Chart(ctx,{type:"bar",data:{labels:["01","02","03","04","05","06","07","08","09","10"],datasets:[{label:"Fuckups",backgroundColor:"#8DBEC8",borderColor:"#8DBEC8",data:[52,51,41,94,26,6,72,9,21,88]},{label:"FTD",backgroundColor:"#F29E4E",borderColor:"#F29E4E",data:[6,72,1,0,47,11,50,44,63,76]},{label:"Earned",backgroundColor:"#71B374",borderColor:"#71B374",data:[59,49,68,90,67,41,15,38,48,48],hidden:!1}]}});exports.default=chart,Object.defineProperty(exports,"__esModule",{value:!0});var monkeyList=new List("paginated-list",{page:9,pagination:!0});exports.default=monkeyList,Object.defineProperty(exports,"__esModule",{value:!0}),$(".js-range-slider").ionRangeSlider({skin:"modern",min:0,max:168,from:104,postfix:" hours"}),exports.default=ionRangeSlider;