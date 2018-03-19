/*javascript 实现
        function aboutBtnClick() {
            document.getElementById("aboutBtn").style.backgroundColor = "red";
        }
        */
$(function(){})
//使用jQuery进行绑定
$(document).ready(function () {
    //==============================顶部按钮
    //鼠标移到控件上
    $('.topBtnDiv button').mousemove(function () {
        $(this).css({ "background-color": "pink" });
    });
    //鼠标点击控件
    $('.topBtnDiv button').click(function (event) {
        $(this).css("background-color", "pink");
        //移动到页面的相关位置
        var divNames = (event.target).className;
        if (divNames == 'aboutBtn') {
            divNames = 'divMiddle';
        } else if (divNames == 'portfoLlioBtn') {
            divNames = 'divPortfoLlioTable';
        } else {
            divNames = 'divContact';
        }
        $('html body').animate({
            scrollTop: $('.' + divNames).offset().top - 80
        }, 100);
    });
    //鼠标离开控件
    $('.topBtnDiv button').mouseleave(function () {
        $(this).css("background-color", "transparent");
    });


    //===========================================底部图标
    /*
    */
    //鼠标移上去的状态
    $('.divCircleLogo img').mousemove(function () {
        $(this).attr("src", "img/" + this.id + "-pink.png");
        $(this).parents('.divCircleLogo').css("background-color", "white");
    });
    //鼠标移开
    $('.divCircleLogo img').mouseleave(function () {
        $(this).attr("src", "img/" + this.id + ".png");
        $(this).parents('.divCircleLogo').css("background-color", "transparent");
    });
    //给图标添加超链接
    $('.divCircleLogo img').click(function (event) {
        $(this).attr("src", "img/" + this.id + ".png");
        $(this).parents('.divCircleLogo').css("background-color", "transparent");

        var idName = event.target.id;
        if (idName == "qq") {
            window.open("http://w.qq.com/");
        } else if (idName == "wechat") {
            window.open("http://wx.qq.com/");
        } else {
            window.open("http://github.com/yanpengpenger");
        }
        //var str = "<a href='" + idName + "'></a>";
        //$(this).wrap(str);
    });
    //文本框内容改变后
    $(".txtStyle").bind('input propertychange', function() {
        
    });
});

