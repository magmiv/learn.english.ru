<?php 

require_once '../includes/config.php';

if ($wasRegister) {
	echo "Что-то пошло не так";
	die();
}



header("Content-Type: text/html; charset=utf-8");

$id = '6904800';
$SECRET = "t9liqy9h51j3se1GzdBK";
$URL = "http://localhost:3000/app/includes/vk.php";



if (!$_GET['code']) {
	exit('error code');
};



$token = json_decode(file_get_contents('https://oauth.vk.com/access_token?client_id='.$id.'&redirect_uri='.$URL.'&client_secret='.$SECRET.'&code='.$_GET['code']), true);

if (!$token) {
		exit('error token');
};


$data = json_decode(file_get_contents( "https://api.vk.com/method/users.get?user_id=".$token['user_id']."&access_token=".$token['access_token']."&fields=uid,first_name,last_name,photo_big&v=5.92" ), true);

if (!$data) {
		exit('error token');
};





$login = $data['response'][0]['last_name'];
$password = $data['response'][0]['id'];


$user = mysqli_query($connection, "SELECT `login` FROM `users` WHERE `login` = '".$login."' AND `password` = '".$password."' AND `is_vk` = '1'");


if (mysqli_num_rows($user) == 0) {
				// Добавляет пользователя
				$add_user = mysqli_query($connection, "INSERT INTO `users` 
					(`login`,`password`, `is_vk`) 
					VALUES ('".$login."', '".$password."', 1) ");


				$get_user_id = mysqli_query($connection, "SELECT `user_id` FROM `users` WHERE `login` = '".$login."' AND `is_vk` = '1'");


				if (!isset($_COOKIE["is_premium"])) {
					setcookie('is_premium', mysqli_fetch_assoc($get_user_id)['user_id'] , time() + 2600000, "/");
					setcookie('is_vk', 1 , time() + 2600000, "/");
				}
				echo '<script>window.location.href = "/"</script>';
} 

else {
	$get_user_id = mysqli_query($connection, "SELECT `user_id` FROM `users` WHERE `login` = '".$login."' AND `is_vk` = '1'");

	if (!isset($_COOKIE["is_premium"])) {
		setcookie('is_premium', mysqli_fetch_assoc($get_user_id)['user_id'] , time() + 2600000, "/");
		setcookie('is_vk', 1 , time() + 2600000, "/");
	}
	echo '<script>window.location.href = "/"</script>';
}











?>