<?php 
require_once '../includes/config.php';

if ($_POST['is_showing'] == 'Нет') {
	$_POST['is_showing'] = 0;
} else {
	$_POST['is_showing'] = 1;
}

// Проверяет, есть ли такое слово в БД
$get_words = mysqli_query($connection, "SELECT `word_eng` FROM `words` WHERE (`word_rus` = '".$_POST['word_eng']."' OR `word_rus` = '".$_POST['word_rus']."') AND `user_id` = '".$user_id."'");

if ( mysqli_num_rows($get_words) == 0 ) {
	$add_word = mysqli_query($connection, "INSERT INTO `words`
		(`user_id`,`word_eng`,`word_rus`,`part_of_speech`,`is_showing`) 
		VALUES ('".$user_id."','".$_POST['word_eng']."', '".$_POST['word_rus']."', '".$_POST['part_of_speech']."', '".$_POST['is_showing']."') ");
	echo "true";
} else {
	echo "false";
}

?>