// JavaScript Document
$(document).ready(function(){
	var $liCur = $(".nav ul li.cur"),
	  curP = $liCur.position().left,
	  // curW = $liCur.outerWidth(true),
	  curW = $liCur.width(),
	  curL = curP + (curW/2);
	  $slider = $(".curBg"),
	  $navBox = $(".nav");
	 $targetEle = $(".nav ul li .underline"),
	$slider.animate({
	  "left":(curL-5)+"px",
	  // "width":curW
	  "width":"46px"
	});
	$targetEle.mouseenter(function () {
	  var $_parent = $(this).parent(),
		// _width = $_parent.outerWidth(true),
		_width = $_parent.width(),
		posL = $_parent.position().left,
		left = posL + (_width/2);
	  $slider.stop(true, true).animate({
		"left":(left-5)+"px",
		// "width":_width
		"width":"46px"
	  }, "fast");
	});
	$navBox.mouseleave(function (cur, wid) {
	  cur = curP;
	  wid = curW;
	  curL = cur + (wid/2);
	  $slider.stop(true, true).animate({
		"left":(curL-5)+"px",
		// "width":wid
		"width":"46px"
	  }, "fast");
	});

	$(".flip").mouseover(function(){
    $(this).next("div.nav_panel").stop().slideDown(500);
  });
  $(".nav_h").mouseleave(function(){
    $(this).children("div.nav_panel").stop().slideUp(500);
  });
});