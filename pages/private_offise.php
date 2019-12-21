<?php
	require_once '../includes/config.php';

	if ($wasRegister) {
		header('Location: /pages/autorisation.php');
		die();
	}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title><?php echo($config['title']) ?></title>
<link href="../favicon.ico" rel="shortcut icon" type="image/x-icc">
</head>
<body>
<ul class="menu">
<li class="munu__lists buttoms"><a href="pages/training.php">Начать обучение</a></li>
<li class="munu__lists buttoms">
<?php
			// Если авторизован - показать обычную ссылку. Если нет - показать замочек
			if ($wasRegister) {
				echo '<a href="pages/add_new_word.php">Добавить слово</a>';
			} else {
				echo "<p>Добавить слово</p><i class='fa fa-lock' aria-hidden='true' title='Необходимо авторизироваться'></i>";
			}
			?>
</li>
<li class="munu__lists buttoms">
<?php 
			if ($wasRegister) {
				echo '<a href="pages/words.php">Список слов</a>';
			} else {
				echo "<p>Список слов</p><i class='fa fa-lock' aria-hidden='true' title='Необходимо авторизироваться'></i>";
			}
			?>
</li>
<li class="munu__lists buttoms"><a href="pages/contacts.php">Контакты</a></li>
<?php
			// Если авторизирован - показать "личный кабинет"
			if ($wasRegister) {
				echo "<li class='munu__lists buttoms private-office'><a href='pages/private_office.php'>Личный кабинет</a></li>";
			} else {
				echo "<li class='munu__lists buttoms private-office'><a href='pages/autorisation.php'>Авторизироваться</a></li>";
			}
		?>
</ul>
</body>
</html>