/**
 * Created by who on 2018/7/4.
 */
function addUrl(name){
    //var url = 'http://192.168.2.105:8881/web';
    var url = 'http://192.168.2.190:8080/web';
    //var url = 'http://192.168.2.191:8080/web';
    //var url = 'http://www.cloudaccounting.cn'

    //报销单-获取我的费用列表
    if(name == 'costSheet'){
        return url + '/h5/receipt/my/list.html'
    }
    //报销单-保存费用信息
    if(name == 'costSave'){
        return url + '/h5/receipt/save.html'
    }
    //报销单-获取大类别
    if(name == 'costList'){
        return url + '/h5/receipt/cost/list.html'
    }
    //报销单-获取小类别
    if(name == 'costOptionList'){
        return url + '/h5/receipt/cost/option/list.html'
    }
    //报销单-获取费用单详情
    if(name == 'itemCost'){
        return url + '/h5/receipt/item.html'
    }
    //报销单-删除费用单
    if(name == 'costDelete'){
        return url + '/h5/receipt/delete.html'
    }
}

