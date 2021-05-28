// ==UserScript==
// @name         学习通自动讨论
// @namespace    https://github.com/slightin
// @version      1.1
// @description  自动讨论
// @author       盛夏
// @match        https://mooc1-2.chaoxing.com/bbscircle/*
// @icon         http://photo.chaoxing.com/p/112080426_80
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var times=50 //自动评论次数，默认50条

    // code here...
    var i=0
    if(location.href.indexOf("#")!=-1){
        i=Number(window.location.href.substring(location.href.indexOf("#")+1,window.location.href.length));
    }

    if(i<times)
    {
        window.alert = function() {//阻止弹窗
            return false;
        }

        if(location.href.indexOf("#")==-1){
            location.href=location.href+"#";
        }
        if(location.href.indexOf("#")!=-1){
            window.location.href=window.location.href.replace(window.location.href.substring(location.href.indexOf("#"),window.location.href.length),"#"+(i+1))
        }

        document.querySelector("#c_title").value=i+1;
        setTimeout(function(){
            document.querySelector("#addGroupTopicForm > div > div.listBtn > a.qdBtn.fr").click()
            location.reload()
        },1500)
    }
    else
    {
        alert("自动讨论完成")
    }
})();
