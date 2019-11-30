<?php
# This file handles URL routing
$request = explode('/', $_SERVER['REQUEST_URI']);

$viewsPath = $_SERVER['DOCUMENT_ROOT'].'/../resources/views/';

switch ($request[1]) {
	case '':
		include_once $viewsPath.'head.php';
		include_once $viewsPath.'header.php';
		include_once $viewsPath.'homepage.php';
		include_once $viewsPath.'footer.php';
		break;
	case 'search':
		include_once $viewsPath.'head.php';
		include_once $viewsPath.'header.php';
		include_once $viewsPath.'search.php';
		include_once $viewsPath.'footer.php';
		break;
	default:
		include_once $viewsPath.'head.php';
		include_once $viewsPath.'header.php';
		echo "<h1>404</h1>";
		include_once $viewsPath.'footer.php';
		break;
}
?>
