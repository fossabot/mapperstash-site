<?php
# This file handles URL routing
$request = explode('/', $_SERVER['REQUEST_URI']);

$viewsPath = $_SERVER['DOCUMENT_ROOT'].'/../resources/views/';

switch ($request[1]) {
	case '':
		# This is the homepage
		include_once $viewsPath.'head.php';
		include_once $viewsPath.'header.php';
		include_once $viewsPath.'homepage.php';
		include_once $viewsPath.'footer.php';
		break;
	case 'about':
		echo 'two';
		break;
	default:
		echo '404';
		break;

}
?>
