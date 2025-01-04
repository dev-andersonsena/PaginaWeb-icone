$( document ).ready(function(){
	
	TweenMax.set('.card',{autoAlpha:0,scale:0});
	
	$('.thumb').mouseover(function(){
		TweenMax.set($(this),{zIndex:999});
		TweenMax.to($(this).find($('.card')),0.3,{autoAlpha:1,scale:1});
		TweenMax.to($(this).find($('.photo')),0.4,{scale:0.8,y:-120,ease:Back.easeOut});
	});
	
	$('.thumb').mouseout(function(){
		TweenMax.set($(this),{zIndex:2});
		TweenMax.to($(this).find($('.card')),0.2,{autoAlpha:0,scale:0});
		TweenMax.to($(this).find($('.photo')),0.2,{scale:1,y:0});
	});
	
	$('.thumb').click(function(){
		console.log($(this).attr('id'));
	});
});

