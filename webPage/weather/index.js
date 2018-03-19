var cityInput = "古蔺";
$(document).ready(function () {
    var province = "";
    var city = "";
    var area = "";
    var chuanyi = "";
    //得到天气情况
    getWeather();

    //查询按钮单击事件
    $('#seWeather').click(function () {
        
        //$('.select-box option:first').prop("selected", "true");
        //var options = $('.select-box option:selected');
        cityInput = $('#inputTxt').val();
        if(cityInput==""||cityInput==" "){
            alert("请输入您要查询的城市！！");
            return;
        }
        getWeather();
    });
    //鼠标悬停事件
    $('.details span').mouseover(function (e) {
        //获取鼠标位置函数  
        var mousePos = mousePosition(e);
        var xOffset = 20;
        var yOffset = 25;
        $("#index-box").css({ "display": "block", "position": "absolute", "top": (mousePos.y - yOffset) + "px", "left": (mousePos.x + xOffset) + "px" });
        //getIndex();
    });
    //鼠标移开
    $('#index-box').mouseout(function () {
        $("#index-box").empty();
        $("#index-box").css("display", "none");
    });
    //得到鼠标悬停的位置
    function mousePosition(ev) {
        ev = ev || window.event;
        if (ev.pageX || ev.pageY) {
            return { x: ev.pageX, y: ev.pageY };
        }
        return {
            x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
            y: ev.clientY + document.body.scrollTop - document.body.clientTop
        };
    }

});
var nowapiUrl = "http://api.k780.com/?app=weather.wtype&appkey=30839&sign=4e46ac18078e317968fd1b9d59465e42&format=json&callback=?";
var cityList = "http://api.k780.com/?app=weather.city&appkey=30839&sign=4e46ac18078e317968fd1b9d59465e42&format=json&jsoncallback=?";
var lifeIndex = "http://api.k780.com/?app=weather.lifeindex&weaid=" + cityInput + "&appkey=30839&sign=4e46ac18078e317968fd1b9d59465e42&format=json&jsoncallback=?";
var flg = "";
//浮窗需要的变量

/*
 * 天气预报 
 */
var getWeather = function () {
    flg = "weather";
    var weather = "http://api.k780.com/?app=weather.future&weaid=" + cityInput + "&appkey=30839&sign=4e46ac18078e317968fd1b9d59465e42&format=json&jsoncallback=?"
    getAjax(weather);
}
/**
 * 生活指数
 * */
var getIndex = function () {
    flg = "lifeIndex";
    getAjax(lifeIndex);
}

/*城市列表 */
var getCity = function () {
    flg = "city";
    getAjax(cityList);
    //$("#province option").each(function () {
    //var str = $(this).text();
    //alert(str+"str");
    // if ($("#province option:contains(" + str + ")").length > 1) {
    //     $("#province option:contains(" + str + "):get(0)").remove();
    // }
    //});
}
//alert(index);
//province = item.area_1;
// $('#province').append("<option value='" + province + "'>" + province + "</option>");
// $('#city').append("<option value='" + city + "'>" + city + "</option>");
// $('#area').append("<option value='" + area + "'>" + area + "</option>");

var getAjax = function (url) {
    $.ajax({
        //类型是get方式
        type: "get",
        //发送请求的网址
        url: url,
        //是否异步请求 false->同步请求 true->异步请求
        async: "true",
        //请求的数据类型
        dataType: "jsonp",
        data: " ",
        //回调函数名
        jsonpCallback: "result",
        //成功后调用的函数
        success: function (data) {
            $.each(data.result, function (index, item) {
                if (flg == "weather") {//天气预报
                    index++;
                    //显示气温和天气
                    $("#describe" + index).html(item['weather'] + item['temperature'].replace('/', '-'));
                    //alert(item['weather_icon']+"g"); 
                    //显示图片
                    $("#img_" + index).attr("src", item['weather_icon']);
                    $("#h" + index).html(item['week']);
                }
                $('#local').html(item['citynm']);
                //获取城市列表
                if (flg == "city") {
                    //province = item.area_1;
                    city = item['citynm'];
                    //area = item.area_3;
                    //$('#province').append("<option value='" + province + "'>" + province + "</option>");
                    //实现联动
                    $('.select-box').append("<option value='" + city + "'>" + city + "</option>");
                    //$('#area').append("<option value='" + area + "'>" + area + "</option>");
                }
                if (flg == "lifeIndex") {//生活指数
                    var myData = new Date();
                    var y = myData.getFullYear();
                    var m = myData.getMonth() + 1;
                    var d = myData.getDate();
                    var today = y + "-" + m + "-" + d;
                    if (index == today) {
                        if (strIndex == item['lifeindex_uv_typenm']) {//紫外线指数
                            $('#index-box').append("<p>" + item['lifeindex_uv_typenm'] + ":" + item['lifeindex_uv_attr'] + "</p>");
                            $('#index-box').append("<p>建议：" + item['lifeindex_uv_dese'] + "</p>");
                        }
                    }
                }

            });
        },
        //失败调用的函数
        error: function (h, status, i) {
            alert("获取数据失败！请重试！");
        }
    });
}

