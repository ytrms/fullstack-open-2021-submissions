import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then((persons) => {
        setPersons(persons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const newPersonObject = {
      name: newName,
      number: newNumber,
    }

    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already present in the phonebook.`)
    } else {
      personService
        .create(newPersonObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson))
          setNewNumber('')
          setNewName('')
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const removePersonWithId = id => {
    const person = persons.find(person => person.id === id)
    // show confirm dialog
    if (window.confirm(`Are you sure you want to delete ${person.name} from your list?`)) {
      // remove person from server
      personService
        .remove(id)
        .then(() => {
          // if succesful, refetch persons
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const personsToShow = newFilter === ""
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        value={newFilter}
        handleFilterChange={handleFilterChange}
      />
      <h2>Add a new person:</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        personsToShow={personsToShow}
        removePersonWithId={removePersonWithId}
      />
    </div>
  )
}

const Filter = ({ value, handleFilterChange }) => {
  return (
    <div>
      filter shown with <input
        value={value}
        onChange={handleFilterChange} />
    </div>
  )
}

const PersonForm = (props) => {
  const { addPerson, newName, handleNameChange, newNumber, handleNumberChange } = props
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input
          value={newName}
          onChange={handleNameChange}
        />
      </div>
      <div>
        number: <input
          value={newNumber}
          onChange={handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Person = ({ name, number, id, removePersonWithId }) => (
  <div key={id}>
    {name} {number} <button onClick={() => removePersonWithId(id)}>Delete</button>
  </div>
)

const Persons = ({ personsToShow, removePersonWithId }) => {
  return (
    personsToShow.map(person => {
      return (
        <Person name={person.name} number={person.number} key={person.id} id={person.id} removePersonWithId={removePersonWithId} />
      )
    })
  )
}

export default App