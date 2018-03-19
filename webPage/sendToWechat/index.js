$(document).ready(function () {
    var content = "自以为是永远都是大敌，因为本可看到的东西也会视而不见。";
    var author = "嫌疑人x的献身";
    //点击换一换按钮
    $("#new-quote").click(function () {
        getQuote();
        $('.quote-box').fadeIn("slow");

        $("#text").html(content);
        $("#author").html(author);
        setBackgroundColor();
    });
    //点击微信分享
    $('#img_wechat').click(function(){
        alert("正在规划中....");
    });
    //点击QQ分享
    $('#img_qq').click(function(){
        alert("正在规划中....");
    });

    /*获取句子 */
    var getQuote = function () {
        /*从一问获取*/
        $.getJSON("https://sslapi.hitokoto.cn/?encode=json", function (json) {
            content = json["hitokoto"];
            author = json["from"];
            //alert(content+"--"+author);
        });


    }
    /*获取随机颜色 */
    var getColor = function () {
        var colorArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
        var color = "";
        for (var i = 0; i < 6; i++) {
            color += colorArr[Math.floor(Math.random() * 16)];
        }
        return "#" + color;
    }

    /*切换页面所有元素背景色 */
    var setBackgroundColor = function () {
        //alert("@color" + getColor());
        /*
        $('html body').animate({
            "background-color":"#ffc542",
            "color":"#ffc542"
        },1000);
        $('#text').animate({"color":getColor()},1000);
        */
        var co = getColor();
        $('body').css({ "background-color": co });
        $('#text').css({ "color": co });
        $('.quote-author').css("color", co);
        $('.buttons img').css("background-color",co);
        $('.buttons button').css("background-color", co);
    }
});