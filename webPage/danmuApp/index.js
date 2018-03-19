$(document).ready(function () {
    //提交数据到野狗云
    var arrMsg = [];
    // 创建数据库引用。
    var config = {
        authDomain: "wd5896406882uqtvcw.wilddog.com",
        syncURL: "https://wd5896406882uqtvcw.wilddogio.com"
    };
    wilddog.initializeApp(config);
    var ref = wilddog.sync().ref();
    /*
    //野狗云写入数据
    ref.child('message').set({
        "name": "xy",
        "msg": "content"
    }, function (error) {
        if (error == null) {
            alert("set成功");
        }
    });
    */
    //点击发射按钮
    $('#btnSendmsg').click(function () {
        // 获取输入框的数据
        var text = $("#txtMsg").val();
        if (text == "" || text == " ") {
            alert("请输入你要发送的信息！！");
            return;
        }
        // 将数据写到云端 message 节点下，child 用来定位子节点
        ref.child('message').push(text + " " + nowTime());
        $("#txtMsg").val("");
    });
    //监听数据  将数据显示在窗口
    //绑定child-added 事件，当message节点下有子节点新增时，就触发回调,snapshot 包含了新增的数据
    ref.child('message').on('child_added', function (snapshot) {
        var t = snapshot.val();
        arrMsg.push(t);
        var msgDiv = $("<div></div>");
        msgDiv.text(t);
        $('.dm_show').append(msgDiv);
        moveObj(msgDiv);
    });
    //点击清除
    $('#btnResetMsg').click(function () {
        $('.dm_show').empty();
        arrMsg = [];
    });
    ref.on('child_removed', function () {
        $('.dm_show').empty();
        arrMsg = [];
    });
    //按照时间规则显示弹幕内容。	
    var topMin = $('.dm_mask').offset().top;
    var topMax = topMin + $('.dm_mask').height();
    var _top = topMin;

    var moveObj = function (txt) {
        var _left = $('.dm_mask').width() - txt.width();
        _top = _top + 50;
        if (_top > (topMax - 50)) {
            _top = topMin;
        }
        txt.css({
            left: _left,
            top: _top,
            color: getRandomColor()
        });
        var time = 20000 + 10000 * Math.random();//是每一条字母滚动的事件不一样
        txt.animate({
            left: "-" + _left + "px"
        }, time, function () {
            txt.remove();
        });
    }
    //生成不同的颜色
    var getRandomColor = function () {
        var colorArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
        var color = "";
        for (var i = 0; i < 6; i++) {
            color += colorArr[Math.floor(Math.random() * 16)];
        }
        return "#" + color;
        /*
        return '#' + (function(h) {
            alert(h+"this is h");
          return new Array(7 - h.length).join("0") + h
        })((Math.random() * 0x1000000 << 0).toString(16))
        */
    }
    var getAndRun = function () {
        var x = 0;
        setTimeout(function () {
            if (x < arrMsg.length) {
                var textObj = $("<div>" + arrMsg[x] + "</div>");
                $(".dm_show").append(textObj);
                moveObj(textObj);
            }
            x++;
        }, 30000);
    };
    //jQuery.fx.interval = 1500;
    getAndRun();

    var nowTime = function () {
        //获取当前的时间
        function formatTime(s) {
            return s < 10 ? '0' + s : s;
        }
        var myDate = new Date();
        var y = myDate.getFullYear();
        var m = myDate.getMonth();
        var d = myDate.getDay();
        var h = myDate.getHours();
        var minutes = myDate.getMinutes();
        var s = myDate.getSeconds();
        return now = y + '/' + formatTime(m) + "/" + formatTime(d) + " " + formatTime(h) + ":" + formatTime(minutes) + ":" + formatTime(s);
    }
});