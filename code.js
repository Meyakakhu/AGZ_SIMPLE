// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        ms.dnmchs.ru/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=dnmchs.ru
// @grant        none
// ==/UserScript==

(function() {
    setTimeout(function(){
    var settings_menu = document.getElementsByClassName("right--Z4dKWq")[0];
    var simple_settings = document.createElement("div");
    simple_settings.id = "simple_settings_f23f23f";
    simple_settings.innerText = "Проверка";
    simple_settings.classList.add("simple_settings_button");
    settings_menu.appendChild(simple_settings);
    alert("Вы используете модификацию ekKul");
    },1000);

    // Your code here...
})();
