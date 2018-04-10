$(window).scroll(function () {
	$(".overlay").each(function () {
	var imagePos = $(this).offset().top;
	var imageHeight = $(this).height();
	var topOfWindow = $(window).scrollTop();
	var bottomOfWindow = topOfWindow + window.innerHeight; //$(window).height();
	var headerHeight = $("#header").outerHeight();

	/*var windowHeight = window.innerHeight; //full viewport height not based on position
	var halfViewportHeight = (windowHeight - headerHeight) / 2;
	var topOfViewport = topOfWindow + headerHeight; //top of viewport based on scroll position
	var middleViewportPos = (topOfViewport + bottomOfWindow) / 2;
		
	var halfImageHeight = imageHeight / 2;
	var centerImagePos = imagePos + halfImageHeight;
		
	var maxOpacity = 1; // opacity ranges from 0 to 0.75
	var opacity = 0;
	var offset = Math.abs(middleViewportPos - centerImagePos);
*/
	/*if (imagePos < topOfWindow + imageHeight 
		&& imagePos + imageHeight > topOfWindow
		&& imagePos > topOfWindow) { */
	/* show gif/overlay/title when item is in viewport */
	if (imagePos + imageHeight < bottomOfWindow
		&& imagePos > topOfWindow + headerHeight) 
	{
		$(this).addClass("animate-on-scroll");
		$(this).next(".title").addClass("show-title");
		$(this).parent().prev(".preview-image").addClass("show-gif");

		/* if portfolio icon is in the viewport, we want to 
		fade the color overlay opacity based on the relative
		position to the middle of the viewport. */
/*
		if (centerImagePos === middleViewportPos) {
			opacity = maxOpacity;
		}
		else {
			opacity = maxOpacity - offset / halfImageHeightViewportHeight;
		}
*/
		//$(this).css('opacity', opacity).html(opacity);
	}
	else {

		$(this).removeClass("animate-on-scroll");
		$(this).next(".title").removeClass("show-title");
		$(this).parent().prev(".preview-image").removeClass("show-gif");
	
		//$('.animate-on-scroll').css('opacity', '0');
		//opacity = 0;
	}
	});
});