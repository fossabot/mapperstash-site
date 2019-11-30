	<body>
		<header>
			<div id="logoArea">
				<a href="https://<?php echo $_SERVER['HTTP_HOST']; ?>">
					<?php echo file_get_contents($_SERVER['DOCUMENT_ROOT']."/content/logo.svg"); ?>
				</a>
			</div>

			<nav>
				<ul>
					<li><a href="#">Search</a></li>
					<li><a href="#">About</a></li>
					<li><a href="#">Help</a></li>
					<li><a href="#">Submit</a></li>
				</ul>
			</nav>
		</header>
	
