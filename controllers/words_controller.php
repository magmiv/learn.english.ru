<?php

require_once '../includes/config.php';

if (!$wasRegister) {
	die();
}

$wordsForUpdate = json_decode($_POST['wordsForUpdate'], true);


// Если нужно обновить слова
if ($wordsForUpdate) {
	
	for ($i = 0; $i < count($wordsForUpdate); $i++) {
		$query = mysqli_query($connection, "UPDATE `words` SET 
			`word_eng` = '".$wordsForUpdate[$i]['word_eng']."',
			`word_rus` = '".$wordsForUpdate[$i]['word_rus']."',
			`part_of_speech` = '".$wordsForUpdate[$i]['part_of_speech']."', 
			`is_showing` = '".$wordsForUpdate[$i]['is_showing']."' 
		WHERE `id` = '".$wordsForUpdate[$i]['id']."' AND `user_id` = '".$user_id."'");
	}

}

// Если нужно удалить слова
if ($_POST['wordsForDelete']) {
	$query = mysqli_query($connection, "DELETE FROM `words` WHERE `id` in (" . implode(",", json_decode($_POST['wordsForDelete'], true) ) . ") AND `user_id` = '".$user_id."'");
}