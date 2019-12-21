<?php

require_once '../includes/config.php';

if ($wasRegister != 1) {
	echo "Что-то пошло не так";
	die();
}


// Проверяет, есть ли такой пользователь в БД
		$user = mysqli_query($connection, "SELECT `login` FROM `users` WHERE `login` = '".$_POST['login']."'");


		if (mysqli_num_rows($user) == 0) {
				// Добавляет пользователя
				$add_user = mysqli_query($connection, "UPDATE `users` SET `login` = '".$_POST['login']."', `password` = '".$_POST['password']."' WHERE `user_id` = '".$user_id."'");
				echo "true";

		} else {
			echo "К сожалению, данный логин занят";
		}