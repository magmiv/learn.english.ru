<?php

$config = array(
	'title' => "Repeat English",
	'vk_url' => 'http://vk.com/ivancr',
	'db' => array(
		'server' => 'localhost',
		'username' => 'root',
		'password' => '',
		'db' => 'learn.english.ru'
	)
);
require_once "db.php";

if ( isset($_COOKIE["is_premium"]) ) {
	$wasRegister = true;
	$user_id = $_COOKIE["is_premium"];
} else {
	$wasRegister = false;
	$user_id = "public";
};