import { useState, useEffect } from "react";
import Filter from "./Components/Filter";
import PersonForm from "./Components/PersonForm";
import Persons from "./Components/Persons";
import personService from "./services/persons";
const App = () => {
  useEffect(() => {
    personService.getAll().then((personsFromJsonServer) => {
      setPersons(personsFromJsonServer);
    });
  }, []);
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const showPersons = () => {
    if (newFilter === "") {
      return persons.map((person, index) => (
        <div key={index}>
          <>
            {person.name} {person.number}
            <button onClick={() => handleDeleteClick(person)}>delete</button>
          </>
        </div>
      ));
    } else {
      const filteredPersons = persons.filter((person) => {
        return person.name.toLowerCase().includes(newFilter.toLowerCase());
      });

      return filteredPersons.map((person, index) => (
        <div key={index}>
          <>
            {person.name} {person.number}
          </>
        </div>
      ));
    }
  };
  const handleDeleteClick = (person) => {
    /* eslint-disable no-restricted-globals */
    if (confirm(`Delete ${person.name} ?`)) {
      personService
        .deletePerson(person.id)
        .then(() => {
          return personService.getAll();
        })
        .then((personsFromJsonServer) => {
          setPersons(personsFromJsonServer);
        });
    }
    /* eslint-enable no-restricted-globals */
  };

  const addName = (event) => {
    event.preventDefault();
    const nameInList = () => persons.some((person) => person.name === newName);
    if (!nameInList()) {
      const newPerson = { name: newName, number: newNumber };
      personService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      });
    } else {
      /* eslint-disable no-restricted-globals */
      if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const personUpdateId= (persons.find(person => person.name === newName)).id
        const updatedPerson = {name: newName, number: newNumber, id: personUpdateId}
        personService.update(personUpdateId, updatedPerson)
        .then(response => {
          setPersons(persons.map(person => person.id === personUpdateId ? response : person))
        })

      }
      /* eslint-enable no-restricted-globals */
      setNewName("");
      setNewNumber("");
    }
  };
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        newFilter={newFilter}
        handleFilterChange={handleFilterChange}
        persons={persons}
      />
      <h2>add a new</h2>
      <PersonForm
        addName={addName}
        newNumber={newNumber}
        newName={newName}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons showPersons={showPersons} />
    </div>
  );
};

export default App;
