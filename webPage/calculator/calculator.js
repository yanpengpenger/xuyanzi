var btn_value = "";
var sum = 0;
var clear = false;
var str = "";
$(document).ready(function () {
    $('.buttons-btn').click(function (event) {
        btn_value = $(this).attr("value");
        //判断所点击的按钮
        if (btn_value == parseInt(btn_value, 10) || btn_value == "+" || btn_value == "-" || btn_value == "*" || btn_value == "/" || btn_value == "%" || btn_value == ".") {
            if (clear == false) {
                str += btn_value;
                $('#_textbox').val(str);
            } else {
                str = btn_value;
                $('#_textbox').val(str);
                clear=false;
            }
        }
        //ac（all clear）>>清除 
        else if (btn_value == "ac") {
            str = "";
            $('#_textbox').val(str);
        }
        //ce >>删除上一步
        else if (btn_value == "ce") {
            str = str.slice(0, -1);
            $('#_textbox').val(str);
        } else if (btn_value == "=") {
            sum = eval(str);
            $('#_textbox').val(sum);
            clear = true;
        }
        //ans >>保留计算的结果 下一次在此基础上进行
        else if(btn_value=="ans"){
            str=sum;
            clear=false;
        }
    });
});