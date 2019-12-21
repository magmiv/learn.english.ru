<?php require_once '../includes/config.php';

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
<link href="../css/preloader.css" rel="stylesheet">
<link href="../favicon.ico" rel="shortcut icon" type="image/x-icc">
</head>
<body>
<?php require_once '../includes/preloader.php'; ?>
<link href="../css/settings.css" rel="stylesheet">
<div class="wrapper">
<p class="error active"></p>
<input autocomplete="off" class="reg-in__login" placeholder="Введите новый логин">
<input autocomplete="off" class="reg-in__password" placeholder="Введите новый пароль" type="password">
<input autocomplete="off" class="reg-in__repeat-password" placeholder="Повторите пароль" type="password">
</div>
<div class="submit">Изменить данные</div>
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
<div class="wrapper sucsess"><p class="sucsess">Изменения успешно сохранены</p><div class="submit to_main"><a href="../index.php">На главную</a></div></div>
<script src="../js/settings.js"></script>
</body>
</html>