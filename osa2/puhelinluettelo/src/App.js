import { useState, useEffect } from "react";
import Filter from "./Components/Filter";
import PersonForm from "./Components/PersonForm";
import Persons from "./Components/Persons";
import personService from "./services/persons";
import Notification from "./Components/Notification";
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
  const [addMessage, setNewAddMessage] = useState(null);
  const [removeMessage, setRemoveMessage] = useState(null);
  const [updateMessage, setUpdateMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  console.log("Add message rendering", addMessage);

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
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .deletePerson(person.id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== person.id));
          setRemoveMessage(`${person.name} deleted`);
          setTimeout(() => {
            setRemoveMessage(null);
          }, 5000);
        })
        .catch((error) => {
          console.log(error);
          setErrorMessage(
            `Information of ${person.name} has already been removed from server`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
  };

  const addName = (event) => {
    event.preventDefault();
    const nameInList = () => persons.some((person) => person.name === newName);
    if (!nameInList()) {
      const newPerson = { name: newName, number: newNumber };
      personService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewAddMessage(`Added ${newName}`);
        console.log("ADDMESSAGE", addMessage);
        setTimeout(() => {
          setNewAddMessage(null);
        }, 5000);
        setNewName("");
        setNewNumber("");
      });
    } else {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const personUpdateId = persons.find(
          (person) => person.name === newName
        ).id;
        const updatedPerson = {
          name: newName,
          number: newNumber,
          id: personUpdateId,
        };
        personService.update(personUpdateId, updatedPerson).then((response) => {
          setPersons(
            persons.map((person) =>
              person.id === personUpdateId ? response : person
            )
          );
          setUpdateMessage(`${newName}'s number updated`);
          setTimeout(() => {
            setUpdateMessage(null);
          }, 5000);
        });
      }
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
      <Notification
        addMessage={addMessage}
        removeMessage={removeMessage}
        updateMessage={updateMessage}
        errorMessage={errorMessage}
      />
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
