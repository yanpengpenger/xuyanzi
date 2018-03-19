$(document).ready(function () {
    /*
        var progressbar = {
            init: function () {
                var fill = document.getElementById('fill');
                var count = 0;
                //通过间隔定时器实现百分比文字效果,通过计算CSS动画持续时间进行间隔设置
                var timer = setInterval(function (e) {
                    count++;
                    fill.innerHTML = count + '%';
                    if (count === 100) clearInterval(timer);
                }, 17);
            }
        };
         progressbar.init();
        */
    var session_num = session_num = $('.session-num-box').find('input').val();
    var totalTime = totalTime = session_num * 60;
    
    //数字的选择
    $('.middle-num-box img').click(function () {
        var pointId = $(this).attr('id');
        var num = $(this).parent().find('input').val();
        //设置数字的范围及显示
        if (pointId == 'add-img') {
            num++;
            $(this).parent().find('input').val(num);
        } else if (pointId == 'down-img') {
            num--;
            if (num <= 0) {
                alert("时间不能为零！");
                return;
            }
            $(this).parent().find('input').val(num);
        }
        //调节session 的length 
        if ($(this).parent().attr("class") == "session-num-box") {
            session_num = $('.session-num-box').find('input').val();
            totalTime = session_num * 60;
        }
    });
    //开始 或暂停
    var run_time = false;
    var audio = new Audio("/bg.mp3");
    var per = 0;
    var _break=false;
    var break_num=0;
    $('.color-box').click(function () {
        //var break_num = $('.break-num-box').find('input').val();
        //audio.play();
        if (!run_time ) {
            run_time = setInterval(function () {
                var strBreak=$('#sp').html();
                $('#time-text').html(forMatTime(totalTime));
                totalTime--;
                if(totalTime<55 && !_break){
                    _break=true;
                    break_num = $('.break-num-box').find('input').val();
                    totalTime=break_num*60;
                    $('#sp').html("Break!");
                }
                if(totalTime<0 && strBreak==="Break!"){
                    _break=false;
                    $('#sp').html("Session!");
                    totalTime=session_num*60;
                }
            }, 1000);
           
        } else {
            window.clearInterval(run_time);
            run_time = false;
        }
    });
    //格式化时间
    var forMatTime = function (time) {
       
        //time = Number(time);
        var h = Math.floor(time / 3600);
        var m = Math.floor(time % 3600 / 60);
        var s = Math.floor(time % 3600 % 60);
        return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s);
    }

});