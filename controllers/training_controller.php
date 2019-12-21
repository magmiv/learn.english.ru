<?php
require_once '../includes/config.php';
// Заимствует переменные из главного файла
ob_start();
include '../pages/training.php';
ob_clean();

$words_now = $_POST['word_now'];
$words_now = json_decode($words_now, true);

if (!isset($_POST['word_now']) ) {
}

$query_text = 'UPDATE `words` SET `stage_of_stading` = CASE';

for ($i = 0; $i < 5; $i++) 
{
	if ($words_now[$i]['is_right'] == false)
	{
		if ($words_now[$i]['stage_of_stading'] == 10) {
			$query_text = $query_text . ' WHEN `id` = '.$words_now[$i]['id'].' THEN '.$words_now[$i]['stage_of_stading'].' - 3';
			// Мб попробовать удалить это слово из array_of_words_sort и вписать его туда же, но уже в нужное место
			// Скорее всего сейчас баг, что изменения частоты выпадения слова происходят только после перезагрузки страницы
		} else if ($words_now[$i]['stage_of_stading'] == 9) {
			$query_text = $query_text . ' WHEN `id` = '.$words_now[$i]['id'].' THEN '.$words_now[$i]['stage_of_stading'].' - 2';
		} else if ($words_now[$i]['stage_of_stading'] > 1 && $words_now[$i]['stage_of_stading'] < 9) {
			$query_text = $query_text . ' WHEN `id` = '.$words_now[$i]['id'].' THEN '.$words_now[$i]['stage_of_stading'].' - 1';		
		} else {
			$query_text = $query_text . ' WHEN `id` = '.$words_now[$i]['id'].' THEN '.$words_now[$i]['stage_of_stading'].' - 0';	
		}
	}


	if ($words_now[$i]['is_right'] == true && $words_now[$i]['stage_of_stading'] < 10) 
	{
		$query_text = $query_text . ' WHEN `id` = '.$words_now[$i]['id'].' THEN '.$words_now[$i]['stage_of_stading'].' + 1';
	}
}


// Проблема скорее всего именно в этой строке 
$query_text = $query_text . ' END WHERE `id` in ('.$words_now[0]['id'].', '.$words_now[1]['id'].', '.$words_now[2]['id'].', '.$words_now[3]['id'].', '.$words_now[4]['id'].')';

$changeStageOfStuding = mysqli_query($connection, $query_text);

// В конце получается типо такого query_text - 
// 'UPDATE `words` SET `stage_of_stading` = CASE WHEN `id` = '.$words_now[$i]['id'].' THEN '.$words_now[$i]['stage_of_stading'].' - 3 WHEN `id` = '.$words_now[$i]['id'].' THEN '.$words_now[$i]['stage_of_stading'].' + 1 END WHERE `id` in ('.$words_now[0]['id'].', '.$words_now[1]['id'].', '.$words_now[2]['id'].', '.$words_now[3]['id'].', '.$words_now[4]['id'].')'



$tryes = 0;
for($i = 5; $i < 10; $i++) {
	// Айдишник слова
	$groupNow = getStadingGroup();
	$words_to_show[$i]['id'] = $array_of_words_sort[$groupNow][rand( 0, count( $array_of_words_sort[$groupNow] ) - 1) ];

	// Делает так, чтобы слово не могло повторяться два раза подряд
	while ($words_to_show[$i]['id'] == $words_to_show[$i-1]['id'] OR $words_to_show[$i]['id'] == $words_to_show[$i-2]['id'] OR $words_to_show[$i]['id'] == $words_to_show[$i-3]['id'] OR $words_to_show[$i]['id'] == $words_to_show[$i-4]['id'] AND $tryes < 30) {
		$tryes++;
		$words_to_show[$i]['id'] = $array_of_words_sort[$groupNow][rand( 0, count( $array_of_words_sort[$groupNow] ) - 1) ];
	}
	
	// Заполняет words_to_show ячейками из words
	$words_to_show[$i]['word_rus'] = $words[$words_to_show[$i]['id']]['word_rus'];
	$words_to_show[$i]['word_eng'] = $words[$words_to_show[$i]['id']]['word_eng'];
	$words_to_show[$i]['stage_of_stading'] = $words[$words_to_show[$i]['id']]['stage_of_stading'];
}

echo json_encode($words_to_show);