$(window).scroll(function () {
	$(".overlay").each(function () {
	var imagePos = $(this).offset().top;
	var imageHeight = $(this).height();
	var topOfWindow = $(window).scrollTop();
	var bottomOfWindow = topOfWindow + $(window).height();
	var headerHeight = $("#header").outerHeight();

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
	}
	else {
		$(this).removeClass("animate-on-scroll");
		$(this).next(".title").removeClass("show-title");
		$(this).parent().prev(".preview-image").removeClass("show-gif");
	}
	});
});