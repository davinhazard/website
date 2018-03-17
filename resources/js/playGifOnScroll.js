$(window).scroll(function () {
	$('.image-to-gif').each(function () {
	var imagePos = $(this).offset().top;
	var imageHeight = $(this).height();
	var topOfWindow = $(window).scrollTop();
	var bottomOfWindow = topOfWindow + $(window).height()

	if (imagePos + imageHeight < bottomOfWindow
		&& imagePos > topOfWindow) {
	/*if (imagePos < topOfWindow + imageHeight 
		&& imagePos + imageHeight > topOfWindow
		&& imagePos > topOfWindow) {*/
			$(this).addClass("hide-image");
	}
	else {
			$(this).removeClass("hide-image");
	}
	});
});