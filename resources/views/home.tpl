		<main id="home">
			<div id="search">
				<input id="searchtxt" type="text" />
				<button id="searchbtn">Search</button>
			</div>
		</main>
		<script>
document.getElementById('searchtxt').addEventListener('keyup', press => {
  if (press.key == 'Enter') document.getElementById('searchbtn').click()
})

document.getElementById('searchbtn').onclick = _ => {
  let formattedTags = document.getElementById('searchtxt').value.replace(/ +/g, '+')
  const newlocation = new URL(location.protocol + '//' + location.hostname + ':' + location.port + '/items')
  newlocation.searchParams.append('tags', formattedTags)
  location = newlocation
}
		</script>
		<footer>
			<p>${p.itemcount} items indexed</p>
		</footer>
