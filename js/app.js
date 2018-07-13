var mainContent = document.getElementById('main-content');

var menuList = document.getElementsByClassName('menu-list');

for li in menuList {
	menuList[li].addEventListener('click', showMenu);
}


function showMenu {
	var listButton = document.getElementsByClassName('list-button');

	if (menuList.classList.contains('hidden')){
		menuList.classList.remove('hidden');
		menuList.classList.add('show');
	}
}


// Puedes hacer uso de la base de datos a través de la variable `data`
console.log(data);