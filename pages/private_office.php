<?php
	require_once '../includes/config.php';

	if (!$wasRegister) {
		header('Location: pages/autorisation.php');
		die();
	}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title><?php echo($config['title']) ?></title>
<link href="../css/main.css" rel="stylesheet" type="text/css">
<link href="../favicon.ico" rel="shortcut icon" type="image/x-icc">
</head>
<body>
</body>
</html>