		<section id="itemsearch">
			<div id="search">
				<input id="searchtxt" type="text" />
				<button id="searchbtn">Search</button>
			</div>
		</section>
		<script>
document.getElementById('searchbtn').onclick = _ => {
  let formattedTags = document.getElementById('searchtxt').value.replace(/ +/g, '+')
  location.href = location.protocol + '//' + location.hostname + ':' + location.port + '/items/' + formattedTags
}
		</script>
