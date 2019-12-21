<?php
require_once 'includes/config.php';

?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title><?php echo($config['title']) ?></title>
<link href="/favicon.ico" rel="shortcut icon" type="image/x-icc">
<link href="css/preloader.css" rel="stylesheet" type="text/css">
</head>
<body>

<?php require_once 'includes/preloader.php'; ?>
<link href="css/main.css" rel="stylesheet" type="text/css">
<link href="fonts/fontawesome/css/all.css" rel="stylesheet" type="text/css">
<ul class="menu">
<?php
			if ($wasRegister) {
		?>
<li class="munu__lists buttoms"><a href="pages/training.php">Начать обучение</a></li>
<li class="munu__lists buttoms"><a href="pages/add_new_word.php">Добавить слово</a></li>
<li class="munu__lists buttoms"><a href="pages/words.php">Список слов</a></li>
<?php if (!isset($_COOKIE["is_vk"])) 
{
	?>
	<li class="munu__lists buttoms"><a href="pages/settings.php">Настройки аккаунта</a></li>
<?php
} 
?>
<li class="munu__lists buttoms exit"><p>Выйти</p></li>
<?php
		}




		else {
		?>
<li class="munu__lists buttoms"><a href="pages/training.php">Начать обучение</a></li>
<li class="munu__lists buttoms"><p>Добавить слово <i class='fa fa-lock' aria-hidden='true' title='Необходимо авторизироваться'></i></p></li>
<li class="munu__lists buttoms words"><p>Список слов <i class='fa fa-lock' aria-hidden='true' title='Необходимо авторизироваться'></i></p></li>
<li class='munu__lists buttoms'><a href='pages/autorisation.php'>Авторизизация</a></li>
<?php 
			}
		?>
</ul>
<script src="js/index.js"></script>
</body>
</html>