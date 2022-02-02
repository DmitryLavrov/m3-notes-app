addEventListener('click', async event => {
  if (event.target.dataset.type === 'remove') {
    const id = event.target.dataset.id
    await remove(id)
    event.target.closest('li').remove()
  }

  if (event.target.dataset.type === 'edit') {
    const id = event.target.dataset.id
    const title = event.target.dataset.title
    const newTitle = prompt('Enter new title', title)

    if (newTitle === null) {
      return
    }

    await edit(id, newTitle)
    event.target.closest('li').querySelector('span').innerText = newTitle
  }
})

async function remove(id) {
  await fetch(`/${id}`, {
    method: 'DELETE'
  })
}

async function edit(id, title) {
  await fetch(`/${id}`, {
    method: 'PUT',
    body: JSON.stringify({title}),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
