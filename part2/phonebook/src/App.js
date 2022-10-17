import { useState, useEffect } from 'react'

import personService from './services/persons'

import ContactList from './components/ContactList'
import SearchContact from './components/SearchContact'
import AddContact from './components/AddContact'
import Notification from './components/Notification'

const App = () => {
  const [infoMessage, setInfoMsg] = useState(null)
  const [typeOfMsg, setTypeOfMsg] = useState(true)

  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(allContacts => {
        setPersons(allContacts)
      })
  }, []);

  const filteredPersons = persons.filter(p => p.name.toLowerCase().includes(filter))

  const personsToShow = (filter !== '') ? filteredPersons : persons

  const addPerson = (event) => {
    event.preventDefault()

    if (newName === '') {
      alert('Please enter a name')
      return
    }

    const found = persons.find(p => p.name === newName);
    if (found === undefined) {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      personService
        .create(newPerson)
        .then(newAddedPerson => {
          console.log('newAddedPerson: ', newAddedPerson)
          setPersons(persons.concat(newAddedPerson))
          setNewName('')
          setNewNumber('')
          setInfoMsg(`Added ${newAddedPerson.name}`)
          setTimeout(() => {
            setInfoMsg(null)
          }, 5000)
        })
    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const changedContact = { ...found, number: newNumber }
        personService
          .update(changedContact.id, changedContact)
          .then(updatedContact => {
            setPersons(persons.map(contact => contact.id !== updatedContact.id ? contact : updatedContact))
            setNewName('')
            setNewNumber('')
            setInfoMsg(`Number updated for ${newName}`)
            setTimeout(() => {
              setInfoMsg(null)
            }, 5000)
          })
          .catch(error => {
            setTypeOfMsg(false)
            console.log(typeOfMsg)
            setInfoMsg(`Information for ${newName} has already been removed from server`)
            setTimeout(() => {
              setInfoMsg(null)
            }, 5000)
          })
      } else {
        setNewName('')
        setNewNumber('')
      }
    }

  }

  const removeContact = (event) => {
    const id = parseInt(event.target.getAttribute('itemid'))
    const personToDelete = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${personToDelete.name}`)) {
      personService
        .remove(id)
        .then(response => {
          console.log(response)
          setPersons(persons.filter(p => p.id !== id))
          setInfoMsg(`Contact ${personToDelete.name} deleted!`)
            setTimeout(() => {
              setInfoMsg(null)
            }, 5000)
        })
    }
  }

  const handleAddPersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      { typeOfMsg 
        ? <Notification message={infoMessage} type='info' />
        : <Notification message={infoMessage} type='error' />
      }
      
      <SearchContact filter={filter} handler={handleFilter} />

      <AddContact onSubmit={addPerson} name={newName} onNameChange={handleAddPersonChange} number={newNumber} onNumberChange={handleNumberChange} />

      <ContactList names={personsToShow} deleteBtnHandler={removeContact} />
    </div>
  )
}

export default App