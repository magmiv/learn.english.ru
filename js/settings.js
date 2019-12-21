var _preloader = document.querySelector(".preloader")



document.querySelector(".submit").onclick = function() {
	// Отлов ошибок
	// Если все верно - код продолжит выполнение. Если нет - покажет ошибку	
	if (!checkErrors__showError() ) {
		return
	}

	document.querySelector('.error').classList.remove("active")

	_preloader.classList.add('active')

	var params = 'login=' + document.querySelector('.reg-in__login').value + '&' + 
						'password=' + document.querySelector('.reg-in__password').value
	ajaxPost(params);

}



function checkErrors__showError() {

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
				document.querySelector('.wrapper').style.display = 'none'
				document.querySelector('.submit').style.display = 'none'
				document.querySelector('.sucsess').style.display = 'flex'
			}
			_preloader.classList.remove('active')
		}
	}
	request.open('POST', '../controllers/settings_controller.php');
	request.setRequestHeader('content-Type', 'application/x-www-form-urlencoded')
	request.send(params)

}
