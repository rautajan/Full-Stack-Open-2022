import { useState, useEffect } from "react";
import Filter from "./Components/Filter";
import PersonForm from "./Components/PersonForm";
import Persons from "./Components/Persons";
import axios from "axios";
const App = () => {
  useEffect(() => {
    axios
    .get("http://localhost:3001/persons")
    .then(response => {
      const personsFromJsonServer = response.data
      setPersons(personsFromJsonServer)
    })
  }, [])

  
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
  const addName = (event) => {
    event.preventDefault();
    const nameInList = () => persons.some((person) => person.name === newName);
    if (!nameInList()) {
      const newPerson = { name: newName, number: newNumber };
      axios
        .post("http://localhost:3001/persons", newPerson)
        .then(response => {
          console.log(response)
          setPersons([...persons, newPerson]);
        })
      
      setNewName("");
      setNewNumber("");
    } else {
      alert(`${newName} is already added to phonebook`);
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
