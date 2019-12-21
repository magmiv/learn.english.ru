var _choseAll = document.querySelector(".chose-all input"),
		_checkboxes = document.querySelectorAll(".row input[type=checkbox]"),
		_rows = [...document.querySelectorAll('.row:not(.top-row)')]

var _edit = document.querySelector(".fa-magic"),
		_lowVisionOff = document.querySelector(".fa-eye"),
		_lowVisionOn = document.querySelector(".fa-low-vision"),
		_delete = document.querySelector(".fa-trash"),
		_delete_yes = document.querySelector(".delete-yes"),
		_delete_no = document.querySelector(".delete-no"),
		_save = document.querySelector(".fa-upload"),
		_preloader = document.querySelector(".preloader")

// После обновления страницы некоторые чекбоксы могут остаться выделенными
for (var i = 0; i < _checkboxes.length; i++) {
	_choseAll.checked = false
	if (_checkboxes[i].checked) {
		_checkboxes[i].checked = false
	}
}
// Чтобы нижняя строка всегда была прижата к низу)
isScroll()
// Устраняет баг с некорректным отображением нижнего row
window.onresize = function () {
	isScroll()
}


window.addEventListener("beforeunload", function(e) {
	if (document.querySelector(".fa-upload").parentNode.classList.contains("active")) {
		if (e) {
			e.returnValue = "Изменения не сохранены. Вы точно хотите покинуть сраницу?"
		}
		return "Изменения не сохранены. Вы точно хотите покинуть сраницу?"
	}
})


// Для каждого чекбокса
for (var i = 0; i < _checkboxes.length; i++) {
	// Реализация чекбоксов - если все чекбоксы выделенны - выделить главный чекбокс. Если хотя бы один чекбокс не активен - убрать галочку у главного чекбокса
	_checkboxes[i].onclick = function () {

		// Если чекбокс нажали
		if (this.checked) {
			// Пройтись по всем чекбоксам
			for (var i = 0; i < _checkboxes.length; i++) {
				// Если хотя бы один чекбокс не нажат - ничего не делать
				if (!_checkboxes[i].checked)	return
			}
			// Если нажаты все чекбоксы - поставить галочку у "Выбрать все"
			_choseAll.checked = true


		// Если чекбкс стал не нажатым
		}
		if (!this.checked) {
			// Убрать галочку у "Выбрать все"
			_choseAll.checked = false
		}

	}

}

// Главный чекбокс
_choseAll.onclick = function () {
	// Если был нажат "Выбрать все" - поставить галочки у всех чекбоксов
	if (_choseAll.checked) {
		for (var i = 0; i < _checkboxes.length; i++) {
			_checkboxes[i].checked = true
		}
	}
	// Если стал не нажатым "Выбрать все" - убрать галочки у всех чекбоксов
	if (!_choseAll.checked) {
		for (var i = 0; i < _checkboxes.length; i++) {
			_checkboxes[i].checked = false
		}
	}
}

// При надатии кнопки изменения - у всех выделенных колонок подставить инпуты и селекты
_edit.onclick = function () {
		// У всех чекбоков с галочкой у которых еще не стоят инпуты
	for (var i = 0; i < _checkboxes.length; i++) {
		//  !_rows[i].children[2].children[0] - если еще не существует inputа
		if (_checkboxes[i].checked && !_rows[i].children[2].children[0]) {
			document.querySelector('.fa-upload').parentNode.classList.add('active')
			// Создаем инпуты со старым значением
			_rows[i].children[1].innerHTML = '<input type="text" value="'+_rows[i].children[1].innerText+'">'
			_rows[i].children[2].innerHTML = '<input type="text" value="'+_rows[i].children[2].innerText+'">'



															/*
																<div class="part-of-speech__select">
																	<p>Старый текст</p>
																</div>

																<div class="wrapper-of-options">
																	<div class="part-of-speech__options">
																		<div>Сущ-ое</div>
																		<div>Глагол</div>
																		<div>Прил-ое</div>
																		<div>Наречие</div>
																		<div>Другое</div>
																	</div>
																</div>
															*/
			// Добавляет самописный select и createPartOfSpeach_func делает так, чтобы только что добавленный селект работал
			_rows[i].children[3].innerHTML = '<div class="part-of-speech__select"><p>'+_rows[i].children[3].innerText+'</p></div><div class="wrapper-of-options"><div class="part-of-speech__options"><div>Сущ-ое</div><div>Глагол</div><div>Прил-ое</div><div>Наречие</div><div>Другое</div></div></div>'
			createPartOfSpeach_func()
		}
	}
}


// Сделать все строки с галочками (которые еще не прозрачны) прозрачными
_lowVisionOn.onclick = function () {
	for (var i = 0; i < _checkboxes.length; i++) {
		if (_checkboxes[i].checked && !_rows[i].classList.contains('hidden')) {
			_rows[i].children[5].classList.add('true')
			document.querySelector('.fa-upload').parentNode.classList.add('active')
			_rows[i].classList.add('hidden')
		}
	}
}

_lowVisionOff.onclick = function () {
	for (var i = 0; i < _checkboxes.length; i++) {
		if (_checkboxes[i].checked && _rows[i].classList.contains('hidden')) {
			_rows[i].children[5].classList.add('true')
			document.querySelector('.fa-upload').parentNode.classList.add('active')
			_rows[i].classList.remove('hidden')
		}
	}
}


_delete.onclick = function () {
	// Выбран ли хотя бы 1 чекбокс
	for (var i = 0; i < _checkboxes.length; i++) {
		if (_checkboxes[i].checked) {
			// Спросить подтверждение
			document.querySelector('.edit-words').style.marginTop = "-55px"
			return
		}
	}
}


_delete_yes.onclick = function () {
	// Задвинуть выдвинувшийся блок
	document.querySelector('.edit-words').style.marginTop = "0"
	_preloader.classList.add('active')
	// Айдишники слов, которые нужно удалить
	wordsForDelete = []
	j = 0
	// Удалить выбранные и занести их в wordsForDelete
	for (var i = 0; i < _checkboxes.length; i++) {
		if (_checkboxes[i].checked) {
			_checkboxes[i].parentNode.parentNode.parentNode.remove()
			isScroll()
			if (document.querySelector(".wrapper-of-table").children.length == 1) {
				document.body.innerHTML = "<div class='wrapper-of-error'><p>На данный момент у вас нет добавленных слов</p><li class='munu__lists buttoms'><a href='../pages/add_new_word.php'>Добавить слова</a></li></div>"
			}

			wordsForDelete.push(words_ides[j])

			// words_ides - массив слов, которые отсались на сайте.
			// Переменная j используется, так как splice сдвигает элементы массива, а мне нужно пройтись по всем
			words_ides.splice(j, 1)
			// Чтобы не пропустить элемент массива
			j--
		}
		j++
	}
	// Убрать галочки у всех чекбоксов
	for (var i = 0; i < _checkboxes.length; i++) {
			_checkboxes[i].checked = false
	}
	// Отправить запрос
	ajaxPost("wordsForDelete="+JSON.stringify(wordsForDelete)+"" )

}

// Убрать подтверждение
_delete_no.onclick = function () {
	document.querySelector('.edit-words').style.marginTop = "0"
}













// Если активно изменение


// Для только что созданных выпадающих меню с выбором части речи (иначе не работает)
function createPartOfSpeach_func() {
	// Получаем все выпадающие меню
	var _partOfSpeach__select = document.querySelectorAll('.part-of-speech__select')
	var _partOfSpeach__options = document.querySelectorAll('.part-of-speech__options div')

	var oldHeight

	// Для каждого из селкетов
	// this.parentNode.children[1] - это wrapper-of-options ('окошечко' с owerflow hidden (класс active добавляется к нему. Для удобства))
	for (var i = 0; i < _partOfSpeach__select.length; i++) {

		_partOfSpeach__select[i].onclick = function () {

			// Если открыт - закрыть
			if (this.parentNode.children[1].classList.contains("active")) {
				this.parentNode.children[1].classList.remove("active")
				this.parentNode.style.zIndex = 0
				document.querySelector('.wrapper-of-table').style.height = oldHeight
				isScroll()
				return
			}
			// Если открыты другие селекты - все закрыть
			for (var i = 0; i < _partOfSpeach__select.length; i++) {
				if (_partOfSpeach__select[i].parentNode.children[1].classList.contains("active")) {
					_partOfSpeach__select[i].parentNode.children[1].classList.remove("active")
					_partOfSpeach__select[i].parentNode.children[1].parentNode.style.zIndex = 0
				}
			}
			// Если закрыт - открыть
			if (!this.parentNode.children[1].classList.contains("active")) {
				this.parentNode.children[1].classList.add("active")
				this.parentNode.style.zIndex = 2


				// Если выпадающее меню выпирает за таблицу
				if (this.getBoundingClientRect().bottom + 135 > document.querySelector(".wrapper-of-table").getBoundingClientRect().bottom) {
					oldHeight = getComputedStyle(document.querySelector(".wrapper-of-table")).height
					// На сколько выпирает + на сколько прокручено сверху
					document.querySelector(".wrapper-of-table").style.height = window.pageYOffset + this.getBoundingClientRect().bottom + 150 + "px"

				}

				isScroll()
				return
			}
		}
	}

	// При нажатии на один пункт из стиска закрывает блок и обновляет значение в главном блоке
	// this.parentNode.parentNode - - это wrapper-of-options ('окошечко' с owerflow hidden (класс active добавляется к нему))
	for (var i = 0; i < _partOfSpeach__options.length; i++) {
		_partOfSpeach__options[i].onclick = function () {
			this.parentNode.parentNode.classList.remove("active")
			this.parentNode.parentNode.parentNode.style.zIndex = 0
			document.querySelector('.wrapper-of-table').style.height = oldHeight
			isScroll()

			// Если новое значение != старому - показать значек сохранить изменения
			if (!(this.parentNode.parentNode.parentNode.children[0].children[0].innerHTML == this.innerHTML)) {
				this.parentNode.parentNode.parentNode.children[0].children[0].innerHTML = this.innerHTML
				document.querySelector('.fa-upload').parentNode.classList.add('active')
			}

		}
	}

}

function isScroll() {
	//if (document.querySelector(".wrapper-of-last-row").style.position = 'absolute') {
		if (document.querySelector(".wrapper-of-table").scrollHeight + 50 <= document.body.clientHeight) {
			document.querySelector(".wrapper-of-last-row").style.position = 'absolute'
		} else {
			document.querySelector(".wrapper-of-last-row").style.position = 'sticky'
		}
	//}
}







// Сохраняет изменения
_save.onclick = function () {


	// Создается при каждом нажатии => далее в коде только увеличивается
	var wasErrors = 0

	// Добавляем красную рамку ко всем неверным инпутам
	for (var j = 0; j < _checkboxes.length; j++) {

		// +- говнокод
		// Если активно изменение для данной строки
		if (_rows[j].children[1].children[0]) {


			// Суть кода - Пройтись по всем строком, у которых активно изменение. Если ошибки нет, но до этого она было - удалить класс error
			// Если ошибка была совершена - добавить класс error

			// Если пользователь исправил ошибку
			if ( isStr(_rows[j].children[1].children[0].value) && _rows[j].children[1].children[0].classList.contains('error')) {
				_rows[j].children[1].children[0].classList.remove("error")
			}
			if ( isStr(_rows[j].children[2].children[0].value) && _rows[j].children[2].children[0].classList.contains('error')) {
				_rows[j].children[2].children[0].classList.remove("error")
			}
			// Если часть речи теперь введена верно - удалить ошибку
			if ( isStr( _rows[j].children[3].children[0].textContent ) ) {
				_rows[j].children[3].children[0].classList.remove("error")
			}

			// Если ошибка - добавить рамку
			if ( !isStr(_rows[j].children[1].children[0].value) ) {
				wasErrors++
				_rows[j].children[1].children[0].classList.add("error")
			}
			if ( !isStr(_rows[j].children[2].children[0].value) ) {
				wasErrors++
				_rows[j].children[2].children[0].classList.add("error")
			}

			if ( !isStr( _rows[j].children[3].children[0].textContent ) ) {
				wasErrors++
				_rows[j].children[3].children[0].classList.add("error")
			}


		}
	}
	// Если есть ошибки - прекратить выполнение функции
	if (wasErrors != 0) return


	_preloader.classList.add('active')

	// Убирает инпуты, если введено верное значение
	for (var i = 0; i < _checkboxes.length; i++) {
		if (_rows[i].children[1].children[0]) {
				_rows[i].children[1].innerHTML = firstLetter_toUpperCase(_rows[i].children[1].children[0].value)
				_rows[i].children[2].innerHTML = firstLetter_toUpperCase(_rows[i].children[2].children[0].value)
				_rows[i].children[3].innerHTML = _rows[i].children[3].children[0].children[0].innerText
				_rows[i].children[5].classList.add('true')
		}
	}



	var changedWords = document.querySelectorAll(".was-change.true")
	var wordsForUpdate = []


	// Обновляет слова
	for (var i = 0; i < changedWords.length; i++) {
		count = _rows.indexOf(changedWords[i].parentNode)

		var wordsInfo = {
			"id": words_ides[count],
			"word_eng": changedWords[i].parentNode.children[1].innerText,
			"word_rus": changedWords[i].parentNode.children[2].innerText,
			"part_of_speech": changedWords[i].parentNode.children[3].innerText
		}

		if (changedWords[i].parentNode.classList.contains('hidden')) {
			wordsInfo['is_showing'] = 0
		}
		else {
			wordsInfo['is_showing'] = 1
		}

		wordsForUpdate.push(wordsInfo)
		changedWords[i].classList.remove("true")
	}

		// Убирает чекбоксы
	_choseAll.checked = false
	for (var i = 0; i < _checkboxes.length; i++) {
		_checkboxes[i].checked = false
	}

	ajaxPost("wordsForUpdate="+JSON.stringify(wordsForUpdate)+"" )
	this.parentNode.classList.remove('active')

}


function isStr(str) {
	// Если не число
	// Если не тег
	// Если не пробел
	return ( !/\d/.test(str) && (str.search("<") == -1 && str.search(">") == -1) && str.length > 0 && /\S/.test(str))
}

function firstLetter_toUpperCase(str) {
	return str.charAt(0).toUpperCase() + str.substr(1)
}

function ajaxPost(wordsForUpdate) {
	var request = new XMLHttpRequest();

	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			_preloader.classList.remove('active')
		}
	}

	request.open('POST', '../controllers/words_controller.php');
	request.setRequestHeader('content-Type', 'application/x-www-form-urlencoded')
	request.send(wordsForUpdate)

}
