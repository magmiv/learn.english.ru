<?php require_once '../includes/config.php';

if ($wasRegister) {
	header('Location: /');
	die();
}

?>



<?php 

	$id = '6904800';
	$SECRET = "t9liqy9h51j3se1GzdBK";
	$URL = "http://localhost:3000/app/includes/vk.php";

?>






<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title><?php echo($config['title']) ?></title>
<link href="../css/preloader.css" rel="stylesheet">
<link href="../favicon.ico" rel="shortcut icon" type="image/x-icc">
</head>
<body>
	<?php require_once '../includes/preloader.php'; ?>
	<link href="../css/autorisation.css" rel="stylesheet">

	<div class="wrapper">
		<div class="menu-main">
			<li class="autorisation">Вход</li>
			<li class="register">Регистрация</li>

			<div class="wrapper-of-vk">
				<p>Или войдите с помощью</p>
				<a href="https://oauth.vk.com/authorize?client_id=<?php echo $id ?>&display=page&redirect_uri=<?php echo $URL ?>&response_type=code"><img src="../imgs/vk-logo.png" alt=""></a>
			</div>


			</div>

				<!-- Структура генерируется при помощи js -->
				<div class="menu-swipe">
				
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
		window.addEventListener('load' , function() {
			document.body.style.overflowX = "hidden"
		})
	</script>


	<script src="../js/autorisation.js"></script>








</body>
</html>