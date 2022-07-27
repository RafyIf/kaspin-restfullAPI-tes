module.exports = (array, page_size, page_number) => {
  const total_items = array?.length
  const total_page = Math.ceil(total_items / page_size)
  const current_page = page_number < 1 ? page_number : page_number - 1
  const data = array.slice(
    current_page * page_size,
    current_page * page_size + page_size
  )
  return {
    current_page: page_number,
    data,
    total_page,
    total_items
  }
}
