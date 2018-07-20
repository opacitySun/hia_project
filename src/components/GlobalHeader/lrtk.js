function sideFixed(){
	var scrolltop = document.body.scrollTop || document.documentElement.scrollTop;
	var a1 = 651;
	var ww = $(window).width();
	if(ww>501){
		if(a1<=scrolltop){
			$('.appgame-app-dl,#appgame-leftside-share').slideDown();
			$(".two-level-page-btn-fixed").css("bottom","210px");
		}
		else{
			$('.appgame-app-dl,#appgame-leftside-share').slideUp();
			$(".two-level-page-btn-fixed").css("bottom","60px");
		}
	};
	
	var scrolltop2 = document.body.scrollTop || document.documentElement.scrollTop;
	var a2 = 651;
	var ww2 = $(window).width();
	if(ww2>551){
		if(a2<=scrolltop2){
			$('.appgame-app-dl,#table-nav').slideUp();

		}
		else{
			$('.appgame-app-dl,#table-nav').slideDown();
		}
	}
}


$(function(){
	sideFixed();
	$(window).scroll(function(e) {
    sideFixed();
  });
	$(".appgame-sidebar-glist li").mouseenter(function(e) {
      if($(this).hasClass('current')){
				
				}
			else{
				$(this).parent('ul').find('li').removeClass('current');
				$(this).addClass('current');
				}
    });
		
		$('.appgame-comments').click(function(e) {
      $('html,body').animate({scrollTop:$('#appgame-comments').offset().top},400);
    });
    
    
	});

/*右侧滚动导航*/
function gotoTPoint(obj, speed) {
    var objTop;
    var objId = '#' + obj;
    if (obj != 'top') {
        objTop = $(objId).offset().top-70;
    } else {
        objTop = 0;
    }
    $('html,body').animate({
        scrollTop: objTop
    }, speed);
}
/*头部滚动导航*/
$(function(){  
  var winHeight = $(document).scrollTop();
  
  $(window).scroll(function() {
    var scrollY = $(document).scrollTop();// 获取垂直滚动的距离，即滚动了多少
  
    if (scrollY > 65){ //如果滚动距离大于550px则隐藏，否则删除隐藏类
      $('.header').addClass('hiddened');
    } 
    else {
      $('.header').removeClass('hiddened');
    }
  
    if (scrollY > winHeight){ //如果没滚动到顶部，删除显示类，否则添加显示类
      $('.header').removeClass('showed');
    } 
    else {
      $('.header').addClass('showed');
    }        
  
   });
});