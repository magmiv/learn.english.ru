window.onload = function() {

	var translateInput = document.querySelector('input[name="word"]');
	translateInput.onkeydown = function(e) {
		if (e.keyCode == 13 && isStr(this.value)) {
			document.querySelector('.check-word').click()
		}
	}

	function isStr(str) {
		return ( !/\d/.test(str) && (str.search("<") == -1 && str.search(">") == -1)) 
	}

	var wordNow = 0;
	var params = "";

	// Переменная, используемая для того, поднять верхний инпут при показе "Предыдущее слово"
	var hasLastWord = false

	// При нажатии на кнопку
	document.querySelector('.check-word').onclick = function() {
		// Если указано нормальное значение
		if (isStr(translateInput.value)) {

			// Если предыдущее слово не показано - поднять верхний блок
			if (!hasLastWord) {
				hasLastWord = true
				document.querySelector(".upper-inputs:first-child").style.marginTop = '-55px'
			}

			// Проверки на существование слов, получаемых в запросе. Наверное
			if (wordNow >= 0 && wordNow != 5 && words[wordNow] && words[wordNow+1]) 
			{
				// Показать блок "перевод передыдущего слова" и сделать текст в нем красным/зеленым
				document.querySelector('.last-word').classList.add('active');
				document.querySelector('.last-word div').innerHTML = words[wordNow]['word_eng'];

				// Если введено верное значение
				if (words[wordNow]['word_eng'].toLowerCase() == translateInput.value.toLowerCase()) {

					// Убрать классы у предыдущего слова и занести в массив слов "Да"
					words[wordNow]['is_right'] = true
					document.querySelector('.last-word div').classList.remove('right');
					document.querySelector('.last-word div').classList.remove('false');
					document.querySelector('.last-word div').classList.add('right');
				} else {
					words[wordNow]['is_right'] = false
					document.querySelector('.last-word div').classList.remove('right');
					document.querySelector('.last-word div').classList.remove('false');
					document.querySelector('.last-word div').classList.add('false');
				}
				// Показать следущее слово
				document.querySelector('.word_rus').innerHTML = words[wordNow+1]['word_rus']
				// Обнулить английский инпут
				translateInput.value = ''
			}


			if ( (wordNow+1) % 5 == 0 && wordNow!=0) {
				if (words.length > 5) {
					wordNow = -1
					document.querySelector('.word_rus').innerHTML = words[5]['word_rus']


					// slice не включает последний символ => возращает 5 а не 6 слов
					var wordsToSend = words.slice(0, 5);
					params = "word_now=" + JSON.stringify(wordsToSend) + ""
					ajaxPost(params)
					for (var i = 5; i <= 9; i++) {
						words[i-5] = words[i]
					}
					words.length = 5
				} else {
					document.querySelector(".preloader").classList.add("active")
				}
			}

			wordNow++

		}
	}




	function ajaxPost(params) {
		var request = new XMLHttpRequest();

		request.onreadystatechange = function() {
			if (request.readyState == 4) {
				document.querySelector('.error').classList.remove('active')
				for (var i = 5; i <= 9; i++) {
					words.push({'id': JSON.parse(request.responseText)[i]['id'],
						'word_rus': JSON.parse(request.responseText)[i]['word_rus'], 
						'word_eng': JSON.parse(request.responseText)[i]['word_eng'], 
						'stage_of_stading': JSON.parse(request.responseText)[i]['stage_of_stading']
					})
				}
				document.querySelector(".preloader").classList.remove('active')
			}
		}
		request.open('POST', '../controllers/training_controller.php');
		request.setRequestHeader('content-Type', 'application/x-www-form-urlencoded')
		request.send(params)
	}




}