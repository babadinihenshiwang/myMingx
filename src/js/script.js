/**
 * Created by admin on 2017/1/12.
 */
$(function () {

    var nmb = $('.item').length-2;
    var transX = 0;
    var now = 0;
    var flag = true;
    var head=$('.header')
    var navWrap=$('.nav-wrap')
    var partWrap =$('.partner-wrap')

    //添加小圆点
    for(var i=0;i<nmb;i++){
        $('.point').append('<li></li>')
    }
    //确定小圆点位置
    function setPoint() {
        var width = $(window).width();
        $('.point').css('left',((width-100*nmb)/2)+'px')
    }

    //自动轮播
    setInterval(function () {
        if (flag) {
            move(true)
        }
    }, 4000)
//轮播效果
    function move(bl) {
        var width = $(window).width();
        if(bl){
            now++
            var left = transX-width
            if(now>=nmb){
                now = 0
            }
            navWrap.css('transition', '.5s')
            navWrap.css('-webkit-transition', '.5s')
            navWrap.css('transform', 'translateX('+(left-width)+'px)')
            navWrap.css('-webkit-transform', 'translateX('+(left-width)+'px)')

            transX = left;
            goFirst()
            movePoint()
        }else {
            now--
            if(now<=-1){
                now=nmb-1
            }
            var left = transX+width
            navWrap.css('transition', '.5s')
            navWrap.css('-webkit-transition', '.5s')
            navWrap.css('transform', 'translateX('+(left-width)+'px)')
            navWrap.css('-webkit-transform', 'translateX('+(left-width)+'px)')
            transX = left;
            goLast()
            movePoint()
        }
    }
    //回到第一张
    function goFirst() {
        var width = $(window).width();
        if(now==0){
            navWrap.css('transition', '0s')
            navWrap.css('-webkit-transition', '0s')
            setTimeout(function () {
                navWrap.css('transform', 'translateX('+(-width)+'px)')
                navWrap.css('-webkit-transform', 'translateX('+(-width)+'px)')
                transX = 0
            }, 500)
        }
    }
    //回到最后一张
     function goLast() {
        var width = $(window).width();
        if(now==(nmb-1)){
            navWrap.css('transition', '0s')
            navWrap.css('-webkit-transition', '0s')
            setTimeout(function () {
                var left = -(nmb-1)*width
                navWrap.css('transform', 'translateX('+(left-width)+'px)')
                navWrap.css('-webkit-transform', 'translateX('+(left-width)+'px)')
                transX = left
            }, 500)
        }
    }
//移动小圆点
    function movePoint() {
        $('.point li').removeClass('selected')
        $($('.point li')[now]).addClass('selected')
    }
//根据窗口大小改变轮播图大小
    function setItem() {
        navWrap.css('width', (nmb+2)*100+'%')
        $('.item').css('width', (100/(nmb+2))+"%")
        navWrap.css('transform', 'translateX('+(-100/(nmb+2))+"%")
        navWrap.css('transform', '-webkit-translateX('+(-100/(nmb+2))+"%")
    }
//改变head背景透明度
    function setBgColor() {
        var bgColor = 0
        if ($(window).scrollTop() >= 700 && $(window).scrollTop()<=1000) {
          bgColor = ($(window).scrollTop()-700)/300
            $('.point').addClass('hide')
        }else if($(window).scrollTop()>1000){
            $('.point').addClass('hide')
            bgColor=1
        }else {
            bgColor=0
            $('.point').removeClass('hide')
        }
        head.css('background', 'rgba(255,255,255,'+bgColor+')')
    }
//改变head位置
    function setheadPosition() {
        if($(window).scrollTop()>700){
            head.css('position', 'fixed')
        }else {
            head.css('position', 'absolute')
        }
    }
    function setPartner() {
        var windowNow = $(window).width()
        if(windowNow<1200){
            var scale = (windowNow/1200)*800
            partWrap.css('height', scale+'px')
        }
    }

    movePoint()
    setItem()
    setPartner()
    $(window).on('resize', function () {
        setItem()
        setPartner()
    })
    $(window).scroll(function () {
        setheadPosition()
        setBgColor()
    })
    $('.nav').mouseenter(function () {
        flag = false;
        $(this).mouseleave(function () {
            flag = true;
        })
    })

    $('.next').click(function () {
        move(true)
    })
    $('.pre').click(function () {
        move(false)
    })

})