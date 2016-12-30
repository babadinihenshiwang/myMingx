/**
 * Created by admin on 2016/12/13.
 */
//文字部分
var comment = {
    female:['您的美貌无与伦比，堪比天仙，可以上了天！','眉清目秀倾国倾城，你这逆天容貌必须让你的朋友知道！','您的美貌无与伦比，堪比天仙，可以上了天！'],
    male:['气宇不凡，貌若潘安，你可以去当明星了！','别笑！就是你，眉清目秀，唇红齿白的，这是要犯桃花的节奏呀，赶快分享让大家知道。','气宇不凡，貌若潘安，你可以去当明星了！']
}
//点击照相机召唤下方拍照和图片
$('#camera').on('tap', function (e) {
    e = e || event
    $('.bounced').addClass('translate')
    e.stopPropagation()
})
//点击网页让下方消失
$('body').on('tap', function () {
    $('.bounced').removeClass('translate')
})
$('.bounced').on('tap', function (e) {
    e = e || event
    e.stopPropagation()
})
//微信拍照和调用图库
var date = new Date();
var time = date.getTime();
wx.config({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: '', // 必填，公众号的唯一标识
    timestamp: time, // 必填，生成签名的时间戳
    nonceStr: '', // 必填，生成签名的随机串
    signature: '',// 必填，签名，见附录1
    jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
});
wx.error(function(res){

    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。

});
wx.checkJsApi({
    jsApiList: ['chooseImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
    success: function(res) {
        // 以键值对的形式返回，可用的api值true，不可用为false
        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
    }
});

$('.phot').on('tap', function () {
    $('.bounced').removeClass('translate')
    $('#loading').removeClass('hide')
    wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: [ 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
            var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            wx.uploadImage({
                localId: localIds, // 需要上传的图片的本地ID，由chooseImage接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: function (res) {
                    var serverId = res.serverId; // 返回图片的服务器端ID
                    change(serverId)
                }
            });
        }
    });
})
$('.came').on('tap', function () {
    // var numb = Math.round(Math.random()*2)
    // $('.result').html(function () {
    //     return comment.female[numb]//判断明星性别
    // })
    //
    // $('.share, .result').removeClass('hide')
    // $('.introduce').addClass('hide')
    $('.bounced').removeClass('translate')
    wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
            var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            wx.uploadImage({
                localId: localIds, // 需要上传的图片的本地ID，由chooseImage接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: function (res) {
                    var serverId = res.serverId; // 返回图片的服务器端ID
                    change(serverId)
                }
            });
        }
    });
} )

//更改页面
function change(serverId) {
    $.get('', {media_id: serverId}, function (data) {
        var numb = Math.round(Math.random()*2)
        $('.bounced').removeClass('translate')
        $('.title').html('哇!你好美！')//成功识别
        // $('.title').html('不服换个<br>姿势重来！')//识别失败
        $('.star img').attr('src', data.src)//明星的图片
        $('.myphoto img').attr('src', data.src)//上传的图片
        $('.result .name').html('名字')
        $('.result .similar span').html('百分比')

        $('.result .information').html('明星的别名+性别+年龄+职业')
        if('是男的'){
            $('.result .evaluate').html(comment.male[numb])
        }else{
            $('.result .evaluate').html(comment.female[numb])
        }
        $('.share, .result').removeClass('hide')
        $('.introduce').addClass('hide')
        $('#loading').addClass('hide')
    })
}
//分享
$('.share').on('tap', function () {
    $('#load').removeClass('hide')
})
$('#load').tap(function () {
    $('#load').addClass('hide')
})
//loading动画出现消失
