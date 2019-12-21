var _wrapper = document.querySelector(".wrapper"),
		_menuSwipe = document.querySelector(".menu-swipe")

// Создано ли меню для авторизации. Для безопасности
var wasLoginSwipeMenuCreated = false,
		wasRegisterSwipeMenuCreated = false

var _preloader = document.querySelector(".preloader")

document.querySelector(".autorisation").onclick = function () {

	// Чтобы при случайном надатии "назад" данные оставались
	if (!wasLoginSwipeMenuCreated) {
		wasLoginSwipeMenuCreated = true
		wasRegisterSwipeMenuCreated = false

		// _menuSwipe.innerHTML =

		//	<div class="back">
		//		<div class="back-arrow"></div>
		//	</div>
		//
		//	<div class="wrapper-of-blocks">
		//
		//		<p class="error"></p>
		//		<input class="sing-in__login" type="text" placeholder="Введите логин" autocomplete="off">
		//		<input class="sing-in__password" type="password" placeholder="Введите пароль" autocomplete="off">
		//	
		//		<div class="wrapper-of-vk"><img src="../imgs/vk-logo.png" alt=""></div>
		//	</div>
		//	<div class="submit sing-in">Войти</div>
		_menuSwipe.innerHTML = '<div class="back"><div class="back-arrow"></div></div><div class="wrapper-of-blocks"><p class="error">.</p><input class="sing-in__login" type="text" placeholder="Введите логин" autocomplete="off"><input class="sing-in__password" type="password" placeholder="Введите пароль" autocomplete="off"></div><div class="submit sing-in">Войти</div>'
		document.querySelector(".wrapper-of-blocks").classList.add('login_mode')

		// Чтобы только  что созданные блоки стали реагировать на события
		createEventsForNewSwipeMenu()
	}
	// Двигает блок, чтобы показать swipeMenu. Двигает в любом случае
	_wrapper.style.marginLeft = '-100%'
}







document.querySelector(".register").onclick = function () {

	// Чтобы при случайном надатии "назад" данные оставались
	if (!wasRegisterSwipeMenuCreated) {
		wasRegisterSwipeMenuCreated = true
		wasLoginSwipeMenuCreated = false


		// _menuSwipe.innerHTML =

		//	<div class="back">
		//		<div class="back-arrow"></div>
		//	</div>
		//
		//	<div class="wrapper-of-blocks">
		//
		//		<p class="error"></p>
		//		<input type="text" placeholder="Введите логин" autocomplete="off">
		//		<input type="password" placeholder="Введите пароль" autocomplete="off">
		//		<input class="rewerse" type="password" placeholder="Повторите пароль" autocomplete="off">
		//	
		//		<div class="wrapper-of-vk"><img src="../imgs/vk-logo.png" alt=""></div>
		//
		//	</div>
		//	<div class="submit reg-in">Зарегистрироваться</div>
		_menuSwipe.innerHTML = '<div class="back"><div class="back-arrow"></div></div><div class="wrapper-of-blocks"><p class="error">.</p><input class="reg-in__login" type="text" placeholder="Введите логин" autocomplete="off"><input class="reg-in__password" type="password" placeholder="Введите пароль" autocomplete="off"><input class="reg-in__repeat-password rewerse" type="password" placeholder="Повторите пароль" autocomplete="off"></div><div class="submit reg-in">Зарегистрироваться</div>'
		document.querySelector(".wrapper-of-blocks").classList.remove('login_mode')
		// Чтобы только  что созданные блоки стали реагировать на события
		createEventsForNewSwipeMenu()
	}
	// Двигает блок, чтобы показать swipeMenu. Двигает в любом случае
	_wrapper.style.marginLeft = '-100%'
}




function createEventsForNewSwipeMenu() {

	document.querySelector(".back").onclick = function () {
		_wrapper.style.marginLeft = '0'
	}

																			// АВТОРИЗАЦИЯ
	// Если активен ввод логина
	if (wasLoginSwipeMenuCreated) {
		document.querySelector(".sing-in").onclick = function() {
			// Отлов ошибок
			// Если все верно - код продолжит выполнение. Если нет - покажет ошибку	
			if (!checkErrors__showError("autorisation") ) {
				return
			}


			document.querySelector('.error').classList.remove("active")

			_preloader.classList.add('active')
			var params = 'login=' + document.querySelector('.sing-in__login').value + '&' + 
								'password=' + document.querySelector('.sing-in__password').value + '&' +
								'mode=autorisation'
			ajaxPost(params);

		}
	}


																		// РЕГИСТРАЦИЯ
	if (wasRegisterSwipeMenuCreated) {
		document.querySelector(".reg-in").onclick = function() {
			// Отлов ошибок
			// Если все верно - код продолжит выполнение. Если нет - покажет ошибку	
			if (!checkErrors__showError("register") ) {
				return
			}

			// На всякий случай убирает сообщение об ошибке
			document.querySelector('.error').classList.remove("active")

			_preloader.classList.add('active')
			// Если данные были введены верно - зарегистрировать пользователя
			var params =  'login=' + document.querySelector('.reg-in__login').value + '&' + 
										'password=' + document.querySelector('.reg-in__password').value + '&' +
										'mode=register'
			ajaxPost(params);

		}
	}


}




function checkErrors__showError(mode) {

	if (mode == "autorisation") {

		var login = document.querySelector('.sing-in__login').value,
				password = document.querySelector('.sing-in__password').value,
				_error = document.querySelector('p.error')


				if ( !login.length || !password.length) {
					_error.innerHTML = "Заполните все поля"
					_error.classList.add('active')
					return false
				}
				if ( !isStr(login) || !isStr(password)) {
					_error.innerHTML = "Логин или пароль содержит неверные символы"
					_error.classList.add('active')
					return false
				}


				if ( login.length < 6) {
					_error.innerHTML = "Логин должен содержать не менее 6 символов"
					_error.classList.add('active')
					return false
				}
				if ( password.length < 6) {
					_error.innerHTML = "Пароль должен содержать не менее 6 символов"
					_error.classList.add('active')
					return false
				}
				if ( login.length > 36) {
					_error.innerHTML = "Логин должен содержать не более 36 символов"
					_error.classList.add('active')
					return false
				}
				if ( password.length > 36) {
					_error.innerHTML = "Пароль должен содержать не более 36 символов"
					_error.classList.add('active')
					return false
				}
	}


	if (mode == "register") {

		var login = document.querySelector('.reg-in__login').value,
				password = document.querySelector('.reg-in__password').value,
				repeat_password = document.querySelector('.reg-in__repeat-password').value,
				_error = document.querySelector('p.error')


				if ( !login.length || !password.length || !repeat_password.length) {
						_error.innerHTML = "Заполните все поля"
						_error.classList.add('active')
						return false
					}

					if ( !isStr(login) || !isStr(password)) {
						_error.innerHTML = "Логин или пароль содержит неверные символы"
						_error.classList.add('active')
						return false
					}
					if ( password != repeat_password) {
						_error.innerHTML = "Пароли не совпадают"
						_error.classList.add('active')
						return false
					}

					if ( login.length < 6 ) {
						_error.innerHTML = "Логин должен содержать не менее 6 символов"
						_error.classList.add('active')
						return false
					}
					if ( password.length < 6 || repeat_password.length < 6) {
						_error.innerHTML = "Пароль должен содержать не менее 6 символов"
						_error.classList.add('active')
						return false
					}

					if ( login.length > 36) {
						_error.innerHTML = "Логин должен содержать не более 36 символов"
						_error.classList.add('active')
						return false
					}
					if ( password.length > 36 || repeat_password.length > 36) {
						_error.innerHTML = "Пароль должен содержать не более 36 символов"
						_error.classList.add('active')
						return false
					}
	}

	// Если все нормально - вернуть true (иначе ответ undefined, что приравнивается к false)
	return true

}




function isStr(str) {
	// Возращает true, если все верно
	return ( (str.search("<") == -1 && str.search(">") == -1) && str.indexOf(" ") == -1)
}


function ajaxPost(params) {
	var request = new XMLHttpRequest();

	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			if (request.responseText != 'true') {
				document.querySelector('p.error').innerHTML = request.responseText
				document.querySelector('p.error').classList.add("active")
			}
			if (request.responseText == "true") {
				window.location.replace("/")
			}
			_preloader.classList.remove('active')
		}
	}
	request.open('POST', '../controllers/autorisation_controller.php');
	request.setRequestHeader('content-Type', 'application/x-www-form-urlencoded')
	request.send(params)

}
