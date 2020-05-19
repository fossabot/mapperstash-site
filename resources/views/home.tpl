		<main id="home">
			<div id="search">
				<input id="searchtxt" type="text" />
				<button id="searchbtn">Search</button>
			</div>
			<a class="secondary" href="#">Advanced search</a>
		</main>
		<script>
document.getElementById('searchbtn').onclick = _ => {
  let formattedTags = document.getElementById('searchtxt').value.replace(/ +/g, '+')
  location.href = location.protocol + '//' + location.hostname + ':' + location.port + '/search/' + formattedTags
}
		</script>
		<footer>
			<p>${p.itemcount} items and ${p.itemcount} tags</p>
		</footer>
