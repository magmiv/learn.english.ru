<?php
	require_once '../includes/config.php';

	if (!$wasRegister) {
		header('Location: /app/pages/autorisation.php');
		die();
	}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title><?php echo($config['title']) ?></title>
<link href="../css/preloader.css" rel="stylesheet" type="text/css">
<link href="../favicon.ico" rel="shortcut icon" type="image/x-icc">
</head>
<body>
<?php require_once '../includes/preloader.php'; ?>
<link href="../css/words.css" rel="stylesheet" type="text/css">
<link href="../fonts/fontawesome/css/all.css" rel="stylesheet">
<?php
	// Получаем слова, где user_id = айдишнику из кукиса
	$get_words = mysqli_query($connection, "SELECT * FROM `words` WHERE `user_id` = '".$user_id."' ORDER BY `word_eng`");
	$get_words_info = mysqli_query($connection, "SELECT * FROM `words` WHERE `user_id` = '".$user_id."' AND `is_showing` = 1 ORDER BY `word_eng`");
	

	if ( mysqli_num_rows($get_words) == 0 ) {
	echo "<div class='wrapper-of-error'><p>На данный момент у вас нет добавленных слов</p><li class='munu__lists buttoms'><a href='../pages/add_new_word.php'>Добавить слова</a></li></div>";	
	die();
}
?>
<div class="wrapper-of-table">
<div class="row top-row">
<div><i class="fa fa-upload" aria-hidden="true"></i></div>
<div>Слово</div>
<div>Перевод</div>
<div>Часть речи</div>
<div>Изученность</div>
</div>
<?php
// Массив idшников для безопасности
$words_ides = [];
	// Показываем все слова 
	while ( $words = mysqli_fetch_assoc($get_words) ) {
?>
<div class="row <?php if ($words['is_showing']==0) { echo 'hidden'; } ?>">
<div><label><input hidden type="checkbox"><span></span></label></div>
<div><?php echo mb_strtoupper( mb_substr( $words['word_eng'], 0, 1, "UTF8") , "UTF8" ) . mb_substr( $words['word_eng'], 1, null, "UTF8" ); ?></div>
<div><?php echo mb_strtoupper( mb_substr( $words['word_rus'], 0, 1, "UTF8") , "UTF8" ) . mb_substr( $words['word_rus'], 1, null, "UTF8" ) ?></div>
<div class="part-of-speech">
<?php 
				echo $words['part_of_speech']
			?>
</div>
<div><?php echo $words['stage_of_stading'] * 10 . "%" ?></div>
<div class="was-change"></div>
</div>
<?php
	// Добавить id в конец массива 
	$words_ides[] = $words['id'];
	}
?>
</div>
<div class="wrapper-of-last-row">
<div class="last-row">
<div class="chose-all">
<div><label><input hidden type="checkbox"><span></span></label></div>
<p>Выбрать все</p>
</div>
<div class="edit-words-wrapper">
<div class="edit-words">
<p>Для отмеченных:</p>
<i class="fa fa-magic" aria-hidden="true"></i>
<div class="vision">
<i class="fa fa-eye"></i>
<p>/</p>
<i class="fa fa-low-vision" aria-hidden="true"></i>
</div>
<i class="fa fa-trash" aria-hidden="true"></i>
</div>
<div class="crawling-out-delete-block">
<p>Вы подтверждаете удаление?</p>
<p class="delete-yes">Да</p>
<p>/</p>
<p class="delete-no">Нет</p>
</div>
</div>
</div>
</div>
<div class="preloader">
<div class='sk-fading-circle'>
<div class='sk-circle sk-circle-1'></div>
<div class='sk-circle sk-circle-2'></div>
<div class='sk-circle sk-circle-3'></div>
<div class='sk-circle sk-circle-4'></div>
<div class='sk-circle sk-circle-5'></div>
<div class='sk-circle sk-circle-6'></div>
<div class='sk-circle sk-circle-7'></div>
<div class='sk-circle sk-circle-8'></div>
<div class='sk-circle sk-circle-9'></div>
<div class='sk-circle sk-circle-10'></div>
<div class='sk-circle sk-circle-11'></div>
<div class='sk-circle sk-circle-12'></div>
</div>
</div>
<script>
var words_ides = <?php echo json_encode($words_ides) ?>
</script>
<script src="../js/words.js"></script>
</body>
</html>