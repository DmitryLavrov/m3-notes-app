addEventListener('click', async event => {
  if (event.target.dataset.type === 'remove') {
    const id = event.target.dataset.id
    await remove(id)
    event.target.closest('li').remove()
  }

  if (event.target.dataset.type === 'edit') {
    toggleEditModeOn(event.target.closest('li'))
  }

  if (event.target.dataset.type === 'save') {
    const id = event.target.dataset.id
    const newTitle = event.target.closest('li').querySelector('input').value

    await edit(id, newTitle)
    event.target.closest('li').querySelector('span').innerText = newTitle

    toggleEditModeOff(event.target.closest('li'))
  }

  if (event.target.dataset.type === 'cancel') {
    toggleEditModeOff(event.target.closest('li'))
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

function toggleEditModeOn(nodeElement) {
  nodeElement.querySelector('span').classList.add('d-none')
  nodeElement.querySelector('input').classList.remove('d-none')
  nodeElement.querySelector('button[data-type="edit"]').classList.add('d-none')
  nodeElement.querySelector('button[data-type="remove"]').classList.add('d-none')
  nodeElement.querySelector('button[data-type="save"]').classList.remove('d-none')
  nodeElement.querySelector('button[data-type="cancel"]').classList.remove('d-none')
  nodeElement.querySelector('input').focus()
}

function toggleEditModeOff(nodeElement) {
  nodeElement.querySelector('span').classList.remove('d-none')
  nodeElement.querySelector('input').classList.add('d-none')
  nodeElement.querySelector('button[data-type="edit"]').classList.remove('d-none')
  nodeElement.querySelector('button[data-type="remove"]').classList.remove('d-none')
  nodeElement.querySelector('button[data-type="save"]').classList.add('d-none')
  nodeElement.querySelector('button[data-type="cancel"]').classList.add('d-none')
}
