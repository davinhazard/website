function toggleMenu() {
	var icon, dropdown;
	icon = document.getElementById("hamburger");
	icon.classList.toggle("change");

	menu = document.getElementById("dropdown");
	menu.classList.toggle("show");
}