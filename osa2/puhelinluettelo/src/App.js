import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [matchingChar, setNewChar] = useState("");
  const [showAllPersons, setShowAllPersons] = useState(persons);

  const handleNameChange = (event) => {

    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
 
    setNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const match = persons.find((person) => person.name === newName);

    if (!match) {
      console.log(newNumber);
      setPersons(persons.concat({ name: newName, number: newNumber }));
      setShowAllPersons(persons.concat({ name: newName, number: newNumber }));

      setNewName("");
      setNewNumber("");
    } else {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
    }

    console.log(persons);
    console.log(persons[0].name);
  };

  const handleFilterChange = (event) => {
    setNewChar(event.target.value);
    setShowAllPersons(
      persons.filter((person) => person.name.includes(event.target.value))
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filter matchingChar={matchingChar} onChange={handleFilterChange}/>
        
        <h2>add a new</h2>
      </div>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons showAllPersons={showAllPersons}/>
    </div>
  );
};

export default App;
