// ==UserScript==
// @name         学习通自动讨论
// @namespace    https://github.com/slightin
// @version      3.0
// @description  自动讨论，仅在讨论界面生效
// @author       盛夏
// @match        https://mooc1-2.chaoxing.com/bbscircle/grouptopic*
// @icon         http://photo.chaoxing.com/p/112080426_80
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var times=3 //自动讨论次数，默认50条
    var clicktime=1500 //每次页面加载后发送讨论的延迟，不建议太小，单位为毫秒

    // code here...
    var tips = document.getElementsByClassName("title1118")[0]
    var tip=document.createElement('div')
    tips.appendChild(tip)
    tip.innerText="当前设置的讨论 "+times+" 条"
    tip.style="font-size:18px;color:rgb(230 15 15)"

    document.querySelector("body > div.main1118 > div:nth-child(3)").id="temp"
    var temp = document.getElementById('temp')
    var div=document.createElement('div')
    var button=document.createElement('button')
    var fastbutton=document.createElement('button')

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
        },clicktime)//延迟，不建议太小
    }

    function 极速()
    {
         window.alert = function() {//阻止弹窗
            return false;
        }
        window.location.href=window.location.href.replace("#"+string,"#")
        for(var i=0;i<times;i++)
        {
            document.querySelector("#c_title").value=i+1;
            document.querySelector("#addGroupTopicForm > div > div.listBtn > a.qdBtn.fr").click()
        }
        location.reload()
    }

    function addback(){
        var back=document.createElement('button')
        temp.appendChild(back)
        back.style="font-size:20px;width: 100px;height:40px;margin:6px;margin-left: 100px"
        back.innerText="重置"
        back.onclick=function(){
            document.querySelector("body > div.main1118 > div.title1118 > a:nth-child(4) > span").click()
        }
    }

    function terror(){
        var error=document.createElement('div')
        temp.appendChild(error)
        error.style="font-size:25px;margin:6px;color:rgb(250 15 15);float:left"
        error.innerText="出现异常，请点击右侧重置按钮"
        addback()
    }

    if(location.href.indexOf("#")==-1){
        temp.appendChild(button)
        temp.appendChild(fastbutton)
        button.style="font-size:20px;width: 200px;height:40px"
        button.innerText="自动挂机讨论"
        button.onclick=function(){
            location.href=location.href+"#0"
            location.reload()
        }
        fastbutton.style="font-size:20px;width: 200px;height:40px;margin-left:20px"
        fastbutton.innerText="极速讨论"
        fastbutton.onclick=function(){
            location.href=location.href+"#fast"
            极速()
        }
    }

    else if(location.href.indexOf("#fast")!=-1)
    {
        temp.appendChild(div)
        div.style="font-size:20px;float:left"
        div.innerText="极速讨论已经完成，本次讨论 "+times+" 条"
        var indiv=document.createElement('div')
        div.appendChild(indiv)
        indiv.style="font-size:10px"
        indiv.innerText="可能有延迟，若讨论条数不足，建议重新从课程页进入该页面查看，或点击右侧重置按钮"
        addback()
        alert("极速讨论已经完成")
    }

    else if(count<times){
        temp.appendChild(div)
        div.style="font-size:20px"
        div.innerText="正在自动讨论，已讨论 "+string+" 条"
        讨论()
    }
    else if(count==times){
        temp.appendChild(div)
        div.style="font-size:20px;float:left"
        div.innerText="自动讨论已经完成，本次讨论 "+times+" 条"
        indiv=document.createElement('div')
        div.appendChild(indiv)
        indiv.style="font-size:10px"
        indiv.innerText="可能有延迟，若讨论条数不足，建议重新从课程页进入该页面查看，或点击右侧重置按钮"
        addback()
        alert("自动讨论已经完成")
    }
    else{
        terror()
    }
})();
