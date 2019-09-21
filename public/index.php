<?php
# This file handles URL routing
$request = explode('/', $_SERVER['REQUEST_URI']);

switch ($request[1]) {
	case '':
		# This is the homepage
		include_once $_SERVER['DOCUMENT_ROOT'].'../parts/head.php'
		include_once $_SERVER['DOCUMENT_ROOT'].'../parts/header.php';
		include_once $_SERVER['DOCUMENT_ROOT'].'../parts/homepage.php';
		include_once $_SERVER['DOCUMENT_ROOT'].'../parts/footer.php';
		break;
	case 'about':
		echo 'two';
		break;
	default:
		echo '404';
		break;

}
?>
