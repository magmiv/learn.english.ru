<?php 
require_once '../includes/config.php';

if ($wasRegister) {
	echo "Что-то пошло не так";
	die();
}

if ($_POST['mode'] == "register") {
		// Проверяет, есть ли такой пользователь в БД
		$user = mysqli_query($connection, "SELECT `login` FROM `users` WHERE `login` = '".$_POST['login']."' AND `is_vk` = '0'");


		if (mysqli_num_rows($user) == 0) {
				// Добавляет пользователя
				$add_user = mysqli_query($connection, "INSERT INTO `users` 
					(`login`,`password`) 
					VALUES ('".$_POST['login']."', '".$_POST['password']."') ");

				// 
				$get_user_id = mysqli_query($connection, "SELECT `user_id` FROM `users` WHERE `login` = '".$_POST['login']."' AND `is_vk` = '0'");


				if (!isset($_COOKIE["is_premium"])) {
					setcookie('is_premium', mysqli_fetch_assoc($get_user_id)['user_id'] , time() + 2600000, "/");
				}
				echo "true";
		} else {
			echo "К сожалению, данный логин занят";
		}

}







if ($_POST['mode'] == "autorisation") {
			
		
		$user = mysqli_query($connection, "SELECT `user_id` FROM `users` WHERE `login` = '".$_POST['login']."' AND `password` = '".$_POST['password']."' AND `is_vk` = '0'");


		if (mysqli_num_rows($user) == 0) {
			echo "Неверный логин или пароль";
		} else {
			setcookie('is_premium', mysqli_fetch_assoc($user)['user_id'] , time() + 2600000, "/");
			echo "true";
		}

}