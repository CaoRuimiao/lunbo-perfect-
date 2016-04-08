$(function () {
    /* 跳转楼层 */
    // 边栏高度与距右边距离控制
    var fd = $('.slider_nav');
    var html = $('html, body');
    function ControlPosition() {
        fd.css('top', $(window).height() / 2 - fd.height() / 2);
        fd.css('right', ($(window).width() - 1200 > 50 ? ($(window).width() - 1200) / 2 - 38 : 0));
    };
    ControlPosition();
    $(window).resize(function () {
        ControlPosition();
    });

    // 所有按钮（除返回顶端）
    //var floorBtn = $('.slider_nav .link:not(.back_top)');
    var floorBtn = $('.slider_nav .link');
    // 查找所有按钮 按照按钮顺序 对应 .floor的顺序 获得该floor的高度
    $('.link').click(function () {
        var refTop = $('.cate-top').eq($(this).index('.link')).offset().top;
        html.animate({
            scrollTop: refTop
        });
    });
    // 回到顶端
    $('.back_top').click(function () {
        html.animate({ scrollTop: 0 });
    });


    // 根据页面滑动位置 点亮楼层
    var temp_dir = 0;
    /* 判断页面滑动方向 */
    /* 从上向下为 true  */
    /* 从下往上为 false */
    var direct = true;
    // 存储各个楼层offset top
    var floor_arr = [];
    //LightFloor();
    $('.cate-top').each(function (i) {
        /* 分别存储每层div offset.top 与 offset.bottom，
         * 当页面向下滑动时，使用offset.bottom
         * 反之使用 offset.top
         */
        floor_arr[i] = {
            bottom: $(this).offset().top,
            top: $(this).offset().top + $(this).outerHeight() + $(this).next().outerHeight()
        }
        //console.log(floor_arr[i].top,floor_arr[i].bottom);
    });

    var f = 0;      // 存储当前楼层 全局
    var bottom_tar = $('.footer'); // 当页面滚到最下方时 滚动条锁定的参考元素
    var bottom_top = bottom_tar.offset().top;
    var isFromEdge = true;

    var _window = $(window);
    $(window).scroll(function () {
        if (_window.scrollTop() > temp_dir) direct = true;
        else direct = false;
        temp_dir = _window.scrollTop();
        // 当向页面底端滚动时 从低层向高层判断
        //console.log(floor_arr.length);
        if (direct) {
            // 向下滑动时 当没有达到最顶层 和 超过最底层时 隐藏边栏
            if ((temp_dir > (floor_arr[floor_arr.length - 1].top - 300)) || (temp_dir < floor_arr[0].bottom - 200)) {
                if (!isFromEdge) SideHidden();
                isFromEdge = true;
                return false;
            } else {
                if (isFromEdge) SideShow();
                isFromEdge = false;
                for (var i = 0; i < floor_arr.length; i++) {
                    if (temp_dir < floor_arr[i].top - 40) {
                        f = i;/*console.log(floor_arr[i].top);*/
                        break;
                    }
                }
            }
        } else {
            if (temp_dir < floor_arr[0].bottom - 100 || temp_dir > floor_arr[floor_arr.length - 1].top - 100) {
                if (!isFromEdge) SideHidden();
                isFromEdge = true;
                return false;
            } else {
                if (isFromEdge) SideShow();
                isFromEdge = false;

                for (var i = 0; i < floor_arr.length; i++) {
                    var r_i = Math.abs(i + 1 - floor_arr.length);
                    if (temp_dir > floor_arr[r_i].bottom - 200) {
                        f = r_i;
                        break;
                    }
                }
            }
        }
        /* 根据位置使楼层变红 */
        floorBtn.removeClass('active');
        floorBtn.eq(f).addClass('active');
    });

    /* 把楼层的顶端和底端offset.top值同时存入数组
     * 用作向上滚动或向下滚动之判断
     * bottom 为靠近页面顶端
     * top    为靠近页面底端
     */
    function LightFloor() {
        $('.cate-top').each(function (i) {
            floor_arr[i] = {
                bottom: $(this).offset().top,
                top: $(this).offset().top + $(this).outerHeight() + $(this).next().outerHeight()
            }
        });
    }
    // 打开右侧边栏
    function SideShow() {
        fd.stop(true, true);
        fd.fadeIn();
    }
    // 隐藏右侧边栏
    function SideHidden() {
        fd.stop(true, true);
        fd.fadeOut();
    }


    // 初始化左右滚动类
    // invoke slide bar
    new slideHor($('.img-div ul li'), $('.id-btn-div .left-arrow'), $('.id-btn-div .right-arrow'), 300);



});




// 横向滚动
var slideHor = function (horArea, leftBtn, rightBtn, speed) {
    if (!horArea.length) {
        return false;
    }
    var hr = horArea;
    hr.css('position', 'absolute');
    var lb = leftBtn;
    var rb = rightBtn;
    var left = hr.position().left;
    var top = hr.position().top;
    var width = hr.outerWidth();
    var count = hr.size();
    var success_arr = new Array(count);

    hr.each(function (i) {
        if (i)
            $(this).css({
                'left': i * width,
                'top': top
            });
    });
    lb.click(function () {
        if (success_arr.length != count || count < 2)
            return false;
        success_arr = [];
        hr.each(function () {
            if ($(this).position().left >= (count - 1) * width)
                $(this).css('left', -width);
            $(this).animate({
                'left': $(this).position().left + width
            }, speed, 'linear', function () {
                success_arr.push(true);
            });
        });
    });
    rb.click(function () {
        if (success_arr.length != count || count < 2)
            return false;
        success_arr = [];
        hr.each(function () {
            if ($(this).position().left < -(count - 2) * width)
                $(this).css('left', width);
            $(this).animate({
                'left': $(this).position().left - width
            }, speed, 'linear', function () {
                success_arr.push(true);
            });
        });
    });
}




