<?php
	require_once '../includes/config.php';

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
<link href="../css/training.css" rel="stylesheet" type="text/css">
<link href="../css/main.css" rel="stylesheet" type="text/css">
<?php 
$get_words_info = mysqli_query($connection, "SELECT * FROM `words` WHERE `user_id` = '".$user_id."' AND `is_showing` = 1 ORDER BY `word_eng`");

// Проверка нужного количества слов, если меньше 10 - ошибка
if (mysqli_num_rows($get_words_info) < 10) {
	echo "<div class='wrapper-of-error'><p class='error'><span>Ошибка.</span> Для начала тренировки должно быть не менее 10 слов.</p><li class='munu__lists buttoms'><a href='../pages/add_new_word.php'>Добавить слово</a></li></div>";	
	die();
}


// Массив слов, который показывает, сколько слов находится в каждой группе изученности
$array_of_words_sort = array(
'1' => [],
'2' => [],
'3' => [],
'4' => [],
'5' => [],
'6' => [],
'7' => [],
'8' => [],
'9' => [],
'10' => []
);

// ДЛЯ КАЖДОГО ИЗ СЛОВ

// Абсолютно все слова и их колонки
$words = [];


// Массив с сортированными по изученности словами, используется для рандома
while ($words_info = mysqli_fetch_assoc($get_words_info)) {
	global $words;
	// Заполняет массив words нужными значениями, причем не от 0, а по idшникам
	// $words['его id']['информация о слове']
	$words[$words_info['id']]['id'] = $words_info['id'];
	$words[$words_info['id']]['word_rus'] = $words_info['word_rus'];
	$words[$words_info['id']]['word_eng'] = $words_info['word_eng'];
	$words[$words_info['id']]['stage_of_stading'] = $words_info['stage_of_stading'];
	// Распределить все слова по группам изученности
	switch ($words_info['stage_of_stading']) {
		case 1:
			$array_of_words_sort['1'][] = $words_info['id'];
			break;
		case 2:
			$array_of_words_sort['2'][] = $words_info['id'];
			break;
		case 3:
			$array_of_words_sort['3'][] = $words_info['id'];
			break;
		case 4:
			$array_of_words_sort['4'][] = $words_info['id'];
			break;
		case 5:
			$array_of_words_sort['5'][] = $words_info['id'];
			break;
		case 6:
			$array_of_words_sort['6'][] = $words_info['id'];
			break;
		case 7:
			$array_of_words_sort['7'][] = $words_info['id'];
			break;
		case 8:
			$array_of_words_sort['8'][] = $words_info['id'];
			break;
		case 9:
			$array_of_words_sort['9'][] = $words_info['id'];
			break;
		case 10:
			$array_of_words_sort['10'][] = $words_info['id'];
			break;
	}
}



// Возращает рандомную группу слов по изученности
function getStadingGroup() 
{
	global $array_of_words_sort;
	$random_stading_group;
	$max = 0;
	$group = [];
	$group[] = 0;

	for($i = 1; $i <= 10; $i++) {
		// Заполняет массив числами (предыдущее число + число слов в группе * вес слова в группе (чем больше вес, тем меньше результат))
		// group - диапазоны значений. Имеет вид [0, 10, 15, 20, 23, 25], где каждый последующий член массива прибавляется на (число слов в группе * вес одного слова)
		// Максимальное число + число слов в группе * вес одного слова (чем меньше группа, тем больше вероятность ее выпадения, тем больше вес слова в ней)
		// $max - значение предыдущего члена массива group. Допустим group[0, 10, 15, 20, 23, 25]. Для числа 10 максом будет являться предыдущий член массива (0), 
		// для  числа 15 - 10.
		$group[] = $max + count($array_of_words_sort[$i]) * abs( ($i-1) - 10);
		$max = $max + count($array_of_words_sort[$i]) * abs( ($i-1) - 10);
	};
	// Генерирует случайное число от 1 до макс, и возращает слово, которое лежит в этом диапазоне
	$random_count = rand(1,$max);
	// В цикле находит нужный диапазон, между которым межит $random_count
	for ($i = 0; $i <= count($group); $i++) {
		if ($random_count > $group[$i] && $random_count <= $group[$i+1]) {
			$random_stading_group = $i+1;
			return $random_stading_group;
		}
	}
}


// Получает первые 10 слов
$words_to_show = [];
// Против вечных циклов
$tryes = 0;
for($i = 0; $i < 10; $i++) {
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
?>
<div class="wrapper">
	<div class="wrapper-of-upper-inputs">
		<div class="upper-inputs word_rus">
			<?php echo $words_to_show[0]['word_rus'] ?>
		</div>
		<div class="upper-inputs word_eng">
			<input autocomplete="off" name="word" placeholder="Введите перевод">
		</div>
		<div class="last-word">
			<p>Перевод прошлого слова</p>
			<div class="buttoms">
			<?php echo $words_to_show[0]['word_eng'] ?>
			</div>
		</div>
	</div>
	<div class="wrapper-of-lower-inputs">
		<div class="check-word true">
			<p class="error">Введите перевод</p>
			<div class="buttoms">
				<p>Проверить</p>
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
var words = <?php echo json_encode($words_to_show)?>;
</script>
<script src="../js/training.js"></script>
</body>
</html>