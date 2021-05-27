// ==UserScript==
// @name         教学评估
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  自动教学评估,自动点击“非常符合”或“符合”
// @author       盛夏
// @match        *://27.188.65.169:*/student/teachingEvaluation/*
// @match        *://202.206.161.*:46110/student/teachingEvaluation/*
// @icon         http://27.188.65.169:9111/img/icon/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    //主观评价
    var eva="老师重视教学，严慈相济，关爱学生，讲授详略得当，重点突出，难点讲透"

    // code here...
    var tpath = "#page-content-template > div > div > div.widget-content > form > div > table > tbody > ";
    var min=6E4;

    function index(){
        var times =document.querySelector("#jxpgtbody").getElementsByTagName("tr").length;
        for(var i=1;i<=times;i++)
        {
            if(/评估/.test(document.querySelector("#jxpgtbody > tr:nth-child("+i+") > td:nth-child(1) > button").innerText))
            {
                document.querySelector("#jxpgtbody > tr:nth-child("+i+") > td:nth-child(1) > button").click();
            }
        }
    }

    if(/evaluation\/index/.test(window.location.href))
    {
        setTimeout(index,1000);
    }

    if(/evaluationPage/.test(window.location.href))
    {
        for(var i=3;i<22;i+=2)
        {
            for(var j=1;j<6;j++)
            {
                if(/(?<!不)符合/.test(document.querySelector(tpath+"tr:nth-child("+i+") > td > div:nth-child("+j+") > label > span:nth-child(3)").innerText))
                {
                    document.querySelector(tpath+"tr:nth-child("+i+") > td > div:nth-child("+j+") > label > span:nth-child(3)").click();
                }
            }
        }

        document.querySelector("#page-content-template > div > div > div.widget-content > form > div > table > tbody > tr:nth-child(23) > td > div > textarea").value=eva;

        function tijiao(){
            setInterval(function(){document.querySelector("#buttonSubmit").click();},1000);
        }

        setTimeout(tijiao,2*min);
    }
})();
