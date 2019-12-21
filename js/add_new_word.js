var select = document.getElementsByClassName('part-of-speech__select')[0]
var options = document.getElementsByClassName('part-of-speech__options')[0]
var option = document.querySelectorAll('.part-of-speech__options div')
var optionsSwiper = document.getElementsByClassName('options-swiper')[0]
var fakeCheckbox = document.getElementsByClassName('fake-checkbox')[0]
var isShowing = document.getElementsByClassName('answer')
var addWord = document.getElementsByClassName('add-word')[0]
// Преобразовывает массив элементов во что-то, но это работает
var inputs = Array.prototype.slice.call(document.getElementsByTagName("input"));


// Перемещает курсор на следующие инпуты, если все введено верно
inputs.forEach(function(item, i, e) {
	inputs[i].onkeydown = function(e) {
		// При нажатии на интер
		if (e.keyCode == 13) {
			// Если НУЛЕВОЙ инпут не = '' и не равен числу
			if (i == 0 && isStr(this.value)) {
				inputs[1].focus()
			}
			// Если ПЕРВЫЙ инпут не = '' и не равен числу, а также не открыто выпадающее меню
			if (i == 1 && !options.classList.contains('active') && isStr(this.value)) {
				// Открыть выпадющее меню
				options.classList.toggle('active')
				optionsSwiper.classList.toggle('active')
				this.blur()
			}
			// НЕ НАЖИМАТЬ НА ОСНОВНУЮ ФОРМУ АВТОМАТИЧЕСКИ
			return false
		}
	}
})

function isStr(str) {
	return ( !/\d/.test(str) && (str.search("<") == -1 && str.search(">") == -1) && str.length > 0 && /\S/.test(str)) 
}


// Самописный select, так как стандартный невозможно стиллизовать
select.onclick = function () {
	options.classList.toggle('active')
	optionsSwiper.classList.toggle('active')
}
for(var i = 1; i < option.length; i++) {
	option[i].onclick = function() {
		select.textContent = this.innerHTML

		options.classList.toggle('active')
		optionsSwiper.classList.toggle('active')
	}
}


// Выпадающее меню
var groupOfOptions = 1
optionsSwiper.onclick = function() {
	if (groupOfOptions == 2) {
		option[0].style.marginTop = "0"
		optionsSwiper.style.transform = 'rotate(0)'
		groupOfOptions--
		return
	}
	if (groupOfOptions == 1) {
		option[0].style.marginTop = "-100px"
		optionsSwiper.style.transform = 'rotate(180deg)'
		groupOfOptions++
		return
	}
}

// Реализация конпок да/нет
for(var i = 0; i < isShowing.length; i++) {
	isShowing[i].onclick = function() {
		// Убрать визуальную линию, разделяющую да|нет
		document.getElementsByClassName('wrapper-of-answers')[0].classList.add('active')
		for(var i = 0; i < isShowing.length; i++) {
			// убрать активность у всех кнопок
			isShowing[i].classList.remove('active')
		}
		if (!this.classList.contains('active')) {
			this.classList.add('active')
			document.getElementsByClassName('real-checkbox')[0].value = this.innerHTML
		}
	}
}


function firstLetter_toUpperCase(str) {
	return str[0].toUpperCase() + str.substr(1)
}

addWord.onclick = function () {
	// Проверяет правильность введенных форм
	if (inputs[0].value != '' && inputs[1].value != '' && (select.textContent == 'Существительное' || select.textContent == 'Глагол' || select.textContent == 'Прилагательное' || select.textContent == 'Наречие' || select.textContent == 'Другое') ) {
		if (!isStr(inputs[0].value) || !isStr(inputs[1].value)) {
			document.getElementsByClassName('error')[0].innerHTML = "Слово не может содержать цифровые символы"
		} else {
			// ЕСЛИ ВСЕ ФОРМЫ ЗАПОЛНЕННЫ ПРАВИЛЬНО

			var part_of_speech
			switch (select.textContent) {
				case "Существительное":
					part_of_speech = "Сущ-ое"
					break;
				case "Глагол":
					part_of_speech = "Глагол"
					break;
				case "Прилагательное":
					part_of_speech = "Прил-ое"
					break;
				case "Наречие":
					part_of_speech = "Наречие"
					break;
				case "Другое":
					part_of_speech = "Другое"
					break;
			}
			var params = 'word_eng=' + firstLetter_toUpperCase(document.querySelector('input[name="word_eng"]').value) + '&' + 
								'word_rus=' + firstLetter_toUpperCase(document.querySelector('input[name="word_rus"]').value) + '&' +
								'part_of_speech=' + firstLetter_toUpperCase(part_of_speech) + '&' +
								'is_showing=' + document.querySelector('input[name="is_showing"]').value
			ajaxPost(params);

			document.getElementsByClassName('error')[0].innerHTML = '';
				document.getElementsByClassName('wrapper-of-answers')[0].classList.remove('active')

				document.getElementsByClassName('real-checkbox')[0].value = 'yes'
				document.querySelector('input[name="word_eng"]').value = ''
				document.querySelector('input[name="word_rus"]').value = ''
				select.textContent = 'Часть речи'
				document.querySelector('input[name="is_showing"]').value = ''

		}
	} else {
		document.getElementsByClassName('error')[0].innerHTML = "Заполните все поля"
	}
}



function ajaxPost(params) {
	var request = new XMLHttpRequest();

	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			if(request.responseText == 'true') {


			}
			if (request.responseText == 'false') {
				document.getElementsByClassName('error')[0].innerHTML = 'Ошибка, данное слово уже существует в базе данных'
			}
		}
	}

	request.open('POST', '../controllers/add_new_word_controller.php');
	request.setRequestHeader('content-Type', 'application/x-www-form-urlencoded')
	request.send(params)

}