<?php 
	require_once '../includes/config.php';
	
	if (!$wasRegister) {
	header('Location: /pages/autorisation.php');
	die();
	}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta content="no-cache" http-equiv="Pragma">
<title><?php echo($config['title']) ?></title>
<link href="../css/preloader.css" rel="stylesheet" type="text/css">
<link href="../favicon.ico" rel="shortcut icon" type="image/x-icc">
</head>
<body>
<?php require_once '../includes/preloader.php'; ?>
<link href="../css/add_word.css" rel="stylesheet" type="text/css">
<link href="../css/main.css" rel="stylesheet" type="text/css">
<form action="" class="form" method="POST">
<div class="wrapper-of-upper-inputs">
<div class="wrapper-of-inputs upper-inputs">
<input class="input" name="word_eng" autocomplete="off" placeholder="Слово на английском">
</div>
<div class="wrapper-of-inputs upper-inputs">
<input class="input" name="word_rus" autocomplete="off" placeholder="Перевод">
</div>
</div>
<div class="wrapper-of-lower-inputs">
<div class="part-of-speech">
<div class="part-of-speech__select">Часть речи</div>
<div class="part-of-speech__options">
<div></div>
<div>Существительное</div>
<div>Глагол</div>
<div>Прилагательное</div>
<div>Наречие</div>
<div>Другое</div>
</div>
<div class="options-swiper">∨</div>
</div>
<div class="wrapper-of-add-word">
<div class="is-showing">
<p>Отображать слово во время тренировки?</p>
<div class="wrapper-of-answers active">
<div class="answer active">Да</div>
<div class="answer">Нет</div>
</div>
<input class="real-checkbox" name="is_showing">
</div>
<p class="error"></p>
<div class="buttoms add-word">Добавить слово</div>
</div>
</div>
</form>
<script src="../js/add_new_word.js"></script>
</body>
</html>