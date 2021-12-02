// ==UserScript==
// @name         河工程教学评估
// @namespace    https://github.com/slightin
// @description  自动教学评估,自动点击“非常符合”,适用于河北工程大学URP教务系统
// @author       万事可乐
// @version      2.0.6
// @match        *://27.188.65.169:*/student/teachingEvaluation/*
// @match        */student/teachingEvaluation/*
// @icon         http://27.188.65.169:9111/img/icon/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    //主观评价
    var eva="老师重视教学，严慈相济，关爱学生，讲授详略得当，重点突出，难点讲透"

    // code here...
    var tpath = "#page-content-template > div > div > div.widget-content > form > div > table > tbody > ";//记录多次用到的js路径前缀
    var flag = true;

    //评估主页模块
    function index(){
        var times = document.querySelector("#jxpgtbody").getElementsByTagName("tr").length;
        for(var i=1;i<=times;i++)
        {
            if(/评估/.test(document.querySelector("#jxpgtbody > tr:nth-child("+i+") > td:nth-child(1) > button").innerText))
            {
                flag=false
                document.querySelector("#jxpgtbody > tr:nth-child("+i+") > td:nth-child(1) > button").click();
                break;
            }
        }

        if(flag)
        {
            var div = document.createElement('div')
            var ins = document.querySelector("#page-content-template").firstElementChild
            document.querySelector("#page-content-template").insertBefore(div,ins)
            div.innerText="评估未开始或已完成"
            div.style="color: #128520;font-size: x-large;"
        }
    }

    //评估主页面执行
    if(/evaluation\/index/.test(window.location.href))
    {
        setTimeout(index,700);//延迟执行，防止网速问题导致页面加载未完全找不到DOM，不建议太小
    }

    //评估详情页执行
    if(/evaluationPage/.test(window.location.href))
    {
        for(var i=3;i<22;i+=2)
        {
            for(var j=1;j<6;j++)
            {
                if(/非常符合/.test(document.querySelector(tpath+"tr:nth-child("+i+") > td > div:nth-child("+j+") > label > span:nth-child(3)").innerText))
                {
                    document.querySelector(tpath+"tr:nth-child("+i+") > td > div:nth-child("+j+") > label > span:nth-child(3)").click();
                }
            }
        }

        document.querySelector(tpath+"tr:nth-child(23) > td > div > textarea").value=eva;//主观评价

        //用户提示模块
        var tip = document.createElement("h4")
        var ins = document.getElementById("buttonSubmit")
        var div = document.querySelector("#page-content-template > div > div > div:nth-child(3)")
        div.insertBefore(tip,ins)
        tip.innerHTML='时间结束会自动提交并进入下一评估中哦U•ェ•*U<br/>为保证脚本的正常运行，请保持浏览器处于此窗口<br/>计时检测在服务器端，暂无法跳过，若脚本有运行问题，请<u><a href="https://scriptcat.org/script-show-page/220/comment" target="_blank">点此反馈</a></u>'
        window.scrollTo(0,document.body.clientHeight)//保证滚动到页面底端

        //提交模块
        setInterval(function(){
            if(document.querySelector("#RemainM").innerText=='0' && document.querySelector("#RemainS").innerText=='0'){//时间结束时点击提交
                document.querySelector("#buttonSubmit").click()
            }
        },1000);//检测间隔
    }
})();

