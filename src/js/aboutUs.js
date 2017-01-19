/**
 * Created by admin on 2017/1/17.
 */
$(function () {
    //改变head背景透明度
    function setBgColor() {
        var bgColor = 0
        if ($(window).scrollTop() >= 300 && $(window).scrollTop() <= 500) {
            bgColor = ($(window).scrollTop() - 300) / 200
        } else if ($(window).scrollTop() > 500) {
            bgColor = 1
        } else {
            bgColor = 0
        }
        $('.header').css('background', 'rgba(255,255,255,' + bgColor + ')')
    }

//改变head位置
    function setheadPosition() {
        if ($(window).scrollTop() > 300) {
            $('.header').css('position', 'fixed')
        } else {
            $('.header').css('position', 'absolute')
        }
    }
    $(window).scroll(function () {
        setBgColor()
        setheadPosition()
    })
})