function openTab(evt, tabName) {
	var i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("tabcontent");
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i ++) {
		tablinks[i].className = tablinks[i].className.replace(" selected", "");
	}
	/* if button clicked is 'View All Work', 
	set all tabcontent elements to inline-block */
	if (tabName === 'view-all') {
		for (i = 0; i < tabcontent.length; i++) {
			tabcontent[i].style.display = "inline-block";
		}
	}

	/* else, set each tabcontent element to display:none
	and set the clicked tab to selected and display:block */
	else {
		for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
		}
		document.getElementById(tabName).style.display = "block";
		evt.currentTarget.className += " selected";
	}
}