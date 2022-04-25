// ==UserScript==
// @name         新成绩通知 test
// @namespace    icecola
// @version      0.1.0
// @description  try to take over the world!
// @author       万事可乐
// @require      https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js
// @require      https://cdn.jsdelivr.net/npm/js-base64@3.7.2/base64.min.js
// @connect      http://27.188.65.169:9900/
// @grant GM_xmlhttpRequest
// @grant GM_notification
// @grant GM_setValue
// @grant GM_getValue
// @grant GM_openInTab
// @crontab      */10 * * * *
// ==/UserScript==
/* ==UserConfig==
user:
  id:
    title: 学号
    description: 检查无误后点击保存
    type: text
    min: 9
    max: 10
==/UserConfig== */

return new Promise((resolve, reject) => {

    var uid=GM_getValue('user.id')
    if(uid==null)
    {
        GM_notification({
            title:'错误-河工程成绩提醒',
            text:'学号未输入，请输入学号后再使用\n详情参考脚本安装界面'
        })
        reject('学号未输入')
    }
    var userurl='http://27.188.65.169:9900/pjxfjdpm/maxcj.asp?MIDD='+Base64.encode(uid);
    // class course {
    //     constructor(id,name,score){
    //         this.id=id;
    //         this.name=name;
    //         this.score=score;
    //     }
    // }

    GM_xmlhttpRequest({
        method: "get",
        url: userurl,
        overrideMimeType:"text/html;charset=gb2312",
        timeout:1000,
        onload: function(r) {
            console.log(r)
            if($("#huegrade").length==0){
                $("body").append($(`<div id=huegrade></div>`))
            }
            $("#huegrade").html(r.responseText);
            if($('#huegrade>script').length>0){
                GM_notification({
                    title:'错误-河工程成绩提醒',
                    text:'学号 '+uid+' 不存在，请检查',
                })
                reject('学号输入有误')
            }
            else if($("td > table").length==0){
                GM_notification({
                    title:'错误-河工程成绩提醒',
                    text:'课程读取出错',
                    timeout:5000,
                })
                reject('document加载有误')
            }
            document.querySelector("td > table > tbody").id="optable";
            amount=GM_getValue("amount")
            if (amount==undefined){
                GM_setValue("amount",$("#optable>tr[bgcolor='#F0F0F0']").length);
                GM_notification({
                    title:"河工程成绩提醒",
                    text:'学号 '+uid+' 初始化成功'
                })
                resolve('初始化成功')
            }
            
            else if($("#optable>tr[bgcolor='#F0F0F0']").length==amount){
                resolve('请求成功，无新增成绩');
            }
            else if($("#optable>tr[bgcolor='#F0F0F0']").length>amount){
                GM_notification({
                    title:'您有新的成绩提醒',
                    text:'您有'+($("#optable>tr[bgcolor='#F0F0F0']").length-amount)+'门新成绩，点击查看详情',
                    //timeout:5000,
                    onclick:function(){
                        GM_openInTab(userurl,{active:true, insert: true})
                    },
                    ondone:function(){
                        GM_setValue("amount",$("#optable>tr[bgcolor='#F0F0F0']").length)
                        resolve('请求成功，有新增成绩')
                    }
                })
            }
            
            //console.log(r)
        },
        ontimeout: function(){
            GM_notification({
                title: '错误-河工程成绩提醒',
                text: '请求超时',
                timeout:5000
            });
            reject('请求超时')
        },
        onerror: function () {
            GM_notification({
                title: '错误-河工程成绩提醒',
                text: '连接不到服务器',
                timeout:5000
            });
            reject('error');
        }
    });

});
