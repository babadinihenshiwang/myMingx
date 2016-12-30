/**
 * Created by admin on 2016/12/22.
 */
window.onload = function () {
    console.log('dd')

    $($('.cars')[0]).on('tap', function () {
        $('.cars').removeClass('selected')
        $(this).addClass('selected')
        $('#car').attr('src', 'image/car1.png')
        $('.introduce').html('bujiadi')
    })
    $($('.cars')[1]).on('tap', function () {
        $('.cars').removeClass('selected')
        $(this).addClass('selected')
        $('#car').attr('src', 'image/car2.png')
        $('.introduce').html('bujiadi')
    })
    $($('.cars')[2]).on('tap', function () {
        $('.cars').removeClass('selected')
        $(this).addClass('selected')
        $('#car').attr('src', 'image/car3.png')
        $('.introduce').html('bujiadi')
    })
    $('#button').on('tap', function () {
            result()
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
                            get(serverId)
                        }
                    });
                }
            });
    })
    //发送ajax替换照片
    function get(serverId) {
        $.get('', {media_id:serverId}, function (data) {
            var data = JSON.parse(data)
            $('.car').attr('src', data.src)
        })
    }

    function result() {
        $('.footer').addClass('hide')
        $('.foot').addClass('hide')
        $('.result').removeClass('hide')
        $('.bg1').removeClass('hide')
        $('.bg2').removeClass('hide')
        $('.car-name').removeClass('hide')

        setTimeout(function () {
            $('.bg2').addClass('down')
        }, 200)
        setTimeout(function () {
            $('.car-v').removeClass('hide')
            $('.shadow1').fadeIn()
            $('.bg3').removeClass('hide')
        }, 700)
        setTimeout(function () {
            $('.bg3').addClass('down')
        }, 800)
        setTimeout(function () {
            $('.car-last').removeClass('hide')
            $('.shadow2').fadeIn()
        }, 1300)
    }
}
