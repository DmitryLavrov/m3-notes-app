addEventListener('click', async event => {
  if (event.target.dataset.type === 'remove') {
    const id = event.target.dataset.id
    await remove(id)
    event.target.closest('li').remove()
  }
})

async function remove(id) {
  await fetch(`/${id}`, {
    method: 'DELETE'
  })

}
