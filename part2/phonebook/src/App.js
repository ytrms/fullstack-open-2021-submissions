import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="notification">
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then((persons) => {
        setPersons(persons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    let newPersonObject = {
      name: newName,
      number: newNumber,
    }

    if (persons.find(person => person.name === newName)) {
      if (window.confirm(`${newName} already exists. Update the associated number?`)) {
        const person = persons.find(person => person.name === newName)
        newPersonObject = { ...person, number: newPersonObject.number }
        personService
          .update(newPersonObject)
          .then(response => {
            setPersons(persons.map(person => person.id !== response.data.id ? person : response.data))
            setNewName('')
            setNewNumber('')
            setNotification(`${person.name} successfully updated.`)
            setTimeout(() => {
              setNotification(null)
            }, (5000));
          })
      }
    } else {
      personService
        .create(newPersonObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson))
          setNewNumber('')
          setNewName('')
          setNotification(`${returnedPerson.name} succesfully added.`)
          setTimeout(() => {
            setNotification(null)
          }, (5000));

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
          setNotification(`${person.name} successfully removed.`)
          setTimeout(() => {
            setNotification(null)
          }, (5000));

        })
    }
  }

  const personsToShow = newFilter === ""
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
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