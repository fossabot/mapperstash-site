<?php
# This file handles URL routing
$request = explode('/', $_SERVER['REQUEST_URI']);

switch ($request[1]) {
	case '':
		echo 'one';
		break;
	case 'about':
		echo 'two';
		break;
	default:
		echo '404';
		break;

}
?>
