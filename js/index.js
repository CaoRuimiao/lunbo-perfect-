$(function(){
    var html = $('html, body');
    //  注意jquery版本（finish()）
    // 无缝轮播
    var index1= 1,timerId1;
    var itemW=$('.item').outerWidth();
    var lunbo1=function(){
        $('.banner .wrap').finish();
        if(index1==$('.banner .wrap .item').length-1){
            $('.banner .wrap').animate({'marginLeft':-itemW*index1},600,function(){
                $('.banner .wrap').css({'marginLeft':0});
            });
            index1=0;
        }else{
            $('.banner .wrap').animate({'marginLeft':-itemW*index1},600);
        }
        $('.banner .dot_box .dot').removeClass('active');
        $('.banner .dot_box .dot').eq(index1).addClass('active');
        index1++;
    }
    timerId1=setInterval(lunbo1,2000);
    // 鼠标经过banner左右按钮显示
    $('.banner').hover(function(){
        clearInterval(timerId1);
        $('.btn').finish();
        $('.btn').fadeIn();
    },function(){
        $('.btn').finish();
        $('.btn').fadeOut();
        timerId1=setInterval(lunbo1,2000);
    });
    // 点击右箭头
    $('.rightBtn').click(function(){
        clearInterval(timerId1);
        lunbo1();
    });
    // 点击左箭头
    $('.leftBtn').click(function(){
        clearInterval(timerId1);
        $('.banner .wrap').finish();
        index1--;
        if(index1==0){
            index1=$('.banner .wrap .item').length-1;
            $('.banner .wrap').css({'marginLeft':-itemW*index1});
        }
        $('.banner .wrap').animate({'marginLeft':-itemW*(index1-1)},600);    // 如果index1等于0，则现在显示 5
        $('.banner .dot_box .dot').removeClass('active');
        $('.banner .dot_box .dot').eq(index1-1).addClass('active');
    });
    // 鼠标经过小圆点时
    $('.banner .dot_box .dot').each(function(i){
        $(this).data('index',i);
    });
    var i1;
    $('.banner .dot_box .dot').hover(function(){
        clearInterval(timerId1);
        $('.banner .wrap').finish();
        i1=$(this).data('index');
        $('.banner .wrap').animate({'marginLeft':-itemW*i1},600);
        $('.banner .dot_box .dot').removeClass('active');
        $(this).addClass('active');
    },function(){
        clearInterval(timerId1);
        index1=i1;
        $('.banner .wrap').finish();
        $('.banner .wrap').animate({'marginLeft':-itemW*index1},600);
        timerId1=setInterval(lunbo1,2000);
    });

    // 鼠标滚动触发的事件
    var _clientH=$(window).height();
    $(window).scroll(function(){
        // slider_nav 出现、隐藏
        if($(window).scrollTop()>=$('#f1').offset().top && $(window).scrollTop()<$('.bottom').offset().top){
            sliderShow();
        }else{
            sliderHide();
        }
        // back_top 出现、隐藏
        if($(window).scrollTop()>=$('#f2').offset().top){
            backTopShow();
        }else{
            backTopHide();
        }

        $('.slider_nav .link').each(function(i){
            if($('.floor').eq(i)[0].getBoundingClientRect().top<=_clientH*2/5){
                console.log($('.floor').eq(3).offset().top);
                $('.slider_nav .link').removeClass('active').eq(i).addClass('active');
                // 以下console.log()的结果，为什么是满足以上if条件的所有索引，而在页面中实际表现出来的是其中之一？
                //if($('.slider_nav .link').eq(i).hasClass('active')){console.log(i);}   ok了
            }
        });

    });
    //-----------------------------------------------------------------------------
    //slider_nav 出现
    function sliderShow(){
        $('.slider_nav').finish();
        $('.slider_nav').fadeIn('slow');
    }
    //slider_nav 隐藏
    function sliderHide(){
        $('.slider_nav').finish();
        $('.slider_nav').fadeOut('slow');
    }
    // back_top 出现
    function backTopShow(){
        $('.back_top').finish();
        $('.back_top').fadeIn('slow');
    }
    // back_top隐藏
    function backTopHide(){
        $('.back_top').finish();
        $('.back_top').fadeOut('slow');
    }
    //------------------------------------------------------------------------------


    // 法一：点击楼层跳转（700ms内完成动画）
    $('.slider_nav .link').each(function(i){
        $(this).data('index',i);
    });
    var i2;
    $('.slider_nav .link').click(function(){
        i2=$(this).data('index');
        $('.slider_nav .link').removeClass('active');
        $(this).addClass('active');
        var newTop=$('.floor').eq(i2).offset().top-10;
        $({top:$(window).scrollTop()}).animate(
            {top:newTop},
            {duration:700,step:function(){
                $(window).scrollTop(this.top);
                }
            }
        );
    });
    // 法二： 点击跳转楼层（不设定时间，执行默认的动画）
    //$('.slider_nav .link').each(function(i){
    //    $(this).data('index',i);
    //});
    //$('.slider_nav .link').click(function(){
    //    $('.slider_nav .link').removeClass('active');
    //    $(this).addClass('active');
    //    var refTop = $('.floor').eq($(this).data('index')).offset().top-10;
    //    html.animate({
    //        scrollTop: refTop
    //    });
    //});
    //法一：返回顶部（700ms内完成动画）
    $('.back_top').click(function(){
        $({top:$(window).scrollTop()}).animate(
            {top:0},
            {duration:700,step:function(){
                $(window).scrollTop(this.top);
                }
            }
        );
    });

    // 法二：回到顶端(不设定时间，执行默认的动画)
    //$('.back_top').click(function () {
    //    html.animate({ scrollTop: 0 });
    //});


})