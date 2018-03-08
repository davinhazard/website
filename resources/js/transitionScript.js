var items, nItems, cover, openContent, 
openContentText, pageIsOpen = false, openContentImage, 
closeContent, windowWidth, windowHeight, currentItem;

// initiate process
init();

function init() {
	resize();
	selectElements();
	attachListeners();
}

// select all elements in the DOM that are going to be used
function selectElements() {
	items = document.getElementsByClassName("item");
	nItems = items.length;
	cover = document.getElementById('expanding-cover');
	openContent = document.getElementById('open-content');
	openContentText = document.getElementById('open-content-text');
	openContentImage = document.getElementById('open-content-image');
	closeContent = document.getElementById('close-content');
}

/* Attach three event listeners : 
	- a click event listener for each portfolio item
	- a click listener for the close button 
	- a resize event listener on window 
*/
function attachListeners() {
	for (var i = 0; i < nItems; i++) {
		attachListenerToItem(i);
	}
	closeContent.addEventListener('click', onCloseClick);
	window.addEventListener('resize', resize);
}

function attachListenerToItem(i) {
	items[i].addEventListener('click', function(e) {
		var item = getItemElement(e.target);
		onItemClick(item, i);
	})
}

// When an item is clicked 
function onItemClick(item, i) {
	currentItem = item;
	// add the 'clicked' class to the item, so it animates out
	currentItem.className += ' clicked';
	// animate the item 'cover' after a 500ms delay
	setTimeout(function() { animateCoverUp(currentItem)}, 500);
	// animate out the other items
	animateOtherItems(currentItem, true);
	// add the open class to the page content
	openContent.className += ' open';
}

function animateCoverUp(item) {
  // get the position of the clicked item
  var itemPosition = item.getBoundingClientRect();
  // get the style of the clicked item
  var itemStyle = getComputedStyle(item);
  setCoverPosition(itemPosition);
  setCoverColor(itemStyle);
  scaleCoverToFillWindow(itemPosition);
  // update the content of the opened page
  //openContentText.innerHTML = '<h1>'+item.children[0].textContent+'</h1>'+paragraphText;
  //openContentImage.src = item.children[1].src;

  openContentText.innerHTML = paragraphText;
  openContentImage.src = item.children[1].children[0].src;
  setTimeout(function() {
    // update the scroll position to 0 (so it is at the top of the 'opened' page)
    //window.scroll(0, 0);
    // set page to open
    pageIsOpen = true;
  }, 300);
}

function animateCoverBack(item) {
  var itemPosition = item.getBoundingClientRect();
  // the original item may be in a different position, because of scrolling, so the cover position needs to be reset before scaling back down
  setCoverPosition(itemPosition);
  scaleCoverToFillWindow(itemPosition);
  // animate scale back to the item size and position
  cover.style.transform = 'scaleX('+1+') scaleY('+1+') translate3d('+(0)+'px, '+(0)+'px, 0px)';
  setTimeout(function() {
    // set content back to empty
    openContentText.innerHTML = '';
    openContentImage.src = '';
    // style the cover to 0x0 so it is hidden
    cover.style.width = '0px';
    cover.style.height = '0px';
    pageIsOpen = false;
    // remove the clicked class so the item animates back in
    currentItem.className = currentItem.className.replace(' clicked', '');
  }, 301);
}

function setCoverPosition(itemPosition) {
  // style the cover so it is in exactly the same position as the item
  cover.style.left = itemPosition.left + 'px';
  cover.style.top = itemPosition.top + 'px';
  cover.style.width = itemPosition.width + 'px';
  cover.style.height = itemPosition.height + 'px';
}

function setCoverColor(itemStyle) {
  // style the cover to be the same color as the item
  //cover.style.backgroundColor = itemStyle.backgroundColor;
  cover.style.backgroundColor = "rgb(255, 219, 0)";
}

function scaleCoverToFillWindow(itemPosition) {
  // calculate the scale and position for the item to fill the page,
  /*
  var scaleX = windowWidth / itemPosition.width;
  var scaleY = windowHeight / itemPosition.height;
  var offsetX = (windowWidth / 2 - itemPosition.width / 2 - itemPosition.left) / scaleX;
  var offsetY = (windowHeight / 2 - itemPosition.height / 2 - itemPosition.top) / scaleY;
  // set the transform on the cover - it will animate because of the transition set on it in the CSS
  cover.style.transform = 'scaleX('+scaleX+') scaleY('+scaleY+') translate3d('+(offsetX)+'px, '+(offsetY)+'px, 0px)';
  */
  cover.style.width = window.innerWidth + "px";
  cover.style.height= window.innerHeight + "px";
  cover.style.position = "relative";
}

/* When the close is clicked */
function onCloseClick() {
  // remove the open class so the page content animates out
  openContent.className = openContent.className.replace(' open', '');
  // animate the cover back to the original position item and size
  animateCoverBack(currentItem);
  // animate in other items
  animateOtheritems(currentItem, false);
}

function animateOtherItems(item, out) {
  var delay = 100;
  for (var i = 0; i < nItems; i++) {
    // animate items on a stagger, 1 each 100ms
    if (items[i] === item) continue;
    if (out) animateOutItem(items[i], delay);
    else animateInItem(items[i], delay);
    delay += 100;
  }
}

// animations on individual items (by adding/removing item names)
function animateOutItem(item, delay) {
  setTimeout(function() {
    item.className += ' out';
   }, delay);
}

function animateInItem(item, delay) {
  setTimeout(function() {
    item.className = item.className.replace(' out', '');
  }, delay);
}

// this function searches up the DOM tree until it reaches the item element that has been clicked
function getItemElement(el) {
  if (el.className.indexOf('item') > -1) return el;
  else return getItemElement(el.parentElement);
}

// resize function - records the window width and height
function resize() {
  if (pageIsOpen) {
    // update position of cover
    var itemPosition = currentItem.getBoundingClientRect();
    setCoverPosition(itemPosition);
    scaleCoverToFillWindow(itemPosition);
  }
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
}

var paragraphText = '<p>Somebody once told me the world is gonna roll me. I ain\'t the sharpest tool in the shed. She was looking kind of dumb with her finger and her thumb in the shape of an "L" on her forehead. Well the years start coming and they don\'t stop coming. Fed to the rules and I hit the ground running. Didn\'t make sense not to live for fun. Your brain gets smart but your head gets dumb. So much to do, so much to see. So what\'s wrong with taking the back streets? You\'ll never know if you don\'t go. You\'ll never shine if you don\'t glow.</p><p>Hey now, you\'re an all-star, get your game on, go play. Hey now, you\'re a rock star, get the show on, get paid. And all that glitters is gold. Only shooting stars break the mold.</p><p>It\'s a cool place and they say it gets colder. You\'re bundled up now, wait till you get older. But the meteor men beg to differ. Judging by the hole in the satellite picture. The ice we skate is getting pretty thin. The water\'s getting warm so you might as well swim. My world\'s on fire, how about yours? That\'s the way I like it and I never get bored.</p>';
