import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
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
      setPersons([...persons, newPerson]);
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
      <form>
        <div>
          filter shown with
          <input value={newFilter} onChange={handleFilterChange}></input>
        </div>
      </form>
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          {" "}
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          {" "}
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {showPersons()}
    </div>
  );
};

export default App;
