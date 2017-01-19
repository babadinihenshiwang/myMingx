/**
 * Created by admin on 2017/1/17.
 */
$(function () {
    function showTechnology() {
        $('.technology').each(function () {
            var windowScrollTop = $(window).scrollTop()
            var technologyTop = this.offsetTop
            var windowHeight = $(window).height()
            if(technologyTop<(windowScrollTop+windowHeight)){
                $(this).css('transform', 'scale(1)')
            }
        })
    }

    //改变head背景透明度
    function setBgColor() {
        var bgColor = 0
        if ($(window).scrollTop() >= 700 && $(window).scrollTop()<=1000) {
            bgColor = ($(window).scrollTop()-700)/300
        }else if($(window).scrollTop()>1000){
            bgColor=1
        }else {
            bgColor=0
        }
        $('.header').css('background', 'rgba(255,255,255,'+bgColor+')')
    }
//改变head位置
    function setheadPosition() {
        if($(window).scrollTop()>700){
            $('.header').css('position', 'fixed')
        }else {
            $('.header').css('position', 'absolute')
        }
    }

    showTechnology()
    $(window).resize(function () {
        showTechnology()
    })
    $(window).scroll(function () {
        showTechnology()
        setBgColor()
        setheadPosition()
    })


})