if (document.querySelector('.exit')) {
	document.querySelector('.exit').onclick = function () {
		document.cookie = 'is_premium=; path=/; expires= Tue, 01 Jan 1970 00:00:01 GMT;'
		document.cookie = 'is_vk=; path=/; expires= Tue, 01 Jan 1970 00:00:01 GMT;'
		window.location.replace("/")
	}
}