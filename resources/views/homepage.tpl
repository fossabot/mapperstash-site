		<main id="homeMain">
			<p><strong>MapperStash</strong> is a website that collects and provides resources that mappers can use.</p>
			<form>
				<input type="text" name="query" required />
				<input type="submit" value="Find" />
			</form>
			<a class="smallLink" href="#">Advanced search</a>
		</main>
		<section class="home">
			<h1>Most downloaded</h1>
			<ul class="cardView">
				<li class="card">
					<div class="cardPreview prrefmap">
						<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/World_Map_1689.JPG/556px-World_Map_1689.JPG" />
					</div>
					<h4><a href="#">1689 World Map</a></h4>
					<ul class="cardDesc">
						<li class="rmade">Van Schagen</li>
						<li class="rdown">100</li>
					</ul>
					<p>Some description</p>
				</li>
				<li class="card">
					<div class="cardPreview prdoc">
						<?php echo file_get_contents($_SERVER['DOCUMENT_ROOT']."/content/icons/book.svg"); ?>
					</div>
					<h4><a href="#">The American gazetteer</a></h4>
					<ul class="cardDesc">
						<li class="rmade">Jedidiah Morse</li>
						<li class="rdown">100k</li>
					</ul>
					<p>Some description</p>
				</li>
			</ul>
			<a href="#">See more</a>
		</section>
