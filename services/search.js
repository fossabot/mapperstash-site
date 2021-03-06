function paginationCalc(itemcount, query) {
  var pagination = {}
  
  pagination.size = Number(query.size) || 10
  pagination.page = query.page || 1
  pagination.pages = Math.ceil(itemcount / pagination.size)
  
  return pagination
}

function validPage(page) {
  return Boolean(Number.isInteger(Number(page)) && page > 0)
}

module.exports.paginationCalc = paginationCalc
module.exports.validPage = validPage
