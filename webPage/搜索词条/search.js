$(document).ready(function() {

    // 点击清除图标
    $('#icon-delete').click(function() {
        $('#search-box').val("");
        $('.change').fadeOut(100);

        $('#searchResult').fadeOut(100);

        $('.search-icon-box').fadeIn(1000);
        $('.change-content-big-box').css("margin", "-150px auto auto -500px");
    });
    // 搜索图标点击
    $('#search-icon').click(function() {
        $('.search-icon-box').fadeOut(100);
        $('.change').fadeIn(1000);
        $('#search-box').val("");
    });
    //enter键
    $('#search-box').keydown(function(e) {
        if (e.keyCode == 13) {
            var str = $('#search-box').val();
            if (str == "" || $.trim(str).length == 0) {
                alert("请输入您要搜索的关键词！");
                $('#search-box').val("");
                return;
            }
            $('.change-content-big-box').css("margin", "-300px auto auto -500px");
            getWikiData(str);
            // $(".result").show();
            $("#searchResult").fadeIn(1000);
            // 失去焦点
            $("#search-box").blur();
        }
    });
    // 文本框获取焦点
    $('#search-box').focus(function() {
        $('#search-box').val("");
        $('#searchResult').fadeOut(100);
        $('.change-content-big-box').css("margin", "-150px auto auto -500px");
    });

    //获取维基百科的数据
    function getWikiData(strSearch) {
        var list = "";
        var url = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&origin=*&gsrsearch=' + strSearch;
        // search函数，通过AJAX/wikiAPI得到响应信息
        search(url);

        function search(url) {
            $.ajax({
                url: url,
                success: function(response) {
                    // 获取响应信息中的pageid
                    var x = Object.keys(response.query.pages);
                    // 得到每个pageid的信息，包括搜索标题，摘要，链接，图片等
                    $(x).each(function(index, el) {

                        var page = response.query.pages[el];
                        var title = page.title;
                        var extract = page.extract;
                        var $href = "http://en.wikipedia.org/wiki/" + encodeURIComponent(title);
                        var $titleLi = "<li id='title'>" + title + "</li>"
                        var $contentLi = "<li id='content'>" + extract + "</li>"
                        var $titleLi = "<a href='" + $href + "' target='_bank'><li id='title'>" + title + "</li></a>"
                        var $contentLi = "<a href='" + $href + "'  target='_bank'><li id='content'>" + extract + "</li></a>"
                        var $resulUl = $("#searchResult");
                        $resulUl.append($titleLi + $contentLi);
                    });
                }
            });
        }
    }
});

// DOM 操作常用方法：
// 1. 查找元素节点 
// var $li = $("ul li:eq(1)");
// $li = $("#myUl li:eq(1)");
// alert($li.html());
// 2. 查找元素的属性  prop  attr
// $(".change-content-big-box").css("background-color", "red");
// 3. 添加元素节点
// var $myUl = $("#myUl");
// //======================================
// var $appendLi = $("<li>append C</li>");
// $myUl.append($appendLi);
// $appendLi.appendTo($myUl);
// //======================================
// var $prepend = $("<li>prepend D</li>");
// $myUl.prepend($prepend);
// $prepend.prependTo($myUl);
// //======================================
// var $after = $("<li>after ul</li>");
// $myUl.after($after);
// $after.insertAfter($myUl);
// //======================================
// var $before = $("<li>before ul</li>");
// $myUl.before($before);
// $before.insertBefore($myUl);
// // 4. 删除节点
// $("ul li:eq(0)").remove(); //删除第一个节点
// // 5. 清空
// $("ul li").remove();
// $("ul li").empty();