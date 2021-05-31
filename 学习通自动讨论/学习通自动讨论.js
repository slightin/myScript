// ==UserScript==
// @name         学习通自动讨论
// @namespace    https://github.com/slightin
// @version      2.2
// @description  自动讨论，仅在讨论界面生效
// @author       盛夏
// @match        https://mooc1-2.chaoxing.com/bbscircle/grouptopic*
// @icon         http://photo.chaoxing.com/p/112080426_80
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var times=3 //自动讨论次数，默认50条

    // code here...
    var tips = document.getElementsByClassName("title1118")[0]
    var tip=document.createElement('div')
    tips.appendChild(tip)
    tip.innerText="当前设置为自动讨论 "+times+" 条"
    tip.style="font-size:18px;color:rgb(230 15 15)"

    var count=0
    var string=window.location.href.substring(location.href.indexOf("#")+1,window.location.href.length)
    if(location.href.indexOf("#")!=-1){
        count=Number(string)
    }

    function 讨论(){
        window.alert = function() {//阻止弹窗
            return false;
        }
        window.location.href=window.location.href.replace("#"+string,"#"+(count+1)) //因网站刷新后脚本重新载入，所以用网址存储次数
        document.querySelector("#c_title").value=count+1;
        setTimeout(function(){
            document.querySelector("#addGroupTopicForm > div > div.listBtn > a.qdBtn.fr").click()
            location.reload()
        },1500)//延迟，不建议太小
    }

    document.querySelector("body > div.main1118 > div:nth-child(3)").id="temp"
    var temp = document.getElementById('temp')
    if(location.href.indexOf("#")==-1){
        var button=document.createElement('button')
        temp.appendChild(button)
        button.style="font-size:20px;width: 200px"
        button.innerText="开始讨论"
        button.onclick=function(){
            location.href=location.href+"#0"
            location.reload()
        }
    }

    else if(count<times){
        var div=document.createElement('div')
        temp.appendChild(div)
        div.style="font-size:20px"
        div.innerText="正在自动讨论，已讨论 "+string+" 条"
        讨论()
    }
    else if(count==times){
        var div2=document.createElement('div')
        temp.appendChild(div2)
        div2.style="font-size:20px"
        div2.innerText="自动讨论已经完成，本次讨论 "+times+" 条"
        var div3=document.createElement('div')
        temp.appendChild(div3)
        div3.style="font-size:10px"
        div3.innerText="可能有延迟，若讨论条数不足，建议重新从课程页进入该页面查看"
        alert("自动讨论已经完成")
    }
    else{
        var terror=document.createElement('div')
        temp.appendChild(terror)
        terror.style="font-size:20px;color:rgb(250 15 15)"
        terror.innerText="出现异常，请重新从课程页进入该页面（不是刷新）"
    }
})();
