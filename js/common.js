/**
 * Created by 刘斌华 on 2015/6/18.
 */
var hasClick = false;

var _rrz_temp_ = undefined;
var rrz = {
    /**
     * 发送异步请求
     *
     * @param url 请求的路径
     * @param data 参数
     * @param success (data, msg)
     * @param failed (data, msg)
     * @param isTrue 是否允许异步请求
     */
    ajax: function (url, data,success, failed,isTrue) {
        if(!isTrue){
            if (url.indexOf('/area') < 0) {
                if (hasClick) {
                    failed('', '操作进行中，不能重复操作');
                    return;
                }
                hasClick = true;
            }
        }


        $.ajax({
            url: url,
            data: data,
            dataType: "json",
            type: "post",
            success: function (data) {
                //console.log(data);
                hasClick = false;
                if(data.status === 200) {
                    if(typeof success === "function") {
                        success(data.value, data.msg);
                    }
                } else if(data.status === 400) {
                    if(typeof failed === "function") {
                        failed(data.value, data.msg);
                    } else {
                        alert("系统繁忙，请稍后重试");
                    }
                } else if(data.status === 402) {
                    alert("请登陆后再进行相关操作");
                } else if(data.status === 403) {
                    alert("你没有该操作的权限，请联系管理员");
                } else {
                    alert("请求错误");
                }
            },
            error: function () {
                hasClick = false;
                alert("系统繁忙，请稍后重试");
            }
        })
    },
    context: {
        im: {
            obj: undefined
        }
    },
    /**
     * Cookie的存、取
     *
     * @param key
     * @param value
     */
    cookie: function (key, value) {
        if(typeof value === "undefined") {
            return $.cookie(key);
        } else {
            var options = {};
            $.cookie(key, value, options);
        }
    },
    /**
     * 获取当前登录登录状态
     * @returns {boolean} true:成功，false：失败
     */
    getUserLoginStatus : function (){
        var userId = $.cookie("CUI");//登录用户ID
        var token = $.cookie("CUT");//登录用户Token
        if($.trim(userId).length <= 0){
            return false;
        }
        if($.trim(token).length <= 0){
            return false;
        }
        return true;
    },
    /**
     * 获取当前登录用户认证状态
     * @returns {boolean} true:成功，false：失败
     */
    getUserAuthStatus : function(){
        return $.cookie("CUA");//用户认证状态
    },
    /**
     * //登录用户类型
     * @returns "1":律师，"2":个人，"3":单位
     */
    getUserType : function(){
        return $.cookie("CUTY");//登录用户类型
    },
    im: function (type, to, msg) {
//        if(typeof this.context.im.obj === "undefined") {
//            console.error("IM is undefined.")
//        } else if(type === "txt") {
//            this.context.im.obj.sendTextMessage({
//                to: to,
//                msg: msg,
//                type: "chat"
//            });
//        } else if(type === "img") {
//            this.context.im.obj.sendPictureMessage({
//                to: to,
//                msg: msg,
//                type: "chat"
//            });
//        } else if(type === "emotion") {
//            this.context.im.obj.sendTextMessage({
//                to: to,
//                msg: msg,
//                type: "chat"
//            });
//        } else if(type === "audio") {
//            this.context.im.obj.sendAudioMessage({
//                to: to,
//                msg: msg,
//                type: "chat"
//            });
//        }
    },
    //认证
    auth:function (){
//        if(!rrz.getUserLoginStatus()){
//            layer.alert("很抱歉，为保障当事人权益，请注册后再查看。祝您成功！",{icon:0,title:false,closeBtn: false});
//            return false;
//        }else{
//            if(rrz.getUserAuthStatus() == "1"){
//                layer.alert("很抱歉，为保障当事人权益，此操作仅认证成功用户可以进行。您提交的实名认证正在审核中，请等待审核通过后再来操作，祝您成功！",{icon:0,title:false,closeBtn: false},function(index){
//                    layer.close(index);
//                });
//                return false;
//            }else if(rrz.getUserAuthStatus() == "3"){
//                layer.confirm("很抱歉，为保障当事人权益，此操作仅认证成功用户可以进行。您实名认证的审核结果是：审核失败。再次认证？",{icon:3,title:false,closeBtn: false},function(index){
//                    layer.close(index);
//                    location.href = "/auth/index.html?status=3";
//                });
//                return false;
//            }else if(rrz.getUserAuthStatus() == "4"){
//                layer.confirm("很抱歉，为保障当事人权益，此操作仅认证成功用户可以进行。您还没有进行认证，立刻认证？",{icon:3,title:false,closeBtn: false},function(index){
//                    layer.close(index);
//                    location.href = "/auth/index.html?status=4";
//                });
//                return false;
//            }
//            return true;
//        }
    },
    loading: function (content, callback) {
        if(typeof callback === "function") {
            $("#rrz_loading_div").html(content).stop().fadeIn("fast", callback());
        } else {
            $("#rrz_loading_div").html(content).stop().fadeIn("fast");
        }
    },
    loadingClose: function (callback) {
        if(typeof callback === "function") {
            $("#rrz_loading_div").stop().fadeOut("fast", function () {
                $(this).html("");
                callback();
            });
        } else {
            $("#rrz_loading_div").stop().fadeOut("fast", function () {
                $(this).html("");
            });
        }
    },
    browser:function(){
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
            msie: u.toLowerCase().match(/msie [\d.]+;/gi),/*IE  */
            trident: u.indexOf('Trident') > -1, /*IE内核*/
            presto: u.indexOf('Presto') > -1, /*opera内核*/
            webKit: u.indexOf('AppleWebKit') > -1, /*苹果、谷歌内核*/
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,/*火狐内核*/
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), /*是否为移动终端*/
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), /*ios终端*/
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, /*android终端或者uc浏览器*/
            iPhone: u.indexOf('iPhone') > -1 , /*是否为iPhone或者QQHD浏览器*/
            iPad: u.indexOf('iPad') > -1, /*是否iPad*/
            webApp: u.indexOf('Safari') == -1 /*是否web应该程序，没有头部与底部*/
        };
    }
};
$(document).ready(function () {
    $("body").append("<iframe name=\"rrz_submit_iframe\" style=\"display: none;\" />");
    $("form[target=iframe]").attr({
        "target": "rrz_submit_iframe",
        "method": "post"
    }).append("<input type=\"hidden\" name=\"_target_\" value=\"iframe\" />");

    $("input[upload-file=true]").css("cursor", "pointer").focus(function () {
        $(this).blur();
    });
    $(document.body).delegate("[upload-file=true]", "click", function () {
        var obj = $(this);
        if(obj.attr("upload-callback") !== "undefined") {
            _rrz_temp_ = obj.attr("upload-callback");
        }
        $("#rrz_file_upload>input:file").one("change", function () {
            obj.val($(this).val());
            if(typeof obj.attr("upload-id") !== "undefined") {
                $($("#" + obj.attr("upload-id"))).one("click", function () {
                    rrz.loading("图片上传中，请稍候……", function () {
                        $("#rrz_file_upload").submit()
                    });
                });
            } else {
                rrz.loading("图片上传中，请稍候……", function () {
                    $("#rrz_file_upload").submit()
                });
            }
        }).trigger("click");
    })
});
function readBlobAsDataURL(blob, callback) {
    var fileReader = new FileReader();
    fileReader.onload = function(e) {callback(e.target.result);};
    fileReader.readAsDataURL(blob);
}
//-----------------------获取滚动条的宽度-------------------------------------
function getScrollbarWidth() {
	var oP = document.createElement('p'),
		styles = {
			width: '100px',
			height: '100px'
		}, i, clientWidth1, clientWidth2, scrollbarWidth;
	for (i in styles) oP.style[i] = styles[i];
	document.body.appendChild(oP);
	clientWidth1 = oP.clientWidth;
	oP.style.overflowY = 'scroll';
	clientWidth2 = oP.clientWidth;
	scrollbarWidth = clientWidth1 - clientWidth2;
	oP.remove();
	return scrollbarWidth;
}
function addComma(str) {
	str = '' + str;
	if (str == '' || str == 'undefined') {
		return '';
	}
	var pos = str.indexOf('.');
	if (pos >= 0) {
		if (str.length - 1 - pos == 0) {
			str += '00';
		} else if (str.length - 1 - pos == 1) {
			str += '0';
		} else if (str.length - 1 - pos > 2) {
			str = str.substring(0, pos + 3);
		}
	} else {
		str += '.00';
	}
	return str.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}
function removeComma(str) {
	str = '' + str;
	if (str == '') {
		return '';
	}
	return str.replace(/[,]/g, '');
}
//获取当前日期
function getCurrentDate(){
	var date = new Date();
    var seperator1 = "-";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    return currentdate;
}