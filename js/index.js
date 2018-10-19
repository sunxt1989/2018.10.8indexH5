/**
 * Created by who on 2018/10/8.
 */

const $message = $('.message')//提示模态框
const $messageContent = $('.message-content')//提示模态框文字内容
const $messageClose = $('.message-close')//提示模态框关闭按钮

//模态框显示方法
function changeMessage(msg){
    $messageContent.text(msg);
    $message.fadeIn('200',function(){
        setTimeout(close,3000)
    });
    function close(){
        $message.fadeOut('1000')
    }
}
//关闭模态框方法
function closeMessage(){
    $message.hide()
}
//数字添加,去除千分号方法
function number(value){
    value = String(value);
    if(!value || value == '' || value == null || value == 'undefined') return '0.00';

    if(value.includes(',')){
        value = value.split(',').join('')
    }

    var intPart = value < 0 ? Math.floor(value) + 1 : Math.floor(value); //获取整数部分 向下取整
    var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); //将整数部分逢三一断
    var floatPart = ".00"; //预定义小数部分

    if(value.includes('.')){
        var value2Array = value.split(".");
        console.log(value2Array);
        if(value2Array[1].length == 0){
            return intPartFormat + floatPart;
        }else if(value2Array[1].length == 1){
            floatPart = value2Array[1] + '0'
        }else if(value2Array[1].length == 2){
            floatPart = value2Array[1].toString(); //拿到小数部分
        }else{
            floatPart = value2Array[1].substr(0,2);
        }
        return intPartFormat + "." + floatPart;

    }else{
        return intPartFormat + floatPart;
    }

}
function unNumber(value){
    value = String(value);
    if(value.includes(',')){
        value = value.split(',').join('')
    }
    return Number(value)
}