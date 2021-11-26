import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const newPersonObject = {
      name: newName,
    }

    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already present in the phonebook.`)
    } else {
      setPersons(persons.concat(newPersonObject))
    }
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input
            value={newName}
            onChange={handlePersonChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      ...
      {persons.map(person => {
        return (
          <div key={person.name}>{person.name}</div>
        )
      })}
    </div>
  )
}

export default App