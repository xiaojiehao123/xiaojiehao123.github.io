// JavaScript Document

$.fn.head=function(){
	var aLi=$('#head_show').find('li');
		var timer=null;
		$.each(aLi,function(index){
			$(this).hover(function(){
				var oShow=aLi.eq(index).find('.show');
				var aP=oShow.find('p');
				if(oShow.length)
				{
					clearTimeout(timer);
					timer=setTimeout(function(){
						oShow.show();
						$.each(aP,function(index){
							$(this).hover(function(){
								aP.eq(index).css({'background':'#eee','color':'#2bb8aa'});
							},
							function(){
								aP.eq(index).css({'background':'none','color':'black'});
							})
						})
						aLi.eq(index).addClass('active');
					},100);
				}
			},
			function(){
				clearTimeout(timer);
				var oShow=aLi.eq(index).find('.show');
				oShow.hide();
				aLi.eq(index).removeClass('active');
			})
		})
};

$.fn.banner=function(){
	$('#close').click(function(){
		$('#banner').animate({'height':0});
	});
};

$.fn.Input=function(){
	$('.message').click(function(){
		$('#txt1').focus();
		$('.message').hide();
	});
	$('#txt1').blur(function(){
		var oTxt=$('#txt1').attr('value');
		if(oTxt.length>0)
		{
			$('.message').hide();
		}
		else
		{
			$('.message').show();
		}
	});
};

$.fn.sideColumn=function(){
	var aLi1=$('.l_ul').find('li');
		var H1=$('.l_ul').height();
		var aDiv1=$('.left_show');
		var timer1=null;
		var timer2=null;
		$.each(aLi1,function(index){
			$(this).hover(function(){
				if(aDiv1.eq(index).hasClass("no"))
				{
					
				}
				else
				{
					timer2=setTimeout(function(){
						aDiv1.eq(index).show();
						aDiv1.eq(index).css({'height':H1+'px'});
						aLi1.eq(index).addClass('active');
						aLi1.eq(index).find('span').eq(1).hide();
					},300)
				}
			},
			function(){
				clearTimeout(timer2);
				timer1=setTimeout(function(){
					aDiv1.eq(index).hide();	
				},50);
				aLi1.eq(index).removeClass('active');
				aLi1.eq(index).find('span').eq(1).show();	
			})
		})
		$.each(aDiv1,function(index){
			$(this).hover(function(){
				clearTimeout(timer1);
				aLi1.eq(index).find('span').eq(1).hide();
				aLi1.eq(index).addClass('active');
			},
			function(){
				aDiv1.eq(index).hide();
				aLi1.eq(index).removeClass('active');
				aLi1.eq(index).find('span').eq(1).show();
			})
			
			
		})
};

$.fn.roll=function(){
	this.each(function (){
		var obj=$(this);
		var oDiv=obj.find('.listing_1');
		var oLeft=obj.find('.c_left');
		var oRight=obj.find('.c_right');
		var timer=null;
		oDiv.html(oDiv.html()+oDiv.html());
		var aDiv=oDiv.children();
		var w=aDiv.eq(0).innerWidth();
		oDiv.css({'width':aDiv.length*w+'px'});
		//alert(oDiv.width());
		/*两个按钮消失显示*/
		
		var W=obj.width();
		var W1=oDiv.width();
		var left=0;
		clearInterval(timer);
		timer=setInterval(time,2000);
		
		oDiv.hover(function(){
			oLeft.show();
			oRight.show();
			clearInterval(timer);
			
			
		},
		function(){
			oLeft.hide();
			oRight.hide();
			timer=setInterval(time,2000);
		})
		oLeft.click(function(){
			 time();
		})
		
		function time()
		{
			left-=W;
			if(left<=-W1)
			{
				left=0;
				oDiv.css('left',0);
			}
			else
			{
				oDiv.animate({left:left%W1+'px'});
			}
		}
	})	
};
/*倒计时*/

$.fn.Time=function(){
	this.each(function(){
		var obj=$(this);
		var oDiv=obj.find('.time');
		var aSpan=oDiv.find('span');
		//alert(aSpan.length);以上正确；
		setInterval(time,1000);
		time();
		function time()
		{
			var oDate=new Date();
			var now_time=parseInt(oDate.getTime()/1000);
			//alert(now_time);
			var oDate1=new Date();
			oDate1.setDate(6);
			oDate1.setHours(24,0,0);
			var fut_time=parseInt(oDate1.getTime()/1000);
			var total=fut_time-now_time;
			//alert(total);
			var h=toDub(parseInt(total/3600));
			//alert(h);
			total%=3600;
			m=toDub(parseInt(total/60));
			s=toDub(total%60);
			var str=h+m+s;
			$.each(aSpan,function(index){
				aSpan.eq(index).html(str.charAt(index));
			})	
		}
	})
	function toDub(n)
	{
		return n>10 ? ''+n : '0'+n;
	}
	
};

/*图片延迟加载*/
$.fn.load1=function(){
	this.each(function(){
		obj=$(this);//obj为每一个独立的大的div;
		var H1=$(window).height();
		var aImg=obj.find('img');//alert(aLi.length); 每个obj下面有12个li,而每个li下面有一个img标签；
		$(document).scroll(function(){
			var H2=$(document).scrollTop();
			
			var nTop=H1+H2+50;
			//document.title=nTop;
			$.each(aImg,function(index){
				var src1=aImg.eq(index).attr('_src');
				//alert(src1);
				var H3=aImg.eq(index).offset().top;
				//document.title=H3;
				if(nTop>H3)
				{
					aImg.eq(index).attr('src',src1);
				}
			});
		})
		
	})
};

/*回到顶部此处有问题，关于用户操作滚动时，无法清除定时器*/
$.fn.toTop=function()
{
	var userScroll=false;
	var timer=null;
	this.each(function(){
		obj=$(this);
		obj.click(function(){
			var ScrollTop=$(document).scrollTop();
			//alert(ScrollTop);
			var start=ScrollTop;
			var dis=0-start;
			var n=0; 
			var count=Math.floor(1000/30);
			clearInterval(timer);
			timer=setInterval(function(){
				n++;
				userScroll=false;
				var cur=start+dis*n/count;
				$(document).scrollTop(cur);
				if( n==count )
				{
					clearInterval(timer);
				}
			},30);
		});
		$(window).scroll(function(){
			if (userScroll)
			{
				clearInterval(timer);
				//alert(123);
			}
			userScroll=true;
			
		});
	});	
}
<!--跨年-->
$.fn.newYear=function(){
	this.each(function(){
		var obj=$(this);
		var oNewYear=$('#new_year1');
		var new_close=$('#new_close');
		obj.click(function(){
			obj.animate({left:'-115px'},{complete:function(){
				oNewYear.animate({left:0},{duration:2000,easing:'easeInOutElastic'});
			}});
			
		});
		new_close.click(function(){
			oNewYear.animate({left:'-1578px'},{duration:2000,complete:function(){
				obj.animate({left:0});
			}});
		})
	})
};

/*移入变颜色*/
$.fn.change=function(){
	this.each(function(){
		var obj=$(this);
		var aLi=obj.children();
		//alert(aLi.length);5
		$.each(aLi,function(index){
			aLi.eq(index).mouseover(function(){
				$.each(aLi,function(index){
					aLi.eq(index).removeClass('active');
				})
				aLi.eq(index).addClass('active');
			})
		})
	})
};
























