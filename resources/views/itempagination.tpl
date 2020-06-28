		<footer id="itemPagination">
			<input type="number" id="itemPage" max="${p.lastpage}" min="1" value="${p.currentpage}">
			<label for="itemPage">/${p.lastpage}</label>
			<ul>
				<li><a id="paginationPrev">prev</a></li>
				<li><a id="paginationNext">next</a></li>
			</ul>
		</footer>
		<script>
document.getElementById('paginationPrev').onclick = _ => {
  const currentlocation = new URL(location.href)

  if (!(currentlocation.searchParams.has('page')) || currentlocation.searchParams.get('page') == 1) return

  const newlocation = new URL(location.href)
  newlocation.searchParams.set('page', Number(currentlocation.searchParams.get('page')) - 1)

  location = newlocation
}

document.getElementById('paginationNext').onclick = _ => {
  const currentlocation = new URL(location.href)

  if (!(currentlocation.searchParams.has('page'))) currentlocation.searchParams.set('page', 1)
  if (currentlocation.searchParams.get('page') == ${p.lastpage}) return

  const newlocation = new URL(location.href)
  newlocation.searchParams.set('page', Number(currentlocation.searchParams.get('page')) + 1)

  location = newlocation
}

const itemPage = document.getElementById('itemPage')
itemPage.addEventListener('keyup', press => {
  if (!(press.key == 'Enter')) return

  if (!(itemPage.validity.valid)) return

  const newlocation = new URL(location.href)
  newlocation.searchParams.set('page', itemPage.value)

  location = newlocation
})
		</script>
